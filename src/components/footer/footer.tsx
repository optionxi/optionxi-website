import React from 'react';
import { Twitter, Github, Youtube, Instagram, ArrowUpRight, ShieldCheck } from 'lucide-react';

const toolLinks = [
  { label: 'Top Gainers', href: 'https://app.optionxi.com/top-gainers' },
  { label: 'Top Losers', href: 'https://app.optionxi.com/top-losers' },
  { label: 'Top Volume', href: 'https://app.optionxi.com/top-volume' },
  { label: 'Heatmap', href: 'https://app.optionxi.com/heatmap' },
];

const resourceLinks = [
  { label: 'Scanners', href: 'https://app.optionxi.com/scanners' },
  { label: 'Screeners', href: 'https://app.optionxi.com/screeners' },
  { label: 'Breakouts', href: 'https://app.optionxi.com/bollinger-breakouts' },
  { label: 'Atlas', href: 'https://app.optionxi.com/atlas' },
  { label: 'Alerts', href: 'https://app.optionxi.com/alerts' },
];

const tradingLinks = [
  { label: 'Dashboard', href: 'https://app.optionxi.com/dashboard' },
  { label: 'Watchlist', href: 'https://app.optionxi.com/watchlist' },
];

const companyLinks = [
  { label: 'Feature Request', href: 'https://app.optionxi.com/feature-request' },
];

const popularStocks = [
  'RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ICICIBANK', 'SBIN', 'ITC', 'BHARTIARTL',
  'LT', 'BAJFINANCE', 'MARUTI', 'TATAMOTORS', 'ASIANPAINT', 'AXISBANK', 'KOTAKBANK',
  'WIPRO', 'HCLTECH', 'TECHM', 'ULTRACEMCO', 'SUNPHARMA', 'TITAN', 'NESTLEIND',
  'HINDUNILVR', 'POWERGRID', 'NTPC', 'COALINDIA', 'ONGC', 'BPCL', 'IOC', 'GRASIM',
  'JSWSTEEL', 'TATASTEEL', 'HINDALCO', 'VEDL', 'CIPLA', 'DRREDDY', 'DIVISLAB',
  'APOLLOHOSP', 'HEROMOTOCO', 'BAJAJ-AUTO', 'M&M', 'EICHERMOT', 'TATACONSUM',
  'BRITANNIA', 'UPL', 'ADANIPORTS', 'ADANIENT', 'INDUSINDBK', 'BAJAJFINSV',
  'HDFCLIFE', 'SBILIFE', 'LTIM', 'INDIGO', 'ZOMATO', 'PAYTM', 'NYKAA', 'DMART',
  'TRENT', 'IRCTC', 'HAL', 'BEL', 'ADANIGREEN', 'SUZLON', 'RVNL', 'IRFC', 'PFC',
  'RECLTD', 'BANKBARODA', 'PNB', 'CANBK', 'UNIONBANK', 'FEDERALBNK', 'IDBI',
  'YESBANK', 'BANDHANBNK', 'AUBANK', 'IDFCFIRSTB', 'SHRIRAMFIN', 'CHOLAFIN',
  'M&MFIN', 'MFSL', 'ABCAPITAL', 'LICHSGFIN', 'POONAWALLA', 'LICI', 'ICICIGI',
  'ICICIPRULI', 'SBICARD', 'HDFCAMC', 'POLICYBZR', 'JIOFIN',
];

const socials = [
  { icon: Twitter, href: 'https://x.com/OptionXi', label: 'X (Twitter)' },
  { icon: Github, href: 'https://github.com/optionxi', label: 'GitHub' },
  { icon: Instagram, href: 'https://www.instagram.com/optionxi/', label: 'Instagram' },
  { icon: Youtube, href: 'https://www.youtube.com/channel/UCpzBvlP9V0hWhqc1_-1Zonw', label: 'YouTube' },
];

const LinkColumn = ({ title, links }: { title: string; links: { label: string; href: string }[] }) => (
  <div>
    <div className="text-[11px] font-semibold tracking-[0.14em] text-slate-400 uppercase mb-4">
      {title}
    </div>
    <ul className="space-y-2.5">
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 text-[13.5px] text-slate-600 hover:text-slate-900 transition-colors"
          >
            {link.label}
            <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-[-2px] group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  return (
    <footer className="relative z-10 print:hidden bg-[#FAFAF8] border-t border-slate-200">
      {/* Signature accent line — a subtle uptrend gradient, nodding to a market chart */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Top: Brand + Download + Socials */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10 pt-14 pb-12 border-b border-slate-200">
          <div className="flex flex-col items-center lg:items-start gap-4 max-w-sm text-center lg:text-left">
            <div className="flex items-center gap-3">
              <img
                src="/assets/images/logo_xi.png"
                alt="OptionXi"
                className="h-9 w-9 rounded-lg ring-1 ring-slate-200"
              />
              <span className="text-xl font-semibold text-slate-900 tracking-tight">OptionXi</span>
            </div>
            <p className="text-[13px] leading-relaxed text-slate-500">
              India&apos;s open-source virtual trading platform for learning the markets, risk-free.
            </p>
            <a
              href="https://play.google.com/store/apps/details?id=com.optionxi.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 w-fit px-4 h-11 rounded-lg border border-slate-300 bg-white hover:border-slate-400 hover:shadow-sm transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none">
                <path d="M6.45 6.323C6.168 6.948 6 7.652 6 8.408v31.179c0 0.761 0.164 1.463 0.45 2.09l17.674-17.68L6.45 6.323z" fill="#00A3FF" />
                <path d="M13.488 4.012C10.794 2.508 7.605 3.778 6.45 6.323L24.126 24l9.014-9.014L13.488 4.012z" fill="#00C97A" />
                <path d="M33.14 33.014L24.126 24L6.45 41.677c1.156 2.546 4.345 3.815 7.038 2.312L33.14 33.014z" fill="#E23B5E" />
                <path d="M41.419 28.393c1.72-0.96 2.58-2.676 2.581-4.393c-0.001-1.717-0.861-3.434-2.581-4.393l-8.279-4.621L24.126 24l9.014 9.014L41.419 28.393z" fill="#FFB800" />
              </svg>
              <span className="text-slate-800 text-sm font-medium">Get it on Google Play</span>
            </a>
          </div>

          <div className="flex flex-col items-center lg:items-end gap-3">
            <div className="text-[11px] font-semibold tracking-[0.14em] text-slate-400 uppercase">
              Follow along
            </div>
            <div className="flex gap-2.5">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="h-10 w-10 flex items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 hover:text-slate-900 hover:border-slate-400 hover:shadow-sm transition-all"
                >
                  <Icon className="w-[18px] h-[18px]" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 py-12 border-b border-slate-200">
          <LinkColumn title="Tools" links={toolLinks} />
          <LinkColumn title="Resources" links={resourceLinks} />
          <LinkColumn title="Trading" links={tradingLinks} />
          <LinkColumn title="Company" links={companyLinks} />
        </div>

        {/* Financial disclaimer */}
        <div className="py-8">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 shrink-0 h-8 w-8 rounded-full bg-emerald-50 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <div className="text-[11px] font-semibold tracking-[0.14em] text-slate-400 uppercase mb-1.5">
                  Financial content disclaimer
                </div>
                <p className="text-[12.5px] leading-relaxed text-slate-500">
                  The content provided on OptionXi is for educational and informational purposes only and
                  does not constitute financial advice, investment recommendations, or trading signals.
                  OptionXi is a virtual trading platform designed for learning and simulation purposes. All
                  trading activities on our platform are virtual and do not involve real money transactions.
                  We strongly advise users to conduct their own research or consult with qualified financial
                  advisors before making any actual financial decisions. OptionXi does not guarantee the
                  accuracy of market data, trading results, or any information provided by our platform.
                  Virtual trading results do not represent actual trading performance and may not reflect the
                  impact of market liquidity, fees, or other real trading conditions. Users should be aware
                  that past performance in virtual trading does not guarantee future results in real trading.
                  Always ensure that any financial decision aligns with your personal financial situation,
                  risk tolerance, and investment goals.{' '}
                  <span className="text-slate-700 font-medium">
                    For educational and simulation purposes. Not affiliated with NSE or BSE. Real-money
                    trading requires a connected, licensed broker account.
                  </span>{' '}
                  Please read our
                  <a className="underline decoration-slate-300 hover:text-slate-900 hover:decoration-slate-500 mx-1" href="https://optionxi.com/privacy-policy">
                    Privacy Policy
                  </a>
                  and
                  <a className="underline decoration-slate-300 hover:text-slate-900 hover:decoration-slate-500 ml-1" href="https://optionxi.com/terms-of-use">
                    Terms of Use
                  </a>{' '}
                  to understand more.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="pb-8">
          <div className="text-[11px] font-semibold tracking-[0.14em] text-slate-400 uppercase mb-2">
            About OptionXi
          </div>
          <p className="text-[12.5px] leading-relaxed text-slate-500 max-w-4xl">
            OptionXi is India&apos;s open source virtual trading platform designed for stock market education
            and simulation. Our platform provides comprehensive tools for learning NSE stock trading, Nifty 50
            strategies, and options trading on Bank Nifty and Nifty indices. With features like advanced stock
            screeners, real-time alerts, interactive heatmaps, top gainers/losers tracking, and detailed stock
            analysis, OptionXi empowers traders and investors to develop their skills in a risk-free
            environment. Whether you&apos;re a beginner learning market basics or an experienced trader testing
            new strategies, OptionXi provides the tools and insights needed to enhance your trading education.
          </p>
        </div>

        {/* Popular stocks — quiet ticker strip */}
        <div className="pb-10">
          <div className="text-[11px] font-semibold tracking-[0.14em] text-slate-400 uppercase mb-2">
            Popular Stocks
          </div>
          <div className="text-[12px] leading-loose text-slate-400 max-w-5xl">
            {popularStocks.map((symbol, i) => (
              <span key={symbol} className="inline-block">
                <a
                  className="hover:text-slate-800 transition-colors"
                  href={`https://app.optionxi.com/stocks/${symbol}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {symbol}
                </a>
                {i < popularStocks.length - 1 && <span className="mx-1.5 text-slate-300">·</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4 py-6 border-t border-slate-200">
          <div className="text-[12px] text-slate-400 text-center md:text-left">
            © OptionXi. All rights reserved. Made for traders in India. Questions or feedback?{' '}
            <a className="text-slate-600 hover:text-slate-900 transition-colors" href="mailto:support@optionxi.com">
              support@optionxi.com
            </a>
          </div>
          <div className="flex items-center gap-6 text-[12.5px]">
            <a href="https://optionxi.com/privacy-policy" className="text-slate-500 hover:text-slate-900 transition-colors">
              Privacy policy
            </a>
            <a href="https://optionxi.com/terms-of-use" className="text-slate-500 hover:text-slate-900 transition-colors">
              Terms of use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;