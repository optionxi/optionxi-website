import Link from 'next/link'
import { Twitter, Github, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Top grid: Logo/Social + Links */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Logo + Social */}
          <div className="col-span-2 md:col-span-1 flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center mb-4">
              <img
                src="/assets/images/logo_xi.png"
                alt="Logo"
                className="w-10 h-10 mr-2 rounded-3xl"
              />
              <span className="text-2xl font-bold">OptionXi</span>
            </Link>

            {/* Social Icons */}
            <div className="flex space-x-5">
              <Link href="https://x.com/OptionXi" aria-label="Twitter">
                <Twitter className="w-6 h-6 text-gray-400 hover:text-white transition-colors" />
              </Link>
              <Link href="https://github.com/optionxi" aria-label="GitHub">
                <Github className="w-6 h-6 text-gray-400 hover:text-white transition-colors" />
              </Link>
              <Link href="https://www.instagram.com/optionxi/" aria-label="Instagram">
                <svg
                  className="w-6 h-6 text-gray-400 hover:text-white transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3a5.75 5.75 0 1 1 0 11.5 5.75 5.75 0 0 1 0-11.5zm0 1.5a4.25 4.25 0 1 0 0 8.5 4.25 4.25 0 0 0 0-8.5zm5-1.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z"/>
                </svg>
              </Link>

              <Link href="https://www.youtube.com/channel/UCpzBvlP9V0hWhqc1_-1Zonw" aria-label="YouTube">
                <Youtube className="w-6 h-6 text-gray-400 hover:text-white transition-colors" />
              </Link>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tools</h3>
            <ul className="space-y-2">
              {['Top Gainers', 'Top Losers', 'Top Volume', 'Heatmap'].map((item) => {
                const customLinks: Record<string, string> = {
                  'Top Gainers': 'https://app.optionxi.com/top-gainers',
                  'Top Losers': 'https://app.optionxi.com/top-losers',
                  'Top Volume': 'https://app.optionxi.com/top-volume',
                  'Heatmap': 'https://app.optionxi.com/heatmap',
                }
                return (
                  <li key={item}>
                    <Link href={customLinks[item]} className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {['Scanners', 'Screeners', 'Breakouts', 'Trends', 'Alerts'].map((item) => {
                const customLinks: Record<string, string> = {
                  Scanners: 'https://app.optionxi.com/scanners',
                  Screeners: 'https://app.optionxi.com/screeners',
                  Breakouts: 'https://app.optionxi.com/bollinger-breakouts',
                  Trends: 'https://app.optionxi.com/atlas',
                  Alerts: 'https://app.optionxi.com/alerts',
                }
                return (
                  <li key={item}>
                    <Link href={customLinks[item]} className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Developers */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Developers</h3>
            <ul className="space-y-2">
              {['Documentation', 'Github'].map((item) => {
                const customLinks: Record<string, string> = {
                  Documentation: 'https://docs.optionxi.com',
                  Github: 'https://github.com/optionxi',
                }
                return (
                  <li key={item}>
                    <Link href={customLinks[item]} className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-700 my-8" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-400 gap-4">
          <p>&copy; {new Date().getFullYear()} OptionXi. All rights reserved.</p>
          <p>Built with ❤️ by the traders community.</p>
        </div>
      </div>
    </footer>
  )
}
