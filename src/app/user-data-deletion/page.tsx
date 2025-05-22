'use client';

import { useState } from 'react';
import { Mail, Trash2, Shield, Database, Clock, AlertCircle, CheckCircle } from 'lucide-react';

export default function DeleteUserData() {
  const [emailSent, setEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteRequest = async () => {
    setIsLoading(true);
    
    // Simulate email sending delay
    setTimeout(() => {
      // Create mailto link
      const subject = encodeURIComponent('Account Deletion Request - OptionXi');
      const body = encodeURIComponent(`Dear OptionXi Team,

I would like to request the deletion of my account and associated data from the OptionXi virtual trading app.

Please confirm the deletion of my account and provide details about the data removal process.

Thank you.`);
      
      const mailtoLink = `mailto:optionxi24@gmail.com?subject=${subject}&body=${body}`;
      window.location.href = mailtoLink;
      
      setEmailSent(true);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold">Ox</span>
            </div>
            <h1 className="text-3xl font-bold">OptionXi</h1>
          </div>
          <p className="text-gray-300 text-lg">Virtual Trading & Stock Analysis Platform</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center space-x-3 mb-6">
            <Trash2 className="w-8 h-8 text-red-400" />
            <h2 className="text-2xl font-bold text-white">Delete Your Account & Data</h2>
          </div>

          <div className="mb-8">
            <p className="text-gray-300 text-lg leading-relaxed">
              We understand that you may want to delete your OptionXi account and associated data. 
              This page will guide you through the process and explain what data will be removed.
            </p>
          </div>

          {/* Steps Section */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <CheckCircle className="w-6 h-6 text-green-400 mr-2" />
              How to Request Account Deletion
            </h3>
            
            <div className="space-y-4">
              <div className="bg-gray-700 rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Click the Delete Request Button</h4>
                    <p className="text-gray-300">Use the button below to initiate your account deletion request.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Send Email Request</h4>
                    <p className="text-gray-300">
                      An email will be composed to <span className="text-blue-400 font-mono">optionxi24@gmail.com</span> with your deletion request.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Await Confirmation</h4>
                    <p className="text-gray-300">
                      Our team will process your request and send you a confirmation email within 48 hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Data Types Section */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <Database className="w-6 h-6 text-purple-400 mr-2" />
              Data That Will Be Deleted
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-700 rounded-lg p-6">
                <h4 className="font-semibold text-green-400 mb-3">✓ Data Removed Immediately</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• Account profile information</li>
                  <li>• Email address (Gmail/Apple ID)</li>
                  <li>• Virtual trading portfolio data</li>
                  <li>• Custom watchlists</li>
                  <li>• Stock alerts and notifications</li>
                  <li>• Trading history and transactions</li>
                  <li>• App preferences and settings</li>
                </ul>
              </div>

              <div className="bg-gray-700 rounded-lg p-6">
                <h4 className="font-semibold text-yellow-400 mb-3">⚠ Data Retained (Anonymized)</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• Aggregated usage statistics</li>
                  <li>• Error logs (without personal identifiers)</li>
                  <li>• Performance metrics</li>
                </ul>
                <p className="text-sm text-gray-400 mt-3">
                  This data is kept for app improvement and contains no personal information.
                </p>
              </div>
            </div>
          </div>

          {/* Retention Period */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Clock className="w-6 h-6 text-orange-400 mr-2" />
              Data Retention Period
            </h3>
            
            <div className="bg-gray-700 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <AlertCircle className="w-6 h-6 text-blue-400 mt-1" />
                <div>
                  <p className="text-gray-300 leading-relaxed">
                    <strong className="text-white">Personal data will be deleted within 30 days</strong> of your request confirmation. 
                    Some data may be retained for up to 90 days in encrypted backups for security purposes, 
                    after which it will be permanently removed from all our systems including Firebase backend.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mb-8">
            <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <Shield className="w-6 h-6 text-blue-400 mt-1" />
                <div>
                  <h4 className="font-semibold text-blue-300 mb-2">Security & Privacy</h4>
                  <p className="text-gray-300">
                    OptionXi is committed to protecting your privacy. As an educational virtual trading platform, 
                    we only collect necessary authentication data. This app will be open-source, ensuring 
                    transparency in how your data is handled.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Delete Button */}
          <div className="text-center">
            {!emailSent ? (
              <button
                onClick={handleDeleteRequest}
                disabled={isLoading}
                className="bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center space-x-3 mx-auto"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5" />
                    <span>Request Account Deletion</span>
                  </>
                )}
              </button>
            ) : (
              <div className="bg-green-900/30 border border-green-700 rounded-lg p-6">
                <div className="flex items-center justify-center space-x-3 text-green-400">
                  <CheckCircle className="w-6 h-6" />
                  <p className="font-semibold">Email request sent! Please check your email client.</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <div className="text-center text-gray-400">
              <p className="mb-2">
                <strong className="text-white">OptionXi</strong> - Virtual Trading & Stock Analysis
              </p>
              <p className="text-sm">
                Educational platform for virtual trading • Nifty 50 & Options • Open Source Project
              </p>
              <p className="text-sm mt-2">
                Contact: <a href="mailto:optionxi24@gmail.com" className="text-blue-400 hover:text-blue-300">optionxi24@gmail.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}