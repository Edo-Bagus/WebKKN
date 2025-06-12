import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb'; // kamu bisa buat ini untuk koneksi
import Article from '@/models/Article';
import { IArticle } from '@/models/Article';

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);

    const search = searchParams.get('search')?.toLowerCase() || '';
    const categories = searchParams.get('categories')?.split(',') || [];
    const people = searchParams.get('people')?.split(',') || [];
    const sortParam = searchParams.get('sort') || 'desc'; // 'asc' or 'desc'
    const sortOrder = sortParam === 'asc' ? 1 : -1;

    const query: any = {};

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    if (categories.length > 0 && categories[0] !== '') {
      query.category = { $in: categories };
    }

    if (people.length > 0 && people[0] !== '') {
      query.people = { $in: people };
    }

    const articles = await Article.find(query).sort({ date: sortOrder }).exec();

    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    console.error('GET /api/articles error:', error);
    return NextResponse.json({ error: 'Gagal mengambil artikel' }, { status: 500 });
  }
}


export async function POST(req: Request) {
  try {
    await connectDB();
    
    const body: Partial<IArticle> = await req.json();

    // Validasi dasar
    if (!body.title || !body.slug || !body.content) {
      return NextResponse.json({ error: 'Field wajib tidak boleh kosong' }, { status: 400 });
    }

    const newArticle = await Article.create(body);

    return NextResponse.json({ message: 'Artikel berhasil ditambahkan', article: newArticle }, { status: 201 });
  } catch (error) {
    console.error('POST /api/articles error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan saat menyimpan artikel' }, { status: 500 });
  }
}
