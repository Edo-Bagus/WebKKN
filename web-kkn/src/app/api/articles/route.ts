import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb'; // kamu bisa buat ini untuk koneksi
import Article from '@/models/Article';
import { IArticle } from '@/models/Article';
import TeamMember from '@/models/TeamMember';
import readingTime from 'reading-time';
import { FilterQuery } from 'mongoose';


export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);

    const search = searchParams.get('search')?.toLowerCase() || '';
    const categories = searchParams.get('categories')?.split(',') || [];
    const people = searchParams.get('author')?.split(',') || [];
    const sortParam = searchParams.get('sort') || 'desc';
    const sortOrder = sortParam === 'asc' ? 1 : -1;

    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '6', 10);
    const skip = (page - 1) * limit;

    const query: FilterQuery<IArticle> = {};

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    if (categories.length > 0 && categories[0] !== '') {
      query.category = { $in: categories };
    }

    if (people.length > 0 && people[0] !== '') {
      query.author = { $in: people };
    }

    const total = await Article.countDocuments(query); // Hitung total artikel sesuai filter

    const articles = await Article.find(query)
      .sort({ date: sortOrder })
      .skip(skip)
      .limit(limit)
      .populate('author')
      .exec();

    return NextResponse.json({ articles, total }, { status: 200 });
  } catch (error) {
    console.error('GET /api/articles error:', error);
    return NextResponse.json({ error: 'Gagal mengambil artikel' }, { status: 500 });
  }
}



export async function POST(req: Request) {
  try {
    await connectDB();

    const body: Partial<IArticle & { author: string }> = await req.json();

    const {
      title,
      slug,
      date,
      category,
      author,
      thumbnailUrl,
      description,
      content,
    } = body;

    // Validasi field wajib
    if (!title || !slug || !date || !category || !author || !thumbnailUrl || !description || !content) {
      return NextResponse.json({ error: 'Semua field wajib harus diisi' }, { status: 400 });
    }

    // Validasi author
    const existingAuthor = await TeamMember.findById(author);
    if (!existingAuthor) {
      return NextResponse.json({ error: 'Author tidak ditemukan di database' }, { status: 404 });
    }

    // Hitung reading time dari konten markdown
    const readingStats = readingTime(content);
    const estimatedReadingTime = `${Math.ceil(readingStats.minutes)} menit baca`;

    // Buat artikel
    const newArticle = await Article.create({
      title,
      slug,
      date,
      category,
      author,
      thumbnailUrl,
      description,
      content,
      readingTime: estimatedReadingTime,
    });

    return NextResponse.json({ message: 'Artikel berhasil ditambahkan', article: newArticle }, { status: 201 });
  } catch (error) {
    console.error('POST /api/articles error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan saat menyimpan artikel' }, { status: 500 });
  }
}
