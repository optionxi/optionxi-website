'use client';

import React from 'react';
import { Zap, Server, Scale, Code, CheckCircle, DollarSign, Award, Image } from 'lucide-react';

export default function ERPNextProposal() {
  const features = [
    {
      category: "🎓 Core Academics & Student Administration",
      items: [
        { title: "Admission Lifecycle", desc: "Track form Inquiry to Enrollment." },
        { title: "Program Management", desc: "Define courses, batches, and academic terms." },
        { title: "Timetabling", desc: "Conflict-free scheduling for rooms and instructors." },
        { title: "Assessment Plan", desc: "Create grading scales (GPA/CgPA) and exam schedules." },
        { title: "Report Cards", desc: "One-click generation of professional grade cards." },
        { title: "Attendance", desc: "Mobile-based marking and automated parent alerts." }
      ]
    },
    {
      category: "💥 Human Resources (HR) & Payroll",
      items: [
        { title: "Employee Database", desc: "Manage all staff profiles (teaching/non-teaching)." },
        { title: "Leave Management", desc: "Automated leave applications and approval workflows." },
        { title: "Payroll Processing", desc: "Generate salary slips based on attendance and tax rules." },
        { title: "Expense Claims", desc: "Digital submission and reimbursement for faculty expenses." },
        { title: "Recruitment", desc: "Track job applicants and faculty hiring pipelines." },
        { title: "Performance Review", desc: "Define and track staff appraisal cycles." }
      ]
    },
    {
      category: "💻 Web Portals & Communication",
      items: [
        { title: "Student Portal", desc: "Secure login for students to view attendance and grades." },
        { title: "Parent Access", desc: "Guardians can track child performance and pay fees." },
        { title: "Faculty Portal", desc: "Teachers can mark attendance and update grades remotely." },
        { title: "Alumni Management", desc: "Maintain and engage with former students." }
      ]
    },
    {
      category: "💰 Finance & Core ERP",
      items: [
        { title: "Fee Management", desc: "Recurring invoices, fine automation, and payment tracking." },
        { title: "Accounting", desc: "Full general ledger, balance sheet, and P&L generation." },
        { title: "Asset Management", desc: "Track computers, lab equipment, and furniture." },
        { title: "Purchasing", desc: "Manage procurement of stationary and campus supplies." }
      ]
    }
  ];

  const visuals = [
    {
      url: "https://github.com/user-attachments/assets/46af048c-749f-41f7-8d10-47e4fa643592",
      caption: "Smart Class Scheduling: ERPNext auto-generates conflict-free timetables by matching instructors, courses, rooms, and available time slots."
    },
    {
      url: "https://github.com/user-attachments/assets/78263a31-eb9f-45f0-a7a4-486f75c2b774",
      caption: "Student 360° Profile: Manage bio-data, guardian details, address, and academic history in one place."
    },
    {
      url: "https://github.com/user-attachments/assets/7dcf7e7b-a003-4520-a41e-84ca553e7f0d",
      caption: "Advanced Fee Configuration: Handle complex structures, discounts, scholarships, and automated invoicing."
    },
    {
      url: "https://github.com/user-attachments/assets/0640c623-bc81-4308-a15d-53a5977d5011",
      caption: "Student Self-Service Portal: Students can view timetables, download report cards, and pay fees online."
    }
  ];

  const comparison = [
    { feature: "License Type", careerbook: "Proprietary / Paid per student", erpnext: "100% Open Source (GPL)", winner: true },
    { feature: "Integration", careerbook: "Academic Focus Only", erpnext: "Native Accounting, HR & Buying", winner: true },
    { feature: "Customization", careerbook: "Rigid / Vendor Dependent", erpnext: "High (Low-code DocTypes)", winner: true },
    { feature: "Tech Stack", careerbook: "Ruby on Rails (Older)", erpnext: "Python & JavaScript (Modern)", winner: true }
  ];

  const techStack = [
    { name: "Frappe Framework", desc: "Full-stack Python & JS" },
    { name: "ERPNext", desc: "Accounting & Inventory Core" },
    { name: "Frappe UI", desc: "Modern Vue-based Interface" }
  ];

  return (
    <div className="min-h-screen  bg-gray-900">
      {/* Print Button - Fixed position, hidden on print */}
      <button 
        onClick={() => window.print()}
        className="fixed bottom-4 left-4 sm:bottom-8 sm:left-8 bg-slate-900 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold text-sm sm:text-base shadow-xl hover:bg-slate-800 transition-all z-50 flex items-center gap-2 print:hidden"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
        </svg>
        Download PDF
      </button>

      {/* Main Container - max-w-full on mobile, fixed width for desktop/print */}
      <div className="max-w-full md:max-w-[210mm] mx-auto bg-white shadow-2xl">
        
        {/* Header */}
        <header className="bg-gradient-to-br from-slate-800 to-slate-900 text-white px-6 py-10 md:px-12 md:py-16 border-b-8 border-blue-600">
          <div className="text-amber-500 text-xs sm:text-sm font-bold uppercase tracking-widest mb-2 md:mb-4">
            Proposal for Digital Transformation
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-3 md:mb-4 leading-snug md:leading-tight">
            Campus ERP Implementation
          </h1>
          <p className="text-slate-200 max-w-3xl text-sm sm:text-lg">
            A comprehensive proposal to implement the <strong>ERPNext Education Module</strong>—unifying your Academic, Financial, and HR operations into a single, intelligent platform, built on the robust Frappe Framework.
          </p>
        </header>

        {/* Vision Section */}
        <section className="px-6 py-8 md:px-12 md:py-10 border-b border-slate-200">
          <h2 className="flex items-center gap-3 text-2xl sm:text-3xl font-bold text-slate-900 mb-4 md:mb-6 pb-2 md:pb-3 border-b-2 border-slate-200">
            <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
            The Vision: A Connected Campus
          </h2>
          <p className="text-slate-600 mb-3 text-sm sm:text-base text-justify">
            In today&apos;s educational landscape, fragmented data is the enemy of efficiency. When admissions are on paper, fees in Excel, and grades in a legacy system, administration slows down. This system eliminates data silos instantly.
          </p>
          <p className="text-slate-600 text-sm sm:text-base text-justify">
            Our solution utilizes <strong>ERPNext Education</strong>, a world-class open-source ERP used by thousands of institutions globally. It serves as a &quot;Single Source of Truth,&quot; connecting every stakeholder—Students, Parents, Faculty, and Admin—seamlessly with real-time reporting and automation.
          </p>
        </section>

        {/* Functional Modules */}
        <section className="px-6 py-8 md:px-12 md:py-10 border-b border-slate-200">
          <h2 className="flex items-center gap-3 text-2xl sm:text-3xl font-bold text-slate-900 mb-4 md:mb-6 pb-2 md:pb-3 border-b-2 border-slate-200">
            <Server className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
            Functional Modules (ERPNext & Frappe Education)
          </h2>
          <p className="text-slate-600 mb-6 text-sm sm:text-base">
            Our implementation includes the full core ERPNext suite alongside the specialized Education module, ensuring comprehensive coverage of all institutional processes.
          </p>

          {features.map((section, idx) => (
            <div key={idx} className="mb-8 md:mb-10">
              <h3 className="text-xl sm:text-2xl font-bold text-blue-600 mb-3 border-l-4 border-amber-500 pl-3 md:pl-4">
                {section.category}
              </h3>
              {/* Responsive Grid: single column on mobile, two columns on desktop */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div className='text-sm sm:text-base'>
                      <strong className="text-slate-900">{item.title}:</strong>
                      <span className="text-slate-600"> {item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Visual Showcase */}
        <section className="px-6 py-8 md:px-12 md:py-10 border-b border-slate-200">
          <h2 className="flex items-center gap-3 text-2xl sm:text-3xl font-bold text-slate-900 mb-4 md:mb-6 pb-2 md:pb-3 border-b-2 border-slate-200">
            <Image className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
            Visual Showcase: Platform Capabilities
          </h2>

          {visuals.map((visual, idx) => (
            <div key={idx} className="mb-6 md:mb-8 border border-slate-200 rounded-lg overflow-hidden shadow-md">
              {/* Image URL remains the same, but the container ensures it fits */}
              <img src={visual.url} alt={`Platform screenshot ${idx + 1}`} className="w-full h-auto" />
              <div className="bg-slate-50 px-4 py-3 md:px-5 border-t border-slate-200 text-center">
                <p className="text-xs sm:text-sm font-semibold text-slate-700">{visual.caption}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Comparison Table */}
        <section className="px-6 py-8 md:px-12 md:py-10 border-b border-slate-200">
          <h2 className="flex items-center gap-3 text-2xl sm:text-3xl font-bold text-slate-900 mb-4 md:mb-6 pb-2 md:pb-3 border-b-2 border-slate-200">
            <Scale className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
            Why ERPNext vs. Careerbook
          </h2>
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="min-w-full">
              <thead>
                <tr className="bg-slate-100 text-xs sm:text-sm">
                  <th className="px-3 py-3 md:px-4 md:py-4 text-left font-semibold text-slate-900">Feature</th>
                  <th className="px-3 py-3 md:px-4 md:py-4 text-left font-semibold text-slate-900">Careerbook</th>
                  <th className="px-3 py-3 md:px-4 md:py-4 text-left font-semibold text-slate-900">ERPNext Education</th>
                </tr>
              </thead>
              <tbody className='text-xs sm:text-sm'>
                {comparison.map((row, idx) => (
                  <tr key={idx} className="border-t border-slate-200">
                    <td className="px-3 py-3 md:px-4 md:py-4 font-semibold text-slate-900">{row.feature}</td>
                    <td className="px-3 py-3 md:px-4 md:py-4 text-slate-600">{row.careerbook}</td>
                    <td className={`px-3 py-3 md:px-4 md:py-4 font-semibold ${row.winner ? 'bg-green-50 text-green-800' : 'text-slate-600'}`}>
                      {row.erpnext}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="px-6 py-8 md:px-12 md:py-10 border-b border-slate-200">
          <h2 className="flex items-center gap-3 text-2xl sm:text-3xl font-bold text-slate-900 mb-4 md:mb-6 pb-2 md:pb-3 border-b-2 border-slate-200">
            <Code className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
            Under the Hood
          </h2>
          <p className="text-slate-600 mb-6 text-sm sm:text-base">
            Frappe Education is built on a modern, robust technology stack ensuring scalability and security.
          </p>
          {/* Responsive Grid: single column on mobile, three columns on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {techStack.map((tech, idx) => (
              <div key={idx} className="bg-slate-100 border border-slate-200 rounded-lg px-4 py-3 md:px-6 md:py-5 text-center">
                <div className="font-bold text-sm md:text-base text-slate-900 mb-1">{tech.name}</div>
                <div className="text-xs md:text-sm text-slate-600">{tech.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Success Stories */}
        <section className="px-6 py-8 md:px-12 md:py-10 border-b border-slate-200">
          <h2 className="flex items-center gap-3 text-2xl sm:text-3xl font-bold text-slate-900 mb-4 md:mb-6 pb-2 md:pb-3 border-b-2 border-slate-200">
            <Award className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
            Proven Success
          </h2>

          <div className="bg-slate-50 border-l-4 border-blue-600 rounded-xl p-4 md:p-6 mb-5">
            <h4 className="text-lg md:text-xl font-bold text-slate-900 mb-2">Sandra Shroff Gnyan Dham School</h4>
            <p className="text-slate-600 mb-3 text-sm sm:text-base">
              Streamlined operations for 2,000+ students, reducing administrative workload by 15 hours/week and digitizing fee collection.
            </p>
            <a href="https://frappe.io/stories/Sandra%20Shroff%20Gnyan%20Dham%20School" className="text-blue-600 font-semibold text-xs sm:text-sm hover:underline">
              Read Case Study →
            </a>
          </div>

          <div className="bg-slate-50 border-l-4 border-blue-600 rounded-xl p-4 md:p-6">
            <h4 className="text-lg md:text-xl font-bold text-slate-900 mb-2">Walnut Schools (K-12 Education, India)</h4>
            <p className="text-slate-600 mb-3 text-sm sm:text-base">
              Streamlined parent communication, ticketing & support workflows using ERPNext + Frappe Helpdesk & Wiki — resulting in faster responses, better record-keeping, and overall smoother operations. 100% of school operations including admissions, student management, fees, inventory, LMS, HR, payroll and more moved into one unified system.
            </p>
            <a href="https://frappe.io/stories/Walnut%20Schools" className="text-blue-600 font-semibold text-xs sm:text-sm hover:underline">
              Read Case Study →
            </a>
          </div>
        </section>

        {/* Pricing */}
        <section className="px-6 py-8 md:px-12 md:py-10">
          <h2 className="flex items-center gap-3 text-2xl sm:text-3xl font-bold text-slate-900 mb-4 md:mb-6 pb-2 md:pb-3 border-b-2 border-slate-200">
            <DollarSign className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
            Investment & Pricing Plans
          </h2>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 md:p-6 mb-8 flex flex-col sm:flex-row justify-between items-center sm:items-start text-center sm:text-left">
            <div>
              <h4 className="text-lg md:text-xl font-bold text-blue-900 mb-2">🚀 One-Time Onboarding & Setup Fee</h4>
              <p className="text-slate-700 text-sm sm:text-base">
                Includes Server Provisioning, Master Data Migration, Fee Structure Configuration, and <strong>3 Days of Intensive Staff Training.</strong>
              </p>
            </div>
            <div className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-4 sm:mt-0">₹8,999</div>
          </div>

          {/* Responsive Grid: single column on mobile, two columns on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Standard Plan */}
            <div className="relative bg-gradient-to-br from-blue-50 to-white border-2 border-blue-600 rounded-xl p-6 md:p-8 shadow-lg md:transform md:scale-105">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider">
                RECOMMENDED
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">Standard</h3>
              <p className="text-slate-600 mb-4 md:mb-6 min-h-[48px] text-sm sm:text-base">
                Perfect for small to mid-sized colleges or schools starting their digital transformation journey.
              </p>
              <div className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 md:mb-6">
                ₹3,399 <span className="text-sm md:text-base font-medium text-slate-600">/month</span>
              </div>
              <ul className="space-y-3 text-sm sm:text-base">
                {["Core ERPNext & Education Module", "Student & Faculty Database", "Fee Management & Invoicing", "Basic Attendance Tracking", "Standard Report Cards & GPA", "Standard Support (Remote)"].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-slate-700">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Premium Plan */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-md">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">Premium</h3>
              <p className="text-slate-600 mb-4 md:mb-6 min-h-[48px] text-sm sm:text-base">
                Full-stack solution for modern institutions requiring comprehensive e-learning and advanced communication.
              </p>
              <div className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 md:mb-6">
                ₹6,999 <span className="text-sm md:text-base font-medium text-slate-600">/month</span>
              </div>
              <ul className="space-y-3 text-sm sm:text-base">
                {["Everything in Standard", "Integrated Learning Management System (LMS)", "Custom Student/Parent Portal", "Flutter Mobile App (iOS/Android)", "Payment Gateway Integration", "WhatsApp API Integration (Notifications)", "Priority Support (On premise)"].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-slate-700">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-white">
          {/* Responsive Grid: single column on mobile, two columns on desktop */}
          <div className="px-6 py-8 md:px-12 md:py-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">ERPNext Education</h2>
              <p className="text-slate-300 max-w-md text-sm sm:text-base">
                Empowering institutions with open-source technology. Streamline your administration, engage your students, and secure your data with our managed education solutions.
              </p>
            </div>
            <div>
              <h4 className="text-base md:text-lg font-bold text-amber-500 mb-3 md:mb-4">Contact Us</h4>
              <div className="space-y-3 text-slate-200 text-sm sm:text-base">
                <div className="flex items-center gap-2">
                  <span>📞</span> +919496672190
                </div>
                <div className="flex items-center gap-2">
                  <span>✉️</span> 
                  <a href="mailto:jibin@optionxi.com" className="text-blue-400 hover:underline">
                    jibin@optionxi.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span>📍</span> Palakkad, Kerala
                </div>
              </div>
            </div>
          </div>
          <div className="bg-slate-950 bg-opacity-50 px-6 md:px-12 py-4 md:py-5 flex flex-col sm:flex-row justify-between text-xs sm:text-sm text-slate-400 text-center sm:text-left">
            <span>© 2024 OptionXi. All Rights Reserved.</span>
            <span>Powered by Frappe Technologies</span>
          </div>
        </footer>
      </div>
    </div>
  );
}