import React, { useState, useEffect } from 'react';
import { Smartphone, Monitor, Tablet, Github } from 'lucide-react';

export default function OptionXIArchitecture() {
  const [activeSlide, setActiveSlide] = useState(0);

  const brokers = [
    { name: 'Zerodha', color: 'rgb(56, 126, 245)' },
    { name: 'Upstox', color: 'rgb(255, 132, 0)' },
    { name: 'Angel One', color: 'rgb(220, 53, 69)' },
    { name: 'Fyers', color: 'rgb(13, 202, 240)' },
    { name: 'Dhan', color: 'rgb(108, 117, 125)' }
  ];

  const dataInputs = [
    'Stock Alerts',
    'Stock Prices',
    'Technical Indicators',
    'AI Analysis',
    'News Feed'
  ];

  const expandedFeatures = [
    'EMA', 'SMA', 'RSI', 'MACD',
    'Crossovers', 'Scanners', 'Filters',
    'Volume Analysis', 'Price Action',
    'Support / Resistance', 'Candlestick Patterns',
    'Backtesting', 'Pattern Recognition',
    'Trend Detection'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl ">
        {/* Page Heading */}
        <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 bg-clip-text text-transparent mb-3">
                OptionXI Architecture
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                A unified, open-source trading ecosystem that connects brokers, data, and devices in platform.
              </p>
            </div>

        {/* Slide 1: Core Architecture */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 transition-all duration-700 ${activeSlide === 0 ? 'opacity-100' : 'opacity-0 absolute pointer-events-none'}`}>
          {/* Left: Diagram */}
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8 relative overflow-hidden">
            <div className="absolute top-4 left-4 px-3 py-1 bg-white/10 rounded-full">
              <p className="text-white/60 text-xs font-medium">Connect with Brokers</p>
            </div>

            {/* Brokers at top */}
            <div className="mt-12 grid grid-cols-3 gap-3 mb-8">
              {brokers.map((broker, idx) => (
                <div
                  key={broker.name}
                  className="px-4 py-2 rounded-lg border border-white/20 bg-gray-800/60 text-center"
                  style={{ 
                    animation: `fadeIn 0.4s ease-out ${idx * 0.1}s both`,
                    boxShadow: `0 0 15px ${broker.color}30`
                  }}
                >
                  <p className="text-white/90 font-medium text-xs">{broker.name}</p>
                </div>
              ))}
            </div>

            {/* Connector lines */}
            <div className="relative h-20 mb-6">
              <div className="absolute inset-0 flex justify-center">
                <svg className="w-full h-full" viewBox="0 0 300 80">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <path
                      key={i}
                      d={`M ${60 + i * 40} 0 Q ${60 + i * 40} 40 150 80`}
                      fill="none"
                      stroke="rgb(59, 130, 246)"
                      strokeWidth="1.5"
                      opacity="0.4"
                      style={{ animation: `dash 2s ease-in-out ${i * 0.2}s infinite` }}
                    />
                  ))}
                </svg>
              </div>
            </div>

            {/* OptionXI Central */}
            <div className="flex justify-center mb-8 relative">
              <div className="relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  {[1, 2].map((ring) => (
                    <div
                      key={ring}
                      className="absolute rounded-full border-2 border-blue-500/20"
                      style={{
                        animation: `ping 3s cubic-bezier(0, 0, 0.2, 1) ${ring * 0.5}s infinite`,
                        width: `${120 + ring * 20}%`,
                        height: `${120 + ring * 20}%`
                      }}
                    />
                  ))}
                </div>
                
                <div className="relative px-8 py-4 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 border border-blue-400">
                  <p className="text-white font-bold text-lg">OptionXI</p>
                </div>
              </div>
            </div>

            {/* Connector lines down */}
            <div className="relative h-20 mb-6">
              <div className="absolute inset-0 flex justify-center">
                <svg className="w-full h-full" viewBox="0 0 300 80">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <path
                      key={i}
                      d={`M 150 0 Q ${60 + i * 40} 40 ${60 + i * 40} 80`}
                      fill="none"
                      stroke="rgb(34, 197, 94)"
                      strokeWidth="1.5"
                      opacity="0.4"
                      style={{ animation: `dash 2s ease-in-out ${i * 0.2}s infinite reverse` }}
                    />
                  ))}
                </svg>
              </div>
            </div>

            {/* Data Inputs */}
            <div className="grid grid-cols-3 gap-3">
              {dataInputs.map((input, idx) => (
                <div
                  key={input}
                  className="px-3 py-2 rounded-lg border border-green-500/30 bg-green-950/40 text-center"
                  style={{ 
                    animation: `fadeIn 0.4s ease-out ${idx * 0.1}s both`,
                    boxShadow: '0 0 15px rgba(34, 197, 94, 0.15)'
                  }}
                >
                  <p className="text-green-300 font-medium text-xs">{input}</p>
                </div>
              ))}
            </div>

            {/* Devices at bottom */}
            <div className="flex justify-around mt-12 pt-8 border-t border-gray-800">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-lg border border-gray-700 bg-gray-800 flex items-center justify-center">
                    <Monitor size={20} className="text-white/60" />
                  </div>
                  <p className="text-white/40 text-xs">Device {i}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Explanation */}
          <div className="flex flex-col justify-center">
            <div className="inline-block px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-4 w-fit">
              <p className="text-white/60 font-medium text-sm">Unified Trading Platform</p>
            </div>
            
            <h2 className="text-4xl font-bold text-white mb-6">
              Aggregate data, execute everywhere
            </h2>
            
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              OptionXI acts as a central hub that connects to multiple broker APIs simultaneously. 
              It aggregates real-time market data, processes signals through advanced technical 
              analysis, and executes orders across all your broker accounts from a single interface.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Multi-Broker Integration</h4>
                  <p className="text-white/60 text-sm">Connect to Zerodha, Upstox, Angel One, Fyers, and Dhan simultaneously</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Real-Time Data Aggregation</h4>
                  <p className="text-white/60 text-sm">Process stock prices, alerts, news, and AI insights in real-time</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Centralized Control</h4>
                  <p className="text-white/60 text-sm">Manage all your trading accounts from one powerful dashboard</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 2: Expanded Features */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 transition-all duration-700 ${activeSlide === 1 ? 'opacity-100' : 'opacity-0 absolute pointer-events-none'}`}>
          {/* Left: Feature Grid */}
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8">
            <div className="mb-6">
              <div className="inline-block px-4 py-2 bg-purple-500/10 rounded-full border border-purple-500/30 mb-3">
                <p className="text-purple-300 font-medium text-xs">Complete Toolkit</p>
              </div>
              <h3 className="text-2xl font-bold text-white">Advanced Features</h3>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {expandedFeatures.slice(0, 8).map((feature, idx) => (
                <div
                  key={feature}
                  className="group px-4 py-3 rounded-lg border border-white/10 bg-gray-800/60 hover:border-purple-500/50 hover:bg-purple-950/30 transition-all duration-300"
                  style={{ animation: `fadeIn 0.3s ease-out ${idx * 0.05}s both` }}
                >
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-purple-500 group-hover:scale-150 transition-transform" />
                    <p className="text-white/90 font-medium text-sm">{feature}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-800 pt-6">
              <div className="text-white/50 text-sm mb-3">Additional Tools</div>
              <div className="grid grid-cols-3 gap-2">
                {expandedFeatures.slice(8).map((feature, idx) => (
                  <div
                    key={feature}
                    className="px-3 py-2 rounded-md bg-gray-800/40 border border-white/5 text-center"
                    style={{ animation: `fadeIn 0.3s ease-out ${(idx + 8) * 0.05}s both` }}
                  >
                    <p className="text-white/70 text-xs">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Explanation */}
          <div className="flex flex-col justify-center">
            <div className="inline-block px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-4 w-fit">
              <p className="text-white/60 font-medium text-sm">Professional Tools</p>
            </div>
            
            <h2 className="text-4xl font-bold text-white mb-6">
              Everything you need for technical analysis
            </h2>
            
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              OptionXI provides a comprehensive suite of technical indicators and analysis tools. 
              From basic moving averages to advanced pattern recognition, all features work together 
              seamlessly to give you complete market insights.
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gray-900/50 border border-gray-800">
                <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <span className="text-purple-400 text-sm">📊</span>
                  </div>
                  Technical Indicators
                </h4>
                <p className="text-white/60 text-sm pl-10">
                  EMA, SMA, RSI, MACD, and more with customizable parameters
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gray-900/50 border border-gray-800">
                <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <span className="text-blue-400 text-sm">🔍</span>
                  </div>
                  Smart Scanners
                </h4>
                <p className="text-white/60 text-sm pl-10">
                  Advanced filters to find opportunities across thousands of stocks
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gray-900/50 border border-gray-800">
                <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <span className="text-green-400 text-sm">🎯</span>
                  </div>
                  Pattern Recognition
                </h4>
                <p className="text-white/60 text-sm pl-10">
                  Automatic detection of candlestick patterns and trend formations
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 3: Platform Availability */}
       <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 transition-all duration-700 ${activeSlide === 2 ? 'opacity-100' : 'opacity-0 absolute pointer-events-none'}`}>

          {/* Left: Platform Cards */}
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8">
            <div className="mb-6">
              <div className="inline-block px-4 py-2 bg-green-500/10 rounded-full border border-green-500/30 mb-3">
                <p className="text-green-300 font-medium text-xs">Cross-Platform</p>
              </div>
              <h3 className="text-2xl font-bold text-white">Access Anywhere</h3>
            </div>

            <div className="space-y-4 mb-8">
              <div className="p-4 rounded-xl border border-green-500/30 bg-green-950/20">
                <div className="flex items-center gap-3 mb-2">
                  <Monitor className="text-green-400" size={24} />
                  <div className="flex-1">
                    <h4 className="text-white font-semibold">Web Application</h4>
                    <div className="text-green-400 text-xs flex items-center gap-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                      Available Now
                    </div>
                  </div>
                </div>
                <p className="text-white/60 text-sm">Full-featured trading platform accessible from any browser</p>
              </div>

              <div className="p-4 rounded-xl border border-green-500/30 bg-green-950/20">
                <div className="flex items-center gap-3 mb-2">
                  <Smartphone className="text-green-400" size={24} />
                  <div className="flex-1">
                    <h4 className="text-white font-semibold">Mobile App</h4>
                    <div className="text-green-400 text-xs flex items-center gap-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                      Available Now
                    </div>
                  </div>
                </div>
                <p className="text-white/60 text-sm">Trade on the go with our native mobile experience</p>
              </div>

              <div className="p-4 rounded-xl border border-yellow-500/30 bg-yellow-950/20">
                <div className="flex items-center gap-3 mb-2">
                  <Tablet className="text-yellow-400" size={24} />
                  <div className="flex-1">
                    <h4 className="text-white font-semibold">iOS Application</h4>
                    <div className="text-yellow-400 text-xs flex items-center gap-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-yellow-400 animate-pulse" />
                      Coming Soon
                    </div>
                  </div>
                </div>
                <p className="text-white/60 text-sm">Native iOS experience in development</p>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 border border-white/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <Github size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="text-white font-bold">Open Source</h4>
                  <p className="text-white/50 text-xs">MIT Licensed • Free Forever</p>
                </div>
              </div>
              <p className="text-white/70 text-sm">
                Built with transparency. Fork, customize, and contribute to the project.
              </p>
            </div>
          </div>

          {/* Right: Explanation */}
          <div className="flex flex-col justify-center">
            <div className="inline-block px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-4 w-fit">
              <p className="text-white/60 font-medium text-sm">For Everyone</p>
            </div>
            
            <h2 className="text-4xl font-bold text-white mb-6">
              Trade from any device, customize everything
            </h2>
            
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              OptionXI is designed to work wherever you are. Whether you're at your desk or on the move, 
              you have full access to all features. And because it's open source, you can modify it to 
              perfectly fit your trading style.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Synchronized Experience</h4>
                  <p className="text-white/60 text-sm">Your data, settings, and positions sync seamlessly across all devices</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Community Driven</h4>
                  <p className="text-white/60 text-sm">Join hundreds of traders contributing features and improvements</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">No Vendor Lock-in</h4>
                  <p className="text-white/60 text-sm">Your code, your data, your freedom. Self-host or use our cloud</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-orange-500/20 border border-orange-500/50 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Always Free</h4>
                  <p className="text-white/60 text-sm">No subscriptions, no hidden costs. Use all features without limitations</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-12">
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeSlide === idx ? 'w-8 bg-blue-500' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes ping {
          75%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        @keyframes dash {
          0%, 100% {
            stroke-dasharray: 1, 150;
            stroke-dashoffset: 0;
          }
          50% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -35;
          }
        }
      `}</style>
    </div>
  );
}