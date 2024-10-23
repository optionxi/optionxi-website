'use client';

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, BarChart2, Lock, Zap, Users, Code, Database } from 'lucide-react'
import Navbar from '@/components/navbar/navbar';

interface FeatureCardProps {
  icon: React.ReactNode; // You can adjust this if the icon has a specific type
  title: string;
  description: string;
}


export default function LandingPage() {
  return (
    <div className="min-h-screen ">
      {/* Header */}
      {/* <HeaderCustom/> */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg">
      <Navbar/>
      </header>

      {/* Hero Section */}
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
              The Trading Platform for
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-500">
                Modern Traders
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8">
              Build, analyze, and execute trades faster.
              <br />
              Start for free and scale as you grow.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="https://app.optionxi.com" className="px-8 py-3 rounded-md text-lg font-medium text-white bg-blue-600 hover:bg-blue-700">
                Start your trading journey
              </Link>
              <Link href="/docs" className="px-8 py-3 rounded-md text-lg font-medium text-white bg-gray-800 hover:bg-gray-700">
                Read the docs
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BarChart2 className="h-8 w-8 text-blue-500" />}
              title="Advanced Analytics"
              description="Gain deep insights into market trends and your trading performance."
            />
            <FeatureCard
              icon={<Lock className="h-8 w-8 text-green-500" />}
              title="Secure Trading"
              description="Your trades and data are protected with state-of-the-art security measures."
            />
            <FeatureCard
              icon={<Zap className="h-8 w-8 text-yellow-500" />}
              title="Real-time Execution"
              description="Execute trades instantly with our high-performance infrastructure."
            />
            <FeatureCard
              icon={<Users className="h-8 w-8 text-purple-500" />}
              title="Social Trading"
              description="Learn from and connect with top traders in our community."
            />
            <FeatureCard
              icon={<Code className="h-8 w-8 text-red-500" />}
              title="API Access"
              description="Integrate our platform with your existing tools and automate your strategies."
            />
            <FeatureCard
              icon={<Database className="h-8 w-8 text-indigo-500" />}
              title="Historical Data"
              description="Access comprehensive historical data for thorough backtesting."
            />
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to start trading?</h2>
            <p className="text-xl text-gray-400 mb-8">Join thousands of traders who trust OptionXi for their success.</p>
            <Link href="/start" className="px-8 py-3 rounded-md text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 inline-flex items-center">
              Get started now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link href="/features" className="hover:text-white">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/enterprise" className="hover:text-white">Enterprise</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/docs" className="hover:text-white">Documentation</Link></li>
                <li><Link href="/api" className="hover:text-white">API Reference</Link></li>
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p>&copy; {new Date().getFullYear()} OptionXi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      className="relative p-1 rounded-lg overflow-hidden"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600"
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1 }
        }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 blur-lg"
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 0.5 }
        }}
        transition={{ duration: 0.3 }}
      />
      <div className="relative bg-gray-900 p-6 rounded-lg z-10">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </motion.div>
  )
}