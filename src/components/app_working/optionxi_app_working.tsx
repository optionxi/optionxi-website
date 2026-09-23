"use client";

import { useState } from "react";
import {
  Check,
  X,
  Radio,
  TrendingUp,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Flame,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

type PickStatus = "win" | "loss";

interface StockPick {
  ticker: string;
  name: string;
  direction: "Long" | "Short";
  time: string;
  pnl: string;
  status: PickStatus;
}

interface DayScore {
  day: number;
  accuracy: number; // 0–100
  allStocks: boolean; // days the app picked every stock
}

/* ------------------------------------------------------------------ */
/* Demo data — replace with your API / daily picks feed                */
/* ------------------------------------------------------------------ */

const LIVE_PICKS: StockPick[] = [
  { ticker: "NVDA", name: "NVIDIA Corp", direction: "Long", time: "9:32 AM", pnl: "+2.4%", status: "win" },
  { ticker: "TSLA", name: "Tesla Inc", direction: "Short", time: "10:05 AM", pnl: "-1.1%", status: "loss" },
  { ticker: "AMD", name: "Adv. Micro Devices", direction: "Long", time: "11:47 AM", pnl: "+1.8%", status: "win" },
  { ticker: "AAPL", name: "Apple Inc", direction: "Long", time: "1:15 PM", pnl: "+0.9%", status: "win" },
  { ticker: "PLTR", name: "Palantir Tech", direction: "Short", time: "2:40 PM", pnl: "-0.6%", status: "loss" },
];

/* Deterministic pseudo-random accuracy so SSR/CSR always match.
   ~65% of days land in the 60–70% green band, rest are red days.  */
function accuracyFor(year: number, month: number, day: number): number {
  const seed = Math.sin(year * 372 + month * 41 + day * 7.13) * 10000;
  const r = seed - Math.floor(seed); // 0..1
  if (r < 0.65) return 60 + Math.floor(r * 15); // 60–69%  → green
  return 38 + Math.floor((r - 0.65) * 40); // 38–52% → red
}

const isAllStocksDay = (day: number) => day % 9 === 4; // some days pick ALL stocks

/* ------------------------------------------------------------------ */
/* Small bits                                                          */
/* ------------------------------------------------------------------ */

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-400">
    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
    {children}
  </span>
);

function buildMonth(year: number, month: number): DayScore[] {
  const days = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: days }, (_, i) => {
    const day = i + 1;
    return { day, accuracy: accuracyFor(year, month, day), allStocks: isAllStocksDay(day) };
  });
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export default function StockPicksSection() {
  const today = new Date();
  const [cursor, setCursor] = useState({ y: today.getFullYear(), m: today.getMonth() });

  const move = (delta: number) =>
    setCursor((c) => {
      const d = new Date(c.y, c.m + delta, 1);
      return { y: d.getFullYear(), m: d.getMonth() };
    });

  const days = buildMonth(cursor.y, cursor.m);
  const lead = new Date(cursor.y, cursor.m, 1).getDay(); // blank cells

  const green = days.filter((d) => d.accuracy >= 60);
  const red = days.filter((d) => d.accuracy < 60);
  const winRate = Math.round(green.reduce((s, d) => s + d.accuracy, 0) / (green.length || 1));

  const isToday = (day: number) =>
    day === today.getDate() && cursor.m === today.getMonth() && cursor.y === today.getFullYear();

  return (
    <section className="relative overflow-hidden bg-zinc-50 py-24 text-zinc-900 transition-colors dark:bg-zinc-950 dark:text-zinc-50">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl dark:bg-emerald-500/10" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-14 text-center">
          <Pill>Stock Picks</Pill>
          <h2 className="mx-auto mt-6 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Every pick. Tracked.{" "}
            <span className="text-emerald-600 dark:text-emerald-400">On the calendar.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
            OptionXi posts its best stock picks daily. Winners, losers, accuracy — all of it,
            one honest calendar at a time.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* ------------------------- LEFT: live picks ------------------------- */}
          <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">
              Live picks
            </p>
            <h3 className="mt-3 text-2xl font-semibold">Pick. Track. Repeat.</h3>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Fresh calls every trading day — direction, entry, and the result, updated as it happens.
            </p>

            {/* live link pill */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800/60">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-medium">optionxi.com/live</span>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Live
              </span>
            </div>

            {/* picks feed */}
            <ul className="mt-6 space-y-3">
              {LIVE_PICKS.map((p) => (
                <li
                  key={p.ticker + p.time}
                  className="flex items-center gap-4 rounded-2xl border border-zinc-200 bg-zinc-50/60 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950/40"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white dark:bg-zinc-100 dark:text-zinc-900">
                    {p.ticker.slice(0, 2)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">
                      {p.ticker}{" "}
                      <span className="font-normal text-zinc-500 dark:text-zinc-400">
                        picked · {p.direction}
                      </span>
                    </p>
                    <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                      {p.name} · Today · {p.time}
                    </p>
                  </div>
                  <span
                    className={`text-sm font-semibold tabular-nums ${
                      p.status === "win"
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-red-500 dark:text-red-400"
                    }`}
                  >
                    {p.pnl}
                  </span>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                      p.status === "win"
                        ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                        : "bg-red-500/15 text-red-500 dark:text-red-400"
                    }`}
                  >
                    {p.status === "win" ? <Check size={15} /> : <X size={15} />}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* ------------------------- RIGHT: accuracy calendar ------------------------- */}
          <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">
              Accuracy calendar
            </p>
            <h3 className="mt-3 flex items-center gap-2 text-2xl font-semibold">
              Every day, scored.
              <TrendingUp className="h-6 w-6 text-emerald-500" />
            </h3>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Green days hit 60–70% accuracy. Red days, we own them. No cherry-picking.
            </p>

            {/* month header */}
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-semibold">
                {MONTHS[cursor.m]} {cursor.y}
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => move(-1)}
                  aria-label="Previous month"
                  className="rounded-full border border-zinc-200 p-1.5 text-zinc-500 transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => move(1)}
                  aria-label="Next month"
                  className="rounded-full border border-zinc-200 p-1.5 text-zinc-500 transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* calendar grid */}
            <div className="mt-3 rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800">
              <div className="grid grid-cols-7 gap-1.5 text-center text-[11px] font-medium text-zinc-400">
                {WEEKDAYS.map((w, i) => (
                  <span key={i}>{w}</span>
                ))}
              </div>
              <div className="mt-2 grid grid-cols-7 gap-1.5">
                {Array.from({ length: lead }).map((_, i) => (
                  <span key={"blank" + i} />
                ))}
                {days.map((d) => {
                  const win = d.accuracy >= 60;
                  return (
                    <div
                      key={d.day}
                      title={`${d.accuracy}% accuracy${d.allStocks ? " · all stocks picked" : ""}`}
                      className={`relative flex h-11 flex-col items-center justify-center rounded-lg text-xs font-semibold transition ${
                        win
                          ? "bg-emerald-500/90 text-white hover:bg-emerald-500"
                          : "bg-red-500/85 text-white hover:bg-red-500"
                      } ${isToday(d.day) ? "ring-2 ring-zinc-900 ring-offset-2 ring-offset-white dark:ring-white dark:ring-offset-zinc-900" : ""}`}
                    >
                      {d.day}
                      <span className="text-[9px] font-normal opacity-80">{d.accuracy}%</span>
                      {d.allStocks && (
                        <Flame
                          size={10}
                          className="absolute -right-0.5 -top-0.5 rounded-full bg-amber-400 p-0.5 text-zinc-900"
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* legend */}
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-500 dark:text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded bg-emerald-500" /> 60%+ win day
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded bg-red-500/85" /> Losing day
                </span>
                <span className="flex items-center gap-1.5">
                  <Flame size={12} className="text-amber-400" /> All stocks picked
                </span>
              </div>
            </div>

            {/* stats footer */}
            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              {[
                { label: "Avg accuracy", value: `${winRate}%` },
                { label: "Green days", value: String(green.length) },
                { label: "Red days", value: String(red.length) },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-zinc-200 px-3 py-3 dark:border-zinc-800"
                >
                  <p className="text-lg font-semibold tabular-nums">{s.value}</p>
                  <p className="text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="https://optionxi.com"
            className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            <Radio size={16} />
            Get today&apos;s picks — free
          </a>
        </div>
      </div>
    </section>
  );
}