"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState, useRef } from "react";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string; // video source
  instagram?: string;
  linkedin?: string;
  email?: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handleNext = () => setActive((p) => (p + 1) % testimonials.length);
  const handlePrev = () =>
    setActive((p) => (p - 1 + testimonials.length) % testimonials.length);
  const isActive = (i: number) => i === active;

  useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(handleNext, 5000);
    return () => clearInterval(id);
  }, [autoplay]);

  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === active) video.play().catch(() => {});
      else video.pause();
    });
  }, [active]);

  const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-20 antialiased">
      {/* FIX: flex layout with a FIXED video column that never shrinks */}
      <div className="flex flex-col items-center gap-12 md:flex-row md:items-center">
        {/* Video column — fixed width, fixed aspect, shrink-proof */}
        <div className="shrink-0 w-[280px] md:w-[340px]">
          {/* Use portrait ratio; change to 'aspect-video' if your clips are landscape */}
          <div className="relative aspect-[1/1] w-full rounded-3xl">
            <AnimatePresence initial={false}>
              {testimonials.map((t, i) => (
                <motion.div
                  key={`${t.name}-${i}`}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(i) ? 1 : 0.7,
                    scale: isActive(i) ? 1 : 0.95,
                    z: isActive(i) ? 0 : -100,
                    rotate: isActive(i) ? 0 : randomRotateY(),
                    zIndex: isActive(i) ? 40 : testimonials.length + 2 - i,
                    y: isActive(i) ? [0, -30, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0 origin-bottom"
                >
                  <video
                    ref={(el) => {
                      videoRefs.current[i] = el;
                    }}
                    src={t.src}
                    muted
                    playsInline
                    loop
                    className="absolute inset-0 h-full w-full object-cover rounded-3xl"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="shrink-0 w-[280px] md:w-[340px]">
  {/* Text column — can grow/shrink freely without affecting video size */}
  <div className="flex-1 flex flex-col items-center justify-center text-center">
    <motion.div
      key={active}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <h3 className="text-3xl md:text-4xl font-bold text-accent">
        {testimonials[active].name}
      </h3>
      <p className="mt-2 text-lg md:text-xl text-accent">
        {testimonials[active].designation}
      </p>
    </motion.div>

    <div className="mt-8 flex justify-center gap-6">
      <button
        onClick={handlePrev}
        className="group/button flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--muted))]"
      >
        <IconArrowLeft className="h-7 w-7 text-foreground transition-transform duration-300 group-hover/button:rotate-12" />
      </button>
      <button
        onClick={handleNext}
        className="group/button flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--muted))]"
      >
        <IconArrowRight className="h-7 w-7 text-foreground transition-transform duration-300 group-hover/button:-rotate-12" />
      </button>
    </div>
  </div>
</div>

      </div>
    </div>
  );
};
