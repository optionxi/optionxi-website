'use client';

import React from 'react';
import { Zap, Server, Image, Scale, Code, CheckCircle, DollarSign } from 'lucide-react';

export default function ERPNextProposal() {
  // Use a ref to target the content div for potential future PDF generation logic
  const contentRef = React.useRef(null);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Print/Download Button */}
      {/* The download button is fixed and hidden on print. It will always print the current view which is optimized for desktop in the print media query. */}
      <button
        onClick={() => window.print()}
        className="fixed bottom-4 md:bottom-8 left-4 md:left-8 z-50 flex items-center gap-2 bg-slate-900 text-white px-4 py-3 md:px-6 md:py-4 rounded-full font-semibold shadow-xl hover:bg-slate-800 transition-colors print:hidden text-sm md:text-base"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
        </svg>
        Download PDF
      </button>

      {/* Main Container: Full width on small screens, fixed A4-like width on medium/print */}
      <div 
        ref={contentRef} 
        className="max-w-full md:max-w-[210mm] mx-auto bg-white shadow-2xl"
      >
        {/* Header */}
        <header className="bg-gradient-to-br from-slate-800 to-slate-900 text-white px-6 md:px-12 py-8 md:py-16 border-b-6 border-blue-600">
          <div className="text-sm uppercase tracking-[2px] text-amber-500 font-bold mb-4">
            Proposal for Manufacturing Excellence
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
            Complete Manufacturing ERP Solution
          </h1>
          <p className="text-white/80 max-w-3xl text-base md:text-lg leading-relaxed">
            A comprehensive proposal to implement <strong>ERPNext Manufacturing & HR</strong>—unifying your Production Planning, Inventory Management, Quality Control, Human Resources, and Financial Operations into a single, intelligent platform built on the robust Frappe Framework.
          </p>
        </header>

        {/* Vision Section */}
        <section className="px-6 md:px-12 py-6 md:py-8 border-b border-gray-200">
          <h2 className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-slate-900 mb-4 md:mb-6 pb-2 md:pb-3 border-b-2 border-gray-200">
            <Zap className="w-6 h-6 md:w-7 md:h-7 text-blue-600" />
            The Vision: A Unified Manufacturing Operation
          </h2>
          <p className="mb-4 text-slate-600 text-justify leading-relaxed text-sm md:text-base">
            In today&apos;s competitive manufacturing landscape, fragmented systems are the enemy of efficiency. When production planning is in spreadsheets, inventory in legacy software, and HR in separate systems, operations slow down and costs increase. This solution eliminates data silos instantly.
          </p>
          <p className="text-slate-600 text-justify leading-relaxed text-sm md:text-base">
            Our solution utilizes <strong>ERPNext Manufacturing</strong>, a world-class open-source ERP used by thousands of manufacturers globally. It serves as a &quot;Single Source of Truth,&quot; connecting every department—Production, Inventory, Purchasing, Quality, HR, and Finance—seamlessly with real-time reporting and automation.
          </p>
        </section>

        {/* Comprehensive Modules Section */}
        <section className="px-6 md:px-12 py-6 md:py-8 border-b border-gray-200">
          <h2 className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-slate-900 mb-4 md:mb-6 pb-2 md:pb-3 border-b-2 border-gray-200">
            <Server className="w-6 h-6 md:w-7 md:h-7 text-blue-600" />
            Comprehensive Manufacturing & Business Modules
          </h2>
          <p className="mb-6 md:mb-8 text-slate-600 text-justify leading-relaxed text-sm md:text-base">
            Our implementation includes the complete ERPNext suite with specialized manufacturing capabilities, ensuring end-to-end coverage of all operational processes.
          </p>

          {/* Production & Manufacturing */}
          <div className="mb-8 md:mb-10">
            <h3 className="text-xl md:text-2xl font-bold text-blue-600 border-l-4 border-amber-500 pl-4 mb-4">
              🏭 Production & Manufacturing Operations
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Multi-Level BOM', desc: 'Create detailed Bills of Materials with sub-assemblies and operations.' },
                { title: 'Work Orders', desc: 'Plan and track production orders from start to finish with real-time visibility.' },
                { title: 'Job Cards', desc: 'Break down work orders into individual tasks with workstation allocation.' },
                { title: 'Production Planning', desc: 'Material Requirements Planning (MRP) with automated purchase requisitions.' },
                { title: 'Capacity Planning', desc: 'Optimize machine and labor utilization to avoid bottlenecks.' },
                { title: 'Quality Inspection', desc: 'Define inspection parameters and conduct quality checks at every stage.' },
                { title: 'Subcontracting', desc: 'Manage outsourced operations with complete material tracking.' },
                { title: 'Batch & Serial Tracking', desc: 'Full traceability from raw materials to finished goods.' }
              ].map((feature, idx) => (
                <li key={idx} className="relative pl-6 text-sm text-slate-700">
                  <span className="absolute left-0 top-0 text-green-600 font-bold">✓</span>
                  <strong>{feature.title}:</strong> {feature.desc}
                </li>
              ))}
            </ul>
          </div>

          {/* Inventory & Warehouse */}
          <div className="mb-8 md:mb-10">
            <h3 className="text-xl md:text-2xl font-bold text-blue-600 border-l-4 border-amber-500 pl-4 mb-4">
              📦 Inventory & Warehouse Management
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Multi-Warehouse Support', desc: 'Track inventory across multiple locations in real-time.' },
                { title: 'Stock Transfers', desc: 'Automated material movement between production lines and warehouses.' },
                { title: 'Batch Management', desc: 'Track production batches with expiry dates and quality parameters.' },
                { title: 'Serial Number Tracking', desc: 'Complete product traceability throughout the supply chain.' },
                { title: 'Perpetual Inventory', desc: 'Real-time stock valuation integrated with accounting.' },
                { title: 'Reorder Levels', desc: 'Automated alerts and purchase requests when stock falls below threshold.' }
              ].map((feature, idx) => (
                <li key={idx} className="relative pl-6 text-sm text-slate-700">
                  <span className="absolute left-0 top-0 text-green-600 font-bold">✓</span>
                  <strong>{feature.title}:</strong> {feature.desc}
                </li>
              ))}
            </ul>
          </div>

          {/* HR & Payroll */}
          <div className="mb-8 md:mb-10">
            <h3 className="text-xl md:text-2xl font-bold text-blue-600 border-l-4 border-amber-500 pl-4 mb-4">
              💼 Human Resources & Payroll
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Employee Database', desc: 'Comprehensive employee records with documents and history.' },
                { title: 'Attendance Management', desc: 'Biometric integration with automated attendance tracking.' },
                { title: 'Leave Management', desc: 'Digital leave applications with multi-level approval workflows.' },
                { title: 'Payroll Processing', desc: 'Automated salary calculation with tax compliance and deductions.' },
                { title: 'Shift Management', desc: 'Configure multiple shifts for factory floor operations.' },
                { title: 'Expense Claims', desc: 'Digital expense submission and reimbursement tracking.' },
                { title: 'Performance Appraisal', desc: 'Set KPIs and conduct periodic employee reviews.' },
                { title: 'Recruitment', desc: 'Track job applicants and manage hiring pipelines.' }
              ].map((feature, idx) => (
                <li key={idx} className="relative pl-6 text-sm text-slate-700">
                  <span className="absolute left-0 top-0 text-green-600 font-bold">✓</span>
                  <strong>{feature.title}:</strong> {feature.desc}
                </li>
              ))}
            </ul>
          </div>

          {/* Finance & Accounting */}
          <div className="mb-8 md:mb-10">
            <h3 className="text-xl md:text-2xl font-bold text-blue-600 border-l-4 border-amber-500 pl-4 mb-4">
              💰 Finance & Accounting Integration
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Full Accounting Suite', desc: 'General ledger, accounts payable/receivable, and bank reconciliation.' },
                { title: 'Production Costing', desc: 'Accurate job costing with material, labor, and overhead tracking.' },
                { title: 'Purchase Management', desc: 'Complete procurement cycle from RFQ to purchase order to receipt.' },
                { title: 'Sales & Distribution', desc: 'Quotations, sales orders, delivery notes, and invoicing.' },
                { title: 'Asset Management', desc: 'Track machinery, equipment depreciation, and maintenance schedules.' },
                { title: 'Financial Reports', desc: 'Balance sheet, P&L, cash flow, and custom financial analytics.' }
              ].map((feature, idx) => (
                <li key={idx} className="relative pl-6 text-sm text-slate-700">
                  <span className="absolute left-0 top-0 text-green-600 font-bold">✓</span>
                  <strong>{feature.title}:</strong> {feature.desc}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Visual Showcase */}
        <section className="px-6 md:px-12 py-6 md:py-8 border-b border-gray-200">
          <h2 className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-slate-900 mb-4 md:mb-6 pb-2 md:pb-3 border-b-2 border-gray-200">
            <Image className="w-6 h-6 md:w-7 md:h-7 text-blue-600" />
            Visual Showcase: Manufacturing Capabilities
          </h2>

          {[
            {
              src: 'https://docs.frappe.io/files/bom-materials.png',
              caption: 'Multi-Level Bill of Materials: Define complex product hierarchies with sub-assemblies, raw materials, and operations in an intuitive tree structure.'
            },
            {
              src: 'https://frappe.io/files/work-order.png',
              caption: 'Work Order Management: Create, schedule, and track production orders with real-time status updates, material consumption, and quality checks.'
            },
            {
              src: 'https://docs.frappe.io/files/Screenshot%202025-04-08%20at%204.43.43%20PM.png',
              caption: 'Production Planning & MRP: Plan production against multiple sales orders and material requests, with intelligent material requirement calculations that automatically generate work orders and purchase requisitions for raw materials.'
            },
            {
              src: 'https://frappe.io/files/job-card.png',
              caption: 'Job Card System: Break down production into workstation-specific tasks with time tracking, employee assignment, and progress monitoring.'
            }
          ].map((visual, idx) => (
            <div key={idx} className="mb-7 md:mb-9 border border-gray-200 rounded-lg overflow-hidden shadow-md">
              <img src={visual.src} alt={`Visual ${idx + 1}`} className="w-full h-auto" />
              <div className="bg-slate-50 px-4 py-3 border-t border-gray-200 text-center text-xs md:text-sm font-semibold text-slate-700">
                {visual.caption}
              </div>
            </div>
          ))}
        </section>

        {/* Comparison Table */}
        <section className="px-6 md:px-12 py-6 md:py-8 border-b border-gray-200 overflow-x-auto">
          <h2 className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-slate-900 mb-4 md:mb-6 pb-2 md:pb-3 border-b-2 border-gray-200">
            <Scale className="w-6 h-6 md:w-7 md:h-7 text-blue-600" />
            Why ERPNext vs. Legacy Manufacturing Systems
          </h2>
          <table className="w-full border-collapse border border-gray-200 rounded-lg overflow-hidden mt-5 text-xs md:text-sm min-w-[600px] md:min-w-full">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-gray-200 px-3 md:px-4 py-3 md:py-4 text-left font-semibold text-slate-900">Feature</th>
                <th className="border border-gray-200 px-3 md:px-4 py-3 md:py-4 text-left font-semibold text-slate-900">Legacy MRP/ERP Systems</th>
                <th className="border border-gray-200 px-3 md:px-4 py-3 md:py-4 text-left font-semibold text-slate-900">ERPNext Manufacturing</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['License Type', 'Expensive per-user licensing', '100% Open Source (GPL) - Zero Licensing Fees'],
                ['Implementation Time', '6-12 months typical timeline', '2-4 weeks rapid deployment'],
                ['Customization', 'Rigid / Vendor Lock-in', 'Highly Flexible with Low-Code Tools'],
                ['Integration', 'Separate modules, complex integration', 'Native Integration: Manufacturing, Inventory, HR, Finance'],
                ['Technology Stack', 'Outdated legacy platforms', 'Modern Python & JavaScript (Cloud-Ready)'],
                ['Mobile Access', 'Limited or non-existent', 'Full Mobile App Support (iOS/Android)']
              ].map((row, idx) => (
                <tr key={idx}>
                  <td className="border border-gray-200 px-3 md:px-4 py-3 md:py-4 font-bold text-slate-700">{row[0]}</td>
                  <td className="border border-gray-200 px-3 md:px-4 py-3 md:py-4 text-slate-700">{row[1]}</td>
                  <td className="border border-gray-200 px-3 md:px-4 py-3 md:py-4 bg-green-50 text-green-800 font-semibold">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-xs text-slate-500 md:hidden">Scroll right to view the full table.</p>
        </section>

        {/* Technology Foundation */}
        <section className="px-6 md:px-12 py-6 md:py-8 border-b border-gray-200">
          <h2 className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-slate-900 mb-4 md:mb-6 pb-2 md:pb-3 border-b-2 border-gray-200">
            <Code className="w-6 h-6 md:w-7 md:h-7 text-blue-600" />
            Technology Foundation
          </h2>
          <p className="mb-6 text-slate-600 text-justify leading-relaxed text-sm md:text-base">
            ERPNext Manufacturing is built on a modern, enterprise-grade technology stack ensuring scalability, security, and performance.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {[
              { name: 'Frappe Framework', desc: 'Full-stack Python & JavaScript' },
              { name: 'ERPNext Core', desc: 'Integrated Accounting & ERP' },
              { name: 'MariaDB / PostgreSQL', desc: 'Enterprise Database Layer' },
              { name: 'REST API', desc: 'Third-party Integration Ready' }
            ].map((tech, idx) => (
              <div key={idx} className="bg-slate-100 border border-gray-200 rounded-lg px-3 py-4 md:px-5 text-center">
                <div className="font-bold text-sm md:text-base text-slate-900">{tech.name}</div>
                <div className="text-xs text-slate-600 mt-1">{tech.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Success Stories */}
        <section className="px-6 md:px-12 py-6 md:py-8 border-b border-gray-200">
          <h2 className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-slate-900 mb-4 md:mb-6 pb-2 md:pb-3 border-b-2 border-gray-200">
            <CheckCircle className="w-6 h-6 md:w-7 md:h-7 text-blue-600" />
            Proven Manufacturing Success Stories
          </h2>
          
          {[
            {
              title: 'AGI - Manufacturing & Distribution',
              content: 'AGI overcame operational limitations by implementing ERPNext as a comprehensive platform addressing all their critical needs. Achieved successful on-time go-live, increased sales order to cash efficiency, and improved inventory turnover. The solution fostered data-driven decision making and operational excellence.',
              link: 'https://frappe.io/stories/AGI'
            },
            {
              title: 'Furniture Bazaar (Australia) - Retail & Manufacturing',
              content: 'Western Australia\'s leading furniture provider upgraded their Point-of-Sale system with ERPNext to elevate customer experience. Achieved successful on-time implementation with increased sales order to cash efficiency and improved inventory turnover, resulting in a more efficient and customer-centric operation.',
              link: 'https://frappe.io/stories/Furniture%20Bazaar'
            },
            {
              title: 'Rely Industries (Saudi Arabia) - Turnkey Fit-outs & Furniture Manufacturing',
              content: 'Leading Middle East manufacturer specializing in exhibitions and furniture production, including Dubai Expo 2020 pavilions. Implemented customized ERPNext solution with tailored project management integrated with manufacturing modules, managing 100+ employees and delivering accurate project estimation, budgeting, and resource allocation.',
              link: 'https://frappe.io/stories/Rely%20Industries'
            }
          ].map((story, idx) => (
            <div key={idx} className="bg-slate-50 border-l-4 border-blue-600 rounded-xl p-4 md:p-6 mb-4 md:mb-5">
              <h4 className="font-bold text-base md:text-lg text-slate-900 mb-2">{story.title}</h4>
              <p className="text-slate-600 text-xs md:text-sm mb-3 leading-relaxed">{story.content}</p>
              <a href={story.link} className="text-blue-600 text-xs md:text-sm font-semibold hover:underline">
                Read Case Study →
              </a>
            </div>
          ))}
        </section>

        {/* Pricing Section */}
        <section className="px-6 md:px-12 py-6 md:py-8">
          <h2 className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-slate-900 mb-4 md:mb-6 pb-2 md:pb-3 border-b-2 border-gray-200">
            <DollarSign className="w-6 h-6 md:w-7 md:h-7 text-blue-600" />
            Investment & Pricing Plans
          </h2>
          
          {/* Setup Fee */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 md:p-6 mb-8 md:mb-10 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-3 md:mb-0">
              <h4 className="text-lg md:text-xl font-bold text-blue-900 mb-1 md:mb-2">🚀 One-Time Onboarding & Setup Fee</h4>
              <p className="text-xs md:text-sm text-slate-700">
                Includes Server Setup, Data Migration, BOM Configuration, Workstation Setup, and <strong>3 Days of Comprehensive Staff Training</strong> (Production, Inventory, HR, and Management Teams).
              </p>
            </div>
            <div className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2 md:mt-0">₹18,999</div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Standard Plan */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-lg">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">Standard</h3>
              <p className="text-xs md:text-sm text-slate-600 mb-4 md:mb-5 min-h-[40px]">
                Perfect for small to mid-sized manufacturers starting their digital transformation journey.
              </p>
              <div className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-5 md:mb-6">
                ₹3,399 <span className="text-sm md:text-base font-medium text-slate-600">/month</span>
              </div>
              <ul className="space-y-3">
                {[
                  'Core Manufacturing Module (BOM, Work Orders, Job Cards)',
                  'Inventory & Warehouse Management',
                  'Basic Quality Inspection',
                  'Purchase & Sales Management',
                  'HR & Payroll (Employee, Attendance, Leave)',
                  'Complete Accounting Suite',
                  'Standard Support (Remote)'
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs md:text-sm text-slate-700">
                    <span className="text-green-600">✅</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Premium Plan */}
            <div className="bg-[#FAFAFF] border-2 border-blue-600 rounded-xl p-6 md:p-8 shadow-2xl relative lg:transform lg:scale-105">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider">
                RECOMMENDED
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">Premium</h3>
              <p className="text-xs md:text-sm text-slate-600 mb-4 md:mb-5 min-h-[40px]">
                Complete enterprise solution for manufacturers requiring advanced automation, mobile access, and enhanced connectivity.
              </p>
              <div className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-5 md:mb-6">
                ₹6,999 <span className="text-sm md:text-base font-medium text-slate-600">/month</span>
              </div>
              <ul className="space-y-3">
                {[
                  'Everything in Standard',
                  'Advanced Production Planning & Scheduling',
                  'Custom Supplier & Customer Portal',
                  'Flutter Mobile App (iOS/Android)',
                  'Payment Gateway Integration',
                  'WhatsApp API Integration (Notifications & Alerts)',
                  'Priority Support (On-site)'
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs md:text-sm text-slate-700">
                    <span className="text-green-600">✅</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-white">
          <div className="px-6 md:px-12 py-8 md:py-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">ERPNext Education</h2>
              <p className="text-white/70 text-sm leading-relaxed max-w-md">
                Empowering institutions with open-source technology. Streamline your administration, engage your students, and secure your data with our managed education solutions.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-amber-500 mb-3 md:mb-4">Contact Us</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-amber-500">📞</span>
                  <span>+919496672190</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-500">✉️</span>
                  <a href="mailto:jibin@optionxi.com" className="text-blue-400 hover:underline font-semibold">
                    jibin@optionxi.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-500">📍</span>
                  <span>Palakkad, Kerala</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-black/20 px-6 md:px-12 py-3 md:py-5 flex flex-col md:flex-row justify-between text-xs text-white/50 text-center md:text-left">
            <span>© 2024 OptionXi. All Rights Reserved.</span>
            <span className="mt-1 md:mt-0">Powered by Frappe Technologies</span>
          </div>
        </footer>
      </div>
    </div>
  );
}