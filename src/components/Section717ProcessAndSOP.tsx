import { useState } from 'react';
import { Layers, CheckSquare, ShieldCheck, Award, ShieldAlert } from 'lucide-react';
import { PROCESS_LABELS, PRE_WELD_SOP_STEPS } from '../data/weldingData';
import { ProcessLabel } from '../types';

interface Section717Props {
  onOpenSafety?: () => void;
}

export default function Section717ProcessAndSOP({ onOpenSafety }: Section717Props) {
  const [selectedLabelId, setSelectedLabelId] = useState<string>('arc-stream');
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({
    'sop-1': true,
    'sop-2': true
  });

  const activeLabel: ProcessLabel = PROCESS_LABELS.find(l => l.id === selectedLabelId) || PROCESS_LABELS[3];

  const totalSteps = PRE_WELD_SOP_STEPS.length;
  const completedSteps = Object.values(checkedSteps).filter(Boolean).length;
  const isFullyCompliant = completedSteps === totalSteps;

  const toggleStep = (id: string) => {
    setCheckedSteps(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSignOffAll = () => {
    const allChecked = PRE_WELD_SOP_STEPS.reduce((acc, s) => ({ ...acc, [s.id]: true }), {});
    setCheckedSteps(allChecked);
  };

  return (
    <section id="section-7-1-7" className="space-y-8">
      {/* Section Header */}
      <div className="bg-slate-850 rounded-xl p-5 border border-slate-750 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-400 font-mono text-xs font-bold border border-amber-500/30">
              SOP Clause 7.1.7
            </span>
            <span className="text-xs text-slate-400 font-medium">Process Anatomy &amp; Pre-Welding SOP</span>
          </div>
          <span className="text-xs text-slate-500 font-mono">AWS D1.1 / OSHA 1910.252 / ISO 4063</span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          Label of the Arc Welding Process &amp; Pre-Welding Operating Procedures
        </h2>
        <div className="flex flex-wrap items-center justify-between gap-3 mt-3 pt-3 border-t border-slate-750">
          <p className="text-slate-300 text-sm max-w-3xl">
            Complete structural breakdown of the SMAW process cross-section with numbered identification, 
            paired with the mandatory five-phase Standard Operating Procedure (SOP) to be performed prior to striking an electric arc.
          </p>
          {onOpenSafety && (
            <button
              onClick={onOpenSafety}
              className="px-3.5 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm shrink-0"
            >
              <ShieldAlert className="w-4 h-4 text-red-400 animate-pulse" />
              <span>Open PPE &amp; Hazard Protocols</span>
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PART A: FULL LABELED CROSS-SECTION OF THE ARC WELDING PROCESS             */}
      {/* ========================================================================= */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              Part A: Labeled Architectural Diagram of the SMAW Process (10 Key Components)
            </h3>
            <p className="text-xs text-slate-400">
              Hover or click any numbered badge to highlight its metallurgical role, temperatures, and SOP inspection points.
            </p>
          </div>
          <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
            Selected: #{activeLabel.number} {activeLabel.label}
          </span>
        </div>

        {/* Interactive Diagram SVG */}
        <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 flex justify-center">
          <svg viewBox="0 0 760 360" className="w-full max-w-3xl h-auto select-none">
            <defs>
              <linearGradient id="slag-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#78350f" />
                <stop offset="100%" stopColor="#451a03" />
              </linearGradient>
              <radialGradient id="arc-glow-grad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="40%" stopColor="#67e8f9" />
                <stop offset="80%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#1e293b" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Base Metal Workpiece (9) */}
            <rect x="50" y="210" width="660" height="90" fill="#334155" stroke="#475569" strokeWidth="2" rx="3" />
            <text x="70" y="275" fill="#94a3b8" fontSize="12" fontWeight="bold">9. Base Metal (Workpiece)</text>

            {/* Heat Affected Zone (10) */}
            <path
              d="M 210 210 Q 360 285 500 210 Z"
              fill="#991b1b"
              opacity="0.5"
              stroke="#ef4444"
              strokeWidth="1.5"
              strokeDasharray="4 2"
            />

            {/* Penetration Depth & Fusion Boundary (8) */}
            <path
              d="M 235 210 Q 360 265 480 210 Z"
              fill="#c2410c"
              stroke="#ea580c"
              strokeWidth="2"
            />

            {/* Molten Weld Puddle (5) */}
            <path
              d="M 260 210 Q 360 250 460 210 Q 410 200 360 200 Q 310 200 260 210 Z"
              fill="#ea580c"
            />
            <ellipse cx="360" cy="212" rx="45" ry="12" fill="#fed7aa" opacity="0.9" />

            {/* Solidified Weld Bead (7) with Ripples */}
            <path
              d="M 450 210 Q 560 200 660 210 L 660 218 L 450 218 Z"
              fill="#64748b"
              stroke="#94a3b8"
              strokeWidth="1.5"
            />
            {[480, 510, 540, 570, 600, 630].map((rx, idx) => (
              <path
                key={idx}
                d={`M ${rx} 204 Q ${rx + 14} 210 ${rx} 216`}
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            ))}

            {/* Solidified Slag Blanket (6) */}
            <path
              d="M 440 203 Q 550 195 650 203 L 646 207 Q 550 199 445 207 Z"
              fill="url(#slag-grad)"
              stroke="#b45309"
              strokeWidth="1.5"
            />

            {/* Gas Shielding Envelope (3) */}
            <ellipse cx="360" cy="160" rx="140" ry="75" fill="#38bdf8" opacity="0.15" />
            <path d="M 260 140 Q 230 160 260 190" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" fill="none" />

            {/* Consumable Coated Electrode (1 & 2) */}
            <g transform="rotate(-25 360 80)">
              {/* Flux Coating (2) */}
              <rect x="345" y="10" width="30" height="150" fill="#713f12" stroke="#a16207" strokeWidth="1.5" rx="3" />
              {/* Core Wire (1) */}
              <rect x="353" y="0" width="14" height="170" fill="#94a3b8" stroke="#e2e8f0" strokeWidth="1" />
              {/* Flux Cup Burnback */}
              <path d="M 345 150 L 353 162 L 367 162 L 375 150 Z" fill="#b45309" />
              {/* Metal Droplet */}
              <circle cx="360" cy="164" r="5" fill="#fef08a" />
            </g>

            {/* Arc Plasma Column (4) */}
            <ellipse cx="360" cy="180" rx="35" ry="25" fill="url(#arc-glow-grad)" />
            <path d="M 345 170 Q 330 190 335 205 Q 360 215 385 205 Q 390 190 375 170 Z" fill="#ffffff" opacity="0.8" />
            {/* Spatter pellets */}
            <circle cx="310" cy="185" r="2" fill="#f59e0b" />
            <circle cx="415" cy="175" r="2" fill="#f59e0b" />

            {/* Travel Direction Arrow */}
            <path d="M 440 90 L 520 90" stroke="#10b981" strokeWidth="2.5" />
            <polygon points="520,86 528,90 520,94" fill="#10b981" />
            <text x="440" y="80" fill="#10b981" fontSize="11" fontWeight="bold">Travel Direction →</text>

            {/* Numbered Interactive Hotspot Badges */}
            {[
              { id: 'core-wire', num: 1, cx: 310, cy: 45 },
              { id: 'flux-coating', num: 2, cx: 255, cy: 85 },
              { id: 'gas-shield', num: 3, cx: 240, cy: 150 },
              { id: 'arc-stream', num: 4, cx: 360, cy: 180 },
              { id: 'molten-pool', num: 5, cx: 360, cy: 215 },
              { id: 'slag-blanket', num: 6, cx: 530, cy: 195 },
              { id: 'weld-bead', num: 7, cx: 560, cy: 220 },
              { id: 'penetration-depth', num: 8, cx: 360, cy: 245 },
              { id: 'base-metal', num: 9, cx: 160, cy: 250 },
              { id: 'haz-zone', num: 10, cx: 440, cy: 250 }
            ].map((pin) => {
              const isSelected = selectedLabelId === pin.id;
              return (
                <g
                  key={pin.id}
                  className="cursor-pointer transition-all"
                  onClick={() => setSelectedLabelId(pin.id)}
                >
                  <circle
                    cx={pin.cx}
                    cy={pin.cy}
                    r={isSelected ? 14 : 11}
                    fill={isSelected ? '#f59e0b' : '#0f172a'}
                    stroke={isSelected ? '#ffffff' : '#f59e0b'}
                    strokeWidth="2"
                  />
                  <text
                    x={pin.cx}
                    y={pin.cy + 4}
                    textAnchor="middle"
                    fill={isSelected ? '#0f172a' : '#f8fafc'}
                    fontSize={isSelected ? '12' : '10'}
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    {pin.num}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected Label Details Card */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-850 pb-2.5">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-mono font-bold text-sm flex items-center justify-center">
                {activeLabel.number}
              </span>
              <h4 className="text-base font-bold text-white">
                {activeLabel.label}
              </h4>
            </div>
            <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
              Thermal Profile: {activeLabel.temperatureOrMaterial}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
              <span className="font-bold text-amber-400 block">Technical Role in the Arc Process:</span>
              <p className="text-slate-300 leading-relaxed">{activeLabel.technicalRole}</p>
            </div>
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
              <span className="font-bold text-emerald-400 block">SOP Standard Operating Mandatory Rule:</span>
              <p className="text-slate-300 leading-relaxed">{activeLabel.sopCrucialPoint}</p>
            </div>
          </div>

          {/* Quick Hotspot Selectors */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {PROCESS_LABELS.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedLabelId(item.id)}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-all cursor-pointer ${
                  selectedLabelId === item.id
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-850 border border-slate-800'
                }`}
              >
                #{item.number} {item.label.split(' (')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PART B: PRE-WELDING STANDARD OPERATING PROCEDURE (SOP) CHECKLIST          */}
      {/* ========================================================================= */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Part B: Steps to be Taken Before Starting an Arc Welding (Pre-Welding SOP)
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Execute each mandatory stage in chronological order to verify compliance with OSHA, AWS D1.1, and ISO safety standards.
            </p>
          </div>

          {/* Compliance Progress & Sign-Off */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-xs font-mono text-slate-400">Compliance Status:</span>
              <div className="text-xs font-bold font-mono">
                {isFullyCompliant ? (
                  <span className="text-emerald-400 flex items-center gap-1 justify-end">
                    <ShieldCheck className="w-3.5 h-3.5" /> 100% PRE-WELD CLEARED
                  </span>
                ) : (
                  <span className="text-amber-400">{completedSteps} of {totalSteps} Completed</span>
                )}
              </div>
            </div>

            <button
              onClick={handleSignOffAll}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
            >
              Sign-Off All 5 Steps
            </button>
          </div>
        </div>

        {/* Step-by-Step SOP Accordions */}
        <div className="space-y-3">
          {PRE_WELD_SOP_STEPS.map((step) => {
            const isChecked = !!checkedSteps[step.id];
            return (
              <div
                key={step.id}
                className={`p-4 rounded-xl border transition-all ${
                  isChecked
                    ? 'bg-slate-950/80 border-emerald-950/60'
                    : 'bg-slate-950 border-slate-800'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleStep(step.id)}
                      className={`w-6 h-6 rounded flex items-center justify-center transition-colors mt-0.5 cursor-pointer border ${
                        isChecked
                          ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                          : 'bg-slate-900 border-slate-700 text-transparent hover:border-slate-500'
                      }`}
                    >
                      <CheckSquare className="w-4 h-4" />
                    </button>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono font-bold text-amber-400">
                          Step 0{step.stepNumber}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                          Phase: {step.phase}
                        </span>
                        <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
                          Ref: {step.standardClause}
                        </span>
                      </div>
                      <h4 className={`text-sm font-bold ${isChecked ? 'text-slate-200' : 'text-white'}`}>
                        {step.title}
                      </h4>
                      <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                        {step.detailedProcedure}
                      </p>

                      {/* Hazards Avoided & Acceptance */}
                      <div className="mt-3 pt-3 border-t border-slate-850 flex flex-wrap items-center justify-between gap-3 text-[11px]">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-slate-400 font-semibold">Hazards Prevented:</span>
                          {step.hazardsAvoided.map((h, i) => (
                            <span key={i} className="px-2 py-0.5 rounded bg-red-950/30 text-red-300 border border-red-900/40">
                              {h}
                            </span>
                          ))}
                        </div>
                        <div className="text-slate-300">
                          <strong className="text-emerald-400 font-mono">Acceptance: </strong>
                          {step.acceptanceCriteria}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pre-Welding Sign-off Certification Box */}
        {isFullyCompliant && (
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-emerald-950/60 border border-emerald-500/40 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-emerald-400 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-white">
                  SOP 7.1.7 Pre-Welding Verification Certified
                </h4>
                <p className="text-xs text-emerald-300">
                  All 5 mandatory pre-welding safety, equipment, joint fit-up, and machine calibration steps are completed. Ready to strike arc on production assembly.
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded bg-emerald-500 text-slate-950 font-mono font-bold text-xs">
              COMPLIANT
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
