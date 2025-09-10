"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  BellRing,
  Filter,
  GaugeCircle,
  ArrowDownNarrowWide,
  ArrowUpNarrowWide,
  BarChart2,
  ScanLine,
  Zap,
  LineChart
} from "lucide-react"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  href?: string
}

export function FeatureCard({ icon, title, description, href }: FeatureCardProps) {
  const CardContent = () => (
    <motion.div
      className="relative group rounded-2xl h-full"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* Glow Border on Hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 blur-xl transition duration-500"></div>

      {/* Card Content */}
      <div className="relative bg-gray-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-full flex flex-col shadow-lg transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl">
        <div className="mb-4 text-blue-400 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-gray-400 leading-relaxed flex-grow">{description}</p>
      </div>
    </motion.div>
  )

  if (href) {
    return (
      <Link href={href} className="block h-full">
        <CardContent />
      </Link>
    )
  }

  return <CardContent />
}

export default function FeaturesSection() {
  const features = [
    {
      icon: <BellRing className="h-8 w-8 text-blue-500" />,
      title: "Smart Alerts",
      description: "Get notified when stocks break higher highs and lower lows with customizable price alerts.",
      href: "https://app.optionxi.com/alerts"
    },
    {
      icon: <GaugeCircle className="h-8 w-8 text-green-500" />,
      title: "Market Trend Analysis",
      description: "Track overall market sentiment with bullish and bearish indicators to inform your trading decisions.",
      href: "https://app.optionxi.com/atlas"
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      title: "Breakout Detection",
      description: "Identify stocks with significant breakout potential before major price movements occur.",
      href: "https://app.optionxi.com/bollinger-breakouts"
    },
    {
      icon: <ArrowUpNarrowWide className="h-8 w-8 text-purple-500" />,
      title: "Top Gainers Tracking",
      description: "Monitor the best-performing stocks across all major exchanges in real-time.",
      href: "https://app.optionxi.com/top-gainers"
    },
    {
      icon: <ScanLine className="h-8 w-8 text-red-500" />,
      title: "Custom Scanners",
      description: "Build and save personalized scanners with multiple technical indicators and fundamental criteria.",
      href: "https://app.optionxi.com/scanners"
    },
    {
      icon: <Filter className="h-8 w-8 text-indigo-500" />,
      title: "Advanced Screeners",
      description: "Filter stocks by technical patterns, fundamentals, and market trends to find bullish and bearish opportunities.",
      href: "https://app.optionxi.com/screeners"
    },
    {
      icon: <BarChart2 className="h-8 w-8 text-teal-500" />,
      title: "Volume Analysis",
      description: "Track unusual volume activity and liquidity patterns across different market sectors.",
      href: "https://app.optionxi.com/top-volume"
    },
    {
      icon: <ArrowDownNarrowWide className="h-8 w-8 text-orange-500" />,
      title: "Top Losers Tracking",
      description: "Identify declining stocks for potential shorting opportunities or value investments.",
      href: "https://app.optionxi.com/top-losers"
    },
    {
      icon: <LineChart className="h-8 w-8 text-pink-500" />,
      title: "Detailed Stock Analysis",
      description: "Get comprehensive technical and fundamental analysis for any stock in your watchlist.",
      href: "https://app.optionxi.com/tools"
    }
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-white mb-4">
          Powerful Tools for Smarter Trading
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Explore a suite of professional-grade features designed to give you an edge in the markets.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {features.map((feature, idx) => (
          <FeatureCard key={idx} {...feature} />
        ))}
      </div>
    </section>
  )
}
