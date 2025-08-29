import Image from "next/image";
import { Navbar } from "@/components/ui/navbar";
import { getArticleBySlug } from "@/lib/api";
import Markdown from "react-markdown";
import MemberCard from "@/components/ui/member-card";
import { Footer } from "@/components/ui/footer";

interface Params {
  params: { slug: string };
}

export default async function ArtikelPage({ params }: Params) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  return (
    <div className="bg-accent min-h-screen text-primary">
      <Navbar />
      <main className="w-full max-w-7xl mx-auto px-4 py-12 pt-32">
        {/* Section 1 - Header Artikel */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <p className="text-s">
              {new Date(article.date).toLocaleDateString("id-ID")}
            </p>
            <h1 className="text-4xl font-bold">{article.title}</h1>
            <p className="text-lg">{article.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="bg-[#3E3B32] text-[#D1C9A0] px-3 py-1 rounded-full text-sm">
                Kategori: {article.category}
              </span>
              <span className="bg-[#3E3B32] text-[#D1C9A0] px-3 py-1 rounded-full text-sm">
                {article.readingTime}
              </span>
              <span className="bg-[#3E3B32] text-[#D1C9A0] px-3 py-1 rounded-full text-sm">
                Penulis: {article.author.name}
              </span>
            </div>
          </div>

          <div className="w-full h-64 md:h-80 relative rounded-lg overflow-hidden shadow-lg">
            <Image
              src={article.thumbnailUrl || "/images/dummy.jpg"}
              alt="Gambar Artikel"
              fill
              objectFit="cover"
            />
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {/* Article Content */}
          <div className="col-span-2 space-y-6">
            <div className="prose text-primary">
              <Markdown>{article.content}</Markdown>
            </div>
          </div>

          {/* Member Card */}
          {!article ? (
            <p>Loading team members...</p>
          ) : (
            <div className="md:col-span-1">
              <div className="sticky top-32">
                {" "}
                {/* Adjust top to match navbar height */}
                <MemberCard article={article} />
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
