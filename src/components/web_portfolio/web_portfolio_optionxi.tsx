"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Check, X, Radio, TrendingUp, Flame, ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase-client";

/* ------------------------------------------------------------------ */
/* Types — mirror opxi_portfolio / opxi_daily_accuracy                 */
/* ------------------------------------------------------------------ */

type PickStatus = "pending" | "win" | "loss";

interface PortfolioRow {
  symbol: string;
  pick_date: string; // yyyy-mm-dd
  sentiment: "BULLISH" | "BEARISH";
  entry_time: string;
  entry_price: number;
  eval_time: string;
  eval_price: number;
  pnl_pcnt: number;
  status: PickStatus;
  is_final: boolean;
}

interface DailyAccuracy {
  pick_date: string;
  total_picks: number;
  wins: number;
  losses: number;
  accuracy_pct: number | null; // null when no win/loss yet (all pending)
  has_pending: boolean;
}

const MAX_LIVE_PICKS = 5;
const ACCURACY_DAYS = 7;
const PICKS_FETCH_LIMIT = 100; // enough to cover a week of picks for day filtering
const POLL_MS = 2 * 60 * 1000;

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function dayLabel(dateStr: string) {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
  });
}

function fullDayLabel(dateStr: string) {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });
}

function timeIST(t: string) {
  return new Date(t).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });
}

function pickKey(p: PortfolioRow) {
  return `${p.symbol}-${p.pick_date}-${p.entry_time}`;
}

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-400">
    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
    {children}
  </span>
);

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export default function PortfolioSection() {
  const [picks, setPicks] = useState<PortfolioRow[]>([]);
  const [accuracy, setAccuracy] = useState<DailyAccuracy[]>([]);
  const [loading, setLoading] = useState(true);
  const [errored, setErrored] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Track which picks the user has already "seen" rendered, so only
  // genuinely new rows get the entrance animation on later polls —
  // this is what makes the list visibly update as new picks land.
  const seenKeysRef = useRef<Set<string>>(new Set());
  const [freshKeys, setFreshKeys] = useState<Set<string>>(new Set());
  const seenDaysRef = useRef<Set<string>>(new Set());
  const [freshDays, setFreshDays] = useState<Set<string>>(new Set());

  const load = useCallback(async () => {
    try {
      const [{ data: pickRows, error: e1 }, { data: accRows, error: e2 }] =
        await Promise.all([
          supabase
            .from("web_portfolio")
            .select("*")
            .order("pick_date", { ascending: false })
            .order("entry_time", { ascending: false })
            .limit(PICKS_FETCH_LIMIT),
          supabase
            .from("web_daily_accuracy")
            .select("*")
            .order("pick_date", { ascending: false })
            .limit(ACCURACY_DAYS),
        ]);

      if (e1 || e2) throw e1 ?? e2;

      setPicks((pickRows as PortfolioRow[]) ?? []);
      // oldest -> newest so the strip reads left to right
      setAccuracy(((accRows as DailyAccuracy[]) ?? []).slice().reverse());
      setErrored(false);
    } catch (err) {
      console.error("PortfolioSection load failed", err);
      setErrored(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const id = setInterval(load, POLL_MS);
    return () => clearInterval(id);
  }, [load]);

  // Mark newly-arrived picks so they get a "just landed" entrance animation.
  useEffect(() => {
    if (!picks.length) return;
    const newly = picks.map(pickKey).filter((k) => !seenKeysRef.current.has(k));
    if (newly.length) {
      newly.forEach((k) => seenKeysRef.current.add(k));
      setFreshKeys(new Set(newly));
      const t = setTimeout(() => setFreshKeys(new Set()), newly.length * 160 + 700);
      return () => clearTimeout(t);
    }
  }, [picks]);

  // Same idea for the accuracy strip.
  useEffect(() => {
    if (!accuracy.length) return;
    const newly = accuracy
      .map((d) => d.pick_date)
      .filter((k) => !seenDaysRef.current.has(k));
    if (newly.length) {
      newly.forEach((k) => seenDaysRef.current.add(k));
      setFreshDays(new Set(newly));
      const t = setTimeout(() => setFreshDays(new Set()), newly.length * 90 + 700);
      return () => clearTimeout(t);
    }
  }, [accuracy]);

  const scored = accuracy.filter((d) => d.accuracy_pct !== null);
  const avgAccuracy = scored.length
    ? Math.round(
        scored.reduce((s, d) => s + (d.accuracy_pct ?? 0), 0) / scored.length
      )
    : 0;
  const greenDays = scored.filter((d) => (d.accuracy_pct ?? 0) >= 60).length;
  const redDays = scored.length - greenDays;

  const selectedDayMeta = useMemo(
    () => accuracy.find((d) => d.pick_date === selectedDate) ?? null,
    [accuracy, selectedDate]
  );

  const displayedPicks = useMemo(() => {
    if (selectedDate) {
      return picks.filter((p) => p.pick_date === selectedDate);
    }
    return picks.slice(0, MAX_LIVE_PICKS);
  }, [picks, selectedDate]);

  const handleDayClick = (d: DailyAccuracy) => {
    if (d.total_picks === 0) return;
    setSelectedDate((cur) => (cur === d.pick_date ? null : d.pick_date));
  };

  return (
    <section className="relative overflow-hidden bg-zinc-50 py-24 text-zinc-900 transition-colors dark:bg-zinc-950 dark:text-zinc-50">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl dark:bg-emerald-500/10" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-14 text-center">
          <Pill>Stock Picks</Pill>
          <h2 className="mx-auto mt-6 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Every pick. Tracked.{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              On the record.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
            No crystal ball — just stocks that clear a technical checklist:
            clean breakouts, rising volume, strong momentum. Every pick is
            tracked against real prices, wins and losses alike.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* ------------------------- LEFT: live picks ------------------------- */}
          <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">
              {selectedDate ? "Picks for that day" : "Live picks"}
            </p>
            <h3 className="mt-3 text-2xl font-semibold">
              {selectedDate ? fullDayLabel(selectedDate) : "Pick. Track. Repeat."}
            </h3>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              {selectedDate
                ? `${selectedDayMeta?.total_picks ?? displayedPicks.length} pick${
                    (selectedDayMeta?.total_picks ?? displayedPicks.length) === 1
                      ? ""
                      : "s"
                  } that day, scored against real prices — not a forecast, just what actually happened.`
                : "Each trading day our screener scans for stocks breaking out with strong technicals — then we track the entry price and how it plays out, live."}
            </p>

            {selectedDate ? (
              <button
                onClick={() => setSelectedDate(null)}
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                <ArrowLeft size={14} />
                Back to live picks
              </button>
            ) : (
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
            )}

            <ul
              className={`mt-6 space-y-3 ${
                selectedDate ? "max-h-96 overflow-y-auto pr-1" : ""
              }`}
            >
              {loading &&
                Array.from({ length: 3 }).map((_, i) => (
                  <li
                    key={i}
                    className="h-16 animate-pulse rounded-2xl bg-zinc-100 dark:bg-zinc-800/40"
                  />
                ))}

              {!loading && errored && (
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Couldn&apos;t load picks right now.
                </p>
              )}

              {!loading && !errored && displayedPicks.length === 0 && (
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {selectedDate
                    ? "No picks recorded for that day."
                    : "No picks scored yet — check back once the market opens."}
                </p>
              )}

              {!loading &&
                !errored &&
                displayedPicks.map((p, i) => {
                  const bullish = p.sentiment === "BULLISH";
                  const isFresh = freshKeys.has(pickKey(p));
                  return (
                    <li
                      key={pickKey(p)}
                      style={isFresh ? { animationDelay: `${i * 140}ms` } : undefined}
                      className={`flex items-center gap-4 rounded-2xl border border-zinc-200 bg-zinc-50/60 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950/40 ${
                        isFresh ? "opxi-enter-row" : ""
                      }`}
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white dark:bg-zinc-100 dark:text-zinc-900">
                        {p.symbol.slice(0, 2)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">
                          {p.symbol}{" "}
                          <span className="font-normal text-zinc-500 dark:text-zinc-400">
                            picked · {bullish ? "Long" : "Short"}
                          </span>
                        </p>
                        <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                          {dayLabel(p.pick_date)} · {timeIST(p.entry_time)}
                        </p>
                      </div>
                      <span
                        className={`text-sm font-semibold tabular-nums ${
                          p.pnl_pcnt >= 0
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-red-500 dark:text-red-400"
                        }`}
                      >
                        {p.pnl_pcnt >= 0 ? "+" : ""}
                        {p.pnl_pcnt.toFixed(2)}%
                      </span>
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                          p.status === "win"
                            ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                            : p.status === "loss"
                            ? "bg-red-500/15 text-red-500 dark:text-red-400"
                            : "bg-zinc-300/40 text-zinc-500 dark:bg-zinc-700/40 dark:text-zinc-400"
                        }`}
                        title={p.status === "pending" ? "Market still open" : p.status}
                      >
                        {p.status === "win" ? (
                          <Check size={15} />
                        ) : p.status === "loss" ? (
                          <X size={15} />
                        ) : (
                          <span className="text-[10px] font-bold">…</span>
                        )}
                      </span>
                    </li>
                  );
                })}
            </ul>
          </div>

          {/* ------------------------- RIGHT: 7-day accuracy ------------------------- */}
          <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">
              7-day accuracy
            </p>
            <h3 className="mt-3 flex items-center gap-2 text-2xl font-semibold">
              Last week, scored.
              <TrendingUp className="h-6 w-6 text-emerald-500" />
            </h3>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              &ldquo;Accuracy&rdquo; just means how many picks that day turned
              out to be winners. Green days hit 60%+, red days we own too.
              Tap a day to see exactly which stocks were picked.
            </p>

            <div className="mt-6 rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800">
              <div className="grid grid-cols-7 gap-1.5">
                {loading &&
                  Array.from({ length: ACCURACY_DAYS }).map((_, i) => (
                    <div
                      key={i}
                      className="h-16 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800/40"
                    />
                  ))}

                {!loading &&
                  accuracy.map((d, i) => {
                    const pct = d.accuracy_pct;
                    const win = pct !== null && pct >= 60;
                    const clickable = d.total_picks > 0;
                    const isSelected = selectedDate === d.pick_date;
                    const isFresh = freshDays.has(d.pick_date);
                    return (
                      <button
                        key={d.pick_date}
                        type="button"
                        disabled={!clickable}
                        onClick={() => handleDayClick(d)}
                        style={isFresh ? { animationDelay: `${i * 90}ms` } : undefined}
                        title={
                          pct !== null
                            ? `${pct}% · ${d.wins}W / ${d.losses}L${
                                d.has_pending ? " · still live" : ""
                              }`
                            : clickable
                            ? `No result yet${d.has_pending ? " · live" : ""}`
                            : "No picks that day"
                        }
                        className={`relative flex h-16 flex-col items-center justify-center gap-0.5 rounded-lg text-[11px] font-semibold text-white transition-transform ${
                          pct === null
                            ? "bg-zinc-300 dark:bg-zinc-700"
                            : win
                            ? "bg-emerald-500/90"
                            : "bg-red-500/85"
                        } ${clickable ? "cursor-pointer hover:scale-105" : "cursor-default opacity-70"} ${
                          isSelected ? "ring-2 ring-offset-2 ring-zinc-900 dark:ring-white dark:ring-offset-zinc-900" : ""
                        } ${isFresh ? "opxi-enter-day" : ""}`}
                      >
                        <span>{dayLabel(d.pick_date)}</span>
                        <span className="text-[9px] font-normal opacity-80">
                          {pct !== null ? `${pct}%` : "—"}
                        </span>
                        {d.has_pending && (
                          <Flame
                            size={10}
                            className="absolute -right-0.5 -top-0.5 rounded-full bg-amber-400 p-0.5 text-zinc-900"
                          />
                        )}
                      </button>
                    );
                  })}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-500 dark:text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded bg-emerald-500" /> 60%+ win day
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded bg-red-500/85" /> Losing day
                </span>
                <span className="flex items-center gap-1.5">
                  <Flame size={12} className="text-amber-400" /> Still live
                </span>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              {[
                { label: "Avg accuracy", value: `${avgAccuracy}%` },
                { label: "Green days", value: String(greenDays) },
                { label: "Red days", value: String(redDays) },
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

        <div className="mt-12 text-center">
          <a
            href="https://app.optionxi.com"
            className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            <Radio size={16} />
            Get today&apos;s picks — free
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes opxiRowIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes opxiDayIn {
          from {
            opacity: 0;
            transform: scale(0.85);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .opxi-enter-row {
          opacity: 0;
          animation: opxiRowIn 0.45s ease forwards;
        }
        .opxi-enter-day {
          opacity: 0;
          animation: opxiDayIn 0.35s ease forwards;
        }
      `}</style>
    </section>
  );
}