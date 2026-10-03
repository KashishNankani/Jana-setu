'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  DEMO_INSTANCES,
  DEMO_DEPARTMENTS,
} from '@/lib/demo-data';
import {
  STATUS_COLORS,
  STATUS_LABELS,
  CATEGORY_LABELS,
  SEVERITY_COLORS,
} from '@/lib/types';
import type { ProblemStatus, ProblemCategory } from '@/lib/types';

export default function ProblemsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedDept, setSelectedDept] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'priority' | 'newest' | 'oldest'>('priority');

  const filteredProblems = useMemo(() => {
    return DEMO_INSTANCES.filter((item) => {
      const matchesSearch =
        item.tracking_token.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.ai_summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.formatted_address.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = selectedStatus === 'ALL' || item.current_status === selectedStatus;
      const matchesCategory = selectedCategory === 'ALL' || item.ai_category === selectedCategory;
      const matchesDept = selectedDept === 'ALL' || item.assigned_department_id === selectedDept;

      return matchesSearch && matchesStatus && matchesCategory && matchesDept;
    }).sort((a, b) => {
      if (sortBy === 'priority') return (b.priority_score ?? 0) - (a.priority_score ?? 0);
      if (sortBy === 'newest') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    });
  }, [searchQuery, selectedStatus, selectedCategory, selectedDept, sortBy]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Civic Problems Master Queue
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time departmental queues with AI priority calculation &amp; duplicate clustering.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedStatus('ALL');
              setSelectedCategory('ALL');
              setSelectedDept('ALL');
            }}
            className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all"
          >
            Reset Filters
          </button>
          <button className="px-4 py-2 text-xs font-semibold text-white bg-brand-500 hover:bg-brand-600 rounded-lg shadow-sm transition-all flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export CSV
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {/* Search */}
          <div className="relative md:col-span-1">
            <input
              type="text"
              placeholder="Search ID, keyword, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-slate-900"
            />
            <svg className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-800"
          >
            <option value="ALL">All Statuses ({DEMO_INSTANCES.length})</option>
            {Object.entries(STATUS_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-800"
          >
            <option value="ALL">All Categories</option>
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>

          {/* Department Filter */}
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-800"
          >
            <option value="ALL">All Departments</option>
            {DEMO_DEPARTMENTS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.code})
              </option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-800 font-semibold"
          >
            <option value="priority">Sort: AI Priority Score (High→Low)</option>
            <option value="newest">Sort: Created Date (Newest First)</option>
            <option value="oldest">Sort: Created Date (Oldest First)</option>
          </select>
        </div>

        {/* Quick Result Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span>Showing <strong className="text-slate-900">{filteredProblems.length}</strong> of {DEMO_INSTANCES.length} registered problem instances</span>
          <span className="text-brand-500 font-medium">⚡ Priority scores re-computed continuously with aging multiplier</span>
        </div>
      </div>

      {/* Main Problems Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-4">Priority & ID</th>
                <th className="py-3.5 px-4">Problem Detail</th>
                <th className="py-3.5 px-4">Location & Ward</th>
                <th className="py-3.5 px-4">Department & Officer</th>
                <th className="py-3.5 px-4">Reporters</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProblems.map((problem) => {
                const dept = DEMO_DEPARTMENTS.find((d) => d.id === problem.assigned_department_id);
                return (
                  <tr key={problem.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Priority & Token */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div
                          className={`flex flex-col items-center justify-center w-11 h-11 rounded-xl font-bold ${
                            (problem.priority_score ?? 0) >= 70
                              ? 'bg-rose-100 text-rose-700 border border-rose-300'
                              : (problem.priority_score ?? 0) >= 50
                              ? 'bg-amber-100 text-amber-800 border border-amber-300'
                              : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          }`}
                        >
                          <span className="text-sm font-extrabold leading-none">{problem.priority_score ?? 0}</span>
                          <span className="text-[9px] uppercase font-semibold opacity-75">Score</span>
                        </div>
                        <div>
                          <span className="font-mono font-bold text-slate-900 text-xs block">{problem.code}</span>
                          <span className="text-[10px] text-slate-400">
                            {new Date(problem.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Problem Summary */}
                    <td className="py-4 px-4 max-w-xs">
                      <div className="flex items-start gap-3">
                        {problem.original_photos.length > 0 && (
                          <img
                            src={problem.original_photos[0]}
                            alt={problem.ai_summary}
                            className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                          />
                        )}
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-900 truncate" title={problem.ai_summary}>
                            {problem.ai_summary}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700">
                              {CATEGORY_LABELS[problem.ai_category as ProblemCategory]}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                                SEVERITY_COLORS[String(problem.ai_severity)] || 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              Sev {problem.ai_severity}/5
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="py-4 px-4 max-w-xs">
                      <p className="text-slate-800 font-medium truncate" title={problem.location.formatted_address}>
                        📍 {problem.location.formatted_address}
                      </p>
                      <p className="text-slate-400 text-[11px] mt-0.5">
                        Ward #{problem.location.ward_number} ({problem.location.ward_name})
                      </p>
                    </td>

                    {/* Department & Officer */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <p className="font-semibold text-slate-800">{dept ? dept.name : 'Unassigned'}</p>
                      <p className="text-slate-400 text-[11px] mt-0.5">
                        {problem.assigned_officer_name ? `👤 ${problem.assigned_officer_name}` : '⚠️ Pending assignment'}
                      </p>
                    </td>

                    {/* Reporter Count */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-200 font-semibold text-[11px]">
                        <span>👥</span>
                        <span>{problem.reporter_count} citizen{problem.reporter_count > 1 ? 's' : ''}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full font-semibold text-[11px] border ${
                          STATUS_COLORS[problem.current_status as ProblemStatus] || 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {STATUS_LABELS[problem.current_status as ProblemStatus] || problem.current_status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 whitespace-nowrap text-right">
                      <Link
                        href={`/dashboard/problems/${problem.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-semibold text-[11px] transition-all shadow-sm"
                      >
                        <span>Inspect</span>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
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
