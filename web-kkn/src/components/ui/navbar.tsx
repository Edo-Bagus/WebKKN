'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

export function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false)
        setIsMenuOpen(false)
      } else {
        setShowNavbar(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <nav
      className={`fixed top-4 left-1/2 z-50 transform -translate-x-1/2 bg-primary rounded-2xl px-6 py-4 flex items-center justify-between w-[95%] max-w-8xl
      transition-transform duration-500 ease-in-out
      ${showNavbar ? 'translate-y-0' : '-translate-y-20'}`}
    >
      {/* Logo */}
      <Link href="/" className="text-lg font-semibold text-secondary">
        Langkara Talambo
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-6">
        <Link href="/story" className="hover:underline text-secondary">
          Cerita Kami
        </Link>
        <Link href="/project" className="hover:underline text-secondary">
          Program
        </Link>
        <Link href="/about" className="hover:underline text-secondary">
          Tim Kami
        </Link>
      </div>

      {/* Toggle Button for Mobile */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-secondary">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu with Animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute top-[75%] left-0 w-full bg-primary rounded-b-2xl px-6 py-4 flex flex-col space-y-4 md:hidden overflow-hidden"
          >
            <Link
              href="/story"
              className="text-secondary hover:underline"
              onClick={() => setIsMenuOpen(false)}
            >
              Cerita Kami
            </Link>
            <Link
              href="/project"
              className="text-secondary hover:underline"
              onClick={() => setIsMenuOpen(false)}
            >
              Program
            </Link>
            <Link
              href="/about"
              className="text-secondary hover:underline"
              onClick={() => setIsMenuOpen(false)}
            >
              Tim Kami
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
