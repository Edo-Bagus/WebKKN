import Image from "next/image";
import { Navbar } from "@/app/components/navbar";
import { getArticleBySlug } from "@/lib/api";
import { remark } from "remark";
import remarkHtml from "remark-html";

interface Params {
  params: { slug: string };
}

export default async function ArtikelPage({ params }: Params) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  const processedContent = await remark()
    .use(remarkHtml)
    .process(article.content);
  const contentHtml = processedContent.toString();


  return (
    <div className="bg-accent min-h-screen text-primary">
      <Navbar />
      <main className="w-full max-w-7xl mx-auto px-4 py-12 pt-32">
        {/* Section 1 - Header Artikel */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <p className="text-s">{new Date(article.date).toLocaleDateString("id-ID")}</p>
            <h1 className="text-4xl font-bold">{article.title}</h1>
            <p className="text-lg">{article.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="bg-[#3E3B32] text-[#D1C9A0] px-3 py-1 rounded-full text-sm">
                Kategori: {article.category}
              </span>
              <span className="bg-[#3E3B32] text-[#D1C9A0] px-3 py-1 rounded-full text-sm">
                {article.readingTime} menit baca
              </span>
              <span className="bg-[#3E3B32] text-[#D1C9A0] px-3 py-1 rounded-full text-sm">
                Penulis: {article.author.name}
              </span>
            </div>
          </div>

          <div className="w-full h-64 md:h-80 relative rounded-lg overflow-hidden shadow-lg">
            <Image
              src={article.image || "/images/dummy.jpg"}
              alt="Gambar Artikel"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </section>

        {/* Section 2 - Isi Artikel */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="col-span-2 space-y-6">
            <h2 className="text-2xl font-semibold text-primary">Isi Artikel</h2>
            {/* Menggunakan dangerouslySetInnerHTML untuk menampilkan HTML yang sudah diparsing */}
            <div
              className="text-lg text-primary"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </div>

          <div className="col-span-1">
            <div className="bg-[#3E3B32] rounded-lg p-6 shadow-lg text-center">
              <div className="w-24 h-24 mx-auto mb-4 relative">
                <Image
                  src={article.author.photoUrl || "/images/person.jpg"}
                  alt="Author"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold text-white">{article.author.name}</h3>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
