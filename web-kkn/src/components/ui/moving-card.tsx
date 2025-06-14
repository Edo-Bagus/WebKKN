"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const InfiniteMovingImages = ({
  images,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  images: string[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current?.appendChild(duplicatedItem);
      });
      setDirection();
      setSpeed();
      setStart(true);
    }
  }

  function setDirection() {
    containerRef.current?.style.setProperty(
      "--animation-direction",
      direction === "left" ? "forwards" : "reverse"
    );
  }

  function setSpeed() {
    const duration =
      speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
    containerRef.current?.style.setProperty("--animation-duration", duration);
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden",
        className
      )}
     
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-8 py-8 animate-scroll-curved",
          start && "animate-scroll-curved",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {images.map((img, idx) => (
          <li
            key={idx}
            className="relative shrink-0 w-[200px] h-[200px] rounded-lg overflow-hidden shadow-lg"
            style={{
              animation: `waveY 6s ease-in-out infinite alternate ${idx * 0.3}s`,
            }}
          >
            <img
              src={img}
              alt={`scroll-img-${idx}`}
              className="w-full h-full object-cover"
            />
          </li>
        ))}
      </ul>
      <style jsx>{`
        .animate-scroll-curved {
          display: flex;
          animation: scroll var(--animation-duration, 40s)
            linear var(--animation-direction, forwards) infinite;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes waveY {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>
    </div>
  );
};
