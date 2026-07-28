'use client'

import React, { useState, useEffect } from 'react';
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
} from 'lucide-react';

interface SectionType {
  id: string;
  num: string;
  label: string;
  icon: React.ElementType;
}

const SECTIONS: SectionType[] = [
  { id: 'about', num: '01', label: 'About OptionXI', icon: Eye },
  { id: 'collect', num: '02', label: 'Information we collect', icon: Database },
  { id: 'use', num: '03', label: 'How we use it', icon: RefreshCw },
  { id: 'security', num: '04', label: 'Data security', icon: Lock },
  { id: 'open-source', num: '05', label: 'Open source', icon: Link2 },
  { id: 'accuracy', num: '06', label: 'Data accuracy', icon: AlertTriangle },
  { id: 'algo', num: '07', label: 'Future algo trading', icon: BookOpen },
  { id: 'rights', num: '08', label: 'Your rights', icon: Shield },
  { id: 'third-party', num: '09', label: 'Third-party services', icon: Link2 },
  { id: 'liability', num: '10', label: 'Limitation of liability', icon: Scale },
  { id: 'updates', num: '11', label: 'Policy updates', icon: RefreshCw },
  { id: 'contact', num: '12', label: 'Contact us', icon: Mail },
];

interface SectionProps {
  id: string;
  num: string;
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

const Section = ({ id, num, title, icon: Icon, children }: SectionProps) => (
  <section id={id} className="scroll-mt-28 py-9 border-b border-slate-200 dark:border-slate-700 last:border-b-0">
    <span className="inline-block font-mono text-[11px] tracking-[0.15em] text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded px-2 py-0.5 mb-4">
      CLAUSE {num}
    </span>
    <h2 className="flex items-center gap-2.5 text-[22px] font-black tracking-tight text-slate-900 dark:text-white mb-4">
      {Icon && <Icon className="w-5 h-5 text-slate-400 dark:text-slate-500 flex-shrink-0" strokeWidth={2.25} />}
      {title}
    </h2>
    <div className="text-slate-600 dark:text-slate-300 text-[15px] leading-relaxed space-y-4">{children}</div>
  </section>
);

interface FieldGroupProps {
  tag: string;
  title: string;
  items: string[];
}

const FieldGroup = ({ tag, title, items }: FieldGroupProps) => (
  <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/40 p-5">
    <p className="font-mono text-[11px] tracking-wide text-emerald-700 dark:text-emerald-400 mb-1">// {tag}</p>
    <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2.5">{title}</h3>
    <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1.5">
      {items.map((it) => (
        <li key={it} className="flex gap-2">
          <span className="text-slate-300 dark:text-slate-600">—</span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  </div>
);

interface ToneMap {
  rose: string;
  amber: string;
  slate: string;
}

const toneMap: ToneMap = {
  rose: 'bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800',
  amber: 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
  slate: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700',
};

interface LedgerRowProps {
  label: string;
  value: string;
  tone?: keyof ToneMap;
}

const LedgerRow = ({ label, value, tone = 'slate' }: LedgerRowProps) => (
  <div className="flex items-baseline gap-3 py-2.5">
    <span className="text-[13.5px] text-slate-700 dark:text-slate-300">{label}</span>
    <span className="flex-1 border-b border-dotted border-slate-300 dark:border-slate-600 mb-1" />
    <span
      className={`font-mono text-[10.5px] tracking-wide uppercase border rounded px-2 py-0.5 whitespace-nowrap ${toneMap[tone]}`}
    >
      {value}
    </span>
  </div>
);

const PrivacyPolicyPage: React.FC = () => {
  const [active, setActive] = useState<string>('about');

  // Scroll-spy: highlight the TOC entry for whichever section is
  // currently occupying the "reading zone" of the viewport.
  useEffect(() => {
    const sectionEls = SECTIONS
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sectionEls.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Among sections currently intersecting the reading zone,
        // pick the one closest to the top.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      {
        // Top offset clears the fixed navbar (h-16 = 64px) plus the
        // main wrapper's `top-10` (40px) shift, with a little breathing room.
        // Bottom offset (-60%) means a section is only "active" once its
        // top has crossed into the upper part of the viewport, which reads
        // more naturally than "as soon as any pixel is visible".
        rootMargin: '-120px 0px -60% 0px',
        threshold: 0,
      }
    );

    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const lastUpdated: string = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">

      {/* Masthead */}
      <div className="bg-white dark:bg-[#0B1220] text-slate-900 dark:text-white border-b border-slate-200 dark:border-transparent">
        <div className="max-w-6xl mx-auto px-6 pt-9 pb-7 flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="font-mono text-[11px] tracking-[0.22em] text-emerald-600 dark:text-emerald-400/80 uppercase mb-1">
              Statement of
            </p>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Privacy Policy</h1>
          </div>
          <div className="text-right">
            <p className="font-mono text-[10px] tracking-[0.15em] text-slate-400 dark:text-slate-500 uppercase">Effective</p>
            <p className="font-mono text-sm text-slate-600 dark:text-slate-200">{lastUpdated}</p>
          </div>
        </div>
        <div className="h-[3px] w-full bg-gradient-to-r from-emerald-500 via-amber-400 to-rose-500" />
      </div>

      {/* Intro */}
      <div className="max-w-6xl mx-auto px-6 pt-10 pb-2">
        <p className="max-w-2xl text-slate-600 dark:text-slate-300 text-[15px] leading-relaxed">
          How OptionXI collects, uses, and protects information across our virtual trading
          simulator for NSE stocks, Nifty&nbsp;50, and index options.
        </p>
      </div>

      {/* Risk ledger */}
      <div className="max-w-6xl mx-auto px-6 pt-6 pb-10">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/50 flex items-center gap-2.5">
            <BookOpen className="w-4 h-4 text-slate-400 dark:text-slate-500" />
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
              Read this before you use the platform
            </p>
          </div>
          <div className="px-6 py-2 divide-y divide-slate-100 dark:divide-slate-800">
            <LedgerRow label="Purpose of this platform" value="Education only" tone="slate" />
            <LedgerRow label="Investment advice provided" value="None" tone="rose" />
            <LedgerRow label="Market data reliability" value="Not guaranteed" tone="amber" />
            <LedgerRow label="Virtual vs. real performance" value="Not correlated" tone="amber" />
            <LedgerRow label="Claims for trading losses" value="Waived on use" tone="rose" />
          </div>
          <div className="px-6 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/30">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Always consult a qualified financial advisor before making real investment decisions.
            </p>
          </div>
        </div>
      </div>

      {/* Body: TOC + content */}
      <div className="max-w-6xl mx-auto px-6 pb-16 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10">
        <nav className="md:sticky md:top-24 md:self-start md:max-h-[calc(100vh-7rem)] md:overflow-y-auto">
          <p className="font-mono text-[11px] tracking-widest text-slate-400 dark:text-slate-500 mb-3">CONTENTS</p>
          <ul className="space-y-1 border-l border-slate-200 dark:border-slate-700">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                
                <a href={`#${s.id}`}
                  onClick={() => setActive(s.id)}
                  className={`group flex items-center gap-1.5 -ml-px pl-4 pr-2 py-1.5 border-l-2 text-sm transition-colors rounded-r-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 ${
                    active === s.id
                      ? 'border-emerald-600 dark:border-emerald-400 text-slate-900 dark:text-white font-semibold bg-emerald-50/60 dark:bg-emerald-950/30'
                      : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-400">
                    {s.num}
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

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl px-8">
          <Section id="about" num="01" title="About OptionXI" icon={Eye}>
            <p>
              OptionXI ("we," "us," or the "Company") operates a virtual trading platform,
              accessible through our website and mobile app (the "Platform"), built for
              educational trading simulation and market learning. The Platform supports virtual
              trading in NSE stocks, Nifty&nbsp;50, and options on the Bank Nifty and Nifty
              indices.
            </p>
            <p>
              Features include stock screeners, watchlists, price alerts, top gainers/losers, and
              detailed stock information alongside virtual trading. We protect your privacy while
              you use these tools to learn how markets work.
            </p>
          </Section>

          <Section id="collect" num="02" title="Information we collect" icon={Database}>
            <div className="grid gap-4 not-prose">
              <FieldGroup
                tag="personal_information"
                title="Personal information"
                items={[
                  'Email address (via Google or Apple sign-in)',
                  'Profile information from social authentication providers',
                  'Communication preferences and settings',
                  'Support requests and correspondence',
                ]}
              />
              <FieldGroup
                tag="usage_information"
                title="Usage information"
                items={[
                  'Virtual trading activity and portfolio performance',
                  'Watchlist preferences and price alerts',
                  'Platform navigation and feature usage',
                  'Device information and technical specifications',
                  'IP address, browser type, and access times',
                ]}
              />
              <FieldGroup
                tag="market_data"
                title="Market data"
                items={[
                  'NSE stock data (prior-day data used for virtual trading)',
                  'Real-time data access when a broker account is connected',
                  'Options data for Bank Nifty and Nifty indices',
                  'Market analytics and screening results',
                ]}
              />
            </div>
          </Section>

          <Section id="use" num="03" title="How we use your information" icon={RefreshCw}>
            <ul className="space-y-2 text-sm">
              {[
                'Authenticating you and securing access to the Platform',
                'Running virtual trading simulation and educational features',
                'Sending stock alerts, notifications, and market updates',
                'Improving Platform performance and user experience',
                'Providing customer support and technical assistance',
                'Analyzing usage patterns to improve the Platform',
                'Meeting legal and regulatory requirements',
              ].map((it) => (
                <li key={it} className="flex gap-2.5">
                  <span className="text-emerald-600 dark:text-emerald-400 mt-1">·</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="security" num="04" title="Data security & storage" icon={Lock}>
            <p>
              We use Firebase as our backend, which provides enterprise-grade encryption and
              security. Your data is protected by:
            </p>
            <ul className="space-y-1.5 text-sm">
              {[
                'Encrypted data in transit and at rest',
                'Secure authentication protocols',
                'Regular security audits and monitoring',
                'Access controls and data segregation',
              ].map((it) => (
                <li key={it} className="flex gap-2.5">
                  <span className="text-emerald-600 dark:text-emerald-400 mt-1">·</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="open-source" num="05" title="Open source initiative" icon={Link2}>
            <p>
              OptionXI will soon become open source, making our UI components and database
              structures available to the public for educational purposes. This supports learning
              and development in fintech education while keeping user privacy and security intact.
            </p>
          </Section>

          <Section id="accuracy" num="06" title="Data accuracy & availability" icon={AlertTriangle}>
            <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50/60 dark:bg-amber-950/30 px-5 py-4">
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Market data may be delayed, interrupted, or contain errors. We don't guarantee its
                accuracy, completeness, or availability. Interruptions or inaccuracies can happen,
                and we aren't responsible for losses or damages that result from them.
              </p>
            </div>
          </Section>

          <Section id="algo" num="07" title="Future algorithmic trading" icon={BookOpen}>
            <p>
              We plan to introduce algorithmic trading for placing real-time orders in the future.
              This feature isn't available yet. When it launches, it will carry additional terms,
              regulatory compliance requirements, and stronger security measures.
            </p>
          </Section>

          <Section id="rights" num="08" title="Your rights" icon={Shield}>
            <p>You have the right to:</p>
            <ul className="space-y-1.5 text-sm">
              {[
                'Access your personal information',
                'Correct inaccurate data',
                'Delete your account and its associated data',
                'Withdraw consent for data processing',
                'Export your data in a portable format',
              ].map((it) => (
                <li key={it} className="flex gap-2.5">
                  <span className="text-emerald-600 dark:text-emerald-400 mt-1">·</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="third-party" num="09" title="Third-party services" icon={Link2}>
            <p>
              The Platform integrates with third-party services, including Google and Apple for
              authentication, market data providers, and broker APIs for real-time data. These
              services have their own privacy policies, which we encourage you to review.
            </p>
          </Section>

          <Section id="liability" num="10" title="Limitation of liability" icon={Scale}>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
              By using OptionXI, you acknowledge and agree that:
            </p>
            <div className="rounded-xl border border-rose-200 dark:border-rose-800 bg-rose-50/50 dark:bg-rose-950/30 divide-y divide-rose-100 dark:divide-rose-900 px-5">
              {[
                'The Platform is for educational and simulation purposes only',
                'We are not financial advisors and provide no investment advice',
                'You waive all rights to claim damages for any losses incurred',
                'Virtual trading results do not guarantee real market performance',
                'We are not liable for data errors, interruptions, or system failures',
                'You use the Platform at your own risk',
              ].map((it) => (
                <p key={it} className="text-sm text-slate-700 dark:text-slate-300 py-2.5">
                  {it}
                </p>
              ))}
            </div>
          </Section>

          <Section id="updates" num="11" title="Policy updates" icon={RefreshCw}>
            <p>
              We may update this policy from time to time. We'll notify you of significant
              changes through the Platform or by email. Continuing to use the Platform after
              changes take effect means you accept the updated policy.
            </p>
          </Section>

          <Section id="contact" num="12" title="Contact us" icon={Mail}>
            <p>Questions about this policy or our data practices? Reach out:</p>
            <div className="not-prose mt-2 inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3">
              <Mail className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              
              <a href="mailto:support@optionxi.com"
                className="text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400"
              >
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