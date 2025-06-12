'use client'

import { Navbar } from '@/components/ui/navbar'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { fetchArticles } from '@/lib/api'
import { BlogCarousel } from '@/components/ui/blog-carousel'
import { DraggableCardBody, DraggableCardContainer } from '@/components/ui/draggable-card'

gsap.registerPlugin(ScrollTrigger)

interface Blog {
  _id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  slug: string;
}

export default function Home() {
  const router = useRouter()
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const items = [
    {
      title: "Tyler Durden",
      image:
        "https://images.unsplash.com/photo-1732310216648-603c0255c000?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-10 left-[20%] rotate-[-5deg]",
    },
    {
      title: "The Narrator",
      image:
        "https://images.unsplash.com/photo-1697909623564-3dae17f6c20b?q=80&w=2667&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-40 left-[25%] rotate-[-7deg]",
    },
    {
      title: "Iceland",
      image:
        "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-5 left-[40%] rotate-[8deg]",
    },
    {
      title: "Japan",
      image:
        "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=3648&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-32 left-[55%] rotate-[10deg]",
    },
    {
      title: "Norway",
      image:
        "https://images.unsplash.com/photo-1421789665209-c9b2a435e3dc?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-20 right-[35%] rotate-[2deg]",
    },
    {
      title: "New Zealand",
      image:
        "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=3070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-24 left-[45%] rotate-[-7deg]",
    },
    {
      title: "Canada",
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-8 left-[30%] rotate-[4deg]",
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
          // Blog List
          // <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          //   {blogs.map((blog) => (
          //     <BlogCard
          //       key={blog._id}
          //       title={blog.title}
          //       description={blog.description}
          //       slug={blog.slug}
          //       imageUrl={blog.thumbnailUrl }
          //     />
          //   ))}
          // </div>
          <BlogCarousel blogs={blogs}/>
          // <div className="relative overflow-hidden w-full h-full py-20">
          //   <Carousel slides={slideData} />
          // </div>
        )}
      </section>

      {/* ---- About Us Section ---- */}
      <section className="px-8 md:px-24 py-16 text-center">
        <h2 className="text-3xl md:text-5xl font-semibold mb-4">
          Meet Our Team
        </h2>
        <DraggableCardContainer className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-clip px-4 text-center">
        <div>
          <p className="text-base md:text-lg mb-6 max-w-2xl mx-auto">
            We are a passionate group of students committed to making a positive impact in Tegalombo. 
            Together through the Langkara Project, we aim to celebrate, preserve, and empower the local community.
          </p>
          <button 
            onClick={() => router.push('/about')}
            className="bg-secondary text-[#494633] px-8 py-3 rounded-full text-lg hover:bg-[#d4ad7f] transition-colors font-semibold"
          >
            Learn More About Us
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {items.map((item, index) => (
            <DraggableCardBody key={item.title || index} className={item.className}>
              <img
                src={item.image}
                alt={item.title}
                className="pointer-events-none relative z-10 h-80 w-80 object-cover"
              />
              <h3 className="mt-4 text-center text-2xl font-bold text-neutral-700 dark:text-neutral-300">
                {item.title}
              </h3>
            </DraggableCardBody>
          ))}
        </div>
      </DraggableCardContainer>
      </section>

    </div>
  )
}
