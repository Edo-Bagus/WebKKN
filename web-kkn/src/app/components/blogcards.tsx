'use client'

import Link from 'next/link'

interface BlogCardProps {
  title: string
  description: string
  imageUrl: string
  slug: string // Tambahkan slug
}

export function BlogCard({ title, description, imageUrl, slug }: BlogCardProps) {
  return (
    <Link href={`/article/${slug}`} passHref>
      <div className="bg-[#F5F0E3] rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform cursor-pointer">
        <div className="w-full h-48 bg-gray-300">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="p-4 text-[#494633]">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-sm text-gray-700">{description}</p>
        </div>
      </div>
    </Link>
  )
}
