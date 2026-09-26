"use client";

import { useEffect, useState } from "react";

type Row = { strike: number; ce: number; pe: number };

const INITIAL_ROWS: Row[] = [
  { strike: 24750, ce: 55, pe: 32 },
  { strike: 24800, ce: 88, pe: 51 },
  { strike: 24850, ce: 39, pe: 78 },
];

const ATM_STRIKE = 24800;

function clamp(n: number, min = 12, max = 100) {
  return Math.max(min, Math.min(max, n));
}

/**
 * Slim feature section: Option chain
 * Small label + short heading on the left, a compact live-updating
 * CE/PE bar widget on the right.
 */
export default function OptionChainFeature() {
  const [rows, setRows] = useState<Row[]>(INITIAL_ROWS);

  useEffect(() => {
    const id = setInterval(() => {
      setRows((prev) =>
        prev.map((r) => ({
          ...r,
          ce: clamp(r.ce + (Math.random() * 18 - 9)),
          pe: clamp(r.pe + (Math.random() * 18 - 9)),
        }))
      );
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="bg-white py-12 dark:bg-slate-950 sm:py-16">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 md:grid-cols-2 md:items-center md:gap-12">
        {/* Copy */}
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-amber-600 dark:text-amber-400">
            Option chain
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-[28px]">
            See where the market is placing its bets.
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Live open interest across every strike, split between call
            buyers and put buyers — updated as the market moves.
          </p>
        </div>

        {/* Visual */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              NIFTY
            </span>
            <span className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              Live
            </span>
          </div>

          <div className="space-y-1.5">
            {rows.map((row) => {
              const isAtm = row.strike === ATM_STRIKE;
              return (
                <div
                  key={row.strike}
                  className={`flex items-center gap-2 rounded-md px-1.5 py-1 ${
                    isAtm ? "bg-amber-50 dark:bg-amber-500/10" : ""
                  }`}
                >
                  <div className="flex h-3.5 flex-1 items-center justify-end overflow-hidden rounded-l bg-slate-200/60 dark:bg-slate-800">
                    <div
                      className="h-full rounded-l bg-emerald-500/80 transition-[width] duration-1000 ease-in-out dark:bg-emerald-500/70"
                      style={{ width: `${row.ce}%` }}
                    />
                  </div>
                  <span
                    className={`w-12 shrink-0 text-center font-mono text-[10px] tabular-nums ${
                      isAtm
                        ? "font-semibold text-amber-700 dark:text-amber-400"
                        : "text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {row.strike}
                  </span>
                  <div className="flex h-3.5 flex-1 items-center overflow-hidden rounded-r bg-slate-200/60 dark:bg-slate-800">
                    <div
                      className="h-full rounded-r bg-rose-500/80 transition-[width] duration-1000 ease-in-out dark:bg-rose-500/70"
                      style={{ width: `${row.pe}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}