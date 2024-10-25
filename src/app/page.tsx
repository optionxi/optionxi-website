'use client';

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, BarChart2, Lock, Zap, Users, Code, Database } from 'lucide-react'
import TestimonialSection from '@/components/testimonials/testimonial-modern';
import { FeatureCard } from '@/components/featurecard/feature-card';

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
        {/* Testimonials */}
        <TestimonialSection/>
      </main>
    </div>
  )
}
