'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  DEMO_DASHBOARD_STATS,
  DEMO_INSTANCES,
  DEMO_CATEGORY_STATS,
  DEMO_WARD_DATA,
} from '@/lib/demo-data';

export default function DashboardPage() {
  const [mapMode, setMapMode] = useState<'heatmap' | 'map'>('map');
  const [selectedWard, setSelectedWard] = useState('All Wards');
  const [selectedDate, setSelectedDate] = useState('17 May 2025');

  const topPriorityIssues = [
    {
      id: 'inst-001',
      title: 'Garbage Dump',
      location: 'Braj Vihar, Ward 12',
      priority: 'High',
      priorityColor: 'bg-rose-50 text-rose-700 border-rose-200',
      count: 31,
      img: 'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 'inst-002',
      title: 'Water Leakage',
      location: 'MG Road, Ward 5',
      priority: 'Medium',
      priorityColor: 'bg-amber-50 text-amber-700 border-amber-200',
      count: 23,
      img: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f8?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 'inst-004',
      title: 'Open Drain Overflow',
      location: 'Scheme No. 54, Ward 18',
      priority: 'High',
      priorityColor: 'bg-rose-50 text-rose-700 border-rose-200',
      count: 18,
      img: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 'inst-005',
      title: 'Street Light Not Working',
      location: 'Vijay Nagar, Ward 10',
      priority: 'Medium',
      priorityColor: 'bg-amber-50 text-amber-700 border-amber-200',
      count: 14,
      img: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 'inst-006',
      title: 'Tree Fallen on Road',
      location: 'Rau, Ward 17',
      priority: 'Low',
      priorityColor: 'bg-emerald-50 text-[#1B8A2A] border-emerald-200',
      count: 11,
      img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=120&q=80',
    },
  ];

  const recentComplaints = [
    {
      id: '#JS-2025-0517-1024',
      issue: 'Garbage Dump',
      location: 'Braj Vihar',
      ward: 12,
      priority: 'High',
      priorityBadge: 'bg-rose-50 text-rose-700 border-rose-200',
      status: 'In Progress',
      statusBadge: 'bg-blue-50 text-blue-700 border-blue-200',
      reportedOn: '17 May 2025, 10:24 AM',
      instId: 'inst-001',
    },
    {
      id: '#JS-2025-0517-1023',
      issue: 'Water Leakage',
      location: 'MG Road',
      ward: 5,
      priority: 'Medium',
      priorityBadge: 'bg-amber-50 text-amber-700 border-amber-200',
      status: 'Verified',
      statusBadge: 'bg-emerald-50 text-[#1B8A2A] border-emerald-200',
      reportedOn: '17 May 2025, 09:58 AM',
      instId: 'inst-002',
    },
    {
      id: '#JS-2025-0517-1022',
      issue: 'Street Light Not Working',
      location: 'Vijay Nagar',
      ward: 10,
      priority: 'Medium',
      priorityBadge: 'bg-amber-50 text-amber-700 border-amber-200',
      status: 'Assigned',
      statusBadge: 'bg-purple-50 text-purple-700 border-purple-200',
      reportedOn: '17 May 2025, 09:41 AM',
      instId: 'inst-005',
    },
    {
      id: '#JS-2025-0517-1021',
      issue: 'Open Drain Overflow',
      location: 'Scheme No. 54',
      ward: 18,
      priority: 'High',
      priorityBadge: 'bg-rose-50 text-rose-700 border-rose-200',
      status: 'In Progress',
      statusBadge: 'bg-blue-50 text-blue-700 border-blue-200',
      reportedOn: '17 May 2025, 09:15 AM',
      instId: 'inst-004',
    },
    {
      id: '#JS-2025-0517-1020',
      issue: 'Tree Cutting',
      location: 'Rau',
      ward: 17,
      priority: 'Low',
      priorityBadge: 'bg-emerald-50 text-[#1B8A2A] border-emerald-200',
      status: 'Verified',
      statusBadge: 'bg-emerald-50 text-[#1B8A2A] border-emerald-200',
      reportedOn: '17 May 2025, 08:50 AM',
      instId: 'inst-006',
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      {/* Top Header Bar matching Style Reference 7.jpeg */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-xs text-slate-500 mt-0.5">Overview of city complaints and actions</p>
        </div>

        {/* Controls: Date Picker, Ward Selector & Export Report Button */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Date Selector */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs">
            <span>📅</span>
            <span>{selectedDate}</span>
            <span className="text-slate-400">▾</span>
          </div>

          {/* Ward Selector */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs">
            <span>🏛️</span>
            <span>{selectedWard}</span>
            <span className="text-slate-400">▾</span>
          </div>

          {/* Solid Green Export Report Button */}
          <button
            onClick={() => alert('Generating complete municipal complaint export PDF...')}
            className="flex items-center gap-2 px-4 py-2 bg-[#1B8A2A] hover:bg-[#157322] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
          >
            <span>📥</span>
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Top KPI Cards Row (5 Cards) matching Style Reference 7.jpeg */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Card 1: Total Complaints */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2 hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <span className="w-8 h-8 rounded-lg bg-emerald-50 text-[#1B8A2A] flex items-center justify-center text-sm font-bold">
              📋
            </span>
            <span className="text-[10px] font-bold text-[#1B8A2A]">+18%</span>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Total Complaints</p>
            <p className="text-2xl font-black text-slate-900 mt-0.5">1,248</p>
          </div>
          <p className="text-[10px] text-slate-400 font-medium">vs last 7 days</p>
          {/* Sparkline curve */}
          <div className="h-5 flex items-end gap-1 pt-1 opacity-70">
            {[40, 55, 60, 45, 75, 80, 95].map((h, i) => (
              <span key={i} className="flex-1 bg-[#1B8A2A] rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        {/* Card 2: Verified Issues */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2 hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-sm font-bold">
              ✓
            </span>
            <span className="text-[10px] font-bold text-amber-600">+22%</span>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Verified Issues</p>
            <p className="text-2xl font-black text-slate-900 mt-0.5">842</p>
          </div>
          <p className="text-[10px] text-slate-400 font-medium">vs last 7 days</p>
          <div className="h-5 flex items-end gap-1 pt-1 opacity-70">
            {[35, 50, 65, 55, 70, 85, 90].map((h, i) => (
              <span key={i} className="flex-1 bg-amber-500 rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        {/* Card 3: In Progress */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2 hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-bold">
              ⏱
            </span>
            <span className="text-[10px] font-bold text-blue-600">+15%</span>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">In Progress</p>
            <p className="text-2xl font-black text-slate-900 mt-0.5">326</p>
          </div>
          <p className="text-[10px] text-slate-400 font-medium">vs last 7 days</p>
          <div className="h-5 flex items-end gap-1 pt-1 opacity-70">
            {[45, 60, 50, 70, 65, 80, 75].map((h, i) => (
              <span key={i} className="flex-1 bg-blue-500 rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        {/* Card 4: Resolved */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2 hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <span className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center text-sm font-bold">
              ✓
            </span>
            <span className="text-[10px] font-bold text-purple-600">+25%</span>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Resolved</p>
            <p className="text-2xl font-black text-slate-900 mt-0.5">692</p>
          </div>
          <p className="text-[10px] text-slate-400 font-medium">vs last 7 days</p>
          <div className="h-5 flex items-end gap-1 pt-1 opacity-70">
            {[30, 45, 60, 70, 75, 85, 100].map((h, i) => (
              <span key={i} className="flex-1 bg-purple-500 rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        {/* Card 5: Green Score */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2 hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <span className="w-8 h-8 rounded-lg bg-emerald-50 text-[#1B8A2A] flex items-center justify-center text-sm font-bold">
              🍃
            </span>
            <span className="text-[10px] font-bold text-[#1B8A2A] bg-emerald-50 px-2 py-0.5 rounded-full">
              Good
            </span>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Green Score</p>
            <p className="text-2xl font-black text-slate-900 mt-0.5">
              82<span className="text-xs text-slate-400 font-bold">/100</span>
            </p>
          </div>
          <p className="text-[10px] text-emerald-700 font-semibold">+8 from last month</p>
          <div className="h-5 flex items-end gap-1 pt-1 opacity-70">
            {[60, 65, 70, 72, 75, 78, 82].map((h, i) => (
              <span key={i} className="flex-1 bg-[#1B8A2A] rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>

      {/* Middle Row (3 Panels) matching Style Reference 7.jpeg */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Panel 1: Live Issue Heat Map (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <span>Live Issue Heat Map</span>
              <span className="text-[10px] text-slate-400 font-normal">ⓘ</span>
            </h2>

            {/* Segmented Toggle [Heat Map] [Map] */}
            <div className="flex items-center p-0.5 bg-slate-100 rounded-xl border border-slate-200/70 text-[11px] font-bold">
              <button
                onClick={() => setMapMode('heatmap')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  mapMode === 'heatmap' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                }`}
              >
                Heat Map
              </button>
              <button
                onClick={() => setMapMode('map')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  mapMode === 'map' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                }`}
              >
                Map
              </button>
            </div>
          </div>

          {/* Map Surface with Cluster Pins */}
          <div className="relative h-72 rounded-xl overflow-hidden border border-slate-200 bg-[#E5E9EE]">
            <div className="absolute inset-0 bg-[radial-gradient(#94A3B8_1px,transparent_1px)] [background-size:20px_20px] opacity-40" />

            {/* Simulated Ward Labels */}
            <span className="absolute top-4 left-6 text-[10px] font-bold text-slate-400">Ward 3</span>
            <span className="absolute top-12 right-12 text-[10px] font-bold text-slate-400">Ward 12</span>
            <span className="absolute bottom-10 left-12 text-[10px] font-bold text-slate-400">Ward 13</span>
            <span className="absolute bottom-6 right-20 text-[10px] font-bold text-slate-400">Ward 23</span>

            {/* Exact Cluster Pins matching 7.jpeg */}
            <Link
              href="/dashboard/problems/inst-001"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#EF4444] text-white font-black text-xs flex items-center justify-center shadow-lg hover:scale-125 transition-transform"
              title="Rajwada Central (31 complaints)"
            >
              31
            </Link>

            <Link
              href="/dashboard/problems/inst-002"
              className="absolute top-8 left-1/3 w-8 h-8 rounded-full bg-[#EF4444] text-white font-black text-xs flex items-center justify-center shadow-md hover:scale-125 transition-transform"
              title="Palasia East (23 complaints)"
            >
              23
            </Link>

            <Link
              href="/dashboard/problems/inst-004"
              className="absolute top-20 left-10 w-7 h-7 rounded-full bg-[#F97316] text-white font-extrabold text-[11px] flex items-center justify-center shadow-md hover:scale-125 transition-transform"
              title="Ward 14 (14 complaints)"
            >
              14
            </Link>

            <Link
              href="/dashboard/problems/inst-005"
              className="absolute bottom-12 left-16 w-7 h-7 rounded-full bg-[#F97316] text-white font-extrabold text-[11px] flex items-center justify-center shadow-md hover:scale-125 transition-transform"
              title="Ward 11 (11 complaints)"
            >
              11
            </Link>

            <Link
              href="/dashboard/problems/inst-006"
              className="absolute top-16 right-10 w-6 h-6 rounded-full bg-[#22C55E] text-white font-extrabold text-[10px] flex items-center justify-center shadow-md hover:scale-125 transition-transform"
              title="Ward 6 (6 complaints)"
            >
              6
            </Link>

            <Link
              href="/dashboard/problems/inst-007"
              className="absolute bottom-16 right-16 w-6 h-6 rounded-full bg-[#22C55E] text-white font-extrabold text-[10px] flex items-center justify-center shadow-md hover:scale-125 transition-transform"
              title="Ward 7 (7 complaints)"
            >
              7
            </Link>

            {/* Zoom Controls */}
            <div className="absolute right-3 bottom-3 flex flex-col gap-1 bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden text-xs font-bold text-slate-700">
              <button className="px-2 py-1 hover:bg-slate-100">+</button>
              <button className="px-2 py-1 hover:bg-slate-100 border-t border-slate-200">-</button>
            </div>
          </div>

          {/* Map Legend */}
          <div className="flex items-center justify-between text-[10px] font-semibold text-slate-600 pt-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" /> High
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F97316]" /> Medium
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" /> Low
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400" /> Resolved
            </span>
          </div>
        </div>

        {/* Panel 2: Top Priority Issues (4 cols) matching 7.jpeg */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">Top Priority Issues</h2>
            <Link href="/dashboard/problems" className="text-xs font-bold text-[#1B8A2A] hover:underline">
              View All &gt;
            </Link>
          </div>

          {/* List of 5 Priority Items */}
          <div className="space-y-3">
            {topPriorityIssues.map((item) => (
              <Link
                key={item.id}
                href={`/dashboard/problems/${item.id}`}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                  />
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 group-hover:text-[#1B8A2A] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[10px] text-slate-500">{item.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${item.priorityColor}`}>
                    {item.priority}
                  </span>
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold flex items-center justify-center">
                    {item.count}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Panel 3: Complaints by Department & Quick Actions (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          {/* Complaints by Department */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <h2 className="text-sm font-bold text-slate-900">Complaints by Department</h2>

            <div className="flex items-center justify-center py-2">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-24 h-24 -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-emerald-500"
                    strokeDasharray="42, 100"
                    strokeWidth="5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-blue-500"
                    strokeDasharray="20, 100"
                    strokeDashoffset="-42"
                    strokeWidth="5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-amber-500"
                    strokeDasharray="18, 100"
                    strokeDashoffset="-62"
                    strokeWidth="5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-purple-500"
                    strokeDasharray="12, 100"
                    strokeDashoffset="-80"
                    strokeWidth="5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute text-center leading-tight">
                  <span className="text-xs font-black text-slate-900 block">1,248</span>
                  <span className="text-[8px] text-slate-400 uppercase font-semibold">Total</span>
                </div>
              </div>
            </div>

            <div className="space-y-1 text-[10px] font-semibold text-slate-600">
              <div className="flex justify-between">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Waste Mgmt</span>
                <span className="text-slate-900">42%</span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500" /> Water Supply</span>
                <span className="text-slate-900">20%</span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" /> Roads &amp; Infra</span>
                <span className="text-slate-900">18%</span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-500" /> Electricity</span>
                <span className="text-slate-900">12%</span>
              </div>
            </div>
          </div>

          {/* Quick Actions List matching 7.jpeg */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2.5">
            <h2 className="text-sm font-bold text-slate-900">Quick Actions</h2>

            <div className="space-y-1.5 text-xs">
              <Link
                href="/dashboard/problems"
                className="flex items-center gap-2 p-2 rounded-xl hover:bg-slate-50 font-semibold text-slate-700 transition-colors"
              >
                <span>👤</span>
                <span>Assign to Department</span>
              </Link>
              <button
                onClick={() => alert('New announcement created')}
                className="w-full flex items-center gap-2 p-2 rounded-xl hover:bg-slate-50 font-semibold text-slate-700 transition-colors text-left"
              >
                <span>📢</span>
                <span>Create New Announcement</span>
              </button>
              <Link
                href="/dashboard/departments"
                className="flex items-center gap-2 p-2 rounded-xl hover:bg-slate-50 font-semibold text-slate-700 transition-colors"
              >
                <span>🏛️</span>
                <span>View All Departments</span>
              </Link>
              <Link
                href="/dashboard/reports"
                className="flex items-center gap-2 p-2 rounded-xl hover:bg-slate-50 font-semibold text-slate-700 transition-colors"
              >
                <span>📊</span>
                <span>Generate Analytics Report</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Recent Complaints Table matching Style Reference 7.jpeg */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">Recent Complaints</h2>
          <Link href="/dashboard/problems" className="text-xs font-bold text-[#1B8A2A] hover:underline">
            View All &gt;
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200/80">
              <tr>
                <th className="py-3 px-3">ID</th>
                <th className="py-3 px-3">Issue</th>
                <th className="py-3 px-3">Location</th>
                <th className="py-3 px-3 text-center">Ward</th>
                <th className="py-3 px-3">Priority</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Reported On</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentComplaints.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-3 font-mono font-bold text-slate-900 whitespace-nowrap">
                    {item.id}
                  </td>
                  <td className="py-3.5 px-3 font-bold text-slate-800">
                    {item.issue}
                  </td>
                  <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap">
                    {item.location}
                  </td>
                  <td className="py-3.5 px-3 text-center font-bold text-slate-800">
                    {item.ward}
                  </td>
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] border ${item.priorityBadge}`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] border ${item.statusBadge}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-500 whitespace-nowrap">
                    {item.reportedOn}
                  </td>
                  <td className="py-3.5 px-3 text-right whitespace-nowrap">
                    <Link
                      href={`/dashboard/problems/${item.instId}`}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors inline-block"
                      title="Inspect Dossier"
                    >
                      👁️
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
