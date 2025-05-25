'use client'

import { Navbar } from '@/app/components/navbar'
import Link from 'next/link'

export default function About() {
  return (
    <div className="bg-[#494633] min-h-screen text-[#F5F0E3]">
      <Navbar />

      <main className="flex flex-col items-center justify-center text-center p-8 pt-32">
        {/* Top Text */}
        <p className="text-sm mb-2">Get to Know Us</p>

        {/* Main Title */}
        <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-6">
          About <span className="italic">Langkara Project Team</span>
        </h1>

        {/* Decorative element */}
        <div className="w-16 h-1 bg-gradient-to-r from-[#E0C49A] to-[#E0C49A] my-4"></div>

        {/* About Content */}
        <section className="max-w-4xl mt-12 text-base md:text-lg leading-relaxed text-[#dcd6c9] space-y-6">
          <p>
            We are a passionate team from Universitas Gadjah Mada participating in the KKN-PPM program,
            dedicating our efforts to Tegalombo's local development. Our focus lies in promoting eco-tourism,
            preserving cultural heritage, and empowering the community through sustainable initiatives.
          </p>

          <p>
            Together, we believe that by working hand-in-hand with the local community, we can build
            a resilient future that honors the richness of Tegalombo's natural and cultural treasures.
          </p>

          <p>
            Our diverse backgrounds, ranging from social sciences, agriculture, engineering, and health,
            allow us to collaborate and create meaningful, long-lasting impacts.
          </p>
        </section>

        {/* Back to Home Button */}
        <div className="mt-12">
          <Link href="/">
            <button className="bg-[#E0C49A] text-[#494633] px-8 py-3 rounded-full text-lg hover:bg-[#d5b890] transition-colors">
              Back to Home
            </button>
          </Link>
        </div>
      </main>
    </div>
  )
}
