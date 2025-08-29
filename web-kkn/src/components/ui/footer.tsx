'use client'

import Link from "next/link"
import { IconBrandInstagram, IconBrandTiktok, IconMail } from "@tabler/icons-react"

export function Footer() {
  return (
    <footer className="w-full bg-primary rounded-t-2xl mt-16 px-6 py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo / Title */}
        <Link href="/" className="text-lg font-semibold text-secondary">
          Langkara Talambo
        </Link>

        {/* Social Links */}
        <div className="flex items-center gap-6">
          <a
            href="https://www.instagram.com/langkara.talambo/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:opacity-80 transition"
          >
            <IconBrandInstagram size={28} />
          </a>
          <a
            href="https://www.tiktok.com/@langkara_talambo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:opacity-80 transition"
          >
            <IconBrandTiktok size={28} />
          </a>
          <a
            href="mailto:kknlangkara.talambo@gmail.com"
            className="text-secondary hover:opacity-80 transition"
          >
            <IconMail size={28} />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-6 text-center text-sm text-secondary/70">
        © {new Date().getFullYear()} Langkara Talambo. All rights reserved.
      </div>
    </footer>
  )
}
