'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  DEMO_INSTANCES,
  DEMO_DEPARTMENTS,
  DEMO_OFFICERS,
} from '@/lib/demo-data';
import {
  STATUS_COLORS,
  STATUS_LABELS,
  CATEGORY_LABELS,
  SEVERITY_COLORS,
} from '@/lib/types';
import type { ProblemStatus, ProblemCategory } from '@/lib/types';

export default function ProblemDetailPage() {
  const params = useParams();
  const problemId = params?.id as string;

  // Find problem in demo data or use fallback default
  const problem =
    DEMO_INSTANCES.find((p) => p.id === problemId) || DEMO_INSTANCES[0];

  const [assignedDept, setAssignedDept] = useState(problem.assigned_department_id || 'dept-001');
  const [assignedOfficer, setAssignedOfficer] = useState(problem.assigned_officer_id || '');
  const [isAssigning, setIsAssigning] = useState(false);
  const [assignmentSuccess, setAssignmentSuccess] = useState(false);

  const deptObj = DEMO_DEPARTMENTS.find((d) => d.id === assignedDept);
  const eligibleOfficers = DEMO_OFFICERS.filter((o) => o.department_id === assignedDept);

  const handleAssign = () => {
    setIsAssigning(true);
    setTimeout(() => {
      setIsAssigning(false);
      setAssignmentSuccess(true);
      setTimeout(() => setAssignmentSuccess(false), 3000);
    }, 800);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Top Navigation & Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard/problems"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-brand-500 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Problems Master Queue
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href={`/t/${problem.tracking_token}`}
            target="_blank"
            className="px-3 py-1.5 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-lg transition-all flex items-center gap-1.5"
          >
            <span>ðŸ”— View Public Citizen Tracking Link</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
          <button
            onClick={() => alert(`Downloading Official Evidence Report PDF for instance ${problem.code}...`)}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-sm transition-all flex items-center gap-1.5"
          >
            <span>ðŸ“„ Download PDF Evidence Report</span>
          </button>
        </div>
      </div>

      {/* Main Problem Overview Header */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono font-extrabold text-slate-900 text-lg bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
                #{problem.code}
              </span>
              <span
                className={`px-3 py-1 rounded-full font-bold text-xs border ${
                  STATUS_COLORS[problem.current_status as ProblemStatus] || 'bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {STATUS_LABELS[problem.current_status as ProblemStatus] || problem.current_status}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-medium text-xs">
                {CATEGORY_LABELS[problem.ai_category as ProblemCategory]}
              </span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-2">
              {problem.ai_summary}
            </h1>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
              <span>ðŸ“ {problem.location.formatted_address}</span>
              <span>â€¢</span>
              <span>Ward #{problem.location.ward_number} ({problem.location.ward_name})</span>
              <span>â€¢</span>
              <span>Registered {new Date(problem.created_at).toLocaleString('en-IN')}</span>
            </p>
          </div>

          {/* Priority Badge Big Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4 rounded-xl flex items-center gap-4 border border-slate-700 shrink-0">
            <div className="text-center">
              <span className="text-3xl font-black text-brand-400 block leading-none">{problem.priority_score}</span>
              <span className="text-[10px] uppercase font-bold text-slate-400">AI Priority Score</span>
            </div>
            <div className="border-l border-slate-700 pl-4 text-xs space-y-1">
              <div>Severity Level: <span className="font-bold text-amber-400">{problem.ai_severity}/5</span></div>
              <div>Reporters Count: <span className="font-bold text-brand-400">{problem.reporter_count} citizens</span></div>
              <div>SLA Target: <span className="font-bold text-rose-400">{problem.sla_hours} Hours</span></div>
            </div>
          </div>
        </div>

        {/* Priority Engine Breakdown Bar */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
          <div className="flex items-center justify-between font-semibold text-slate-900 mb-2">
            <span>âš¡ JanaSetu Priority Formula Breakdown (Module C)</span>
            <span className="text-brand-600">Calculated autonomously based on predefined weights</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-slate-700">
            <div className="bg-white p-2.5 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">1. Base Weight</span>
              <span className="font-bold text-slate-900">{problem.priority_breakdown.base_weight} pts</span>
              <span className="text-[10px] text-slate-500 block">From Category ({problem.ai_category})</span>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">2. Severity Score</span>
              <span className="font-bold text-slate-900">+{problem.priority_breakdown.severity_score} pts</span>
              <span className="text-[10px] text-slate-500 block">Level {problem.ai_severity} / 5</span>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">3. Reporter Count</span>
              <span className="font-bold text-slate-900">+{problem.priority_breakdown.duplicate_bonus} pts</span>
              <span className="text-[10px] text-slate-500 block">{problem.reporter_count} linked reports</span>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">4. Aging Multiplier</span>
              <span className="font-bold text-slate-900">+{problem.priority_breakdown.aging_multiplier} pts</span>
              <span className="text-[10px] text-slate-500 block">Time open elapsed</span>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">5. Recurrence Factor</span>
              <span className="font-bold text-slate-900">+{problem.priority_breakdown.recurrence_penalty} pts</span>
              <span className="text-[10px] text-slate-500 block">Repeat issue at location</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Details / Right Assignment & AI Verification */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols wide) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Original Complaint Citizen Evidence */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span>ðŸ“¸ Original Citizen Evidence & AI Classification</span>
            </h2>

            {/* Photos Grid */}
            <div>
              <label className="text-xs font-semibold text-slate-500 block mb-2">Uploaded Evidence Photos</label>
              <div className="grid grid-cols-2 gap-3">
                {problem.original_photos.map((photoUrl, idx) => (
                  <div key={idx} className="relative rounded-xl overflow-hidden border border-slate-200 aspect-video group">
                    <img src={photoUrl} alt={`Citizen photo ${idx + 1}`} className="w-full h-full object-cover" />
                    <span className="absolute bottom-2 left-2 bg-slate-900/80 text-white text-[10px] px-2 py-0.5 rounded font-mono">
                      Photo #{idx + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Voice note / audio if available */}
            {problem.original_voice_url && (
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-amber-900">
                  <span>ðŸŽ™ï¸ Voice Note Transcription (Multimodal AI Input)</span>
                  <span className="text-amber-700">Detected Language: {problem.ai_reasoning.includes('Kannada') ? 'Kannada' : 'Hindi / English'}</span>
                </div>
                <audio controls src={problem.original_voice_url} className="w-full h-8" />
                <p className="text-xs text-amber-800 italic">
                  &quot;{problem.original_text || 'Audio transcription: Issue detected and recorded.'}&quot;
                </p>
              </div>
            )}

            {/* AI Classification Reasoning */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-900 font-semibold">
                <span>ðŸ¤– Gemini 2.0 AI Classification Log</span>
                <span className="text-brand-600 font-bold">Confidence: {Math.round(problem.ai_confidence * 100)}%</span>
              </div>
              <p className="text-slate-700">{problem.ai_reasoning}</p>
            </div>
          </div>

          {/* Resolution Evidence Inspector (If available) */}
          {problem.resolution_photo && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span>ðŸ”¬ Module F: AI Evidence Verification Engine</span>
                </h2>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-100 text-brand-800 border border-brand-300">
                  AI Verdict: APPROVED
                </span>
              </div>

              {/* Before vs After Side by Side */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-500 block">BEFORE (Citizen Photo)</span>
                  <div className="rounded-xl overflow-hidden border border-slate-200 aspect-video">
                    <img src={problem.original_photos[0]} alt="Before" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-500 block">AFTER (Officer Field Camera)</span>
                  <div className="rounded-xl overflow-hidden border border-brand-300 aspect-video relative">
                    <img src={problem.resolution_photo} alt="After fix" className="w-full h-full object-cover" />
                    <span className="absolute top-2 right-2 bg-brand-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      GPS Matched âœ“
                    </span>
                  </div>
                </div>
              </div>

              {/* AI Verification Breakdown */}
              {problem.ai_verification && (
                <div className="bg-brand-50 border border-brand-200 p-4 rounded-xl space-y-2 text-xs text-brand-900">
                  <div className="flex items-center justify-between font-bold">
                    <span>Resolution Confidence Score</span>
                    <span className="text-sm font-extrabold">{problem.ai_verification.match_confidence * 100}% Match</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-slate-700">
                    <li>Blank/Vague Photo Check: <strong>PASSED (Not blank/vague)</strong></li>
                    <li>Duplicate Photo Check: <strong>PASSED (Different from original photo)</strong></li>
                    <li>Detected Fixes: <strong>{problem.ai_verification.detected_changes.join(', ')}</strong></li>
                    <li>Citizen Confirmation Status: <strong>{problem.citizen_verified ? 'CONFIRMED YES BY CITIZEN' : 'Pending Citizen Reply'}</strong></li>
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Immutable Audit Trail */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center justify-between">
              <span>ðŸ”— Immutable Audit Trail & State Transitions</span>
              <span className="text-xs font-mono text-slate-400 font-normal">SHA-256 Hash Chain Encrypted</span>
            </h2>

            <div className="space-y-4 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {problem.audit_log.map((log) => (
                <div key={log.id} className="relative pl-8 text-xs space-y-0.5">
                  <div className="absolute left-2 top-1.5 w-3 h-3 rounded-full bg-brand-500 border-2 border-white ring-2 ring-brand-100" />
                  <div className="flex items-center justify-between font-semibold text-slate-900">
                    <span>{STATUS_LABELS[log.status as ProblemStatus] || log.status}</span>
                    <span className="text-slate-400 font-mono text-[10px]">
                      {new Date(log.created_at).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <p className="text-slate-600">{log.notes}</p>
                  <p className="text-[10px] text-slate-400 font-mono">
                    Actor: {log.actor_role} ({log.actor_name}) â€¢ Hash: {log.hash_signature}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Actions, Department Assignment & Officer Panel */}
        <div className="space-y-6">
          {/* Department & Officer Assignment Box */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
            <h2 className="text-base font-bold text-slate-900">
              ðŸ›ï¸ Governance & Department Dispatch
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Target Department</label>
                <select
                  value={assignedDept}
                  onChange={(e) => {
                    setAssignedDept(e.target.value);
                    setAssignedOfficer('');
                  }}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                >
                  {DEMO_DEPARTMENTS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.code})
                    </option>
                  ))}
                </select>
                {deptObj && (
                  <p className="text-[11px] text-slate-500 mt-1">
                    Dept Head: <strong>{deptObj.head_name}</strong> â€¢ Phone: {deptObj.contact_phone}
                  </p>
                )}
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Assign Field Officer</label>
                <select
                  value={assignedOfficer}
                  onChange={(e) => setAssignedOfficer(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                >
                  <option value="">-- Select Officer --</option>
                  {eligibleOfficers.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.name} ({o.role}) â€” Active: {o.active_tasks_count} tasks
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleAssign}
                disabled={isAssigning}
                className="w-full py-2.5 px-4 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-2"
              >
                {isAssigning ? (
                  <span>Saving Assignment...</span>
                ) : (
                  <span>Dispatch & Update SLA Clock</span>
                )}
              </button>

              {assignmentSuccess && (
                <div className="p-2.5 bg-brand-50 text-brand-800 rounded-lg text-[11px] border border-brand-200 font-semibold text-center animate-fade-in">
                  âœ“ Successfully dispatched to department officer!
                </div>
              )}
            </div>
          </div>

          {/* Non-repeat Safeguard Information */}
          <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5 space-y-2 text-xs text-amber-900">
            <h3 className="font-bold flex items-center gap-1.5">
              <span>ðŸ›¡ï¸ Non-Repeat Safeguard (Principle #11)</span>
            </h3>
            <p className="text-amber-800 leading-relaxed">
              If an officer submits invalid or rejected evidence, JanaSetu automatically logs their accountability record. The system never re-assigns a recurring issue to the same officer without human review.
            </p>
          </div>

          {/* Quick Reporter List */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-3 text-xs">
            <h3 className="font-bold text-slate-900 flex items-center justify-between">
              <span>ðŸ‘¥ Linked Reporter Citizens ({problem.reporters.length})</span>
              <span className="text-brand-600">WhatsApp First</span>
            </h3>

            <div className="divide-y divide-slate-100">
              {problem.reporters.map((rep) => (
                <div key={rep.id} className="py-2 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-800">{rep.name || 'Anonymous Citizen'}</p>
                    <p className="text-slate-400 font-mono text-[10px]">{rep.phone}</p>
                  </div>
                  <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {new Date(rep.timestamp).toLocaleDateString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
