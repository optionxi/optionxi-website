'use client'

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useTheme } from "next-themes";
import type { LucideIcon } from "lucide-react";
import {
  Github, ChevronRight, Star, Users, Lock,
  TrendingUp, BrainCircuit, Newspaper, Check, Eye, GraduationCap, Trophy,
  ChevronLeft, Minus, Plus,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Usage: <HeroFeature />  — no props. Theme comes from next-themes.  */
/*  Layout: FRONT phone = virtual trading (straight).                  */
/*          BACK phone  = notifications (angled, behind).              */
/*  Both phones share the same bottom edge.                            */
/* ------------------------------------------------------------------ */

type Notif = { kind: string; head: string; body: string; icon: LucideIcon; tint: string };
type Side = "buy" | "sell";
type Screen = "list" | "detail" | "order" | "done";

const NOTIFS: Record<string, Notif> = {
  sentiment: {
    kind: "Market sentiment", head: "NIFTY 50 · Bullish breakout",
    body: "80% probability of an upside move today.",
    icon: BrainCircuit, tint: "text-violet-500 bg-violet-500/15",
  },
  breakout: {
    kind: "Breakout alert", head: "WELCORP · Bullish breakout",
    body: "80% probability. Crossed today's high on 2.4× volume.",
    icon: TrendingUp, tint: "text-emerald-500 bg-emerald-500/15",
  },
  news: {
    kind: "News alert", head: "RELIANCE +1.4%",
    body: "New headline is out. Price and volume are reacting.",
    icon: Newspaper, tint: "text-amber-500 bg-amber-500/15",
  },
  filledBuy: {
    kind: "Virtual trade", head: "Bought 10 WELCORP",
    body: "Filled at ₹812.40. Practice money, no real risk.",
    icon: Check, tint: "text-emerald-500 bg-emerald-500/15",
  },
  filledSell: {
    kind: "Virtual trade", head: "Sold 5 RELIANCE",
    body: "Filled at ₹2,948. Realised +₹1,240 (virtual).",
    icon: Check, tint: "text-rose-500 bg-rose-500/15",
  },
};

const WATCH = [
  { sym: "HDFCBANK", name: "HDFC Bank", price: "1,742.10", chg: "+0.2%", up: true },
  { sym: "WELCORP", name: "Welspun Corp", price: "812.40", chg: "+2.36%", up: true },
  { sym: "INFY", name: "Infosys", price: "1,890.55", chg: "-0.6%", up: false },
  { sym: "RELIANCE", name: "Reliance Ind.", price: "2,948.00", chg: "+1.4%", up: true },
  { sym: "ITC", name: "ITC Ltd", price: "468.25", chg: "+0.1%", up: true },
];

type Trade = {
  sym: string; priceNum: number; price: string; chg: string; side: Side; qty: number;
  spark: string; stats: [string, string][]; pnl?: string; lesson: string;
  alert: Notif; filled: Notif;
};

const TRADES: Trade[] = [
  {
    sym: "WELCORP", priceNum: 812.4, price: "812.40", chg: "+2.36%", side: "buy", qty: 10,
    spark: "0,50 20,46 40,49 60,40 80,42 100,32 120,35 140,24 160,26 180,14 200,8",
    stats: [["Open", "793.0"], ["High", "815.2"], ["Volume", "2.4×"]],
    lesson: "Lesson unlocked: why volume confirms a breakout",
    alert: NOTIFS.breakout, filled: NOTIFS.filledBuy,
  },
  {
    sym: "RELIANCE", priceNum: 2948, price: "2,948.00", chg: "+1.4%", side: "sell", qty: 5,
    spark: "0,52 25,44 50,46 75,32 100,26 125,20 150,22 175,14 200,12",
    stats: [["Open", "2,907"], ["High", "2,955"], ["Volume", "1.8×"]],
    pnl: "+₹1,240",
    lesson: "Lesson unlocked: plan your exit before your entry",
    alert: NOTIFS.news, filled: NOTIFS.filledSell,
  },
];

const TILT = -10;       // deg — back (notification) phone, pivots on its bottom-center
const NOTIF_H = 116;    // notification card height (px) — was 92
const NOTIF_GAP = 8;

/* Indian digit grouping, SSR-safe (no Intl dependency) */
function inr(n: number) {
  const s = Math.round(n).toString();
  const last3 = s.slice(-3);
  const rest = s.slice(0, -3);
  return rest ? rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + last3 : last3;
}

/* Page-level tokens (light + dark) */
function pageTokens(dark: boolean) {
  return dark
    ? {
        section: "bg-[#070708] text-neutral-50",
        border: "border-white/10",
        bgAlt: "bg-white/5",
        sub: "text-neutral-400",
        text: "text-white",
        navHover: "hover:bg-white/5",
      }
    : {
        section: "bg-slate-50 text-slate-900",
        border: "border-slate-200",
        bgAlt: "bg-slate-100",
        sub: "text-slate-500",
        text: "text-slate-900",
        navHover: "hover:bg-slate-100",
      };
}

/* ------------------------------------------------------------------ */
/*  Phone frame                                                        */
/* ------------------------------------------------------------------ */

function PhoneFrame({
  dark, className = "", style, label, children,
}: { dark: boolean; className?: string; style?: CSSProperties; label: string; children: ReactNode }) {
  return (
    <div
      aria-label={label}
      className={`${className} aspect-[9/19.5] rounded-[2.2rem] border-8 ${dark ? "border-slate-800" : "border-slate-900"} bg-slate-900 shadow-2xl ${dark ? "shadow-black/60" : "shadow-slate-900/25"} overflow-hidden transition-colors duration-300`}
      style={style}
    >
      <div className="relative w-full h-full overflow-hidden">
        {children}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 rounded-full bg-black z-30" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export default function HeroFeature() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = mounted && resolvedTheme === "dark";
  const t = pageTokens(dark);

  const rootRef = useRef<HTMLElement | null>(null);
  const idRef = useRef(0);
  const sRef = useRef(0);
  const startedRef = useRef(false);

  const [active, setActive] = useState(false);
  const [sIdx, setSIdx] = useState(0);
  const [screen, setScreen] = useState<Screen>("list");
  const [sheetMode, setSheetMode] = useState<"form" | "done">("form");
  const [hl, setHl] = useState(-1);
  const [qty, setQty] = useState(1);
  const [press, setPress] = useState<"side" | "confirm" | null>(null);
  const [notifs, setNotifs] = useState<{ id: number; n: Notif }[]>([]);

  /* ---- animation runs only while on screen ---- */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // First time in view: one notification lands immediately
    if (!startedRef.current) {
      startedRef.current = true;
      setNotifs(
        reduce
          ? [
              { id: 2, n: NOTIFS.filledBuy },
              { id: 1, n: NOTIFS.breakout },
              { id: 0, n: NOTIFS.sentiment },
            ]
          : [{ id: 0, n: NOTIFS.sentiment }]
      );
      idRef.current = reduce ? 2 : 0;
    }

    // Reduced motion: one finished frame, no loop
    if (reduce) {
      setSIdx(0); setScreen("done"); setSheetMode("done"); setQty(TRADES[0].qty);
      return;
    }

    let cancelled = false;
    const step = async (ms: number) => {
      await new Promise<void>((r) => setTimeout(r, ms));
      return cancelled;
    };
    const push = (n: Notif) =>
      setNotifs((p) => [{ id: ++idRef.current, n }, ...p].slice(0, 4));

    (async () => {
      if (await step(1400)) return; // let the first notification breathe

      while (!cancelled) {
        const s = sRef.current;
        const tr = TRADES[s];
        const target = WATCH.findIndex((w) => w.sym === tr.sym);

        setSIdx(s); setScreen("list"); setSheetMode("form"); setHl(-1); setPress(null); setQty(1);

        // 1) alert lands on the back phone
        push(tr.alert);
        if (await step(1300)) return;

        // 2) cursor walks the watchlist to the alerted stock
        for (let i = 0; i <= target; i++) {
          setHl(i);
          if (await step(340)) return;
        }
        if (await step(350)) return;

        // 3) stock detail + chart draws
        setScreen("detail");
        if (await step(1700)) return;

        // 4) tap Buy / Sell
        setPress("side");
        if (await step(500)) return;

        // 5) order sheet, quantity ramps up
        setScreen("order"); setPress(null);
        if (await step(700)) return;
        for (const f of [0.1, 0.3, 0.6, 1]) {
          setQty(Math.max(1, Math.round(tr.qty * f)));
          if (await step(260)) return;
        }
        if (await step(300)) return;

        // 6) confirm → filled → notification
        setPress("confirm");
        if (await step(450)) return;
        setScreen("done"); setSheetMode("done"); setPress(null);
        push(tr.filled);
        if (await step(3200)) return;

        // 7) reset, next stock
        setScreen("list"); setHl(-1);
        if (await step(600)) return;
        sRef.current = (s + 1) % TRADES.length;
      }
    })();

    return () => { cancelled = true; };
  }, [active]);

  /* ---- tokens for trading-phone internals ---- */
  const P = dark
    ? {
        bg: "bg-[#0a0a0b]", text: "text-white", sub: "text-neutral-400",
        row: "border-white/10", rowActive: "bg-white/10 border-white/25",
        card: "bg-white/[0.06]", sheet: "bg-neutral-900", nav: "border-white/10 bg-[#0a0a0b]",
        chip: "bg-white/10 text-neutral-300",
      }
    : {
        bg: "bg-slate-50", text: "text-slate-900", sub: "text-slate-500",
        row: "border-slate-200", rowActive: "bg-slate-100 border-slate-400",
        card: "bg-white", sheet: "bg-white", nav: "border-slate-200 bg-white",
        chip: "bg-slate-100 text-slate-600",
      };

  /* ---- tokens for notification-phone internals ---- */
  const L = dark
    ? {
        wallpaper: "radial-gradient(120% 60% at 50% 0%, rgba(16,185,129,0.18), transparent 60%), #0a0a0b",
        screen: "text-white", status: "text-neutral-300", time: "text-white", timeSub: "text-neutral-400",
        card: "border-white/10 bg-white/[0.08]", kind: "text-neutral-300", ago: "text-neutral-500",
        head: "text-white", body: "text-neutral-400", homeBar: "bg-white/30",
      }
    : {
        wallpaper: "radial-gradient(120% 60% at 50% 0%, rgba(16,185,129,0.16), transparent 60%), #f1f5f9",
        screen: "text-slate-900", status: "text-slate-600", time: "text-slate-900", timeSub: "text-slate-500",
        card: "border-slate-200 bg-white/90", kind: "text-slate-600", ago: "text-slate-400",
        head: "text-slate-900", body: "text-slate-500", homeBar: "bg-slate-900/25",
      };

  const tr = TRADES[sIdx];
  const sheetOpen = screen === "order" || screen === "done";
  const onDetail = screen !== "list";

  const sideBtn = (side: Side) => {
    const chosen = tr.side === side;
    const pressed = press === "side" && chosen;
    return `flex-1 rounded-xl py-2.5 text-[12px] font-semibold text-white text-center transition-all duration-150 ${
      side === "buy" ? "bg-emerald-500" : "bg-rose-500"
    } ${pressed ? "scale-95 ring-2 ring-white/70" : ""} ${press === "side" && !chosen ? "opacity-40" : ""}`;
  };

  return (
    <section ref={rootRef} className={`relative overflow-hidden transition-colors duration-300 ${t.section}`}>
      <style>{`
        @keyframes hfNotifIn { from { opacity: 0; transform: translateY(-28px) scale(.94); } }
        @keyframes hfSlotIn  { from { opacity: 0; transform: translateY(8px); } }
        @keyframes hfDraw    { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
        @keyframes hfFade    { from { opacity: 0; } }
        @keyframes hfPop     { 0% { transform: scale(.4); opacity: 0; } 70% { transform: scale(1.12); } 100% { transform: scale(1); opacity: 1; } }
        .hf-notif-in { animation: hfNotifIn .55s cubic-bezier(.2,.8,.2,1) both; }
        .hf-slot-in  { animation: hfSlotIn .4s ease-out both; }
        .hf-pop      { animation: hfPop .45s ease-out both; }
        .hf-draw     { stroke-dasharray: 1; animation: hfDraw 1.1s ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .hf-notif-in, .hf-slot-in, .hf-pop { animation: none; }
          .hf-draw { animation: none; stroke-dashoffset: 0; }
        }
      `}</style>

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
          {/* ---------------- Left ---------------- */}
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
              You can explore stocks, get market alerts, and practice with previous option prices — try it out for free.
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
              <div className="flex items-center gap-2"><Users size={15} /> 10,000+ downloads</div>
              <div className="flex items-center gap-2"><Lock size={15} /> Secure Google sign-in</div>
            </div>
          </div>

          {/* ---------------- Right: phone mockups ---------------- */}
          <div className="relative flex justify-center lg:justify-end" aria-hidden="true">
            {/* Both phones are anchored bottom-0 so their bottoms line up.
                On sm–lg (tablet), we shrink the composition box and pull the
                back phone left so the pair stays visually centered instead of
                drifting right when the grid collapses to one column. */}
            <div className="relative w-64 sm:w-[420px] lg:w-[560px] h-[556px]">

              {/* ===== Back phone (angled): notifications ===== */}
              <PhoneFrame
                dark={dark}
                label="OptionXi alerts arriving"
                className="hidden sm:block absolute bottom-6 sm:left-[48px] lg:left-[188px] w-60"
                style={{
                  transform: `rotate(${TILT}deg)`,
                  transformOrigin: "bottom center",
                  zIndex: 0,
                }}
              >
                <div className={`absolute inset-0 ${L.screen}`} style={{ background: L.wallpaper }} />

                <div className={`absolute top-2.5 inset-x-6 flex items-center justify-between text-[10px] font-semibold z-20 ${L.status}`}>
                  <span>9:41</span>
                  <span>5G</span>
                </div>

                <div className="relative pt-12 px-3.5 z-10">
                  <div className="text-center mb-5">
                    <p className={`text-xs ${L.timeSub}`}>Market demo</p>
                    <p className={`text-5xl font-light tracking-tight tabular-nums ${L.time}`}>9:41</p>
                  </div>

                  <div className="relative" style={{ height: NOTIF_H * 3 + NOTIF_GAP * 3 }}>
                    {notifs.map((n, age) => {
                      const N = n.n;
                      const Icon = N.icon;
                      return (
                        <div
                          key={n.id}
                          className={`hf-notif-in absolute inset-x-0 top-0 rounded-2xl border ${L.card} backdrop-blur-md px-3.5 py-3`}
                          style={{
                            height: NOTIF_H,
                            transform: `translateY(${age * (NOTIF_H + NOTIF_GAP)}px) scale(${1 - age * 0.04})`,
                            transformOrigin: "top center",
                            opacity: age === 0 ? 1 : age === 1 ? 0.75 : age === 2 ? 0.45 : 0,
                            zIndex: 10 - age,
                            transition: "transform .55s cubic-bezier(.2,.8,.2,1), opacity .55s ease",
                          }}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${N.tint}`}>
                              <Icon size={12} />
                            </span>
                            <span className={`text-[11px] font-semibold truncate ${L.kind}`}>OptionXi · {N.kind}</span>
                            <span className={`ml-auto text-[11px] shrink-0 ${L.ago}`}>{age === 0 ? "now" : `${age}m ago`}</span>
                          </div>
                          <p className={`text-[14px] font-semibold leading-tight ${L.head}`}>{N.head}</p>
                          <p className={`text-[12px] ${L.body} leading-snug mt-1 line-clamp-3`}>{N.body}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full z-20 ${L.homeBar}`} />
              </PhoneFrame>

              {/* ===== Front phone: virtual trading (watchlist → buy / sell) ===== */}
              <PhoneFrame
                dark={dark}
                label="OptionXi virtual trading"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-0 w-64"
                style={{ zIndex: 1 }}
              >
                <div className={`absolute inset-0 ${P.bg} ${P.text} transition-colors duration-300`}>

                  {/* Watchlist layer */}
                  <div
                    className={`absolute inset-0 pt-9 px-3.5 pb-14 flex flex-col transition-all duration-500 ${
                      onDetail ? "opacity-0 -translate-x-6 pointer-events-none" : "opacity-100 translate-x-0"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-[15px] font-bold">Watchlist</p>
                      <span className="rounded-full bg-emerald-500/15 text-emerald-500 text-[9px] font-semibold px-2 py-0.5">
                        Virtual mode
                      </span>
                    </div>

                    <div className={`mt-3 rounded-xl border ${P.row} ${P.card} px-3 py-2.5`}>
                      <p className={`text-[10px] ${P.sub}`}>Virtual cash</p>
                      <p className="text-lg font-semibold tabular-nums leading-tight">₹10,00,000</p>
                    </div>

                    <p className={`text-[10px] ${P.sub} mt-3 mb-1.5`}>Your list</p>
                    <ul className="space-y-1">
                      {WATCH.map((r, i) => (
                        <li
                          key={r.sym}
                          className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 transition-all duration-200 ${
                            hl === i ? P.rowActive : "border-transparent"
                          }`}
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-[12px] font-semibold leading-tight">{r.sym}</p>
                            <p className={`text-[10px] ${P.sub} truncate`}>{r.name}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[12px] font-medium tabular-nums leading-tight">{r.price}</p>
                            <p className={`text-[10px] tabular-nums ${r.up ? "text-emerald-500" : "text-rose-500"}`}>{r.chg}</p>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div className={`mt-auto rounded-xl border ${P.row} ${P.card} px-3 py-2.5`}>
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-md bg-emerald-500/15 text-emerald-500 flex items-center justify-center shrink-0">
                          <GraduationCap size={13} />
                        </span>
                        <div className="min-w-0">
                          <p className={`text-[9px] ${P.sub}`}>Today's lesson</p>
                          <p className="text-[11px] font-semibold leading-tight truncate">Reading a breakout</p>
                        </div>
                      </div>
                      <div className={`mt-2 h-1 rounded-full ${dark ? "bg-white/10" : "bg-slate-200"} overflow-hidden`}>
                        <div className="h-full w-2/5 rounded-full bg-emerald-500" />
                      </div>
                    </div>
                  </div>

                  {/* Stock detail layer */}
                  <div
                    className={`absolute inset-0 pt-9 px-3.5 pb-14 flex flex-col transition-all duration-500 ${
                      onDetail ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6 pointer-events-none"
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <ChevronLeft size={16} className={P.sub} />
                      <p className="text-[13px] font-bold">{tr.sym}</p>
                      <span className={`ml-auto rounded-full text-[9px] font-semibold px-2 py-0.5 ${P.chip}`}>Virtual</span>
                    </div>

                    <div className="mt-3">
                      <p className="text-2xl font-bold tabular-nums leading-tight">₹{tr.price}</p>
                      <p className="text-[11px] font-medium text-emerald-500 tabular-nums">▲ {tr.chg} today</p>
                    </div>

                    <div className="mt-3 h-[84px]">
                      {onDetail && (
                        <svg key={tr.sym} viewBox="0 0 200 64" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                          <defs>
                            <linearGradient id="hfFill" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0" stopColor="#10b981" stopOpacity=".35" />
                              <stop offset="1" stopColor="#10b981" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          <polygon
                            points={`${tr.spark} 200,64 0,64`}
                            fill="url(#hfFill)"
                            style={{ animation: "hfFade 1.1s ease-out .5s both" }}
                          />
                          <polyline
                            points={tr.spark}
                            fill="none"
                            stroke="#10b981"
                            strokeWidth={2}
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            vectorEffect="non-scaling-stroke"
                            pathLength={1}
                            className="hf-draw"
                          />
                        </svg>
                      )}
                    </div>

                    <div className="mt-2 flex gap-1.5">
                      {["1D", "1W", "1M", "1Y"].map((r, i) => (
                        <span
                          key={r}
                          className={`rounded-md px-2 py-0.5 text-[9px] font-semibold ${
                            i === 0 ? "bg-emerald-500/15 text-emerald-500" : P.chip
                          }`}
                        >
                          {r}
                        </span>
                      ))}
                    </div>

                    <div className={`mt-3 grid grid-cols-3 gap-2 rounded-xl border ${P.row} ${P.card} px-3 py-2`}>
                      {tr.stats.map(([k, v]) => (
                        <div key={k}>
                          <p className={`text-[9px] ${P.sub}`}>{k}</p>
                          <p className="text-[11px] font-semibold tabular-nums">{v}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto flex gap-2 mb-1">
                      <div className={sideBtn("buy")}>Buy</div>
                      <div className={sideBtn("sell")}>Sell</div>
                    </div>
                  </div>

                  {/* Bottom nav */}
                  <div className={`absolute bottom-0 inset-x-0 z-10 h-12 border-t ${P.nav} flex items-center justify-around px-2`}>
                    {[
                      { i: Eye, l: "Watchlist", on: !onDetail },
                      { i: TrendingUp, l: "Trade", on: onDetail },
                      { i: GraduationCap, l: "Learn", on: false },
                      { i: Trophy, l: "Rank", on: false },
                    ].map(({ i: Icon, l, on }) => (
                      <div key={l} className={`flex flex-col items-center gap-0.5 ${on ? "text-emerald-500" : P.sub}`}>
                        <Icon size={15} />
                        <span className="text-[8px] font-medium">{l}</span>
                      </div>
                    ))}
                  </div>

                  {/* Dim + order sheet */}
                  <div
                    className={`absolute inset-0 z-[15] bg-black/30 transition-opacity duration-500 ${
                      sheetOpen ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <div
                    className={`absolute inset-x-0 bottom-0 z-20 rounded-t-2xl border-t ${P.row} ${P.sheet} px-3.5 pt-3.5 pb-5 shadow-2xl transition-transform duration-500`}
                    style={{
                      transform: sheetOpen ? "translateY(0)" : "translateY(105%)",
                      transitionTimingFunction: "cubic-bezier(.2,.8,.2,1)",
                    }}
                  >
                    {sheetMode === "form" ? (
                      <>
                        <div className="flex items-center justify-between">
                          <p className="text-[13px] font-bold">
                            {tr.side === "buy" ? "Buy" : "Sell"} {tr.sym}
                          </p>
                          <span className={`rounded-full text-[9px] font-semibold px-2 py-0.5 ${P.chip}`}>Market · Virtual</span>
                        </div>

                        <div className={`mt-3 flex items-center justify-between rounded-xl border ${P.row} ${P.card} px-3 py-2`}>
                          <span className={`text-[11px] ${P.sub}`}>Quantity</span>
                          <div className="flex items-center gap-2.5">
                            <span className={`w-6 h-6 rounded-md flex items-center justify-center ${P.chip}`}><Minus size={12} /></span>
                            <span className="text-sm font-semibold tabular-nums w-6 text-center">{qty}</span>
                            <span className={`w-6 h-6 rounded-md flex items-center justify-center ${P.chip}`}><Plus size={12} /></span>
                          </div>
                        </div>

                        <div className="mt-2.5 flex justify-between text-[11px]">
                          <span className={P.sub}>{tr.side === "buy" ? "Est. cost" : "Est. proceeds"}</span>
                          <span className="font-semibold tabular-nums">₹{inr(tr.priceNum * qty)}</span>
                        </div>
                        <div className="mt-1 flex justify-between text-[11px]">
                          <span className={P.sub}>Real money at risk</span>
                          <span className="font-semibold text-emerald-500">₹0</span>
                        </div>

                        <div
                          className={`mt-3 w-full rounded-xl py-2.5 text-center text-[12px] font-semibold text-white transition-transform duration-150 ${
                            tr.side === "buy" ? "bg-emerald-500" : "bg-rose-500"
                          } ${press === "confirm" ? "scale-95" : ""}`}
                        >
                          Confirm {tr.side}
                        </div>
                      </>
                    ) : (
                      <div className="hf-slot-in flex flex-col items-center text-center">
                        <span className="hf-pop w-10 h-10 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center">
                          <Check size={20} />
                        </span>
                        <p className="mt-2 text-[13px] font-bold">
                          {tr.side === "buy" ? "Bought" : "Sold"} {tr.qty} {tr.sym}
                        </p>
                        <p className={`text-[11px] ${P.sub}`}>Filled at ₹{tr.price} · virtual</p>

                        <div className={`mt-3 w-full flex justify-between rounded-xl border ${P.row} ${P.card} px-3 py-2 text-[11px]`}>
                          <span className={P.sub}>{tr.side === "buy" ? "Cash left" : "Realised P&L"}</span>
                          <span className={`font-semibold tabular-nums ${tr.side === "sell" ? "text-emerald-500" : ""}`}>
                            {tr.side === "buy" ? `₹${inr(1000000 - tr.priceNum * tr.qty)}` : tr.pnl}
                          </span>
                        </div>

                        <div className="mt-2 w-full flex items-center gap-2 rounded-xl bg-emerald-500/10 px-3 py-2 text-left">
                          <GraduationCap size={14} className="text-emerald-500 shrink-0" />
                          <span className="text-[10px] leading-snug">{tr.lesson}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </PhoneFrame>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}