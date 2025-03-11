'use client';

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import FeaturesSection from './feature-section';

export default function LandingPage() {
  return (
    <div className="min-h-screen ">
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
              Discover winning trades with powerful analytics.
              <br />
              Start for free and upgrade as your portfolio grows.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="https://app.optionxi.com" className="group px-8 py-3 rounded-md text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 flex items-center space-x-2">
                <span>Click to login</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              {/* <Link href="https://docs.optionxi.com" className="px-8 py-3 rounded-md text-lg font-medium text-white bg-gray-800 hover:bg-gray-700">
                Read the docs
              </Link> */}
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
       <FeaturesSection/>

        {/* CTA Section */}
        {/* <div className="bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to start trading?</h2>
            <p className="text-xl text-gray-400 mb-8">Join thousands of traders who trust OptionXi for their success.</p>
            <Link href="/start" className="px-8 py-3 rounded-md text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 inline-flex items-center">
              Get started now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div> */}
        {/* Testimonials */}
        {/* <TestimonialSection/> */}
      </main>
    </div>
  )
}
