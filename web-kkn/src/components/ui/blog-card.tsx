"use client";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  title: string;
  description: string;
  slug: string;
  imageUrl: string;
}

export default function BlogCard({
  title,
  description,
  slug,
  imageUrl,
}: BlogCardProps) {
  return (
    <Link href={`/article/${slug}`} className="max-w-xs w-full group/card block">
      <div
        className={cn(
          "cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl max-w-sm mx-auto flex flex-col justify-between p-4 bg-cover bg-center"
        )}
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        {/* Darker Overlay */}
        <div className="absolute w-full h-full top-0 left-0 bg-black/70 transition duration-300 group-hover/card:bg-black/80 z-0"></div>

        {/* Author section */}
        <div className="flex flex-row items-center space-x-4 z-10">
          <Image
            height={100}
            width={100}
            alt="Avatar"
            src="/images/person.jpg"
            className="h-10 w-10 rounded-full border-2 object-cover"
          />
          <div className="flex flex-col">
            <p className="font-normal text-base text-gray-50 relative z-10">
              Manu Arora
            </p>
            <p className="text-sm text-gray-400">2 min read</p>
          </div>
        </div>

        {/* Blog content */}
        <div className="text content z-10">
          <h1 className="font-bold text-xl md:text-2xl text-gray-50 relative">
            {title}
          </h1>
          <p className="font-normal text-sm text-gray-50 relative my-4">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
