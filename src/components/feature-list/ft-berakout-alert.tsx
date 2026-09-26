/**
 * Slim feature section: Breakout alerts
 * Small label + short heading on the left, a compact chart on the
 * right that draws itself and crosses a resistance line on a loop —
 * pure SVG animation, no client JS needed.
 */
export default function BreakoutAlerts() {
  return (
    <section className="bg-white py-12 dark:bg-slate-950 sm:py-16">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 md:grid-cols-2 md:items-center md:gap-12">
        {/* Copy */}
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-amber-600 dark:text-amber-400">
            Breakout alerts
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-[28px]">
            Never miss the moment price breaks out.
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Set a level once. Get notified the instant price closes above
            or below it — no need to watch the chart.
          </p>
        </div>

        {/* Visual */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="font-medium text-slate-500 dark:text-slate-400">
              RELIANCE · ₹1,840
            </span>
            <span className="text-slate-400 dark:text-slate-600">1 alert</span>
          </div>

          <svg viewBox="0 0 300 110" className="h-24 w-full overflow-visible">
            <line
              x1="8"
              y1="55"
              x2="292"
              y2="55"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeDasharray="4 4"
              className="text-slate-300 dark:text-slate-700"
            />

            <path
              id="priceLine2"
              d="M8,95 C50,88 80,80 105,65 C130,52 145,45 165,30 C190,15 220,8 292,4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="text-emerald-500"
              pathLength={100}
              strokeDasharray={100}
            >
              <animate
                attributeName="stroke-dashoffset"
                values="100;0;0;100"
                keyTimes="0;0.6;0.9;1"
                dur="4s"
                repeatCount="indefinite"
              />
            </path>

            <circle r="3.5" className="fill-emerald-500">
              <animateMotion
                dur="4s"
                repeatCount="indefinite"
                keyPoints="0;0.62;0.62;1"
                keyTimes="0;0.6;0.9;1"
                calcMode="linear"
              >
                <mpath href="#priceLine2" />
              </animateMotion>
            </circle>

            <g>
              <animate
                attributeName="opacity"
                values="0;0;1;1;0;0"
                keyTimes="0;0.55;0.63;0.85;0.92;1"
                dur="4s"
                repeatCount="indefinite"
              />
              <rect x="170" y="6" width="100" height="20" rx="10" className="fill-emerald-500" />
              <text
                x="220"
                y="20"
                textAnchor="middle"
                className="fill-white font-mono text-[9px] font-medium"
              >
                Breakout
              </text>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}