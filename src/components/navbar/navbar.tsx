'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Github, ArrowRight, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [stars, setStars] = useState<number | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  const navItems = [
    { name: 'Blogs', href: '/blogs' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms Of Use', href: '/terms-of-use' },
    { name: 'ERP Campus', href: '/erp-campus' },
    { name: 'ERP Manufacturing', href: '/erp-manufacturing' },
    { name: 'Tech Stack', href: '/tech-stack' },
  ]

  useEffect(() => {
    setMounted(true)

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

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur border-b transition-colors print:hidden ${
        scrolled ? 'bg-background/90 border-border' : 'bg-background/70 border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Left: Logo + Brand */}
          <Link href="/" className="flex items-center gap-2 group">
            <img
              src="/assets/images/logo_xi.png"
              alt="OptionXi Logo"
              className="w-8 h-8 rounded-lg transition-transform duration-300 group-hover:scale-110"
            />
            <span className="font-bold text-lg tracking-tight text-foreground">
              OptionXi
            </span>
          </Link>

          {/* Desktop Navigation - TIGHTENED SPACING */}
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-primary transition-colors whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right: Theme toggle + GitHub + Auth - TIGHTENED SPACING */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              type="button"
              aria-label="Toggle theme"
              className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
            >
              {mounted && theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <a href="https://github.com/optionxi/optionxi-website"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 text-xs font-medium transition-colors"
            >
              <Github size={14} />
              {stars !== null ? stars.toLocaleString() : '...'}
            </a>

            <Link
              href="https://app.optionxi.com"
              className="hidden sm:inline-flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold px-4 py-1.5 rounded-full transition-colors"
            >
              Login Now <ArrowRight size={13} />
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="md:hidden inline-flex items-center justify-center w-8 h-8 rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? <Menu size={16} /> : <X size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - IMPROVED SPACING */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background" id="mobile-menu">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm font-medium text-foreground/80 hover:bg-muted hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}

            <div className="mt-3 pt-3 border-t border-border space-y-2">
              <a href="https://github.com/optionxi/optionxi-website"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3 py-2.5 rounded-lg border border-border text-muted-foreground text-sm font-medium hover:bg-muted transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Github size={15} />
                  GitHub Stars
                </span>
                <span>{stars !== null ? stars.toLocaleString() : '...'}</span>
              </a>

              <Link
                href="https://app.optionxi.com"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-1.5 w-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
              >
                Login Now <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}