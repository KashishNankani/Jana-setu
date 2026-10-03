'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

// Municipal Officer Navigation Items matching Style Images 6, 7, 9 & WhatsApp 1
const adminNavItems = [
  { href: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { href: '/dashboard/problems', label: 'Complaints', icon: 'complaints' },
  { href: '/dashboard/heatmap', label: 'Heat Map', icon: 'heatmap' },
  { href: '/dashboard/analytics', label: 'Analytics', icon: 'analytics' },
  { href: '/dashboard/departments', label: 'Departments', icon: 'departments' },
  { href: '/dashboard/reports', label: 'Reports', icon: 'reports' },
  { href: '/whatsapp-demo', label: 'Messages', icon: 'messages', badge: '3' },
  { href: '/dashboard/officers', label: 'Users', icon: 'users' },
  { href: '/dashboard/settings', label: 'Settings', icon: 'settings' },
];

function NavIcon({ type, active }: { type: string; active: boolean }) {
  const color = active ? 'currentColor' : '#475569';
  switch (type) {
    case 'dashboard':
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      );
    case 'complaints':
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    case 'heatmap':
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      );
    case 'analytics':
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      );
    case 'departments':
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      );
    case 'reports':
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      );
    case 'messages':
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      );
    case 'users':
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      );
    case 'settings':
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* ---- Sidebar matching Style Images 6, 7, 9 & WhatsApp 1 ---- */}
      <aside
        className={`fixed left-0 top-0 bottom-0 z-40 bg-white border-r border-slate-200/80 flex flex-col transition-all duration-300 ${
          sidebarCollapsed ? 'w-[76px]' : 'w-[250px]'
        }`}
      >
        {/* Brand Header */}
        <div className="px-5 py-5 flex items-center justify-between border-b border-slate-100">
          <Link href="/" className="flex items-center gap-2.5">
            {/* Eco Leaf Icon */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1B8A2A] to-[#157322] flex items-center justify-center text-white shadow-sm flex-shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            {!sidebarCollapsed && (
              <div>
                <h1 className="text-base font-bold text-slate-900 leading-tight tracking-tight">
                  JanaSetu <span className="text-[#1B8A2A]">AI</span>
                </h1>
                <p className="text-[10px] text-slate-500 font-medium">Clean City. Smart Governance.</p>
              </div>
            )}
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
          {adminNavItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/dashboard' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-[#1B8A2A] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                } ${sidebarCollapsed ? 'justify-center px-2' : ''}`}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <span className="flex-shrink-0">
                  <NavIcon type={item.icon} active={isActive} />
                </span>
                {!sidebarCollapsed && <span className="flex-1">{item.label}</span>}
                {!sidebarCollapsed && item.badge && (
                  <span
                    className={`w-5 h-5 text-[10px] font-bold rounded-full flex items-center justify-center ${
                      isActive ? 'bg-white/20 text-white' : 'bg-emerald-600 text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Score & Status Card matching 7.jpeg & 6.jpeg */}
        {!sidebarCollapsed && (
          <div className="mx-3 mb-3 p-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">Green Score (Indore)</span>
            </div>
            <div className="flex items-center gap-3">
              {/* Circular Gauge */}
              <div className="relative w-14 h-14 flex items-center justify-center">
                <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-100"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-[#1B8A2A]"
                    strokeDasharray="82, 100"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute text-center leading-tight">
                  <span className="text-sm font-extrabold text-slate-900 block">82</span>
                  <span className="text-[8px] text-slate-400 block -mt-1">/100</span>
                </div>
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-[#1B8A2A] flex items-center gap-1">
                  <span>🍃 Good</span>
                </p>
                <p className="text-[10px] text-emerald-700 font-semibold">+8 from last month</p>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[9px] text-slate-400 font-medium">
              <span>Data Updated</span>
              <span>17 May 2025, 11:30 AM</span>
            </div>
          </div>
        )}

        {/* Collapse Button */}
        <div className="p-3 border-t border-slate-100 flex items-center justify-between">
          <Link
            href="/citizen"
            className="text-[11px] font-semibold text-slate-500 hover:text-[#1B8A2A] flex items-center gap-1.5 transition-colors"
          >
            <span>← Citizen Hub</span>
          </Link>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? '→' : '←'}
          </button>
        </div>
      </aside>

      {/* ---- Main Content Column ---- */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          sidebarCollapsed ? 'ml-[76px]' : 'ml-[250px]'
        }`}
      >
        {/* Top Navbar matching 6.jpeg, 7.jpeg, 9.jpeg */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-6 py-3 flex items-center justify-between gap-4">
          {/* Location Selector Pill */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3.5 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer transition-colors shadow-2xs">
              <svg className="w-4 h-4 text-[#1B8A2A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span>Indore Municipal Corporation</span>
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Search Bar matching Style Reference */}
          <div className="flex-1 max-w-md relative hidden sm:block">
            <input
              type="text"
              placeholder="Search complaints, locations..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 hover:bg-white focus:bg-white border border-slate-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1B8A2A]/20 focus:border-[#1B8A2A] transition-all"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* User & Notifications */}
          <div className="flex items-center gap-3">
            {/* Notification Bell with Badge */}
            <button className="relative w-9 h-9 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 flex items-center justify-center text-slate-600 transition-colors shadow-2xs">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-extrabold rounded-full flex items-center justify-center">
                12
              </span>
            </button>

            {/* Officer Profile Avatar matching 6, 7, 9 & WhatsApp 1 */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#1B8A2A] to-emerald-400 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                AC
              </div>
              <div className="hidden md:block text-left leading-tight">
                <p className="text-xs font-bold text-slate-900">Amit Choudhary</p>
                <p className="text-[10px] text-slate-500 font-medium">Municipal Officer</p>
              </div>
              <svg className="w-3.5 h-3.5 text-slate-400 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
