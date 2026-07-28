'use client'

import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRight, Shield, Zap, BarChart3, Bell, Trophy, LineChart,
  Star, CheckCircle2, Sun, Moon, Github, ChevronRight, Users,
  GraduationCap, Lock, Sparkles,
  BrainCircuit
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data pulled from the live Play Store listing + subscription CSV    */
/* ------------------------------------------------------------------ */

const APP_ICON =
  "https://play-lh.googleusercontent.com/31FPe2frYtE9cmfWTpU_vKXVEY0ZwC5s7rTS55ZNgrIh-Ca-L5VVLsLVMp1VnDlj0kQyQN3cd7HP7ufh0cgLZA=w240-h240";

const SCREENSHOTS = [
    { src: "assets/screenshots/Home Page New.png", title: "Homepage" },
    { src: "assets/screenshots/Home Page new 2.png", title: "Homepage" },
    { src: "assets/screenshots/Market Sentiment.png", title: "Market Sentiment" },
    { src: "assets/screenshots/Market Tools.png", title: "Trading Tools" }
  ];

const MAINSCREENSHOTS = [
    { src: "assets/screenshots/Home Screen.png", title: "HomeScreen" },
    { src: "assets/screenshots/AI NIfty.png", title: "HomeScreen2" },
  ];

const TICKER = [
  { s: "NIFTY 50", p: "24,812.35", d: "+0.62%", up: true },
  { s: "BANKNIFTY", p: "51,204.10", d: "-0.18%", up: false },
  { s: "RELIANCE", p: "2,945.20", d: "+1.12%", up: true },
  { s: "TCS", p: "3,812.00", d: "-0.42%", up: false },
  { s: "INFY", p: "1,842.55", d: "+0.88%", up: true },
  { s: "HDFCBANK", p: "1,652.30", d: "+0.25%", up: true },
  { s: "SBIN", p: "812.40", d: "-0.31%", up: false },
  { s: "TATAMOTORS", p: "984.15", d: "+2.04%", up: true },
];

const FEATURES = [
  { icon: LineChart, title: "Virtual trading, real data", body: "Practice on NIFTY, BankNIFTY and options using live market prices — no real money on the line." },
  { icon: BarChart3, title: "Stock screeners", body: "Filter thousands of stocks by price action, volume and technical signals in a couple of taps." },
  { icon: Bell, title: "Watchlists & alerts", body: "Build a personal watchlist and get notified the moment a price or trend moves." },
  { icon: Trophy, title: "Leaderboards", body: "See how your paper trades stack up against other learners, daily and all-time." },
  { icon: Shield, title: "Fully open source", body: "The entire codebase is public. Inspect it, self-host it, or help build the next feature." },
  { icon: Zap, title: "Connect a real broker", body: "When you're ready, link Zerodha, Upstox, Angel One, Fyers or Dhan and trade for real." },
];

const STEPS = [
  { n: "01", title: "Screen the market", body: "Run a screener or check the day's top gainers and losers to find stocks worth watching." },
  { n: "02", title: "Practice risk-free", body: "Place virtual trades using live prices during market hours — build discipline before you risk a rupee." },
  { n: "03", title: "Go live when ready", body: "Link your broker account and move from paper trading to the real thing, in the same app." },
];

const PLANS = [
  {
    key: "basic",
    name: "Basic",
    tagline: "Stay updated on the market",
    price: 400,
    popular: false,
    features: ["Real-time market sentiment alerts", "Real-time news alerts", "Up to 30 stock screeners"],
  },
  {
    key: "pro",
    name: "Pro",
    tagline: "For active, hands-on traders",
    price: 800,
    popular: true,
    features: ["Everything in Basic", "Real-time stock pick alerts", "Up to 50 stock screeners"],
  },
  {
    key: "max",
    name: "Max",
    tagline: "The full research & automation suite",
    price: 1500,
    popular: false,
    features: ["Everything in Pro", "In-depth research analysis", "Live market depth data", "3 custom algo deployments", "Alerts on WhatsApp"],
  },
];

const REVIEWS = [
  { name: "Geetasri A.", text: "One of the best apps for beginners — genuinely helpful for learning the ropes.", rating: 5 },
  { name: "Sajith Antony", text: "My go-to for real-time updates. Smooth interface, timely notifications, great for staying ahead.", rating: 5 },
  { name: "Satish Reddy", text: "Best app so far for virtual trading in stocks — simple, clean UI.", rating: 5 },
];

/* ------------------------------------------------------------------ */

export default function OptionXiLanding() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const t = dark
    ? {
        bg: "bg-slate-950", bgAlt: "bg-slate-900", card: "bg-slate-900",
        text: "text-slate-50", sub: "text-slate-400", border: "border-slate-800",
        headerBg: "bg-slate-950/80", navHover: "hover:text-emerald-400",
        inputBg: "bg-slate-800",
      }
    : {
        bg: "bg-white", bgAlt: "bg-slate-50", card: "bg-white",
        text: "text-slate-900", sub: "text-slate-500", border: "border-slate-200",
        headerBg: "bg-white/80", navHover: "hover:text-emerald-700",
        inputBg: "bg-slate-100",
      };

  return (
    <div className={`${t.bg} ${t.text} min-h-screen transition-colors duration-300`}>
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .marquee-track { animation: marquee 28s linear infinite; }
        .marquee-wrap:hover .marquee-track { animation-play-state: paused; }
      `}</style>

      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: dark
              ? "radial-gradient(600px circle at 80% -10%, rgba(16,185,129,0.15), transparent 60%)"
              : "radial-gradient(600px circle at 80% -10%, rgba(16,185,129,0.10), transparent 60%)",
          }}
        />
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-8 relative">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className={`inline-flex items-center gap-2 rounded-full border ${t.border} ${t.bgAlt} px-3 py-1 text-xs font-medium mb-6`}>
                <Github size={13} className="text-emerald-500" />
                <span className={t.sub}>Open source · Made in India</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight mb-6">
                Learn the market before
                <span className="block text-emerald-600">you risk a rupee.</span>
              </h1>

              <p className={`text-lg ${t.sub} max-w-xl mb-8 leading-relaxed`}>
                OptionXi is a free virtual trading app for the Indian stock market. Screen stocks, get
                real-time alerts, and practice with live NIFTY &amp; BankNifty prices — then connect a real
                broker whenever you're ready to trade for real.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-8">
                <a
                  href="https://play.google.com/store/apps/details?id=com.optionxi.app"
                  target="_blank" rel="noreferrer"
                  className="transition-transform hover:scale-105"
                >
                  <img
                    src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                    alt="Get it on Google Play"
                    className="h-16 w-auto"
                  />
                </a>
                <a
                  href="https://app.optionxi.com"
                  target="_blank" rel="noreferrer"
                  className={`inline-flex items-center gap-2 border ${t.border} px-6 py-4 rounded-xl font-semibold ${t.navHover} transition-colors`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Open Web Terminal
                  <ChevronRight size={16} />
                </a>
              </div>

              <div className={`flex flex-wrap gap-x-8 gap-y-3 text-sm ${t.sub}`}>
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-400">
                    {[...Array(4)].map((_, i) => <Star key={i} size={14} fill="currentColor" strokeWidth={0} />)}
                    <Star size={14} fill="currentColor" strokeWidth={0} className="opacity-40" />
                  </div>
                  <span><strong className={t.text}>4.2</strong> on Google Play</span>
                </div>
                <div className="flex items-center gap-2"><Users size={15} /> 5,000+ downloads</div>
                <div className="flex items-center gap-2"><Lock size={15} /> Secure Google sign-in</div>
              </div>
            </div>

            {/* Phone mock with floating stat chips */}
            <div className="relative flex justify-center lg:justify-end">
              {/* Back phone — angled, offset behind */}
              <div
                className={`hidden sm:block absolute w-60 rounded-[2rem] border-8 ${dark ? "border-slate-800" : "border-slate-900"} bg-slate-900 shadow-xl overflow-hidden opacity-90`}
                style={{
                  transform: "rotate(-20deg) translate(-148px, -38px)",
                  zIndex: 0,
                }}
              >
                <img
                  src={MAINSCREENSHOTS[1].src}
                  alt="OptionXi app screenshot — AI analysis"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Front phone */}
              <div
                className={`relative w-64 rounded-[2.2rem] border-8 ${dark ? "border-slate-800" : "border-slate-900"} bg-slate-900 shadow-2xl overflow-hidden`}
                style={{ zIndex: 1 }}
              >
                <img src={MAINSCREENSHOTS[0].src} alt="OptionXi app screenshot" className="w-full h-auto object-cover" />
              </div>

              <div className={`hidden sm:flex absolute -left-6 top-10 items-center gap-2 rounded-xl border ${t.border} ${t.card} shadow-lg px-3 py-2 z-10`}>
                <Sparkles size={14} className="text-emerald-500" />
                <div className="text-xs">
                  <div className="font-semibold">Breakout alert</div>
                  <div className={t.sub}>RELIANCE +1.12%</div>
                </div>
              </div>

              <div className={`hidden sm:flex absolute -right-4 bottom-16 items-center gap-2 rounded-xl border ${t.border} ${t.card} shadow-lg px-3 py-2 z-10`}>
                <Trophy size={14} className="text-amber-500" />
                <div className="text-xs">
                  <div className="font-semibold">Leaderboard</div>
                  <div className={t.sub}>You're #24 today</div>
                </div>
              </div>

              <div className={`hidden lg:flex absolute -right-10 top-6 items-center gap-2 rounded-xl border ${t.border} ${t.card} shadow-lg px-3 py-2 z-10`}>
                <BrainCircuit size={14} className="text-violet-500" />
                <div className="text-xs">
                  <div className="font-semibold">AI Analysis</div>
                  <div className={t.sub}>Bullish bias · 82%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ticker marquee — signature element */}
        <div className={`marquee-wrap mt-10 border-y ${t.border} ${t.bgAlt} py-3 overflow-hidden`}>
          <div className="marquee-track flex w-max gap-8">
            {[...TICKER, ...TICKER].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm font-mono whitespace-nowrap">
                <span className={`font-semibold ${t.text}`}>{item.s}</span>
                <span className={t.sub}>{item.p}</span>
                <span className={item.up ? "text-emerald-500" : "text-rose-500"}>{item.d}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Features ---------------- */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-2xl mb-14">
          <span className="text-emerald-600 text-sm font-semibold uppercase tracking-wide">What you can do</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 tracking-tight">Everything a self-taught trader needs</h2>
          <p className={`${t.sub} text-lg`}>No jargon, no clutter — just the tools that help you understand the market and practice safely.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <div key={i} className={`p-6 rounded-2xl border ${t.border} ${t.bgAlt} hover:border-emerald-500/50 transition-colors`}>
              <div className="w-11 h-11 rounded-xl bg-emerald-600/10 flex items-center justify-center mb-4">
                <f.icon size={20} className="text-emerald-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className={`${t.sub} text-sm leading-relaxed`}>{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- How it works ---------------- */}
      <section id="how" className={`${t.bgAlt} border-y ${t.border} py-24`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-14">
            <span className="text-emerald-600 text-sm font-semibold uppercase tracking-wide">The process</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 tracking-tight">Three steps from curious to confident</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((s, i) => (
              <div key={i} className="relative">
                <div className="text-5xl font-mono font-bold text-emerald-600/20 mb-2">{s.n}</div>
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className={`${t.sub} leading-relaxed`}>{s.body}</p>
                {i < STEPS.length - 1 && (
                  <ArrowRight size={18} className={`hidden md:block absolute top-2 -right-4 ${t.sub}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Screenshots ---------------- */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <span className="text-emerald-600 text-sm font-semibold uppercase tracking-wide">See it in action</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 tracking-tight">Straight from the Play Store</h2>
          </div>
        </div>
        <div className="flex gap-5 overflow-x-auto pb-4 -mx-6 px-6 snap-x">
          {SCREENSHOTS.map((images, i) => (
            <div key={i} className={`flex-shrink-0 w-52 rounded-2xl overflow-hidden border ${t.border} snap-start shadow-sm`}>
              <img src={images.src} alt={`OptionXi screenshot ${i + 1}`} className="w-full h-auto" />
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Pricing ---------------- */}
      <section id="pricing" className={`${t.bgAlt} border-y ${t.border} py-24`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-4">
            <span className="text-emerald-600 text-sm font-semibold uppercase tracking-wide">Pricing</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 tracking-tight">Start free, upgrade only if you need more</h2>
          </div>
          <p className={`${t.sub} mb-14 max-w-2xl`}>The app and virtual trading are free to use. These optional plans unlock more screeners and faster alerts for traders who want an edge.</p>

          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((p) => (
              <div
                key={p.key}
                className={`relative rounded-2xl border p-8 ${p.popular ? "border-emerald-500 shadow-lg" : t.border} ${t.card}`}
              >
                {p.popular && (
                  <span className="absolute -top-3 left-8 bg-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most popular
                  </span>
                )}
                <h3 className="text-xl font-bold">{p.name}</h3>
                <p className={`${t.sub} text-sm mb-6`}>{p.tagline}</p>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold font-mono">₹{p.price}</span>
                  <span className={t.sub}>/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {p.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className={t.sub}>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-xl font-semibold transition-colors ${
                    p.popular
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                      : `border ${t.border} ${t.navHover}`
                  }`}
                >
                  Choose {p.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Reviews ---------------- */}
      <section id="reviews" className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
          <div>
            <span className="text-emerald-600 text-sm font-semibold uppercase tracking-wide">Reviews</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 tracking-tight">What traders are saying</h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex text-amber-400">
              {[...Array(4)].map((_, i) => <Star key={i} size={18} fill="currentColor" strokeWidth={0} />)}
              <Star size={18} fill="currentColor" strokeWidth={0} className="opacity-40" />
            </div>
            <span className="font-bold text-lg">4.2</span>
            <span className={t.sub}>· 48 reviews</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <div key={i} className={`p-6 rounded-2xl border ${t.border} ${t.bgAlt}`}>
              <div className="flex text-amber-400 mb-3">
                {[...Array(r.rating)].map((_, j) => <Star key={j} size={14} fill="currentColor" strokeWidth={0} />)}
              </div>
              <p className={`text-sm leading-relaxed mb-4 ${t.sub}`}>"{r.text}"</p>
              <p className="text-sm font-semibold">{r.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Final CTA ---------------- */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div
          className="rounded-3xl border border-emerald-500/20 p-12 md:p-16 text-center relative overflow-hidden"
          style={{
            background: dark
              ? "linear-gradient(135deg, rgba(16,185,129,0.12), rgba(15,23,42,0))"
              : "linear-gradient(135deg, rgba(16,185,129,0.08), rgba(255,255,255,0))",
          }}
        >
          <img src={APP_ICON} alt="OptionXi" className="w-16 h-16 rounded-2xl mx-auto mb-6 shadow-lg" />
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Start trading smarter, <span className="text-emerald-600">today</span>
          </h2>
          <p className={`${t.sub} text-lg max-w-xl mx-auto mb-10`}>
            Free to download. No real money at risk until you're ready. Open source, always.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://play.google.com/store/apps/details?id=com.optionxi.app"
              target="_blank" rel="noreferrer"
              className="transition-transform hover:scale-105"
            >
              <img
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                alt="Get it on Google Play"
                className="h-16 w-auto"
              />
            </a>
            <a href="https://app.optionxi.com"
                target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 border border-gray-200 text-gray-900 px-6 py-4 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Open Web Terminal
                <ChevronRight size={16} />
              </a>
          </div>
          <div className={`flex flex-wrap items-center justify-center gap-8 mt-10 text-sm ${t.sub}`}>
            <div className="flex items-center gap-2"><Shield size={15} className="text-emerald-500" /> Open source & auditable</div>
            <div className="flex items-center gap-2"><GraduationCap size={15} className="text-emerald-500" /> Built for learning</div>
            <div className="flex items-center gap-2"><Lock size={15} className="text-emerald-500" /> No card needed to start</div>
          </div>
        </div>
      </section>
    </div>
  );
}