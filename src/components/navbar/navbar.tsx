'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Github, ArrowRight } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [stars, setStars] = useState<number | null>(null)
  const [scrolled, setScrolled] = useState(false)

  const navItems = [
    { name: 'Blogs', href: '/blogs' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms Of Use', href: '/terms-of-use' },
    { name: 'ERP Campus', href: '/erp-campus' },
    { name: 'ERP Manufacturing', href: '/erp-manufacturing' },
    { name: 'Tech Stack', href: '/tech-stack' },
  ]

  useEffect(() => {
    async function fetchStars() {
      try {
        const res = await fetch('https://api.github.com/repos/optionxi/optionxi-website')
        const data = await res.json()
        setStars(data.stargazers_count)
      } catch (err) {
        console.error('Error fetching stars:', err)
      }
    }
    fetchStars()

    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur border-b transition-colors print:hidden ${
        scrolled ? 'bg-white/90 border-gray-200' : 'bg-white/70 border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-16 flex items-center justify-between">
          {/* Left: Logo + Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <img
              src="/assets/images/logo_xi.png"
              alt="OptionXi Logo"
              className="w-8 h-8 rounded-lg transition-transform duration-300 group-hover:scale-110"
            />
            <span className="font-bold text-lg tracking-tight text-gray-900">
              OptionXi
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-emerald-600 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right: GitHub + Auth */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/optionxi/optionxi-website"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300 text-sm font-medium transition-colors"
            >
              <Github size={15} />
              {stars !== null ? stars.toLocaleString() : '...'}
            </a>

            <Link
              href="https://app.optionxi.com"
              className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
            >
              Login Now <ArrowRight size={14} />
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 text-gray-600 hover:text-gray-900 transition-colors"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? <Menu size={18} /> : <X size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white" id="mobile-menu">
          <div className="px-4 pt-3 pb-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-3 rounded-xl text-[15px] font-medium text-gray-700 hover:bg-gray-50 hover:text-emerald-600 transition-colors"
              >
                {item.name}
              </Link>
            ))}

            <a
              href="https://github.com/optionxi/optionxi-website"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-3 mt-2 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium"
            >
              <Github size={16} />
              {stars !== null ? `${stars.toLocaleString()} stars` : 'Loading...'}
            </a>

            <Link
              href="https://app.optionxi.com"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-1.5 mt-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-3 rounded-full transition-colors"
            >
              Login Now <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}