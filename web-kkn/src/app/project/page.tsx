// app/project/page.tsx
'use client'

import { useState } from 'react'
import { BlogCard } from '@/app/components/blogcards'
import { Navbar } from '../components/navbar'

const dummyData = [
  {
    title: 'Pembuatan Greenhouse di Simueng',
    description: 'Tim KKN membangun greenhouse sederhana untuk pertanian berkelanjutan.',
    imageUrl: '/images/greenhouse.jpg',
    slug: 'greenhouse-simueng',
    category: 'Pertanian',
  },
  {
    title: 'Workshop Daur Ulang Sampah',
    description: 'Edukasi masyarakat tentang pemilahan dan pengolahan sampah menjadi barang berguna.',
    imageUrl: '/images/recycle.jpg',
    slug: 'daur-ulang',
    category: 'Lingkungan',
  },
  {
    title: 'Pelatihan Digitalisasi UMKM',
    description: 'Membantu UMKM lokal masuk ke platform digital untuk memperluas pasar.',
    imageUrl: '/images/umkm.jpg',
    slug: 'digitalisasi-umkm',
    category: 'Ekonomi',
  },
  // Tambahkan lebih banyak data sesuai kebutuhan
]

export default function ProjectPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('Semua')

  const filteredProjects = dummyData.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === 'Semua' || project.category === filter
    return matchesSearch && matchesFilter
  })

  const uniqueCategories = ['Semua', ...new Set(dummyData.map((item) => item.category))]

  return (
    <main className="min-h-screen bg-accent px-6 py-10">
        <Navbar />
      <h1 className="text-3xl font-bold text-primary mb-6 text-center">Proyek KKN Kami</h1>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
        <input
          type="text"
          placeholder="Cari proyek..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full md:w-1/4 px-4 py-2 border border-neutral-300 rounded-lg bg-white text-primary focus:outline-none focus:ring-2 focus:ring-secondary"
        >
          {uniqueCategories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Card Grid */}
      {filteredProjects.length === 0 ? (
        <p className="text-center text-neutral-500">Tidak ada proyek yang ditemukan.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <BlogCard key={project.slug} {...project} />
          ))}
        </div>
      )}
    </main>
  )
}
