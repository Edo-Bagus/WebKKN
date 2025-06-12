'use client'

import { useEffect, useState } from 'react'
import BlogCard from '@/components/ui/blog-card'
import { Navbar } from '../../components/ui/navbar'

export default function ProjectPage() {
  const [projects, setProjects] = useState([])
  const [search, setSearch] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedPeople, setSelectedPeople] = useState<string[]>([])
  const [sortOrder, setSortOrder] = useState<'terbaru' | 'terlama'>('terbaru')

  const fetchProjects = async () => {
    const params = new URLSearchParams()
    if (search) params.append('search', search)
    if (selectedCategories.length) params.append('categories', selectedCategories.join(','))
    if (selectedPeople.length) params.append('people', selectedPeople.join(','))
    params.append('sort', sortOrder === 'terbaru' ? 'desc' : 'asc')

    const res = await fetch(`/api/articles?${params.toString()}`)
    const data = await res.json()
    setProjects(data)
  }

  useEffect(() => {
    fetchProjects()
  }, [search, selectedCategories, selectedPeople, sortOrder])

  const allCategories = [...new Set(projects.flatMap((p: any) => p.category))]
  const allPeople = [...new Set(projects.flatMap((p: any) => p.people || []))]

  const toggleSelection = (value: string, list: string[], setter: (val: string[]) => void) => {
    setter(
      list.includes(value)
        ? list.filter((item) => item !== value)
        : [...list, value]
    )
  }

  return (
    <main className="min-h-screen bg-accent px-6 py-10">
      <Navbar />
      <h1 className="text-3xl font-bold text-primary mb-8 text-center">Proyek KKN Kami</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filter Sidebar */}
        <aside className="bg-white p-4 rounded-xl shadow col-span-1 space-y-4">
          <input
            type="text"
            placeholder="Cari proyek..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
          />

          <div>
            <h2 className="font-semibold mb-2">Filter Klaster</h2>
            {allCategories.map((cat) => (
              <label key={cat} className="flex items-center space-x-2 mb-1">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleSelection(cat, selectedCategories, setSelectedCategories)}
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>

          <div>
            <h2 className="font-semibold mb-2">Filter Orang</h2>
            {allPeople.map((person) => (
              <label key={person} className="flex items-center space-x-2 mb-1">
                <input
                  type="checkbox"
                  checked={selectedPeople.includes(person)}
                  onChange={() => toggleSelection(person, selectedPeople, setSelectedPeople)}
                />
                <span>{person}</span>
              </label>
            ))}
          </div>

          <div>
            <h2 className="font-semibold mb-2">Urutkan</h2>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'terbaru' | 'terlama')}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg bg-white text-primary focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              <option value="terbaru">Waktu Terbaru</option>
              <option value="terlama">Waktu Terlama</option>
            </select>
          </div>
        </aside>

        {/* Article Cards */}
        <section className="col-span-1 md:col-span-3">
          {projects.length === 0 ? (
            <p className="text-center text-neutral-500">Tidak ada proyek yang ditemukan.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project: any) => (
                <BlogCard key={project.slug} {...project} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}