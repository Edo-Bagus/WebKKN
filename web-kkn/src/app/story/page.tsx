"use client";

import React, { useEffect, useState } from "react";
import { Timeline } from "@/components/ui/timeline";
import { Navbar } from "../../components/ui/navbar";
import BlogCard from "@/components/ui/blog-card";
import { Footer } from "@/components/ui/footer";

export default function TimelineDemoClient() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      const slugs = [
        "peta-kerentanan-tanah-longsor-tahunan-baru",
        "digitalisasi-teknologi-pertanian-tahunan",
        "sosialisasi-edukasi-keuangan-ojk-kediri",
        "koperasi-desa-merah-putih-tahunan",
        "simbok-mineral-blok-tahunan-baru",
        "penanaman-gama-umami-pakan-hijauan",
        "cek-sehat-bersama-ptm",
        "serumah-sehat-dari-rumah-toga",
      ];

      try {
        const promises = slugs.map(async (slug) => {
          const res = await fetch(
            `/api/articles/${slug}`
          );
          if (!res.ok) throw new Error(`Gagal fetch artikel: ${slug}`);
          return res.json();
        });

        const articlesData = await Promise.all(promises);
        setArticles(articlesData);
      } catch (err) {
        console.error("Gagal memuat artikel", err);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  const data = [
    {
      title: "Sains & Teknologi",
      content: (
        <div className="flex flex-col gap-6">
          <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-300">
            Pengabdian dalam bidang sains dan teknologi difokuskan untuk
            mengembangkan inovasi yang bermanfaat bagi masyarakat di Desa
            Tahunan dan Tahunan Baru. Program ini mencakup penerapan teknologi
            tepat guna serta edukasi digital yang mendukung kemandirian desa
            dengan berbasis mitigasi bencana.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles[0] && <BlogCard {...articles[0]} />}
            {articles[1] && <BlogCard {...articles[1]} />}
          </div>
        </div>
      ),
    },
    {
      title: "Sosial & Humaniora",
      content: (
        <div className="flex flex-col gap-6">
          <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-300">
            Program pengabdian dalam bidang sosial dan humaniora berfokus pada
            penguatan modal sosial, pemberdayaan masyarakat, serta peningkatan
            kualitas hidup warga melalui pengembanan ekonomi dan pendidikan.
            Pendekatan ini menekankan kolaborasi dan keberlanjutan dalam
            membangun desa.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles[2] && <BlogCard {...articles[2]} />}
            {articles[3] && <BlogCard {...articles[3]} />}
          </div>
        </div>
      ),
    },
    {
      title: "Agrokompleks",
      content: (
        <div className="flex flex-col gap-6">
          <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-300">
            Klaster agrokompleks berfokus pada sektor pertanian, peternakan, dan
            perikanan sebagai penopang utama perekonomian masyarakat. Program
            pengabdian meliputi peningkatan produktivitas, penerapan teknologi
            tepat guna, serta pengelolaan sumber daya alam yang berkelanjutan
            untuk mendukung ketahanan pangan desa.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles[4] && <BlogCard {...articles[4]} />}
            {articles[5] && <BlogCard {...articles[5]} />}
          </div>
        </div>
      ),
    },
    {
      title: "Medika",
      content: (
        <div className="flex flex-col gap-6">
          <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-300">
            Klaster medika berfokus pada kesehatan masyarakat melalui program
            preventif, promotif, kuratif, dan rehabilitatif. Kegiatan yang
            dilaksanakan meliputi edukasi kesehatan, peningkatan akses layanan,
            serta penerapan perilaku hidup bersih dan sehat untuk meningkatkan
            kualitas hidup masyarakat.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles[6] && <BlogCard {...articles[6]} />}
            {articles[7] && <BlogCard {...articles[7]} />}
          </div>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-clip">
      <Navbar />
      <main className="flex flex-col items-center justify-center text-center h-screen">
        <div className="flex flex-col items-center justify-center text-center bg-primary text-secondary rounded-2xl p-6 m-4 h-[90%] w-[95%] max-w-8xl">
          <p className="text-sm mb-2">KKN PPM UGM 2025</p>
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-2">
            Jejak Langkah <span className="italic">Langkara Talambo</span>
          </h1>
          <h1 className="text-2xl md:text-3xl font-medium leading-tight mb-6">
            Kisah Perjalanan, Dedikasi, dan Inspirasi
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-accent to-secondary my-4"></div>
        </div>
      </main>
      <Timeline data={data} />
      <Footer />
    </div>
  );
}
