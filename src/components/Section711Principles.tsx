import { useState } from 'react';
import { Zap, Flame, Shield, Activity, Layers, Thermometer, Compass, CheckCircle2 } from 'lucide-react';

export default function Section711Principles() {
  const [activeLayer, setActiveLayer] = useState<'all' | 'plasma' | 'shield' | 'heat' | 'slag'>('all');

  return (
    <section id="section-7-1-1" className="space-y-6">
      {/* Section Header */}
      <div className="bg-slate-850 rounded-xl p-5 border border-slate-750 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-400 font-mono text-xs font-bold border border-amber-500/30">
              SOP Clause 7.1.1
            </span>
            <span className="text-xs text-slate-400 font-medium">Standard Operating Principles</span>
          </div>
          <span className="text-xs text-slate-500 font-mono">AWS D1.1 / ISO 4063 Process 111</span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          Basic Principles of Arc Welding (SMAW / MMAW)
        </h2>
        <p className="text-slate-300 text-sm mt-1 max-w-4xl">
          Shielded Metal Arc Welding (SMAW), commonly termed manual metal arc welding (MMAW) or stick welding, 
          is a fusion welding process that harnesses an intense electric arc struck between a consumable flux-covered 
          electrode and the workpiece to achieve metallurgical coalescence.
        </p>
      </div>

      {/* Interactive Arc Physics Visualizer */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              Interactive Arc Column & Thermal Physics Diagram
            </h3>
            <p className="text-xs text-slate-400">
              Select physics visualization filters to isolate key metallurgical phenomena occurring within the arc zone.
            </p>
          </div>

          {/* Layer Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
            {[
              { id: 'all', label: 'Full Process', icon: Layers },
              { id: 'plasma', label: 'Plasma Column (3500°-6000°C)', icon: Zap },
              { id: 'shield', label: 'Flux Gas Envelope', icon: Shield },
              { id: 'heat', label: 'Thermal & HAZ Zones', icon: Thermometer },
              { id: 'slag', label: 'Slag Solidification', icon: Activity }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveLayer(tab.id as any)}
                  className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activeLayer === tab.id
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* SVG Diagram Canvas */}
        <div className="bg-slate-950 rounded-lg p-4 border border-slate-800/80 flex flex-col items-center">
          <svg viewBox="0 0 760 380" className="w-full max-w-3xl h-auto select-none">
            <defs>
              {/* Plasma Glow Filter */}
              <filter id="plasma-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* Molten Pool Gradient */}
              <linearGradient id="pool-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="50%" stopColor="#ffedd5" />
                <stop offset="100%" stopColor="#ea580c" />
              </linearGradient>
              {/* Arc Plasma Gradient */}
              <radialGradient id="plasma-gradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="35%" stopColor="#67e8f9" />
                <stop offset="70%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
              </radialGradient>
              {/* Gas Cloud Radial Gradient */}
              <radialGradient id="gas-gradient" cx="50%" cy="40%" r="50%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
                <stop offset="60%" stopColor="#94a3b8" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#64748b" stopOpacity="0" />
              </radialGradient>
              {/* HAZ Gradient */}
              <linearGradient id="haz-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#dc2626" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#b45309" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#334155" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Base Metal Workpiece */}
            <rect x="60" y="240" width="640" height="90" fill="#334155" stroke="#475569" strokeWidth="2" rx="3" />
            <text x="80" y="300" fill="#94a3b8" fontSize="13" fontWeight="600" fontFamily="sans-serif">
              Base Metal Workpiece (Parent Steel)
            </text>

            {/* Heat Affected Zone (HAZ) */}
            {(activeLayer === 'all' || activeLayer === 'heat') && (
              <path
                d="M 230 240 Q 380 320 530 240 Z"
                fill="url(#haz-gradient)"
                stroke="#ef4444"
                strokeWidth="1.5"
                strokeDasharray="4 2"
              />
            )}

            {/* Penetration Depth Boundary */}
            <path
              d="M 260 240 Q 380 295 500 240 Z"
              fill="#c2410c"
              stroke="#ea580c"
              strokeWidth="2"
            />

            {/* Molten Weld Puddle */}
            <path
              d="M 280 240 Q 380 280 480 240 Q 430 230 380 230 Q 330 230 280 240 Z"
              fill="url(#pool-gradient)"
              filter="url(#plasma-glow)"
            />

            {/* Solidified Weld Bead with Ripples */}
            <path
              d="M 470 240 Q 570 232 660 240 L 660 248 L 470 248 Z"
              fill="#64748b"
              stroke="#94a3b8"
              strokeWidth="1.5"
            />
            {/* Bead ripples */}
            {[500, 525, 550, 575, 600, 625, 650].map((rx, idx) => (
              <path
                key={idx}
                d={`M ${rx} 234 Q ${rx + 12} 240 ${rx} 246`}
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            ))}

            {/* Solidified Slag Blanket */}
            {(activeLayer === 'all' || activeLayer === 'slag') && (
              <g>
                <path
                  d="M 460 233 Q 560 226 650 233 L 645 237 Q 560 230 465 237 Z"
                  fill="#78350f"
                  stroke="#b45309"
                  strokeWidth="1.5"
                />
                <text x="520" y="222" fill="#fbbf24" fontSize="11" fontWeight="bold">
                  Solidified Protective Slag
                </text>
              </g>
            )}

            {/* Gas Shield Envelope */}
            {(activeLayer === 'all' || activeLayer === 'shield') && (
              <g>
                <ellipse cx="380" cy="180" rx="140" ry="85" fill="url(#gas-gradient)" />
                <path
                  d="M 270 170 Q 230 190 260 220"
                  stroke="#38bdf8"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  fill="none"
                />
                <text x="180" y="160" fill="#38bdf8" fontSize="11" fontWeight="bold">
                  Gaseous Shielding (CO, CO₂, H₂)
                </text>
                <text x="180" y="174" fill="#94a3b8" fontSize="9">
                  Displaces atmospheric O₂ &amp; N₂
                </text>
              </g>
            )}

            {/* Consumable Electrode (Core Wire + Flux) */}
            <g transform="rotate(-20 380 90)">
              {/* Flux Coating */}
              <rect x="362" y="20" width="36" height="150" fill="#713f12" stroke="#a16207" strokeWidth="1.5" rx="3" />
              {/* Core Wire */}
              <rect x="372" y="10" width="16" height="170" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="1.5" />
              {/* Burning Flux Tip / Cup */}
              <path d="M 362 170 L 372 180 L 388 180 L 398 170 Z" fill="#b45309" />
              {/* Melting Core Wire Tip Droplet */}
              <ellipse cx="380" cy="182" rx="7" ry="5" fill="#fef08a" />
            </g>

            {/* Electric Arc Column (Plasma) */}
            {(activeLayer === 'all' || activeLayer === 'plasma') && (
              <g>
                {/* Outer Flare */}
                <path
                  d="M 365 195 Q 350 215 350 235 Q 380 242 410 235 Q 410 215 395 195 Z"
                  fill="url(#plasma-gradient)"
                  filter="url(#plasma-glow)"
                />
                {/* Molten Metal Droplet in Flight */}
                <circle cx="380" cy="210" r="3.5" fill="#ffffff" />
                <path d="M 378 206 L 382 206 L 380 215 Z" fill="#fde047" />

                {/* Spatter Sparks */}
                <circle cx="330" cy="215" r="1.5" fill="#f59e0b" />
                <circle cx="435" cy="205" r="1.5" fill="#f59e0b" />
                <circle cx="340" cy="190" r="1" fill="#f59e0b" />
              </g>
            )}

            {/* Labels & Annotations */}
            <g className="text-xs font-mono">
              {/* Electrode Label */}
              <line x1="430" y1="50" x2="490" y2="50" stroke="#f59e0b" strokeWidth="1.5" />
              <circle cx="430" cy="50" r="3" fill="#f59e0b" />
              <text x="495" y="46" fill="#f59e0b" fontSize="11" fontWeight="bold">
                Flux-Coated Electrode
              </text>
              <text x="495" y="60" fill="#94a3b8" fontSize="10">
                Core Wire: Filler Metal | Flux: Gas &amp; Slag
              </text>

              {/* Arc Column Label */}
              <line x1="390" y1="210" x2="490" y2="135" stroke="#38bdf8" strokeWidth="1.5" />
              <circle cx="390" cy="210" r="3" fill="#38bdf8" />
              <text x="495" y="132" fill="#38bdf8" fontSize="11" fontWeight="bold">
                Electric Arc Column (Plasma)
              </text>
              <text x="495" y="146" fill="#94a3b8" fontSize="10">
                Temperature: 3,500°C – 6,000°C (6,300°F - 10,800°F)
              </text>

              {/* Molten Pool Label */}
              <line x1="380" y1="245" x2="490" y2="280" stroke="#ea580c" strokeWidth="1.5" />
              <circle cx="380" cy="245" r="3" fill="#ea580c" />
              <text x="495" y="278" fill="#ea580c" fontSize="11" fontWeight="bold">
                Molten Weld Pool (Puddle)
              </text>
              <text x="495" y="292" fill="#94a3b8" fontSize="10">
                Homogeneous coalescence (~1,600°C)
              </text>

              {/* Travel Direction Arrow */}
              <path d="M 450 100 L 520 100" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arrow)" />
              <polygon points="520,96 528,100 520,104" fill="#10b981" />
              <text x="450" y="90" fill="#10b981" fontSize="11" fontWeight="bold">
                Travel Direction →
              </text>
            </g>
          </svg>
        </div>
      </div>

      {/* Deep-Dive Fundamental Principles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Principle 1 */}
        <div className="bg-slate-850 p-4 rounded-xl border border-slate-750 flex flex-col justify-between">
          <div>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
              <Zap className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1.5">1. Electrical Arc & Ionization</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              When the energized electrode briefly touches the workpiece and is pulled back 2–3mm, 
              intense contact resistance boils the air gap. Electrons accelerate across the gap, ionizing 
              gas molecules into a self-sustaining conductive <strong>thermal plasma</strong> carrying up to hundreds of Amperes.
            </p>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-750 text-[11px] text-amber-300/80 font-mono">
            Arc Voltage: 18V – 36V | Plasma Temp: ~6,000°C
          </div>
        </div>

        {/* Principle 2 */}
        <div className="bg-slate-850 p-4 rounded-xl border border-slate-750 flex flex-col justify-between">
          <div>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-3">
              <Shield className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1.5">2. Flux Pyrolysis & Gaseous Shield</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Ambient oxygen and nitrogen severely embrittle molten steel. As the flux coating burns, it liberates a 
              dense cloud of <strong>CO, CO₂, and H₂</strong> that forcefully displaces atmospheric gases from the weld pool 
              within milliseconds.
            </p>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-750 text-[11px] text-cyan-300/80 font-mono">
            Prevents N₂ nitrides &amp; O₂ porosity defects
          </div>
        </div>

        {/* Principle 3 */}
        <div className="bg-slate-850 p-4 rounded-xl border border-slate-750 flex flex-col justify-between">
          <div>
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center mb-3">
              <Flame className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1.5">3. Deoxidation & Slag Blanket</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mineral flux constituents (rutile, cellulose, iron powder, fluorides) melt and react with impurities. 
              Because the molten slag has lower density than liquid steel, it floats to the crown, insulating the bead 
              and <strong>slowing cooling rates</strong> to avoid brittle martensite.
            </p>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-750 text-[11px] text-orange-300/80 font-mono">
            Controls bead contour &amp; prevents quench cracking
          </div>
        </div>

        {/* Principle 4 */}
        <div className="bg-slate-850 p-4 rounded-xl border border-slate-750 flex flex-col justify-between">
          <div>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
              <Activity className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1.5">4. Weld Pool Fusion & HAZ Metallurgy</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Filler metal droplets transfer across the arc via surface tension and electromagnetic pinch effect. 
              The parent metal melts, intermixing with filler droplets into a homogeneous pool that solidifies 
              into interlocking dendritic crystals flanked by the <strong>Heat Affected Zone (HAZ)</strong>.
            </p>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-750 text-[11px] text-emerald-300/80 font-mono">
            Heat Input: H = (V × I × 60) / (S × 1000) × η
          </div>
        </div>
      </div>

      {/* Standard Operating Procedure Principles Checklist */}
      <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 text-xs">
        <h4 className="font-bold text-slate-200 mb-2 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-amber-400" />
          Key Operational Principles for the Qualified Welder (SOP 7.1.1 Mandates)
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-300">
          <div className="bg-slate-950/60 p-2.5 rounded border border-slate-800">
            <span className="text-amber-400 font-semibold block mb-0.5">Arc Length Control</span>
            Maintain arc length strictly equal to the core wire diameter (e.g. 3.2mm rod = 3mm arc gap). Excess length causes high voltage, spatter, and porosity.
          </div>
          <div className="bg-slate-950/60 p-2.5 rounded border border-slate-800">
            <span className="text-amber-400 font-semibold block mb-0.5">Electrode Work Angle</span>
            Maintain 70°–80° drag angle along the travel direction. Pointing the arc backwards pushes the slag behind the puddle, avoiding slag entrapment.
          </div>
          <div className="bg-slate-950/60 p-2.5 rounded border border-slate-800">
            <span className="text-amber-400 font-semibold block mb-0.5">Travel Speed Regulation</span>
            Travel steadily so the puddle width stays between 2x and 3x the core wire diameter. Moving too fast causes cold laps; too slow creates excessive convex buildup.
          </div>
        </div>
      </div>
    </section>
  );
}
