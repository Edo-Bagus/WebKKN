// src/lib/api.ts
export async function getArticleBySlug(slug: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/articles/${slug}`, {
      next: { revalidate: 60 }, // ISR: revalidate every 60 seconds
    });
  
    if (!res.ok) {
      throw new Error('Gagal memuat artikel');
    }
  
    return res.json();
  }

// lib/api.ts
export async function fetchArticles(sort = 'desc', limit?: number) {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/articles`, window.location.origin);
    url.searchParams.set('sort', sort);
    if (limit) url.searchParams.set('limit', limit.toString());

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error('Failed to fetch articles');

    const articles = await res.json();
    return articles;
  } catch (err) {
    console.error('Error fetching articles:', err);
    return [];
  }
}

  