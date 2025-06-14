"use client";

import { Navbar } from "@/components/ui/navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fetchArticles } from "@/lib/api";
import { BlogCarousel } from "@/components/ui/blog-carousel";
import { InfiniteMovingImages } from "@/components/ui/moving-card";
import { IArticle } from "@/models/Article";

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
    "/images/dummy.jpg",
    "/images/dummy2.jpg",
    "/images/dummy3.jpg",
    "/images/dummy4.jpg",
    "/images/dummy5.jpg",
  ];

  useEffect(() => {
    async function loadArticles() {
      const data = await fetchArticles("desc", 5); // misalnya ambil 5 terbaru
      const mapped = data.articles.map((article: IArticle) => ({
        _id: article._id,
        title: article.title,
        description: article.description,
        thumbnailUrl: article.thumbnailUrl,
        slug: article.slug,
      }));
      setBlogs(mapped);
      setLoading(false);
    }

    loadArticles();
  }, []);

  return (
    <div className="bg-accent min-h-screen text-primary">
      <Navbar />

      <main className="flex flex-col items-center justify-center text-center h-screen">
        <div className="flex flex-col items-center justify-center text-center bg-primary text-secondary rounded-2xl p-6 m-4 h-[90%] w-[95%] max-w-8xl">
          {/* Top Text */}
          <p className="text-sm mb-2">KKN PPM UGM 2025</p>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-2">
            Unveiling <span className="italic">Tegalombo&apos;s</span>
          </h1>
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-6">
            Hidden Gems
          </h1>

          {/* Decorative element */}
          <div className="w-16 h-1 bg-gradient-to-r from-accent to-secondary my-4"></div>
        </div>
      </main>

      {/* What is Langkara Project section */}
      <section className="relative flex flex-col md:flex-row items-center justify-between gap-12 px-4 md:px-16 lg:px-32 py-16 min-h-[80vh] overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 text-center md:text-left relative z-30">
          <h2 className="text-3xl md:text-5xl font-semibold mb-6">
            What is <span className="italic">Langkara</span> Project?
          </h2>
          <p className="text-base md:text-lg leading-relaxed">
            Langkara Project is a community-driven initiative focused on
            preserving the culture, nature, and hidden treasures of Tegalombo.
            Together, we build a sustainable future while honoring the rich
            heritage of the region.
          </p>
        </div>

        <div className="flex-1 relative z-30">
          <div className="w-full h-64 md:h-96 rounded-lg shadow-lg overflow-hidden">
            <img
              src="/images/dummy.jpg"
              alt="Deskripsi Gambar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ---- Blog Section ---- */}
      <section className="px-8 md:px-24 py-16 overflow-hidden">
        <h2 className="text-3xl md:text-5xl font-semibold text-center mb-12">
          Latest from <span className="italic">Our Blog</span>
        </h2>
        {/* <BlogCard /> */}

        {loading ? (
          // Loading State
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

      {/* ---- About Us Section ---- */}
      <section className="min-h-screen flex flex-col justify-center items-center px-8 md:px-24 py-16 text-center">
        <h2 className="text-3xl md:text-5xl font-semibold mb-4">
          Meet Our Team
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
            We are a passionate group of students committed to making a positive
            impact in Tegalombo. Together through the Langkara Project, we aim
            to celebrate, preserve, and empower the local community.
          </p>
          <button
            onClick={() => router.push("/about")}
            className="bg-secondary text-[#494633] px-6 py-2 rounded-full text-base hover:bg-[#d4ad7f] transition-colors font-semibold"
          >
            Learn More About Us
          </button>
        </div>
      </section>

      {/* ---- Sponsors Section ---- */}
      {/* ---- Sponsor Section ---- */}
      <section className="px-8 md:px-24 py-16 bg-accent text-primary">
        <h2 className="text-3xl md:text-5xl font-semibold text-center mb-12">
          Our <span className="italic">Supporters</span>
        </h2>
        <div className="relative flex flex-wrap justify-center items-start gap-4 md:gap-8 max-w-6xl mx-auto">
          {/* Medium Sponsors */}
          <img
            src="/sponsors/medium1.png"
            alt="Sponsor Medium 1"
            className="h-24 object-contain"
          />
          <img
            src="/sponsors/medium2.png"
            alt="Sponsor Medium 2"
            className="h-24 object-contain"
          />

          {/* Small Sponsors */}
          <img
            src="/sponsors/small1.png"
            alt="Sponsor Small 1"
            className="h-16 object-contain"
          />
          <img
            src="/sponsors/small2.png"
            alt="Sponsor Small 2"
            className="h-16 object-contain"
          />
          <img
            src="/sponsors/small3.png"
            alt="Sponsor Small 3"
            className="h-16 object-contain"
          />
          <img
            src="/sponsors/small4.png"
            alt="Sponsor Small 4"
            className="h-16 object-contain"
          />
          <img
            src="/sponsors/small5.png"
            alt="Sponsor Small 5"
            className="h-16 object-contain"
          />
          <img
            src="/sponsors/small6.png"
            alt="Sponsor Small 6"
            className="h-16 object-contain"
          />
        </div>
      </section>
    </div>
  );
}
