// app/project/page.tsx
'use client'

import { useState } from 'react'
import { BlogCard } from '@/app/components/blogcards'
import { Navbar } from '../components/navbar'
import { LangkaraCard } from '../components/card'


export default function ProjectPage() {
  return (
    <main className="min-h-screen bg-accent px-6 py-10 flex items-center justify-center">
        <Navbar />
       <LangkaraCard />
    </main>
  )
}
