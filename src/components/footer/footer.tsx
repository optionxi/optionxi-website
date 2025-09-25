import React from 'react';
import { Twitter, Github, Youtube, Instagram, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0a0b14] pt-12 pb-6 relative z-10">
      <div className="container mx-auto">
        {/* Main Footer Content */}
        {/* Logo and Download Section */}
        <div className="flex flex-col items-center lg:flex-row justify-between w-full px-6 lg:px-16 mb-10 gap-8 lg:gap-0">

        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center lg:items-start lg:grid lg:grid-cols-12 gap-4">
            {/* Logo */}
            <div className="mb-2 mt-2 lg:col-span-4">
              <div className="flex items-center">
                <img 
                  src="/assets/images/logo_xi.png" 
                  alt="OptionXi" 
                  className="h-10 w-10 rounded-lg mr-3"
                />
                <span className="bg-clip-text text-2xl font-bold">OptionXi</span>
              </div>
            </div>
            
            {/* Download Buttons */}
            <div className="flex gap-4 lg:col-span-8">
              <a 
                href="https://play.google.com/store/apps/details?id=com.optionxi.app" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center w-40 h-12 transition-all duration-300 border-none shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-6 h-6" viewBox="0 0 48 48" fill="none">
                    <path d="M6.45 6.323C6.168 6.948 6 7.652 6 8.408v31.179c0 0.761 0.164 1.463 0.45 2.09l17.674-17.68L6.45 6.323z" fill="#00d4ff"/>
                    <path d="M13.488 4.012C10.794 2.508 7.605 3.778 6.45 6.323L24.126 24l9.014-9.014L13.488 4.012z" fill="#00ff88"/>
                    <path d="M33.14 33.014L24.126 24L6.45 41.677c1.156 2.546 4.345 3.815 7.038 2.312L33.14 33.014z" fill="#ff3366"/>
                    <path d="M41.419 28.393c1.72-0.96 2.58-2.676 2.581-4.393c-0.001-1.717-0.861-3.434-2.581-4.393l-8.279-4.621L24.126 24l9.014 9.014L41.419 28.393z" fill="#ffcc00"/>
                  </svg>
                  <span className="text-white text-sm font-medium">Google Play</span>
                </span>
              </a>
              
              {/* <a 
                href="https://apps.apple.com/app/optionxi/id123456789" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center w-40 h-12 transition-all duration-300 border-none shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="-52.01 0 560.035 560.035">
                    <defs>
                      <linearGradient id="appstore-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4FC3F7"/>
                        <stop offset="50%" stopColor="#29B6F6"/>
                        <stop offset="100%" stopColor="#0277BD"/>
                      </linearGradient>
                    </defs>
                    <path fill="url(#appstore-gradient)" d="M380.844 297.529c.787 84.752 74.349 112.955 75.164 113.314-.622 1.988-11.754 40.191-38.756 79.652-23.343 34.117-47.568 68.107-85.731 68.811-37.499.691-49.557-22.236-92.429-22.236-42.859 0-56.256 21.533-91.753 22.928-36.837 1.395-64.889-36.891-88.424-70.883-48.093-69.53-84.846-196.475-35.496-282.165 24.516-42.554 68.328-69.501 115.882-70.192 36.173-.69 70.315 24.336 92.429 24.336 22.1 0 63.59-30.096 107.208-25.676 18.26.76 69.517 7.376 102.429 55.552-2.652 1.644-61.159 35.704-60.523 106.559M310.369 89.418C329.926 65.745 343.089 32.79 339.498 0 311.308 1.133 277.22 18.785 257 42.445c-18.121 20.952-33.991 54.487-29.709 86.628 31.421 2.431 63.52-15.967 83.078-39.655"/>
                  </svg>
                  <span className="text-white text-sm font-medium">App Store</span>
                </span>
              </a> */}
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 items-center">
          {/* <div className="bg-clip-text tracking-wide text-sm font-medium">Follow us on</div> */}
          <div className="flex gap-4">
            <a 
              className="hover:opacity-90 p-2 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 h-12 w-12 flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl" 
              href="https://x.com/OptionXi" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="w-5 h-5 text-white" />
            </a>
            <a 
              className="hover:opacity-90 p-2 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 h-12 w-12 flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl" 
              href="https://github.com/optionxi" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-5 h-5 text-white" />
            </a>
            <a 
              className="hover:opacity-90 p-2 rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 h-12 w-12 flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl" 
              href="https://www.instagram.com/optionxi/" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-5 h-5 text-white" />
            </a>
            <a 
              className="hover:opacity-90 p-2 rounded-full bg-gradient-to-br from-red-500 to-red-700 h-12 w-12 flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl" 
              href="https://www.youtube.com/channel/UCpzBvlP9V0hWhqc1_-1Zonw" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <Youtube className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>
        </div>


        {/* Links Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white px-6 lg:px-16 mb-8">
          
          {/* Tools */}
          <div>
            <div className="uppercase text-xs font-bold tracking-wider mb-3">Tools</div>
            <div className="text-xs space-y-2">
              <div><a className="text-white hover:text-gray-300 transition-colors" href="https://app.optionxi.com/top-gainers" target="_blank">Top Gainers</a></div>
              <div><a className="text-white hover:text-gray-300 transition-colors" href="https://app.optionxi.com/top-losers" target="_blank">Top Losers</a></div>
              <div><a className="text-white hover:text-gray-300 transition-colors" href="https://app.optionxi.com/top-volume" target="_blank">Top Volume</a></div>
              <div><a className="text-white hover:text-gray-300 transition-colors" href="https://app.optionxi.com/heatmap" target="_blank">Heatmap</a></div>
            </div>
          </div>

          {/* Resources */}
          <div>
            <div className="uppercase text-xs font-bold tracking-wider mb-3">Resources</div>
            <div className="text-xs space-y-2">
              <div><a className="text-white hover:text-gray-300 transition-colors" href="https://app.optionxi.com/scanners" target="_blank">Scanners</a></div>
              <div><a className="text-white hover:text-gray-300 transition-colors" href="https://app.optionxi.com/screeners" target="_blank">Screeners</a></div>
              <div><a className="text-white hover:text-gray-300 transition-colors" href="https://app.optionxi.com/bollinger-breakouts" target="_blank">Breakouts</a></div>
              <div><a className="text-white hover:text-gray-300 transition-colors" href="https://app.optionxi.com/atlas" target="_blank">Atlas</a></div>
              <div><a className="text-white hover:text-gray-300 transition-colors" href="https://app.optionxi.com/alerts" target="_blank">Alerts</a></div>
            </div>
          </div>

          {/* Trading */}
          <div>
            <div className="uppercase text-xs font-bold tracking-wider mb-3">Trading</div>
            <div className="text-xs space-y-2">
              <div><a className="text-white hover:text-gray-300 transition-colors" href="https://app.optionxi.com/dashboard" target="_blank">Dashboard</a></div>
              {/* <div><a className="text-white hover:text-gray-300 transition-colors" href="https://app.optionxi.com/portfolio" target="_blank">Portfolio</a></div> */}
              <div><a className="text-white hover:text-gray-300 transition-colors" href="https://app.optionxi.com/watchlist" target="_blank">Watchlist</a></div>
              {/* <div><a className="text-white hover:text-gray-300 transition-colors" href="https://app.optionxi.com/virtual-trading" target="_blank">Virtual Trading</a></div> */}
            </div>
          </div>

          {/* Company */}
          <div>
            <div className="uppercase text-xs font-bold tracking-wider mb-3">Company</div>
            <div className="text-xs space-y-2">
              {/* <div><a className="text-white hover:text-gray-300 transition-colors" href="https://optionxi.com/features" target="_blank">Features</a></div> */}
              {/* <div><a className="text-white hover:text-gray-300 transition-colors" href="https://optionxi.com/pricing" target="_blank">Pricing</a></div> */}
              {/* <div><a className="text-white hover:text-gray-300 transition-colors" href="https://docs.optionxi.com" target="_blank">Documentation</a></div> */}
              <div><a className="text-white hover:text-gray-300 transition-colors" href="https://app.optionxi.com/feature-request" target="_blank">Feature Request</a></div>
            </div>
          </div>
        </div>

        {/* Financial Disclaimer */}
        <div className="px-6 lg:px-16 mb-6">
          <div className="bg-[#1a1b2e] rounded-xl p-4 text-white">
            <div className="font-bold uppercase text-xs mb-2">Financial Content Disclaimer</div>
            <div className="text-xs leading-relaxed">
              The content provided on OptionXi is for educational and informational purposes only and does not constitute financial advice, investment recommendations, or trading signals. OptionXi is a virtual trading platform designed for learning and simulation purposes. All trading activities on our platform are virtual and do not involve real money transactions. We strongly advise users to conduct their own research or consult with qualified financial advisors before making any actual financial decisions. OptionXi does not guarantee the accuracy of market data, trading results, or any information provided by our platform. Virtual trading results do not represent actual trading performance and may not reflect the impact of market liquidity, fees, or other real trading conditions. Users should be aware that past performance in virtual trading does not guarantee future results in real trading. Always ensure that any financial decision aligns with your personal financial situation, risk tolerance, and investment goals. Please read our 
              <a className="underline hover:text-gray-300 ml-1 mr-1" href="https://optionxi.com/privacy-policy">Privacy Policy </a>
              and 
              <a className="underline hover:text-gray-300 ml-1" href="https://optionxi.com/terms-of-use">Terms of Use </a>
               to understand more.
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="px-6 lg:px-16 mb-6 text-white">
          <div className="uppercase text-xs font-bold tracking-wider mb-2">About OptionXi</div>
          <div className="text-xs leading-relaxed">
            OptionXi is India&apos;s open srouce virtual trading platform designed for stock market education and simulation. Our platform provides comprehensive tools for learning NSE stock trading, Nifty 50 strategies, and options trading on Bank Nifty and Nifty indices. With features like advanced stock screeners, real-time alerts, interactive heatmaps, top gainers/losers tracking, and detailed stock analysis, OptionXi empowers traders and investors to develop their skills in a risk-free environment. Whether you&apos;re a beginner learning market basics or an experienced trader testing new strategies, OptionXi provides the tools and insights needed to enhance your trading education.
          </div>
        </div>

        {/* Popular Stocks Section */}
        <div className="px-6 lg:px-16 mb-6 text-white">
          <div className="uppercase text-xs font-bold tracking-wider mb-2">Popular Stocks</div>
          <div className="text-xs leading-relaxed">
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/RELIANCE" target="_blank">RELIANCE</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/TCS" target="_blank">TCS</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/HDFCBANK" target="_blank">HDFCBANK</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/INFY" target="_blank">INFY</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/ICICIBANK" target="_blank">ICICIBANK</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/SBIN" target="_blank">SBIN</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/ITC" target="_blank">ITC</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/BHARTIARTL" target="_blank">BHARTIARTL</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/LT" target="_blank">LT</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/BAJFINANCE" target="_blank">BAJFINANCE</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/MARUTI" target="_blank">MARUTI</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/TATAMOTORS" target="_blank">TATAMOTORS</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/ASIANPAINT" target="_blank">ASIANPAINT</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/AXISBANK" target="_blank">AXISBANK</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/KOTAKBANK" target="_blank">KOTAKBANK</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/WIPRO" target="_blank">WIPRO</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/HCLTECH" target="_blank">HCLTECH</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/TECHM" target="_blank">TECHM</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/ULTRACEMCO" target="_blank">ULTRACEMCO</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/SUNPHARMA" target="_blank">SUNPHARMA</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/TITAN" target="_blank">TITAN</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/NESTLEIND" target="_blank">NESTLEIND</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/HINDUNILVR" target="_blank">HINDUNILVR</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/POWERGRID" target="_blank">POWERGRID</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/NTPC" target="_blank">NTPC</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/COALINDIA" target="_blank">COALINDIA</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/ONGC" target="_blank">ONGC</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/BPCL" target="_blank">BPCL</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/IOC" target="_blank">IOC</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/GRASIM" target="_blank">GRASIM</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/JSWSTEEL" target="_blank">JSWSTEEL</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/TATASTEEL" target="_blank">TATASTEEL</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/HINDALCO" target="_blank">HINDALCO</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/VEDL" target="_blank">VEDL</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/CIPLA" target="_blank">CIPLA</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/DRREDDY" target="_blank">DRREDDY</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/DIVISLAB" target="_blank">DIVISLAB</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/APOLLOHOSP" target="_blank">APOLLOHOSP</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/HEROMOTOCO" target="_blank">HEROMOTOCO</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/BAJAJ-AUTO" target="_blank">BAJAJ-AUTO</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/M&M" target="_blank">M&M</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/EICHERMOT" target="_blank">EICHERMOT</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/TATACONSUM" target="_blank">TATACONSUM</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/BRITANNIA" target="_blank">BRITANNIA</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/UPL" target="_blank">UPL</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/ADANIPORTS" target="_blank">ADANIPORTS</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/ADANIENT" target="_blank">ADANIENT</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/INDUSINDBK" target="_blank">INDUSINDBK</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/BAJAJFINSV" target="_blank">BAJAJFINSV</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/HDFCLIFE" target="_blank">HDFCLIFE</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/SBILIFE" target="_blank">SBILIFE</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/LTIM" target="_blank">LTIM</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/INDIGO" target="_blank">INDIGO</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/ZOMATO" target="_blank">ZOMATO</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/PAYTM" target="_blank">PAYTM</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/NYKAA" target="_blank">NYKAA</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/DMART" target="_blank">DMART</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/TRENT" target="_blank">TRENT</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/IRCTC" target="_blank">IRCTC</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/HAL" target="_blank">HAL</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/BEL" target="_blank">BEL</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/ADANIGREEN" target="_blank">ADANIGREEN</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/SUZLON" target="_blank">SUZLON</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/RVNL" target="_blank">RVNL</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/IRFC" target="_blank">IRFC</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/PFC" target="_blank">PFC</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/RECLTD" target="_blank">RECLTD</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/BANKBARODA" target="_blank">BANKBARODA</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/PNB" target="_blank">PNB</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/CANBK" target="_blank">CANBK</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/UNIONBANK" target="_blank">UNIONBANK</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/FEDERALBNK" target="_blank">FEDERALBNK</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/IDBI" target="_blank">IDBI</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/YESBANK" target="_blank">YESBANK</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/BANDHANBNK" target="_blank">BANDHANBNK</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/AUBANK" target="_blank">AUBANK</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/IDFCFIRSTB" target="_blank">IDFCFIRSTB</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/SHRIRAMFIN" target="_blank">SHRIRAMFIN</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/CHOLAFIN" target="_blank">CHOLAFIN</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/M&MFIN" target="_blank">M&MFIN</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/MFSL" target="_blank">MFSL</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/ABCAPITAL" target="_blank">ABCAPITAL</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/LICHSGFIN" target="_blank">LICHSGFIN</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/POONAWALLA" target="_blank">POONAWALLA</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/LICI" target="_blank">LICI</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/ICICIGI" target="_blank">ICICIGI</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/ICICIPRULI" target="_blank">ICICIPRULI</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/SBICARD" target="_blank">SBICARD</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/HDFCAMC" target="_blank">HDFCAMC</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/POLICYBZR" target="_blank">POLICYBZR</a><span className="mx-1 text-white/60">|</span></span>
            <span className="inline-block"><a className="text-white hover:text-gray-300" href="https://app.optionxi.com/stocks/JIOFIN" target="_blank">JIOFIN</a></span>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-600 my-6"></div>

        {/* Bottom Links */}
        <div className="flex flex-wrap justify-center items-center gap-4 text-white text-sm mb-4">
          {/* <a href="https://optionxi.com/help" className="hover:text-gray-300 transition-colors">Help</a> */}
          {/* <a href="https://optionxi.com/about" className="hover:text-gray-300 transition-colors">About</a> */}
          <a href="https://optionxi.com/privacy-policy" className="hover:text-gray-300 transition-colors">Privacy policy</a>
          <a href="https://optionxi.com/terms-of-use" className="hover:text-gray-300 transition-colors">Terms of use</a>
          {/* <a href="https://optionxi.com/refunds" className="hover:text-gray-300 transition-colors">Refunds</a> */}
        </div>

        {/* Copyright */}
        <div className="text-xs text-center text-white py-3">
          © OptionXi. All rights reserved. Made with
          <Heart className="inline-block mx-1 h-3 w-3 text-red-500 fill-red-500" />
          for traders in India. For queries, feedback or suggestions please email us at 
          <a className="text-gray-300 hover:text-white ml-1" href="mailto:support@optionxi.com">support@optionxi.com</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;