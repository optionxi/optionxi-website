"use client";

import { useEffect, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

/**
 * Floating "Get it on Google Play" action, bottom-right.
 *
 * - Desktop/web: hover or click opens a card with a QR code (scan with phone).
 * - Mobile: tapping opens the Play Store listing directly.
 *
 * Install:  npm i qrcode.react
 * Usage:    render <DownloadAppFab /> once in app/layout.tsx (inside <body>).
 */

// TODO: replace with the real OptionXI Play Store link
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.optionxi.app";

function PlayIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3.6 2.4c-.3.3-.5.8-.5 1.4v16.4c0 .6.2 1.1.5 1.4l.1.1 9.2-9.2v-.2L3.7 2.3z" fill="#00D2FF" />
      <path d="M16 15.3l-3.1-3.1v-.2L16 8.9l.1.1 3.7 2.1c1 .6 1 1.5 0 2.1l-3.7 2.1z" fill="#FFCE00" />
      <path d="M16.1 15.2L12.9 12 3.6 21.4c.3.4.9.4 1.5.1l11-6.3" fill="#F43F5E" />
      <path d="M16.1 8.8L5.1 2.5c-.6-.3-1.2-.3-1.5.1L12.9 12z" fill="#22C55E" />
    </svg>
  );
}

export default function DownloadAppFab() {
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ua = navigator.userAgent || "";
    setIsMobile(/Android|iPhone|iPad|iPod/i.test(ua) || window.innerWidth < 768);
    try {
      if (sessionStorage.getItem("oxi-fab-dismissed") === "1") setDismissed(true);
    } catch {}
  }, []);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (dismissed) return null;

  const dismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem("oxi-fab-dismissed", "1");
    } catch {}
  };

  const pill = (
    <>
      <span className="oxi-icon">
        <PlayIcon />
      </span>
      <span className="oxi-text">
        <small>GET IT ON</small>
        <strong>Google Play</strong>
      </span>
    </>
  );

  return (
    <div ref={ref} className="oxi-root">
      {!isMobile && open && (
        <div className="oxi-card" role="dialog" aria-label="Scan to download OptionXI">
          <p className="oxi-title">Get the OptionXI app</p>
          <p className="oxi-sub">Scan with your phone camera</p>
          <div className="oxi-qr">
            <QRCodeSVG value={PLAY_STORE_URL} size={148} level="M" marginSize={0} />
          </div>
          <a className="oxi-link" href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
            or open Google Play →
          </a>
        </div>
      )}

      <div className="oxi-row">
        {isMobile ? (
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="oxi-pill"
            aria-label="Get OptionXI on Google Play"
          >
            {pill}
          </a>
        ) : (
          <button
            type="button"
            className="oxi-pill"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-haspopup="dialog"
            aria-label="Get OptionXI on Google Play"
          >
            {pill}
          </button>
        )}
        <button type="button" className="oxi-close" onClick={dismiss} aria-label="Hide download button">
          ×
        </button>
      </div>

      <style>{`
        .oxi-root {
          position: fixed;
          right: 20px;
          bottom: 20px;
          z-index: 50;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 12px;
          font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
          animation: oxi-in 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }
        @keyframes oxi-in {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: none; }
        }
        .oxi-row { position: relative; display: flex; align-items: center; }
        .oxi-pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 18px 8px 10px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 999px;
          background: #0b0b0f;
          color: #fff;
          text-decoration: none;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(0, 0, 0, 0.2);
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }
        .oxi-pill:hover { transform: translateY(-2px); box-shadow: 0 14px 36px rgba(0, 0, 0, 0.45); }
        .oxi-pill:focus-visible { outline: 3px solid #86efac; outline-offset: 3px; }
        .oxi-icon {
          display: grid;
          place-items: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #fff;
        }
        .oxi-text { display: flex; flex-direction: column; text-align: left; line-height: 1.1; }
        .oxi-text small { font-size: 9px; letter-spacing: 0.08em; opacity: 0.7; }
        .oxi-text strong { font-size: 15px; font-weight: 600; }

        .oxi-close {
          position: absolute;
          top: -8px;
          left: -8px;
          width: 22px;
          height: 22px;
          border: 0;
          border-radius: 50%;
          background: #fff;
          color: #374151;
          font-size: 14px;
          line-height: 1;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          opacity: 0;
          transition: opacity 0.15s ease;
        }
        .oxi-row:hover .oxi-close, .oxi-close:focus-visible { opacity: 1; }

        .oxi-card {
          width: 224px;
          padding: 18px;
          border-radius: 20px;
          background: #fff;
          color: #111827;
          text-align: center;
          box-shadow: 0 18px 48px rgba(0, 0, 0, 0.3);
          animation: oxi-in 0.25s ease both;
        }
        .oxi-title { margin: 0; font-size: 15px; font-weight: 700; }
        .oxi-sub { margin: 4px 0 14px; font-size: 12px; color: #6b7280; }
        .oxi-qr {
          display: inline-block;
          padding: 10px;
          border-radius: 14px;
          background: #fff;
          border: 1px solid #e5e7eb;
        }
        .oxi-link { display: block; margin-top: 14px; font-size: 12px; font-weight: 600; color: #16a34a; text-decoration: none; }
        .oxi-link:hover { text-decoration: underline; }

        /* Mobile: compact, above the bottom edge, close button always visible */
        @media (max-width: 767px) {
          .oxi-root { right: 12px; bottom: 16px; }
          .oxi-pill { padding: 6px 14px 6px 8px; }
          .oxi-icon { width: 32px; height: 32px; }
          .oxi-text strong { font-size: 14px; }
          .oxi-close { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .oxi-root, .oxi-card { animation: none; }
          .oxi-pill { transition: none; }
        }
      `}</style>
    </div>
  );
}