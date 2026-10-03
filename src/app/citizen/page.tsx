'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DEMO_INSTANCES } from '@/lib/demo-data';

export default function CitizenPortalPage() {
  const [activeTab, setActiveTab] = useState<'home' | 'complaints' | 'community' | 'rewards'>('home');

  const recentCitizenComplaints = [
    {
      id: 'c-1',
      title: 'Garbage not collected near Shiv Mandir',
      location: 'Braj Vihar, Ward 12',
      status: 'In Progress',
      statusColor: 'text-amber-600 bg-amber-50 border-amber-200',
      updated: '2h ago',
      img: 'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?auto=format&fit=crop&w=200&q=80',
      token: 'token-indore-001',
    },
    {
      id: 'c-2',
      title: 'Water leakage on MG Road',
      location: 'MG Road, Indore',
      status: 'Verified',
      statusColor: 'text-brand-600 bg-brand-50 border-brand-200',
      updated: '5h ago',
      img: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f8?auto=format&fit=crop&w=200&q=80',
      token: 'token-indore-002',
    },
    {
      id: 'c-3',
      title: 'Street light not working near Park',
      location: 'Scheme No. 54',
      status: 'Resolved',
      statusColor: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      updated: '1d ago',
      img: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=200&q=80',
      token: 'token-indore-005',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Navbar */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-brand-500 rounded-xl flex items-center justify-center text-white font-bold shadow-sm">
                ðŸŒ±
              </div>
              <div>
                <h1 className="text-lg font-bold text-text-primary leading-tight">
                  JanaSetu <span className="text-brand-500">AI</span>
                </h1>
                <p className="text-[10px] text-brand-500 font-medium">Clean City. Green Future.</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-full text-xs font-semibold text-slate-700">
              <span>ðŸ“ Braj Vihar Ward, Indore</span>
              <span className="text-slate-400">â–¾</span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-full text-xs font-medium text-slate-600">
              <span>ðŸŒ English</span>
              <span className="text-slate-400">â–¾</span>
            </div>

            {/* Notification Bell */}
            <button className="relative w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors">
              <span>ðŸ””</span>
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                3
              </span>
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 font-bold flex items-center justify-center text-xs">
                ðŸ‘¤
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-bold text-slate-800 leading-tight">Hi, Citizen</p>
                <p className="text-[10px] text-brand-600 font-semibold">Welcome!</p>
              </div>
            </div>

            <Link
              href="/dashboard"
              className="text-xs font-semibold px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors ml-2"
            >
              Govt Portal â†’
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Grid Container with Sidebar */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex gap-6">
        {/* Left Sidebar */}
        <aside className="hidden lg:flex flex-col w-56 flex-shrink-0 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 p-3 shadow-sm space-y-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: 'ðŸ ', href: '/citizen', active: true },
              { id: 'report', label: 'Report Issue', icon: 'âž•', href: '/report' },
              { id: 'complaints', label: 'My Complaints', icon: 'ðŸ“‹', href: '#complaints' },
              { id: 'track', label: 'Track Complaint', icon: 'ðŸ“', href: '/t/token-indore-001' },
              { id: 'community', label: 'Community', icon: 'ðŸ‘¥', href: '/citizen/community' },
              { id: 'articles', label: 'Articles & Tips', icon: 'ðŸ“–', href: '#articles' },
              { id: 'leaderboards', label: 'Leaderboards', icon: 'ðŸ†', href: '#leaderboards' },
              { id: 'rewards', label: 'Rewards', icon: 'ðŸŽ', href: '#rewards' },
              { id: 'polls', label: 'Polls', icon: 'ðŸ“Š', href: '#polls' },
              { id: 'settings', label: 'Settings', icon: 'âš™ï¸', href: '#settings' },
            ].map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  item.active
                    ? 'bg-brand-500 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Promo Card */}
          <div className="p-4 bg-gradient-to-br from-brand-50 to-emerald-50 rounded-2xl border border-brand-100 text-left space-y-2">
            <span className="text-2xl">ðŸŒ±</span>
            <h4 className="text-xs font-bold text-slate-900">Be a Jaagruk Nagrik</h4>
            <p className="text-[11px] text-slate-500 leading-snug">
              Report. Verify. Earn Rewards for your neighborhood.
            </p>
            <Link
              href="/citizen/community"
              className="inline-block text-[11px] font-bold text-brand-600 hover:text-brand-700 pt-1"
            >
              Learn More â†’
            </Link>
          </div>
        </aside>

        {/* Center Main Content */}
        <main className="flex-1 space-y-6 min-w-0">
          {/* Welcome Banner */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                <span>Welcome back!</span>
                <span className="text-brand-500">ðŸŒ±</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Together we can build a cleaner, greener and better city.
              </p>
            </div>
            <Link
              href="/report"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-full text-xs font-bold shadow-md shadow-brand-500/20 transition-all"
            >
              <span>âž• Report Issue Now</span>
            </Link>
          </div>

          {/* Quick Report Section */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Quick Report</h3>
              <p className="text-xs text-slate-500">
                Report an issue in the way that&apos;s most convenient for you.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { title: 'Voice Note', desc: 'Speak in your language', icon: 'ðŸŽ™ï¸', color: 'bg-emerald-50 text-emerald-600' },
                { title: 'Take Photo', desc: 'Capture and upload a photo', icon: 'ðŸ“·', color: 'bg-blue-50 text-blue-600' },
                { title: 'Record Video', desc: 'Record and upload a video', icon: 'ðŸŽ¬', color: 'bg-purple-50 text-purple-600' },
                { title: 'Type Complaint', desc: 'Type your issue in any language', icon: 'âœï¸', color: 'bg-amber-50 text-amber-600' },
              ].map((m, i) => (
                <Link
                  key={i}
                  href="/report"
                  className="p-4 rounded-xl border border-slate-100 hover:border-brand-300 hover:shadow-sm transition-all group text-left bg-slate-50/50 hover:bg-white"
                >
                  <div className={`w-10 h-10 ${m.color} rounded-xl flex items-center justify-center text-lg mb-3 group-hover:scale-105 transition-transform`}>
                    {m.icon}
                  </div>
                  <h4 className="text-xs font-bold text-slate-800">{m.title}</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">{m.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Complaints Table */}
          <div id="complaints" className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Recent Complaints</h3>
                <p className="text-xs text-slate-500">Live tracker of civic issues in your ward.</p>
              </div>
              <Link href="/dashboard/problems" className="text-xs font-bold text-brand-600 hover:text-brand-700">
                View All â†’
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-bold text-[10px] uppercase">
                    <th className="pb-3">Issue</th>
                    <th className="pb-3">Location</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Updated</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recentCitizenComplaints.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 pr-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.img}
                            alt=""
                            className="w-10 h-10 rounded-lg object-cover border border-slate-100 flex-shrink-0"
                          />
                          <span className="font-semibold text-slate-800 max-w-xs truncate block">
                            {item.title}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 text-slate-500 whitespace-nowrap">
                        ðŸ“ {item.location}
                      </td>
                      <td className="py-3 whitespace-nowrap">
                        <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] border ${item.statusColor}`}>
                          â— {item.status}
                        </span>
                      </td>
                      <td className="py-3 text-slate-400 whitespace-nowrap">
                        {item.updated}
                      </td>
                      <td className="py-3 text-right whitespace-nowrap">
                        <Link
                          href={`/t/${item.token}`}
                          className="px-3 py-1 bg-slate-100 hover:bg-brand-50 hover:text-brand-700 text-slate-700 rounded-lg font-bold text-[11px] transition-colors inline-block"
                        >
                          Track â€º
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Live Issues Near You (Map Component) */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Live Issues Near You</h3>
                <p className="text-xs text-slate-500">Real-time hotspots across Indore Ward 12.</p>
              </div>
              <Link href="/dashboard/heatmap" className="text-xs font-bold text-brand-600 hover:text-brand-700">
                View Full Map â†’
              </Link>
            </div>

            {/* Simulated Map Canvas */}
            <div className="relative h-64 bg-slate-100 rounded-xl border border-slate-200 overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:20px_20px]" />

              {/* Map Heat Pins */}
              <div className="absolute top-12 left-16 flex items-center justify-center w-8 h-8 rounded-full bg-rose-500 text-white font-black text-xs shadow-lg animate-pulse">
                12
              </div>
              <div className="absolute top-28 left-48 flex items-center justify-center w-7 h-7 rounded-full bg-amber-500 text-white font-bold text-xs shadow-md">
                7
              </div>
              <div className="absolute top-16 right-40 flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 text-white font-bold text-xs shadow-md">
                3
              </div>
              <div className="absolute bottom-16 right-24 flex items-center justify-center w-8 h-8 rounded-full bg-rose-600 text-white font-black text-xs shadow-lg">
                8
              </div>
              <div className="absolute bottom-10 right-48 flex items-center justify-center w-7 h-7 rounded-full bg-amber-500 text-white font-bold text-xs shadow-md">
                5
              </div>

              {/* Road labels */}
              <span className="absolute top-8 left-28 text-[9px] font-bold text-slate-500 uppercase tracking-widest bg-white/70 px-1 rounded">
                Shiv Mandir Road
              </span>
              <span className="absolute bottom-12 right-64 text-[9px] font-bold text-slate-500 uppercase tracking-widest bg-white/70 px-1 rounded">
                Braj Vihar Main
              </span>

              {/* Priority Legend */}
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg border border-slate-200 p-2 flex items-center gap-3 text-[10px] font-semibold text-slate-600 shadow-sm">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> High Priority
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Medium Priority
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Low Priority
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400" /> Resolved
                </span>
              </div>
            </div>
          </div>
        </main>

        {/* Right Sidebar: Green Points, Alerts, Articles */}
        <aside className="hidden xl:flex flex-col w-72 flex-shrink-0 space-y-5">
          {/* Green Points Card */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700 flex items-center gap-1.5">
                <span>ðŸƒ</span> Green Points
              </span>
              <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                +120 this week
              </span>
            </div>
            <div className="text-3xl font-black text-slate-900">1,250</div>
            {/* Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div className="bg-brand-500 h-2 rounded-full w-[83%]" />
            </div>
            <p className="text-[10px] text-slate-400 font-semibold flex justify-between">
              <span>Next Reward: 1,500 Points</span>
              <span>ðŸŽ Tier 2</span>
            </p>
          </div>

          {/* Rank Badge */}
          <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex items-center gap-3">
            <div className="w-11 h-11 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
              ðŸ†
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">Your Rank</span>
              <h4 className="text-xs font-bold text-slate-900 leading-tight">#4 Green Champion</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">Keep going! You&apos;re making a difference.</p>
            </div>
          </div>

          {/* Community Alerts */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs">
              <h4 className="font-bold text-slate-900">Community Alerts</h4>
              <Link href="/citizen/community" className="text-brand-600 font-bold hover:underline text-[11px]">
                View All â†’
              </Link>
            </div>

            <div className="space-y-2.5">
              {[
                {
                  icon: 'âš ï¸',
                  title: 'Garbage reported near you',
                  meta: '120 people have confirmed this issue.',
                  time: '10m ago',
                  bg: 'bg-rose-50 text-rose-600',
                },
                {
                  icon: 'ðŸ’§',
                  title: 'Water leakage on MG Road',
                  meta: 'Needs more verification from citizens.',
                  time: '25m ago',
                  bg: 'bg-blue-50 text-blue-600',
                },
                {
                  icon: 'ðŸŒ³',
                  title: 'Tree branch fallen on road',
                  meta: 'Confirmed by 18 nearby citizens.',
                  time: '1h ago',
                  bg: 'bg-emerald-50 text-emerald-600',
                },
              ].map((al, idx) => (
                <div key={idx} className="p-2.5 rounded-xl border border-slate-100 flex items-start gap-2.5 hover:bg-slate-50 transition-colors">
                  <div className={`w-7 h-7 rounded-lg ${al.bg} flex items-center justify-center text-xs flex-shrink-0`}>
                    {al.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-800 leading-tight truncate">{al.title}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">{al.meta}</p>
                    <span className="text-[9px] text-slate-400 mt-1 block">{al.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Article */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-2 text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600">Recommended Guide</span>
            <h4 className="text-xs font-bold text-slate-900">5 Easy Ways You Can Keep Your City Clean</h4>
            <p className="text-[11px] text-slate-500 leading-snug">Small actions, big collective impact.</p>
            <button className="text-[11px] font-bold text-brand-600 hover:text-brand-700 pt-1 block">
              Read Now â†’
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
