'use client'

import React, { useState, type ReactNode } from 'react';
import {
  Shield,
  Lock,
  Eye,
  Database,
  AlertTriangle,
  BookOpen,
  Scale,
  RefreshCw,
  Mail,
  Link2,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react';

interface SectionMeta {
  id: string;
  code: string;
  label: string;
  icon: LucideIcon;
}

/**
 * OptionXI — Privacy Policy
 * Light theme, fintech-editorial style.
 * Signature motif: ticker-style section eyebrows (OPX·01) echoing stock
 * ticker codes, paired with a faint candlestick rule in the masthead.
 */

const SECTIONS: SectionMeta[] = [
  { id: 'about', code: '01', label: 'About OptionXI', icon: Eye },
  { id: 'collect', code: '02', label: 'Information We Collect', icon: Database },
  { id: 'use', code: '03', label: 'How We Use It', icon: RefreshCw },
  { id: 'security', code: '04', label: 'Data Security', icon: Lock },
  { id: 'open-source', code: '05', label: 'Open Source', icon: Link2 },
  { id: 'accuracy', code: '06', label: 'Data Accuracy', icon: AlertTriangle },
  { id: 'algo', code: '07', label: 'Future Algo Trading', icon: BookOpen },
  { id: 'rights', code: '08', label: 'Your Rights', icon: Shield },
  { id: 'third-party', code: '09', label: 'Third-Party Services', icon: Link2 },
  { id: 'liability', code: '10', label: 'Limitation of Liability', icon: Scale },
  { id: 'updates', code: '11', label: 'Policy Updates', icon: RefreshCw },
  { id: 'contact', code: '12', label: 'Contact Us', icon: Mail },
];

interface EyebrowProps {
  code: string;
  children?: ReactNode;
}

const Eyebrow = ({ code, children }: EyebrowProps) => (
  <div className="flex items-center gap-2 mb-3">
    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-wider text-teal-700 bg-teal-50 border border-teal-200 rounded-full px-2.5 py-1">
      <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
      OPX·{code}
    </span>
    <span className="h-px flex-1 bg-slate-200" />
  </div>
);

interface SectionProps {
  id: string;
  code: string;
  title: string;
  icon?: LucideIcon;
  children?: ReactNode;
}

const Section = ({ id, code, title, icon: Icon, children }: SectionProps) => (
  <section id={id} className="scroll-mt-24 py-10 border-b border-slate-200 last:border-b-0">
    <Eyebrow code={code}>{title}</Eyebrow>
    <h2 className="flex items-center gap-2.5 text-2xl font-semibold text-slate-900 tracking-tight mb-4">
      {Icon && <Icon className="w-5 h-5 text-teal-600" strokeWidth={2} />}
      {title}
    </h2>
    <div className="text-slate-600 leading-relaxed space-y-4">{children}</div>
  </section>
);

type CalloutTone = 'info' | 'warning' | 'danger';

interface CalloutProps {
  tone?: CalloutTone;
  title?: string;
  icon?: LucideIcon;
  children?: ReactNode;
}

const Callout = ({ tone = 'info', title, icon: Icon, children }: CalloutProps) => {
  const tones: Record<CalloutTone, string> = {
    info: 'border-teal-300 bg-teal-50/60',
    warning: 'border-amber-300 bg-amber-50/60',
    danger: 'border-rose-300 bg-rose-50/60',
  };
  const iconTones: Record<CalloutTone, string> = {
    info: 'text-teal-600',
    warning: 'text-amber-600',
    danger: 'text-rose-600',
  };
  const titleTones: Record<CalloutTone, string> = {
    info: 'text-teal-800',
    warning: 'text-amber-800',
    danger: 'text-rose-800',
  };
  return (
    <div className={`border-l-4 rounded-r-lg px-5 py-4 ${tones[tone]}`}>
      <div className="flex items-start gap-3">
        {Icon && <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${iconTones[tone]}`} />}
        <div>
          {title && <p className={`font-semibold text-sm mb-1.5 ${titleTones[tone]}`}>{title}</p>}
          <div className="text-slate-700 text-sm leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
};

const CandlestickRule = () => (
  <svg viewBox="0 0 400 28" className="w-full h-6 text-teal-600/40" preserveAspectRatio="none">
    {Array.from({ length: 40 }).map((_, i) => {
      const x = i * 10 + 4;
      const up = i % 3 !== 0;
      const bodyTop = 8 + ((i * 37) % 8);
      const bodyH = 4 + ((i * 13) % 6);
      const wickTop = bodyTop - 3 - ((i * 7) % 3);
      const wickBot = bodyTop + bodyH + 3 + ((i * 5) % 3);
      return (
        <g key={i} stroke="currentColor" fill={up ? 'currentColor' : 'none'}>
          <line x1={x} y1={wickTop} x2={x} y2={wickBot} strokeWidth="1" />
          <rect x={x - 1.5} y={bodyTop} width="3" height={bodyH} strokeWidth="1" />
        </g>
      );
    })}
  </svg>
);

const PrivacyPolicyPage = () => {
  const [active, setActive] = useState('about');

  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 z-10">
      {/* Masthead */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 pt-10 pb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Privacy Policy</h1>
              </div>
            </div>
            <p className="font-mono text-xs text-slate-500 tracking-wide">
              LAST UPDATED&nbsp;
              <span className="text-slate-700">{lastUpdated}</span>
            </p>
          </div>
          <div className="mt-6">
            <CandlestickRule />
          </div>
          <p className="mt-4 max-w-2xl text-slate-600 text-sm leading-relaxed">
            How OptionXI collects, uses, and protects information across our virtual trading
            simulation platform for NSE stocks, Nifty&nbsp;50, and index options.
          </p>
        </div>
      </div>

      {/* Top banners */}
      <div className="max-w-6xl mx-auto px-6 pt-8 space-y-4">
        <Callout tone="warning" title="Educational purpose only" icon={BookOpen}>
          OptionXI is designed solely for educational purposes and virtual trading simulation.
          This platform is not intended for actual financial investment or trading advice.
          Always consult a qualified financial advisor before making real investment decisions.
        </Callout>
        <Callout tone="danger" title="Please read before using the platform" icon={AlertTriangle}>
          <ul className="space-y-1.5 mt-1">
            <li>— We are not financial advisors and do not provide investment advice.</li>
            <li>— Market data may be delayed, interrupted, or contain errors; we're not liable for resulting losses.</li>
            <li>— Virtual trading results do not guarantee real market performance.</li>
            <li>— Use of the platform constitutes a waiver of claims for damages arising from losses.</li>
          </ul>
        </Callout>
      </div>

      {/* Body: TOC + content */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10">
        {/* Table of contents */}
        <nav className="md:sticky md:top-8 md:self-start">
          <p className="font-mono text-[11px] tracking-widest text-slate-400 mb-3">CONTENTS</p>
          <ul className="space-y-1 border-l border-slate-200">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={() => setActive(s.id)}
                  className={`group flex items-center gap-1.5 -ml-px pl-4 pr-2 py-1.5 border-l-2 text-sm transition-colors ${
                    active === s.id
                      ? 'border-teal-600 text-teal-700 font-medium bg-teal-50/50'
                      : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
                  }`}
                >
                  <span className="font-mono text-[10px] text-slate-400 group-hover:text-slate-500">
                    {s.code}
                  </span>
                  {s.label}
                  <ChevronRight
                    className={`w-3 h-3 ml-auto transition-opacity ${
                      active === s.id ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Content */}
        <div className="bg-white border border-slate-200 rounded-2xl px-8">
          <Section id="about" code="01" title="About OptionXI" icon={Eye}>
            <p>
              OptionXI (&ldquo;We&rdquo;, &ldquo;Us&rdquo;, or the &ldquo;Company&rdquo;) operates a
              virtual trading platform accessible through our website and mobile application
              (&ldquo;the Platform&rdquo;) to facilitate educational trading simulation and market
              learning. The platform provides virtual trading capabilities for NSE stocks, Nifty&nbsp;50,
              and options trading on Bank Nifty and Nifty indices.
            </p>
            <p>
              Our platform includes features such as stock screeners, watchlists, stock alerts,
              top gainers/losers, detailed stock information, and virtual trading capabilities.
              We are committed to protecting your privacy while providing educational tools for
              market learning.
            </p>
          </Section>

          <Section id="collect" code="02" title="Information We Collect" icon={Database}>
            <div className="grid sm:grid-cols-1 gap-4 not-prose">
              <div className="rounded-xl border border-slate-200 p-5">
                <h3 className="text-sm font-semibold text-slate-900 mb-2.5">Personal information</h3>
                <ul className="text-sm text-slate-600 space-y-1.5">
                  <li>Email address (Gmail / Apple ID for authentication)</li>
                  <li>Profile information from social authentication providers</li>
                  <li>Communication preferences and settings</li>
                  <li>Support requests and correspondence</li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 p-5">
                <h3 className="text-sm font-semibold text-slate-900 mb-2.5">Usage information</h3>
                <ul className="text-sm text-slate-600 space-y-1.5">
                  <li>Virtual trading activities and portfolio performance</li>
                  <li>Watchlist preferences and stock alerts</li>
                  <li>Platform navigation and feature usage</li>
                  <li>Device information and technical specifications</li>
                  <li>IP address, browser type, and access times</li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 p-5">
                <h3 className="text-sm font-semibold text-slate-900 mb-2.5">Market data</h3>
                <ul className="text-sm text-slate-600 space-y-1.5">
                  <li>NSE stock data (previous-day data for virtual trading)</li>
                  <li>Real-time data access when connected to broker accounts</li>
                  <li>Options data for Bank Nifty and Nifty indices</li>
                  <li>Market analytics and screening results</li>
                </ul>
              </div>
            </div>
          </Section>

          <Section id="use" code="03" title="How We Use Your Information" icon={RefreshCw}>
            <ul className="space-y-2 text-sm">
              <li>Providing authentication and secure access to the platform</li>
              <li>Enabling virtual trading simulation and educational features</li>
              <li>Delivering stock alerts, notifications, and market updates</li>
              <li>Improving platform performance and user experience</li>
              <li>Providing customer support and technical assistance</li>
              <li>Analyzing usage patterns for platform enhancement</li>
              <li>Complying with legal and regulatory requirements</li>
            </ul>
          </Section>

          <Section id="security" code="04" title="Data Security & Storage" icon={Lock}>
            <p>
              We use Firebase as our backend infrastructure, which provides enterprise-grade
              security and encryption. Your data is protected through industry-standard security
              measures, including:
            </p>
            <ul className="space-y-1.5 text-sm">
              <li>Encrypted data transmission and storage</li>
              <li>Secure authentication protocols</li>
              <li>Regular security audits and monitoring</li>
              <li>Access controls and data segregation</li>
            </ul>
          </Section>

          <Section id="open-source" code="05" title="Open Source Initiative" icon={Link2}>
            <p>
              OptionXI will soon become an open-source project, making our UI components and
              database structures available to the public for educational purposes. This
              initiative aims to promote learning and development in the fintech education space
              while maintaining user privacy and security.
            </p>
          </Section>

          <Section id="accuracy" code="06" title="Data Accuracy & Availability" icon={AlertTriangle}>
            <Callout tone="warning">
              Market data may be delayed, interrupted, or contain errors. We do not guarantee the
              accuracy, completeness, or availability of market data. Users acknowledge that data
              interruptions or inaccuracies may occur, and we are not responsible for any losses
              or damages resulting from such issues.
            </Callout>
          </Section>

          <Section id="algo" code="07" title="Future Algorithmic Trading" icon={BookOpen}>
            <p>
              While we plan to introduce algorithmic trading capabilities for placing real-time
              orders in the future, this feature is not currently available. Any future
              implementation will be subject to additional terms and conditions, regulatory
              compliance, and enhanced security measures.
            </p>
          </Section>

          <Section id="rights" code="08" title="Your Rights" icon={Shield}>
            <p>You have the right to:</p>
            <ul className="space-y-1.5 text-sm">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Delete your account and associated data</li>
              <li>Withdraw consent for data processing</li>
              <li>Export your data in a portable format</li>
            </ul>
          </Section>

          <Section id="third-party" code="09" title="Third-Party Services" icon={Link2}>
            <p>
              Our platform integrates with third-party services including Google/Apple for
              authentication, market data providers, and broker APIs for real-time data access.
              These services have their own privacy policies, and we encourage you to review
              them.
            </p>
          </Section>

          <Section id="liability" code="10" title="Limitation of Liability" icon={Scale}>
            <Callout tone="danger" title="By using OptionXI, you acknowledge and agree that:">
              <ul className="space-y-1.5 mt-1">
                <li>— The platform is for educational and simulation purposes only</li>
                <li>— We are not financial advisors and provide no investment advice</li>
                <li>— You waive all rights to claim damages for any losses incurred</li>
                <li>— Virtual trading results do not guarantee real market performance</li>
                <li>— We are not liable for data errors, interruptions, or system failures</li>
                <li>— You use the platform at your own risk</li>
              </ul>
            </Callout>
          </Section>

          <Section id="updates" code="11" title="Policy Updates" icon={RefreshCw}>
            <p>
              We may update this privacy policy from time to time. We will notify users of
              significant changes through the platform or via email. Continued use of the
              platform after changes constitutes acceptance of the updated policy.
            </p>
          </Section>

          <Section id="contact" code="12" title="Contact Us" icon={Mail}>
            <p>For questions about this privacy policy or our data practices, reach out to:</p>
            <div className="not-prose mt-2 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <Mail className="w-4 h-4 text-teal-600" />
              <a href="mailto:support@optionxi.com" className="text-sm font-medium text-slate-800 hover:text-teal-700">
                support@optionxi.com
              </a>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;