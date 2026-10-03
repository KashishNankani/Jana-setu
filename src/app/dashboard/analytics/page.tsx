'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DEMO_WARD_DATA } from '@/lib/demo-data';

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('10 May 2025 - 17 May 2025');
  const [compareRange, setCompareRange] = useState('03 May - 09 May 2025');

  return (
    <div className="space-y-6 animate-fade-in pb-12 font-sans text-slate-900">
      {/* Top Header Bar matching Style Reference 6.jpeg */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>Ward Analytics</span>
            <span className="text-xs text-slate-400 font-normal">ⓘ</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Detailed insights and trends across wards and environmental parameters.
          </p>
        </div>

        {/* Controls: Date Pickers & Solid Green Export Button */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs">
            <span>📅</span>
            <span>{dateRange}</span>
            <span className="text-slate-400">▾</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs">
            <span className="text-slate-400">Compare with:</span>
            <span>{compareRange}</span>
            <span className="text-slate-400">▾</span>
          </div>

          <button
            onClick={() => alert('Exporting Official Ward Analytics Report PDF...')}
            className="flex items-center gap-2 px-4 py-2 bg-[#1B8A2A] hover:bg-[#157322] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
          >
            <span>📥</span>
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Top 5 KPI Cards Row matching 6.jpeg */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Card 1: Total Complaints */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-bold">
              📋
            </span>
            <span className="text-[10px] font-bold text-emerald-600">+18% vs last week</span>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Total Complaints</p>
            <p className="text-2xl font-black text-slate-900 mt-0.5">1,248</p>
          </div>
          <div className="h-5 flex items-end gap-1 pt-1 opacity-70">
            {[35, 50, 65, 45, 70, 85, 95].map((h, i) => (
              <span key={i} className="flex-1 bg-blue-500 rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        {/* Card 2: Resolved Complaints */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="w-8 h-8 rounded-lg bg-emerald-50 text-[#1B8A2A] flex items-center justify-center text-sm font-bold">
              ✓
            </span>
            <span className="text-[10px] font-bold text-emerald-600">+25% vs last week</span>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Resolved Complaints</p>
            <p className="text-2xl font-black text-slate-900 mt-0.5">692</p>
          </div>
          <div className="h-5 flex items-end gap-1 pt-1 opacity-70">
            {[30, 45, 60, 70, 75, 85, 100].map((h, i) => (
              <span key={i} className="flex-1 bg-[#1B8A2A] rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        {/* Card 3: Avg Resolution Time */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center text-sm font-bold">
              ⏱
            </span>
            <span className="text-[10px] font-bold text-purple-600">-10% vs last week</span>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Avg Resolution Time</p>
            <p className="text-2xl font-black text-slate-900 mt-0.5">18.6 <span className="text-sm font-normal text-slate-400">hrs</span></p>
          </div>
          <div className="h-5 flex items-end gap-1 pt-1 opacity-70">
            {[75, 65, 55, 50, 45, 40, 35].map((h, i) => (
              <span key={i} className="flex-1 bg-purple-500 rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        {/* Card 4: Citizen Engagement */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-sm font-bold">
              👥
            </span>
            <span className="text-[10px] font-bold text-amber-600">+21% vs last week</span>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Citizen Engagement</p>
            <p className="text-2xl font-black text-slate-900 mt-0.5">2,847</p>
          </div>
          <div className="h-5 flex items-end gap-1 pt-1 opacity-70">
            {[40, 50, 60, 65, 75, 80, 90].map((h, i) => (
              <span key={i} className="flex-1 bg-amber-500 rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        {/* Card 5: Environmental Score */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="w-8 h-8 rounded-lg bg-emerald-50 text-[#1B8A2A] flex items-center justify-center text-sm font-bold">
              🍃
            </span>
            <span className="text-[10px] font-bold text-[#1B8A2A]">+8 vs last week</span>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Environmental Score</p>
            <p className="text-2xl font-black text-slate-900 mt-0.5">
              82<span className="text-xs text-slate-400 font-bold">/100</span>
            </p>
          </div>
          <div className="h-5 flex items-end gap-1 pt-1 opacity-70">
            {[55, 60, 65, 70, 75, 78, 82].map((h, i) => (
              <span key={i} className="flex-1 bg-[#1B8A2A] rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Heat Map, Issues by Category Donut, Trends Over Time matching 6.jpeg */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Heat Map Card (4 cols) */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <span>Complaint Heat Map</span>
              <span className="text-[10px] text-slate-400">ⓘ</span>
            </h2>
            <div className="text-[10px] font-bold text-slate-600 border border-slate-200 px-2 py-0.5 rounded-lg">
              All Issues ▾
            </div>
          </div>

          <div className="relative h-56 rounded-xl overflow-hidden border border-slate-200 bg-[#E5E9EE]">
            <div className="absolute inset-0 bg-[radial-gradient(#94A3B8_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

            {/* Simulated Heatmap Glow Patches */}
            <div className="absolute top-10 left-16 w-20 h-20 rounded-full bg-rose-500/40 blur-md" />
            <div className="absolute bottom-12 right-20 w-16 h-16 rounded-full bg-amber-500/40 blur-md" />
            <div className="absolute top-20 right-12 w-14 h-14 rounded-full bg-emerald-500/40 blur-md" />

            <span className="absolute top-4 left-6 text-[9px] font-bold text-slate-500">Ward 3</span>
            <span className="absolute top-10 right-10 text-[9px] font-bold text-slate-500">Ward 12</span>
            <span className="absolute bottom-8 left-10 text-[9px] font-bold text-slate-500">Ward 13</span>
            <span className="absolute bottom-4 right-16 text-[9px] font-bold text-slate-500">Ward 20</span>
          </div>

          <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500 pt-1">
            <span>Low</span>
            <div className="flex-1 mx-3 h-2 rounded-full bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-500" />
            <span>High</span>
          </div>
        </div>

        {/* Issues by Category Donut (4 cols) matching 6.jpeg */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
          <h2 className="text-sm font-bold text-slate-900">Issues by Category</h2>

          <div className="flex items-center justify-between gap-4">
            <div className="relative w-28 h-28 flex items-center justify-center flex-shrink-0">
              <svg className="w-28 h-28 -rotate-90" viewBox="0 0 36 36">
                <path className="text-emerald-500" strokeDasharray="42, 100" strokeWidth="5.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-blue-500" strokeDasharray="20, 100" strokeDashoffset="-42" strokeWidth="5.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-purple-500" strokeDasharray="15, 100" strokeDashoffset="-62" strokeWidth="5.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-amber-500" strokeDasharray="10, 100" strokeDashoffset="-77" strokeWidth="5.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute text-center leading-tight">
                <span className="text-sm font-black text-slate-900 block">1,248</span>
                <span className="text-[8px] text-slate-400 font-bold uppercase">Total</span>
              </div>
            </div>

            <div className="flex-1 space-y-1.5 text-[10px] font-semibold text-slate-600">
              <div className="flex justify-between">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Garbage / Waste</span>
                <span className="font-bold text-slate-800">42% (524)</span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500" /> Water Supply</span>
                <span className="font-bold text-slate-800">20% (250)</span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-500" /> Drainage</span>
                <span className="font-bold text-slate-800">15% (187)</span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" /> Air Pollution</span>
                <span className="font-bold text-slate-800">10% (125)</span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-700" /> Tree / Greenery</span>
                <span className="font-bold text-slate-800">8% (100)</span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-400" /> Others</span>
                <span className="font-bold text-slate-800">5% (62)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trends Over Time Multi-line Chart (4 cols) matching 6.jpeg */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <span>Trends Over Time</span>
              <span className="text-[10px] text-slate-400">ⓘ</span>
            </h2>
            <div className="text-[10px] font-bold text-slate-600 border border-slate-200 px-2 py-0.5 rounded-lg">
              Daily ▾
            </div>
          </div>

          <div className="h-56 flex flex-col justify-between pt-2">
            <div className="flex-1 flex items-end gap-3 px-2 border-b border-slate-100">
              {[
                { day: '11 May', g: 190, w: 120, d: 70 },
                { day: '12 May', g: 212, w: 140, d: 85 },
                { day: '13 May', g: 173, w: 90, d: 65 },
                { day: '14 May', g: 218, w: 160, d: 110 },
                { day: '15 May', g: 223, w: 130, d: 95 },
                { day: '16 May', g: 180, w: 155, d: 115 },
                { day: '17 May', g: 258, w: 140, d: 120 },
              ].map((item, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex items-end justify-center gap-0.5 h-36">
                    <span className="w-1.5 bg-emerald-500 rounded-t-sm" style={{ height: `${(item.g / 300) * 100}%` }} />
                    <span className="w-1.5 bg-blue-500 rounded-t-sm" style={{ height: `${(item.w / 300) * 100}%` }} />
                    <span className="w-1.5 bg-purple-500 rounded-t-sm" style={{ height: `${(item.d / 300) * 100}%` }} />
                  </div>
                  <span className="text-[8px] text-slate-400 font-medium whitespace-nowrap">{item.day}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-around text-[9px] font-semibold text-slate-600 pt-2">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Garbage</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" /> Water Supply</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-500" /> Drainage</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Ward Performance, Environmental Impact, Citizen Engagement matching 6.jpeg */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Ward Performance Overview (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <span>Ward Performance Overview</span>
              <span className="text-[10px] text-slate-400">ⓘ</span>
            </h2>
            <Link href="/dashboard/analytics#wards" className="text-xs font-bold text-[#1B8A2A] hover:underline">
              View All Wards →
            </Link>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {DEMO_WARD_DATA.map((w, idx) => {
              const rate = Math.round((w.resolved_count / w.complaints_count) * 100);
              return (
                <div key={w.ward_number} className="py-2.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-400">{idx + 1}.</span>
                    <span className="font-bold text-slate-900">Ward {w.ward_number}</span>
                  </div>

                  <div className="flex-1 max-w-[120px] h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${rate}%` }} />
                  </div>

                  <span className="font-extrabold text-[#1B8A2A] text-[11px]">{rate}%</span>

                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-[#1B8A2A] font-bold text-[10px] border border-emerald-100">
                    {Math.round(rate * 0.9 + 10)}/100
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Environmental Impact (4 cols) matching 6.jpeg */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <span>Environmental Impact</span>
            <span className="text-[10px] text-slate-400">ⓘ</span>
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-emerald-100 text-[#1B8A2A] flex items-center justify-center font-bold">🗑️</span>
                <div>
                  <p className="font-bold text-slate-900">Waste Collected</p>
                  <p className="text-base font-black text-slate-900">245.6 <span className="text-xs font-normal text-slate-500">Tons</span></p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-[#1B8A2A]">↑ +18% vs last week</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">💧</span>
                <div>
                  <p className="font-bold text-slate-900">Water Saved</p>
                  <p className="text-base font-black text-slate-900">1.2 <span className="text-xs font-normal text-slate-500">Million Liters</span></p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-[#1B8A2A]">↑ +12% vs last week</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">🌳</span>
                <div>
                  <p className="font-bold text-slate-900">Trees Planted</p>
                  <p className="text-base font-black text-slate-900">342 <span className="text-xs font-normal text-slate-500">This Week</span></p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-[#1B8A2A]">↑ +15% vs last week</span>
            </div>
          </div>
        </div>

        {/* Citizen Engagement Donut (3 cols) matching 6.jpeg */}
        <div className="lg:col-span-3 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <span>Citizen Engagement</span>
            <span className="text-[10px] text-slate-400">ⓘ</span>
          </h2>

          <div className="flex items-center justify-center py-2">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-24 h-24 -rotate-90" viewBox="0 0 36 36">
                <path className="text-emerald-500" strokeDasharray="44, 100" strokeWidth="5.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-blue-500" strokeDasharray="39, 100" strokeDashoffset="-44" strokeWidth="5.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-purple-500" strokeDasharray="12, 100" strokeDashoffset="-83" strokeWidth="5.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-slate-300" strokeDasharray="5, 100" strokeDashoffset="-95" strokeWidth="5.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute text-center leading-tight">
                <span className="text-xs font-black text-slate-900 block">2,847</span>
                <span className="text-[8px] text-slate-400 font-bold uppercase">Total</span>
              </div>
            </div>
          </div>

          <div className="space-y-1 text-[10px] font-semibold text-slate-600">
            <div className="flex justify-between">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Active Reporters</span>
              <span className="font-bold text-slate-800">1,245 (44%)</span>
            </div>
            <div className="flex justify-between">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500" /> Verifiers</span>
              <span className="font-bold text-slate-800">1,102 (39%)</span>
            </div>
            <div className="flex justify-between">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-500" /> Volunteers</span>
              <span className="font-bold text-slate-800">345 (12%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
