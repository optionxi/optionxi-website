'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Shield, AlertTriangle, BookOpen, TrendingUp } from 'lucide-react';

const TermsOfUsePage = () => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const Section = ({ id, title, children, icon }: { id: string; title: string; children: React.ReactNode; icon: React.ReactNode }) => {
    const isExpanded = expandedSections.has(id);
    
    return (
      <div className="mb-6 bg-gray-800/50 rounded-xl border border-gray-700/50 backdrop-blur-sm">
        <button
          onClick={() => toggleSection(id)}
          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-700/30 transition-colors rounded-xl"
        >
          <div className="flex items-center gap-3">
            <div className="text-blue-400">{icon}</div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
          </div>
          {isExpanded ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
        </button>
        
        {isExpanded && (
          <div className="px-6 pb-4 text-gray-300 leading-relaxed">
            {children}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900">
      {/* Header */}
      <div className="bg-black/20 border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              OptionXi
            </h1>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Terms of Use</h2>
          <p className="text-gray-400">Last Updated: December 2024</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Important Notice */}
        <div className="mb-8 p-6 bg-gradient-to-r from-red-900/30 to-orange-900/30 border border-red-500/30 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-red-400 mb-2">Important Disclaimer</h3>
              <p className="text-gray-300 mb-3">
                OptionXi is a virtual trading platform designed for educational purposes only. We are not financial advisors and do not provide investment advice. All trading activities are simulated and for learning purposes.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-red-500/20 text-red-300 text-sm rounded-full">Educational Only</span>
                <span className="px-3 py-1 bg-orange-500/20 text-orange-300 text-sm rounded-full">Virtual Trading</span>
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 text-sm rounded-full">No Real Money</span>
              </div>
            </div>
          </div>
        </div>

        {/* Terms Sections */}
        <Section id="acceptance" title="1. Acceptance of Terms" icon={<Shield className="w-5 h-5" />}>
          <p className="mb-4">
            By accessing or using OptionXi (&quot;the Platform&quot;), you agree to be bound by these Terms of Use. OptionXi is a virtual trading platform that provides educational tools including screeners, watchlists, stock alerts, and simulated trading for NSE stocks, Nifty 50, and options trading.
          </p>
          <p className="mb-4">
            The Platform requires authentication through Gmail or Apple ID for security purposes. By using our services, you acknowledge that you have read, understood, and agreed to these terms.
          </p>
          <p>
            If you do not agree with these terms, please discontinue use of the Platform immediately.
          </p>
        </Section>

        <Section id="educational" title="2. Educational Purpose & Disclaimers" icon={<BookOpen className="w-5 h-5" />}>
          <div className="space-y-4">
            <div className="p-4 bg-blue-900/30 border border-blue-500/30 rounded-lg">
              <h4 className="font-semibold text-blue-400 mb-2">Educational Platform</h4>
              <p>OptionXi is designed exclusively for educational and learning purposes. All trading activities are virtual and do not involve real money or actual securities transactions.</p>
            </div>
            
            <div className="p-4 bg-red-900/30 border border-red-500/30 rounded-lg">
              <h4 className="font-semibold text-red-400 mb-2">Not Financial Advice</h4>
              <p className="mb-2">We are NOT financial advisors and do NOT provide investment advice. The Platform should be used as a learning tool only.</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Seek professional financial advice before making real investments</li>
                <li>Consult licensed financial advisors for investment decisions</li>
                <li>Understand that virtual performance does not guarantee real trading success</li>
                <li>Past performance does not indicate future results</li>
              </ul>
            </div>

            <div className="p-4 bg-amber-900/30 border border-amber-500/30 rounded-lg">
              <h4 className="font-semibold text-amber-400 mb-2">Data Limitations</h4>
              <p className="mb-2">Virtual trading uses previous day data by default. Real-time data is available only when connected to broker accounts.</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Data may be delayed, interrupted, or contain errors</li>
                <li>We do not guarantee data accuracy or availability</li>
                <li>Market data is subject to exchange terms and conditions</li>
                <li>NSE data is provided for educational purposes only</li>
              </ul>
            </div>
          </div>
        </Section>

        <Section id="services" title="3. Platform Services" icon={<TrendingUp className="w-5 h-5" />}>
          <h4 className="font-semibold text-white mb-3">Current Features:</h4>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Virtual trading for Nifty 50 stocks</li>
            <li>Options trading simulation for Bank Nifty and Nifty</li>
            <li>Stock screeners and analysis tools</li>
            <li>Watchlist management</li>
            <li>Stock alerts and notifications</li>
            <li>Top gainers and losers tracking</li>
            <li>Detailed stock information</li>
          </ul>

          <h4 className="font-semibold text-white mb-3">Planned Features:</h4>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Algorithmic trading capabilities (not currently available)</li>
            <li>Real-time order placement through broker integration</li>
            <li>Advanced charting and technical analysis</li>
            <li>Portfolio analytics and reporting</li>
          </ul>

          <div className="p-4 bg-purple-900/30 border border-purple-500/30 rounded-lg">
            <h4 className="font-semibold text-purple-400 mb-2">Open Source Initiative</h4>
            <p>OptionXi will become an open-source project, making UI and database components publicly available for educational purposes.</p>
          </div>
        </Section>

        <Section id="authentication" title="4. User Authentication & Data" icon={<Shield className="w-5 h-5" />}>
          <p className="mb-4">
            We collect minimal information for authentication purposes through Gmail or Apple ID. This information is stored securely using Firebase backend services.
          </p>
          <h4 className="font-semibold text-white mb-2">Data Collection:</h4>
          <ul className="list-disc list-inside space-y-1 mb-4">
            <li>Email address (for authentication)</li>
            <li>Basic profile information from OAuth providers</li>
            <li>Virtual trading history and preferences</li>
            <li>App usage analytics for improvement purposes</li>
          </ul>
          <p>
            Your data is used solely for platform functionality and educational purposes. We do not sell or share personal information with third parties for commercial purposes.
          </p>
        </Section>

        <Section id="liability" title="5. Limitation of Liability & Risk Waiver" icon={<AlertTriangle className="w-5 h-5" />}>
          <div className="space-y-4">
            <div className="p-4 bg-red-900/40 border border-red-500/40 rounded-lg">
              <h4 className="font-semibold text-red-400 mb-2">Complete Liability Waiver</h4>
              <p className="mb-2">BY USING OPTIONXI, YOU EXPRESSLY WAIVE ALL RIGHTS TO HOLD US LIABLE FOR ANY LOSSES, DAMAGES, OR CONSEQUENCES ARISING FROM:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Virtual trading decisions or strategies</li>
                <li>Data inaccuracies, delays, or interruptions</li>
                <li>Platform downtime or technical issues</li>
                <li>Any real trading decisions influenced by platform use</li>
                <li>Educational content or analysis provided</li>
                <li>Third-party integrations or broker connections</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-800/50 border border-gray-600/50 rounded-lg">
              <h4 className="font-semibold text-gray-300 mb-2">Market Risks</h4>
              <p>All investments and trading involve substantial risk of loss. Virtual trading success does not guarantee real trading profitability. Market conditions, volatility, and various factors can result in significant losses in real trading scenarios.</p>
            </div>

            <div className="p-4 bg-orange-900/30 border border-orange-500/30 rounded-lg">
              <h4 className="font-semibold text-orange-400 mb-2">Data Reliability</h4>
              <p>Market data may be subject to interruptions, errors, or delays. We are not responsible for data accuracy or availability. Users should verify all information independently before making any financial decisions.</p>
            </div>
          </div>
        </Section>

        <Section id="prohibited" title="6. Prohibited Uses" icon={<AlertTriangle className="w-5 h-5" />}>
          <p className="mb-3">You agree NOT to use OptionXi for:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Any illegal or unauthorized purposes</li>
            <li>Attempting to reverse engineer or copy the platform</li>
            <li>Distributing malicious code or attempting security breaches</li>
            <li>Creating fake accounts or impersonating others</li>
            <li>Commercial redistribution of data or services</li>
            <li>Circumventing any platform limitations or restrictions</li>
            <li>Using the platform for actual financial advice or recommendations</li>
          </ul>
        </Section>

        <Section id="intellectual" title="7. Intellectual Property" icon={<Shield className="w-5 h-5" />}>
          <p className="mb-4">
            All content, features, and functionality of OptionXi are owned by us and protected by intellectual property laws. However, as part of our open-source initiative, certain components will be made publicly available under appropriate licenses.
          </p>
          <p className="mb-4">
            Users retain rights to their own data and virtual trading records. Market data is provided by third parties and subject to their respective terms and conditions.
          </p>
          <p>
            The OptionXi name, logo, and branding remain our exclusive property regardless of open-source components.
          </p>
        </Section>

        <Section id="termination" title="8. Account Termination" icon={<AlertTriangle className="w-5 h-5" />}>
          <p className="mb-4">
            We reserve the right to suspend or terminate your access to OptionXi at any time for violations of these terms or at our discretion. You may also terminate your account at any time by discontinuing use of the platform.
          </p>
          <p>
            Upon termination, your access to virtual trading data and platform features will be discontinued. However, we may retain certain information as required by law or for legitimate business purposes.
          </p>
        </Section>

        <Section id="modifications" title="9. Modifications to Terms" icon={<BookOpen className="w-5 h-5" />}>
          <p className="mb-4">
            We may update these Terms of Use at any time. Significant changes will be communicated through the platform or via email. Continued use of OptionXi after changes constitutes acceptance of updated terms.
          </p>
          <p>
            It is your responsibility to review these terms periodically for changes.
          </p>
        </Section>

        <Section id="governing" title="10. Governing Law & Dispute Resolution" icon={<Shield className="w-5 h-5" />}>
          <p className="mb-4">
            These terms are governed by the laws of India. Any disputes will be subject to the jurisdiction of Indian courts.
          </p>
          <p className="mb-4">
            We encourage resolving disputes through direct communication. For serious matters, arbitration may be pursued in accordance with Indian arbitration laws.
          </p>
          <p>
            Any claims must be filed within 3 months of the incident giving rise to the claim.
          </p>
        </Section>

        <Section id="contact" title="11. Contact Information" icon={<BookOpen className="w-5 h-5" />}>
          <div className="space-y-3">
            <p>For questions about these Terms of Use or general support:</p>
            <div className="p-4 bg-gray-800/50 border border-gray-600/50 rounded-lg">
              <p className="font-semibold text-white mb-2">Support Contact:</p>
              <p>Email: support@optionxi.com</p>
              <p>Response Time: Within 48 hours</p>
            </div>
            <p className="text-sm text-gray-400">
              For technical issues or feature requests, please use the in-app support system when available.
            </p>
          </div>
        </Section>

        {/* Final Notice */}
        <div className="mt-12 p-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-xl">
          <h3 className="text-lg font-bold text-white mb-3">Acknowledgment</h3>
          <p className="text-gray-300 mb-4">
            By using OptionXi, you acknowledge that you have read, understood, and agreed to these Terms of Use. You understand that this is an educational platform and that you assume all responsibility for any decisions made based on information or experience gained through the platform.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full">Educational Tool</span>
            <span className="px-3 py-1 bg-green-500/20 text-green-300 text-sm rounded-full">Open Source</span>
            <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full">Virtual Trading</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>© 2024 OptionXi. All rights reserved. Built for educational purposes.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUsePage;