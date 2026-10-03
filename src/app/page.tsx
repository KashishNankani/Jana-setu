'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

// ---------- Animated Counter Component ----------
function AnimatedCounter({
  end,
  duration = 2000,
  suffix = '',
}: {
  end: number;
  duration?: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);
  return (
    <>
      {count.toLocaleString('en-IN')}
      {suffix}
    </>
  );
}

// ============================================================
// Landing Page — Report Issues. Build a Better Tomorrow.
// Directly matching style/WhatsApp Image 2026-10-01 at 9.51.56 PM.jpeg
// ============================================================
export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#1B8A2A] selection:text-white">
      {/* ---- Navbar matching WhatsApp Image 2026-10-01 at 9.51.56 PM.jpeg ---- */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs'
            : 'bg-white border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Brand Logo with Leaf Icon */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1B8A2A] to-[#157322] flex items-center justify-center text-white shadow-xs">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900 leading-none tracking-tight">
                JanaSetu <span className="text-[#1B8A2A]">AI</span>
              </h1>
              <p className="text-[11px] text-slate-500 font-medium tracking-wide mt-0.5">
                Clean City. Green Future.
              </p>
            </div>
          </Link>

          {/* Navigation Links with Active Green Underline on Home */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-semibold text-[#1B8A2A] relative pb-1 border-b-2 border-[#1B8A2A]"
            >
              Home
            </Link>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-slate-600 hover:text-[#1B8A2A] transition-colors"
            >
              How it Works
            </a>
            <a
              href="#features"
              className="text-sm font-medium text-slate-600 hover:text-[#1B8A2A] transition-colors"
            >
              Features
            </a>
            <Link
              href="/citizen"
              className="text-sm font-medium text-slate-600 hover:text-[#1B8A2A] transition-colors"
            >
              Impact
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-slate-600 hover:text-[#1B8A2A] transition-colors"
            >
              About Us
            </Link>
          </div>

          {/* Right Header Buttons */}
          <div className="flex items-center gap-3">
            {/* Language Selector Pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-700 border border-slate-200 rounded-full hover:bg-slate-50 cursor-pointer transition-colors">
              <span>English</span>
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Login Pill Button */}
            <Link
              href="/dashboard"
              className="px-6 py-1.5 text-xs font-bold text-[#1B8A2A] border border-[#1B8A2A] rounded-full hover:bg-[#1B8A2A] hover:text-white transition-all duration-200"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* ---- Hero Section matching WhatsApp Image 2026-10-01 at 9.51.56 PM.jpeg ---- */}
      <section className="pt-28 pb-12 overflow-hidden bg-gradient-to-b from-[#F0FDF4]/30 via-white to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#ECFDF5] border border-emerald-200/80 rounded-full text-xs font-semibold text-[#1B8A2A]">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <span>AI-Powered Civic Intelligence Platform</span>
              </div>

              {/* Huge Bold Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                Report Issues.<br />
                Build a <span className="text-[#1B8A2A]">Better Tomorrow.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                JanaSetu AI bridges the gap between citizens and government using AI, community power, and data-driven solutions for cleaner, greener and smarter cities.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  href="/report"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#1B8A2A] hover:bg-[#157322] text-white font-bold text-sm rounded-full shadow-md shadow-emerald-700/20 hover:shadow-lg transition-all duration-200 group"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Report an Issue Now</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>

                <Link
                  href="/whatsapp-demo"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-200 rounded-full transition-all duration-200 shadow-2xs"
                >
                  <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px]">▶</span>
                  <span>Watch Demo</span>
                </Link>
              </div>
            </div>

            {/* Right Hero Image (Eco-Smart City Visual) */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 shadow-xl bg-slate-100 aspect-16/10">
                <Image
                  src="/images/smart-city-hero.jpg"
                  alt="Modern Eco-Friendly Smart City with Solar Buses and Green Towers"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Floating Key Statistics Bar */}
          <div className="mt-10 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Stat 1 */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#1B8A2A] flex items-center justify-center text-xl">
                📄
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900 leading-tight">
                  <AnimatedCounter end={12458} />
                </p>
                <p className="text-xs text-slate-500 font-medium">Issues Reported</p>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
                👥
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900 leading-tight">
                  <AnimatedCounter end={8732} />
                </p>
                <p className="text-xs text-slate-500 font-medium">Active Citizens</p>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#1B8A2A] flex items-center justify-center text-xl">
                ✓
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900 leading-tight">
                  <AnimatedCounter end={9345} />
                </p>
                <p className="text-xs text-slate-500 font-medium">Issues Resolved</p>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#1B8A2A] flex items-center justify-center text-xl">
                🍃
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900 leading-tight">
                  87<span className="text-sm font-semibold text-slate-400">/100</span>
                </p>
                <p className="text-xs text-slate-500 font-medium">City Green Score</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Lower Half: Report Methods & Live Issues Map matching WhatsApp Image 2026-10-01 at 9.51.56 PM.jpeg ---- */}
      <section className="py-12 bg-slate-50/50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Card: Report in Any Way You Prefer */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Report in Any Way You Prefer</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Share issues in your language and in the way most convenient for you.
                </p>
              </div>

              {/* 4 Reporting Method Cards matching design reference */}
              <div className="grid grid-cols-2 gap-3.5">
                {/* Voice Note */}
                <Link
                  href="/report?method=voice"
                  className="p-4 rounded-xl border border-emerald-100 bg-[#F0FDF4]/50 hover:bg-[#F0FDF4] hover:shadow-xs transition-all text-center flex flex-col items-center group"
                >
                  <div className="w-11 h-11 rounded-full bg-[#1B8A2A] text-white flex items-center justify-center text-lg mb-2 shadow-xs group-hover:scale-110 transition-transform">
                    🎤
                  </div>
                  <h3 className="text-xs font-bold text-slate-900">Voice Note</h3>
                  <p className="text-[10px] text-slate-500 mt-0.5">Speak in your language</p>
                </Link>

                {/* Photo */}
                <Link
                  href="/report?method=photo"
                  className="p-4 rounded-xl border border-blue-100 bg-blue-50/40 hover:bg-blue-50/80 hover:shadow-xs transition-all text-center flex flex-col items-center group"
                >
                  <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg mb-2 shadow-xs group-hover:scale-110 transition-transform">
                    📷
                  </div>
                  <h3 className="text-xs font-bold text-slate-900">Photo</h3>
                  <p className="text-[10px] text-slate-500 mt-0.5">Capture and upload photo</p>
                </Link>

                {/* Video */}
                <Link
                  href="/report?method=video"
                  className="p-4 rounded-xl border border-purple-100 bg-purple-50/40 hover:bg-purple-50/80 hover:shadow-xs transition-all text-center flex flex-col items-center group"
                >
                  <div className="w-11 h-11 rounded-full bg-purple-600 text-white flex items-center justify-center text-lg mb-2 shadow-xs group-hover:scale-110 transition-transform">
                    📹
                  </div>
                  <h3 className="text-xs font-bold text-slate-900">Video</h3>
                  <p className="text-[10px] text-slate-500 mt-0.5">Record and upload video</p>
                </Link>

                {/* Text */}
                <Link
                  href="/report?method=text"
                  className="p-4 rounded-xl border border-amber-100 bg-amber-50/40 hover:bg-amber-50/80 hover:shadow-xs transition-all text-center flex flex-col items-center group"
                >
                  <div className="w-11 h-11 rounded-full bg-amber-500 text-white flex items-center justify-center text-lg mb-2 shadow-xs group-hover:scale-110 transition-transform">
                    ✍️
                  </div>
                  <h3 className="text-xs font-bold text-slate-900">Text</h3>
                  <p className="text-[10px] text-slate-500 mt-0.5">Type your complaint</p>
                </Link>
              </div>
            </div>

            {/* Right Card: Live Issues Across the City */}
            <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">Live Issues Across the City</h2>
                <Link
                  href="/dashboard/heatmap"
                  className="text-xs font-bold text-[#1B8A2A] hover:underline flex items-center gap-1"
                >
                  <span>View Full Map</span>
                  <span>→</span>
                </Link>
              </div>

              {/* Map Canvas with exact pins matching design reference */}
              <div className="relative h-64 rounded-xl overflow-hidden border border-slate-200 bg-[#E5E9EE]">
                {/* Simulated Street Grid Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#94A3B8_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />

                {/* Priority Cluster Pins matching WhatsApp Image 2026-10-01 at 9.51.56 PM.jpeg */}
                <Link
                  href="/dashboard/problems/inst-001"
                  className="absolute top-10 left-1/3 w-8 h-8 rounded-full bg-[#EF4444] text-white font-extrabold text-xs flex items-center justify-center shadow-md hover:scale-125 transition-transform"
                  title="Garbage Dump — 23 reports"
                >
                  23
                </Link>

                <Link
                  href="/dashboard/problems/inst-007"
                  className="absolute bottom-12 right-1/3 w-8 h-8 rounded-full bg-[#EF4444] text-white font-extrabold text-xs flex items-center justify-center shadow-md hover:scale-125 transition-transform"
                  title="Contaminated Water — 15 reports"
                >
                  15
                </Link>

                <Link
                  href="/dashboard/problems/inst-002"
                  className="absolute top-20 left-1/2 w-7 h-7 rounded-full bg-[#F97316] text-white font-extrabold text-xs flex items-center justify-center shadow-md hover:scale-125 transition-transform"
                  title="Water Leakage — 12 reports"
                >
                  12
                </Link>

                <Link
                  href="/dashboard/problems/inst-004"
                  className="absolute top-16 right-1/4 w-7 h-7 rounded-full bg-[#F97316] text-white font-extrabold text-xs flex items-center justify-center shadow-md hover:scale-125 transition-transform"
                  title="Drainage Blockage — 8 reports"
                >
                  8
                </Link>

                <Link
                  href="/dashboard/problems/inst-005"
                  className="absolute bottom-16 right-12 w-6 h-6 rounded-full bg-[#22C55E] text-white font-extrabold text-[11px] flex items-center justify-center shadow-md hover:scale-125 transition-transform"
                  title="Streetlight Fixed — 5 reports"
                >
                  5
                </Link>

                {/* Resolved green dot pins */}
                <div className="absolute top-8 left-16 w-3.5 h-3.5 rounded-full bg-[#22C55E] border-2 border-white shadow-xs" />
                <div className="absolute top-28 right-16 w-3.5 h-3.5 rounded-full bg-[#22C55E] border-2 border-white shadow-xs" />
                <div className="absolute bottom-10 left-1/4 w-3.5 h-3.5 rounded-full bg-[#22C55E] border-2 border-white shadow-xs" />

                {/* Map Legend Overlay matching design reference */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs p-3 rounded-xl border border-slate-200 text-[10px] space-y-1.5 shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                    <span className="font-semibold text-slate-700">High Priority</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F97316]" />
                    <span className="font-semibold text-slate-700">Medium Priority</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
                    <span className="font-semibold text-slate-700">Low Priority</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] flex items-center justify-center text-white text-[8px] font-bold">✓</span>
                    <span className="font-semibold text-slate-700">Resolved</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Trust & Verification Bar matching WhatsApp Image 2026-10-01 at 9.51.56 PM.jpeg */}
          <div className="mt-8 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#1B8A2A] flex items-center justify-center text-lg flex-shrink-0">
                🛡️
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Secure. Verified. Transparent.</p>
                <p className="text-[11px] text-slate-500">
                  Your identity is safe with us. We use Aadhaar & mobile verification to ensure genuine participation and accountability.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-bold text-slate-700 flex-shrink-0">
              <span className="flex items-center gap-1.5 text-emerald-700">
                <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-[10px]">✓</span>
                Aadhaar Verified
              </span>
              <span className="flex items-center gap-1.5 text-slate-700">
                <span>🔒</span>
                Data Protected
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
