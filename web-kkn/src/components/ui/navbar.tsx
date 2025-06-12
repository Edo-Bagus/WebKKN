'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY

        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down and not at top
          setShowNavbar(false)
        } else {
          // Scrolling up
          setShowNavbar(true)
        }

        setLastScrollY(currentScrollY)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

  return (
    <nav
      className={`fixed top-4 left-1/2 z-50 transform -translate-x-1/2 bg-primary rounded-2xl px-8 py-4 flex items-center justify-between w-[95%] max-w-8xl
      transition-transform duration-500 ease-in-out
      ${showNavbar ? 'translate-y-0' : '-translate-y-20'}`}
    >
      <div className="flex items-center space-x-2">
        {/* Logo / Site Name */}
        <Link href="/" className="text-lg font-semibold text-secondary">
          Langkara Tegalombo
        </Link>
      </div>
      <div className="flex items-center space-x-6">
        {/* Navigation Links */}
        <Link href="/timeline" className="hover:underline text-secondary">
          Our Story
        </Link>
        <Link href="/project" className="hover:underline text-secondary">
          Projects
        </Link>
        <Link href="/about" className="hover:underline text-secondary">
          Our Team
        </Link>
      </div>
    </nav>
  )
}
