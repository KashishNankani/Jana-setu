'use client';

import { DEMO_OFFICERS, DEMO_DEPARTMENTS } from '@/lib/demo-data';

export default function OfficersPage() {
  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Field Officer Roster & Accountability History
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Transparency matrix — AI evidence verification ratings, rejected uploads, and non-repeat safeguard history.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-lg text-xs font-semibold">
            🛡️ AI Verification Oversight Active
          </span>
        </div>
      </div>

      {/* Officers Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-4">Officer Name & Contact</th>
                <th className="py-3.5 px-4">Department & Role</th>
                <th className="py-3.5 px-4">Active Tasks</th>
                <th className="py-3.5 px-4">Resolved (30d)</th>
                <th className="py-3.5 px-4">AI Verification Pass Rate</th>
                <th className="py-3.5 px-4">Rejection Flags</th>
                <th className="py-3.5 px-4 text-right">Accountability Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {DEMO_OFFICERS.map((officer) => {
                const dept = DEMO_DEPARTMENTS.find((d) => d.id === officer.department_id);
                return (
                  <tr key={officer.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Name & Contact */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs">
                          {officer.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-xs">{officer.name}</p>
                          <p className="text-[11px] text-slate-400 font-mono">{officer.phone}</p>
                        </div>
                      </div>
                    </td>

                    {/* Department & Role */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <p className="font-semibold text-slate-800">{dept ? dept.name : 'Public Works'}</p>
                      <p className="text-[10px] text-slate-400">{officer.role}</p>
                    </td>

                    {/* Active Tasks */}
                    <td className="py-4 px-4 whitespace-nowrap font-bold text-amber-700">
                      {officer.active_tasks_count} tasks
                    </td>

                    {/* Resolved Count */}
                    <td className="py-4 px-4 whitespace-nowrap font-bold text-emerald-700">
                      {officer.completed_count} fixed
                    </td>

                    {/* Pass Rate */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${officer.verification_pass_rate >= 90 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                            style={{ width: `${officer.verification_pass_rate}%` }}
                          />
                        </div>
                        <span className="font-bold text-slate-900">{officer.verification_pass_rate}%</span>
                      </div>
                    </td>

                    {/* Rejected Uploads */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      {officer.rejected_evidence_count > 0 ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 font-semibold text-[11px]">
                          ⚠️ {officer.rejected_evidence_count} rejected upload{officer.rejected_evidence_count > 1 ? 's' : ''}
                        </span>
                      ) : (
                        <span className="text-emerald-700 font-semibold">✓ 0 flags</span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4 whitespace-nowrap text-right">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold text-[11px]">
                        Good Standing
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
