/**
 * Slim feature section: Breakout alerts
 * Small label + short heading on the left, a compact chart on the
 * right. Price crosses resistance -> pulse at the cross point -> a
 * push-notification toast slides in. Pure SVG + CSS animation, no JS.
 */
export default function BreakoutAlerts() {
  return (
    <section className="bg-white py-12 dark:bg-slate-950 sm:py-16">
      <style>{`
        @keyframes toastIn {
          0%, 58%   { opacity: 0; transform: translateY(-10px) scale(0.96); }
          64%       { opacity: 1; transform: translateY(0) scale(1); }
          85%       { opacity: 1; transform: translateY(0) scale(1); }
          92%, 100% { opacity: 0; transform: translateY(-6px) scale(0.98); }
        }
        .toast-anim { animation: toastIn 4s ease-in-out infinite; }
      `}</style>

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
        <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
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

            {/* Pulse ring fired exactly at the cross point */}
            <circle cx="140" cy="55" r="4" fill="none" strokeWidth="2" className="stroke-emerald-500">
              <animate
                attributeName="r"
                values="4;4;22;22"
                keyTimes="0;0.58;0.72;1"
                dur="4s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0;0.8;0;0"
                keyTimes="0;0.58;0.72;1"
                dur="4s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>

          {/* Push-notification toast, synced to the same 4s loop */}
          <div className="toast-anim pointer-events-none absolute right-3 top-3 flex w-[190px] items-start gap-2 rounded-lg border border-slate-200 bg-white p-2.5 shadow-lg dark:border-slate-700 dark:bg-slate-800">
            <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald-500 text-white">
              <svg viewBox="0 0 20 20" className="h-3 w-3" fill="currentColor">
                <path d="M10 2a6 6 0 00-6 6c0 3-1 4-1 5h14s-1-1-1-5a6 6 0 00-6-6zM8.5 15a1.5 1.5 0 003 0h-3z" />
              </svg>
            </span>
            <div className="min-w-0">
              <p className="truncate text-[11px] font-semibold text-slate-900 dark:text-white">
                Breakout — RELIANCE
              </p>
              <p className="truncate text-[10px] text-slate-500 dark:text-slate-400">
                Crossed ₹1,850 resistance
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}