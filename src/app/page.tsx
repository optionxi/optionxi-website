'use client'

import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import {
  ArrowRight, Shield, BarChart3, Bell, Trophy, LineChart,
  Star, CheckCircle2, Github, ChevronRight, Users,
  GraduationCap, Lock, Sparkles,
  BrainCircuit
} from "lucide-react";
import IndicesTicker from "@/components/tickers/indices-ticker";
import StockPicksSection from "@/components/web_portfolio/web_portfolio_optionxi";
import FeatureSection from "@/components/feature-section/feature_section";
import HeroFeature from "@/components/hero-section/hero_section";
import OptionChainFeature from "@/components/feature-list/ft-optionchain";
import BreakoutAlerts from "@/components/feature-list/ft-berakout-alert";
import AlgoBuilder from "@/components/feature-list/ft-algo-builder";
import StrategyBuilder from "@/components/feature-list/ft-statergy-builder";
import HowItWorksSection from "@/components/how-it-works/how-it-works-section";
import PricingSection from "@/components/pricing/pricing-section";

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
    stat: { label: "Paper traders active", value: "10,000+" },
  },
  {
    icon: BarChart3,
    title: "Find winning stocks, fast and easy screeners",
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
    title: "Realtime Option chains and OI Analysis Page",
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
    key: "free",
    name: "Free",
    tagline: "For new traders",
    price: 0,
    popular: false,
    features: ["Virtual Trading","Basic stock screening", "Limited alerts"],
  },
  {
    key: "pro",
    name: "Pro",
    tagline: "For active, hands-on traders",
    price: 800,
    popular: true,
    features: ["Everything in Basic", "Stock pick alerts", "Up to 50 stock screeners"],
  },
  {
    key: "max",
    name: "Max",
    tagline: "The full research & automation suite",
    price: 1500,
    popular: false,
    features: ["Everything in Pro", "3 custom algo deployments", "Alerts on WhatsApp"],
  },
];

const REVIEWS = 
[
  {
    "name": "Sethupathi",
    "avatar": "https://play-lh.googleusercontent.com/a/ACg8ocJsNFgza0Kk0j5touYiUrmaxvb9bBS2v7rm0A0fLDtbmslWRA=mo",
    "text": "excellent app for traders",
    "rating": 5,
    "date": "July 16, 2026",
    "reviewId": "aa194927-bd76-47e7-b736-09f3b022c6d3",
    "link": "https://play.google.com/store/apps/details?id=com.optionxi.app&reviewId=aa194927-bd76-47e7-b736-09f3b022c6d3&showAllReviews=true"
  },
  {
    "name": "Ansh Kumar",
    "avatar": "https://play-lh.googleusercontent.com/a/ACg8ocKlgQ6G9gVe7V1bYeJRdh9lCgHEE6Tq1tI6yd0BzY_-pZEMhw=mo",
    "text": "this is the best app I have seen in my life",
    "rating": 5,
    "date": "June 08, 2026",
    "reviewId": "d9a0facc-87a6-4823-a074-74aee19f95c0",
    "link": "https://play.google.com/store/apps/details?id=com.optionxi.app&reviewId=d9a0facc-87a6-4823-a074-74aee19f95c0&showAllReviews=true"
  },
  {
    "name": "satyanarayana satyanarayana",
    "avatar": "https://play-lh.googleusercontent.com/a-/ALV-UjXLQKRuQBQf8OtXdOOiAVVM1OuAUJP6o02vHHUfNpQJWg8ZW7Ip",
    "text": "Thank you for your support! 😊 If you are satisfied with our service, please give us a 5-star rating and share your valuable feedback. Your encouragement helps us improve and serve you better.",
    "rating": 5,
    "date": "May 19, 2026",
    "reviewId": "d49e356e-24b5-4f57-9f3c-268baa6b7f33",
    "link": "https://play.google.com/store/apps/details?id=com.optionxi.app&reviewId=d49e356e-24b5-4f57-9f3c-268baa6b7f33&showAllReviews=true"
  },
  {
    "name": "Suvajit Mondal",
    "avatar": "https://play-lh.googleusercontent.com/a-/ALV-UjVaIAXis2cnpWL0IhaQ9SWPn2vA6eFjk_NTp6U6GwLXOVAZq3-X",
    "text": "Can we do stocks option trade in this application?",
    "rating": 5,
    "date": "April 24, 2026",
    "reviewId": "c9c50fe0-980b-4876-91d2-708186febda6",
    "link": "https://play.google.com/store/apps/details?id=com.optionxi.app&reviewId=c9c50fe0-980b-4876-91d2-708186febda6&showAllReviews=true"
  },
  {
    "name": "Geetasri Anjaneyulu Gundapu",
    "avatar": "https://play-lh.googleusercontent.com/a/ACg8ocKu67YsPy_NRDSSEbph_bKh4WV2FJvmD8Qid9Qi_qSiJd_u29k=mo",
    "text": "a genuine review , it the one of the best app for beginners I loved a lot from it but becarefull there are some price variations in reality,so good luck.",
    "rating": 5,
    "date": "April 21, 2026",
    "reviewId": "c4166dbd-66ce-4ec7-87d5-0c0243692c08",
    "link": "https://play.google.com/store/apps/details?id=com.optionxi.app&reviewId=c4166dbd-66ce-4ec7-87d5-0c0243692c08&showAllReviews=true"
  },
  {
    "name": "Ravindra Golhar",
    "avatar": "https://play-lh.googleusercontent.com/a/ACg8ocJvcztT-vi9K4jFu4OB52AdaMkITyQ2FSU9zH3gEOU6Pns_vA=mo",
    "text": "very good app...live market data provided by app very helpfull for option trader",
    "rating": 5,
    "date": "March 21, 2026",
    "reviewId": "e68f0e4a-2a91-4727-b367-fa74d7952249",
    "link": "https://play.google.com/store/apps/details?id=com.optionxi.app&reviewId=e68f0e4a-2a91-4727-b367-fa74d7952249&showAllReviews=true"
  },
  {
    "name": "Soni Ashish",
    "avatar": "https://play-lh.googleusercontent.com/a-/ALV-UjVPPAz51owQnk6txzuWHK-LPF6jyGSHEb3IoBCGyMMjd26QuaEf",
    "text": "yah application bahut acchi hai ismein Data dekhne mein bahut help milati hai",
    "rating": 5,
    "date": "March 13, 2026",
    "reviewId": "70fc8bf4-0f0d-4f52-8099-541392736eec",
    "link": "https://play.google.com/store/apps/details?id=com.optionxi.app&reviewId=70fc8bf4-0f0d-4f52-8099-541392736eec&showAllReviews=true"
  },
  {
    "name": "Rahul Sivaraman",
    "avatar": "https://play-lh.googleusercontent.com/a/ACg8ocK6LLAg8EJsylhC_8F3DBLcgQuc1n0CNVLgPSUxvrHWgV9-2w=mo",
    "text": "this is a great app with loaded with most required features . Thanks for developers",
    "rating": 5,
    "date": "March 11, 2026",
    "reviewId": "20984376-a9c8-460e-aaed-eb3d2965ed89",
    "link": "https://play.google.com/store/apps/details?id=com.optionxi.app&reviewId=20984376-a9c8-460e-aaed-eb3d2965ed89&showAllReviews=true"
  },
  {
    "name": "Ramesh Mistry lugel Crcc klm",
    "avatar": "https://play-lh.googleusercontent.com/a-/ALV-UjXEFEZ2by13ES8AquHo4Hudd7xAJJZtREoPRN3W_bQm_dO-tHXq",
    "text": "It is good and accurate signal provide👍",
    "rating": 5,
    "date": "January 21, 2026",
    "reviewId": "8de20ed9-6b43-4756-958a-aef875d8b811",
    "link": "https://play.google.com/store/apps/details?id=com.optionxi.app&reviewId=8de20ed9-6b43-4756-958a-aef875d8b811&showAllReviews=true"
  },
  {
    "name": "Christhejus : Business Account",
    "avatar": "https://play-lh.googleusercontent.com/a-/ALV-UjVJ2iYDVUHU8mVd-wKEhs7w2_aGj0j_JwVHd30LP2lLy_LeilaJ",
    "text": "Its pretty good for beginners who are looking for market sentiment analysis, great customer support",
    "rating": 5,
    "date": "January 19, 2026",
    "reviewId": "25cc9f54-358f-4749-b0fb-1252cbce090f",
    "link": "https://play.google.com/store/apps/details?id=com.optionxi.app&reviewId=25cc9f54-358f-4749-b0fb-1252cbce090f&showAllReviews=true"
  }
];

function avatarColor(name: string) {
  const palette = ["bg-emerald-500", "bg-teal-500", "bg-amber-500", "bg-violet-500", "bg-sky-500", "bg-rose-500"];
  const idx = name.charCodeAt(0) % palette.length;
  return palette[idx];
}
function ReviewCard({ r, t }: { r: (typeof REVIEWS)[number]; t: any }) {
  const CardWrapper = r.link ? "a" : "div";
  const wrapperProps = r.link
    ? { href: r.link, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <CardWrapper
      {...wrapperProps}
      className={`group relative w-[320px] shrink-0 rounded-2xl border ${t.border} ${t.card} p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1 block`}
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
        {r.avatar ? (
         <img
            src={r.avatar}
            alt={r.name}
            referrerPolicy="no-referrer"
            className="w-10 h-10 rounded-full shrink-0 object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.nextElementSibling?.classList.remove("hidden");
            }}
          />
        ) : null}
        <div
          className={`w-10 h-10 rounded-full ${avatarColor(r.name)} flex items-center justify-center text-white font-semibold text-sm shrink-0 ${r.avatar ? "hidden" : ""}`}
        >
          {r.name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-sm leading-tight">{r.name}</p>
          <p className={`text-xs ${t.sub}`}>{r.date}</p>
        </div>
        <div className="ml-auto flex text-amber-400">
          {[...Array(r.rating)].map((_, j) => (
            <Star key={j} size={12} fill="currentColor" strokeWidth={0} />
          ))}
        </div>
      </div>
      <p className={`text-sm leading-relaxed ${t.sub}`}>"{r.text}"</p>
    </CardWrapper>
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
  const [launchingPlanKey, setLaunchingPlanKey] = useState<string | null>(null);

  async function handleChoosePlan(plan: (typeof PLANS)[number]) {
    setLaunchingPlanKey(plan.key);
    try {
      // 1) Open a prefilled support email
      const subject = `Subscribe to ${plan.name} plan`;
      const body = `Hi OptionXi, I'd like to subscribe to the ${plan.name} plan (₹${plan.price}/month).`;
      window.open(
        `mailto:support@optionxi.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
        "_blank",
        "noopener,noreferrer"
      );
    } catch (err) {
      console.error("Could not start checkout:", err);
    } finally {
      setLaunchingPlanKey(null);
    }
  }
    

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
      <HeroFeature/>
      
       {/* ---------------- Features (pinned, crossfading stage) ---------------- */}
      <FeatureSection/>

      {/* ---------------- Stock Picks Portfolio ---------------- */}
      <StockPicksSection/>

      {/* ---------------- Feature List ---------------- */}
      <OptionChainFeature/>
      <BreakoutAlerts/>
      <AlgoBuilder/>
      <StrategyBuilder/>

      {/* ---------------- How it works ---------------- */}
      <HowItWorksSection/>

      {/* ---------------- Pricing ---------------- */}
      <PricingSection/>

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
            <span className={t.sub}>· 56 reviews</span>
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
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        <div
          className="rounded-2xl sm:rounded-3xl border border-emerald-500/20 p-8 sm:p-12 md:p-16 text-center relative overflow-hidden"
          style={{
            background: dark
              ? "linear-gradient(135deg, rgba(16,185,129,0.12), rgba(15,23,42,0))"
              : "linear-gradient(135deg, rgba(16,185,129,0.08), rgba(255,255,255,0))",
          }}
        >
          <img
            src={getSrc(APP_ICON.light === APP_ICON.dark ? { src: APP_ICON.light } : { src: APP_ICON.light, darkSrc: APP_ICON.dark })}
            alt="OptionXi"
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl mx-auto mb-4 sm:mb-6 shadow-lg"
          />
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight mb-3 sm:mb-4">
            Start trading smarter, <span className="text-emerald-600">today</span>
          </h2>
          <p className={`${t.sub} text-base sm:text-lg max-w-xl mx-auto mb-8 sm:mb-10 px-2`}>
            Free to download. No real money at risk until you're ready. Open source, always.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            
              <a href="https://play.google.com/store/apps/details?id=com.optionxi.app"
              target="_blank"
              rel="noreferrer"
              className="transition-transform hover:scale-105"
            >
              <img
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                alt="Get it on Google Play"
                className="h-14 sm:h-16 w-auto"
              />
            </a>

            
              <a href="https://app.optionxi.com"
              target="_blank"
              rel="noreferrer"
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 border ${t.border} ${t.text} px-5 py-3.5 sm:px-6 sm:py-4 rounded-xl font-semibold hover:bg-emerald-500/5 transition-colors whitespace-nowrap`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="text-sm sm:text-base">
                <span className="sm:hidden">Web Terminal</span>
                <span className="hidden sm:inline">Open Web Terminal</span>
              </span>
              <ChevronRight size={16} className="shrink-0" />
            </a>
          </div>

          <div className={`hidden sm:flex flex-wrap items-center justify-center gap-8 mt-10 text-sm ${t.sub}`}>
            <div className="flex items-center gap-2">
              <Shield size={15} className="text-emerald-500 shrink-0" /> Open source & auditable
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap size={15} className="text-emerald-500 shrink-0" /> Built for learning
            </div>
            <div className="flex items-center gap-2">
              <Lock size={15} className="text-emerald-500 shrink-0" /> No card needed to start
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}