"use client";
import { useId, useState } from "react";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { BlogCardSlide } from "./blog-slide";

interface Blog {
  _id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  slug: string;
}

export function BlogCarousel({ blogs }: { blogs: Blog[] }) {
  const [current, setCurrent] = useState(0);
  const id = useId();

  const handlePrevious = () => {
    const prev = current - 1;
    setCurrent(prev < 0 ? blogs.length - 1 : prev);
  };

  const handleNext = () => {
    const next = current + 1;
    setCurrent(next === blogs.length ? 0 : next);
  };

  const handleSlideClick = (index: number) => {
    if (current !== index) setCurrent(index);
  };

  return (
    <div className="relative w-[70vmin] h-[70vmin] mx-auto" aria-labelledby={`carousel-heading-${id}`}>
      <ul className="absolute flex mx-[-4vmin] transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${current * (100 / blogs.length)}%)` }}>
        {blogs.map((blog, index) => (
          <BlogCardSlide
            key={blog._id}
            blog={blog}
            index={index}
            current={current}
            handleSlideClick={handleSlideClick}
          />
        ))}
      </ul>

      <div className="absolute flex justify-center w-full top-[calc(100%+1rem)]">
        <button
          title="Previous"
          onClick={handlePrevious}
          className="w-10 h-10 mx-2 rounded-full bg-secondary dark:bg-neutral-800 flex items-center justify-center hover:scale-105 transition"
        >
          <IconArrowNarrowRight className="rotate-180 text-neutral-700 dark:text-white" />
        </button>

        <button
          title="Next"
          onClick={handleNext}
          className="w-10 h-10 mx-2 rounded-full bg-secondary dark:bg-neutral-800 flex items-center justify-center hover:scale-105 transition"
        >
          <IconArrowNarrowRight className="text-neutral-700 dark:text-white" />
        </button>
      </div>
    </div>
  );
}
