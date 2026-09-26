/**
 * Slim feature section: Strategy builder
 * Small label + short heading on the left, a compact payoff diagram
 * on the right that redraws on a loop, with leg tags that pulse in.
 */
export default function StrategyBuilder() {
  const legs = [
    { label: "Buy 24,600 PE", delay: "0s" },
    { label: "Sell 24,700 PE", delay: "0.3s" },
    { label: "Sell 25,000 CE", delay: "0.6s" },
    { label: "Buy 25,100 CE", delay: "0.9s" },
  ];

  return (
    <section className="bg-white py-12 dark:bg-slate-950 sm:py-16">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 md:grid-cols-2 md:items-center md:gap-12">
        {/* Copy */}
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-amber-600 dark:text-amber-400">
            Strategy builder
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-[28px]">
            See the outcome before you risk anything.
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Combine up to four legs and watch the profit-and-loss shape
            redraw across every possible price.
          </p>
        </div>

        {/* Visual */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="font-medium text-slate-500 dark:text-slate-400">
              Iron Condor · NIFTY
            </span>
            <span className="font-medium text-emerald-600 dark:text-emerald-400">
              +₹4,200 max
            </span>
          </div>

          <svg viewBox="0 0 300 100" className="h-24 w-full">
            <defs>
              <linearGradient id="payoffFill2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.18" className="text-emerald-500" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0" className="text-emerald-500" />
              </linearGradient>
            </defs>

            <line
              x1="8"
              y1="60"
              x2="292"
              y2="60"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="4 4"
              className="text-slate-300 dark:text-slate-700"
            />

            <path
              d="M12,80 L65,80 L100,35 L200,35 L235,80 L288,80 L288,100 L12,100 Z"
              fill="url(#payoffFill2)"
            />

            <path
              d="M12,80 L65,80 L100,35 L200,35 L235,80 L288,80"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
              className="text-emerald-500"
              pathLength={100}
              strokeDasharray={100}
            >
              <animate
                attributeName="stroke-dashoffset"
                values="100;0;0;100"
                keyTimes="0;0.5;0.9;1"
                dur="3.6s"
                repeatCount="indefinite"
              />
            </path>
          </svg>

          <div className="mt-2 flex flex-wrap gap-1.5">
            {legs.map((leg) => (
              <span
                key={leg.label}
                style={{ animationDelay: leg.delay }}
                className="animate-pulse rounded-full border border-slate-200 bg-white px-2 py-0.5 font-mono text-[9px] text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400"
              >
                {leg.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}