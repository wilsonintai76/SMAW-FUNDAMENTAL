import { useState, useEffect } from 'react';
import { 
  Zap, 
  Flame, 
  ArrowDown, 
  ArrowUp, 
  Maximize2, 
  Layers, 
  Info, 
  Activity, 
  Compass, 
  ShieldAlert, 
  Sliders, 
  RefreshCw,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export default function PolaritySvgSimulation() {
  const [selectedPolarity, setSelectedPolarity] = useState<'DCEP' | 'DCEN'>('DCEP');
  const [amperage, setAmperage] = useState<number>(140);
  const [showElectronStream, setShowElectronStream] = useState<boolean>(true);
  const [showThermalZones, setShowThermalZones] = useState<boolean>(true);
  const [showMarangoniArrows, setShowMarangoniArrows] = useState<boolean>(true);
  const [isComparing, setIsComparing] = useState<boolean>(false);
  const [animStep, setAnimStep] = useState<number>(0);

  // Animation ticker for SVG particle and dash offsets
  useEffect(() => {
    let animationId: number;
    const updateTick = () => {
      setAnimStep((prev) => (prev + 1) % 1000);
      animationId = requestAnimationFrame(updateTick);
    };
    animationId = requestAnimationFrame(updateTick);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Proportional calculations based on Amperage
  const ampFactor = amperage / 130; // ~0.6 to 1.7

  // DCEN calculations: Deep penetration, narrower bead, 70% heat at base plate
  // DCEP calculations: Shallow/medium penetration, wide bead, 70% heat at electrode
  const dcenDepth = Math.round(58 * ampFactor);
  const dcenWidth = Math.round(92 * ampFactor);
  const dcepDepth = Math.round(34 * ampFactor);
  const dcepWidth = Math.round(144 * ampFactor);

  // Particle positions along the arc for DCEP and DCEN
  const generateParticles = (polarity: 'DCEP' | 'DCEN') => {
    const particles = [];
    const count = 12;
    for (let i = 0; i < count; i++) {
      // Offset based on animStep
      const progress = ((animStep * 1.5 + (i * (100 / count))) % 100) / 100;
      // In DCEN: electrons travel DOWN from electrode (y ~ 110) to workpiece (y ~ 185)
      // In DCEP: electrons travel UP from workpiece (y ~ 185) to electrode (y ~ 110)
      const startY = polarity === 'DCEN' ? 110 : 185;
      const endY = polarity === 'DCEN' ? 185 : 110;
      const curY = startY + (endY - startY) * progress;

      // Slight horizontal arc spread
      const spreadX = Math.sin(progress * Math.PI) * (i % 2 === 0 ? 1 : -1) * (10 + (i % 3) * 6);
      const curX = 250 + spreadX;

      particles.push({
        id: i,
        x: curX,
        y: curY,
        opacity: Math.sin(progress * Math.PI),
        size: 2.5 + (i % 2) * 1.2
      });
    }
    return particles;
  };

  const dcenParticles = generateParticles('DCEN');
  const dcepParticles = generateParticles('DCEP');

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 space-y-5">
      {/* Simulation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 font-mono">
              <Zap className="w-4 h-4 text-cyan-400" />
              Interactive SVG Polarity Physics Simulator
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Visualizing direct electron bombardment vectors, cathode vs. anode thermal concentration, and weld pool cross-sectional depth.
          </p>
        </div>

        {/* Polarity & View Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-mono w-full sm:w-auto">
            <button
              id="btn-svg-dcep"
              onClick={() => { setSelectedPolarity('DCEP'); setIsComparing(false); }}
              className={`px-2.5 sm:px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0 flex-1 sm:flex-initial justify-center ${
                selectedPolarity === 'DCEP' && !isComparing
                  ? 'bg-red-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <Flame className="w-3.5 h-3.5 shrink-0" />
              <span>DCEP</span>
              <span className="hidden sm:inline"> (Reverse)</span>
            </button>
            <button
              id="btn-svg-dcen"
              onClick={() => { setSelectedPolarity('DCEN'); setIsComparing(false); }}
              className={`px-2.5 sm:px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0 flex-1 sm:flex-initial justify-center ${
                selectedPolarity === 'DCEN' && !isComparing
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <Zap className="w-3.5 h-3.5 shrink-0" />
              <span>DCEN</span>
              <span className="hidden sm:inline"> (Straight)</span>
            </button>
          </div>

          <button
            id="btn-svg-compare"
            onClick={() => setIsComparing(!isComparing)}
            className={`w-full sm:w-auto px-3 py-1.5 rounded-lg border text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              isComparing
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5 shrink-0" />
            <span>{isComparing ? 'Close Side-by-Side' : 'Compare Side-by-Side'}</span>
          </button>
        </div>
      </div>

      {/* Physics Toolbar & Parameter Adjustment */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
        {/* Amperage Slider */}
        <div className="flex items-center gap-3">
          <span className="text-slate-400 font-medium flex items-center gap-1.5 font-mono">
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            Welding Current:
          </span>
          <input
            id="slider-svg-amperage"
            type="range"
            min={80}
            max={220}
            step={5}
            value={amperage}
            onChange={(e) => setAmperage(Number(e.target.value))}
            className="w-32 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
          />
          <span className="font-mono font-bold text-amber-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 min-w-[50px] text-center">
            {amperage} A
          </span>
        </div>

        {/* Feature Display Toggles */}
        <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono">
          <label className="flex items-center gap-1.5 text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={showElectronStream}
              onChange={(e) => setShowElectronStream(e.target.checked)}
              className="rounded bg-slate-850 text-cyan-400 focus:ring-0"
            />
            <span>Electrons (e⁻)</span>
          </label>
          <label className="flex items-center gap-1.5 text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={showThermalZones}
              onChange={(e) => setShowThermalZones(e.target.checked)}
              className="rounded bg-slate-850 text-amber-400 focus:ring-0"
            />
            <span>HAZ &amp; Heat Distribution</span>
          </label>
          <label className="flex items-center gap-1.5 text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={showMarangoniArrows}
              onChange={(e) => setShowMarangoniArrows(e.target.checked)}
              className="rounded bg-slate-850 text-emerald-400 focus:ring-0"
            />
            <span>Pool Circulation</span>
          </label>
        </div>
      </div>

      {/* Main Simulation Viewport (SVG Visualizer) */}
      {!isComparing ? (
        /* SINGLE FOCUS VIEW */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Main SVG Schematic (Cols 1-8) */}
          <div className="lg:col-span-8 bg-slate-950 rounded-xl border border-slate-800 p-4 relative overflow-hidden flex flex-col items-center">
            {/* Stage Title / Banner */}
            <div className="w-full flex items-center justify-between mb-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded font-bold border ${
                  selectedPolarity === 'DCEP'
                    ? 'bg-red-500/20 text-red-400 border-red-500/40'
                    : 'bg-blue-500/20 text-blue-400 border-blue-500/40'
                }`}>
                  {selectedPolarity === 'DCEP' ? 'DCEP (Direct Current Electrode Positive / Reverse)' : 'DCEN (Direct Current Electrode Negative / Straight)'}
                </span>
              </div>
              <span className="text-slate-400 text-[11px]">
                {selectedPolarity === 'DCEP' ? 'Electrode = Anode (+) | Work = Cathode (-)' : 'Electrode = Cathode (-) | Work = Anode (+)'}
              </span>
            </div>

            {/* Interactive SVG Stage */}
            <div className="w-full flex justify-center bg-[#070b13] rounded-xl border border-slate-850/80 p-2 overflow-hidden shadow-inner">
              <svg viewBox="0 0 500 340" className="w-full max-w-xl h-auto select-none">
                <defs>
                  {/* Heatmap Radial Gradients */}
                  {/* DCEN workpiece intense hotspot */}
                  <radialGradient id="dcenBaseHeat" cx="50%" cy="10%" r="90%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                    <stop offset="20%" stopColor="#fef08a" stopOpacity="0.85" />
                    <stop offset="50%" stopColor="#f97316" stopOpacity="0.75" />
                    <stop offset="80%" stopColor="#dc2626" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0" />
                  </radialGradient>

                  {/* DCEP electrode rod hotspot */}
                  <radialGradient id="dcepRodHeat" cx="50%" cy="90%" r="80%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                    <stop offset="30%" stopColor="#fef08a" stopOpacity="0.85" />
                    <stop offset="70%" stopColor="#ea580c" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0" />
                  </radialGradient>

                  {/* DCEP workpiece shallow wide hotspot */}
                  <radialGradient id="dcepBaseHeat" cx="50%" cy="0%" r="85%">
                    <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
                    <stop offset="40%" stopColor="#fb923c" stopOpacity="0.75" />
                    <stop offset="75%" stopColor="#b91c1c" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0" />
                  </radialGradient>

                  {/* Plasma Arc Column Gradient */}
                  <radialGradient id="plasmaArcGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                    <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.6" />
                    <stop offset="75%" stopColor="#0284c7" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#0369a1" stopOpacity="0" />
                  </radialGradient>

                  {/* Steel Plate Texture Pattern */}
                  <pattern id="steelPattern" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 0 10 L 10 0 M 0 0 L 10 10" stroke="#334155" strokeWidth="0.5" opacity="0.3" />
                  </pattern>
                </defs>

                {/* 1. Base Metal Plate (Workpiece) */}
                <rect x="50" y="190" width="400" height="135" fill="#1e293b" stroke="#475569" strokeWidth="2" rx="4" />
                <rect x="50" y="190" width="400" height="135" fill="url(#steelPattern)" />
                <text x="65" y="315" fill="#94a3b8" fontSize="11" fontWeight="bold" fontFamily="monospace">
                  BASE METAL STEEL PLATE (WORKPIECE)
                </text>

                {/* 2. Heat-Affected Zone (HAZ) */}
                {showThermalZones && (
                  <g>
                    {selectedPolarity === 'DCEN' ? (
                      /* DCEN HAZ: Deeper, narrower */
                      <path
                        d={`M ${250 - (dcenWidth / 2 + 25)} 190 
                            C ${250 - dcenWidth * 0.4} ${190 + dcenDepth * 1.35}, 
                              ${250 + dcenWidth * 0.4} ${190 + dcenDepth * 1.35}, 
                              ${250 + (dcenWidth / 2 + 25)} 190 Z`}
                        fill="rgba(239, 68, 68, 0.22)"
                        stroke="#ef4444"
                        strokeWidth="1"
                        strokeDasharray="4 2"
                      />
                    ) : (
                      /* DCEP HAZ: Wider, shallower */
                      <path
                        d={`M ${250 - (dcepWidth / 2 + 25)} 190 
                            C ${250 - dcepWidth * 0.45} ${190 + dcepDepth * 1.5}, 
                              ${250 + dcepWidth * 0.45} ${190 + dcepDepth * 1.5}, 
                              ${250 + (dcepWidth / 2 + 25)} 190 Z`}
                        fill="rgba(239, 68, 68, 0.2)"
                        stroke="#ef4444"
                        strokeWidth="1"
                        strokeDasharray="4 2"
                      />
                    )}
                    <text
                      x={selectedPolarity === 'DCEN' ? 250 + (dcenWidth / 2 + 30) : 250 + (dcepWidth / 2 + 30)}
                      y={190 + (selectedPolarity === 'DCEN' ? dcenDepth * 0.8 : dcepDepth * 0.8)}
                      fill="#ef4444"
                      fontSize="9"
                      fontFamily="monospace"
                    >
                      Heat-Affected Zone (HAZ)
                    </text>
                  </g>
                )}

                {/* 3. Molten Weld Pool Geometry (Liquid Crater) */}
                {selectedPolarity === 'DCEN' ? (
                  /* DCEN: Deep Finger Penetration */
                  <g>
                    {/* Liquid Puddle Boundary */}
                    <path
                      d={`M ${250 - dcenWidth / 2} 190 
                          C ${250 - dcenWidth * 0.25} ${190 + dcenDepth * 0.7}, 
                            ${250 - dcenWidth * 0.15} ${190 + dcenDepth}, 
                            250 ${190 + dcenDepth} 
                          C ${250 + dcenWidth * 0.15} ${190 + dcenDepth}, 
                            ${250 + dcenWidth * 0.25} ${190 + dcenDepth * 0.7}, 
                            ${250 + dcenWidth / 2} 190 Z`}
                      fill="url(#dcenBaseHeat)"
                      stroke="#f59e0b"
                      strokeWidth="2"
                    />
                    {/* Low weld reinforcement / flat crown */}
                    <path
                      d={`M ${250 - dcenWidth / 2} 190 Q 250 184 ${250 + dcenWidth / 2} 190 Z`}
                      fill="#f97316"
                      opacity="0.8"
                    />
                  </g>
                ) : (
                  /* DCEP: Wide, Shallow Basin with Generous Crown */
                  <g>
                    {/* Liquid Puddle Boundary */}
                    <path
                      d={`M ${250 - dcepWidth / 2} 190 
                          C ${250 - dcepWidth * 0.3} ${190 + dcepDepth * 1.1}, 
                            ${250 + dcepWidth * 0.3} ${190 + dcepDepth * 1.1}, 
                            ${250 + dcepWidth / 2} 190 Z`}
                      fill="url(#dcepBaseHeat)"
                      stroke="#f59e0b"
                      strokeWidth="2"
                    />
                    {/* High crown reinforcement */}
                    <path
                      d={`M ${250 - dcepWidth / 2} 190 Q 250 178 ${250 + dcepWidth / 2} 190 Z`}
                      fill="#ea580c"
                      opacity="0.85"
                    />
                  </g>
                )}

                {/* 4. Marangoni Convection / Fluid Circulation Arrows */}
                {showMarangoniArrows && (
                  <g opacity="0.85">
                    {selectedPolarity === 'DCEN' ? (
                      /* DCEN: Inward and downward digging fluid vortex */
                      <>
                        <path
                          d="M 235 200 C 240 215, 246 225, 249 238"
                          fill="none"
                          stroke="#ffffff"
                          strokeWidth="1.5"
                          strokeDasharray="4 2"
                        />
                        <polygon points="250,242 246,236 253,237" fill="#ffffff" />
                        <path
                          d="M 265 200 C 260 215, 254 225, 251 238"
                          fill="none"
                          stroke="#ffffff"
                          strokeWidth="1.5"
                          strokeDasharray="4 2"
                        />
                        <polygon points="250,242 247,237 254,236" fill="#ffffff" />
                        <text x="250" y={190 + dcenDepth + 18} fill="#fef08a" fontSize="9" textAnchor="middle" fontFamily="monospace">
                          Inward Digging Fluid Vortex
                        </text>
                      </>
                    ) : (
                      /* DCEP: Outward surface fluid wash */
                      <>
                        <path
                          d="M 245 205 C 235 202, 220 196, 205 194"
                          fill="none"
                          stroke="#ffffff"
                          strokeWidth="1.5"
                          strokeDasharray="4 2"
                        />
                        <polygon points="200,194 206,191 206,197" fill="#ffffff" />
                        <path
                          d="M 255 205 C 265 202, 280 196, 295 194"
                          fill="none"
                          stroke="#ffffff"
                          strokeWidth="1.5"
                          strokeDasharray="4 2"
                        />
                        <polygon points="300,194 294,191 294,197" fill="#ffffff" />
                        <text x="250" y={190 + dcepDepth + 18} fill="#fef08a" fontSize="9" textAnchor="middle" fontFamily="monospace">
                          Outward Scouring Surface Fluid Wash
                        </text>
                      </>
                    )}
                  </g>
                )}

                {/* 5. Plasma Arc Column */}
                <ellipse cx="250" cy="148" rx={selectedPolarity === 'DCEN' ? 24 : 34} ry="36" fill="url(#plasmaArcGrad)" />
                <ellipse cx="250" cy="148" rx="8" ry="18" fill="#ffffff" opacity="0.9" />

                {/* 6. Electrode Holder & Consumable Rod */}
                <g>
                  {/* Flux Coating */}
                  <rect x="240" y="20" width="20" height="90" fill="#78350f" stroke="#b45309" strokeWidth="1.5" rx="2" />
                  {/* Core Metallic Wire */}
                  <rect x="247" y="20" width="6" height="98" fill="#94a3b8" />

                  {/* Consumable Rod Tip Heating */}
                  {selectedPolarity === 'DCEP' ? (
                    /* DCEP: 70% thermal concentration in rod tip */
                    <>
                      <circle cx="250" cy="116" r="22" fill="url(#dcepRodHeat)" />
                      <circle cx="250" cy="116" r="7" fill="#ffffff" />
                      {/* Molten metal droplet pinching off */}
                      <circle cx="250" cy="138" r="4.5" fill="#fef08a" />
                    </>
                  ) : (
                    /* DCEN: 30% thermal concentration in rod tip */
                    <>
                      <circle cx="250" cy="116" r="12" fill="#f59e0b" opacity="0.7" />
                      <circle cx="250" cy="116" r="4" fill="#ffffff" />
                    </>
                  )}
                </g>

                {/* 7. Real-Time Moving Electrons (SVG Animated Particles) */}
                {showElectronStream && (
                  <g>
                    {(selectedPolarity === 'DCEN' ? dcenParticles : dcepParticles).map((p) => (
                      <g key={p.id} opacity={p.opacity}>
                        <circle cx={p.x} cy={p.y} r={p.size} fill="#38bdf8" />
                        <line
                          x1={p.x}
                          y1={p.y}
                          x2={p.x}
                          y2={selectedPolarity === 'DCEN' ? p.y - 6 : p.y + 6}
                          stroke="#67e8f9"
                          strokeWidth="1.2"
                        />
                      </g>
                    ))}
                  </g>
                )}

                {/* 8. Directional Flow Arrows & Labels */}
                {selectedPolarity === 'DCEN' ? (
                  /* DCEN: Negative Rod (-) -> Positive Workpiece (+) */
                  <g>
                    {/* Electrode Sign */}
                    <circle cx="205" cy="45" r="14" fill="#1d4ed8" stroke="#60a5fa" strokeWidth="2" />
                    <text x="199" y="51" fill="#ffffff" fontSize="18" fontWeight="bold" fontFamily="monospace">-</text>
                    <text x="120" y="49" fill="#60a5fa" fontSize="11" fontWeight="bold" fontFamily="monospace">
                      CATHODE (-)
                    </text>

                    {/* Workpiece Sign */}
                    <circle cx="105" cy="235" r="14" fill="#b91c1c" stroke="#f87171" strokeWidth="2" />
                    <text x="100" y="241" fill="#ffffff" fontSize="18" fontWeight="bold" fontFamily="monospace">+</text>
                    <text x="126" y="239" fill="#f87171" fontSize="11" fontWeight="bold" fontFamily="monospace">
                      ANODE (+)
                    </text>

                    {/* Big Stream Arrow Down */}
                    <path d="M 290 85 L 290 145" fill="none" stroke="#38bdf8" strokeWidth="3" strokeDasharray="5 3" />
                    <polygon points="290,152 285,142 295,142" fill="#38bdf8" />
                    <text x="305" y="115" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace">
                      Electron Stream ↓
                    </text>
                    <text x="305" y="128" fill="#94a3b8" fontSize="8.5" fontFamily="monospace">
                      (Cathode to Anode)
                    </text>
                  </g>
                ) : (
                  /* DCEP: Positive Rod (+) -> Negative Workpiece (-) */
                  <g>
                    {/* Electrode Sign */}
                    <circle cx="205" cy="45" r="14" fill="#b91c1c" stroke="#f87171" strokeWidth="2" />
                    <text x="199" y="51" fill="#ffffff" fontSize="18" fontWeight="bold" fontFamily="monospace">+</text>
                    <text x="120" y="49" fill="#f87171" fontSize="11" fontWeight="bold" fontFamily="monospace">
                      ANODE (+)
                    </text>

                    {/* Workpiece Sign */}
                    <circle cx="105" cy="235" r="14" fill="#1d4ed8" stroke="#60a5fa" strokeWidth="2" />
                    <text x="100" y="241" fill="#ffffff" fontSize="18" fontWeight="bold" fontFamily="monospace">-</text>
                    <text x="126" y="239" fill="#60a5fa" fontSize="11" fontWeight="bold" fontFamily="monospace">
                      CATHODE (-)
                    </text>

                    {/* Big Stream Arrow Up */}
                    <path d="M 290 150 L 290 90" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="5 3" />
                    <polygon points="290,83 285,93 295,93" fill="#f59e0b" />
                    <text x="305" y="115" fill="#f59e0b" fontSize="10" fontWeight="bold" fontFamily="monospace">
                      Electron Stream ↑
                    </text>
                    <text x="305" y="128" fill="#94a3b8" fontSize="8.5" fontFamily="monospace">
                      (Work to Electrode)
                    </text>

                    {/* Cathodic Cleaning Blast Indicators */}
                    <rect x="180" y="188" width="140" height="2" fill="#38bdf8" />
                    <text x="250" y="183" fill="#38bdf8" fontSize="8" textAnchor="middle" fontFamily="monospace">
                      ✨ Cathodic Oxide Cleaning Band
                    </text>
                  </g>
                )}

                {/* 9. Dimensional Callouts for Depth and Width */}
                {/* Penetration Depth Indicator */}
                <g transform={`translate(${selectedPolarity === 'DCEN' ? 250 + dcenWidth / 2 + 10 : 250 + dcepWidth / 2 + 10}, 190)`}>
                  <line x1="0" y1="0" x2="0" y2={selectedPolarity === 'DCEN' ? dcenDepth : dcepDepth} stroke="#f59e0b" strokeWidth="1.5" />
                  <line x1="-3" y1="0" x2="3" y2="0" stroke="#f59e0b" strokeWidth="1.5" />
                  <line
                    x1="-3"
                    y1={selectedPolarity === 'DCEN' ? dcenDepth : dcepDepth}
                    x2="3"
                    y2={selectedPolarity === 'DCEN' ? dcenDepth : dcepDepth}
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                  />
                  <text
                    x="8"
                    y={(selectedPolarity === 'DCEN' ? dcenDepth : dcepDepth) / 2 + 4}
                    fill="#f59e0b"
                    fontSize="10"
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    Depth: {selectedPolarity === 'DCEN' ? (3.8 * ampFactor).toFixed(1) : (2.7 * ampFactor).toFixed(1)} mm
                  </text>
                </g>

                {/* Bead Width Indicator */}
                <g transform="translate(0, 172)">
                  <line
                    x1={selectedPolarity === 'DCEN' ? 250 - dcenWidth / 2 : 250 - dcepWidth / 2}
                    y1="0"
                    x2={selectedPolarity === 'DCEN' ? 250 + dcenWidth / 2 : 250 + dcepWidth / 2}
                    y2="0"
                    stroke="#38bdf8"
                    strokeWidth="1.5"
                  />
                  <text x="250" y="-4" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                    Width: {selectedPolarity === 'DCEN' ? (5.2 * ampFactor).toFixed(1) : (8.4 * ampFactor).toFixed(1)} mm
                  </text>
                </g>
              </svg>
            </div>
          </div>

          {/* Side Panel: Thermodynamics & Cross-Section Metrics (Cols 9-12) */}
          <div className="lg:col-span-4 bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="border-b border-slate-850 pb-2">
                <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                  Thermodynamic Balance
                </span>
                <h4 className="text-sm font-bold text-white">
                  {selectedPolarity === 'DCEP' ? 'DCEP: Electrode Dominant' : 'DCEN: Base Metal Dominant'}
                </h4>
              </div>

              {/* Workpiece Absorption */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Base Metal (Workpiece):</span>
                  <strong className={selectedPolarity === 'DCEN' ? 'text-amber-400' : 'text-slate-300'}>
                    {selectedPolarity === 'DCEN' ? '70% Heat' : '30% Heat'}
                  </strong>
                </div>
                <div className="w-full bg-slate-850 h-3 rounded-full overflow-hidden border border-slate-750">
                  <div
                    className="h-full rounded-full transition-all duration-300 bg-gradient-to-r from-amber-500 to-red-500"
                    style={{ width: selectedPolarity === 'DCEN' ? '70%' : '30%' }}
                  />
                </div>
                <p className="text-[10px] text-slate-400">
                  {selectedPolarity === 'DCEN'
                    ? 'High kinetic bombardment by fast electrons heats the base plate rapidly, creating deep fusion.'
                    : 'Reduced heat input in plate helps bridge gaps and prevent burn-through on thin sheet.'}
                </p>
              </div>

              {/* Consumable Electrode Rod Absorption */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Electrode Stinger/Rod:</span>
                  <strong className={selectedPolarity === 'DCEP' ? 'text-cyan-400' : 'text-slate-300'}>
                    {selectedPolarity === 'DCEP' ? '70% Heat' : '30% Heat'}
                  </strong>
                </div>
                <div className="w-full bg-slate-850 h-3 rounded-full overflow-hidden border border-slate-750">
                  <div
                    className="h-full rounded-full transition-all duration-300 bg-gradient-to-r from-cyan-500 to-blue-500"
                    style={{ width: selectedPolarity === 'DCEP' ? '70%' : '30%' }}
                  />
                </div>
                <p className="text-[10px] text-slate-400">
                  {selectedPolarity === 'DCEP'
                    ? 'Electrons slamming into rod anode generate high melt-off rate and rapid metal deposition.'
                    : 'Rod stays cooler, yielding slower burn-off speed and longer electrode run-out.'}
                </p>
              </div>

              {/* Engineering Profile Summary Table */}
              <div className="bg-slate-900 rounded-lg p-3 border border-slate-800 space-y-2 text-xs font-mono">
                <span className="text-slate-400 font-bold block border-b border-slate-800 pb-1 text-[11px]">
                  Physical Pool Characteristics:
                </span>
                <div className="flex justify-between">
                  <span className="text-slate-400">Penetration Profile:</span>
                  <strong className={selectedPolarity === 'DCEN' ? 'text-amber-400' : 'text-cyan-400'}>
                    {selectedPolarity === 'DCEN' ? 'Deep, Narrow Finger' : 'Shallow-Medium, Wide Basin'}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Oxide Removal:</span>
                  <strong className={selectedPolarity === 'DCEP' ? 'text-emerald-400' : 'text-slate-400'}>
                    {selectedPolarity === 'DCEP' ? 'Cathodic Cleaning' : 'None (Manual Prep Req.)'}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Burn-off Deposition:</span>
                  <strong className="text-white">
                    {selectedPolarity === 'DCEP' ? `${(1.8 * ampFactor).toFixed(2)} kg/h` : `${(1.2 * ampFactor).toFixed(2)} kg/h`}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Burn-through Risk:</span>
                  <strong className={selectedPolarity === 'DCEN' ? 'text-red-400' : 'text-emerald-400'}>
                    {selectedPolarity === 'DCEN' ? 'High on Thin Sheet' : 'Low / Controlled'}
                  </strong>
                </div>
              </div>
            </div>

            {/* Quick Toggle Helper */}
            <div className="pt-2 border-t border-slate-850">
              <button
                onClick={() => setSelectedPolarity(selectedPolarity === 'DCEP' ? 'DCEN' : 'DCEP')}
                className="w-full py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-mono font-bold text-slate-300 hover:text-white border border-slate-750 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
                Switch to {selectedPolarity === 'DCEP' ? 'DCEN (Straight)' : 'DCEP (Reverse)'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* SIDE-BY-SIDE DIRECT COMPARISON VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* DCEN PANEL */}
          <div className="bg-slate-950 rounded-xl border-2 border-blue-500/40 p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-mono font-bold">
                  DCEN (Straight)
                </span>
                <span className="text-xs font-mono text-slate-400">Electrode (-) / Work (+)</span>
              </div>
              <span className="text-[11px] font-mono text-amber-400 font-bold">70% Work Heat</span>
            </div>

            {/* DCEN Mini SVG Stage */}
            <div className="bg-[#070b13] rounded-lg border border-slate-800 p-2 flex justify-center">
              <svg viewBox="0 0 320 220" className="w-full h-auto select-none">
                {/* Plate */}
                <rect x="20" y="110" width="280" height="95" fill="#1e293b" stroke="#475569" strokeWidth="1.5" rx="3" />

                {/* Deep Finger Crater */}
                <path
                  d="M 125 110 C 145 150, 150 175, 160 175 C 170 175, 175 150, 195 110 Z"
                  fill="#f97316"
                  stroke="#f59e0b"
                  strokeWidth="2"
                />
                <circle cx="160" cy="135" r="14" fill="#ffffff" opacity="0.9" />

                {/* Plasma Flare */}
                <ellipse cx="160" cy="88" rx="16" ry="24" fill="#38bdf8" opacity="0.6" />

                {/* Electrode Rod */}
                <rect x="154" y="10" width="12" height="60" fill="#78350f" stroke="#b45309" />
                <rect x="158" y="10" width="4" height="65" fill="#cbd5e1" />

                {/* Downward Electron Stream Arrows */}
                <line x1="160" y1="74" x2="160" y2="105" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 2" />
                <polygon points="160,108 156,101 164,101" fill="#38bdf8" />

                {/* Signs */}
                <circle cx="130" cy="25" r="10" fill="#1d4ed8" />
                <text x="127" y="29" fill="#ffffff" fontSize="13" fontWeight="bold">-</text>

                <circle cx="50" cy="140" r="10" fill="#b91c1c" />
                <text x="47" y="144" fill="#ffffff" fontSize="13" fontWeight="bold">+</text>

                {/* Dimensions */}
                <text x="160" y="195" fill="#f59e0b" fontSize="9" textAnchor="middle" fontFamily="monospace">
                  Deep Finger Penetration (3.8 mm)
                </text>
                <text x="160" y="102" fill="#38bdf8" fontSize="8" textAnchor="middle" fontFamily="monospace">
                  Electrons ↓
                </text>
              </svg>
            </div>

            <ul className="space-y-1.5 text-xs text-slate-300 font-mono pt-1">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span><strong>Thermal Split:</strong> 70% Base Plate / 30% Rod</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span><strong>Bead Profile:</strong> Deep penetration, narrow bead width</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span><strong>Best For:</strong> Root pass on heavy plate, tight joint root openings</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span><strong>Common Rods:</strong> E6012, E7024, GTAW (TIG) Carbon Steel</span>
              </li>
            </ul>
          </div>

          {/* DCEP PANEL */}
          <div className="bg-slate-950 rounded-xl border-2 border-red-500/40 p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-mono font-bold">
                  DCEP (Reverse)
                </span>
                <span className="text-xs font-mono text-slate-400">Electrode (+) / Work (-)</span>
              </div>
              <span className="text-[11px] font-mono text-cyan-400 font-bold">70% Rod Heat</span>
            </div>

            {/* DCEP Mini SVG Stage */}
            <div className="bg-[#070b13] rounded-lg border border-slate-800 p-2 flex justify-center">
              <svg viewBox="0 0 320 220" className="w-full h-auto select-none">
                {/* Plate */}
                <rect x="20" y="110" width="280" height="95" fill="#1e293b" stroke="#475569" strokeWidth="1.5" rx="3" />

                {/* Wide Shallow Crater */}
                <path
                  d="M 95 110 C 130 145, 190 145, 225 110 Z"
                  fill="#ea580c"
                  stroke="#f59e0b"
                  strokeWidth="2"
                />
                {/* Pronounced Crown Buildup */}
                <path d="M 95 110 Q 160 98 225 110 Z" fill="#f97316" />

                {/* Plasma Flare */}
                <ellipse cx="160" cy="88" rx="24" ry="24" fill="#38bdf8" opacity="0.6" />

                {/* Electrode Rod with bright molten tip */}
                <rect x="154" y="10" width="12" height="60" fill="#78350f" stroke="#b45309" />
                <rect x="158" y="10" width="4" height="65" fill="#cbd5e1" />
                <circle cx="160" cy="74" r="14" fill="#ffffff" opacity="0.95" />

                {/* Upward Electron Stream Arrows */}
                <line x1="160" y1="105" x2="160" y2="76" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 2" />
                <polygon points="160,73 156,80 164,80" fill="#f59e0b" />

                {/* Signs */}
                <circle cx="130" cy="25" r="10" fill="#b91c1c" />
                <text x="127" y="29" fill="#ffffff" fontSize="13" fontWeight="bold">+</text>

                <circle cx="50" cy="140" r="10" fill="#1d4ed8" />
                <text x="47" y="144" fill="#ffffff" fontSize="13" fontWeight="bold">-</text>

                {/* Oxide cleaning line */}
                <line x1="90" y1="110" x2="230" y2="110" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 2" />

                {/* Dimensions */}
                <text x="160" y="195" fill="#f59e0b" fontSize="9" textAnchor="middle" fontFamily="monospace">
                  Wide Shallow Basin (2.7 mm Depth / 8.4 mm Width)
                </text>
                <text x="160" y="102" fill="#f59e0b" fontSize="8" textAnchor="middle" fontFamily="monospace">
                  Electrons ↑
                </text>
              </svg>
            </div>

            <ul className="space-y-1.5 text-xs text-slate-300 font-mono pt-1">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                <span><strong>Thermal Split:</strong> 70% Rod / 30% Base Plate</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                <span><strong>Bead Profile:</strong> Wide bead, high deposition, heavy crown</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                <span><strong>Cathodic Cleaning:</strong> Heavy ion blasting blasts refractory surface oxides</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                <span><strong>Common Rods:</strong> E7018, E6010, Stainless E308L, GMAW (MIG)</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
