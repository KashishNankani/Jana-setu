'use client';

import { useState } from 'react';

export default function ReportsManagementPage() {
  const [activeTab, setActiveTab] = useState<'prebuilt' | 'custom' | 'scheduled'>('prebuilt');
  const [reportType, setReportType] = useState('Complaint Summary');
  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [format, setFormat] = useState<'PDF' | 'Excel'>('PDF');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSuccess, setGeneratedSuccess] = useState<string | null>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedSuccess(`âœ“ ${reportType} generated successfully in ${format} format!`);
      setTimeout(() => setGeneratedSuccess(null), 4000);
    }, 1200);
  };

  const handleDownload = (reportName: string) => {
    alert(`Downloading official PDF for "${reportName}" (Indore Municipal Corporation Official Format)...`);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reports</h1>
          <p className="text-xs text-slate-500 mt-1">
            Generate and analyze official civic reports to track municipal performance and officer accountability.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start">
          {[
            { id: 'prebuilt', label: 'Pre-built Reports' },
            { id: 'custom', label: 'Custom Reports' },
            { id: 'scheduled', label: 'Scheduled Reports' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg">
              ðŸ“„
            </span>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              +22% vs last month
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-500">Total Reports Generated</p>
          <p className="text-3xl font-black text-slate-900">128</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-lg">
              ðŸ‘ï¸
            </span>
            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
              Viewed 42 times
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-500">Most Viewed Report</p>
          <p className="text-lg font-bold text-slate-900 truncate">Ward Performance</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg">
              ðŸ“…
            </span>
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
              Next: Tomorrow 9:00 AM
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-500">Scheduled Reports</p>
          <p className="text-3xl font-black text-slate-900">8</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-lg">
              â¬‡ï¸
            </span>
            <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
              +18% vs last month
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-500">Reports Downloaded</p>
          <p className="text-3xl font-black text-slate-900">356</p>
        </div>
      </div>

      {/* Main Grid: Popular Reports Table (Left) + Generator Sidebar (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column (Span 2): Popular Reports Table */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Popular Reports</h3>
                <p className="text-xs text-slate-500">Official audited reports for administrative oversight.</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-bold text-[10px] uppercase">
                    <th className="pb-3">Report Name</th>
                    <th className="pb-3">Description</th>
                    <th className="pb-3">Last Generated</th>
                    <th className="pb-3">Format</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[
                    {
                      name: 'Ward Performance Report',
                      desc: 'Performance overview of all wards based on SLA resolution rate & feedback.',
                      time: '17 May 2025, 10:30 AM',
                      format: 'PDF',
                      formatColor: 'bg-rose-50 text-rose-600 border-rose-200',
                      icon: 'ðŸ™ï¸',
                    },
                    {
                      name: 'Complaint Summary Report',
                      desc: 'Summary of complaints by category, department queues, and priority status.',
                      time: '17 May 2025, 09:15 AM',
                      format: 'PDF',
                      formatColor: 'bg-rose-50 text-rose-600 border-rose-200',
                      icon: 'ðŸ“Š',
                    },
                    {
                      name: 'Environmental Impact Report',
                      desc: 'Analysis of solid waste clearing, water pipe leak prevention & green index.',
                      time: '16 May 2025, 05:45 PM',
                      format: 'PDF',
                      formatColor: 'bg-rose-50 text-rose-600 border-rose-200',
                      icon: 'ðŸƒ',
                    },
                    {
                      name: 'Community Engagement Report',
                      desc: 'Citizen verification rates, Yes/No response times and reporter counts.',
                      time: '16 May 2025, 04:20 PM',
                      format: 'XLSX',
                      formatColor: 'bg-emerald-50 text-emerald-600 border-emerald-200',
                      icon: 'ðŸ‘¥',
                    },
                    {
                      name: 'Department Performance Report',
                      desc: 'SLA compliance, extension requests approved/rejected, and officer history scores.',
                      time: '16 May 2025, 03:10 PM',
                      format: 'PDF',
                      formatColor: 'bg-rose-50 text-rose-600 border-rose-200',
                      icon: 'ðŸ›ï¸',
                    },
                  ].map((r, i) => (
                    <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 pr-3">
                        <div className="flex items-center gap-2.5 font-bold text-slate-800">
                          <span className="text-base">{r.icon}</span>
                          <span className="truncate">{r.name}</span>
                        </div>
                      </td>
                      <td className="py-3.5 text-slate-500 max-w-xs leading-relaxed text-[11px]">
                        {r.desc}
                      </td>
                      <td className="py-3.5 text-slate-400 whitespace-nowrap text-[11px]">
                        {r.time}
                      </td>
                      <td className="py-3.5 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${r.formatColor}`}>
                          {r.format}
                        </span>
                      </td>
                      <td className="py-3.5 text-right whitespace-nowrap space-x-1.5">
                        <button
                          onClick={() => handleDownload(r.name)}
                          className="px-2.5 py-1 text-[11px] font-bold text-brand-600 bg-brand-50 hover:bg-brand-100 rounded-lg transition-colors"
                        >
                          Download
                        </button>
                        <button
                          onClick={() => alert(`Opening preview modal for "${r.name}"`)}
                          className="px-2 py-1 text-[11px] font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          ðŸ‘ï¸
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Insights Charts */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Report Insights & Trends</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              {/* Category Breakdown */}
              <div className="space-y-2">
                <span className="font-bold text-slate-700">Top Issues This Week</span>
                <div className="space-y-1.5 pt-1">
                  {[
                    { label: 'Garbage / Waste', pct: 42, color: 'bg-emerald-500' },
                    { label: 'Water Supply', pct: 20, color: 'bg-blue-500' },
                    { label: 'Drainage', pct: 15, color: 'bg-purple-500' },
                    { label: 'Street Light', pct: 12, color: 'bg-amber-500' },
                    { label: 'Others', pct: 11, color: 'bg-slate-400' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-[11px]">
                      <span className="flex items-center gap-1.5 text-slate-600">
                        <span className={`w-2 h-2 rounded-full ${item.color}`} />
                        <span>{item.label}</span>
                      </span>
                      <span className="font-bold text-slate-800">{item.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resolution Time Trend */}
              <div className="space-y-2">
                <span className="font-bold text-slate-700">Resolution Time Trend</span>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                  <p className="text-2xl font-black text-brand-600">18.6 hrs</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Average time to resolution</p>
                  <p className="text-[10px] text-emerald-600 font-bold mt-1">â†“ 10% faster than last week</p>
                </div>
              </div>

              {/* Reports by Format */}
              <div className="space-y-2">
                <span className="font-bold text-slate-700">Reports by Format</span>
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <span className="w-2 h-2 rounded-full bg-rose-500" /> PDF Document
                    </span>
                    <span className="font-bold text-slate-800">72% (924)</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" /> Excel Spreadsheet
                    </span>
                    <span className="font-bold text-slate-800">18% (231)</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <span className="w-2 h-2 rounded-full bg-blue-500" /> CSV Raw Data
                    </span>
                    <span className="font-bold text-slate-800">10% (123)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Generate Report Form & Summary */}
        <div className="space-y-6">
          {/* Generate New Report Form */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Generate New Report</h3>
              <p className="text-xs text-slate-500">Create a custom administrative report.</p>
            </div>

            {generatedSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold animate-fade-in">
                {generatedSuccess}
              </div>
            )}

            <form onSubmit={handleGenerate} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Report Type</label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                >
                  <option value="Complaint Summary">Complaint Summary</option>
                  <option value="Ward Performance">Ward Performance</option>
                  <option value="SLA Breach & Accountability Audit">SLA Breach & Accountability Audit</option>
                  <option value="Officer Verification Audit">Officer Verification Audit</option>
                  <option value="Environmental Impact Index">Environmental Impact Index</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Date Range</label>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium flex items-center justify-between">
                  <span>ðŸ“… 10 May 2025 - 17 May 2025</span>
                  <span className="text-slate-400 text-[10px]">Last 7 Days</span>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Department</label>
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                >
                  <option value="All Departments">All Departments</option>
                  <option value="Waste Management Department">Waste Management Department</option>
                  <option value="Water Supply Department">Water Supply Department</option>
                  <option value="Roads & Infrastructure">Roads & Infrastructure</option>
                  <option value="Drainage & Sewerage">Drainage & Sewerage</option>
                  <option value="Electrical Department">Electrical Department</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Format</label>
                <div className="flex items-center gap-4 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-800">
                    <input
                      type="radio"
                      name="format"
                      checked={format === 'PDF'}
                      onChange={() => setFormat('PDF')}
                      className="text-brand-500 focus:ring-brand-500"
                    />
                    <span>PDF Document</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-800">
                    <input
                      type="radio"
                      name="format"
                      checked={format === 'Excel'}
                      onChange={() => setFormat('Excel')}
                      className="text-brand-500 focus:ring-brand-500"
                    />
                    <span>Excel (.xlsx)</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className="w-full py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 pt-2"
              >
                <span>{isGenerating ? 'Compiling Official Report...' : 'ðŸ“„ Generate Report'}</span>
              </button>
            </form>
          </div>

          {/* Reports Summary */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-3 text-xs">
            <h4 className="font-bold text-slate-900 border-b border-slate-100 pb-2">Reports Summary</h4>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">This Week:</span>
              <span className="font-bold text-slate-900">28</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">This Month:</span>
              <span className="font-bold text-slate-900">128</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Last Month:</span>
              <span className="font-bold text-slate-900">105</span>
            </div>
            <div className="flex justify-between py-1 font-bold text-brand-600 border-t border-slate-100 pt-2">
              <span>Total Generated:</span>
              <span>1,248</span>
            </div>
          </div>

          {/* Scheduled Reports Card */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900">Scheduled Reports</h4>
              <span className="text-[10px] text-brand-600 font-bold">Manage â€º</span>
            </div>

            <div className="space-y-2">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-800">Daily Complaint Summary</p>
                  <p className="text-[10px] text-slate-400">Daily at 9:00 AM</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                  Active
                </span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-800">Weekly Ward Report</p>
                  <p className="text-[10px] text-slate-400">Every Monday at 10:00 AM</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
