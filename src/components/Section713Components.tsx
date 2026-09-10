import { useState } from 'react';
import { Cpu, CheckSquare, AlertOctagon, Wrench, ShieldAlert } from 'lucide-react';
import { MACHINE_COMPONENTS } from '../data/weldingData';
import { MachineComponent } from '../types';

export default function Section713Components() {
  const [selectedCompId, setSelectedCompId] = useState<string>('electrode-holder');

  const activeComponent: MachineComponent = MACHINE_COMPONENTS.find(c => c.id === selectedCompId) || MACHINE_COMPONENTS[0];

  return (
    <section id="section-7-1-3" className="space-y-6">
      {/* Section Header */}
      <div className="bg-slate-850 rounded-xl p-5 border border-slate-750 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-400 font-mono text-xs font-bold border border-amber-500/30">
              SOP Clause 7.1.3
            </span>
            <span className="text-xs text-slate-400 font-medium">Equipment Architecture & Inspection</span>
          </div>
          <span className="text-xs text-slate-500 font-mono">EN 60974-1 / OSHA 1910.252 / AWS D1.1</span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          Basic Components of an Arc Welding Machine
        </h2>
        <p className="text-slate-300 text-sm mt-1 max-w-4xl">
          An arc welding installation comprises the core electrical power source, current control circuitry, 
          polarity commutators, high-amperage flexible conductors, and heavy-duty contact accessories that together 
          form a closed high-current, low-voltage welding loop.
        </p>
      </div>

      {/* Interactive Architecture Schematic */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-amber-400" />
            Interactive Machine Architecture &amp; Circuit Layout
          </h3>
          <span className="text-xs text-slate-400">Click any component to inspect function, SOP check &amp; safety rules.</span>
        </div>

        {/* Machine Schematic SVG */}
        <div className="bg-slate-950 rounded-lg p-3 border border-slate-800 flex justify-center">
          <svg viewBox="0 0 820 420" className="w-full max-w-4xl h-auto select-none">
            <defs>
              <linearGradient id="machine-body-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
              <linearGradient id="metal-table-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#475569" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>
            </defs>

            {/* Primary Mains Input Cable & Wall Outlet */}
            <g>
              <rect x="20" y="100" width="40" height="70" fill="#1e293b" stroke="#64748b" strokeWidth="2" rx="4" />
              <text x="25" y="90" fill="#94a3b8" fontSize="10" fontWeight="bold">230V/415V</text>
              <path d="M 60 135 C 100 135, 100 180, 150 180" fill="none" stroke="#ef4444" strokeWidth="6" strokeLinecap="round" />
              <path d="M 60 135 C 100 135, 100 180, 150 180" fill="none" stroke="#facc15" strokeWidth="2" strokeDasharray="6 6" />
            </g>

            {/* Main Power Source Chassis */}
            <rect
              x="150"
              y="110"
              width="240"
              height="250"
              fill="url(#machine-body-grad)"
              stroke={selectedCompId === 'power-source' ? '#f59e0b' : '#475569'}
              strokeWidth={selectedCompId === 'power-source' ? 3 : 2}
              rx="12"
              className="cursor-pointer"
              onClick={() => setSelectedCompId('power-source')}
            />
            {/* Top Carry Handle */}
            <rect x="230" y="95" width="80" height="15" fill="#334155" stroke="#64748b" strokeWidth="1.5" rx="3" />

            {/* Machine Faceplate Panel */}
            <rect x="170" y="130" width="200" height="210" fill="#0f172a" stroke="#334155" strokeWidth="1.5" rx="6" />

            {/* Brand / Model Header */}
            <text x="180" y="152" fill="#f8fafc" fontSize="12" fontWeight="bold" fontFamily="monospace">
              SMAW POWER SOURCE 300A
            </text>
            <line x1="180" y1="158" x2="355" y2="158" stroke="#334155" strokeWidth="1" />

            {/* Polarity Selector Switch */}
            <g className="cursor-pointer" onClick={() => setSelectedCompId('polarity-switch')}>
              <rect
                x="185"
                y="175"
                width="70"
                height="45"
                fill="#1e293b"
                stroke={selectedCompId === 'polarity-switch' ? '#f59e0b' : '#475569'}
                strokeWidth={selectedCompId === 'polarity-switch' ? 2.5 : 1}
                rx="4"
              />
              <circle cx="220" cy="197" r="14" fill="#334155" stroke="#94a3b8" />
              <line x1="220" y1="197" x2="210" y2="190" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
              <text x="190" y="232" fill="#94a3b8" fontSize="9" fontWeight="bold">POLARITY (DCEP/DCEN)</text>
            </g>

            {/* Ampere Adjustment Control Dial */}
            <g className="cursor-pointer" onClick={() => setSelectedCompId('amp-control')}>
              <rect
                x="275"
                y="175"
                width="80"
                height="45"
                fill="#1e293b"
                stroke={selectedCompId === 'amp-control' ? '#f59e0b' : '#475569'}
                strokeWidth={selectedCompId === 'amp-control' ? 2.5 : 1}
                rx="4"
              />
              <circle cx="315" cy="197" r="15" fill="#334155" stroke="#94a3b8" />
              <line x1="315" y1="197" x2="324" y2="190" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
              <text x="280" y="232" fill="#38bdf8" fontSize="9" fontWeight="bold">AMPERE DIAL (A)</text>
            </g>

            {/* Digital Ampere Display */}
            <rect x="235" y="242" width="70" height="25" fill="#020617" stroke="#1e293b" rx="3" />
            <text x="250" y="260" fill="#22c55e" fontSize="14" fontWeight="bold" fontFamily="monospace">
              130 A
            </text>

            {/* Cooling Fan Vent */}
            <g className="cursor-pointer" onClick={() => setSelectedCompId('cooling-fan')}>
              <rect
                x="180"
                y="280"
                width="45"
                height="45"
                fill="#1e293b"
                stroke={selectedCompId === 'cooling-fan' ? '#f59e0b' : '#334155'}
                strokeWidth={selectedCompId === 'cooling-fan' ? 2 : 1}
                rx="4"
              />
              {/* Fan Blades */}
              <circle cx="202" cy="302" r="16" fill="#0f172a" stroke="#475569" />
              <circle cx="202" cy="302" r="4" fill="#64748b" />
              <line x1="202" y1="288" x2="202" y2="316" stroke="#94a3b8" strokeWidth="2" />
              <line x1="188" y1="302" x2="216" y2="302" stroke="#94a3b8" strokeWidth="2" />
              <text x="175" y="337" fill="#94a3b8" fontSize="8" fontWeight="bold">COOLING FAN</text>
            </g>

            {/* Output Terminals (+ and -) */}
            <g className="cursor-pointer" onClick={() => setSelectedCompId('output-terminals')}>
              {/* Positive Terminal (+) */}
              <rect
                x="250"
                y="285"
                width="40"
                height="40"
                fill="#991b1b"
                stroke={selectedCompId === 'output-terminals' ? '#f59e0b' : '#ef4444'}
                strokeWidth={selectedCompId === 'output-terminals' ? 3 : 1.5}
                rx="4"
              />
              <circle cx="270" cy="305" r="10" fill="#dc2626" stroke="#fecaca" strokeWidth="1.5" />
              <text x="264" y="310" fill="#ffffff" fontSize="16" fontWeight="bold">+</text>
              <text x="252" y="337" fill="#ef4444" fontSize="9" fontWeight="bold">POS (+)</text>

              {/* Negative Terminal (-) */}
              <rect
                x="310"
                y="285"
                width="40"
                height="40"
                fill="#1e3a8a"
                stroke={selectedCompId === 'output-terminals' ? '#f59e0b' : '#3b82f6'}
                strokeWidth={selectedCompId === 'output-terminals' ? 3 : 1.5}
                rx="4"
              />
              <circle cx="330" cy="305" r="10" fill="#2563eb" stroke="#bfdbfe" strokeWidth="1.5" />
              <text x="326" y="310" fill="#ffffff" fontSize="16" fontWeight="bold">-</text>
              <text x="312" y="337" fill="#3b82f6" fontSize="9" fontWeight="bold">NEG (-)</text>
            </g>

            {/* Heavy Electrode Cable (Positive Lead in DCEP) */}
            <path
              d="M 270 325 C 270 410, 480 390, 520 280 C 530 250, 560 210, 600 200"
              fill="none"
              stroke="#ef4444"
              strokeWidth={selectedCompId === 'electrode-cable' ? 7 : 5}
              strokeLinecap="round"
              className="cursor-pointer"
              onClick={() => setSelectedCompId('electrode-cable')}
            />

            {/* Electrode Holder (Stinger) */}
            <g
              className="cursor-pointer"
              onClick={() => setSelectedCompId('electrode-holder')}
              transform="translate(600, 170) rotate(-25)"
            >
              {/* Insulated Handle */}
              <rect
                x="0"
                y="0"
                width="65"
                height="22"
                fill="#1e293b"
                stroke={selectedCompId === 'electrode-holder' ? '#f59e0b' : '#e2e8f0'}
                strokeWidth={selectedCompId === 'electrode-holder' ? 3 : 1.5}
                rx="5"
              />
              {/* Spring Lever */}
              <path d="M 15 -10 L 30 0" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
              <rect x="8" y="-18" width="18" height="10" fill="#475569" rx="2" />
              {/* Insulated Jaw Clamping Head */}
              <rect x="65" y="2" width="25" height="18" fill="#b45309" rx="3" />
              {/* Clamped Coated Electrode */}
              <rect x="80" y="-45" width="6" height="110" fill="#a16207" stroke="#78350f" rx="1" />
              <rect x="81" y="-55" width="4" height="15" fill="#cbd5e1" /> {/* Bare grip end */}
              {/* Arc Flash at tip */}
              <circle cx="83" cy="65" r="8" fill="#ffffff" opacity="0.9" />
              <circle cx="83" cy="65" r="16" fill="#38bdf8" opacity="0.4" />
            </g>

            {/* Welding Table / Workpiece */}
            <g>
              <rect x="520" y="230" width="260" height="20" fill="url(#metal-table-grad)" stroke="#64748b" strokeWidth="1.5" />
              {/* Table legs */}
              <rect x="535" y="250" width="12" height="120" fill="#334155" stroke="#475569" />
              <rect x="750" y="250" width="12" height="120" fill="#334155" stroke="#475569" />
              {/* Steel Workpiece on Table */}
              <rect x="580" y="215" width="130" height="15" fill="#64748b" stroke="#cbd5e1" strokeWidth="1.5" rx="2" />
              <text x="605" y="226" fill="#f8fafc" fontSize="10" fontWeight="bold">Workpiece Joint</text>
            </g>

            {/* Work Return Cable (Negative Lead in DCEP) */}
            <path
              d="M 330 325 C 330 430, 680 430, 710 270 L 710 245"
              fill="none"
              stroke="#3b82f6"
              strokeWidth={selectedCompId === 'work-cable' ? 7 : 5}
              strokeLinecap="round"
              className="cursor-pointer"
              onClick={() => setSelectedCompId('work-cable')}
            />

            {/* Work Clamp (Ground Clamp) */}
            <g
              className="cursor-pointer"
              onClick={() => setSelectedCompId('work-clamp')}
              transform="translate(695, 220)"
            >
              <rect
                x="0"
                y="0"
                width="35"
                height="28"
                fill="#ca8a04"
                stroke={selectedCompId === 'work-clamp' ? '#f59e0b' : '#eab308'}
                strokeWidth={selectedCompId === 'work-clamp' ? 3 : 1.5}
                rx="3"
              />
              <text x="5" y="18" fill="#1c1917" fontSize="10" fontWeight="bold">CLAMP</text>
              <line x1="8" y1="28" x2="8" y2="35" stroke="#92400e" strokeWidth="3" />
              <line x1="27" y1="28" x2="27" y2="35" stroke="#92400e" strokeWidth="3" />
            </g>

            {/* Circuit Direction Arrows */}
            <text x="430" y="380" fill="#ef4444" fontSize="11" fontWeight="bold" fontFamily="monospace">
              → Electrode Lead Current (Amperes) →
            </text>
            <text x="430" y="410" fill="#3b82f6" fontSize="11" fontWeight="bold" fontFamily="monospace">
              ← Work Return Circuit Loop ←
            </text>
          </svg>
        </div>

        {/* Interactive Component Inspector Card */}
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-850 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-sm">
                <Wrench className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">{activeComponent.name}</h4>
                <p className="text-xs text-slate-400">Technical Specs: {activeComponent.specs}</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-mono text-xs border border-slate-700">
              ID: {activeComponent.id}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
              <span className="font-bold text-amber-400 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                Primary Engineering Function:
              </span>
              <p className="text-slate-300 leading-relaxed">{activeComponent.function}</p>
            </div>

            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckSquare className="w-3.5 h-3.5" />
                Pre-Weld SOP Inspection Criteria:
              </span>
              <p className="text-slate-300 leading-relaxed">{activeComponent.sopInspection}</p>
            </div>

            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
              <span className="font-bold text-red-400 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                Critical Safety Warning (OSHA/AWS):
              </span>
              <p className="text-slate-300 leading-relaxed">{activeComponent.safetyNote}</p>
            </div>
          </div>

          {/* Quick Component Switcher Pills */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {MACHINE_COMPONENTS.map((comp) => (
              <button
                key={comp.id}
                onClick={() => setSelectedCompId(comp.id)}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-all cursor-pointer ${
                  selectedCompId === comp.id
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {comp.name.split(' (')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
