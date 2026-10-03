'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CommunityVerificationPage() {
  const [yesCount, setYesCount] = useState(24);
  const [noCount, setNoCount] = useState(3);
  const [resolvedCount, setResolvedCount] = useState(5);
  const [userVote, setUserVote] = useState<'yes' | 'no' | 'resolved' | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleVote = (type: 'yes' | 'no' | 'resolved') => {
    if (userVote === type) return;

    if (userVote === 'yes') setYesCount((prev) => prev - 1);
    if (userVote === 'no') setNoCount((prev) => prev - 1);
    if (userVote === 'resolved') setResolvedCount((prev) => prev - 1);

    if (type === 'yes') {
      setYesCount((prev) => prev + 1);
      setToastMessage('âœ“ Thank you! Your verification adds priority to this issue.');
    } else if (type === 'no') {
      setNoCount((prev) => prev + 1);
      setToastMessage('âœ“ Feedback noted: You reported this issue is not present.');
    } else if (type === 'resolved') {
      setResolvedCount((prev) => prev + 1);
      setToastMessage('âœ“ Noted: You flagged that this issue has already been resolved.');
    }

    setUserVote(type);
    setTimeout(() => setToastMessage(null), 4000);
  };

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
              <span>ðŸ“ Braj Vihar Ward 12, Indore</span>
              <span className="text-slate-400">â–¾</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-full text-xs font-medium text-slate-600">
              <span>ðŸŒ English</span>
              <span className="text-slate-400">â–¾</span>
            </div>

            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 font-bold flex items-center justify-center text-xs">
                ðŸ‘¤
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-bold text-slate-800 leading-tight">Hi, Citizen</p>
                <p className="text-[10px] text-brand-600 font-semibold">Community Member</p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex gap-6">
        {/* Left Sidebar */}
        <aside className="hidden lg:flex flex-col w-56 flex-shrink-0 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 p-3 shadow-sm space-y-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: 'ðŸ ', href: '/citizen' },
              { id: 'report', label: 'Report Issue', icon: 'âž•', href: '/report' },
              { id: 'complaints', label: 'My Complaints', icon: 'ðŸ“‹', href: '/citizen#complaints' },
              { id: 'track', label: 'Track Complaint', icon: 'ðŸ“', href: '/t/token-indore-001' },
              { id: 'community', label: 'Community', icon: 'ðŸ‘¥', href: '/citizen/community', active: true },
              { id: 'articles', label: 'Articles & Tips', icon: 'ðŸ“–', href: '#articles' },
              { id: 'leaderboards', label: 'Leaderboard', icon: 'ðŸ†', href: '#leaderboards' },
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

          <div className="p-4 bg-gradient-to-br from-brand-50 to-emerald-50 rounded-2xl border border-brand-100 text-left space-y-2">
            <span className="text-2xl">ðŸŒ</span>
            <h4 className="text-xs font-bold text-slate-900">Stronger Community</h4>
            <p className="text-[11px] text-slate-500 leading-snug">
              Your voice. Their action. Our environment.
            </p>
            <button className="text-[11px] font-bold text-brand-600 hover:text-brand-700 pt-1 block">
              Learn More â†’
            </button>
          </div>
        </aside>

        {/* Center Main Content */}
        <main className="flex-1 space-y-6 min-w-0">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Community Verification
              </h2>
              <span className="w-5 h-5 bg-brand-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                âœ“
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              A citizen nearby has reported an issue and needs your confirmation.
            </p>
          </div>

          {toastMessage && (
            <div className="p-3 bg-brand-50 border border-brand-200 text-brand-800 rounded-xl text-xs font-bold animate-fade-in flex items-center justify-between">
              <span>{toastMessage}</span>
              <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-slate-600">
                âœ•
              </button>
            </div>
          )}

          {/* Problem Card */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Image with Distance Badge */}
              <div className="relative w-full md:w-72 aspect-video rounded-xl overflow-hidden border border-slate-100 flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?auto=format&fit=crop&w=800&q=80"
                  alt="Garbage Dump"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2.5 right-2.5 bg-slate-900/80 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <span>ðŸ“</span> 200 m
                </span>
              </div>

              {/* Details */}
              <div className="space-y-3 flex-1 min-w-0">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    Garbage Dump in Braj Vihar Area
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Garbage is dumped on the roadside causing foul smell and pollution. Blocking the sidewalk for school children and pedestrians.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                  <div className="flex items-center gap-2 text-slate-500">
                    <span>â±ï¸</span>
                    <span>Reported 10 mins ago</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <span>ðŸ“</span>
                    <span>Braj Vihar, Ward 12</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <span>ðŸ‘¤</span>
                    <span>Reported By: Citizen (Anonymous)</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <span>ðŸ‘¥</span>
                    <span>Nearby Citizens: 32 people</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Voting Action Section */}
            <div className="pt-4 border-t border-slate-100 space-y-4">
              <div className="text-center">
                <h4 className="text-sm font-bold text-slate-900">
                  Can you confirm this issue exists in your area?
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Your response helps us verify and prioritize this complaint.
                </p>
              </div>

              {/* 3 Voting Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto">
                {/* YES BUTTON */}
                <button
                  onClick={() => handleVote('yes')}
                  className={`p-4 rounded-2xl border text-center transition-all ${
                    userVote === 'yes'
                      ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20 shadow-sm'
                      : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-lg mx-auto mb-2">
                    ðŸ‘
                  </div>
                  <p className="text-xs font-bold text-slate-900">Yes</p>
                  <p className="text-[10px] text-slate-500">I see this issue</p>
                  <span className="mt-2 inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                    {yesCount}
                  </span>
                </button>

                {/* NO BUTTON */}
                <button
                  onClick={() => handleVote('no')}
                  className={`p-4 rounded-2xl border text-center transition-all ${
                    userVote === 'no'
                      ? 'border-rose-500 bg-rose-50/60 ring-2 ring-rose-500/20 shadow-sm'
                      : 'border-slate-200 hover:border-rose-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-lg mx-auto mb-2">
                    ðŸ‘Ž
                  </div>
                  <p className="text-xs font-bold text-slate-900">No</p>
                  <p className="text-[10px] text-slate-500">I don&apos;t see this</p>
                  <span className="mt-2 inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                    {noCount}
                  </span>
                </button>

                {/* ALREADY RESOLVED BUTTON */}
                <button
                  onClick={() => handleVote('resolved')}
                  className={`p-4 rounded-2xl border text-center transition-all ${
                    userVote === 'resolved'
                      ? 'border-amber-500 bg-amber-50/60 ring-2 ring-amber-500/20 shadow-sm'
                      : 'border-slate-200 hover:border-amber-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-lg mx-auto mb-2">
                    âœ“
                  </div>
                  <p className="text-xs font-bold text-slate-900">Already Resolved</p>
                  <p className="text-[10px] text-slate-500">Issue is already fixed</p>
                  <span className="mt-2 inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                    {resolvedCount}
                  </span>
                </button>
              </div>

              {/* Informative Note */}
              <div className="p-3 bg-blue-50/80 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-center gap-2.5">
                <span className="text-base flex-shrink-0">ðŸ‘¥</span>
                <span>
                  More confirmations increase the credibility score and help city officials dispatch teams faster.
                </span>
              </div>
            </div>
          </div>
        </main>

        {/* Right Sidebar: Issue Location, Radius & About */}
        <aside className="hidden xl:flex flex-col w-72 flex-shrink-0 space-y-5">
          {/* Issue Location Radius Card */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-slate-900">Issue Location</h4>
            <div className="relative h-44 bg-slate-100 rounded-xl border border-slate-200 overflow-hidden flex items-center justify-center">
              {/* Radar Circle */}
              <div className="w-32 h-32 rounded-full border-2 border-emerald-400 bg-emerald-500/15 flex items-center justify-center animate-pulse">
                <div className="w-16 h-16 rounded-full border border-emerald-500 bg-emerald-500/25 flex items-center justify-center">
                  <span className="text-xl">ðŸ“</span>
                </div>
              </div>
              <span className="absolute bottom-2 right-2 bg-white/90 text-[10px] font-bold px-2 py-0.5 rounded shadow-sm text-slate-600">
                200 m radius
              </span>
            </div>
          </div>

          {/* Nearby Citizens */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs">
              <h4 className="font-bold text-slate-900">Nearby Citizens</h4>
              <span className="text-slate-500 font-semibold">32 People</span>
            </div>
            {/* Avatars */}
            <div className="flex items-center -space-x-2 overflow-hidden py-1">
              {['ðŸ‘¨â€ðŸ’¼', 'ðŸ‘©â€ðŸ¦°', 'ðŸ‘¨â€ðŸŽ“', 'ðŸ‘©â€ðŸ’»', 'ðŸ‘¨â€ðŸŒ¾'].map((emoji, idx) => (
                <div
                  key={idx}
                  className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs shadow-sm"
                >
                  {emoji}
                </div>
              ))}
              <div className="w-8 h-8 rounded-full bg-slate-800 text-white font-bold text-[10px] border-2 border-white flex items-center justify-center shadow-sm">
                +27
              </div>
            </div>
          </div>

          {/* About the Issue */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-2.5 text-xs">
            <h4 className="font-bold text-slate-900 pb-1 border-b border-slate-100">About the Issue</h4>
            <div className="flex justify-between py-1">
              <span className="text-slate-400 font-medium">Category:</span>
              <span className="font-bold text-slate-800">Garbage / Waste</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400 font-medium">Priority:</span>
              <span className="font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full text-[10px]">
                â— High
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400 font-medium">Department:</span>
              <span className="font-bold text-slate-800">Municipal Corporation</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400 font-medium">Reported On:</span>
              <span className="font-medium text-slate-700">17 May 2025, 10:24 AM</span>
            </div>
          </div>

          {/* Environmental Mission Card */}
          <div className="p-4 bg-gradient-to-br from-brand-50 to-emerald-50 rounded-2xl border border-brand-100 text-left space-y-1">
            <span className="text-xl">ðŸŒ¿</span>
            <h4 className="text-xs font-bold text-slate-900">Small Actions Today</h4>
            <p className="text-[11px] text-slate-500 leading-snug">Brighter tomorrow for Indore.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
