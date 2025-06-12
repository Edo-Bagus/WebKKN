"use client";
import { useRef, useEffect } from "react";
import Link from "next/link";

interface BlogCardSlideProps {
  blog: {
    title: string;
    description: string;
    thumbnailUrl: string;
    slug: string;
  };
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
}

export function BlogCardSlide({
  blog,
  index,
  current,
  handleSlideClick,
}: BlogCardSlideProps) {
  const slideRef = useRef<HTMLLIElement>(null);
  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;
      slideRef.current.style.setProperty("--x", `${xRef.current}px`);
      slideRef.current.style.setProperty("--y", `${yRef.current}px`);
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current!);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = slideRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    xRef.current = e.clientX - (r.left + r.width / 2);
    yRef.current = e.clientY - (r.top + r.height / 2);
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  return (
    <div className="[perspective:1200px] [transform-style:preserve-3d]">
      <li
        ref={slideRef}
        className="flex flex-1 flex-col items-center justify-center relative text-white w-[70vmin] h-[70vmin] mx-[4vmin]"
        onClick={() => handleSlideClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform:
            current !== index
              ? "scale(0.98) rotateX(8deg)"
              : "scale(1) rotateX(0deg)",
          transition: "transform 0.5s ease",
          transformOrigin: "bottom",
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full bg-[#1D1F2F] rounded-xl overflow-hidden"
          style={{
            transform:
              current === index
                ? "translate3d(calc(var(--x)/30), calc(var(--y)/30), 0)"
                : "none",
          }}
        >
          <img
            src={blog.thumbnailUrl}
            alt={blog.title}
            className="absolute inset-0 w-full h-full object-cover opacity-100 transition-opacity duration-500"
          />
          {current === index && (
            <div className="absolute inset-0 bg-black/40 transition-all duration-1000" />
          )}
        </div>

        <article
          className={`relative p-8 z-10 ${
            current === index ? "opacity-100" : "opacity-0"
          } transition-opacity duration-500 text-center`}
        >
          <h2 className="text-xl md:text-2xl font-bold">{blog.title}</h2>
          <p className="text-sm mt-2 line-clamp-3">{blog.description}</p>
          <Link href={`/article/${blog.slug}`}>
            <button className="mt-4 px-4 py-2 bg-white text-black rounded-full hover:shadow-md transition">
              Read More
            </button>
          </Link>
        </article>
      </li>
    </div>
  );
}
