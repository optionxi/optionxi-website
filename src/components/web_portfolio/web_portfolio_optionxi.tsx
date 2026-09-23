"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Check,
  X,
  Radio,
  TrendingUp,
  Flame,
  ArrowLeft,
  Bell,
  MessageCircle,
  ChevronRight,
} from "lucide-react";
import { supabase } from "@/lib/supabase-client";

interface ParsedSymbol {
  exchange: string;
  symbol: string;
  segment: string;
}

function parseSymbol(value: string): ParsedSymbol {
  const [exchange = "", rest = ""] = value.split(":");

  const [symbol = "", segment = ""] = rest.split("-");

  return {
    exchange,
    symbol,
    segment,
  };
}

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

// A single cell in the calendar grid. `data` is null for weekends/holidays
// or any day outside the fetched accuracy window.
interface CalendarDay {
  date: string; // yyyy-mm-dd
  dayOfMonth: number;
  isWeekend: boolean;
  inRange: boolean; // true if this date actually has an accuracy row
  data: DailyAccuracy | null;
}

const MAX_LIVE_PICKS = 5;
const ACCURACY_DAYS = 14;
const PICKS_FETCH_LIMIT = 200; // enough to cover two weeks of picks for day filtering
const POLL_MS = 2 * 60 * 1000;

const WEEKDAY_HEADERS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Slow "storytelling" reveal: picks land one at a time, then the demo
// auto-selects a previous day and reveals that day's picks too.
const AUTOPLAY_REVEAL_COUNT = 4; // stocks shown per day before advancing
const AUTOPLAY_REVEAL_INTERVAL_MS = 1000; // gap between each stock appearing
const AUTOPLAY_DAY_HOLD_MS = 1400; // pause once a day's stocks are all shown
const AUTOPLAY_EMPTY_DAY_SKIP_MS = 500; // skip quickly past days with no picks

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

// yyyy-mm-dd from a local Date, without any UTC shifting.
function formatDateKey(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// Turns the flat accuracy rows into full calendar weeks (Sun -> Sat),
// padding out to complete weeks so weekends/holidays always show up
// as their own gray cells alongside the scored trading days.
function buildCalendarWeeks(accuracy: DailyAccuracy[]): CalendarDay[][] {
  if (accuracy.length === 0) return [];

  const byDate = new Map(accuracy.map((d) => [d.pick_date, d]));
  const timestamps = accuracy.map((d) => new Date(`${d.pick_date}T00:00:00`).getTime());
  const minDate = new Date(Math.min(...timestamps));
  const maxDate = new Date(Math.max(...timestamps));

  const start = new Date(minDate);
  start.setDate(start.getDate() - start.getDay()); // rewind to Sunday
  const end = new Date(maxDate);
  end.setDate(end.getDate() + (6 - end.getDay())); // forward to Saturday

  const days: CalendarDay[] = [];
  const cursor = new Date(start);
  while (cursor <= end) {
    const key = formatDateKey(cursor);
    const dow = cursor.getDay();
    days.push({
      date: key,
      dayOfMonth: cursor.getDate(),
      isWeekend: dow === 0 || dow === 6,
      inRange: byDate.has(key),
      data: byDate.get(key) ?? null,
    });
    cursor.setDate(cursor.getDate() + 1);
  }

  const weeks: CalendarDay[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white/60 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-400 sm:px-4 sm:py-1.5 sm:text-xs">
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

  // Slow-reveal / auto-cycle state: picks appear one at a time, then the
  // demo hops to the next previous day and reveals its picks too.
  const [autoPlaying, setAutoPlaying] = useState(true);
  const [cycleIndex, setCycleIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(0);

  // Subscribe dialog (Play Store / Web / support).
  const [showSubscribeDialog, setShowSubscribeDialog] = useState(false);

  // Track which accuracy days the user has already "seen" rendered, so
  // only genuinely new day-cells get the entrance animation on later polls.
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
      // oldest -> newest so the calendar reads left to right, top to bottom
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

  // Mark newly-arrived accuracy days so they get a "just landed" entrance
  // animation on the calendar grid.
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

  const calendarWeeks = useMemo(() => buildCalendarWeeks(accuracy), [accuracy]);

  const calendarRangeLabel = useMemo(() => {
    if (!accuracy.length) return "";
    const first = new Date(`${accuracy[0].pick_date}T00:00:00`);
    const last = new Date(`${accuracy[accuracy.length - 1].pick_date}T00:00:00`);
    const fmt = (d: Date) =>
      d.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
    const a = fmt(first);
    const b = fmt(last);
    return a === b ? a : `${a} – ${b}`;
  }, [accuracy]);

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

  // The sequence the demo walks through: live picks first, then each
  // previous day that actually has picks, most recent first.
  const autoplaySequence = useMemo(() => {
    const pastDays = accuracy
      .filter((d) => d.total_picks > 0)
      .map((d) => d.pick_date)
      .reverse(); // most recent day first
    return [null as string | null, ...pastDays];
  }, [accuracy]);

  // Keep selectedDate in sync with the autoplay cycle while it's running.
  useEffect(() => {
    if (!autoPlaying || loading || autoplaySequence.length === 0) return;
    const date = autoplaySequence[cycleIndex % autoplaySequence.length];
    setSelectedDate(date);
  }, [autoPlaying, loading, cycleIndex, autoplaySequence]);

  // Reveal ticker: one stock every second, then hold, then move to the
  // next day in the sequence (and loop back to live once it runs out).
  useEffect(() => {
    if (!autoPlaying || loading || errored || autoplaySequence.length === 0) {
      return;
    }

    const cap = Math.min(AUTOPLAY_REVEAL_COUNT, displayedPicks.length);

    if (cap === 0) {
      const t = setTimeout(() => {
        setVisibleCount(0);
        setCycleIndex((i) => (i + 1) % autoplaySequence.length);
      }, AUTOPLAY_EMPTY_DAY_SKIP_MS);
      return () => clearTimeout(t);
    }

    if (visibleCount < cap) {
      const t = setTimeout(
        () => setVisibleCount((c) => c + 1),
        AUTOPLAY_REVEAL_INTERVAL_MS
      );
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setVisibleCount(0);
      setCycleIndex((i) => (i + 1) % autoplaySequence.length);
    }, AUTOPLAY_DAY_HOLD_MS);
    return () => clearTimeout(t);
  }, [autoPlaying, loading, errored, visibleCount, displayedPicks, autoplaySequence]);

  // What actually gets rendered: capped to visibleCount while auto-playing,
  // shown in full once the user takes over manually.
  const revealedPicks = useMemo(() => {
    if (!autoPlaying) return displayedPicks;
    return displayedPicks.slice(0, visibleCount);
  }, [displayedPicks, visibleCount, autoPlaying]);

  const handleDayClick = (d: DailyAccuracy) => {
    if (d.total_picks === 0) return;
    setAutoPlaying(false);
    setVisibleCount(MAX_LIVE_PICKS);
    setSelectedDate((cur) => (cur === d.pick_date ? null : d.pick_date));
  };

  const goToLive = () => {
    setAutoPlaying(false);
    setVisibleCount(MAX_LIVE_PICKS);
    setSelectedDate(null);
  };

  const resumeAutoplay = () => {
    setCycleIndex(0);
    setVisibleCount(0);
    setAutoPlaying(true);
  };

  return (
    <section className="relative overflow-hidden bg-zinc-50 py-16 text-zinc-900 transition-colors dark:bg-zinc-950 dark:text-zinc-50 sm:py-24">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl dark:bg-emerald-500/10" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <Pill>Stock Picks</Pill>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:mt-6 sm:text-4xl md:text-5xl">
            Every pick. Tracked.{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              On the record.
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-zinc-600 dark:text-zinc-400 sm:mt-4 sm:text-lg">
            No crystal ball — just stocks that clear a technical checklist:
            clean breakouts, rising volume, strong momentum. Every pick is
            tracked against real prices, wins and losses alike.
          </p>
        </div>

        <div className="text-center">
          <button
            onClick={() => setShowSubscribeDialog(true)}
            className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-3 text-xs font-semibold text-white transition hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 sm:px-7 sm:py-3.5 sm:text-sm"
          >
            <Bell size={16} />
            Subscribe to get notified
          </button>
        </div>
        <br/>

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
          {/* ------------------------- LEFT: live picks ------------------------- */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:rounded-3xl sm:p-8">
            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400 sm:text-xs">
              {selectedDate ? "Picks for that day" : "Live picks"}
            </p>
            <h3 className="mt-2 text-xl font-semibold sm:mt-3 sm:text-2xl">
              {selectedDate ? fullDayLabel(selectedDate) : "Pick. Track. Repeat."}
            </h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 sm:text-base">
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
                onClick={goToLive}
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-200 dark:hover:bg-zinc-800 sm:mt-6 sm:px-4 sm:py-2 sm:text-sm"
              >
                <ArrowLeft size={14} />
                Back to live picks
              </button>
            ) : (
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs dark:border-zinc-700 dark:bg-zinc-800/60 sm:mt-6 sm:px-4 sm:py-2 sm:text-sm">
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

            {!autoPlaying && (
              <button
                onClick={resumeAutoplay}
                className="ml-2 mt-4 inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 hover:underline dark:text-emerald-400 sm:ml-3 sm:mt-6 sm:text-xs"
              >
                ▶ Resume auto-play
              </button>
            )}

            <ul
              className={`mt-4 space-y-2 sm:mt-6 sm:space-y-3 ${
                selectedDate ? "max-h-80 overflow-y-auto pr-1 sm:max-h-96" : ""
              }`}
            >
              {loading &&
                Array.from({ length: 3 }).map((_, i) => (
                  <li
                    key={i}
                    className="h-14 animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-800/40 sm:h-16 sm:rounded-2xl"
                  />
                ))}

              {!loading && errored && (
                <p className="text-xs text-zinc-500 dark:text-zinc-400 sm:text-sm">
                  Couldn&apos;t load picks right now.
                </p>
              )}

              {!loading && !errored && displayedPicks.length === 0 && (
                <p className="text-xs text-zinc-500 dark:text-zinc-400 sm:text-sm">
                  {selectedDate
                    ? "No picks recorded for that day."
                    : "No picks scored yet — check back once the market opens."}
                </p>
              )}

              {!loading &&
                !errored &&
                revealedPicks.map((p, i) => {
                  const bullish = p.sentiment === "BULLISH";
                  const parsed = parseSymbol(p.symbol);

                  const logoUrl = `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/${parsed.symbol}.png`;

                  return (
                    <li
                      key={pickKey(p)}
                      style={{ animationDelay: `${i * 90}ms` }}
                      className="opxi-enter-row flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50/60 px-3 py-2.5 dark:border-zinc-800 dark:bg-zinc-950/40 sm:gap-4 sm:rounded-2xl sm:px-4 sm:py-3"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800 sm:h-10 sm:w-10">
                        <img
                          src={logoUrl}
                          alt={`${parsed.symbol} logo`}
                          className="h-full w-full object-contain p-1 sm:p-1.5"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            e.currentTarget.parentElement!.innerText =
                              parsed.symbol.slice(0, 2);
                          }}
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-semibold sm:text-sm">
                          {parsed.symbol}{" "}
                          <span className="font-normal text-zinc-500 dark:text-zinc-400">
                            picked · {bullish ? "Long" : "Short"}
                          </span>
                        </p>

                        <p className="truncate text-[10px] text-zinc-500 dark:text-zinc-400 sm:text-xs">
                          {dayLabel(p.pick_date)} · {timeIST(p.entry_time)}
                        </p>
                      </div>

                      <span
                        className={`text-xs font-semibold tabular-nums sm:text-sm ${
                          p.pnl_pcnt >= 0
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-red-500 dark:text-red-400"
                        }`}
                      >
                        {p.pnl_pcnt >= 0 ? "+" : ""}
                        {p.pnl_pcnt.toFixed(2)}%
                      </span>

                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full sm:h-7 sm:w-7 ${
                          p.status === "win"
                            ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                            : p.status === "loss"
                              ? "bg-red-500/15 text-red-500 dark:text-red-400"
                              : "bg-zinc-300/40 text-zinc-500 dark:bg-zinc-700/40 dark:text-zinc-400"
                        }`}
                        title={p.status === "pending" ? "Market still open" : p.status}
                      >
                        {p.status === "win" ? (
                          <Check size={13} />
                        ) : p.status === "loss" ? (
                          <X size={13} />
                        ) : (
                          <span className="text-[9px] font-bold">…</span>
                        )}
                      </span>
                    </li>
                  );
                }
                )}
            </ul>
          </div>

          {/* ------------------------- RIGHT: 14-day accuracy calendar ------------------------- */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:rounded-3xl sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-2 sm:gap-3">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400 sm:text-xs">
                  14-day accuracy
                </p>
                <h3 className="mt-2 flex items-center gap-2 text-xl font-semibold sm:mt-3 sm:text-2xl">
                  Two weeks, scored.
                  <TrendingUp className="h-5 w-5 text-emerald-500 sm:h-6 sm:w-6" />
                </h3>
              </div>
              {!loading && calendarRangeLabel && (
                <span className="mt-1 shrink-0 rounded-full border border-zinc-200 px-2 py-0.5 text-[10px] font-medium text-zinc-500 dark:border-zinc-800 dark:text-zinc-400 sm:px-3 sm:py-1 sm:text-[11px]">
                  {calendarRangeLabel}
                </span>
              )}
            </div>
            <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 sm:text-sm md:text-base">
              &ldquo;Accuracy&rdquo; just means how many picks that day turned
              out to be winners. Green days hit 60%+, red days we own too.
              Weekends and market holidays sit greyed out. Tap a trading day
              to see exactly which stocks were picked.
            </p>

            <div className="mt-4 rounded-xl border border-zinc-200 p-3 dark:border-zinc-800 sm:mt-6 sm:rounded-2xl sm:p-4">
              {/* Weekday header row */}
              <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
                {WEEKDAY_HEADERS.map((wd) => (
                  <div
                    key={wd}
                    className="pb-1 text-center text-[9px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 sm:text-[10px]"
                  >
                    {wd}
                  </div>
                ))}
              </div>

              {loading && (
                <div className="mt-1.5 grid grid-cols-7 gap-1 sm:gap-1.5">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square animate-pulse rounded-md bg-zinc-100 dark:bg-zinc-800/40 sm:rounded-lg"
                    />
                  ))}
                </div>
              )}

              {!loading &&
                calendarWeeks.map((week, wi) => (
                  <div key={wi} className="mt-1.5 grid grid-cols-7 gap-1 sm:gap-1.5">
                    {week.map((cell, ci) => {
                      const d = cell.data;
                      const pct = d?.accuracy_pct ?? null;
                      const win = pct !== null && pct >= 60;
                      const isHoliday = !d || d.total_picks === 0;
                      const clickable = !!d && d.total_picks > 0;
                      const isSelected = selectedDate === cell.date;
                      const isFresh = freshDays.has(cell.date);

                      return (
                        <button
                          key={cell.date}
                          type="button"
                          disabled={!clickable}
                          onClick={() => d && handleDayClick(d)}
                          style={isFresh ? { animationDelay: `${(wi * 7 + ci) * 60}ms` } : undefined}
                          title={
                            d
                              ? pct !== null
                                ? `${fullDayLabel(cell.date)} · ${pct}% · ${d.wins}W / ${d.losses}L${
                                    d.has_pending ? " · still live" : ""
                                  }`
                                : clickable
                                ? `${fullDayLabel(cell.date)} · no result yet${d.has_pending ? " · live" : ""}`
                                : `${fullDayLabel(cell.date)} · no picks`
                              : `${fullDayLabel(cell.date)} · weekend / holiday`
                          }
                          className={`relative flex aspect-square flex-col items-center justify-center gap-0.5 rounded-md text-[9px] font-semibold transition-transform sm:rounded-lg sm:text-[11px] ${
                            isHoliday
                              ? "bg-zinc-100 text-zinc-400 dark:bg-zinc-800/40 dark:text-zinc-600"
                              : pct === null
                              ? "bg-zinc-300 text-white dark:bg-zinc-700"
                              : win
                              ? "bg-emerald-500/90 text-white"
                              : "bg-red-500/85 text-white"
                          } ${
                            clickable
                              ? "cursor-pointer hover:scale-105"
                              : "cursor-default opacity-70"
                          } ${
                            isSelected
                              ? "ring-2 ring-offset-1 ring-zinc-900 dark:ring-white dark:ring-offset-zinc-900 sm:ring-offset-2"
                              : ""
                          } ${isFresh ? "opxi-enter-day" : ""}`}
                        >
                          <span className="text-[8px] font-normal opacity-70 sm:text-[10px]">
                            {cell.dayOfMonth}
                          </span>
                          <span>
                            {isHoliday ? "·" : pct !== null ? `${pct}%` : "—"}
                          </span>
                          {d?.has_pending && (
                            <Flame
                              size={8}
                              className="absolute -right-0.5 -top-0.5 rounded-full bg-amber-400 p-0.5 text-zinc-900 sm:h-3 sm:w-3"
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}

              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[10px] text-zinc-500 dark:text-zinc-400 sm:mt-4 sm:gap-x-4 sm:gap-y-2 sm:text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded bg-emerald-500 sm:h-3 sm:w-3" /> 60%+ win day
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded bg-red-500/85 sm:h-3 sm:w-3" /> Losing day
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded bg-zinc-100 dark:bg-zinc-800/40 sm:h-3 sm:w-3" /> Weekend / holiday
                </span>
                <span className="flex items-center gap-1.5">
                  <Flame size={10} className="text-amber-400 sm:h-3 sm:w-3" /> Still live
                </span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center sm:mt-5 sm:gap-3">
              {[
                { label: "Avg accuracy", value: `${avgAccuracy}%` },
                { label: "Green days", value: String(greenDays) },
                { label: "Red days", value: String(redDays) },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-zinc-200 px-2 py-2 dark:border-zinc-800 sm:rounded-2xl sm:px-3 sm:py-3"
                >
                  <p className="text-base font-semibold tabular-nums sm:text-lg">{s.value}</p>
                  <p className="text-[9px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 sm:text-[11px]">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        
      </div>

      {/* ------------------------- Subscribe dialog ------------------------- */}
      {showSubscribeDialog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
          onClick={() => setShowSubscribeDialog(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl dark:border-zinc-800 dark:bg-zinc-900 sm:rounded-3xl sm:p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 sm:h-9 sm:w-9">
                  <Bell size={14} />
                </span>
                <h4 className="text-base font-semibold sm:text-lg">
                  Get notified for every pick
                </h4>
              </div>
              <button
                onClick={() => setShowSubscribeDialog(false)}
                className="rounded-full p-1 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            <p className="mt-3 text-xs text-zinc-600 dark:text-zinc-400 sm:text-sm">
              OptionXi is available on the Play Store and on the web — pick
              whichever works for you.
            </p>

            {/* Store buttons — same style as the landing page */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:mt-5 sm:gap-3">
              {/* Play Store badge (official Google Play image) */}
              <a
                href="https://play.google.com/store/apps/details?id=com.optionxi.app"
                target="_blank"
                rel="noreferrer"
                className="inline-flex justify-center transition-transform hover:scale-105"
              >
                <img
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                  alt="Get it on Google Play"
                  className="h-12 w-auto sm:h-14"
                />
              </a>

              {/* Web Terminal */}
              <a
                href="https://app.optionxi.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 px-4 py-3 font-semibold text-zinc-900 transition-colors hover:bg-emerald-500/5 dark:border-zinc-700 dark:text-zinc-50 sm:px-5 sm:py-3.5"
              >
                <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs sm:text-sm">Open Web Terminal</span>
                <ChevronRight size={14} className="shrink-0 sm:h-4 sm:w-4" />
              </a>
            </div>

            <a
              href="mailto:support@optionxi.com"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-zinc-900 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 sm:mt-5 sm:py-3 sm:text-sm"
            >
              <MessageCircle size={14} />
              Chat with support
            </a>
          </div>
        </div>
      )}

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