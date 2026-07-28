'use client'

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import {
  ArrowRight, Shield, Zap, BarChart3, Bell, Trophy, LineChart,
  Star, CheckCircle2, Github, ChevronRight, Users,
  GraduationCap, Lock, Sparkles,
  BrainCircuit
} from "lucide-react";
import IndicesTicker from "@/components/tickers/indices-ticker";

/* ------------------------------------------------------------------ */
/*  Data pulled from the live Play Store listing + subscription CSV    */
/* ------------------------------------------------------------------ */

const APP_ICON = {
  light: "https://play-lh.googleusercontent.com/31FPe2frYtE9cmfWTpU_vKXVEY0ZwC5s7rTS55ZNgrIh-Ca-L5VVLsLVMp1VnDlj0kQyQN3cd7HP7ufh0cgLZA=w240-h240",
  dark: "https://play-lh.googleusercontent.com/31FPe2frYtE9cmfWTpU_vKXVEY0ZwC5s7rTS55ZNgrIh-Ca-L5VVLsLVMp1VnDlj0kQyQN3cd7HP7ufh0cgLZA=w240-h240", // swap when you have a dark-mode icon
};


/* One screenshot per feature — swap these for dedicated feature screenshots when available */
const FEATURE_SCREENSHOTS = [
  { src: "assets/screenshots/Home Page New.png", darkSrc: null, chip: { icon: LineChart, label: "Live price", value: "NIFTY 24,812 ▲" } },
  { src: "assets/screenshots/Market Tools.png", darkSrc: null, chip: { icon: BarChart3, label: "Screener match", value: "42 stocks found" } },
  { src: "assets/screenshots/Market Sentiment.png", darkSrc: null, chip: { icon: Bell, label: "Price alert", value: "RELIANCE +1.12%" } },
  { src: "assets/screenshots/Home Page new 2.png", darkSrc: null, chip: { icon: Trophy, label: "Leaderboard", value: "You're #24 today" } },
  { src: "assets/screenshots/Home Screen.png", darkSrc: null, chip: { icon: Github, label: "Open source", value: "412 stars on GitHub" } },
  { src: "assets/screenshots/AI Nifty.png", darkSrc: null, chip: { icon: Zap, label: "Broker linked", value: "Zerodha connected" } },
];

// Add a `darkSrc` per item whenever you have a dark-mode-specific screenshot.
// Falls back to `src` automatically if `darkSrc` is omitted.
const SCREENSHOTS = [
  { src: "assets/screenshots/Home Page New.png", darkSrc: null, title: "Homepage" },
  { src: "assets/screenshots/Home Page new 2.png", darkSrc: null, title: "Homepage" },
  { src: "assets/screenshots/Market Sentiment.png", darkSrc: null, title: "Market Sentiment" },
  { src: "assets/screenshots/Market Tools.png", darkSrc: null, title: "Trading Tools" },
];

const MAINSCREENSHOTS = [
  { src: "assets/screenshots/Home Screen.png", darkSrc: null, title: "HomeScreen" },
  { src: "assets/screenshots/AI Nifty.png", darkSrc: null, title: "HomeScreen2" },
];

// Small helper so every image call site doesn't need its own ternary
function useThemedSrc() {
  const { resolvedTheme } = useTheme();
  return (item: { src: string; darkSrc?: string | null }) =>
    resolvedTheme === "dark" && item.darkSrc ? item.darkSrc : item.src;
}


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

  const [activeFeature, setActiveFeature] = useState(0);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = featureRefs.current.map((el, i) => {
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveFeature(i); },
        { rootMargin: "-35% 0px -35% 0px", threshold: 0 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o && o.disconnect());
  }, []);

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isAnnual, setIsAnnual] = useState(false);
  const getSrc = useThemedSrc();

  useEffect(() => setMounted(true), []);

  

  // Avoid a flash of the wrong theme before next-themes has resolved on the client
  const dark = mounted && resolvedTheme === "dark";

/* Expanded feature data */
const FEATURES_DETAILED = [
  {
    icon: LineChart,
    title: "Virtual trading, real data",
    body: "Practice on NIFTY, BankNIFTY and options using live market prices — no real money on the line.",
    points: [
      "Live tick-by-tick pricing during market hours",
      "Options chain with real premiums and Greeks",
      "Unlimited paper trades, reset your portfolio anytime",
    ],
    stat: { label: "Avg. trades practiced before going live", value: "120+" },
  },
  {
    icon: BarChart3,
    title: "Stock screeners",
    body: "Filter thousands of stocks by price action, volume and technical signals in a couple of taps.",
    points: [
      "Pre-built screeners: breakouts, momentum, oversold",
      "Combine multiple technical conditions",
      "Save custom screens and re-run them daily",
    ],
    stat: { label: "Stocks screened live", value: "2,000+" },
  },
  {
    icon: Bell,
    title: "Watchlists & alerts",
    body: "Build a personal watchlist and get notified the moment a price or trend moves.",
    points: [
      "Price, volume and indicator-based triggers",
      "Push notifications, even when the app is closed",
      "Multiple watchlists for different strategies",
    ],
    stat: { label: "Alerts delivered daily", value: "10,000+" },
  },
  {
    icon: Trophy,
    title: "Leaderboards",
    body: "See how your paper trades stack up against other learners, daily and all-time.",
    points: [
      "Daily, weekly and all-time rankings",
      "Compare returns, win rate and risk discipline",
      "Follow top traders' public paper portfolios",
    ],
    stat: { label: "Active traders on the board", value: "5,000+" },
  },
  {
    icon: Shield,
    title: "Fully open source",
    body: "The entire codebase is public. Inspect it, self-host it, or help build the next feature.",
    points: [
      "MIT-licensed, auditable end to end",
      "Self-host the web terminal on your own infra",
      "Community PRs reviewed and merged regularly",
    ],
    stat: { label: "GitHub stars", value: "400+" },
  },
  {
    icon: Zap,
    title: "Connect a real broker",
    body: "When you're ready, link Zerodha, Upstox, Angel One, Fyers or Dhan and trade for real.",
    points: [
      "One-tap OAuth connection, no manual API keys",
      "Same screeners and alerts carry over to live trading",
      "Switch back to paper mode anytime",
    ],
    stat: { label: "Brokers supported", value: "5" },
  },
];

const FEATURE_SCREENSHOTS = [
  { src: "assets/screenshots/Home Page New.png", darkSrc: null, chip: { icon: LineChart, label: "Live price", value: "NIFTY 24,812 ▲" } },
  { src: "assets/screenshots/Market Tools.png", darkSrc: null, chip: { icon: BarChart3, label: "Screener match", value: "42 stocks found" } },
  { src: "assets/screenshots/Market Sentiment.png", darkSrc: null, chip: { icon: Bell, label: "Price alert", value: "RELIANCE +1.12%" } },
  { src: "assets/screenshots/Home Page new 2.png", darkSrc: null, chip: { icon: Trophy, label: "Leaderboard", value: "You're #24 today" } },
  { src: "assets/screenshots/Home Screen.png", darkSrc: null, chip: { icon: Github, label: "Open source", value: "412 stars on GitHub" } },
  { src: "assets/screenshots/AI Nifty.png", darkSrc: null, chip: { icon: Zap, label: "Broker linked", value: "Zerodha connected" } },
];



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
                
                <a  href="https://play.google.com/store/apps/details?id=com.optionxi.app"
                  target="_blank" rel="noreferrer"
                  className="transition-transform hover:scale-105"
                >
                  <img
                    src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                    alt="Get it on Google Play"
                    className="h-16 w-auto"
                  />
                </a>
                
                <a  href="https://app.optionxi.com"
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
                  src={getSrc(MAINSCREENSHOTS[1])}
                  alt="OptionXi app screenshot — AI analysis"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Front phone */}
              <div
                className={`relative w-64 rounded-[2.2rem] border-8 ${dark ? "border-slate-800" : "border-slate-900"} bg-slate-900 shadow-2xl overflow-hidden`}
                style={{ zIndex: 1 }}
              >
                <img src={getSrc(MAINSCREENSHOTS[0])} alt="OptionXi app screenshot" className="w-full h-auto object-cover" />
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
        <IndicesTicker theme={t} />
      </section>

      {/* ---------------- Features (pinned, crossfading stage) ---------------- */}
      <section id="features" className="relative">
        <style>{`
          @keyframes featureFadeIn { from { opacity: 0; } to { opacity: 1; } }
          .feature-fade { animation: featureFadeIn 0.5s ease; }
        `}</style>

        {/* Section intro — normal scroll, sits above the pinned stage */}
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-16">
          <div className="max-w-2xl">
            <span className="text-emerald-600 text-sm font-semibold uppercase tracking-wide">What you can do</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 tracking-tight">Everything a self-taught trader needs</h2>
            <p className={`${t.sub} text-lg`}>No jargon, no clutter — just the tools that help you understand the market and practice safely.</p>
          </div>
        </div>

        {/* Scroll runway: height = one screen per feature. Invisible triggers only — no visible movement. */}
        <div className="relative" style={{ height: `${FEATURES_DETAILED.length * 100}vh` }}>
          {FEATURES_DETAILED.map((_, i) => (
            <div
              key={i}
              ref={(el) => { featureRefs.current[i] = el; }}
              className="absolute w-full h-screen pointer-events-none"
              style={{ top: `${i * 100}vh` }}
            />
          ))}

          {/* The pinned stage itself — stays put, only content inside crossfades */}
          <div className={`sticky top-0 h-screen flex items-center border-y ${t.border} ${t.bgAlt} overflow-hidden`}>
            <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: text content, crossfades only, no translation */}
              <div className="relative h-[30rem]">
                {FEATURES_DETAILED.map((f, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 transition-opacity duration-500 ease-in-out"
                    style={{ opacity: activeFeature === i ? 1 : 0, pointerEvents: activeFeature === i ? "auto" : "none" }}
                  >
                    <div className={`w-14 h-14 rounded-xl bg-emerald-600/10 flex items-center justify-center mb-6`}>
                      <f.icon size={26} className="text-emerald-600" />
                    </div>

                    <h3 className="font-bold text-3xl md:text-4xl mb-4 tracking-tight">{f.title}</h3>
                    <p className={`${t.sub} text-lg leading-relaxed mb-6 max-w-lg`}>{f.body}</p>

                    <ul className="space-y-3 mb-7">
                      {f.points.map((pt, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-base">
                          <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className={t.sub}>{pt}</span>
                        </li>
                      ))}
                    </ul>

                    <div className={`inline-flex items-baseline gap-2 rounded-xl border ${t.border} ${t.card} px-5 py-3`}>
                      <span className="text-2xl font-extrabold font-mono text-emerald-600">{f.stat.value}</span>
                      <span className={`text-sm ${t.sub}`}>{f.stat.label}</span>
                    </div>
                  </div>
                ))}

                {/* Step indicator — replaces need to scroll to know progress */}
                <div className="absolute -bottom-2 left-0 flex items-center gap-2">
                  {FEATURES_DETAILED.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        activeFeature === i ? "w-10 bg-emerald-500" : `w-5 ${dark ? "bg-slate-700" : "bg-slate-300"}`
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Right: phone mockup, fixed position, only the screen content crossfades */}
              <div className="hidden lg:flex justify-center items-center relative">
                <div
                  className={`relative w-80 rounded-[2.6rem] border-[10px] ${dark ? "border-slate-800" : "border-slate-900"} bg-slate-900 shadow-2xl overflow-hidden`}
                >
                  <div className="relative">
                    {FEATURE_SCREENSHOTS.map((shot, i) => (
                      <img
                        key={i}
                        src={getSrc(shot)}
                        alt={FEATURES_DETAILED[i].title}
                        className="w-full h-auto object-cover transition-opacity duration-500 ease-in-out"
                        style={{
                          opacity: activeFeature === i ? 1 : 0,
                          position: i === 0 ? "relative" : "absolute",
                          inset: 0,
                          top: 0,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Floating chip, crossfades with the same rhythm as the screen */}
                <div className="absolute -left-10 top-12">
                  {FEATURE_SCREENSHOTS.map((shot, i) => {
                    const ChipIcon = shot.chip.icon;
                    return (
                      <div
                        key={i}
                        className={`flex items-center gap-2.5 rounded-xl border ${t.border} ${t.card} shadow-lg px-4 py-2.5 transition-opacity duration-500 ease-in-out`}
                        style={{ opacity: activeFeature === i ? 1 : 0, position: i === 0 ? "relative" : "absolute", top: 0, left: 0 }}
                      >
                        <ChipIcon size={16} className="text-emerald-500" />
                        <div className="text-sm whitespace-nowrap">
                          <div className="font-semibold">{shot.chip.label}</div>
                          <div className={t.sub}>{shot.chip.value}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
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

      {/* ---------------- Pricing ---------------- */}
      <section id="pricing" className={`${t.bgAlt} border-y ${t.border} py-24`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-4">
            <span className="text-emerald-600 text-sm font-semibold uppercase tracking-wide">Pricing</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 tracking-tight">
              Start free, upgrade only if you need more
            </h2>
          </div>
          <p className={`${t.sub} mb-8 max-w-2xl`}>
            The app and virtual trading are free to use. These optional plans unlock more screeners
            and faster alerts for traders who want an edge.
          </p>

          {/* Billing toggle */}
          <div className="flex items-center gap-3 mb-12">
            <span className={`text-sm font-medium ${!isAnnual ? "" : t.sub}`}>Monthly</span>
            <button
              role="switch"
              aria-checked={isAnnual}
              onClick={() => setIsAnnual((v) => !v)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                isAnnual ? "bg-emerald-600" : dark ? "bg-neutral-700" : "bg-neutral-300"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                  isAnnual ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${isAnnual ? "" : t.sub}`}>Annual</span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">
              Save 2 months
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            {PLANS.map((p) => {
              const displayPrice = isAnnual ? Math.round((p.price * 10) / 12) : p.price;
              return (
                <div
                  key={p.key}
                  className={`relative rounded-2xl border p-8 transition-transform ${
                    p.popular
                      ? "border-emerald-500 shadow-xl md:scale-[1.04] z-10"
                      : `${t.border} hover:-translate-y-1 transition-transform`
                  } ${t.card}`}
                >
                  {p.popular && (
                    <span className="absolute -top-3 left-8 bg-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                      Most popular
                    </span>
                  )}

                  <h3 className="text-xl font-bold">{p.name}</h3>
                  <p className={`${t.sub} text-sm mb-6`}>{p.tagline}</p>

                  <div className="mb-1 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold font-mono">₹{displayPrice}</span>
                    <span className={t.sub}>/month</span>
                  </div>
                  <div className={`text-xs ${t.sub} mb-6 h-4`}>
                    {isAnnual && p.price > 0 ? `Billed ₹${p.price * 10} yearly` : p.price > 0 ? "Billed monthly" : ""}
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
                    {p.price === 0 ? "Get started free" : `Choose ${p.name}`}
                  </button>
                </div>
              );
            })}
          </div>

          <p className={`${t.sub} text-xs mt-8 text-center`}>
            No card required for the free plan · Cancel or switch plans anytime
          </p>
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
          <img src={getSrc(APP_ICON.light === APP_ICON.dark ? { src: APP_ICON.light } : { src: APP_ICON.light, darkSrc: APP_ICON.dark })} alt="OptionXi" className="w-16 h-16 rounded-2xl mx-auto mb-6 shadow-lg" />
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Start trading smarter, <span className="text-emerald-600">today</span>
          </h2>
          <p className={`${t.sub} text-lg max-w-xl mx-auto mb-10`}>
            Free to download. No real money at risk until you're ready. Open source, always.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            
            <a href="https://play.google.com/store/apps/details?id=com.optionxi.app"
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
                className={`inline-flex items-center gap-2 border ${t.border} ${t.text} px-6 py-4 rounded-xl font-semibold hover:bg-emerald-500/5 transition-colors`}
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