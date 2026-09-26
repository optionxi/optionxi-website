"use client";

import { useState } from "react";
import { Check, ChevronDown, ExternalLink } from "lucide-react";

/**
 * Pricing + FAQ — OptionXI
 *
 * Grounded in the actual product (see optionxi-flutter-community):
 *  - Free tier maps to what ships today: virtual trading, basic alerts,
 *    basic backtesting, standard screener.
 *  - Pro unlocks the heavier analytics: Pro screener, sector strength,
 *    AI stock picks, option-chain/OI tools, real-time alerts, unlimited
 *    backtests.
 *  - Algo is the "coming soon" tier from the roadmap: strategy deployment
 *    + broker hub (Fyers, Upstox) for going from paper to live.
 *
 * Self-contained: no external theme/props, dark mode via Tailwind's
 * `dark:` variant throughout.
 */

type Plan = {
  key: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  popular?: boolean;
  features: string[];
  cta: { label: string; href: string; external?: boolean };
};

const PLANS: Plan[] = [
  {
    key: "free",
    name: "Free",
    tagline: "Everything you need to start practicing",
    monthlyPrice: 0,
    features: [
      "Virtual trading — NIFTY 50, BankNIFTY & Options",
      "Basic price & watchlist alerts",
      "Backtest up to 3 saved strategies",
      "Standard stock screener",
      "Community support",
    ],
    cta: {
      label: "Get the app",
      href: "https://play.google.com/store/apps/details?id=com.optionxi.app",
      external: true,
    },
  },
  {
    key: "pro",
    name: "Pro",
    tagline: "For traders who screen and backtest daily",
    monthlyPrice: 800,
    popular: true,
    features: [
      "Everything in Free",
      "Pro screener with sector strength filters",
      "Real-time alerts, not just end-of-day",
      "Unlimited saved backtests",
      "AI-generated stock picks",
      "Option chain & OI analytics",
    ],
    cta: { label: "Choose Pro", href: "#" },
  },
  {
    key: "algo",
    name: "Algo",
    tagline: "Deploy up to 3 custom algos from paper to live",
    monthlyPrice: 1500,
    features: [
      "Everything in Pro",
      "3 custom algo deployments",
      "Algo strategy deployment",
      "Broker hub — Fyers & Upstox",
      "Priority alert delivery",
      "Early access to new modules",
    ],
    cta: { label: "Choose Algo", href: "#" },
  },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "Is OptionXI actually free, or is that a trial?",
    a: "The Free plan has no trial clock and no card required. Virtual trading, basic alerts, and basic backtesting stay free for as long as you use the app. Pro and Algo exist for traders who want deeper screeners and faster alerts on top of that — you can upgrade, downgrade, or cancel whenever you like.",
  },
  {
    q: "Is this real-money trading?",
    a: "No. OptionXI is a paper trading simulator built on real (and previous-day) NSE market data for NIFTY, BankNIFTY, and options — so the numbers behave like the real market, but nothing you place risks actual money. It's built for learning and strategy testing first.",
  },
  {
    q: "Will I ever be able to trade with real money?",
    a: "That's on the roadmap, not in the app today. Live execution is planned through broker integrations — Fyers and Upstox — which is what the Algo plan's broker hub is being built for. Until that ships, every order in OptionXI is virtual.",
  },
  {
    q: "What's actually different between the plans?",
    a: "Free covers the core loop: practice trading, a standard screener, basic watchlist alerts, and a handful of saved backtests. Pro removes those limits and adds the heavier analytics — sector strength, AI stock picks, option-chain/OI tools, and real-time alerts. Algo adds up to 3 custom algo deployments and broker connections on top.",
  },
  {
    q: "Is OptionXI open source?",
    a: "Yes. The Flutter app is open source under the MIT license, and the backend (Supabase/Postgres) is being open-sourced as well. Contributions, bug reports, and feature suggestions are welcome on GitHub.",
  },
  {
    q: "How do alerts work?",
    a: "Set an alert on a stock or your watchlist and OptionXI notifies you when it triggers. Free includes basic price and watchlist alerts; Pro and Algo deliver them faster, which matters most around breakouts and options IV spikes.",
  },
  {
    q: "Can I switch or cancel a paid plan anytime?",
    a: "Yes — plans are month-to-month by default, with an annual option that works out to two months free. Switching or cancelling takes effect with no lock-in.",
  },
];

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      {/* ----------------------------- Pricing ----------------------------- */}
      <section
        id="pricing"
        className="relative overflow-visible border-y border-slate-200 bg-slate-50 py-24 dark:border-neutral-800 dark:bg-neutral-950"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 0%, black, transparent)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-4 max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
              Pricing
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl dark:text-white">
              Start free, upgrade when the screener earns its keep
            </h2>
          </div>
          <p className="mb-8 max-w-2xl text-slate-600 dark:text-slate-400">
            Virtual trading, basic alerts, and basic backtesting are free —
            full stop. Pro and Algo are for traders who want the deeper
            screeners, faster alerts, and a path to live execution.
          </p>

          {/* Billing toggle */}
          <div className="mb-12 flex items-center gap-3">
            <span
              className={`text-sm font-medium ${
                !isAnnual ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"
              }`}
            >
              Monthly
            </span>
            <button
              role="switch"
              aria-checked={isAnnual}
              onClick={() => setIsAnnual((v) => !v)}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                isAnnual ? "bg-emerald-600" : "bg-slate-300 dark:bg-neutral-700"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                  isAnnual ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
            <span
              className={`text-sm font-medium ${
                isAnnual ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"
              }`}
            >
              Annual
            </span>
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              Save 2 months
            </span>
          </div>

          {/* pt-4 gives the "Most popular" badge headroom so it is never clipped */}
          <div className="grid items-start gap-6 pt-4 md:grid-cols-3">
            {PLANS.map((p) => {
              const displayPrice = isAnnual
                ? Math.round((p.monthlyPrice * 10) / 12)
                : p.monthlyPrice;

              return (
                <div
                  key={p.key}
                  className={`relative h-full rounded-2xl p-[1px] ${
                    p.popular ? "z-10" : ""
                  }`}
                  style={{
                    background: p.popular
                      ? "linear-gradient(160deg, rgba(16,185,129,0.9), rgba(16,185,129,0.05) 55%, rgba(16,185,129,0.4))"
                      : undefined,
                  }}
                >
                  <div
                    className={`relative flex h-full flex-col rounded-2xl border p-8 transition-transform duration-200 will-change-transform hover:-translate-y-1 ${
                      p.popular
                        ? "border-transparent bg-white shadow-xl shadow-emerald-500/10 dark:bg-neutral-900"
                        : "border-slate-200 bg-white shadow-sm hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
                    }`}
                  >
                    {p.popular && (
                      <span className="absolute -top-3 left-8 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                        Most popular
                      </span>
                    )}

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {p.name}
                    </h3>
                    <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
                      {p.tagline}
                    </p>

                    <div className="mb-1 flex items-baseline gap-1">
                      <span className="font-mono text-4xl font-extrabold text-slate-900 dark:text-white">
                        {p.monthlyPrice === 0 ? "₹0" : `₹${displayPrice}`}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400">
                        /month
                      </span>
                    </div>
                    <div className="mb-6 h-4 text-xs text-slate-500 dark:text-slate-400">
                      {p.monthlyPrice === 0
                        ? "No card required"
                        : isAnnual
                        ? `Billed ₹${p.monthlyPrice * 10} yearly`
                        : "Billed monthly"}
                    </div>

                    <ul className="mb-8 space-y-3">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm">
                          <Check
                            size={16}
                            className="mt-0.5 flex-shrink-0 text-emerald-500"
                          />
                          <span className="text-slate-600 dark:text-slate-400">
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* mt-auto pushes CTA to the bottom so all cards align */}
                    <a
                      href={p.cta.href}
                      target={p.cta.external ? "_blank" : undefined}
                      rel={p.cta.external ? "noopener noreferrer" : undefined}
                      className={`mt-auto flex w-full items-center justify-center gap-1.5 rounded-xl py-3 text-sm font-semibold transition-colors ${
                        p.popular
                          ? "bg-emerald-600 text-white hover:bg-emerald-700"
                          : "border border-slate-200 text-slate-900 hover:bg-slate-50 dark:border-neutral-800 dark:text-white dark:hover:bg-neutral-800"
                      }`}
                    >
                      {p.cta.label}
                      {p.cta.external && <ExternalLink size={14} />}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-8 text-center text-xs text-slate-500 dark:text-slate-400">
            No card required for the free plan · Cancel or switch plans
            anytime · Educational, virtual trading only — no real money is
            ever placed
          </p>
        </div>
      </section>

      {/* -------------------------------- FAQ -------------------------------- */}
      <section className="bg-white py-24 dark:bg-neutral-950">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-12 max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
              FAQ
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl dark:text-white">
              Questions traders actually ask
            </h2>
          </div>

          <div className="divide-y divide-slate-200 border-t border-b border-slate-200 dark:divide-neutral-800 dark:border-neutral-800">
            {FAQS.map((item, i) => {
              const open = openFaq === i;
              return (
                <div key={item.q}>
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="text-base font-medium text-slate-900 dark:text-white">
                      {item.q}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`flex-shrink-0 text-slate-400 transition-transform duration-200 ${
                        open ? "rotate-180 text-emerald-500" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid overflow-hidden transition-all duration-200 ${
                      open ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="min-h-0">
                      <p className="max-w-[65ch] text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}