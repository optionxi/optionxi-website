'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Github } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [stars, setStars] = useState<number | null>(null)

  const navItems = [
    { name: 'Blogs', href: '/blogs' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms Of Use', href: '/terms-of-use' },
    { name: 'ERP Campus', href: '/erp-campus' },
    { name: 'ERP Manufacturing', href: '/erp-manufacturing' },
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
  }, [])

  return (
    <nav className="bg-gray-900 text-gray-100 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: Logo + Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <img
                  src="/assets/images/logo_xi.png"
                  alt="OptionXi Logo"
                  className="w-10 h-10 rounded-2xl transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                OptionXi
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="px-4 py-2 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-200 relative group"
                  >
                    {item.name}
                    <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full group-hover:left-0"></div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right: GitHub + Auth buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* GitHub Button */}
            <a
              href="https://github.com/optionxi/optionxi-website"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-700/50 bg-gray-800/50 hover:bg-gray-700/70 hover:border-gray-600/70 transition-all duration-300 text-sm font-medium backdrop-blur-sm"
            >
              <Github className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
              <span className="text-gray-300 group-hover:text-white transition-colors">
                {stars !== null ? stars.toLocaleString() : '...'}
              </span>
            </a>

            {/* Auth Buttons */}
            {/* <Link
              href="https://app.optionxi.com"
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-200"
            >
              Sign up
            </Link> */}
            <Link
              href="https://app.optionxi.com"
              className="group relative px-6 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
            >
              <span className="relative z-10">Login Now</span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-200"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <Menu className="block h-6 w-6" />
              ) : (
                <X className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200"
              >
                {item.name}
              </Link>
            ))}

            {/* GitHub in Mobile */}
            <a
              href="https://github.com/optionxi/optionxi-website"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-700/50 bg-gray-700/30 hover:bg-gray-700/50 transition-all duration-300 text-sm font-medium"
            >
              <Github className="w-4 h-4 text-gray-400" />
              <span className="text-gray-300">
                {stars !== null ? `${stars.toLocaleString()} stars` : 'Loading...'}
              </span>
            </a>
          </div>

          {/* Mobile Auth Buttons */}
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5 space-x-2">
              {/* <Link
                href="https://app.optionxi.com"
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-3 rounded-xl text-base font-medium transition-all duration-200"
              >
                Sign up
              </Link> */}
              <Link
                href="https://app.optionxi.com"
                onClick={() => setIsOpen(false)}
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 shadow-lg"
              >
                Login Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}