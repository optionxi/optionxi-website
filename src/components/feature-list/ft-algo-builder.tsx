import type { ReactNode } from "react";

/**
 * Slim feature section: Algo builder
 * Small label + short heading on the left, a compact multi-condition →
 * notification pipeline on the right. Two indicator conditions join
 * with an "AND" badge before flowing into a single notify node.
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
            Stack indicators. Get notified the instant they align.
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Combine technical conditions like price crossing an SMA or RSI
            thresholds — on Nifty and Bank Nifty charts. When every
            condition lines up, you get a notification. No orders placed.
          </p>
        </div>

        {/* Visual */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 flex items-center gap-1.5">
            <IndexTag label="NIFTY 50" />
            <IndexTag label="BANK NIFTY" />
          </div>

          <Node eyebrow="If" title="Close > 50 SMA" tone="sky" icon={<ConditionIcon />} />
          <AndConnector color="sky" />
          <Node eyebrow="And" title="RSI < 30" tone="sky" icon={<ConditionIcon />} />
          <Connector color="amber" />
          <Node eyebrow="Then" title="Notify me" tone="amber" icon={<BellIcon />} pulse />
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
  pulse = false,
}: {
  eyebrow: string;
  title: string;
  tone: "sky" | "amber" | "emerald";
  icon: ReactNode;
  pulse?: boolean;
}) {
  const tones = {
    sky: "bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400",
    amber: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
    emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  } as const;

  return (
    <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-950">
      <div className={`relative flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${tones[tone]}`}>
        {icon}
        {pulse && (
          <span className="absolute inset-0 rounded-md ring-2 ring-amber-400/60 dark:ring-amber-400/40 animate-ping" />
        )}
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

function IndexTag({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-medium text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
      {label}
    </span>
  );
}

function Connector({ color }: { color: "sky" | "amber" }) {
  const dot = color === "sky" ? "fill-sky-500" : "fill-amber-500";
  const line = color === "sky" ? "bg-sky-200 dark:bg-sky-900" : "bg-amber-200 dark:bg-amber-900";

  return (
    <div className="relative ml-6 h-4 w-px">
      <div className={`absolute inset-0 w-px ${line}`} />
      <svg
        width="14"
        height="16"
        viewBox="0 0 14 16"
        className="absolute top-0 -left-[6.5px] overflow-visible"
      >
        <circle cx="7" cy="0" r="2.5" className={dot}>
          <animateMotion dur="1.4s" repeatCount="indefinite" path="M0,0 L0,16" />
        </circle>
      </svg>
    </div>
  );
}

/** Same vertical connector, but with a small "AND" badge overlaid mid-line
 *  to signal the two conditions above and below are joined, not sequential. */
function AndConnector({ color }: { color: "sky" | "amber" }) {
  const dot = color === "sky" ? "fill-sky-500" : "fill-amber-500";
  const line = color === "sky" ? "bg-sky-200 dark:bg-sky-900" : "bg-amber-200 dark:bg-amber-900";

  return (
    <div className="relative ml-6 flex h-6 w-px items-center">
      <div className={`absolute inset-0 w-px ${line}`} />
      <svg
        width="14"
        height="24"
        viewBox="0 0 14 24"
        className="absolute top-0 -left-[6.5px] overflow-visible"
      >
        <circle cx="7" cy="0" r="2.5" className={dot}>
          <animateMotion dur="1.4s" repeatCount="indefinite" path="M0,0 L0,24" />
        </circle>
      </svg>
      <span className="absolute left-3 rounded border border-slate-200 bg-white px-1 text-[9px] font-semibold uppercase tracking-wide text-slate-400 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-600">
        and
      </span>
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

function BellIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5">
      <path
        d="M10 3.5c-2.2 0-3.8 1.7-3.8 3.9v2.1c0 .6-.3 1.4-.7 1.9l-.7.9c-.5.6-.1 1.5.6 1.5h10.4c.7 0 1.1-.9.6-1.5l-.7-.9c-.4-.5-.7-1.3-.7-1.9V7.4c0-2.2-1.7-3.9-3.8-3.9Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M8.3 15.5a1.7 1.7 0 0 0 3.4 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}