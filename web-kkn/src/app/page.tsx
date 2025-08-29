"use client";

import { Navbar } from "@/components/ui/navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BlogCarousel } from "@/components/ui/blog-carousel";
import { InfiniteMovingImages } from "@/components/ui/moving-card";
import { IArticle } from "@/models/Article";
import { Footer } from "@/components/ui/footer";

gsap.registerPlugin(ScrollTrigger);

interface Blog {
  _id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  slug: string;
}

export default function Home() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const images = [
    "https://res.cloudinary.com/di2xkoxx0/image/upload/v1756446703/IMG_8260_vjcpvl.jpg",
    "https://res.cloudinary.com/di2xkoxx0/image/upload/v1756446699/IMG_7474_bw1nm9.jpg",
    "https://res.cloudinary.com/di2xkoxx0/image/upload/v1756446693/IMG_9599_d5sdw8.jpg",
    "https://res.cloudinary.com/di2xkoxx0/image/upload/v1756446689/IMG_7394_b8ndtr.jpg",
    "https://res.cloudinary.com/di2xkoxx0/image/upload/v1756446691/IMG_7678_qxwlnu.jpg",
    "https://res.cloudinary.com/di2xkoxx0/image/upload/v1756446687/d46afb7c-c536-4e87-a674-615987e720fc_ioy3dv.jpg",
  ];

  useEffect(() => {
    async function loadArticles() {
      try {
        const res = await fetch("/api/articles?sort=desc&limit=5");
        if (!res.ok) throw new Error("Failed to fetch articles");
        const data = await res.json();

        const mapped = data.articles.map((article: IArticle) => ({
          _id: article._id,
          title: article.title,
          description: article.description,
          thumbnailUrl: article.thumbnailUrl,
          slug: article.slug,
        }));

        setBlogs(mapped);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadArticles();
  }, []);

  return (
    <div className="bg-accent min-h-screen text-primary">
      <Navbar />

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center text-center h-screen">
        <div className="flex flex-col items-center justify-center text-center bg-primary text-secondary rounded-2xl p-6 m-4 h-[90%] w-[95%] max-w-8xl">
          <p className="text-sm mb-2">KKN PPM UGM 2025</p>

          <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-2">
            Merangkai Cerita
          </h1>
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-6">
            Bersama Langkara Talambo
          </h1>

          <div className="w-16 h-1 bg-gradient-to-r from-accent to-secondary my-4"></div>
        </div>
      </main>

      {/* Tentang Langkara */}
      <section className="relative flex flex-col md:flex-row items-center justify-between gap-12 px-4 md:px-16 lg:px-32 py-16 min-h-[80vh] overflow-hidden">
        <div className="flex-1 text-center md:text-left relative z-30">
          <h2 className="text-3xl md:text-5xl font-semibold mb-6">
            Siapa Kami, <span className="italic">Langkara Talambo?</span>
          </h2>
          <p className="text-base md:text-lg leading-relaxed">
            Kami adalah tim mahasiswa yang hadir di Tegalombo dengan semangat
            kolaborasi dan pemberdayaan.{" "}
            <span className="font-semibold">Langkara Talambo</span> lahir dari
            keinginan untuk menjaga budaya, merawat alam, dan menggali potensi
            desa agar bisa tumbuh berkelanjutan. Bersama masyarakat, kami
            percaya setiap langkah kecil dapat membawa perubahan besar.
          </p>
        </div>

        <div className="flex-1 relative z-30">
          <div className="w-full h-64 md:h-96 rounded-lg shadow-lg overflow-hidden">
            <img
              src="https://res.cloudinary.com/di2xkoxx0/image/upload/v1756446688/IMG_7280_rugzmu.jpg"
              alt="Langkara Project"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="px-8 md:px-24 py-16 overflow-hidden">
        <h2 className="text-3xl md:text-5xl font-semibold text-center mb-12">
          Artikel Terbaru dari <span className="italic">Blog Kami</span>
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-full h-64 bg-gray-200 animate-pulse rounded-lg"
              />
            ))}
          </div>
        ) : (
          <BlogCarousel blogs={blogs} />
        )}
      </section>

      {/* Tentang Kami */}
      <section className="min-h-screen flex flex-col justify-center items-center px-8 md:px-24 py-16 text-center">
        <h2 className="text-3xl md:text-5xl font-semibold mb-4">
          Kenali Tim Kami
        </h2>

        <div className="h-[20rem] w-full flex items-center justify-center bg-accent dark:bg-black relative overflow-hidden mb-8">
          <InfiniteMovingImages
            images={images}
            direction="right"
            speed="normal"
          />
        </div>

        <div className="max-w-2xl mx-auto mb-4">
          <p className="text-base md:text-lg mb-6">
            Langkara Talambo hadir di Tegalombo dengan semangat untuk memberikan
            dampak nyata bagi masyarakat.
            <span className="font-semibold"> Langkara Talambo</span> terbentuk
            dari kolaborasi empat klaster KKN yang bersatu untuk satu tujuan:
            merayakan budaya, melestarikan alam, serta memberdayakan masyarakat
            lokal.
          </p>
          <button
            onClick={() => router.push("/about")}
            className="bg-secondary text-[#494633] px-6 py-2 rounded-full text-base hover:bg-[#d4ad7f] transition-colors font-semibold"
          >
            Pelajari Lebih Lanjut
          </button>
        </div>
      </section>

      {/* Sponsor */}
      <section className="px-8 md:px-24 py-16 bg-accent text-primary">
        <h2 className="text-3xl md:text-5xl font-semibold text-center mb-12">
          Dukungan dari <span className="italic">Sponsor</span>
        </h2>
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          {/* Baris 1: Medium Sponsors */}
          <div className="flex justify-center gap-8 flex-wrap">
            <img
              src="/sponsors/medium1.png"
              alt="Sponsor Medium 1"
              className="h-52 object-contain"
            />
            <img
              src="/sponsors/medium2.png"
              alt="Sponsor Medium 2"
              className="h-52 object-contain"
            />
          </div>

          {/* Baris 2: Small Sponsors 1-4 */}
          <div className="flex justify-center gap-4 flex-wrap">
            <img
              src="/sponsors/small1.png"
              alt="Sponsor Small 1"
              className="h-32 object-contain"
            />
            <img
              src="/sponsors/small2.png"
              alt="Sponsor Small 2"
              className="h-32 object-contain"
            />
            <img
              src="/sponsors/small3.png"
              alt="Sponsor Small 3"
              className="h-32 object-contain"
            />
            <img
              src="/sponsors/small4.png"
              alt="Sponsor Small 4"
              className="h-32 object-contain"
            />
          </div>

          {/* Baris 3: Small Sponsors 5-7 */}
          <div className="flex justify-center gap-4 flex-wrap">
            <img
              src="/sponsors/small5.png"
              alt="Sponsor Small 5"
              className="h-32 object-contain"
            />
            <img
              src="/sponsors/small6.png"
              alt="Sponsor Small 6"
              className="h-32 object-contain"
            />
            <img
              src="/sponsors/small7.png"
              alt="Sponsor Small 7"
              className="h-32 object-contain"
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
