"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronRight, Shield, GraduationCap, Lock, MessageCircle, CheckCircle2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Turnstile } from "@marsidev/react-turnstile";
import XiFoxMascot from "@/app/components/optionxi-mascot";

type Theme = { sub: string; border: string; text: string };

interface FinalCtaProps {
  dark: boolean;
  t: Theme;
  iconSrc: string;
  onGoogleSignIn?: () => void;
  whatsappEndpoint?: string;
}

type Status = "idle" | "loading" | "waiting" | "success" | "error";

function GoogleLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true" className="shrink-0">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9c4.4-4.1 7-10.1 7-17.6z" />
      <path fill="#FBBC05" d="M10.5 28.7c-.5-1.4-.8-3-.8-4.7s.3-3.2.8-4.7l-7.9-6.1C.9 16.4 0 20.100 0 24s.9 7.600 2.600 10.800l7.900-6.100z" />
      <path fill="#34A853" d="M24 48c6.500 0 11.900-2.100 15.900-5.800l-7.600-5.900c-2.100 1.400-4.900 2.300-8.300 2.300-6.300 0-11.600-4.100-13.500-9.800l-7.900 6.100C6.500 42.600 14.600 48 24 48z" />
    </svg>
  );
}

export default function FinalCta({
  dark,
  t,
  iconSrc,
  onGoogleSignIn,
  whatsappEndpoint = "/api/whatsapp-signup",
}: FinalCtaProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [waUrl, setWaUrl] = useState("");
  const [code, setCode] = useState("");
  const [captcha, setCaptcha] = useState("");
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isMobile =
    typeof navigator !== "undefined" && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const handleGoogle = () => {
    if (onGoogleSignIn) return onGoogleSignIn();
    window.open("https://app.optionxi.com/login?provider=google", "_blank", "noreferrer");
  };

  const startWhatsApp = async () => {
    setStatus("loading");
    setError("");
    try {
      const res = await fetch(whatsappEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "landing-cta", captcha }),
      });
      if (res.status === 429) throw new Error("Too many attempts. Try again in a bit.");
      if (!res.ok) throw new Error("Something went wrong. Please try again.");
      const { code, url } = await res.json();
      setCode(code);
      setWaUrl(url);
      setStatus("waiting");
      if (isMobile) window.location.href = url;
    } catch (e: any) {
      setStatus("error");
      setError(e.message || "Something went wrong.");
    }
  };

  useEffect(() => {
    if (status !== "waiting" || !code) return;
    const started = Date.now();
    pollRef.current = setInterval(async () => {
      if (Date.now() - started > 15 * 60_000) {
        clearInterval(pollRef.current!);
        setStatus("idle");
        return;
      }
      try {
        const r = await fetch(`${whatsappEndpoint}/${code}`);
        if (r.ok && (await r.json()).claimed) {
          clearInterval(pollRef.current!);
          setStatus("success");
        }
      } catch {}
    }, 3000);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [status, code, whatsappEndpoint]);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
      <div
        className="rounded-2xl sm:rounded-3xl border border-emerald-500/20 p-6 sm:p-10 md:p-14 relative overflow-hidden"
        style={{
          background: dark
            ? "linear-gradient(135deg, rgba(16,185,129,0.14), rgba(15,23,42,0))"
            : "linear-gradient(135deg, rgba(16,185,129,0.10), rgba(255,255,255,0))",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -bottom-24 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-40"
          style={{ background: "radial-gradient(circle, rgba(249,114,50,0.35), transparent 70%)" }}
        />

        <div className="relative grid md:grid-cols-[1fr_auto] gap-8 md:gap-12 items-center">
          <div className="order-first md:order-last flex justify-center md:pr-6">
            <XiFoxMascot size={150} className="md:hidden" />
            <XiFoxMascot size={260} className="hidden md:block drop-shadow-xl" />
          </div>

          <div className="text-center md:text-left">
            <img
              src={iconSrc}
              alt="OptionXi"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl mx-auto md:mx-0 mb-4 shadow-lg"
            />
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight mb-3 sm:mb-4">
              Start trading smarter, <span className="text-emerald-600">today</span>
            </h2>
            <p className={`${t.sub} text-base sm:text-lg max-w-xl mx-auto md:mx-0 mb-7`}>
              Free to download. No real money at risk until you&apos;re ready. Open source, always.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 sm:gap-4 mb-6">
              <a
                href="https://play.google.com/store/apps/details?id=com.optionxi.app"
                target="_blank"
                rel="noreferrer"
                className="transition-transform hover:scale-105"
              >
                <img
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                  alt="Get it on Google Play"
                  className="h-14 sm:h-16 w-auto"
                />
              </a>

              <button
                type="button"
                onClick={handleGoogle}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-3 border ${
                  dark ? "border-slate-600 bg-slate-900/60 text-slate-100" : "border-slate-300 bg-white text-slate-800"
                } px-5 py-3.5 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all whitespace-nowrap`}
              >
                <GoogleLogo />
                <span className="text-sm sm:text-base">Continue with Google</span>
              </button>
            </div>

            {/* WhatsApp card — form replaced with button + QR */}
            <div
              className={`rounded-xl border ${t.border} p-4 sm:p-5 max-w-xl mx-auto md:mx-0 text-left ${
                dark ? "bg-slate-900/40" : "bg-white/70"
              }`}
            >
              {status === "success" ? (
                <div className="flex items-start gap-3" role="status">
                  <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={22} />
                  <div>
                    <p className="font-semibold">You&apos;re in! 7-day free trial started.</p>
                    <p className={`${t.sub} text-sm`}>
                      Check WhatsApp, your welcome message is there. Breakout alerts start next market open.
                    </p>
                  </div>
                </div>
              ) : status === "waiting" ? (
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {!isMobile && (
                    <div className="bg-white p-2 rounded-lg shrink-0">
                      <QRCodeSVG value={waUrl} size={120} />
                    </div>
                  )}
                  <div className="text-center sm:text-left">
                    <p className="font-semibold">Send the pre-filled message on WhatsApp</p>
                    <p className={`${t.sub} text-sm mb-3`}>
                      {isMobile ? "Tap below if WhatsApp didn't open." : "Scan with your phone, or open WhatsApp Web."}
                      {" "}Just hit send, we&apos;ll confirm here automatically.
                    </p>
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-5 py-2.5 rounded-lg text-sm"
                    >
                      Open WhatsApp <ChevronRight size={16} />
                    </a>
                    <p className={`${t.sub} text-xs mt-2 animate-pulse`}>Waiting for your message…</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-1">
                    <MessageCircle size={18} className="text-emerald-500" />
                    <h3 className="font-semibold text-sm sm:text-base">
                      Try trade alerts on WhatsApp, free for 7 days
                    </h3>
                  </div>
                  <p className={`${t.sub} text-xs sm:text-sm mb-3`}>
                    Live breakout alerts straight to your chat. No card, no spam, stop anytime.
                  </p>

                  <Turnstile
                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                    onSuccess={setCaptcha}
                    options={{ size: "invisible" }}
                  />

                  <button
                    type="button"
                    onClick={startWhatsApp}
                    disabled={status === "loading" || !captcha}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white font-semibold px-5 py-3 rounded-lg text-sm transition-colors"
                  >
                    <MessageCircle size={16} />
                    {status === "loading" ? "Preparing…" : "Start free trial on WhatsApp"}
                  </button>

                  <p className={`mt-3 text-xs ${t.sub}`}>
                    By sending the message you agree to receive WhatsApp messages from OptionXi.
                    Educational content only, not investment advice.
                  </p>
                  {status === "error" && (
                    <p className="text-red-500 text-xs mt-2" role="alert">
                      {error}
                    </p>
                  )}
                </>
              )}
            </div>

            <div className="mt-5">
              <a
                href="https://app.optionxi.com"
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-2 text-sm font-semibold ${t.text} hover:text-emerald-500 transition-colors`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                Open Web Terminal
                <ChevronRight size={14} />
              </a>
            </div>
          </div>
        </div>

        <div className={`hidden sm:flex relative flex-wrap items-center justify-center gap-8 mt-10 text-sm ${t.sub}`}>
          <div className="flex items-center gap-2">
            <Shield size={15} className="text-emerald-500 shrink-0" /> Open source &amp; auditable
          </div>
          <div className="flex items-center gap-2">
            <GraduationCap size={15} className="text-emerald-500 shrink-0" /> Built for learning
          </div>
          <div className="flex items-center gap-2">
            <Lock size={15} className="text-emerald-500 shrink-0" /> No card needed to start
          </div>
        </div>
      </div>
    </section>
  );
}