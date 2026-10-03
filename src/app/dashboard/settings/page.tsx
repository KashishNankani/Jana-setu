'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [baseSeverityWeight, setBaseSeverityWeight] = useState(20);
  const [duplicateBonusWeight, setDuplicateBonusWeight] = useState(15);
  const [agingMultiplier, setAgingMultiplier] = useState(1.5);
  const [recurrencePenalty, setRecurrencePenalty] = useState(25);
  const [slaHours, setSlaHours] = useState(48);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Priority Engine & Governance Configuration
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Configure Module C priority formula weightages, SLA deadlines, and WhatsApp bot triggers.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-all flex items-center gap-2"
        >
          <span>Save System Parameters</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold animate-fade-in">
          ✓ Priority engine parameters updated successfully! Re-scoring existing queue...
        </div>
      )}

      {/* Main Settings Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Module C Priority Formula Config */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>⚡ Module C — Priority Engine Weightages</span>
          </h2>
          <p className="text-xs text-slate-500">
            Predefined formula: <code>Score = (BaseWeight + Severity*W1 + Dupes*W2 + Aging*W3 + Recurrence)</code>
          </p>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between font-semibold text-slate-800 mb-1">
                <span>Severity Level Multiplier (W1)</span>
                <span className="text-emerald-700 font-mono font-bold">{baseSeverityWeight} pts/level</span>
              </div>
              <input
                type="range"
                min="5"
                max="40"
                value={baseSeverityWeight}
                onChange={(e) => setBaseSeverityWeight(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-800 mb-1">
                <span>Reporter Duplicate Weight (W2)</span>
                <span className="text-emerald-700 font-mono font-bold">+{duplicateBonusWeight} pts/citizen</span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                value={duplicateBonusWeight}
                onChange={(e) => setDuplicateBonusWeight(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-800 mb-1">
                <span>Aging Multiplier per 24 hours (W3)</span>
                <span className="text-emerald-700 font-mono font-bold">+{agingMultiplier}x speed</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="3.0"
                step="0.1"
                value={agingMultiplier}
                onChange={(e) => setAgingMultiplier(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-800 mb-1">
                <span>Recurring Problem Location Bonus</span>
                <span className="text-rose-700 font-mono font-bold">+{recurrencePenalty} pts</span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                value={recurrencePenalty}
                onChange={(e) => setRecurrencePenalty(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>
          </div>
        </div>

        {/* SLA & Governance Deadlines */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>⏱️ Resolution SLA & Extension Policy</span>
          </h2>

          <div className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-800 block mb-1">
                Default Resolution Deadline (Hours)
              </label>
              <input
                type="number"
                value={slaHours}
                onChange={(e) => setSlaHours(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 font-mono font-bold"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Default deadline is 48 hours as mandated by governance policy.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900">Officer Extension Policy</h3>
              <p className="text-slate-600">
                Extension requests require human approval from Department Head. Unsatisfactory delay triggers officer accountability audit.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900">Citizen Verification Window</h3>
              <p className="text-slate-600">
                Citizens have <strong>48 hours</strong> to respond YES or NO on WhatsApp before auto-closing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
