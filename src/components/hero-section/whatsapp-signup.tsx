"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CheckCircle2, ChevronRight, MessageCircle } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

/* ------------------------------------------------------------------ */
/*  Shared WhatsApp signup flow (button -> pre-filled message -> poll) */
/*  Save as: app/components/whatsapp-signup.tsx                        */
/*                                                                     */
/*  Captcha is automatic: if NEXT_PUBLIC_TURNSTILE_SITE_KEY is set,    */
/*  Turnstile renders and the button waits for a token. If it's not    */
/*  set, the button works without one.                                 */
/* ------------------------------------------------------------------ */

export type WaStatus = "idle" | "loading" | "waiting" | "success" | "error";
type Theme = { sub: string; border: string; text: string };

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const POLL_MS = 3000;
const GIVE_UP_MS = 15 * 60_000;
const CAPTCHA_WAIT_MS = 15_000;

export function useWhatsAppSignup(source: string, endpoint = "/api/whatsapp-signup") {
  const [status, setStatus] = useState<WaStatus>("idle");
  const [error, setError] = useState("");
  const [waUrl, setWaUrl] = useState("");
  const [code, setCode] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [pending, setPending] = useState(false);
  const turnstileRef = useRef<TurnstileInstance>(null);

  // Read navigator after mount so server and client markup match
  useEffect(() => {
    setIsMobile(/Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
  }, []);

  const needsCaptcha = Boolean(TURNSTILE_SITE_KEY);
  // No longer gated on captcha: while loading we show "Preparing…", and
  // if the token isn't ready yet the click arms `pending` instead of blocking.
  const canStart = status !== "loading";

  const submit = useCallback(
    async (token: string) => {
      setStatus("loading");
      setError("");
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ source, captcha: token }),
        });
        if (res.status === 429) throw new Error("Too many attempts. Try again in a bit.");
        if (!res.ok) throw new Error("Something went wrong. Please try again.");
        const data: { code: string; url: string } = await res.json();
        setCode(data.code);
        setWaUrl(data.url);
        setStatus("waiting");
        if (isMobile) window.location.href = data.url;
      } catch (e) {
        setStatus("error");
        setError(e instanceof Error ? e.message : "Something went wrong.");
      } finally {
        // Turnstile tokens are single-use, so ask for a fresh one
        if (needsCaptcha) {
          setCaptcha("");
          turnstileRef.current?.reset();
        }
      }
    },
    [endpoint, source, isMobile, needsCaptcha],
  );

  const start = useCallback(() => {
    // If a captcha is configured but the token isn't in yet, arm pending
    // and let the challenge finish; the effect below fires the request.
    if (needsCaptcha && !captcha) {
      setStatus("loading");
      setPending(true);
      return;
    }
    void submit(captcha);
  }, [needsCaptcha, captcha, submit]);

  // Token arrived after the click: send now
  useEffect(() => {
    if (pending && captcha) {
      setPending(false);
      void submit(captcha);
    }
  }, [pending, captcha, submit]);

  // Don't hang forever if the challenge never completes (blocked, offline)
  useEffect(() => {
    if (!pending) return;
    const id = setTimeout(() => {
      setPending(false);
      setStatus("error");
      setError("Verification is taking too long. Please refresh and try again.");
    }, CAPTCHA_WAIT_MS);
    return () => clearTimeout(id);
  }, [pending]);

  // Poll until the user's WhatsApp message has been received
  useEffect(() => {
    if (status !== "waiting" || !code) return;
    const started = Date.now();
    const id = setInterval(async () => {
      if (Date.now() - started > GIVE_UP_MS) {
        clearInterval(id);
        setStatus("idle");
        return;
      }
      try {
        const r = await fetch(`${endpoint}/${code}`);
        if (r.ok && (await r.json()).claimed) {
          clearInterval(id);
          setStatus("success");
        }
      } catch {
        /* keep polling */
      }
    }, POLL_MS);
    return () => clearInterval(id);
  }, [status, code, endpoint]);

  return {
    status,
    error,
    waUrl,
    isMobile,
    canStart,
    showStatus: status === "waiting" || status === "success",
    start,
    setCaptcha,
    turnstileRef,
  };
}

export type WhatsAppSignup = ReturnType<typeof useWhatsAppSignup>;

/* ---- The button (also mounts the invisible Turnstile when configured) ---- */

export function WhatsAppButton({
  wa,
  label = "Start free trial on WhatsApp",
  className = "",
}: {
  wa: WhatsAppSignup;
  label?: string;
  className?: string;
}) {
  return (
    <>
      {TURNSTILE_SITE_KEY && (
        <Turnstile
          ref={wa.turnstileRef}
          siteKey={TURNSTILE_SITE_KEY}
          onSuccess={wa.setCaptcha}
          onExpire={() => wa.setCaptcha("")}
          options={{ size: "invisible" }}
        />
      )}
      <button
        type="button"
        onClick={wa.start}
        disabled={!wa.canStart}
        className={`inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white font-semibold transition-colors ${className}`}
      >
        <MessageCircle size={16} />
        {wa.status === "loading" ? "Preparing…" : label}
      </button>
    </>
  );
}

/* ---- Waiting (QR + open link) and success states. Content only; the
        caller supplies the bordered wrapper. Renders nothing otherwise. ---- */

export function WhatsAppStatus({ wa, t }: { wa: WhatsAppSignup; t: Theme }) {
  if (wa.status === "success") {
    return (
      <div className="flex items-start gap-3" role="status">
        <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={22} />
        <div>
          <p className="font-semibold">You&apos;re in! 7-day free trial started.</p>
          <p className={`${t.sub} text-sm`}>
            Check WhatsApp, your welcome message is there. Breakout alerts start next market open.
          </p>
        </div>
      </div>
    );
  }

  if (wa.status === "waiting") {
    return (
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {!wa.isMobile && (
          <div className="bg-white p-2 rounded-lg shrink-0">
            <QRCodeSVG value={wa.waUrl} size={120} />
          </div>
        )}
        <div className="text-center sm:text-left">
          <p className="font-semibold">Send the pre-filled message on WhatsApp</p>
          <p className={`${t.sub} text-sm mb-3`}>
            {wa.isMobile ? "Tap below if WhatsApp didn't open." : "Scan with your phone, or open WhatsApp Web."}{" "}
            Just hit send, we&apos;ll confirm here automatically.
          </p>
          <a
            href={wa.waUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-5 py-2.5 rounded-lg text-sm"
          >
            Open WhatsApp <ChevronRight size={16} />
          </a>
          <p className={`${t.sub} text-xs mt-2 animate-pulse`}>Waiting for your message…</p>
        </div>
      </div>
    );
  }

  return null;
}