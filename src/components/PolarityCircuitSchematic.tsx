import { useState } from 'react';
import { Cpu, Zap, AlertTriangle } from 'lucide-react';
import { POLARITY_MODES } from '../data/weldingData';
import { PolarityMode } from '../types';

export default function PolarityCircuitSchematic() {
  const [activePolarity, setActivePolarity] = useState<'DCEN' | 'DCEP' | 'AC'>('DCEP');
  const currentMode: PolarityMode = POLARITY_MODES[activePolarity];

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-amber-400" />
            Machine Terminal &amp; Lead Cable Connection Wiring
          </h3>
          <p className="text-xs text-slate-400">
            Verify cable terminal connections (Electrode Stinger vs. Work Ground Clamp) to prevent accidental polarity inversion in the field.
          </p>
        </div>

        {/* Polarity Selector Buttons */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-1.5 w-full sm:w-auto">
          {(['DCEN', 'DCEP', 'AC'] as const).map((pol) => {
            const isSelected = activePolarity === pol;
            return (
              <button
                key={pol}
                id={`btn-polarity-${pol.toLowerCase()}`}
                onClick={() => setActivePolarity(pol)}
                className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0 flex-1 sm:flex-initial justify-center ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-750 border border-slate-700'
                }`}
              >
                <Zap className="w-3 h-3 shrink-0" />
                <span>{pol}</span>
                <span className="hidden sm:inline">{pol === 'DCEN' ? ' (Straight)' : pol === 'DCEP' ? ' (Reverse)' : ' (Alternating)'}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Schematic & Heat Balance Display */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Circuit Visual Canvas */}
        <div className="lg:col-span-2 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-300">
              Electrical Circuit &amp; Ionization Flow:
            </span>
            <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {currentMode.name}
            </span>
          </div>

          {/* SVG Circuit Schematic */}
          <div className="bg-slate-900 rounded-lg p-3 border border-slate-800/80 flex justify-center">
            <svg viewBox="0 0 540 260" className="w-full max-w-lg h-auto select-none">
              {/* Machine Terminals */}
              <rect x="40" y="70" width="100" height="120" fill="#1e293b" stroke="#475569" strokeWidth="2" rx="6" />
              <text x="50" y="95" fill="#f8fafc" fontSize="10" fontWeight="bold" fontFamily="monospace">POWER SOURCE</text>

              {/* Positive and Negative Studs */}
              {activePolarity === 'DCEN' && (
                <>
                  {/* Top is NEG (-), Bottom is POS (+) */}
                  <circle cx="110" cy="115" r="12" fill="#1d4ed8" stroke="#60a5fa" strokeWidth="2" />
                  <text x="106" y="120" fill="#ffffff" fontSize="16" fontWeight="bold">-</text>
                  <text x="50" y="120" fill="#60a5fa" fontSize="9" fontWeight="bold">NEG (-)</text>

                  <circle cx="110" cy="155" r="12" fill="#b91c1c" stroke="#f87171" strokeWidth="2" />
                  <text x="105" y="160" fill="#ffffff" fontSize="16" fontWeight="bold">+</text>
                  <text x="50" y="160" fill="#f87171" fontSize="9" fontWeight="bold">POS (+)</text>
                </>
              )}

              {activePolarity === 'DCEP' && (
                <>
                  {/* Top is POS (+), Bottom is NEG (-) */}
                  <circle cx="110" cy="115" r="12" fill="#b91c1c" stroke="#f87171" strokeWidth="2" />
                  <text x="105" y="120" fill="#ffffff" fontSize="16" fontWeight="bold">+</text>
                  <text x="50" y="120" fill="#f87171" fontSize="9" fontWeight="bold">POS (+)</text>

                  <circle cx="110" cy="155" r="12" fill="#1d4ed8" stroke="#60a5fa" strokeWidth="2" />
                  <text x="106" y="160" fill="#ffffff" fontSize="16" fontWeight="bold">-</text>
                  <text x="50" y="160" fill="#60a5fa" fontSize="9" fontWeight="bold">NEG (-)</text>
                </>
              )}

              {activePolarity === 'AC' && (
                <>
                  <circle cx="110" cy="115" r="12" fill="#7c3aed" stroke="#c084fc" strokeWidth="2" />
                  <text x="104" y="119" fill="#ffffff" fontSize="14" fontWeight="bold">~</text>
                  <text x="50" y="120" fill="#c084fc" fontSize="9" fontWeight="bold">AC (L1)</text>

                  <circle cx="110" cy="155" r="12" fill="#7c3aed" stroke="#c084fc" strokeWidth="2" />
                  <text x="104" y="159" fill="#ffffff" fontSize="14" fontWeight="bold">~</text>
                  <text x="50" y="160" fill="#c084fc" fontSize="9" fontWeight="bold">AC (L2)</text>
                </>
              )}

              {/* Electrode Cable (from Top stud to Stinger) */}
              <path
                d="M 122 115 C 220 115, 250 50, 340 50"
                fill="none"
                stroke={activePolarity === 'DCEP' ? '#ef4444' : activePolarity === 'DCEN' ? '#3b82f6' : '#a855f7'}
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* Work Return Cable (from Bottom stud to Workpiece) */}
              <path
                d="M 122 155 C 220 155, 250 220, 350 220"
                fill="none"
                stroke={activePolarity === 'DCEN' ? '#ef4444' : activePolarity === 'DCEP' ? '#3b82f6' : '#a855f7'}
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* Electrode Holder & Electrode */}
              <g transform="translate(340, 40) rotate(15)">
                <rect x="0" y="0" width="40" height="14" fill="#334155" stroke="#94a3b8" rx="2" />
                <rect x="40" y="2" width="10" height="10" fill="#b45309" />
                {/* Rod */}
                <rect x="50" y="5" width="70" height="4" fill="#a16207" />
                <rect x="50" y="6" width="70" height="2" fill="#cbd5e1" />
              </g>

              {/* Arc Plasma Flare */}
              <circle cx="455" cy="130" r="14" fill="#38bdf8" opacity="0.6" />
              <circle cx="455" cy="130" r="7" fill="#ffffff" />

              {/* Workpiece Steel Plate */}
              <rect x="370" y="140" width="150" height="20" fill="#334155" stroke="#64748b" strokeWidth="2" rx="2" />
              <text x="400" y="154" fill="#f8fafc" fontSize="10" fontWeight="bold">WORKPIECE</text>

              {/* Ground Clamp Attached */}
              <rect x="470" y="158" width="25" height="18" fill="#ca8a04" rx="2" />
              <line x1="478" y1="176" x2="350" y2="220" stroke="#64748b" strokeWidth="2" />

              {/* Electron Direction Stream */}
              {activePolarity === 'DCEN' && (
                <g>
                  <path d="M 440 90 L 450 115" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="4 2" />
                  <polygon points="450,118 444,110 454,112" fill="#38bdf8" />
                  <text x="310" y="95" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace">
                    Electrons stream ↓ (Rod to Work)
                  </text>
                </g>
              )}
              {activePolarity === 'DCEP' && (
                <g>
                  <path d="M 465 115 L 455 85" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="4 2" />
                  <polygon points="455,82 461,90 451,88" fill="#f59e0b" />
                  <text x="310" y="95" fill="#f59e0b" fontSize="10" fontWeight="bold" fontFamily="monospace">
                    Electrons stream ↑ (Work to Rod)
                  </text>
                </g>
              )}
              {activePolarity === 'AC' && (
                <g>
                  <text x="310" y="95" fill="#c084fc" fontSize="10" fontWeight="bold" fontFamily="monospace">
                    Electrons oscillate ⇅ (50/60 Hz)
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Electron Flow Text */}
          <p className="text-xs text-slate-300 mt-2 bg-slate-900 p-2.5 rounded border border-slate-800">
            <strong className="text-amber-400">Electron Flow Physics: </strong>
            {currentMode.electronFlow}
          </p>
        </div>

        {/* Thermal Distribution & Penetration Gauge */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
              Arc Thermal Heat Distribution:
            </h4>

            {/* Workpiece Heat Bar */}
            <div className="space-y-1 mb-3">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Workpiece (Base Metal):</span>
                <span className="font-mono font-bold text-amber-400">{currentMode.heatDistribution.workpiece}% Heat</span>
              </div>
              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${currentMode.heatDistribution.workpiece}%` }}
                />
              </div>
            </div>

            {/* Electrode Heat Bar */}
            <div className="space-y-1 mb-4">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Consumable Electrode Rod:</span>
                <span className="font-mono font-bold text-cyan-400">{currentMode.heatDistribution.electrode}% Heat</span>
              </div>
              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${currentMode.heatDistribution.electrode}%` }}
                />
              </div>
            </div>

            {/* Bead Geometry Specs */}
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs space-y-1.5 font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Penetration:</span>
                <span className="font-bold text-white">{currentMode.beadGeometry.penetration}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Bead Width:</span>
                <span className="font-bold text-white">{currentMode.beadGeometry.width}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Crown Profile:</span>
                <span className="font-bold text-white">{currentMode.beadGeometry.buildup}</span>
              </div>
            </div>
          </div>

          {/* Suitable Electrodes Pill Box */}
          <div className="pt-2 border-t border-slate-850">
            <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
              Recommended Electrodes for this Polarity:
            </span>
            <div className="flex flex-wrap gap-1">
              {currentMode.suitableElectrodes.map((elec, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-amber-300">
                  {elec}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* The Engineering Phenomenon of Arc Blow */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Specialized SOP Guidance: Magnetic "Arc Blow" Physics &amp; Remediation
          </h4>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          <strong>Arc Blow</strong> occurs exclusively with direct current (DC) welding. When heavy direct current 
          flows through the plate, it creates circular concentric magnetic flux lines. Near plate edges, corners, or 
          deep grooves, this magnetic flux becomes heavily crowded on one side, violently repelling the arc column 
          away from the intended weld path (forward or backward arc blow).
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px] text-slate-300">
          <div className="bg-slate-900 p-2 rounded border border-slate-850">
            <strong className="text-amber-400 block">1. Switch to AC Power:</strong>
            Alternating current continuously reverses magnetic fields at 50/60 Hz, completely neutralizing magnetic deflection.
          </div>
          <div className="bg-slate-900 p-2 rounded border border-slate-850">
            <strong className="text-amber-400 block">2. Relocate Ground Clamp:</strong>
            Move the work clamp toward the direction of arc deflection or attach dual ground clamps to balance flux distribution.
          </div>
          <div className="bg-slate-900 p-2 rounded border border-slate-850">
            <strong className="text-amber-400 block">3. Adjust Welding Technique:</strong>
            Reduce amperage, hold a significantly shorter arc length, and angle the electrode back toward the puddle.
          </div>
        </div>
      </div>
    </div>
  );
}
