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
  light: "/assets/images/logo_xi.png",
  dark: "/assets/images/logo_xi.png", // swap when you have a dark-mode icon
};

/* Expanded feature data */
const FEATURES_DETAILED = [
  {
    icon: LineChart,
    title: "Practice trading, risk-free, No real money",
    body: "Trade Nifty 50, Bank Nifty and more using live market prices—without risking a single rupee.",
    points: [
      "Trade NSE stocks with live market data",
      "Practice with virtual funds and zero risk",
      "Track your orders, portfolio and P&L",
    ],
    stat: { label: "Paper traders active", value: "9,000+" },
  },
  {
    icon: BarChart3,
    title: "Find winning stocks, fast and easy",
    body: "Scan thousands of stocks using custom filters or proven technical patterns in seconds.",
    points: [
      "Filter using RSI, EMA, highs, lows",
      "Ready-made breakout scanners",
      "Save and rerun your favorite screens",
    ],
    stat: { label: "Stocks screened live", value: "2,000+" },
  },
  {
    icon: BrainCircuit,
    title: "See where the market's betting",
    body: "Analyze live option chains, open interest and market sentiment before every trade.",
    points: [
      "Live option chain with PCR and Greeks",
      "Track OI changes to spot market direction",
      "Analyze Nifty, Bank Nifty and stock options",
    ],
    stat: { label: "Sentiment tracked", value: "Live" },
  },
  {
    icon: Bell,
    title: "Never miss a market move, Get real-time alerts",
    body: "Receive instant breakout alerts, AI-powered stock picks and live market opportunities.",
    points: [
      "Day-high and day-low breakouts alerts",
      "Daily AI-picked stocks with strong setups",
      "Live scanners updated throughout the day",
    ],
    stat: { label: "Alerts delivered daily", value: "10,000+" },
  },
  {
    icon: Trophy,
    title: "Journal every trade, Improve every day",
    body: "Record your trades, review your decisions and build better trading discipline over time.",
    points: [
      "Log entries, exits, setups and notes",
      "Track win rate, P&L and performance",
      "Review past trades and learn from mistakes",
    ],
    stat: { label: "Trades journaled", value: "50,000+" },
  },
];

const FEATURE_SCREENSHOTS = [
  { src: "assets/screenshots/Practice_Trading.png", darkSrc: null, chip: { icon: LineChart, label: "Live price", value: "NIFTY 50 tracked" } },
  { src: "assets/screenshots/Screener_Pro.png", darkSrc: null, chip: { icon: BarChart3, label: "Screener match", value: "61 stocks found" } },
  { src: "assets/screenshots/Option_Chain.png", darkSrc: null, chip: { icon: BrainCircuit, label: "Market sentiment", value: "PCR 1.57 · Bullish" } },
  { src: "assets/screenshots/Stock_Alert.png", darkSrc: null, chip: { icon: Bell, label: "Breakout alert", value: "WELCORP +2.36%" } },
  { src: "assets/screenshots/Journals.png", darkSrc: null, chip: { icon: Trophy, label: "Leaderboard", value: "You're #1 today" } },
];
const MAINSCREENSHOTS = [
  { src: "assets/screenshots/Home_Screen.png", darkSrc: null, title: "HomeScreen" },
  { src: "assets/screenshots/AI_Nifty.png", darkSrc: null, title: "HomeScreen2" },
];

// Small helper so every image call site doesn't need its own ternary
function useThemedSrc() {
  const { resolvedTheme } = useTheme();
  return (item: { src: string; darkSrc?: string | null }) =>
    resolvedTheme === "dark" && item.darkSrc ? item.darkSrc : item.src;
}

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
  { name: "Geetasri A.", tag: "Beginner trader", text: "One of the best apps for beginners — genuinely helpful for learning the ropes.", rating: 5 },
  { name: "Sajith Antony", tag: "Swing trader", text: "My go-to for real-time updates. Smooth interface, timely notifications, great for staying ahead.", rating: 5 },
  { name: "Satish Reddy", tag: "Options trader", text: "Best app so far for virtual trading in stocks — simple, clean UI.", rating: 5 },
  { name: "Meera Krishnan", tag: "Paper trader", text: "The screener alone is worth it — found three breakout setups in my first week.", rating: 5 },
  { name: "Arjun Nair", tag: "Intraday trader", text: "Option chain view is clean and fast, no lag during market hours.", rating: 4 },
  { name: "Priya Suresh", tag: "New investor", text: "Journaling my trades finally made me see my own bad habits. Overdue feature.", rating: 5 },
   {
    name: "Geetasri Anjaneyulu Gundapu",
    date: "April 21, 2026",
    text: "A genuine review — it's one of the best apps for beginners, I loved a lot from it, but be careful, there are some price variations in reality. So good luck.",
    rating: 5,
  },
];

function avatarColor(name: string) {
  const palette = ["bg-emerald-500", "bg-teal-500", "bg-amber-500", "bg-violet-500", "bg-sky-500", "bg-rose-500"];
  const idx = name.charCodeAt(0) % palette.length;
  return palette[idx];
}

function ReviewCard({ r, t }: { r: (typeof REVIEWS)[number]; t: any }) {
  return (
    <div
      className={`group relative w-[320px] shrink-0 rounded-2xl border ${t.border} ${t.card} p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1`}
    >
      {/* glow border on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          padding: 1,
          background: "linear-gradient(135deg, rgba(16,185,129,0.6), rgba(16,185,129,0) 60%)",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-full ${avatarColor(r.name)} flex items-center justify-center text-white font-semibold text-sm shrink-0`}>
          {r.name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-sm leading-tight">{r.name}</p>
          <p className={`text-xs ${t.sub}`}>{r.tag}</p>
        </div>
        <div className="ml-auto flex text-amber-400">
          {[...Array(r.rating)].map((_, j) => (
            <Star key={j} size={12} fill="currentColor" strokeWidth={0} />
          ))}
        </div>
      </div>
      <p className={`text-sm leading-relaxed ${t.sub}`}>"{r.text}"</p>
    </div>
  );
}


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
                <div className="flex items-center gap-2"><Users size={15} /> 9,000+ downloads</div>
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
              <div className="relative h-[30rem] sm:h-[28rem] lg:h-[24rem] xl:h-[26rem] pt-16 pb-16">
                {FEATURES_DETAILED.map((f, i) => (
                  <div
                      key={i}
                      className="absolute inset-0 pt-3 sm:pt-4 transition-opacity duration-500 ease-in-out"
                      style={{ opacity: activeFeature === i ? 1 : 0, pointerEvents: activeFeature === i ? "auto" : "none" }}
                    >
                    <div className={`w-11 h-11 sm:w-14 sm:h-14 rounded-xl bg-emerald-600/10 flex items-center justify-center mb-4 sm:mb-6`}>
                      <f.icon size={22} className="text-emerald-600 sm:hidden" />
                      <f.icon size={26} className="text-emerald-600 hidden sm:block" />
                    </div>
                    

                    <h3 className="font-bold text-2xl sm:text-3xl md:text-4xl mb-2.5 sm:mb-4 tracking-tight leading-tight">
                      {f.title}
                    </h3>
                    <p className={`${t.sub} text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6 max-w-lg`}>
                      {f.body}
                    </p>
                    <br/>

                    <ul className="space-y-2 sm:space-y-3 mb-5 sm:mb-7">
                      {f.points.map((pt, j) => (
                        <li key={j} className="flex items-start gap-2 sm:gap-2.5 text-sm sm:text-base">
                          <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-0.5 sm:hidden" />
                          <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0 mt-0.5 hidden sm:block" />
                          <span className={t.sub}>{pt}</span>
                        </li>
                      ))}
                    </ul>
                    <br/>
                    <br/>

                    <div className={`inline-flex items-baseline gap-2 rounded-xl border ${t.border} ${t.card} px-4 sm:px-5 py-2.5 sm:py-3`}>
                      <span className="text-xl sm:text-2xl font-extrabold font-mono text-emerald-600">{f.stat.value}</span>
                      <span className={`text-xs sm:text-sm ${t.sub}`}>{f.stat.label}</span>
                    </div>
                  </div>
                ))}

                

                {/* Step indicator — now pinned to the reserved pb-16 zone, never overlaps text */}
                <div className="absolute bottom-0 left-0 flex items-center gap-2 pb-1">
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
          <div className="max-w-2xl mb-16">
            <span className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold uppercase tracking-wide">
              The process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 tracking-tight">
              Three steps from curious to confident
            </h2>
          </div>

          <div className="relative grid md:grid-cols-3 gap-8 md:gap-6">
            {/* connecting line across the row, desktop only */}
            <div
              className="hidden md:block absolute top-6 left-0 right-0 h-px bg-gradient-to-r from-emerald-500/0 via-emerald-500/30 to-emerald-500/0"
              aria-hidden="true"
            />

            {STEPS.map((s, i) => (
              <div
                key={i}
                className={`group relative rounded-2xl border ${t.border} ${t.bg ?? "bg-white dark:bg-neutral-900"} p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/10 hover:border-emerald-500/40`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-600 text-white font-mono font-bold text-sm shrink-0 shadow-sm shadow-emerald-600/30">
                    {s.n}
                  </div>
                  {i < STEPS.length - 1 && (
                    <ArrowRight
                      size={16}
                      className="hidden md:block text-emerald-600/40 dark:text-emerald-400/40 ml-auto group-hover:translate-x-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-all duration-300"
                    />
                  )}
                </div>

                <h3 className="text-xl font-bold mb-2 tracking-tight">{s.title}</h3>
                <p className={`${t.sub} leading-relaxed text-sm`}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Pricing ---------------- */}
      <section id="pricing" className={`relative ${t.bgAlt} border-y ${t.border} py-24 overflow-hidden`}>
        {/* faint grid texture backdrop */}
        <div
          className="absolute inset-0 opacity-[0.4] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(${dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"} 1px, transparent 1px), linear-gradient(90deg, ${dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"} 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black, transparent)",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 relative">
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
              className={`relative w-11 h-6 rounded-full transition-colors ${isAnnual ? "bg-emerald-600" : dark ? "bg-neutral-700" : "bg-neutral-300"}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${isAnnual ? "translate-x-5" : "translate-x-0"}`} />
            </button>
            <span className={`text-sm font-medium ${isAnnual ? "" : t.sub}`}>Annual</span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">Save 2 months</span>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            {PLANS.map((p) => {
              const displayPrice = isAnnual ? Math.round((p.price * 10) / 12) : p.price;
              return (
                <div key={p.key} className={`relative rounded-2xl p-[1px] ${p.popular ? "md:scale-[1.04] z-10" : ""}`}
                  style={{
                    background: p.popular
                      ? "linear-gradient(160deg, rgba(16,185,129,0.9), rgba(16,185,129,0.05) 55%, rgba(16,185,129,0.4))"
                      : dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
                  }}
                >
                  <div className={`relative h-full rounded-2xl p-8 ${t.card} ${p.popular ? "shadow-xl shadow-emerald-500/10" : ""} transition-transform hover:-translate-y-1`}>
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
                        p.popular ? "bg-emerald-600 hover:bg-emerald-700 text-white" : `border ${t.border} ${t.navHover}`
                      }`}
                    >
                      {p.price === 0 ? "Get started free" : `Choose ${p.name}`}
                    </button>
                  </div>
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
      <section id="reviews" className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex items-end justify-between mb-14 flex-wrap gap-4">
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

        {/* Row 1 — scrolls left */}
        <div className="marquee-wrap relative mb-6" style={{ maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)" }}>
          <div className="marquee-track flex gap-6 w-max">
            {[...REVIEWS, ...REVIEWS].map((r, i) => <ReviewCard key={`row1-${i}`} r={r} t={t} />)}
          </div>
        </div>

        {/* Row 2 — scrolls right (reverse direction) */}
        <div className="marquee-wrap relative" style={{ maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)" }}>
          <div className="marquee-track flex gap-6 w-max" style={{ animationDirection: "reverse", animationDuration: "34s" }}>
            {[...REVIEWS.slice().reverse(), ...REVIEWS.slice().reverse()].map((r, i) => (
              <ReviewCard key={`row2-${i}`} r={r} t={t} />
            ))}
          </div>
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