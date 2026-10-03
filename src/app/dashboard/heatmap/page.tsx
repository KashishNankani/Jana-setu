'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DEMO_INSTANCES } from '@/lib/demo-data';

interface Hotspot {
  id: string;
  name: string;
  ward: number;
  count: number;
  priority: 'high' | 'medium' | 'low';
  category: string;
  top: string;
  left: string;
  color: string;
  code: string;
  instanceId: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'h1',
    name: 'Braj Vihar Market Road',
    ward: 12,
    count: 31,
    priority: 'high',
    category: 'garbage',
    top: '38%',
    left: '36%',
    color: 'bg-rose-500 shadow-rose-500/50',
    code: 'JS-2026-0517-1024',
    instanceId: 'inst-001',
  },
  {
    id: 'h2',
    name: 'MG Road Metro Junction',
    ward: 5,
    count: 23,
    priority: 'high',
    category: 'water_leak',
    top: '24%',
    left: '52%',
    color: 'bg-rose-600 shadow-rose-600/50',
    code: 'JS-2026-0517-1023',
    instanceId: 'inst-002',
  },
  {
    id: 'h3',
    name: 'Scheme No. 54 Main Drain',
    ward: 18,
    count: 18,
    priority: 'high',
    category: 'drainage',
    top: '56%',
    left: '26%',
    color: 'bg-rose-500 shadow-rose-500/50',
    code: 'JS-2026-0517-1021',
    instanceId: 'inst-004',
  },
  {
    id: 'h4',
    name: 'Vijay Nagar Square',
    ward: 10,
    count: 14,
    priority: 'medium',
    category: 'streetlight',
    top: '64%',
    left: '48%',
    color: 'bg-amber-500 shadow-amber-500/50',
    code: 'JS-2026-0517-1022',
    instanceId: 'inst-005',
  },
  {
    id: 'h5',
    name: 'Rau Bypass Carriageway',
    ward: 17,
    count: 11,
    priority: 'low',
    category: 'road_pothole',
    top: '72%',
    left: '68%',
    color: 'bg-emerald-500 shadow-emerald-500/50',
    code: 'JS-2026-0517-1020',
    instanceId: 'inst-003',
  },
  {
    id: 'h6',
    name: 'Palasia Ring Road',
    ward: 8,
    count: 6,
    priority: 'low',
    category: 'public_infrastructure',
    top: '32%',
    left: '74%',
    color: 'bg-emerald-500 shadow-emerald-500/50',
    code: 'JS-2026-0517-1019',
    instanceId: 'inst-001',
  },
];

export default function MunicipalHeatMapPage() {
  const [viewMode, setViewMode] = useState<'heat' | 'pins'>('heat');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedWard, setSelectedWard] = useState('ALL');
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(HOTSPOTS[0]);

  const filteredHotspots = HOTSPOTS.filter((h) => {
    if (selectedCategory !== 'ALL' && h.category !== selectedCategory) return false;
    if (selectedWard !== 'ALL' && h.ward.toString() !== selectedWard) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">City Civic Heat Map</h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time geospatial density and priority clusters across Indore Municipal Corporation.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('heat')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'heat'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <span>🔥 Heat Map</span>
            </button>
            <button
              onClick={() => setViewMode('pins')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'pins'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <span>📍 Pin Clusters</span>
            </button>
          </div>

          <Link
            href="/dashboard/problems"
            className="px-3.5 py-1.5 text-xs font-bold text-brand-600 bg-brand-50 hover:bg-brand-100 rounded-xl border border-brand-200 transition-colors"
          >
            Open Queue →
          </Link>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-semibold text-slate-800 focus:outline-none"
            >
              <option value="ALL">All Categories</option>
              <option value="garbage">Garbage / Waste</option>
              <option value="water_leak">Water Supply</option>
              <option value="drainage">Drainage & Sewer</option>
              <option value="road_pothole">Roads & Potholes</option>
              <option value="streetlight">Street Lights</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">Ward:</span>
            <select
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-semibold text-slate-800 focus:outline-none"
            >
              <option value="ALL">All Wards (1-20)</option>
              <option value="12">Ward 12 (Braj Vihar)</option>
              <option value="5">Ward 5 (MG Road)</option>
              <option value="18">Ward 18 (Scheme 54)</option>
              <option value="10">Ward 10 (Vijay Nagar)</option>
              <option value="17">Ward 17 (Rau)</option>
              <option value="8">Ward 8 (Palasia)</option>
            </select>
          </div>
        </div>

        {/* Priority Legend */}
        <div className="flex items-center gap-4 text-[11px] font-semibold text-slate-600">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> High (Emergency)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Medium
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Low
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400" /> Resolved
          </span>
        </div>
      </div>

      {/* Main Map Viewport & Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Interactive Map Canvas (Span 3) */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-100 shadow-sm p-4 relative overflow-hidden">
          <div className="relative h-[540px] w-full rounded-xl bg-slate-100 border border-slate-200 overflow-hidden">
            {/* Grid street layout background */}
            <div className="absolute inset-0 opacity-40 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* City Road Network Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50" xmlns="http://www.w3.org/2000/svg">
              <line x1="10%" y1="40%" x2="90%" y2="40%" stroke="#94a3b8" strokeWidth="4" />
              <line x1="30%" y1="10%" x2="70%" y2="90%" stroke="#94a3b8" strokeWidth="4" />
              <line x1="50%" y1="10%" x2="50%" y2="90%" stroke="#cbd5e1" strokeWidth="6" />
              <line x1="10%" y1="70%" x2="90%" y2="70%" stroke="#cbd5e1" strokeWidth="3" />
            </svg>

            {/* Ward Boundaries & Labels */}
            <span className="absolute top-12 left-16 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-white/80 px-2 py-0.5 rounded shadow-sm">
              Ward 3
            </span>
            <span className="absolute top-28 left-40 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-white/80 px-2 py-0.5 rounded shadow-sm">
              Ward 5 (MG Road)
            </span>
            <span className="absolute top-44 left-32 text-[10px] font-bold text-brand-600 uppercase tracking-widest bg-white/90 px-2 py-0.5 rounded shadow-sm border border-brand-200">
              Ward 12 (Braj Vihar)
            </span>
            <span className="absolute top-20 right-48 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-white/80 px-2 py-0.5 rounded shadow-sm">
              Ward 8 (Palasia)
            </span>
            <span className="absolute bottom-28 left-24 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-white/80 px-2 py-0.5 rounded shadow-sm">
              Ward 18 (Scheme 54)
            </span>
            <span className="absolute bottom-24 right-40 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-white/80 px-2 py-0.5 rounded shadow-sm">
              Ward 10 (Vijay Nagar)
            </span>
            <span className="absolute bottom-12 right-20 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-white/80 px-2 py-0.5 rounded shadow-sm">
              Ward 17 (Rau)
            </span>

            {/* Heat Gradients Layer */}
            {viewMode === 'heat' && (
              <>
                <div
                  className="absolute w-44 h-44 rounded-full bg-rose-500/25 blur-2xl pointer-events-none"
                  style={{ top: '30%', left: '28%' }}
                />
                <div
                  className="absolute w-40 h-40 rounded-full bg-rose-600/25 blur-2xl pointer-events-none"
                  style={{ top: '16%', left: '44%' }}
                />
                <div
                  className="absolute w-36 h-36 rounded-full bg-amber-500/25 blur-xl pointer-events-none"
                  style={{ top: '56%', left: '40%' }}
                />
              </>
            )}

            {/* Hotspot Pins */}
            {filteredHotspots.map((h) => {
              const isSelected = activeHotspot?.id === h.id;
              return (
                <button
                  key={h.id}
                  onClick={() => setActiveHotspot(h)}
                  style={{ top: h.top, left: h.left }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all transform hover:scale-125 z-20 ${
                    isSelected ? 'scale-125 ring-4 ring-white' : ''
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-full ${h.color} text-white font-black text-xs flex items-center justify-center shadow-lg border-2 border-white`}
                  >
                    {h.count}
                  </div>
                  {viewMode === 'pins' && (
                    <span className="absolute top-10 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap shadow-sm">
                      {h.name}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Map Controls */}
            <div className="absolute bottom-4 right-4 bg-white rounded-xl shadow-md border border-slate-200 p-1 flex flex-col gap-1 z-20">
              <button
                onClick={() => alert('Zoom In')}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-700 font-bold"
              >
                +
              </button>
              <button
                onClick={() => alert('Zoom Out')}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-700 font-bold"
              >
                −
              </button>
              <button
                onClick={() => alert('Center on Indore Ward 12')}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-700 text-xs"
              >
                🎯
              </button>
            </div>
          </div>
        </div>

        {/* Selected Cluster Details Drawer (Right Column) */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">Cluster Details</h3>
            {activeHotspot && (
              <span className="text-[10px] font-mono font-bold text-slate-500">
                Ward {activeHotspot.ward}
              </span>
            )}
          </div>

          {activeHotspot ? (
            <div className="space-y-4 text-xs">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                  ● {activeHotspot.priority.toUpperCase()} PRIORITY CLUSTER
                </span>
                <h4 className="text-base font-bold text-slate-900 mt-2">{activeHotspot.name}</h4>
                <p className="text-slate-500 mt-0.5">Indore Municipal Ward {activeHotspot.ward}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Linked Reports:</span>
                  <span className="font-bold text-slate-900">{activeHotspot.count} Citizens</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Category:</span>
                  <span className="font-bold text-slate-900 capitalize">
                    {activeHotspot.category.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Master Problem ID:</span>
                  <span className="font-mono font-bold text-brand-600">#{activeHotspot.code}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Est. Population Impact:</span>
                  <span className="font-bold text-rose-600">~{activeHotspot.count * 25} Residents</span>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <Link
                  href={`/dashboard/problems/${activeHotspot.instanceId}`}
                  className="w-full py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Open Problem Dossier →</span>
                </Link>
                <Link
                  href={`/t/token-indore-001`}
                  target="_blank"
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-all flex items-center justify-center gap-1"
                >
                  <span>🔗 Public Tracking Link</span>
                </Link>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-400">Click on any cluster pin to inspect details.</p>
          )}

          {/* Quick Ward Leaderboard */}
          <div className="pt-4 border-t border-slate-100 space-y-2.5">
            <h4 className="text-xs font-bold text-slate-900">Ward Density Ranking</h4>
            {[
              { ward: 'Ward 12 (Braj Vihar)', open: 31, color: 'bg-rose-500' },
              { ward: 'Ward 5 (MG Road)', open: 23, color: 'bg-rose-500' },
              { ward: 'Ward 18 (Scheme 54)', open: 18, color: 'bg-amber-500' },
              { ward: 'Ward 10 (Vijay Nagar)', open: 14, color: 'bg-amber-500' },
            ].map((w, idx) => (
              <div key={idx} className="flex items-center justify-between text-[11px]">
                <span className="text-slate-700 font-medium truncate">{w.ward}</span>
                <span className="font-bold text-slate-900 flex items-center gap-1">
                  <span className={`w-2 h-2 rounded-full ${w.color}`} />
                  {w.open} issues
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
