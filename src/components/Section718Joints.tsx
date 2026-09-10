import { useState } from 'react';
import { Layers, Crosshair, ZoomIn, ArrowRight } from 'lucide-react';
import { WELDING_JOINTS } from '../data/weldingData';
import { WeldingJoint } from '../types';

export default function Section718Joints() {
  const [selectedJointId, setSelectedJointId] = useState<string>('butt-joint');

  const activeJoint: WeldingJoint = WELDING_JOINTS.find(j => j.id === selectedJointId) || WELDING_JOINTS[0];

  return (
    <section id="section-7-1-8" className="space-y-6">
      {/* Section Header */}
      <div className="bg-slate-850 rounded-xl p-5 border border-slate-750 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-400 font-mono text-xs font-bold border border-amber-500/30">
              SOP Clause 7.1.8
            </span>
            <span className="text-xs text-slate-400 font-medium">Structural Geometry &amp; Joint Fit-Up</span>
          </div>
          <span className="text-xs text-slate-500 font-mono">AWS D1.1 Figure 3.4 / ISO 9692-1</span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          Five Types of Arc Welding Basic Joints
        </h2>
        <p className="text-slate-300 text-sm mt-1 max-w-4xl">
          All welded assemblies in structural engineering, piping, and manufacturing are built upon five fundamental joint configurations: 
          <strong> Butt Joint, Tee Joint, Corner Joint, Lap Joint, and Edge Joint</strong>.
        </p>
      </div>

      {/* 5 Joint Selectors */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {WELDING_JOINTS.map((joint, idx) => {
          const isSelected = joint.id === selectedJointId;
          return (
            <button
              key={joint.id}
              onClick={() => setSelectedJointId(joint.id)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-amber-500/15 border-amber-500 text-white shadow-sm'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <div>
                <span className="text-[10px] font-mono text-amber-400 block mb-1">
                  Joint 0{idx + 1}
                </span>
                <span className="text-xs font-bold block leading-snug">
                  {joint.name}
                </span>
              </div>
              <div className="mt-2 text-[10px] text-slate-500 font-mono">
                {joint.thicknessRange}
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Joint Visualizer & Cross-Section Schematics */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Crosshair className="w-4 h-4 text-amber-400" />
              Technical Engineering Schematic: {activeJoint.name}
            </h3>
            <p className="text-xs text-slate-400">
              Geometry, bevel angles, root dimensions, and weld pass buildup.
            </p>
          </div>
          <span className="px-2.5 py-0.5 rounded text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700">
            {activeJoint.aka}
          </span>
        </div>

        {/* Dynamic Joint SVG Diagram */}
        <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 flex justify-center">
          <svg viewBox="0 0 680 300" className="w-full max-w-2xl h-auto select-none">
            {/* Common Gradients */}
            <defs>
              <linearGradient id="plate-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#475569" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>
              <linearGradient id="weld-deposit" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
            </defs>

            {/* 1. BUTT JOINT SCHEMATIC */}
            {selectedJointId === 'butt-joint' && (
              <g transform="translate(40, 40)">
                {/* Left Plate (Beveled) */}
                <path d="M 40 120 L 220 120 L 250 80 L 40 80 Z" fill="url(#plate-grad)" stroke="#94a3b8" strokeWidth="2" />
                {/* Right Plate (Beveled) */}
                <path d="M 270 80 L 300 120 L 480 120 L 480 80 Z" fill="url(#plate-grad)" stroke="#94a3b8" strokeWidth="2" />
                {/* Weld Deposit (Single V-Butt with root & cap) */}
                <path d="M 220 120 Q 260 132 300 120 L 270 80 Q 260 68 250 80 Z" fill="url(#weld-deposit)" stroke="#f59e0b" strokeWidth="1.5" />
                {/* Root face and gap lines */}
                <line x1="220" y1="120" x2="220" y2="128" stroke="#f59e0b" strokeWidth="2" />
                <line x1="300" y1="120" x2="300" y2="128" stroke="#f59e0b" strokeWidth="2" />
                {/* Dimension callouts */}
                <text x="245" y="150" fill="#f59e0b" fontSize="11" fontWeight="bold" fontFamily="monospace">Root Gap (2-3mm)</text>
                <line x1="240" y1="135" x2="280" y2="135" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="235" y="60" fill="#38bdf8" fontSize="11" fontWeight="bold" fontFamily="monospace">60° Included Angle</text>
                <path d="M 230 75 Q 260 65 290 75" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="50" y="70" fill="#94a3b8" fontSize="11">Plate Thickness (t)</text>
              </g>
            )}

            {/* 2. TEE JOINT SCHEMATIC */}
            {selectedJointId === 'tee-joint' && (
              <g transform="translate(100, 20)">
                {/* Horizontal Base Plate */}
                <rect x="40" y="180" width="400" height="40" fill="url(#plate-grad)" stroke="#94a3b8" strokeWidth="2" rx="2" />
                {/* Vertical Web Plate */}
                <rect x="220" y="30" width="40" height="150" fill="url(#plate-grad)" stroke="#94a3b8" strokeWidth="2" rx="2" />
                {/* Left Fillet Weld */}
                <path d="M 180 180 Q 185 145 220 145 L 220 180 Z" fill="url(#weld-deposit)" stroke="#f59e0b" strokeWidth="1.5" />
                {/* Right Fillet Weld */}
                <path d="M 260 145 Q 295 145 300 180 L 260 180 Z" fill="url(#weld-deposit)" stroke="#f59e0b" strokeWidth="1.5" />
                {/* Fillet Leg Callout */}
                <text x="110" y="165" fill="#f59e0b" fontSize="10" fontWeight="bold" fontFamily="monospace">Leg (z)</text>
                <text x="130" y="195" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace">Throat (a = 0.7z)</text>
                <text x="310" y="165" fill="#f59e0b" fontSize="10" fontWeight="bold" fontFamily="monospace">Double Fillet</text>
                <text x="210" y="20" fill="#cbd5e1" fontSize="11" fontWeight="bold">90° Angle</text>
              </g>
            )}

            {/* 3. CORNER JOINT SCHEMATIC */}
            {selectedJointId === 'corner-joint' && (
              <g transform="translate(140, 20)">
                {/* Horizontal Plate */}
                <rect x="80" y="160" width="220" height="40" fill="url(#plate-grad)" stroke="#94a3b8" strokeWidth="2" rx="2" />
                {/* Vertical Plate (Corner-aligned) */}
                <rect x="40" y="20" width="40" height="180" fill="url(#plate-grad)" stroke="#94a3b8" strokeWidth="2" rx="2" />
                {/* Outside Corner Groove Weld */}
                <path d="M 40 20 L 40 0 Q 60 10 80 0 L 80 20 Z" fill="url(#weld-deposit)" stroke="#f59e0b" strokeWidth="1.5" />
                {/* Inside Fillet Weld (Full Strength) */}
                <path d="M 80 160 Q 95 130 115 160 Z" fill="url(#weld-deposit)" stroke="#f59e0b" strokeWidth="1.5" />
                {/* Callout */}
                <text x="10" y="10" fill="#f59e0b" fontSize="11" fontWeight="bold" fontFamily="monospace">Outside Groove Weld</text>
                <text x="125" y="150" fill="#38bdf8" fontSize="11" fontWeight="bold" fontFamily="monospace">Inside Fillet Reinforcement</text>
                <text x="140" y="190" fill="#94a3b8" fontSize="11">Box Section Outer Corner</text>
              </g>
            )}

            {/* 4. LAP JOINT SCHEMATIC */}
            {selectedJointId === 'lap-joint' && (
              <g transform="translate(80, 50)">
                {/* Bottom Plate */}
                <rect x="60" y="110" width="340" height="35" fill="url(#plate-grad)" stroke="#94a3b8" strokeWidth="2" rx="2" />
                {/* Top Overlapping Plate */}
                <rect x="180" y="75" width="300" height="35" fill="url(#plate-grad)" stroke="#94a3b8" strokeWidth="2" rx="2" />
                {/* Left Fillet Weld (at bottom edge of top plate) */}
                <path d="M 145 110 Q 150 75 180 75 L 180 110 Z" fill="url(#weld-deposit)" stroke="#f59e0b" strokeWidth="1.5" />
                {/* Right Fillet Weld (at top edge of bottom plate) */}
                <path d="M 400 110 Q 435 110 440 145 L 400 145 Z" fill="url(#weld-deposit)" stroke="#f59e0b" strokeWidth="1.5" />
                {/* Overlap dimension */}
                <line x1="180" y1="55" x2="400" y2="55" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="230" y="45" fill="#f59e0b" fontSize="11" fontWeight="bold" fontFamily="monospace">Overlap ≥ 4t - 5t</text>
                <text x="70" y="65" fill="#38bdf8" fontSize="10" fontWeight="bold">Fillet Weld 1</text>
                <text x="410" y="170" fill="#38bdf8" fontSize="10" fontWeight="bold">Fillet Weld 2</text>
              </g>
            )}

            {/* 5. EDGE JOINT SCHEMATIC */}
            {selectedJointId === 'edge-joint' && (
              <g transform="translate(140, 20)">
                {/* Left Plate (Vertical) */}
                <rect x="150" y="60" width="30" height="180" fill="url(#plate-grad)" stroke="#94a3b8" strokeWidth="2" rx="2" />
                {/* Right Plate (Parallel) */}
                <rect x="180" y="60" width="30" height="180" fill="url(#plate-grad)" stroke="#94a3b8" strokeWidth="2" rx="2" />
                {/* Edge Melt Weld Bead across top */}
                <path d="M 150 60 Q 180 25 210 60 Z" fill="url(#weld-deposit)" stroke="#f59e0b" strokeWidth="2" />
                {/* Callouts */}
                <text x="130" y="20" fill="#f59e0b" fontSize="11" fontWeight="bold" fontFamily="monospace">Fused Edge Cap Bead</text>
                <text x="225" y="120" fill="#94a3b8" fontSize="10">Zero Gap Fit-up</text>
                <text x="225" y="140" fill="#38bdf8" fontSize="10">Sheet Metal Flanges / Tanks</text>
              </g>
            )}
          </svg>
        </div>

        {/* Joint Geometry Details & Variations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              Standard Geometric Variations:
            </h4>
            <ul className="space-y-1.5 text-slate-300">
              {activeJoint.variations.map((v, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Crosshair className="w-3.5 h-3.5" />
              Preparation &amp; Fit-Up Specifications:
            </h4>
            <p className="text-slate-300 leading-relaxed">
              {activeJoint.preparationRequirements}
            </p>
            <div className="pt-2 border-t border-slate-850 flex items-center justify-between text-slate-400 font-mono">
              <span>Thickness Range:</span>
              <span className="text-white font-bold">{activeJoint.thicknessRange}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
