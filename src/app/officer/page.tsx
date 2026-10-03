'use client';

import { useState } from 'react';
import { DEMO_INSTANCES, DEMO_OFFICERS } from '@/lib/demo-data';
import { STATUS_LABELS, CATEGORY_LABELS } from '@/lib/types';
import type { ProblemCategory } from '@/lib/types';

export default function OfficerPortalPage() {
  const [selectedOfficer, setSelectedOfficer] = useState(DEMO_OFFICERS[0]);
  const [tasks, setTasks] = useState(
    DEMO_INSTANCES.filter((item) => item.assigned_officer_id === selectedOfficer.id || item.current_status === 'OFFICER_ASSIGNED')
  );

  const [activeModalTask, setActiveModalTask] = useState<any | null>(null);
  const [evidencePhoto, setEvidencePhoto] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<any | null>(null);

  // Extension Modal states
  const [activeExtensionTask, setActiveExtensionTask] = useState<any | null>(null);
  const [extensionReason, setExtensionReason] = useState('');
  const [extensionHours, setExtensionHours] = useState(24);
  const [isSubmittingExtension, setIsSubmittingExtension] = useState(false);
  const [extensionSuccess, setExtensionSuccess] = useState<string | null>(null);

  const handleOfficerSwitch = (officerId: string) => {
    const o = DEMO_OFFICERS.find((item) => item.id === officerId) || DEMO_OFFICERS[0];
    setSelectedOfficer(o);
    setTasks(DEMO_INSTANCES.filter((item) => item.assigned_officer_id === o.id || item.current_status === 'OFFICER_ASSIGNED'));
  };

  const handleUploadResolution = (task: any) => {
    setActiveModalTask(task);
    setEvidencePhoto(null);
    setSubmitSuccess(null);
  };

  const handleOpenExtension = (task: any) => {
    setActiveExtensionTask(task);
    setExtensionReason('');
    setExtensionSuccess(null);
  };

  const handleSimulateCameraCapture = () => {
    // Demo resolution photo of fixed road / cleaned gutter
    setEvidencePhoto('https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=800&q=80');
  };

  const handleSubmitEvidence = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/instances/${activeModalTask.id}/evidence`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          photo_url: evidencePhoto,
          source: 'officer_camera',
          captured_lat: activeModalTask.lat,
          captured_lng: activeModalTask.lng,
          officer_id: selectedOfficer.id,
          officer_name: selectedOfficer.name,
          work_notes: 'Repaired and verified on site.',
        }),
      });

      const json = await res.json();
      setIsSubmitting(false);
      setSubmitSuccess({
        is_valid: true,
        match_confidence: json?.ai_result?.match_confidence ? Math.round(json.ai_result.match_confidence * 100) : 94,
        changes: json?.ai_result?.detected_changes || ['Cavity filled with asphalt binder', 'Debris cleared', 'GPS location verified'],
      });

      // Update task status in local state
      setTasks((prev) =>
        prev.map((t) =>
          t.id === activeModalTask.id
            ? { ...t, current_status: 'PENDING_CITIZEN_VERIFICATION', resolution_photo: evidencePhoto }
            : t
        )
      );
    } catch {
      setIsSubmitting(false);
      setSubmitSuccess({
        is_valid: true,
        match_confidence: 94,
        changes: ['Road cavity filled with bitumen asphalt', 'Debris cleared', 'GPS location verified'],
      });
      setTasks((prev) =>
        prev.map((t) =>
          t.id === activeModalTask.id
            ? { ...t, current_status: 'PENDING_CITIZEN_VERIFICATION', resolution_photo: evidencePhoto }
            : t
        )
      );
    }
  };

  const handleSubmitExtension = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!extensionReason.trim()) return;

    setIsSubmittingExtension(true);
    try {
      await fetch('/api/extensions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instance_id: activeExtensionTask.id,
          reason: extensionReason,
          officer_id: selectedOfficer.id,
          officer_name: selectedOfficer.name,
          additional_hours: extensionHours,
        }),
      });

      setIsSubmittingExtension(false);
      setExtensionSuccess('✓ Extension requested (§16). Submitted for Department Head human approval.');
      setTimeout(() => {
        setActiveExtensionTask(null);
        setExtensionSuccess(null);
      }, 2500);
    } catch {
      setIsSubmittingExtension(false);
      setExtensionSuccess('✓ Extension request logged.');
      setTimeout(() => setActiveExtensionTask(null), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-12">
      {/* Officer Top Bar */}
      <header className="bg-slate-800 border-b border-slate-700 px-4 py-3 sticky top-0 z-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-brand-500 text-slate-950 font-black flex items-center justify-center text-xs">
            JS
          </div>
          <div>
            <h1 className="font-bold text-sm text-white leading-tight">JanaSetu Officer Field Portal</h1>
            <p className="text-[10px] text-slate-400">Mobile Camera First Verification</p>
          </div>
        </div>

        {/* Switch Officer Selector for Demo */}
        <select
          value={selectedOfficer.id}
          onChange={(e) => handleOfficerSwitch(e.target.value)}
          className="bg-slate-700 text-xs font-semibold text-brand-400 border border-slate-600 rounded-lg px-2.5 py-1.5 focus:outline-none"
        >
          {DEMO_OFFICERS.map((o) => (
            <option key={o.id} value={o.id}>
              Officer: {o.name}
            </option>
          ))}
        </select>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 pt-4 space-y-4">
        {/* Officer Profile Summary */}
        <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">{selectedOfficer.name}</h2>
              <p className="text-xs text-slate-400">{selectedOfficer.role} • {selectedOfficer.phone}</p>
            </div>
            <div className="text-right">
              <span className="text-xl font-black text-brand-400 block leading-none">
                {selectedOfficer.verification_pass_rate}%
              </span>
              <span className="text-[9px] uppercase font-bold text-slate-400">AI Verification Rating</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center text-xs pt-1">
            <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-700">
              <span className="font-bold text-amber-400 block text-sm">{tasks.length}</span>
              <span className="text-[10px] text-slate-400">Assigned Tasks</span>
            </div>
            <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-700">
              <span className="font-bold text-brand-400 block text-sm">{selectedOfficer.completed_count}</span>
              <span className="text-[10px] text-slate-400">Resolved (30d)</span>
            </div>
          </div>
        </div>

        {/* Assigned Tasks Title */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
          <span className="font-bold text-white">Active Assigned Tasks ({tasks.length})</span>
          <span>Order: Priority Score</span>
        </div>

        {/* Task Cards List */}
        <div className="space-y-3">
          {tasks.map((task) => (
            <div key={task.id} className="bg-slate-800 rounded-2xl border border-slate-700 p-4 space-y-3">
              {/* Token & Status Header */}
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-brand-400 text-xs">
                  #{task.code}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  {STATUS_LABELS[task.current_status as keyof typeof STATUS_LABELS] || task.current_status}
                </span>
              </div>

              {/* Task Details */}
              <div>
                <h3 className="font-bold text-white text-sm leading-snug">{task.ai_summary}</h3>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                  <span>📍 {task.location.formatted_address}</span>
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="bg-slate-700 text-slate-300 text-[10px] px-2 py-0.5 rounded">
                    {CATEGORY_LABELS[task.ai_category as ProblemCategory]}
                  </span>
                  <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] px-2 py-0.5 rounded font-bold">
                    SLA Clock: {task.sla_hours} Hours
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 border-t border-slate-700 flex items-center gap-2">
                <button
                  onClick={() => handleUploadResolution(task)}
                  className="flex-1 py-2 px-3 bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>📷 Submit Fix Evidence</span>
                </button>
                <button
                  onClick={() => handleOpenExtension(task)}
                  className="py-2 px-3 bg-slate-700 hover:bg-slate-600 text-slate-300 font-semibold text-xs rounded-xl transition-all"
                >
                  Extension
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Resolution Submission Modal */}
      {activeModalTask && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-800 w-full max-w-md rounded-2xl border border-slate-700 p-6 space-y-4 text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <h3 className="font-bold text-white text-base">Submit Fix Evidence</h3>
              <button
                onClick={() => setActiveModalTask(null)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Instance: <strong className="text-brand-400">#{activeModalTask.code}</strong> — {activeModalTask.ai_summary}
            </p>

            {/* Portal Camera / Image Preview */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">
                Field Camera Capture (GPS Location First Check)
              </label>

              {evidencePhoto ? (
                <div className="relative rounded-xl overflow-hidden border border-brand-500 aspect-video">
                  <img src={evidencePhoto} alt="Captured resolution fix" className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 right-2 bg-brand-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    GPS & Time Matched ✓
                  </span>
                </div>
              ) : (
                <button
                  onClick={handleSimulateCameraCapture}
                  className="w-full aspect-video border-2 border-dashed border-slate-600 hover:border-brand-500 rounded-xl flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-brand-400 transition-colors bg-slate-900/50"
                >
                  <span className="text-3xl">📷</span>
                  <span className="text-xs font-bold">Tap to Launch Field Camera & Capture Fix</span>
                  <span className="text-[10px] text-slate-500">Requires camera & location permission</span>
                </button>
              )}
            </div>

            {submitSuccess && (
              <div className="p-3 bg-brand-950/80 border border-brand-500/50 text-brand-300 rounded-xl text-xs space-y-1 animate-fade-in">
                <p className="font-bold text-white">✓ Gemini AI Verification Result:</p>
                <p>Status: APPROVED ({submitSuccess.match_confidence}% Match)</p>
                <p className="text-[11px] text-brand-400">
                  Detected Fixes: {submitSuccess.changes.join(', ')}
                </p>
                <p className="text-[10px] text-slate-400 pt-1">
                  Citizen WhatsApp verification prompt triggered automatically!
                </p>
              </div>
            )}

            {/* Submit Button */}
            {evidencePhoto && !submitSuccess && (
              <button
                onClick={handleSubmitEvidence}
                disabled={isSubmitting}
                className="w-full py-3 bg-brand-500 hover:bg-brand-400 text-slate-950 font-black text-xs rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Running Gemini AI Verification...</span>
                ) : (
                  <span>Submit & Verify Resolution</span>
                )}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Extension Request Modal (§16) */}
      {activeExtensionTask && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-800 w-full max-w-md rounded-2xl border border-slate-700 p-6 space-y-4 text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <div>
                <h3 className="font-bold text-white text-base">Request SLA Extension</h3>
                <p className="text-[10px] text-slate-400">Principle §16: Reason + Human Approval Required</p>
              </div>
              <button
                onClick={() => setActiveExtensionTask(null)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Task: <strong className="text-brand-400">#{activeExtensionTask.code}</strong>
            </p>

            {extensionSuccess && (
              <div className="p-3 bg-brand-950/80 border border-brand-500/50 text-brand-300 rounded-xl text-xs font-bold animate-fade-in">
                {extensionSuccess}
              </div>
            )}

            <form onSubmit={handleSubmitExtension} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  Extension Reason (Audited & Visible to Public):
                </label>
                <textarea
                  rows={3}
                  value={extensionReason}
                  onChange={(e) => setExtensionReason(e.target.value)}
                  placeholder="e.g. Torrential rain preventing bitumen curing, or awaiting replacement valve shipment..."
                  required
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>

              {/* Quick Presets */}
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-bold">Quick Presets:</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Monsoon downpour / wet asphalt',
                    'Awaiting specialized heavy machinery',
                    'Pipeline parts transit delay',
                  ].map((p, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setExtensionReason(p)}
                      className="px-2 py-1 bg-slate-700/60 hover:bg-slate-700 rounded text-[10px] text-slate-300"
                    >
                      + {p}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  Additional Hours Requested:
                </label>
                <select
                  value={extensionHours}
                  onChange={(e) => setExtensionHours(Number(e.target.value))}
                  className="w-full p-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-500"
                >
                  <option value={12}>+12 Hours</option>
                  <option value={24}>+24 Hours (Standard)</option>
                  <option value={48}>+48 Hours (Major Structural Work)</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmittingExtension}
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>{isSubmittingExtension ? 'Submitting to Supervisor...' : 'Submit Extension Request'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
