import React, { useState, useEffect, useRef } from 'react';
import { Smartphone, Monitor, Tablet } from 'lucide-react';

// --- Re-usable constants for diagrams ---

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

// --- 1. Timeline Step Component ---
// This component renders one step (circle, line, title) of the timeline.
interface TimelineStepProps {
  index: number;
  activeSlide: number;
  title: string;
  subtitle: string;
  isLast?: boolean;
}

const TimelineStep = ({ index, activeSlide, title, subtitle, isLast = false }: TimelineStepProps) => {
  const isActive = activeSlide === index;
  const isPassed = activeSlide > index;
  // Use different highlight colors for each section
  const activeColor = ['blue', 'purple', 'green'][index] || 'blue';

  return (
    <div className="relative flex items-start">
      {/* Vertical line (progress) */}
      {!isLast && (
        <div
          className={`absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 ${
            isPassed ? `bg-${activeColor}-600` : 'bg-gray-800'
          } transition-colors duration-300`}
          aria-hidden="true"
        />
      )}
      {/* Circle */}
      <span className="flex h-9 items-center">
        <span className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full ${
          isActive
            ? `bg-${activeColor}-600 border-2 border-${activeColor}-400`
            : 'bg-gray-700 border-2 border-gray-600'
        } transition-all duration-300`}>
          <span className={`h-2.5 w-2.5 rounded-full ${
            isActive ? 'bg-white' : 'bg-gray-400'
          } transition-all duration-300`} />
        </span>
      </span>
      {/* Text */}
      <span className="ml-4 flex min-w-0 flex-col">
        <span className={`text-sm font-medium ${
          isActive ? 'text-white' : 'text-white/60'
        } transition-colors duration-300`}>
          {title}
        </span>
        <span className="text-xs text-white/40">
          {subtitle}
        </span>
      </span>
    </div>
  );
};


// --- 2. Text Content Components ---
// We break the text content for each section into its own component.

const TextCoreArchitecture = ({ isActive }: { isActive: boolean }) => (
  <>
    {/* This chip is the only one that highlights */}
    <div className={`inline-block px-4 py-2 rounded-full border mb-4 w-fit transition-all duration-300 ${
      isActive 
        ? 'bg-blue-500/10 border-blue-500/30' 
        : 'bg-white/5 border-white/10'
    }`}>
      <p className={`font-medium text-sm transition-colors duration-300 ${
        isActive
          ? 'text-blue-300'
          : 'text-white/60'
      }`}>
        Unified Trading Platform
      </p>
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
  </>
);

const TextExpandedFeatures = ({ }: { isActive: boolean }) => (
  <>
    {/* Chip removed from this component for simplicity */}
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
  </>
);

const TextPlatformAvailability = ({ }: { isActive: boolean }) => (
  <>
    {/* Chip removed from this component for simplicity */}
    <h2 className="text-4xl font-bold text-white mb-6">
      Trade from any device, customize everything
    </h2>
    
    <p className="text-white/70 text-lg mb-8 leading-relaxed">
      OptionXI is designed to work wherever you are. Whether you&apos;re at your desk or on the move, 
      you have full access to all features. And because it&apos;s open source, you can modify it to 
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
  </>
);


// --- 3. Diagram Components ---
// We break the diagrams for each section into their own components.

const DiagramCoreArchitecture = () => (
  <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8 relative overflow-hidden h-full">
    {/* Updated header section to match other diagrams */}
    <div className="mb-6">
      <div className="inline-block px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/30 mb-3">
        <p className="text-blue-300 font-medium text-xs">Core Architecture</p>
      </div>
      <h3 className="text-2xl font-bold text-white">Connect & Aggregate</h3>
    </div>

    {/* Brokers at top */}
    <div className="grid grid-cols-3 gap-3 mb-8">
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
  </div>
);

const DiagramExpandedFeatures = () => (
  <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8 h-full">
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
);

const DiagramPlatformAvailability = () => (
  <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8 h-full">
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
  </div>
);

// --- 4. Main Component ---
// This brings it all together.
export default function OptionXIArchitecture() {
  const [activeSlide, setActiveSlide] = useState(0);
  
  const sectionRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null)
  ];

  // Updated section subtitles to remove repetition
  const sections = [
    { title: 'Core Architecture', subtitle: 'How data flows' },
    { title: 'Expanded Features', subtitle: 'Your complete toolkit' },
    { title: 'Platform Availability', subtitle: 'Trade from anywhere' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            setActiveSlide(Number(entry.target.dataset.index));
          }
        });
      },
      {
        // Use a larger rootMargin (60% of viewport height)
        // to prevent "dead zones" between sections.
        // This triggers when an element enters the area between
        // 20% from the top and 20% from the bottom.
        rootMargin: '-20% 0px -20% 0px',
        threshold: 0,
      }
    );

    sectionRefs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      sectionRefs.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
      observer.disconnect();
    };
  }, []); // Empty dependency array is correct

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Heading */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 bg-clip-text text-transparent mb-3">
            OptionXI Architecture
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            A unified, open-source trading ecosystem that connects brokers, data, and devices in one platform.
          </p>
        </div>

        {/* Main Content Layout: 2-column grid on desktop */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          
          {/* Left Column: Scrolling Text and Timeline */}
          <div className="lg:col-span-1">
            
            {/* Section 1 */}
            <div ref={sectionRefs[0]} data-index={0} className="relative">
              <TimelineStep
                index={0}
                activeSlide={activeSlide}
                title={sections[0].title}
                subtitle={sections[0].subtitle}
              />
              <div className="ml-12 pt-4"> {/* Indent content from timeline */}
                <TextCoreArchitecture isActive={activeSlide === 0} />
              </div>
            </div>
            {/* Spacer div to create gap without affecting observer */}
            <div className="h-24 lg:h-48" />
            
            {/* Section 2 */}
            <div ref={sectionRefs[1]} data-index={1} className="relative">
              <TimelineStep
                index={1}
                activeSlide={activeSlide}
                title={sections[1].title}
                subtitle={sections[1].subtitle}
              />
              <div className="ml-12 pt-4">
                <TextExpandedFeatures isActive={activeSlide === 1} />
              </div>
            </div>
            {/* Spacer div to create gap without affecting observer */}
            <div className="h-24 lg:h-48" />

            {/* Section 3 */}
            <div ref={sectionRefs[2]} data-index={2} className="relative">
              <TimelineStep
                index={2}
                activeSlide={activeSlide}
                title={sections[2].title}
                subtitle={sections[2].subtitle}
                isLast
              />
              <div className="ml-12 pt-4">
                <TextPlatformAvailability isActive={activeSlide === 2} />
              </div>
            </div>
            {/* Final spacer */}
            <div className="h-12" />
            
          </div>

          {/* Right Column: Sticky, Fading Diagrams (Hidden on mobile) */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 h-[calc(100vh-8rem)]">
              {/* We use a relative container to stack the diagrams on top of each other */}
              <div className="relative w-full h-full flex items-center justify-center">
                
                {/* Diagram 1 */}
                <div className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                  activeSlide === 0 ? 'opacity-100' : 'opacity-0'
                }`}>
                  <DiagramCoreArchitecture />
                </div>
                
                {/* Diagram 2 */}
                <div className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                  activeSlide === 1 ? 'opacity-100' : 'opacity-0'
                }`}>
                  <DiagramExpandedFeatures />
                </div>
                
                {/* Diagram 3 */}
                <div className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                  activeSlide === 2 ? 'opacity-100' : 'opacity-0'
                }`}>
                  <DiagramPlatformAvailability />
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>

      {/* These styles are from the original code and are still needed */}
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
        
        /* Utility classes for dynamic colors */
        .bg-blue-600 { background-color: ${'rgb(37 99 235)'}; }
        .border-blue-400 { border-color: ${'rgb(96 165 250)'}; }
        .bg-purple-600 { background-color: ${'rgb(147 51 234)'}; }
        .border-purple-400 { border-color: ${'rgb(192 132 252)'}; }
        .bg-green-600 { background-color: ${'rgb(22 163 74)'}; }
        .border-green-400 { border-color: ${'rgb(74 222 128)'}; }
        
        .bg-blue-500\\/10 { background-color: rgba(59, 130, 246, 0.1); }
        .border-blue-500\\/30 { border-color: rgba(59, 130, 246, 0.3); }
        .text-blue-300 { color: ${'rgb(147 197 253)'}; }
        
        .bg-purple-500\\/10 { background-color: rgba(168, 85, 247, 0.1); }
        .border-purple-500\\/30 { border-color: rgba(168, 85, 247, 0.3); }
        .text-purple-300 { color: ${'rgb(216 180 254)'}; }
        
        .bg-green-500\\/10 { background-color: rgba(34, 197, 94, 0.1); }
        .border-green-500\\/30 { border-color: rgba(34, 197, 94, 0.3); }
        .text-green-300 { color: ${'rgb(134 239 172)'}; }
      `}</style>
    </div>
  );
}