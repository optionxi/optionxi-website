'use client';
import React from 'react';
import { ArrowRight, TrendingUp, Shield, Zap, BarChart3, CheckCircle, Play } from 'lucide-react';
import OrbitalSection from '@/components/orbitalsection/orbital_section';
import OptionXIArchitecture from './components/optionxi-architecture';

export default function LandingPage() {
  const features = [
    {
      icon: <BarChart3 className="w-10 h-10 text-blue-400" />,
      title: "Advanced Analytics",
      description: "Real-time market insights with institutional-grade analytical tools and custom indicators"
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-green-400" />,
      title: "Smart Trading",
      description: "AI-powered trade recommendations and automated strategies to maximize your returns"
    },
    {
      icon: <Shield className="w-10 h-10 text-purple-400" />,
      title: "Open Source",
      description: "Fully open-sourced for transparency, security, and trust — empowering the community to contribute and improve."
    },
    {
      icon: <Zap className="w-10 h-10 text-yellow-400" />,
      title: "Unified Trading",
      description: "Seamlessly connect with multiple brokers in one app — trade smarter without switching platforms"
    }
  ];

  const brokers = [
    { name: "Zerodha", logo: "assets/brokers/zerodha.png", users: "1.2M+" },
    { name: "Upstox", logo: "assets/brokers/upstox.png", users: "800K+" },
    { name: "Fyers", logo: "assets/brokers/fyers.png", users: "500K+" },
    { name: "Angel One", logo: "assets/brokers/angelone.png", users: "1M+" },
    { name: "ICICI Direct", logo: "assets/brokers/icicidirect.png", users: "600K+" },
    { name: "Groww", logo: "assets/brokers/groww.png", users: "400K+" }
  ];

  const benefits = [
    "Connect multiple broker accounts",
    "Real-time portfolio tracking",
    "Advanced charting tools",
    "Risk management alerts",
  ];

  const screenshots = [
    { src: "assets/screenshots/Home Page New.png", title: "Homepage" },
    { src: "assets/screenshots/Home Page new 2.png", title: "Homepage" },
    { src: "assets/screenshots/Market Sentiment.png", title: "Market Sentiment" },
    { src: "assets/screenshots/Market Tools.png", title: "Trading Tools" }
  ];

  const mobileFeatures = [
    "Real-time push notifications",
    "Multiple realtime scanners",
    "Multi broker connect",
  ];

  return (
    <div className="text-white bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      
      {/* Combined Hero & Mobile App Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Hero Content */}
            <div>
              <div className="inline-flex items-center bg-blue-600/10 border border-blue-500/20 rounded-full px-4 py-1 sm:px-6 sm:py-2 mb-6 sm:mb-8">
                {/* <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mr-2" /> */}
                <span className="text-blue-400 text-sm sm:text-base font-medium">
                  🚀 Now supporting major brokers
                </span>
              </div>

              
              <h1 className="text-4xl md:text-6xl lg:text-6xl font-bold mb-6 leading-tight">
                Trade smarter with
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent">
                  OptionXi
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                Connect your existing broker account and unlock powerful analytics, automated strategies, and real-time insights.
              </p>

              {/* Mobile Features */}
              <div className="space-y-3 mb-10">
                {mobileFeatures.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-200">{item}</span>
                  </div>
                ))}
              </div>

           {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12 items-center">
              {/* Play Store Button */}
              <a
                href="https://play.google.com/store/apps/details?id=com.optionxi.app"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-300 hover:scale-105 flex items-center"
              >
                <img
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                  alt="Get it on Google Play"
                  className="h-20 md:h-24 w-auto"
                />
              </a>

              {/* Product Hunt Featured Badge - ADDED HERE */}
              <a 
                href="https://www.producthunt.com/products/optionxi?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-optionxi&#0045;open&#0045;source&#0045;trading&#0045;platform" 
                target="_blank"
                className="transition-transform duration-300 hover:scale-105"
              >
                <img 
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1016349&theme=light&t=1759650435293" 
                  alt="OptionXi - Open Source Trading Platform - India’s First Open Source Trading Platform | Product Hunt" 
                  style={{ width: '250px', height: '54px' }} 
                  width="250" 
                  height="54" 
                />
              </a>

              {/* Web Trading Button (commented out in original) */}
              {/* <a
                href="https://app.optionxi.com"
                className="group relative h-14 md:h-16 px-6 py-0
                          flex items-center justify-center 
                          bg-gradient-to-r from-blue-600/90 to-blue-700/90 
                          hover:from-blue-700 hover:to-blue-800
                          rounded-2xl font-semibold text-base md:text-lg text-white
                          space-x-3
                          shadow-md hover:shadow-blue-500/30 
                          border border-white/10 backdrop-blur-md
                          transition-all duration-300 hover:scale-105"
              >
                <span className="tracking-wide">Web Trading</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a> */}
            </div>
              {/* Trust indicators */}
              <div className="flex flex-wrap gap-6 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>3,000+ Active Traders</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span>Open source</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span>10+ Screeners and Tools</span>
                </div>
              </div>
            </div>
            
            {/* Right Column - App Screenshots/OrbitalSection */}
            <div className='relative'>
              <OrbitalSection/>
            </div>
          </div>
        </div>
      </section>

      {/* Broker Integration Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-gradient-to-b from-gray-900/50 to-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Connect Your <span className="text-blue-400">Favorite Broker</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Seamlessly integrate with India&apos;s leading brokers. Place orders directly from OptionXi while keeping your existing broker account.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
            {brokers.map((broker, index) => (
              <div
                key={index}
                className="group p-6 bg-gray-800/60 hover:bg-gray-700/80 rounded-2xl border border-gray-700/50 hover:border-gray-600 transition-all duration-300 text-center hover:scale-105"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-xl flex items-center justify-center overflow-hidden">
                  <img
                    src={broker.logo}
                    alt={broker.name}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <h3 className="font-semibold mb-1">{broker.name}</h3>
                <p className="text-sm text-gray-400">{broker.users} users</p>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-gray-800/40 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span className="text-gray-200">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-2">
        <div className="max-w-7xl mx-auto">
          {/* <OptionXiSection/> */}
          <OptionXIArchitecture/>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-2">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why <span className="text-blue-400">3,000+</span> Traders Choose Us
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Professional-grade trading tools designed for both beginners and experts. Everything you need to succeed in the markets.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 bg-gradient-to-b from-gray-800/60 to-gray-900/60 hover:from-gray-700/80 hover:to-gray-800/80 rounded-2xl border border-gray-700/50 hover:border-gray-600 transition-all duration-300 hover:scale-105"
              >
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-gradient-to-b from-gray-900/30 to-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Experience <span className="text-blue-400">OptionXi</span> in Action
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Intuitive interface meets powerful functionality. See how our platform makes complex trading simple and effective.
            </p>
          </div>

          {/* Desktop View - Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {screenshots.map((screenshot, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-gray-800/60 border border-gray-700/50 hover:border-gray-600 transition-all duration-500 hover:scale-105"
              >
                <div className="aspect-[9/16] overflow-hidden">
                  <img
                    src={screenshot.src}
                    alt={`${screenshot.title} - OptionXi Open Source Virtual Trading Platform`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-lg font-bold text-white">{screenshot.title}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile View - Horizontal Scroll */}
          <div className="md:hidden">
            <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
              {screenshots.map((screenshot, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl bg-gray-800/60 border border-gray-700/50 flex-shrink-0 w-48"
                >
                  <div className="aspect-[9/16] overflow-hidden">
                    <img
                      src={screenshot.src}
                      alt={`${screenshot.title} - OptionXi Open Source Virtual Trading Platform`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <h3 className="text-sm font-bold text-white">{screenshot.title}</h3>
                  </div>
                </div>
              ))}
            </div>
            <style jsx>{`
              .scrollbar-hide {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-b from-gray-800/50 to-gray-900">
       <div className="max-w-5xl mx-auto text-center">
        <div className="inline-flex flex-wrap items-center bg-green-600/10 border border-green-500/20 rounded-full px-4 sm:px-6 py-2 mb-6 sm:mb-8 text-center max-w-full">
          <Play className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mr-2 mb-1 sm:mb-0" />
          <span className="text-green-400 font-medium text-sm sm:text-base">
            Ready to start your trading journey?
          </span>
        </div>

        
        <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
          Join <span className="text-green-400">3,000+</span> Traders
          <br />
          Using <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent">OptionXi</span>
        </h2>
        
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
          Download our mobile app and start trading smarter today. Connect your broker, analyze markets, and execute trades with confidence.
        </p>
        
        <div className="flex flex-col items-center gap-6 mb-16">
          <a
            href="https://play.google.com/store/apps/details?id=com.optionxi.app"
            target="_blank"
            rel="noopener noreferrer"
            className="group transition-transform duration-300 hover:scale-105"
          >
            <img
              src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
              alt="Get it on Google Play"
              className="h-20 md:h-24 w-auto"
            />
          </a>
          
          <div className="flex items-center space-x-3 text-gray-400 w-full max-w-xs">
            <div className="h-px bg-gray-600 flex-1"></div>
            <span className="text-sm font-medium px-3">or</span>
            <div className="h-px bg-gray-600 flex-1"></div>
          </div>
          
          <a
            href="https://app.optionxi.com"
            className="group inline-flex items-center space-x-3 px-8 py-4 bg-gray-800/50 hover:bg-gray-700/60 border border-gray-700/50 hover:border-gray-600/60 rounded-xl transition-all duration-300 text-white hover:text-blue-300"
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-lg font-medium">Launch Web Terminal</span>
            </div>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

          {/* Final trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-400">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Trusted by professionals</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-blue-400" />
              <span>Secure & reliable</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span>Unified trading</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}