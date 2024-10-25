'use client';

import Link from 'next/link'; 
import FeatureSection from './features';

export default function FeaturePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-50 backdrop-blur-lg">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold">
                OptionXi
              </Link>
            </div>
            <div className="hidden md:flex space-x-4">
              <Link href="/features" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Features
              </Link>
              <Link href="/pricing" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Pricing
              </Link>
              <Link href="/docs" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Docs
              </Link>
              <Link href="/blogs" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Blogs
              </Link>
            </div>
            <div className="flex items-center">
              <Link href="/signin" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Sign in
              </Link>
              <Link href="/start" className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                Start trading
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        <FeatureSection/>
      </main>
    </div>
  );
}
