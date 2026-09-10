import { useState, useId } from 'react';
import { Sliders, Volume2, AlertTriangle, CheckCircle2, TrendingUp, Gauge, Info } from 'lucide-react';
import { ELECTRODE_PARAMETERS } from '../data/weldingData';

export default function Section712Amperage() {
  const [selectedElectrodeCode, setSelectedElectrodeCode] = useState<string>('E7018');
  const [selectedDiameterIdx, setSelectedDiameterIdx] = useState<number>(1); // default 3.2mm (1/8")
  
  const currentElectrode = ELECTRODE_PARAMETERS.find(e => e.code === selectedElectrodeCode) || ELECTRODE_PARAMETERS[3];
  const currentDiameter = currentElectrode.diameters[selectedDiameterIdx] || currentElectrode.diameters[0];
  
  const [currentAmp, setCurrentAmp] = useState<number>(currentDiameter.optAmp);

  const rangeInputId = useId();

  // Determine current status
  const isTooLow = currentAmp < currentDiameter.ampMin;
  const isTooHigh = currentAmp > currentDiameter.ampMax;
  const isOptimal = !isTooLow && !isTooHigh;

  // Approximate heat input calculation: V ~ 24V, S ~ 120 mm/min, efficiency ~ 0.8
  const estimatedVolt = isTooHigh ? 27 : isTooLow ? 20 : 24;
  const travelSpeedMmMin = 120;
  const efficiency = 0.8;
  const heatInputKjMm = ((estimatedVolt * currentAmp * 60) / (travelSpeedMmMin * 1000) * efficiency).toFixed(2);

  // Status badges & feedback
  const statusInfo = isTooLow
    ? {
        label: 'Under-Current (Too Low)',
        color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
        sound: 'Weak, stuttering sputtering arc; electrode frequently "freezes" (sticks) to the base plate.',
        beadDescription: 'Excessively high crown, ropy bead, lack of root penetration, and dangerous "cold lap" where molten metal pools over cold steel without fusing.',
        undercutRisk: 'None (Cold Lap Hazard)',
        penetrationDepth: 'Shallow (Incomplete fusion)'
      }
    : isTooHigh
    ? {
        label: 'Over-Current (Too High)',
        color: 'text-red-400 bg-red-500/10 border-red-500/30',
        sound: 'Loud, violent roaring crackle with explosive snapping and continuous spray of molten spatter pellets.',
        beadDescription: 'Deep gouging undercut along both toes, flat or sunken bead, excessive spatter, and burn-through on plates <4mm. Flux coating overheats and disintegrates before rod finishes.',
        undercutRisk: 'Severe (Unacceptable under AWS D1.1)',
        penetrationDepth: 'Excessive / Burn-Through'
      }
    : {
        label: 'Optimal Operating Range',
        color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
        sound: 'Steady, rhythmic, crisp "frying bacon" sizzle with minimal arc flutter.',
        beadDescription: 'Uniform width, smooth ripple profile, clean 45° transition at weld toes, optimal penetration with zero undercut or cold lap.',
        undercutRisk: 'Zero (Complies with AWS D1.1)',
        penetrationDepth: 'Optimal Design Penetration'
      };

  return (
    <section id="section-7-1-2" className="space-y-6">
      {/* Clause Title */}
      <div className="bg-slate-850 rounded-xl p-5 border border-slate-750 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-400 font-mono text-xs font-bold border border-amber-500/30">
              SOP Clause 7.1.2
            </span>
            <span className="text-xs text-slate-400 font-medium">Welding Parameter Management</span>
          </div>
          <span className="text-xs text-slate-500 font-mono">AWS D1.1 Clause 5.3 / ASME IX QW-409</span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          Function of the Ampere Adjustment Control
        </h2>
        <p className="text-slate-300 text-sm mt-1 max-w-4xl">
          The ampere adjustment control regulates the volume of electrical current (Amperes) flowing through the 
          welding circuit. In constant-current (CC) SMAW power supplies, amperage directly dictates the heat energy input, 
          electrode burn-off rate, weld penetration depth, and puddle fluidity.
        </p>
      </div>

      {/* Main Interactive Ampere Dial & Bead Cross-Section Simulator */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-400" />
              Interactive Ampere Adjustment &amp; Bead Geometry Simulator
            </h3>
            <p className="text-xs text-slate-400">
              Change the electrode type, diameter, and dial in the current to observe real-time cross-section profile changes.
            </p>
          </div>

          {/* Electrode Selector */}
          <div className="flex flex-wrap items-center gap-2">
            {ELECTRODE_PARAMETERS.map((elec) => (
              <button
                key={elec.code}
                onClick={() => {
                  setSelectedElectrodeCode(elec.code);
                  setSelectedDiameterIdx(0);
                  setCurrentAmp(elec.diameters[0].optAmp);
                }}
                className={`px-3 py-1.5 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                  selectedElectrodeCode === elec.code
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-750 hover:text-white border border-slate-700'
                }`}
              >
                {elec.code}
              </button>
            ))}
          </div>
        </div>

        {/* Diameter Selector & Dial Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Controls Column */}
          <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Core Wire Diameter:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {currentElectrode.diameters.map((dia, idx) => (
                  <button
                    key={dia.sizeMm}
                    onClick={() => {
                      setSelectedDiameterIdx(idx);
                      setCurrentAmp(dia.optAmp);
                    }}
                    className={`p-2 rounded text-center transition-all cursor-pointer border ${
                      selectedDiameterIdx === idx
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 font-bold'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-850'
                    }`}
                  >
                    <div className="text-xs font-mono">{dia.sizeMm} mm</div>
                    <div className="text-[10px] text-slate-500">{dia.sizeInch}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Rotary / Slider Control */}
            <div className="space-y-2 pt-2 border-t border-slate-850">
              <div className="flex items-center justify-between">
                <label htmlFor={rangeInputId} className="text-xs font-semibold text-slate-300">
                  Ampere Setting:
                </label>
                <div className="text-lg font-mono font-bold text-amber-400 flex items-baseline gap-1">
                  <span>{currentAmp}</span>
                  <span className="text-xs text-slate-400">A</span>
                </div>
              </div>

              {/* Slider */}
              <input
                id={rangeInputId}
                type="range"
                min={Math.max(20, currentDiameter.ampMin - 40)}
                max={currentDiameter.ampMax + 50}
                value={currentAmp}
                onChange={(e) => setCurrentAmp(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />

              {/* Min - Optimal - Max Range Indicator */}
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>Min: {currentDiameter.ampMin}A</span>
                <span className="text-emerald-400 font-bold">Optimal: {currentDiameter.optAmp}A</span>
                <span>Max: {currentDiameter.ampMax}A</span>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setCurrentAmp(currentDiameter.ampMin - 25)}
                className="flex-1 py-1 px-2 rounded bg-amber-950/40 text-amber-300 hover:bg-amber-900/50 text-[11px] font-medium border border-amber-800/40 text-center"
              >
                Force Too Low
              </button>
              <button
                onClick={() => setCurrentAmp(currentDiameter.optAmp)}
                className="flex-1 py-1 px-2 rounded bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/50 text-[11px] font-medium border border-emerald-800/40 text-center"
              >
                Set Optimal
              </button>
              <button
                onClick={() => setCurrentAmp(currentDiameter.ampMax + 35)}
                className="flex-1 py-1 px-2 rounded bg-red-950/40 text-red-300 hover:bg-red-900/50 text-[11px] font-medium border border-red-800/40 text-center"
              >
                Force Too High
              </button>
            </div>

            {/* Live Calculated Stats */}
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800 space-y-1 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Operating Voltage:</span>
                <span className="font-mono text-slate-200">{estimatedVolt} V</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Calculated Heat Input:</span>
                <span className="font-mono text-amber-400">{heatInputKjMm} kJ/mm</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Penetration Class:</span>
                <span className="font-mono text-slate-200">{statusInfo.penetrationDepth}</span>
              </div>
            </div>
          </div>

          {/* Visual Bead Cross-Section Column */}
          <div className="lg:col-span-2 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-300">
                  Transverse Weld Cross-Section &amp; Defect Simulation:
                </span>
                <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold border ${statusInfo.color}`}>
                  {statusInfo.label}
                </span>
              </div>

              {/* Dynamic SVG Bead Profile */}
              <div className="bg-slate-900/90 rounded-lg p-3 border border-slate-800 flex justify-center">
                <svg viewBox="0 0 460 200" className="w-full max-w-md h-auto select-none">
                  {/* Base Metal Plates */}
                  <rect x="30" y="90" width="180" height="70" fill="#334155" stroke="#475569" strokeWidth="2" />
                  <rect x="250" y="90" width="180" height="70" fill="#334155" stroke="#475569" strokeWidth="2" />
                  
                  {/* Bevel Chamfers */}
                  <polygon points="180,90 210,90 210,130 180,90" fill="#1e293b" />
                  <polygon points="250,90 280,90 250,130 250,90" fill="#1e293b" />

                  {/* Heat Affected Zone (HAZ) */}
                  {isTooLow && (
                    <path d="M 195 90 Q 230 115 265 90 Z" fill="#b45309" opacity="0.4" />
                  )}
                  {isOptimal && (
                    <path d="M 175 90 Q 230 150 285 90 Z" fill="#ef4444" opacity="0.35" />
                  )}
                  {isTooHigh && (
                    <path d="M 160 90 Q 230 175 300 90 Z" fill="#dc2626" opacity="0.6" />
                  )}

                  {/* Root Penetration Depth & Bead Body */}
                  {isTooLow && (
                    <g>
                      {/* Shallow penetration */}
                      <path d="M 205 90 Q 230 105 255 90 Z" fill="#ea580c" />
                      {/* High convex ropy crown with cold lap at toes */}
                      <path
                        d="M 205 90 C 195 60, 265 60, 255 90 C 262 92, 265 90, 255 90 Z"
                        fill="#64748b"
                        stroke="#94a3b8"
                        strokeWidth="2"
                      />
                      {/* Cold lap indicator arrows */}
                      <path d="M 195 82 L 205 88" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrow)" />
                      <path d="M 265 82 L 255 88" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrow)" />
                      <text x="130" y="75" fill="#f59e0b" fontSize="10" fontWeight="bold">
                        Cold Lap (No fusion)
                      </text>
                      <text x="270" y="75" fill="#f59e0b" fontSize="10" fontWeight="bold">
                        Lack of Penetration
                      </text>
                    </g>
                  )}

                  {isOptimal && (
                    <g>
                      {/* Full smooth penetration */}
                      <path d="M 185 90 Q 230 140 275 90 Z" fill="#ea580c" />
                      {/* Smooth convex crown with 45 deg smooth toe wash */}
                      <path
                        d="M 185 90 Q 230 55 275 90 Z"
                        fill="#64748b"
                        stroke="#10b981"
                        strokeWidth="2"
                      />
                      {/* Ripples */}
                      <path d="M 200 78 Q 230 68 260 78" stroke="#cbd5e1" strokeWidth="1.5" fill="none" />
                      <path d="M 208 86 Q 230 76 252 86" stroke="#cbd5e1" strokeWidth="1.5" fill="none" />
                      <text x="180" y="45" fill="#10b981" fontSize="11" fontWeight="bold">
                        ✓ Optimal Bead Profile &amp; Fusion
                      </text>
                    </g>
                  )}

                  {isTooHigh && (
                    <g>
                      {/* Severe Gouging Undercut at toes */}
                      <path d="M 180 90 Q 185 102 192 90 Z" fill="#0f172a" />
                      <path d="M 268 90 Q 275 102 280 90 Z" fill="#0f172a" />
                      {/* Excessive penetration */}
                      <path d="M 192 90 Q 230 165 268 90 Z" fill="#b91c1c" />
                      {/* Flat or sunken bead crown */}
                      <path
                        d="M 192 90 Q 230 80 268 90 Z"
                        fill="#64748b"
                        stroke="#ef4444"
                        strokeWidth="2"
                      />
                      {/* Spatter droplets */}
                      <circle cx="150" cy="85" r="2.5" fill="#ef4444" />
                      <circle cx="165" cy="70" r="3" fill="#ef4444" />
                      <circle cx="310" cy="82" r="3.5" fill="#ef4444" />
                      <circle cx="330" cy="65" r="2" fill="#ef4444" />
                      {/* Undercut callout */}
                      <text x="100" y="60" fill="#ef4444" fontSize="10" fontWeight="bold">
                        Undercut Notch!
                      </text>
                      <line x1="150" y1="65" x2="182" y2="92" stroke="#ef4444" strokeWidth="1.5" />
                      <text x="285" y="60" fill="#ef4444" fontSize="10" fontWeight="bold">
                        Heavy Spatter
                      </text>
                    </g>
                  )}

                  {/* Center Root Gap Dimension */}
                  <text x="210" y="175" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                    Root Opening
                  </text>
                </svg>
              </div>
            </div>

            {/* Description & Sound Box */}
            <div className="mt-3 space-y-2 text-xs">
              <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                <span className="text-slate-400 font-semibold block mb-1">Visual Appearance &amp; Defect Analysis:</span>
                <p className="text-slate-200">{statusInfo.beadDescription}</p>
              </div>
              <div className="bg-slate-900 p-2.5 rounded border border-slate-800 flex items-start gap-2">
                <Volume2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 font-semibold block">Acoustic Signature (Arc Sound):</span>
                  <p className="text-slate-200">{statusInfo.sound}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Engineering Functions of Ampere Control Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-850 p-4 rounded-xl border border-slate-750">
          <div className="flex items-center gap-2 text-amber-400 mb-2 font-bold text-sm">
            <Gauge className="w-4 h-4" />
            1. Penetration Depth Control
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            The depth of base metal fusion is directly proportional to the square of current ($I^2$). 
            Higher amperage concentrates greater plasma energy onto the workpiece, melting the root 
            faster and deeper to achieve 100% full-penetration joints.
          </p>
        </div>

        <div className="bg-slate-850 p-4 rounded-xl border border-slate-750">
          <div className="flex items-center gap-2 text-cyan-400 mb-2 font-bold text-sm">
            <TrendingUp className="w-4 h-4" />
            2. Electrode Burn-Off Rate
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Current flow produces internal resistive Joule heating ($Q = I^2 R t$) inside the core wire. 
            Increasing amperage accelerates the melt-off rate (grams of deposited metal per minute), 
            demanding a faster, steady downward feed travel rate from the welder.
          </p>
        </div>

        <div className="bg-slate-850 p-4 rounded-xl border border-slate-750">
          <div className="flex items-center gap-2 text-emerald-400 mb-2 font-bold text-sm">
            <Info className="w-4 h-4" />
            3. Constant Current (CC) Arc Law
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            SMAW machines utilize a "drooping" CC volt-ampere characteristic curve. When the welder's hand 
            sligthly varies arc length, the arc voltage changes significantly while the amperage remains 
            virtually constant, safeguarding stable heat input.
          </p>
        </div>
      </div>
    </section>
  );
}
