import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { Navbar } from "../../components/ui/navbar";
import BlogCard from "@/components/ui/blog-card";
import { getArticleBySlug } from "@/lib/api";
import { Footer } from "@/components/ui/footer";

export default async function TimelineDemo() {
  const article1 = await getArticleBySlug(
    "peta-kerentanan-tanah-longsor-tahunan-baru"
  );
  const article2 = await getArticleBySlug(
    "digitalisasi-teknologi-pertanian-tahunan"
  );
  const article3 = await getArticleBySlug(
    "sosialisasi-edukasi-keuangan-ojk-kediri"
  );
  const article4 = await getArticleBySlug("koperasi-desa-merah-putih-tahunan");
  const article5 = await getArticleBySlug("simbok-mineral-blok-tahunan-baru");
  const article6 = await getArticleBySlug("penanaman-gama-umami-pakan-hijauan");
  const article7 = await getArticleBySlug("cek-sehat-bersama-ptm");
  const article8 = await getArticleBySlug("serumah-sehat-dari-rumah-toga");

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
            {article1 && <BlogCard {...article1} />}
            {article2 && <BlogCard {...article2} />}
          </div>
        </div>
      ),
    },
    {
      title: "Sosial & Humaniora",
      content: (
        <div className="flex flex-col gap-6">
          {/* Deskripsi Klaster */}
          <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-300">
            Program pengabdian dalam bidang sosial dan humaniora berfokus pada
            penguatan modal sosial, pemberdayaan masyarakat, serta peningkatan
            kualitas hidup warga melalui pengembanan ekonomi dan pendidikan.
            Pendekatan ini menekankan kolaborasi dan keberlanjutan dalam
            membangun desa.
          </p>

          {/* Grid Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {article3 && <BlogCard {...article3} />}
            {article4 && <BlogCard {...article4} />}
          </div>
        </div>
      ),
    },
    {
      title: "Agrokompleks",
      content: (
        <div className="flex flex-col gap-6">
          {/* Deskripsi Klaster */}
          <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-300">
            Klaster agrokompleks berfokus pada sektor pertanian, peternakan, dan
            perikanan sebagai penopang utama perekonomian masyarakat. Program
            pengabdian meliputi peningkatan produktivitas, penerapan teknologi
            tepat guna, serta pengelolaan sumber daya alam yang berkelanjutan
            untuk mendukung ketahanan pangan desa.
          </p>

          {/* Grid Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {article5 && <BlogCard {...article5} />}
            {article6 && <BlogCard {...article6} />}
          </div>
        </div>
      ),
    },

    {
      title: "Medika",
      content: (
        <div className="flex flex-col gap-6">
          {/* Deskripsi Klaster */}
          <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-300">
            Klaster medika berfokus pada kesehatan masyarakat melalui program
            preventif, promotif, kuratif, dan rehabilitatif. Kegiatan yang
            dilaksanakan meliputi edukasi kesehatan, peningkatan akses layanan,
            serta penerapan perilaku hidup bersih dan sehat untuk meningkatkan
            kualitas hidup masyarakat.
          </p>

          {/* Grid Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {article7 && <BlogCard {...article7} />}
            {article8 && <BlogCard {...article8} />}
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="relative w-full overflow-clip">
      <Navbar />
      <main className="flex flex-col items-center justify-center text-center h-screen">
        <div className="flex flex-col items-center justify-center text-center bg-primary text-secondary rounded-2xl p-6 m-4 h-[90%] w-[95%] max-w-8xl">
          {/* Top Text */}
          <p className="text-sm mb-2">KKN PPM UGM 2025</p>

          {/* Section Title */}
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-2">
            Jejak Langkah <span className="italic">Langkara Talambo</span>
          </h1>
          <h1 className="text-2xl md:text-3xl font-medium leading-tight mb-6">
            Kisah Perjalanan, Dedikasi, dan Inspirasi
          </h1>

          {/* Decorative element */}
          <div className="w-16 h-1 bg-gradient-to-r from-accent to-secondary my-4"></div>
        </div>
      </main>
      <Timeline data={data} />
      <Footer />
    </div>
  );
}
