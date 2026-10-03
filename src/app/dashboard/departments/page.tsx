'use client';

import { useState } from 'react';
import { DEMO_DEPARTMENTS, DEMO_CATEGORY_STATS } from '@/lib/demo-data';

export default function DepartmentsPage() {
  const [departments] = useState(DEMO_DEPARTMENTS);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Department Performance & Governance Matrix
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track resolution speed, active workload, SLA compliance, and officer allocation per department.
          </p>
        </div>
        <button
          onClick={() => alert('New Department onboarding wizard opened')}
          className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-all"
        >
          + Add Department
        </button>
      </div>

      {/* Department Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => {
          const stats = DEMO_CATEGORY_STATS.find((c) => c.category === dept.code) || {
            open: Math.floor(Math.random() * 20) + 5,
            resolved: Math.floor(Math.random() * 150) + 40,
            avg_hours: Math.floor(Math.random() * 18) + 12,
          };
          const total = stats.open + stats.resolved;
          const resolveRate = Math.round((stats.resolved / total) * 100);

          return (
            <div key={dept.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {dept.code}
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 mt-1">{dept.name}</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Head: <strong>{dept.head_name}</strong></p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-extrabold text-slate-900 block leading-none">{resolveRate}%</span>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Resolution Rate</span>
                </div>
              </div>

              {/* Stats pill list */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                  <span className="font-extrabold text-amber-600 block text-base">{stats.open}</span>
                  <span className="text-[10px] text-slate-500">Active Queue</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                  <span className="font-extrabold text-emerald-600 block text-base">{stats.resolved}</span>
                  <span className="text-[10px] text-slate-500">Fixed (30d)</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                  <span className="font-extrabold text-blue-600 block text-base">{stats.avg_hours}h</span>
                  <span className="text-[10px] text-slate-500">Avg Fix Time</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                  <span>SLA Compliance Target (48h)</span>
                  <span className="text-emerald-700">{resolveRate >= 85 ? 'Exceeding' : 'On Track'}</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${resolveRate >= 85 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                    style={{ width: `${resolveRate}%` }}
                  />
                </div>
              </div>

              {/* Contact info footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>📞 {dept.contact_phone}</span>
                <span className="font-semibold text-slate-800">✉️ {dept.email}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
