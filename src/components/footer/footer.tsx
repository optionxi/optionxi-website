import Link from 'next/link'
import { Twitter, Github, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-4 md:px-6">
      <div className="container mx-auto">
       {/* Wrapper for Optionxi logo and social icons */}
        <div className="flex flex-col items-center md:items-start mb-8">
        {/* OptionXi Logo */}
        <Link href="/" className="flex items-center mb-4">
            <img src="/assets/images/logo_xi.png" alt="Logo" className="w-8 h-8 mr-2 rounded-3xl" />
            <span className="text-2xl font-bold">OptionXi</span>
        </Link>


        {/* Social Icons */}
        <div className="flex space-x-4">
            <Link href="https://x.com/OptionXi" aria-label="Twitter">
            <Twitter className="w-6 h-6 text-gray-400 hover:text-white" />
            </Link>
            <Link href="https://github.com/optionxi" aria-label="GitHub">
            <Github className="w-6 h-6 text-gray-400 hover:text-white" />
            </Link>
            {/* <Link href="#" aria-label="Discord">
            <svg className="w-6 h-6 text-gray-400 hover:text-white" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            </Link> */}
            <Link href="https://www.instagram.com/optionxi/" aria-label="Instagram">
              <svg className="w-6 h-6 text-gray-400 hover:text-white" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </Link>
            <Link href="https://www.youtube.com/channel/UCpzBvlP9V0hWhqc1_-1Zonw" aria-label="YouTube">
            <Youtube className="w-6 h-6 text-gray-400 hover:text-white" />
            </Link>
        </div>
        </div>

        {/* Grid section for rest of the links */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Tools</h3>
            <ul className="space-y-2">
              {['Top Gainers', 'Top Losers', 'Top Volume', 'Heatmap'].map((item) => {
                const customLinks: { [key: string]: string } = {
                  'Top Gainers': 'https://app.optionxi.com/top-gainers', 
                  'Top Losers': 'https://app.optionxi.com/top-losers', 
                  'Top Volume': 'https://app.optionxi.com/top-volume', 
                  'Heatmap': 'https://app.optionxi.com/heatmap',
                };

                return (
                  <li key={item}>
                    <Link href={customLinks[item]} className="text-gray-400 hover:text-white">
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <ul className="space-y-2">
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
              {['Scanners', 'Screeners', 'Breakouts', 'Trends', 'Alerts'].map((item) => {
                // Define custom links with explicit typing
                const customLinks: { [key: string]: string } = {
                  'Scanners': 'https://app.optionxi.com/scanners',
                  'Screeners': 'https://app.optionxi.com/screeners',
                  'Breakouts': 'https://app.optionxi.com/bollinger-breakouts',
                  'Trends': 'https://app.optionxi.com/atlas',
                  'Alerts': 'https://app.optionxi.com/alerts',
                };

                return (
                  <li key={item}>
                    <Link href={customLinks[item]} className="text-gray-400 hover:text-white">
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Developers</h3>
            <ul className="space-y-2">
              {['Documentation', 'Github'].map((item) => {
                const customLinks: { [key: string]: string } = {
                  Documentation: 'https://docs.optionxi.com', 
                  Github: 'https://github.com/optionxi',
                };

                return (
                  <li key={item}>
                    <Link href={customLinks[item]} className="text-gray-400 hover:text-white">
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Separator */}
        <hr className="my-8 border-gray-600" />

        {/* Footer bottom section */}
        <div className="flex flex-col md:flex-row items-center justify-between text-gray-400">
          <p>&copy; 2025 OptionXi. All rights reserved.</p>
          <p className="mt-4 md:mt-0">Built with ❤️ by the traders community.</p>
        </div>
      </div>
    </footer>
  )
}
