"use client";

import { supabase } from "@/lib/supabase-client";
import { useEffect, useState } from "react";

// Matches: public.live_nifty_indices (same schema as live_5000_stocks_upstox)
type IndexRow = {
  id: number;
  symbol: string;
  ltp: number;
  o: number;
  pc: number;
  h: number;
  l: number;
  v: number;
  pcnt: number;
};

type TickerItem = {
  s: string;
  p: string;
  d: string;
  up: boolean;
};

// Theme shape used by the marquee — pass your existing `t` object in, or use the default below.
type Theme = {
  border: string;
  bgAlt: string;
  text: string;
  sub: string;
};

const defaultTheme: Theme = {
  border: "border-neutral-800",
  bgAlt: "bg-neutral-950",
  text: "text-white",
  sub: "text-neutral-400",
};

function toTickerItem(row: IndexRow): TickerItem {
  const up = row.pcnt >= 0;
  return {
    s: row.symbol,
    p: row.ltp.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    d: `${up ? "+" : ""}${row.pcnt.toFixed(2)}%`,
    up,
  };
}

export default function IndicesTicker({
  theme = defaultTheme,
  speedSeconds = 150, // higher = slower scroll. try 40–90 to taste.
}: {
  theme?: Theme;
  speedSeconds?: number;
}) {
  const t = theme;
  const [items, setItems] = useState<TickerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchIndices() {
      const { data, error } = await supabase
        .from("live_nifty_indices")
        .select("*")
        .order("symbol", { ascending: true });

      if (!isMounted) return;

      if (error) {
        setError(error.message);
      } else {
        setItems((data as IndexRow[]).map(toTickerItem));
        setError(null);
      }
      setLoading(false);
    }

    fetchIndices();

    // Live updates: re-render whenever a row in the table changes.
    const channel = supabase
      .channel("live_nifty_indices_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "live_nifty_indices" },
        () => {
          fetchIndices();
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return (
      <div className={`mt-10 border-y ${t.border} ${t.bgAlt} py-3 overflow-hidden`}>
        <div className="flex w-max gap-8 px-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="ticker-skeleton h-4 w-16 rounded" />
              <span className="ticker-skeleton h-4 w-12 rounded" />
              <span className="ticker-skeleton h-4 w-10 rounded" />
            </div>
          ))}
        </div>
        <style jsx>{`
          .ticker-skeleton {
            display: inline-block;
            background: linear-gradient(
              90deg,
              rgba(120, 120, 120, 0.15) 25%,
              rgba(120, 120, 120, 0.3) 37%,
              rgba(120, 120, 120, 0.15) 63%
            );
            background-size: 400% 100%;
            animation: ticker-shimmer 1.4s ease-in-out infinite;
          }
          @keyframes ticker-shimmer {
            0% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0 50%;
            }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`mt-10 border-y ${t.border} ${t.bgAlt} py-2 px-3`}>
        <span className="inline-flex items-center gap-1.5 text-xs text-rose-500">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
          Indices unavailable
        </span>
      </div>
    );
  }

  return (
    <div className={`marquee-wrap mt-10 border-y ${t.border} ${t.bgAlt} py-3 overflow-hidden`}>
      <div
        className="marquee-track flex w-max gap-8"
        style={{ animationDuration: `${speedSeconds}s` }}
      >
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-sm font-mono whitespace-nowrap">
            <span className={`font-semibold ${t.text}`}>{item.s}</span>
            <span className={t.sub}>{item.p}</span>
            <span className={item.up ? "text-emerald-500" : "text-rose-500"}>{item.d}</span>
          </div>
        ))}
      </div>
      <style jsx>{`
        .marquee-track {
          animation-name: marquee-scroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes marquee-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}