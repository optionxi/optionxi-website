import React from 'react';
import { Shield, Lock, Eye, Database, AlertTriangle, BookOpen } from 'lucide-react';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl font-bold">Privacy Policy</h1>
          </div>
          <p className="text-gray-300 text-lg">
            Last Updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Educational Purpose Banner */}
        <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-3">
            <BookOpen className="w-6 h-6 text-amber-400 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-amber-400 font-semibold mb-2">Educational Purpose Only</h3>
              <p className="text-gray-300">
                OptionXI is designed solely for educational purposes and virtual trading simulation. 
                This platform is not intended for actual financial investment or trading advice. 
                Always consult with qualified financial advisors before making real investment decisions.
              </p>
            </div>
          </div>
        </div>

        {/* Important Disclaimers */}
        <div className="bg-red-900/20 border border-red-700 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-red-400 font-semibold mb-2">Important Disclaimers</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• We are not financial advisors and do not provide investment advice</li>
                <li>• Data may be delayed, interrupted, or contain errors - we are not responsible for any losses</li>
                <li>• Virtual trading results do not guarantee real market performance</li>
                <li>• Users waive all rights to claim damages for any losses incurred</li>
                <li>• This platform is for simulation and learning purposes only</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Eye className="w-6 h-6 text-blue-400" />
              About OptionXI
            </h2>
            <p className="text-gray-300 leading-relaxed">
              OptionXI (&apos;We&apos;, &apos;Us&apos;, or the &apos;Company&apos;) operates a virtual trading platform accessible through 
              our website and mobile application (&quot;the Platform&quot;) to facilitate educational trading simulation 
              and market learning. The platform provides virtual trading capabilities for NSE stocks, Nifty 50, 
              and options trading on Bank Nifty and Nifty indices.
            </p>
            <p className="text-gray-300 leading-relaxed mt-4">
              Our platform includes features such as stock screeners, watchlists, stock alerts, top gainers/losers, 
              detailed stock information, and virtual trading capabilities. We are committed to protecting your 
              privacy while providing educational tools for market learning.
            </p>
          </section>

          {/* Data Collection */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Database className="w-6 h-6 text-green-400" />
              Information We Collect
            </h2>
            
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-white mb-3">Personal Information</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Email address (Gmail/Apple ID for authentication)</li>
                <li>• Profile information from social authentication providers</li>
                <li>• Communication preferences and settings</li>
                <li>• Support requests and correspondence</li>
              </ul>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-white mb-3">Usage Information</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Virtual trading activities and portfolio performance</li>
                <li>• Watchlist preferences and stock alerts</li>
                <li>• Platform navigation and feature usage</li>
                <li>• Device information and technical specifications</li>
                <li>• IP address, browser type, and access times</li>
              </ul>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Market Data</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• NSE stock data (previous day data for virtual trading)</li>
                <li>• Real-time data access when connected to broker accounts</li>
                <li>• Options data for Bank Nifty and Nifty indices</li>
                <li>• Market analytics and screening results</li>
              </ul>
            </div>
          </section>

          {/* Data Usage */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
            <div className="text-gray-300 space-y-3">
              <p>• Providing authentication and secure access to the platform</p>
              <p>• Enabling virtual trading simulation and educational features</p>
              <p>• Delivering stock alerts, notifications, and market updates</p>
              <p>• Improving platform performance and user experience</p>
              <p>• Providing customer support and technical assistance</p>
              <p>• Analyzing usage patterns for platform enhancement</p>
              <p>• Complying with legal and regulatory requirements</p>
            </div>
          </section>

          {/* Data Security */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Lock className="w-6 h-6 text-purple-400" />
              Data Security & Storage
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We use Firebase as our backend infrastructure, which provides enterprise-grade security 
              and encryption. Your data is protected through industry-standard security measures including:
            </p>
            <ul className="text-gray-300 space-y-2">
              <li>• Encrypted data transmission and storage</li>
              <li>• Secure authentication protocols</li>
              <li>• Regular security audits and monitoring</li>
              <li>• Access controls and data segregation</li>
            </ul>
          </section>

          {/* Open Source */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Open Source Initiative</h2>
            <p className="text-gray-300 leading-relaxed">
              OptionXI will soon become an open-source project, making our UI components and database 
              structures available to the public for educational purposes. This initiative aims to promote 
              learning and development in the fintech education space while maintaining user privacy and security.
            </p>
          </section>

          {/* Data Accuracy Disclaimer */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Data Accuracy & Availability</h2>
            <div className="bg-yellow-900/20 border border-yellow-600 rounded-lg p-4">
              <p className="text-gray-300 leading-relaxed">
                <strong>Important:</strong> Market data may be delayed, interrupted, or contain errors. 
                We do not guarantee the accuracy, completeness, or availability of market data. 
                Users acknowledge that data interruptions or inaccuracies may occur, and we are not 
                responsible for any losses or damages resulting from such issues.
              </p>
            </div>
          </section>

          {/* Future Features */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Future Algorithmic Trading</h2>
            <p className="text-gray-300 leading-relaxed">
              While we plan to introduce algorithmic trading capabilities for placing real-time orders 
              in the future, this feature is not currently available. Any future implementation will be 
              subject to additional terms and conditions, regulatory compliance, and enhanced security measures.
            </p>
          </section>

          {/* User Rights */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
            <p className="text-gray-300 leading-relaxed mb-4">You have the right to:</p>
            <ul className="text-gray-300 space-y-2">
              <li>• Access your personal information</li>
              <li>• Correct inaccurate data</li>
              <li>• Delete your account and associated data</li>
              <li>• Withdraw consent for data processing</li>
              <li>• Export your data in a portable format</li>
            </ul>
          </section>

          {/* Third-Party Services */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Third-Party Services</h2>
            <p className="text-gray-300 leading-relaxed">
              Our platform integrates with third-party services including Google/Apple for authentication, 
              market data providers, and broker APIs for real-time data access. These services have their 
              own privacy policies, and we encourage you to review them.
            </p>
          </section>

          {/* Liability Waiver */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
            <div className="bg-red-900/20 border border-red-600 rounded-lg p-4">
              <p className="text-gray-300 leading-relaxed">
                <strong>IMPORTANT:</strong> By using OptionXI, you acknowledge and agree that:
              </p>
              <ul className="text-gray-300 space-y-2 mt-3">
                <li>• The platform is for educational and simulation purposes only</li>
                <li>• We are not financial advisors and provide no investment advice</li>
                <li>• You waive all rights to claim damages for any losses incurred</li>
                <li>• Virtual trading results do not guarantee real market performance</li>
                <li>• We are not liable for data errors, interruptions, or system failures</li>
                <li>• You use the platform at your own risk</li>
              </ul>
            </div>
          </section>

          {/* Policy Changes */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Policy Updates</h2>
            <p className="text-gray-300 leading-relaxed">
              We may update this privacy policy from time to time. We will notify users of significant 
              changes through the platform or via email. Continued use of the platform after changes 
              constitutes acceptance of the updated policy.
            </p>
          </section>

          {/* Contact Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
            <div className="bg-gray-800 rounded-lg p-6">
              <p className="text-gray-300 leading-relaxed mb-4">
                For questions about this privacy policy or our data practices, please contact us at:
              </p>
              <div className="text-gray-300">
                <p><strong>Support:</strong> support@optionxi.com</p>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-gray-400">
          <p>&copy; 2024 OptionXI. All rights reserved. For educational purposes only.</p>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicyPage;