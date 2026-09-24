'use client'

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Check, Loader2, Bell, ShieldCheck, TrendingUp, BrainCircuit, Newspaper } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data: three scenarios, each = watch list → 3 checks → trending     */
/*  → phone notification. The loop cycles through them.                */
/* ------------------------------------------------------------------ */

type Tone = "up" | "down" | "flat";
type Row = { sym: string; mid: string; right: string; tone: Tone; pass: boolean; prob?: string };
type Scenario = {
  key: string;
  scanName: string;
  checks: { label: string; left: string }[];
  rows: Row[];
  notif: { kind: string; head: string; body: string; icon: typeof Bell; tint: string };
};

const SCENARIOS: Scenario[] = [
  {
    key: "breakout",
    scanName: "Breakout scan · live prices",
    checks: [
      { label: "Near today's high", left: "412 left" },
      { label: "Volume above 2× average", left: "96 left" },
      { label: "RSI above 60", left: "3 left" },
    ],
    rows: [
      { sym: "RELIANCE", mid: "2,948", right: "+0.4%", tone: "up", pass: false },
      { sym: "WELCORP", mid: "812", right: "+2.36%", tone: "up", pass: true, prob: "80%" },
      { sym: "HDFCBANK", mid: "1,742", right: "+0.2%", tone: "up", pass: false },
      { sym: "INFY", mid: "1,890", right: "-0.6%", tone: "down", pass: false },
      { sym: "ADANIPORTS", mid: "1,391", right: "+1.8%", tone: "up", pass: true, prob: "74%" },
      { sym: "SBIN", mid: "812", right: "-0.1%", tone: "down", pass: false },
      { sym: "LT", mid: "3,640", right: "+1.4%", tone: "up", pass: true, prob: "71%" },
    ],
    notif: {
      kind: "Breakout alert",
      head: "WELCORP · Bullish breakout",
      body: "80% probability. Crossed today's high on 2.4× volume.",
      icon: TrendingUp,
      tint: "text-emerald-500 bg-emerald-500/15",
    },
  },
  {
    key: "sentiment",
    scanName: "Sentiment scan · probability",
    checks: [
      { label: "Price near a key level", left: "5 left" },
      { label: "Momentum aligned", left: "3 left" },
      { label: "Volume confirming", left: "2 left" },
    ],
    rows: [
      { sym: "NIFTY 50", mid: "80%", right: "Bullish", tone: "up", pass: true, prob: "80%" },
      { sym: "BANK NIFTY", mid: "72%", right: "Bullish", tone: "up", pass: true, prob: "72%" },
      { sym: "FINNIFTY", mid: "51%", right: "Neutral", tone: "flat", pass: false },
      { sym: "MIDCPNIFTY", mid: "64%", right: "Bearish", tone: "down", pass: false },
      { sym: "SENSEX", mid: "49%", right: "Neutral", tone: "flat", pass: false },
      { sym: "NIFTY IT", mid: "68%", right: "Bearish", tone: "down", pass: false },
      { sym: "NIFTY AUTO", mid: "53%", right: "Neutral", tone: "flat", pass: false },
    ],
    notif: {
      kind: "Market sentiment",
      head: "NIFTY 50 · Bullish breakout",
      body: "80% probability of an upside move today.",
      icon: BrainCircuit,
      tint: "text-violet-500 bg-violet-500/15",
    },
  },
  {
    key: "news",
    scanName: "News scan · your watchlist",
    checks: [
      { label: "Headline on your watchlist", left: "38 left" },
      { label: "Price is reacting", left: "9 left" },
      { label: "Volume rising", left: "2 left" },
    ],
    rows: [
      { sym: "RELIANCE", mid: "3 new", right: "+1.4%", tone: "up", pass: true },
      { sym: "TCS", mid: "1 new", right: "-0.2%", tone: "down", pass: false },
      { sym: "ITC", mid: "2 new", right: "+0.1%", tone: "flat", pass: false },
      { sym: "BAJFINANCE", mid: "1 new", right: "-0.5%", tone: "down", pass: false },
      { sym: "MARUTI", mid: "2 new", right: "+1.9%", tone: "up", pass: true },
      { sym: "ONGC", mid: "1 new", right: "+0.3%", tone: "up", pass: false },
      { sym: "SUNPHARMA", mid: "1 new", right: "-0.4%", tone: "down", pass: false },
    ],
    notif: {
      kind: "News alert",
      head: "RELIANCE +1.4%",
      body: "New headline is out. Price and volume are reacting.",
      icon: Newspaper,
      tint: "text-amber-500 bg-amber-500/15",
    },
  },
];

const SCAN_MS = 190;   // time per row while scanning
const CHECK_MS = 780;  // time per filter check
const NOTIF_H = 104;    // notification card height (px)
const NOTIF_GAP = 8;
const INITIAL_SCENARIO = 1; // notification shown immediately on load (sentiment)

// phase: 0 scanning · 1 filtering · 2 losers dimmed · 3 trending shown · 4 alert sent

/* ------------------------------------------------------------------ */
/*  Theme tokens                                                       */
/* ------------------------------------------------------------------ */

function tokens(dark: boolean) {
  return dark
    ? {
        section: "bg-[#070708] text-neutral-50",
        sub: "text-neutral-400",
        subtle: "text-neutral-500",
        card: "bg-neutral-950",
        border: "border-white/10",
        divide: "divide-white/10",
        scanRow: "border-white/40 bg-white/5",
        dot: "bg-neutral-700",
        checkDone: "border-white/50 text-white",
        checkRun: "border-white/25 text-white",
        checkIdle: "border-white/10 text-neutral-500",
        dashed: "border-white/10 text-neutral-700",
        pillFirst: "bg-white text-black border-white",
        pillFirstTone: "text-emerald-700",
        pillOther: "border-white/25 text-white",
        statusText: "text-neutral-200",
        statusIcon: "text-neutral-400",
        idleIcon: "text-neutral-600",
        up: "text-emerald-400",
        down: "text-rose-400",
        flat: "text-neutral-400",
        dotColor: "rgba(255,255,255,0.06)",
        glow: "rgba(16,185,129,0.12)",
        phoneBorder: "border-neutral-800",
        phoneScreen: "bg-[#0a0a0b] text-white",
        phoneWallpaper:
          "radial-gradient(120% 60% at 50% 0%, rgba(16,185,129,0.18), transparent 60%), #0a0a0b",
        phoneNotch: "bg-black",
        phoneStatus: "text-neutral-300",
        phoneTime: "text-white",
        phoneTimeSub: "text-neutral-400",
        notifCard: "border-white/10 bg-white/[0.08]",
        notifKind: "text-neutral-300",
        notifTime: "text-neutral-500",
        notifHead: "text-white",
        notifBody: "text-neutral-400",
        homeBar: "bg-white/30",
        phoneShadow: "shadow-black/60",
        heading: "text-neutral-50",
        headingAccent: "text-emerald-400",
      }
    : {
        section: "bg-slate-50 text-slate-900",
        sub: "text-slate-500",
        subtle: "text-slate-500",
        card: "bg-white",
        border: "border-slate-200",
        divide: "divide-slate-200",
        scanRow: "border-slate-400 bg-slate-100",
        dot: "bg-slate-300",
        checkDone: "border-slate-900 text-slate-900",
        checkRun: "border-slate-400 text-slate-900",
        checkIdle: "border-slate-200 text-slate-400",
        dashed: "border-slate-200 text-slate-300",
        pillFirst: "bg-slate-900 text-white border-slate-900",
        pillFirstTone: "text-emerald-400",
        pillOther: "border-slate-300 text-slate-900",
        statusText: "text-slate-700",
        statusIcon: "text-slate-500",
        idleIcon: "text-slate-400",
        up: "text-emerald-600",
        down: "text-rose-600",
        flat: "text-slate-500",
        dotColor: "rgba(0,0,0,0.07)",
        glow: "rgba(16,185,129,0.10)",
        phoneBorder: "border-slate-900",
        phoneScreen: "bg-slate-100 text-slate-900",
        phoneWallpaper:
          "radial-gradient(120% 60% at 50% 0%, rgba(16,185,129,0.16), transparent 60%), #f1f5f9",
        phoneNotch: "bg-slate-900",
        phoneStatus: "text-slate-600",
        phoneTime: "text-slate-900",
        phoneTimeSub: "text-slate-500",
        notifCard: "border-slate-200 bg-white/90",
        notifKind: "text-slate-600",
        notifTime: "text-slate-400",
        notifHead: "text-slate-900",
        notifBody: "text-slate-500",
        homeBar: "bg-slate-900/25",
        phoneShadow: "shadow-slate-900/25",
        heading: "text-slate-900",
        headingAccent: "text-emerald-600",
      };
}

/* ------------------------------------------------------------------ */

export default function FeatureSection() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = mounted && resolvedTheme === "dark";
  const t = tokens(dark);

  const rootRef = useRef<HTMLElement | null>(null);
  const sRef = useRef(0);
  const idRef = useRef(0);
  const startedRef = useRef(false);

  const [active, setActive] = useState(false);
  const [sIdx, setSIdx] = useState(0);
  const [scan, setScan] = useState(-1);
  const [phase, setPhase] = useState(0);
  const [checked, setChecked] = useState(0);
  const [notifs, setNotifs] = useState<{ id: number; s: number }[]>([]);

  const tone = (x: Tone) => t[x];

  // Run the animation only while the section is on screen
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
      setNotifs(reduce
        ? [{ id: 1, s: 0 }, { id: 0, s: INITIAL_SCENARIO }]
        : [{ id: 0, s: INITIAL_SCENARIO }]);
      idRef.current = reduce ? 1 : 0;
    }

    // Reduced motion: one finished state, no loop
    if (reduce) {
      setSIdx(0); setScan(-1); setPhase(4); setChecked(3);
      return;
    }

    let cancelled = false;
    const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

    (async () => {
      await wait(1400); // let the first notification breathe
      while (!cancelled) {
        const s = sRef.current;
        const sc = SCENARIOS[s];

        setSIdx(s); setScan(-1); setPhase(0); setChecked(0);
        await wait(600); if (cancelled) return;

        // 1) track: cursor walks the watch list
        for (let i = 0; i < sc.rows.length; i++) {
          setScan(i);
          await wait(SCAN_MS); if (cancelled) return;
        }
        setScan(-1);

        // 2) filter: checks resolve one by one
        setPhase(1);
        for (let k = 1; k <= sc.checks.length; k++) {
          await wait(CHECK_MS); if (cancelled) return;
          setChecked(k);
        }

        // 3) losers fade, winners move into Trending
        await wait(450); if (cancelled) return;
        setPhase(2);
        await wait(450); if (cancelled) return;
        setPhase(3);

        // 4) notify
        await wait(900); if (cancelled) return;
        setPhase(4);
        setNotifs((p) => [{ id: ++idRef.current, s }, ...p].slice(0, 4));

        await wait(3600); if (cancelled) return;
        sRef.current = (s + 1) % SCENARIOS.length;
      }
    })();

    return () => { cancelled = true; };
  }, [active]);

  const sc = SCENARIOS[sIdx];
  const winners = sc.rows.filter((r) => r.pass);

  return (
    <section
      ref={rootRef}
      id="alerts"
      className={`relative overflow-hidden py-24 transition-colors duration-300 ${t.section}`}
    >
      <style>{`
        @keyframes fsNotifIn { from { opacity: 0; transform: translateY(-28px) scale(.94); } }
        @keyframes fsSlotIn  { from { opacity: 0; transform: translateY(8px); } }
        .fs-notif-in { animation: fsNotifIn .55s cubic-bezier(.2,.8,.2,1) both; }
        .fs-slot-in  { animation: fsSlotIn .4s ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .fs-notif-in, .fs-slot-in { animation: none; }
        }
      `}</style>

      {/* dotted texture + soft glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(${t.dotColor} 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, black, transparent)",
        }}
      />
      <div
        aria-hidden
        className="absolute -top-32 right-0 w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${t.glow}, transparent 65%)` }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-14">
          <h2 className={`text-3xl md:text-4xl font-bold tracking-tight mb-4 ${t.heading}`}>
            We watch thousands of stocks.{" "}
            <span className={t.headingAccent}>You hear about one.</span>
          </h2>
          <p className={`${t.sub} text-lg`}>
            OptionXi tracks the market all day, filters out the noise and sends an alert
            only when a setup passes every check.
          </p>
        </div>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_auto] gap-12 lg:gap-16 items-center">
          {/* ---------------- Left: pipeline card ---------------- */}
          <div>
            <div className={`rounded-2xl border ${t.border} ${t.card} grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x ${t.divide} overflow-hidden transition-colors duration-300`}>
              {/* Col 1 — Watching (always visible) */}
              <div className="p-6 lg:min-h-[440px]">
                <p className={`text-sm ${t.sub}`}>Stock Watchlists</p>
                <p className="text-xl font-semibold mt-1 mb-1">2,000+ stocks</p>
                <p className={`text-sm ${t.subtle} mb-5`}>{sc.scanName}</p>

                <ul className="space-y-1.5">
                  {sc.rows.map((r, i) => {
                    const scanning = scan === i;
                    const dim = phase >= 2 && !r.pass;
                    return (
                      <li
                        key={`${sc.key}-${r.sym}`}
                        className={`flex items-center gap-3 rounded-lg border px-3 py-2 text-sm transition-all duration-300 ${
                          scanning
                            ? t.scanRow
                            : phase >= 2 && r.pass
                            ? "border-emerald-500/30 bg-emerald-500/5"
                            : "border-transparent"
                        } ${dim ? "opacity-25" : "opacity-100"}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-200 ${
                            scanning ? "bg-emerald-500" : t.dot
                          }`}
                        />
                        <span className="font-medium flex-1 truncate">{r.sym}</span>
                        <span className={`${t.subtle} tabular-nums`}>{r.mid}</span>
                        <span className={`tabular-nums w-16 text-right ${tone(r.tone)}`}>{r.right}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Col 2 — Checks (hidden on mobile) */}
              <div className="hidden lg:block p-6 lg:min-h-[440px]">
                <p className={`text-sm ${t.sub}`}>Screeners</p>
                <p className="text-xl font-semibold mt-1 mb-1">Only what passes</p>
                <p className={`text-sm ${t.subtle} mb-5`}>Every check narrows the list</p>

                <ul className="space-y-2.5">
                  {sc.checks.map((c, i) => {
                    const done = i < checked;
                    const running = phase >= 1 && i === checked && checked < sc.checks.length;
                    return (
                      <li
                        key={`${sc.key}-${c.label}`}
                        className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-sm transition-all duration-300 ${
                          done ? t.checkDone : running ? t.checkRun : t.checkIdle
                        }`}
                      >
                        <span className="w-4 h-4 flex items-center justify-center shrink-0">
                          {done ? (
                            <Check size={14} className="text-emerald-500" />
                          ) : running ? (
                            <Loader2 size={14} className="animate-spin text-emerald-500" />
                          ) : (
                            <span className={`w-1.5 h-1.5 rounded-full ${t.dot}`} />
                          )}
                        </span>
                        <span className="flex-1">{c.label}</span>
                        <span
                          className={`text-xs tabular-nums ${t.sub} transition-opacity duration-300 ${
                            done ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          {c.left}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Col 3 — Trending (hidden on mobile) */}
              <div className="hidden lg:flex p-6 lg:min-h-[440px] flex-col">
                <p className={`text-sm ${t.sub}`}>Notifications</p>
                <p className="text-xl font-semibold mt-1 mb-1">Worth a look</p>
                <p className={`text-sm ${t.subtle} mb-5`}>Passed every check</p>

                <ul className="space-y-2.5">
                  {[0, 1, 2].map((j) => {
                    const w = winners[j];
                    const show = phase >= 3 && !!w;
                    if (!show) {
                      return (
                        <li
                          key={`${sc.key}-empty-${j}`}
                          className={`rounded-lg border border-dashed px-4 py-3 text-sm ${t.dashed}`}
                        >
                          {w || j === 0 ? "Waiting for a match" : "\u00A0"}
                        </li>
                      );
                    }
                    const first = j === 0;
                    return (
                      <li
                        key={`${sc.key}-${w.sym}`}
                        className={`fs-slot-in flex items-center justify-between rounded-lg border px-4 py-3 text-sm font-medium ${
                          first ? t.pillFirst : t.pillOther
                        }`}
                        style={{ animationDelay: `${j * 140}ms` }}
                      >
                        <span>{w.sym}</span>
                        <span className={`tabular-nums ${first ? t.pillFirstTone : tone(w.tone)}`}>
                          {w.prob ?? w.right}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                <div className={`mt-auto pt-6 flex items-center gap-2.5 text-sm ${t.sub}`}>
                  {phase >= 4 ? (
                    <>
                      <Check size={15} className="text-emerald-500" />
                      <span className={t.statusText}>Alert sent to your phone</span>
                    </>
                  ) : phase === 3 ? (
                    <>
                      <Loader2 size={15} className="animate-spin text-emerald-500" />
                      <span>Sending alert</span>
                    </>
                  ) : (
                    <>
                      <Bell size={15} className={t.idleIcon} />
                      <span>Nothing to send yet</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center lg:justify-start">
              <div className={`inline-flex items-center gap-2.5 rounded-full border ${t.border} ${t.card} px-5 py-2.5 text-sm ${t.statusText}`}>
                <ShieldCheck size={16} className={t.statusIcon} />
                Noise filtered. Weak setups never reach your phone
              </div>
            </div>
          </div>

          {/* ---------------- Right: phone with notifications (always visible) ---------------- */}
          <div className="flex justify-center">
            <div
              className={`relative w-[280px] sm:w-[300px] aspect-[9/19.5] rounded-[2.8rem] border-[10px] ${t.phoneBorder} ${t.phoneScreen} shadow-2xl ${t.phoneShadow} overflow-hidden transition-colors duration-300`}
              aria-label="Phone showing OptionXi alerts arriving"
            >
              {/* lock-screen wallpaper — adapts to theme */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{ background: t.phoneWallpaper }}
              />

              <div className={`absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-6 rounded-full ${t.phoneNotch} z-30`} />

              <div className={`absolute top-3 inset-x-6 flex items-center justify-between text-[11px] font-semibold z-20 ${t.phoneStatus}`}>
                <span>9:41</span>
                <span>5G</span>
              </div>

              <div className="relative pt-16 px-4 z-10">
                <div className="text-center mb-6">
                  <p className={`text-xs ${t.phoneTimeSub}`}>Market demo</p>
                  <p className={`text-6xl font-light tracking-tight tabular-nums ${t.phoneTime}`}>9:41</p>
                </div>

                <div className="relative" style={{ height: NOTIF_H * 3 + NOTIF_GAP * 3 }}>
                  {notifs.map((n, age) => {
                    const N = SCENARIOS[n.s].notif;
                    const Icon = N.icon;
                    return (
                      <div
                        key={n.id}
                        className={`fs-notif-in absolute inset-x-0 top-0 rounded-2xl border ${t.notifCard} backdrop-blur-md px-3.5 py-3`}
                        style={{
                          height: NOTIF_H,
                          transform: `translateY(${age * (NOTIF_H + NOTIF_GAP)}px) scale(${1 - age * 0.04})`,
                          transformOrigin: "top center",
                          opacity: age === 0 ? 1 : age === 1 ? 0.75 : age === 2 ? 0.45 : 0,
                          zIndex: 10 - age,
                          transition: "transform .55s cubic-bezier(.2,.8,.2,1), opacity .55s ease",
                        }}
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className={`w-5 h-5 rounded-md flex items-center justify-center ${N.tint}`}>
                            <Icon size={12} />
                          </span>
                          <span className={`text-[11px] font-semibold ${t.notifKind}`}>OptionXi · {N.kind}</span>
                          <span className={`ml-auto text-[11px] ${t.notifTime}`}>{age === 0 ? "now" : `${age}m ago`}</span>
                        </div>
                        <p className={`text-[13px] font-semibold leading-tight ${t.notifHead}`}>{N.head}</p>
                        <p className={`text-xs ${t.notifBody} leading-snug mt-0.5 line-clamp-2`}>{N.body}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 rounded-full z-20 ${t.homeBar}`} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}