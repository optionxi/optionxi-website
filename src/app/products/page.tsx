import React from 'react';
import { 
  TrendingUp, 
  Bell, 
  BarChart3, 
  Filter, 
  Volume2, 
  Target, 
  Shield, 
  Smartphone, 
  Trophy,
  Clock,
  Users,
  Eye,
  Play,
  Star,
  ArrowRight
} from 'lucide-react';

const ProductsPage = () => {
  const mainFeatures = [
    {
      icon: <Play className="w-8 h-8 text-emerald-400" />,
      title: "Virtual Trading Simulator",
      description: "Practice trading in NIFTY 50, BankNIFTY, and NIFTY Options with real market data. Trade during live market hours and even weekends using previous day's data.",
      highlights: ["Zero financial risk", "Real-time market simulation", "Available 24/7"]
    },
    {
      icon: <Bell className="w-8 h-8 text-blue-400" />,
      title: "Smart Alerts & Notifications",
      description: "Get instant alerts when stocks break higher highs and lower lows with customizable price alerts and real-time notifications.",
      highlights: ["Customizable alerts", "Real-time notifications", "Price movement tracking"]
    },
    {
      icon: <Filter className="w-8 h-8 text-purple-400" />,
      title: "Advanced Stock Screeners",
      description: "Discover stocks based on volume, price action, and technical indicators. Build personalized scanners with multiple criteria.",
      highlights: ["Custom scanners", "Technical indicators", "Real-time filtering"]
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-orange-400" />,
      title: "Market Trend Analysis",
      description: "Track overall market sentiment with bullish and bearish indicators. Monitor top gainers, losers, and breakout patterns.",
      highlights: ["Market sentiment analysis", "Breakout detection", "Performance tracking"]
    },
    {
      icon: <Trophy className="w-8 h-8 text-yellow-400" />,
      title: "Competitive Leaderboards",
      description: "Compete with other traders in daily, weekly, and all-time rankings. Track performance, earn badges, and improve skills.",
      highlights: ["Daily competitions", "Performance badges", "Skill improvement tracking"]
    },
    {
      icon: <Eye className="w-8 h-8 text-cyan-400" />,
      title: "In-Depth Stock Analysis",
      description: "Get comprehensive technical and fundamental analysis with charts, option chains, and market depth for any stock.",
      highlights: ["Technical analysis", "Option chain data", "Market depth insights"]
    }
  ];

  const additionalFeatures = [
    { icon: <Volume2 />, title: "Volume Analysis", desc: "Track unusual volume activity across sectors" },
    { icon: <Target />, title: "Breakout Detection", desc: "Identify stocks with breakout potential" },
    { icon: <TrendingUp />, title: "Top Gainers/Losers", desc: "Monitor best and worst performers" },
    { icon: <Shield />, title: "Secure Login", desc: "Google authentication with Firebase" },
    { icon: <Clock />, title: "Extended Hours", desc: "Trade post-market 4:00 PM – 10:15 PM" },
    { icon: <Users />, title: "Community", desc: "Connect with fellow traders" }
  ];

  // const comingSoonFeatures = [
  //   {
  //     icon: <Zap className="w-6 h-6 text-indigo-400" />,
  //     title: "Algorithmic Trading",
  //     description: "Simulate and backtest custom trading strategies with automated execution"
  //   },
  //   {
  //     icon: <Search className="w-6 h-6 text-green-400" />,
  //     title: "Open Source Platform",
  //     description: "Full access to app code, UI, database, and trade engine for developers"
  //   }
  // ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-950 to-black py-20 px-4">
        <div className="max-w-7xl mx-auto text-center relative">
        
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
            Trade Platforms
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover powerful trading tools designed for modern traders. Practice, learn, and master the Indian stock market with zero financial risk.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Core Features
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Everything you need to become a successful trader, from virtual trading to advanced market analysis.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainFeatures.map((feature, index) => (
              <div key={index} className="group bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="bg-gray-800/50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gray-700/50 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-emerald-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                      <Star className="w-4 h-4 text-emerald-400 fill-current" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Additional Capabilities
            </h2>
            <p className="text-lg text-gray-400">
              More tools to enhance your trading experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-all duration-300 group">
                <div className="flex items-center gap-4">
                  <div className="text-emerald-400 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-400">{feature.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile App Showcase */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 md:p-16 border border-gray-700">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Smartphone className="w-6 h-6 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Mobile App</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                  Trade Anywhere, Anytime
                </h2>
                <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                  Access the full power of OptionXI on your mobile device. Practice trading during market hours or analyze stocks on weekends using previous day&apos;s data.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-gray-300">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    Virtual trading in NIFTY 50, BankNIFTY & Options
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    Live market hours: 9:15 AM – 3:30 PM
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    Extended hours: 4:00 PM – 10:15 PM
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    Weekend access with historical data
                  </li>
                </ul>
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
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-2xl p-8 border border-gray-700">
                  <div className="bg-gray-800 rounded-lg p-6 mb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm text-gray-400">Portfolio Value</div>
                      <div className="text-emerald-400 text-sm">+12.5%</div>
                    </div>
                    <div className="text-2xl font-bold text-white mb-2">₹1,25,430</div>
                    <div className="text-sm text-emerald-400">+₹13,942 today</div>
                  </div>
                  <div className="space-y-3">
                    {['RELIANCE', 'TCS', 'INFY'].map((stock, idx) => (
                      <div key={idx} className="bg-gray-800 rounded-lg p-4 flex justify-between items-center">
                        <div>
                          <div className="font-semibold text-white">{stock}</div>
                          <div className="text-sm text-gray-400">50 shares</div>
                        </div>
                        <div className="text-right">
                          <div className="text-emerald-400 font-semibold">+2.3%</div>
                          <div className="text-sm text-gray-400">₹2,450</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
    
  );
};

export default ProductsPage;