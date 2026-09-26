import type { ReactNode } from "react";

/**
 * Slim feature section: Algo builder
 * Small label + short heading on the left, a compact condition →
 * action → result pipeline on the right with a dot flowing down each
 * connector, using native SVG animation.
 */
export default function AlgoBuilder() {
  return (
    <section className="bg-white py-12 dark:bg-slate-950 sm:py-16">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 md:grid-cols-2 md:items-center md:gap-12">
        {/* Copy */}
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-amber-600 dark:text-amber-400">
            Algo builder
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-[28px]">
            Turn an idea into a running algorithm.
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Connect a condition to an action with simple blocks — no
            coding, and it keeps running when the app is closed.
          </p>
        </div>

        {/* Visual */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
          <Node eyebrow="If" title="Price > ₹24,800" tone="sky" icon={<ConditionIcon />} />
          <Connector color="sky" />
          <Node eyebrow="Then" title="Buy 24800 CE" tone="amber" icon={<ActionIcon />} />
          <Connector color="amber" />
          <Node eyebrow="Result" title="Order confirmed" tone="emerald" icon={<CheckCircleIcon />} />
        </div>
      </div>
    </section>
  );
}

function Node({
  eyebrow,
  title,
  tone,
  icon,
}: {
  eyebrow: string;
  title: string;
  tone: "sky" | "amber" | "emerald";
  icon: ReactNode;
}) {
  const tones = {
    sky: "bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400",
    amber: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
    emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  } as const;

  return (
    <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-950">
      <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${tones[tone]}`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400 dark:text-slate-600">
          {eyebrow}
        </p>
        <p className="text-[13px] font-medium text-slate-900 dark:text-white">{title}</p>
      </div>
    </div>
  );
}

function Connector({ color }: { color: "sky" | "amber" }) {
  const dot = color === "sky" ? "fill-sky-500" : "fill-amber-500";
  const line = color === "sky" ? "bg-sky-200 dark:bg-sky-900" : "bg-amber-200 dark:bg-amber-900";

  return (
    <div className="relative ml-6 h-4 w-px">
      {/* Vertical line */}
      <div className={`absolute inset-0 w-px ${line}`} />

      {/* Animated dot — SVG centered on the line */}
      <svg
        width="14"
        height="16"
        viewBox="0 0 14 16"
        className="absolute top-0 -left-[6.5px] overflow-visible"
      >
        <circle cx="7" cy="0" r="2.5" className={dot}>
          <animateMotion
            dur="1.4s"
            repeatCount="indefinite"
            path="M0,0 L0,16"
          />
        </circle>
      </svg>
    </div>
  );
}

function ConditionIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5">
      <path
        d="M4 10h5m7 0h-3m-4 0 2.5-5m-2.5 5 2.5 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ActionIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5">
      <path d="M11 3 4 12h5l-1 5 7-9h-5l1-5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5">
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M6.8 10.2 9 12.3l4.2-4.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}