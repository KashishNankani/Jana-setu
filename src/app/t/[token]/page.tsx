'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { DEMO_INSTANCES } from '@/lib/demo-data';
import { STATUS_LABELS, CATEGORY_LABELS } from '@/lib/types';
import type { ProblemStatus, ProblemCategory } from '@/lib/types';

export default function CitizenTrackingPage() {
  const params = useParams();
  const token = params?.token as string;

  // Find problem by token or fallback to demo problem
  const problem = DEMO_INSTANCES.find((p) => p.tracking_token === token) || DEMO_INSTANCES[0];

  const [citizenFeedback, setCitizenFeedback] = useState<'YES' | 'NO' | null>(null);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleFeedback = (response: 'YES' | 'NO') => {
    setCitizenFeedback(response);
    setFeedbackSubmitted(true);
  };

  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `Track civic problem status #${problem.code} on JanaSetu: http://localhost:3000/t/${problem.tracking_token}`
  )}`;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16 animate-fade-in">
      {/* Header Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-500 text-white font-extrabold flex items-center justify-center text-xs">
              JS
            </div>
            <div>
              <span className="font-extrabold text-slate-900 text-sm block leading-none">JanaSetu</span>
              <span className="text-[10px] text-slate-500">Public Citizen Tracking</span>
            </div>
          </Link>
          <a
            href={whatsappShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-lg transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span>ðŸ’¬ Share on WhatsApp</span>
          </a>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-xl mx-auto px-4 pt-6 space-y-6">
        {/* Banner Notice: One Problem One Link */}
        <div className="bg-brand-50 border border-brand-200 p-4 rounded-2xl text-xs text-brand-900 space-y-1">
          <p className="font-bold flex items-center gap-1.5">
            <span>ðŸ¤ Universal Tracking Link (Principle #3)</span>
          </p>
          <p className="text-brand-800">
            This tracking link is shared with all <strong>{problem.reporter_count} citizen reporters</strong> who registered this civic issue.
          </p>
        </div>

        {/* Problem Header Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="font-mono font-extrabold text-slate-900 text-sm bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
              #{problem.code}
            </span>
            <span className={`px-3 py-1 rounded-full font-bold text-xs border ${
              (STATUS_LABELS[problem.current_status as ProblemStatus]) 
                ? 'bg-brand-100 text-brand-800 border-brand-300' 
                : 'bg-slate-100 text-slate-700 border-slate-200'
            }`}>
              {STATUS_LABELS[problem.current_status as ProblemStatus] || problem.current_status}
            </span>
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-900">{problem.ai_summary}</h1>
            <p className="text-xs text-slate-500 mt-1">
              ðŸ“ {problem.location.formatted_address} â€¢ Ward #{problem.location.ward_number} ({problem.location.ward_name})
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="bg-slate-100 text-slate-700 text-[11px] px-2.5 py-0.5 rounded font-medium">
                {CATEGORY_LABELS[problem.ai_category as ProblemCategory]}
              </span>
              <span className="bg-slate-100 text-slate-700 text-[11px] px-2.5 py-0.5 rounded font-medium">
                SLA: {problem.sla_hours} Hours
              </span>
            </div>
          </div>
        </div>

        {/* Before & After Photo Comparison (If fixed) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900">
            ðŸ“¸ Resolution Evidence Photos
          </h2>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="space-y-1">
              <span className="font-semibold text-slate-500 block">Reported Problem</span>
              <div className="aspect-video rounded-xl overflow-hidden border border-slate-200">
                <img src={problem.original_photos[0]} alt="Reported problem photo" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="space-y-1">
              <span className="font-semibold text-slate-500 block">Officer Fix Evidence</span>
              <div className="aspect-video rounded-xl overflow-hidden border border-brand-300 relative">
                {problem.resolution_photo ? (
                  <>
                    <img src={problem.resolution_photo} alt="Officer fix photo" className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 right-1 bg-brand-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                      AI Verified âœ“
                    </span>
                  </>
                ) : (
                  <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 font-medium text-center p-2">
                    Work in progress by department...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Citizen Dual Verification Component (Principle #10) */}
        {problem.resolution_photo && (
          <div className="bg-white p-6 rounded-2xl border border-brand-200 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span>âœ… Citizen Confirmation Required (Dual AI + Human Check)</span>
            </h2>
            <p className="text-xs text-slate-600">
              The assigned officer has submitted evidence of resolution. As a citizen reporter, please confirm if the issue is physically fixed at the ground level.
            </p>

            {feedbackSubmitted ? (
              <div className={`p-4 rounded-xl text-xs font-semibold ${
                citizenFeedback === 'YES'
                  ? 'bg-brand-50 text-brand-900 border border-brand-300'
                  : 'bg-rose-50 text-rose-900 border border-rose-300'
              }`}>
                {citizenFeedback === 'YES' ? (
                  <p>ðŸŽ‰ Thank you! Your confirmation YES has been recorded. This problem is officially CLOSED.</p>
                ) : (
                  <p>âš ï¸ Thank you! Your response NO has been recorded. WhatsApp chat will open for you to send counter-evidence photos.</p>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleFeedback('YES')}
                  className="py-3 px-4 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
                >
                  <span>ðŸ‘ YES, Problem Fixed</span>
                </button>
                <button
                  onClick={() => handleFeedback('NO')}
                  className="py-3 px-4 bg-rose-100 hover:bg-rose-200 text-rose-800 border border-rose-300 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
                >
                  <span>ðŸ‘Ž NO, Still Broken</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Live Status Timeline */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900">
            â³ Resolution Timeline & Status Events
          </h2>

          <div className="space-y-4 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {problem.audit_log.map((item) => (
              <div key={item.id} className="relative pl-8 text-xs space-y-0.5">
                <div className="absolute left-2 top-1.5 w-3 h-3 rounded-full bg-brand-500 border-2 border-white" />
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>{STATUS_LABELS[item.status as ProblemStatus] || item.status}</span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {new Date(item.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-slate-600">{item.notes}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
