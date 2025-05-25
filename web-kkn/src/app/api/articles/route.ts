import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb'; // kamu bisa buat ini untuk koneksi
import Article from '@/models/Article';
import { IArticle } from '@/models/Article';

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    // Ambil parameter sort dan limit dari query
    const sortParam = searchParams.get('sort') || 'desc'; // default: desc
    const limitParam = searchParams.get('limit');

    // Ubah sort jadi format MongoDB
    const sortOrder = sortParam === 'asc' ? 1 : -1;

    let query = Article.find().sort({ date: sortOrder });

    // Jika ada limit, batasi jumlah data yang diambil
    if (limitParam) {
      const limit = parseInt(limitParam, 10);
      if (!isNaN(limit)) {
        query = query.limit(limit);
      }
    }

    const articles = await query.exec();

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
