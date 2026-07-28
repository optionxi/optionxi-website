'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Shield, AlertTriangle, BookOpen, TrendingUp } from 'lucide-react';

const TermsOfUsePage = () => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['acceptance']));

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const Section = ({
    id,
    number,
    title,
    children,
    icon,
  }: {
    id: string;
    number: string;
    title: string;
    children: React.ReactNode;
    icon: React.ReactNode;
  }) => {
    const isExpanded = expandedSections.has(id);

    return (
      <div className="mb-3.5 bg-white rounded-xl border border-slate-200 overflow-hidden">
        <button
          onClick={() => toggleSection(id)}
          className="w-full px-6 py-4.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-3.5">
            <div className="h-9 w-9 shrink-0 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              {icon}
            </div>
            <span className="flex items-baseline gap-2.5">
              <span className="text-[12px] font-semibold text-slate-400 tabular-nums">{number}</span>
              <h3 className="text-[15px] font-semibold text-slate-900">{title}</h3>
            </span>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
          )}
        </button>

        {isExpanded && (
          <div className="px-6 pb-6 pt-1 text-[13.5px] text-slate-600 leading-relaxed border-t border-slate-100">
            <div className="pt-4">{children}</div>
          </div>
        )}
      </div>
    );
  };

  const InfoBlock = ({
    tone,
    title,
    children,
  }: {
    tone: 'blue' | 'red' | 'amber' | 'purple' | 'slate';
    title: string;
    children: React.ReactNode;
  }) => {
    const tones: Record<string, string> = {
      blue: 'bg-sky-50 border-sky-200 text-sky-900',
      red: 'bg-rose-50 border-rose-200 text-rose-900',
      amber: 'bg-amber-50 border-amber-200 text-amber-900',
      purple: 'bg-violet-50 border-violet-200 text-violet-900',
      slate: 'bg-slate-50 border-slate-200 text-slate-700',
    };
    return (
      <div className={`p-4 rounded-lg border ${tones[tone]}`}>
        <h4 className="font-semibold mb-1.5 text-[13px]">{title}</h4>
        <div className="text-slate-600 text-[13.5px] leading-relaxed">{children}</div>
      </div>
    );
  };

  const Tag = ({ children }: { children: React.ReactNode }) => (
    <span className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-xs font-medium rounded-full">
      {children}
    </span>
  );

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Masthead */}
      <div className="bg-white dark:bg-[#0B1220] text-slate-900 dark:text-white border-b border-slate-200 dark:border-transparent">
        <div className="max-w-6xl mx-auto px-6 pt-9 pb-7 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Terms of Use</h1>
          </div>
          <div className="text-right">
            <p className="font-mono text-[10px] tracking-[0.15em] text-slate-400 dark:text-slate-500 uppercase">Last updated</p>
            <p className="font-mono text-sm text-slate-600 dark:text-slate-200">December 2025</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Important Notice */}
        <div className="mb-8 p-5 bg-white border border-slate-200 rounded-xl">
          <div className="flex items-start gap-3.5">
            <div className="h-9 w-9 shrink-0 rounded-lg bg-rose-50 flex items-center justify-center">
              <AlertTriangle className="w-4.5 h-4.5 text-rose-500" />
            </div>
            <div>
              <h3 className="text-[14px] font-semibold text-slate-900 mb-1.5">Important disclaimer</h3>
              <p className="text-[13.5px] text-slate-600 leading-relaxed mb-3">
                OptionXi is a virtual trading platform designed for educational purposes only. We are not
                financial advisors and do not provide investment advice. All trading activities are simulated
                and for learning purposes.
              </p>
              <div className="flex flex-wrap gap-2">
                <Tag>Educational only</Tag>
                <Tag>Virtual trading</Tag>
                <Tag>No real money</Tag>
              </div>
            </div>
          </div>
        </div>

        {/* Terms Sections */}
        <Section id="acceptance" number="01" title="Acceptance of Terms" icon={<Shield className="w-4.5 h-4.5" />}>
          <p className="mb-4">
            By accessing or using OptionXi (&quot;the Platform&quot;), you agree to be bound by these Terms of
            Use. OptionXi is a virtual trading platform that provides educational tools including screeners,
            watchlists, stock alerts, and simulated trading for NSE stocks, Nifty 50, and options trading.
          </p>
          <p className="mb-4">
            The Platform requires authentication through Gmail or Apple ID for security purposes. By using our
            services, you acknowledge that you have read, understood, and agreed to these terms.
          </p>
          <p>If you do not agree with these terms, please discontinue use of the Platform immediately.</p>
        </Section>

        <Section id="educational" number="02" title="Educational Purpose & Disclaimers" icon={<BookOpen className="w-4.5 h-4.5" />}>
          <div className="space-y-3">
            <InfoBlock tone="blue" title="Educational platform">
              OptionXi is designed exclusively for educational and learning purposes. All trading activities
              are virtual and do not involve real money or actual securities transactions.
            </InfoBlock>

            <InfoBlock tone="red" title="Not financial advice">
              <p className="mb-2">
                We are NOT financial advisors and do NOT provide investment advice. The Platform should be
                used as a learning tool only.
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Seek professional financial advice before making real investments</li>
                <li>Consult licensed financial advisors for investment decisions</li>
                <li>Understand that virtual performance does not guarantee real trading success</li>
                <li>Past performance does not indicate future results</li>
              </ul>
            </InfoBlock>

            <InfoBlock tone="amber" title="Data limitations">
              <p className="mb-2">
                Virtual trading uses previous day data by default. Real-time data is available only when
                connected to broker accounts.
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Data may be delayed, interrupted, or contain errors</li>
                <li>We do not guarantee data accuracy or availability</li>
                <li>Market data is subject to exchange terms and conditions</li>
                <li>NSE data is provided for educational purposes only</li>
              </ul>
            </InfoBlock>
          </div>
        </Section>

        <Section id="services" number="03" title="Platform Services" icon={<TrendingUp className="w-4.5 h-4.5" />}>
          <h4 className="font-semibold text-slate-900 mb-2.5">Current features</h4>
          <ul className="list-disc list-inside space-y-1.5 mb-5">
            <li>Virtual trading for Nifty 50 stocks</li>
            <li>Options trading simulation for Bank Nifty and Nifty</li>
            <li>Stock screeners and analysis tools</li>
            <li>Watchlist management</li>
            <li>Stock alerts and notifications</li>
            <li>Top gainers and losers tracking</li>
            <li>Detailed stock information</li>
          </ul>

          <h4 className="font-semibold text-slate-900 mb-2.5">Planned features</h4>
          <ul className="list-disc list-inside space-y-1.5 mb-5">
            <li>Algorithmic trading capabilities (not currently available)</li>
            <li>Real-time order placement through broker integration</li>
            <li>Advanced charting and technical analysis</li>
            <li>Portfolio analytics and reporting</li>
          </ul>

          <InfoBlock tone="purple" title="Open source initiative">
            OptionXi will become an open-source project, making UI and database components publicly available
            for educational purposes.
          </InfoBlock>
        </Section>

        <Section id="authentication" number="04" title="User Authentication & Data" icon={<Shield className="w-4.5 h-4.5" />}>
          <p className="mb-4">
            We collect minimal information for authentication purposes through Gmail or Apple ID. This
            information is stored securely using Firebase backend services.
          </p>
          <h4 className="font-semibold text-slate-900 mb-2.5">Data collection</h4>
          <ul className="list-disc list-inside space-y-1.5 mb-4">
            <li>Email address (for authentication)</li>
            <li>Basic profile information from OAuth providers</li>
            <li>Virtual trading history and preferences</li>
            <li>App usage analytics for improvement purposes</li>
          </ul>
          <p>
            Your data is used solely for platform functionality and educational purposes. We do not sell or
            share personal information with third parties for commercial purposes.
          </p>
        </Section>

        <Section id="liability" number="05" title="Limitation of Liability & Risk Waiver" icon={<AlertTriangle className="w-4.5 h-4.5" />}>
          <div className="space-y-3">
            <InfoBlock tone="red" title="Complete liability waiver">
              <p className="mb-2">
                By using OptionXi, you expressly waive all rights to hold us liable for any losses, damages,
                or consequences arising from:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Virtual trading decisions or strategies</li>
                <li>Data inaccuracies, delays, or interruptions</li>
                <li>Platform downtime or technical issues</li>
                <li>Any real trading decisions influenced by platform use</li>
                <li>Educational content or analysis provided</li>
                <li>Third-party integrations or broker connections</li>
              </ul>
            </InfoBlock>

            <InfoBlock tone="slate" title="Market risks">
              All investments and trading involve substantial risk of loss. Virtual trading success does not
              guarantee real trading profitability. Market conditions, volatility, and various factors can
              result in significant losses in real trading scenarios.
            </InfoBlock>

            <InfoBlock tone="amber" title="Data reliability">
              Market data may be subject to interruptions, errors, or delays. We are not responsible for data
              accuracy or availability. Users should verify all information independently before making any
              financial decisions.
            </InfoBlock>
          </div>
        </Section>

        <Section id="prohibited" number="06" title="Prohibited Uses" icon={<AlertTriangle className="w-4.5 h-4.5" />}>
          <p className="mb-3">You agree NOT to use OptionXi for:</p>
          <ul className="list-disc list-inside space-y-1.5">
            <li>Any illegal or unauthorized purposes</li>
            <li>Attempting to reverse engineer or copy the platform</li>
            <li>Distributing malicious code or attempting security breaches</li>
            <li>Creating fake accounts or impersonating others</li>
            <li>Commercial redistribution of data or services</li>
            <li>Circumventing any platform limitations or restrictions</li>
            <li>Using the platform for actual financial advice or recommendations</li>
          </ul>
        </Section>

        <Section id="intellectual" number="07" title="Intellectual Property" icon={<Shield className="w-4.5 h-4.5" />}>
          <p className="mb-4">
            All content, features, and functionality of OptionXi are owned by us and protected by intellectual
            property laws. However, as part of our open-source initiative, certain components will be made
            publicly available under appropriate licenses.
          </p>
          <p className="mb-4">
            Users retain rights to their own data and virtual trading records. Market data is provided by
            third parties and subject to their respective terms and conditions.
          </p>
          <p>The OptionXi name, logo, and branding remain our exclusive property regardless of open-source components.</p>
        </Section>

        <Section id="termination" number="08" title="Account Termination" icon={<AlertTriangle className="w-4.5 h-4.5" />}>
          <p className="mb-4">
            We reserve the right to suspend or terminate your access to OptionXi at any time for violations of
            these terms or at our discretion. You may also terminate your account at any time by discontinuing
            use of the platform.
          </p>
          <p>
            Upon termination, your access to virtual trading data and platform features will be discontinued.
            However, we may retain certain information as required by law or for legitimate business purposes.
          </p>
        </Section>

        <Section id="modifications" number="09" title="Modifications to Terms" icon={<BookOpen className="w-4.5 h-4.5" />}>
          <p className="mb-4">
            We may update these Terms of Use at any time. Significant changes will be communicated through the
            platform or via email. Continued use of OptionXi after changes constitutes acceptance of updated
            terms.
          </p>
          <p>It is your responsibility to review these terms periodically for changes.</p>
        </Section>

        <Section id="governing" number="10" title="Governing Law & Dispute Resolution" icon={<Shield className="w-4.5 h-4.5" />}>
          <p className="mb-4">
            These terms are governed by the laws of India. Any disputes will be subject to the jurisdiction of
            Indian courts.
          </p>
          <p className="mb-4">
            We encourage resolving disputes through direct communication. For serious matters, arbitration may
            be pursued in accordance with Indian arbitration laws.
          </p>
          <p>Any claims must be filed within 3 months of the incident giving rise to the claim.</p>
        </Section>

        <Section id="contact" number="11" title="Contact Information" icon={<BookOpen className="w-4.5 h-4.5" />}>
          <div className="space-y-3">
            <p>For questions about these Terms of Use or general support:</p>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <p className="font-semibold text-slate-900 mb-1.5">Support contact</p>
              <p>Email: support@optionxi.com</p>
              <p>Response time: within 48 hours</p>
            </div>
            <p className="text-slate-400 text-[12.5px]">
              For technical issues or feature requests, please use the in-app support system when available.
            </p>
          </div>
        </Section>

        {/* Final Notice */}
        <div className="mt-10 p-6 bg-white border border-slate-200 rounded-xl">
          <h3 className="text-[15px] font-semibold text-slate-900 mb-2.5">Acknowledgment</h3>
          <p className="text-[13.5px] text-slate-600 leading-relaxed mb-4">
            By using OptionXi, you acknowledge that you have read, understood, and agreed to these Terms of
            Use. You understand that this is an educational platform and that you assume all responsibility
            for any decisions made based on information or experience gained through the platform.
          </p>
          <div className="flex flex-wrap gap-2">
            <Tag>Educational tool</Tag>
            <Tag>Open source</Tag>
            <Tag>Virtual trading</Tag>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-8 pt-6 border-t border-slate-200 text-center text-slate-400 text-[12.5px]">
          <p>© 2024 OptionXi. All rights reserved. Built for educational purposes.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUsePage;