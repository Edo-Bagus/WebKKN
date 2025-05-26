'use client'

import { Navbar } from '@/app/components/navbar'
import  BlogCard  from '@/components/ui/blog-card'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { fetchArticles } from '@/lib/api'
import MapEmbed from './components/map'
import { Carousel } from '@/components/ui/carousel'

gsap.registerPlugin(ScrollTrigger)

interface Blog {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  slug: string;
}

export default function Home() {
  const router = useRouter()
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const slideData = [
    {
      title: "Mystic Mountains",
      button: "Explore Component",
      src: "https://images.unsplash.com/photo-1494806812796-244fe51b774d?q=80&w=3534&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Urban Dreams",
      button: "Explore Component",
      src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Neon Nights",
      button: "Explore Component",
      src: "https://images.unsplash.com/photo-1590041794748-2d8eb73a571c?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Desert Whispers",
      button: "Explore Component",
      src: "https://images.unsplash.com/photo-1679420437432-80cfbf88986c?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  useEffect(() => {
    async function loadArticles() {
      const articles = await fetchArticles('desc', 3); // misalnya ambil 5 terbaru
      const mapped = articles.map((article: any) => ({
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
        <div className='flex flex-col items-center justify-center text-center bg-primary text-secondary rounded-2xl p-6 m-4 h-[90%] w-[95%] max-w-8xl'>
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

      {/* ---- Horizontal Scroll Section ---- */}
      {/* <section className="overflow-x-hidden overflow-y-hidden">
        <div ref={containerRef} className="flex w-[200vw] h-screen">
          <div className="panel w-screen h-screen bg-[#494633] flex items-center justify-center text-white text-5xl font-bold">
            Section 1
          </div>
          <div className="panel w-screen h-screen bg-[#F5F0E3] flex items-center justify-center text-[#494633] text-5xl font-bold">
            Section 2
          </div>
        </div>
      </section> */}

      {/* What is Langkara Project section */}
      <section className="relative flex flex-col md:flex-row items-center justify-between gap-12 px-8 md:px-24 py-16 h-screen overflow-hidden">

        {/* Main Content */}
        <div className="flex-1 text-center md:text-left relative z-30">
          <h2 className="text-3xl md:text-5xl font-semibold mb-6">
            What is <span className="italic">Langkara</span> Project?
          </h2>
          <p className="text-base md:text-lg leading-relaxed">
            Langkara Project is a community-driven initiative focused on preserving the culture,
            nature, and hidden treasures of Tegalombo. Together, we build a sustainable future
            while honoring the rich heritage of the region.
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
      <section className="px-8 md:px-24 py-16">
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
          // Blog List
          // <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          //   {blogs.map((blog) => (
          //     <BlogCard
          //       key={blog._id}
          //       title={blog.title}
          //       description={blog.description}
          //       slug={blog.slug}
          //       imageUrl={blog.imageUrl }
          //     />
          //   ))}
          // </div>
          <div className="relative overflow-hidden w-full h-full py-20">
            <Carousel slides={slideData} />
          </div>
        )}
      </section>

      {/* ---- About Us Section ---- */}
      <section className="px-8 md:px-24 py-16 text-center">
        <h2 className="text-3xl md:text-5xl font-semibold mb-6">
          Meet Our Team
        </h2>
        <p className="text-base md:text-lg mb-8 max-w-2xl mx-auto">
          We are a passionate group of students committed to making a positive impact in Tegalombo. 
          Together through the Langkara Project, we aim to celebrate, preserve, and empower the local community.
        </p>
        <button 
          onClick={() => router.push('/about')}
          className="bg-[#E0C49A] text-[#494633] px-8 py-3 rounded-full text-lg hover:bg-[#d4ad7f] transition-colors"
        >
          Learn More About Us
        </button>
      </section>

      {/* ---- Final CTA Section ---- */}
      <section className="px-8 md:px-24 py-20 text-center">
        <h2 className="text-3xl md:text-5xl font-semibold mb-6">
          Ready to <span className="italic">Explore</span> Tegalombo?
        </h2>
        <p className="text-base md:text-lg mb-8 max-w-2xl mx-auto">
          Join our community to uncover hidden destinations, preserve the rich culture, and make a difference together. Be part of the Langkara Project movement!
        </p>
        <button className="bg-[#E0C49A] text-[#494633] px-8 py-3 rounded-full text-lg hover:bg-[#333229] transition-colors">
          Join the Movement
        </button>
      </section>

    </div>
  )
}
