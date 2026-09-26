import { ArrowRight } from "lucide-react";

/**
 * How it works — three steps, each with a small looping visual underneath
 * that shows (rather than tells) what happens at that stage.
 *
 * Visuals:
 *  1. Scan stocks           → a highlight sweeps down a watchlist (fixed drift bug)
 *  2. Set alerts or backtest → toggling between a bell/alert card and a backtest chart
 *  3. Trade with confidence  → a live P&L ticks and a pulse marks "live"
 *
 * Fully self-contained: no theme/props needed, light and dark handled
 * via Tailwind's dark: classes throughout.
 */

const STEPS: {
  n: string;
  title: string;
  body: string;
  Visual: React.FC;
}[] = [
  {
    n: "01",
    title: "Scan stocks",
    body: "Run the screener or AI picks across NSE stocks and options chains — IV, OI, and greeks update live.",
    Visual: ScanStocksVisual,
  },
  {
    n: "02",
    title: "Set alerts or backtest",
    body: "Get notified the moment a setup triggers, or run it against historical data first to see how it would've played out.",
    Visual: AlertsBacktestVisual,
  },
  {
    n: "03",
    title: "Trade with confidence",
    body: "Paper trade the setup first, track live P&L, then go real once the numbers hold up.",
    Visual: LiveConfidenceVisual,
  },
];

export default function HowItWorksSection() {
  return (
    <section
      id="how"
      className="bg-slate-50 dark:bg-neutral-950 border-y border-slate-200 dark:border-neutral-800 py-24"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <span className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold uppercase tracking-wide">
            The process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 tracking-tight text-slate-900 dark:text-white">
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
              className="group relative rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/10 hover:border-emerald-500/40"
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

              <h3 className="text-xl font-bold mb-2 tracking-tight text-slate-900 dark:text-white">
                {s.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm mb-5">
                {s.body}
              </p>

              <div className="rounded-lg border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-slate-900/60 p-3">
                <s.Visual />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/* 1. Scan stocks — a highlight bar sweeps down three watchlist rows      */
/*    Fix: rows are a fixed height with NO gap between them (padding      */
/*    instead of space-y), so the sweep's 1/3-height math lines up        */
/*    exactly instead of drifting off-row after the first step.          */
/* ---------------------------------------------------------------------- */

function ScanStocksVisual() {
  const rows = [
    { symbol: "RELIANCE", ltp: "2,946.10", chg: "+1.2%" },
    { symbol: "HDFCBANK", ltp: "1,678.55", chg: "+0.6%" },
    { symbol: "TATASTEEL", ltp: "162.30", chg: "-0.4%" },
  ];

  const ROW_H = 20; // px — must match the row's fixed height below

  return (
    <div className="font-mono text-[10px]">
      <div className="flex justify-between px-1.5 pb-1 mb-1 border-b border-slate-200 dark:border-neutral-800 text-slate-400 dark:text-slate-500">
        <span>SYMBOL</span>
        <span>LTP</span>
        <span>CHG</span>
      </div>

      <div className="relative" style={{ height: ROW_H * rows.length }}>
        {rows.map((r, i) => (
          <div
            key={r.symbol}
            className="absolute inset-x-0 flex items-center justify-between px-1.5 text-slate-500 dark:text-slate-400"
            style={{ top: i * ROW_H, height: ROW_H }}
          >
            <span>{r.symbol}</span>
            <span className="text-slate-700 dark:text-slate-300">{r.ltp}</span>
            <span className={r.chg.startsWith("-") ? "text-red-500" : "text-emerald-500"}>
              {r.chg}
            </span>
          </div>
        ))}

        {/* sweeping highlight — same fixed ROW_H, so translateY steps
            (0, ROW_H, 2*ROW_H) land exactly on each row every time */}
        <div
          className="absolute inset-x-0 rounded bg-emerald-500/15 border border-emerald-500/30"
          style={{
            height: ROW_H,
            animation: "stockScan 3s ease-in-out infinite",
          }}
        />
      </div>

      <style>{`
        @keyframes stockScan {
          0%, 6%   { transform: translateY(0px); }
          33%,39%  { transform: translateY(${ROW_H}px); }
          66%,72%  { transform: translateY(${ROW_H * 2}px); }
          94%,100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* 2. Set alerts or backtest — toggles between an alert card and a        */
/*    backtest result card on a loop, so both paths get equal billing    */
/*    Fix: removed the hard inner border on the alert/backtest cards so   */
/*    the outer container border reads cleanly around the NIFTY breakout. */
/* ---------------------------------------------------------------------- */

function AlertsBacktestVisual() {
  return (
    <div className="relative h-14">
      {/* Alert card */}
      <div
        className="absolute inset-0 flex items-center gap-2 rounded-lg border border-slate-100 bg-white px-2.5 dark:border-slate-800/60 dark:bg-slate-950"
        style={{ animation: "alertBacktestFade 6s ease-in-out infinite" }}
      >
        <span className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/15">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-[10px] font-semibold text-slate-700 dark:text-slate-300">
            NIFTY 24,700 CE breakout
          </p>
          <p className="truncate text-[9px] text-slate-400 dark:text-slate-500">
            Alert triggered · IV spike +18%
          </p>
        </div>
      </div>

      {/* Backtest card */}
      <div
        className="absolute inset-0 flex items-center gap-2 rounded-lg border border-slate-100 bg-white px-2.5 dark:border-slate-800/60 dark:bg-slate-950"
        style={{
          animation: "alertBacktestFade 6s ease-in-out infinite",
          animationDelay: "3s",
        }}
      >
        <svg viewBox="0 0 40 24" className="h-6 w-8 shrink-0">
          <path
            d="M2,20 L10,14 L18,17 L26,7 L38,4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-emerald-500"
          />
        </svg>
        <div className="min-w-0">
          <p className="truncate text-[10px] font-semibold text-slate-700 dark:text-slate-300">
            30-day backtest
          </p>
          <p className="truncate text-[9px] text-slate-400 dark:text-slate-500">
            Win rate 64% · Avg R 1.8
          </p>
        </div>
      </div>

      <style>{`
        @keyframes alertBacktestFade {
          0%, 42%   { opacity: 1; }
          50%, 92%  { opacity: 0; }
          100%      { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* 3. Trade with confidence — a live dot + P&L that ticks up on a loop    */
/* ---------------------------------------------------------------------- */

function LiveConfidenceVisual() {
  const values = ["+₹1,240", "+₹1,380", "+₹1,310", "+₹1,460"];

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400">
          PAPER · LIVE
        </span>
      </div>

      <span className="relative grid font-mono text-sm font-semibold text-emerald-600 dark:text-emerald-400">
        {values.map((v, i) => (
          <span
            key={v}
            className="col-start-1 row-start-1"
            style={{
              animation: "pnlTick 3.2s ease-in-out infinite",
              animationDelay: `${i * 0.8}s`,
            }}
          >
            {v}
          </span>
        ))}
      </span>

      <style>{`
        @keyframes pnlTick {
          0%, 3%   { opacity: 0; transform: translateY(2px); }
          8%, 22%  { opacity: 1; transform: translateY(0); }
          27%,100% { opacity: 0; transform: translateY(-2px); }
        }
      `}</style>
    </div>
  );
}