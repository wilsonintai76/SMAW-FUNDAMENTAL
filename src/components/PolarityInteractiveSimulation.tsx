import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Zap, Sliders, Eye, Compass, Flame, ShieldAlert, Sparkles, Activity, Layers } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: 'electron' | 'ion' | 'droplet' | 'sparkle';
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

export default function PolarityInteractiveSimulation() {
  const [activePolarity, setActivePolarity] = useState<'DCEN' | 'DCEP' | 'AC'>('DCEP');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [simSpeed, setSimSpeed] = useState<number>(1.0);
  const [amperage, setAmperage] = useState<number>(130);
  const [arcLengthMm, setArcLengthMm] = useState<number>(3.0);
  const [showElectrons, setShowElectrons] = useState<boolean>(true);
  const [showIons, setShowIons] = useState<boolean>(true);
  const [showConvection, setShowConvection] = useState<boolean>(true);
  const [showHeatmap, setShowHeatmap] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'focus' | 'comparison'>('focus');

  // Interactive probe selection
  const [activeProbe, setActiveProbe] = useState<'electrode-tip' | 'plasma-core' | 'anode-spot' | 'weld-pool' | 'marangoni' | null>('weld-pool');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameIdRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  // Constants based on current polarity
  const isDCEN = activePolarity === 'DCEN';
  const isDCEP = activePolarity === 'DCEP';
  const isAC = activePolarity === 'AC';

  // Physical calculations based on Amperage and Polarity
  const currentRatio = amperage / 130;
  
  // Penetration in mm
  const penetrationMm = isDCEN 
    ? (3.8 * currentRatio).toFixed(1)
    : isDCEP 
      ? (2.7 * currentRatio).toFixed(1)
      : (3.2 * currentRatio).toFixed(1);

  // Bead Width in mm
  const beadWidthMm = isDCEN
    ? (5.2 * currentRatio).toFixed(1)
    : isDCEP
      ? (8.4 * currentRatio).toFixed(1)
      : (6.8 * currentRatio).toFixed(1);

  // Melt-off rate in kg/hr
  const burnoffRateKg = isDCEP
    ? (1.8 * currentRatio).toFixed(2)
    : isDCEN
      ? (1.2 * currentRatio).toFixed(2)
      : (1.5 * currentRatio).toFixed(2);

  // Heat distribution
  const workHeat = isDCEN ? 70 : isDCEP ? 30 : 50;
  const rodHeat = isDCEN ? 30 : isDCEP ? 70 : 50;

  // Real-time canvas simulation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let localTime = timeRef.current;
    const particles = particlesRef.current;

    const render = () => {
      if (!canvas) return;
      const width = canvas.width;
      const height = canvas.height;

      // Coordinate anchors
      const rodX = width / 2;
      const rodY = 70;
      const arcGapPx = 30 + (arcLengthMm - 1.5) * 14;
      const workSurfaceY = rodY + arcGapPx;
      const poolCenterY = workSurfaceY;

      // In AC mode, calculate phase (50 Hz simulated)
      const acPhase = Math.sin(localTime * 4); // oscillates between -1 and 1
      const effectiveElectrodeIsNeg = isDCEN ? true : isDCEP ? false : acPhase > 0;

      if (isPlaying) {
        localTime += 0.03 * simSpeed;
        timeRef.current = localTime;

        // Particle generation
        const rateMultiplier = Math.round(3 * currentRatio * simSpeed);
        
        for (let i = 0; i < rateMultiplier; i++) {
          const spawnOffset = (Math.random() - 0.5) * 14;

          // 1. Electrons: emit from cathode toward anode
          if (showElectrons) {
            if (effectiveElectrodeIsNeg) {
              // From Electrode (top) to Workpiece (bottom)
              particles.push({
                x: rodX + spawnOffset * 0.7,
                y: rodY + 18,
                vx: (Math.random() - 0.5) * 1.5,
                vy: 3.5 + Math.random() * 3.5 + currentRatio * 1.5,
                type: 'electron',
                life: 0,
                maxLife: 25 + Math.random() * 10,
                size: 2.2,
                color: '#38bdf8'
              });
            } else {
              // From Workpiece (bottom) to Electrode (top)
              particles.push({
                x: rodX + (Math.random() - 0.5) * 35,
                y: workSurfaceY - 2,
                vx: (Math.random() - 0.5) * 1.8,
                vy: -(3.5 + Math.random() * 3.5 + currentRatio * 1.5),
                type: 'electron',
                life: 0,
                maxLife: 25 + Math.random() * 10,
                size: 2.2,
                color: '#60a5fa'
              });
            }
          }

          // 2. Positive Ions: move opposite to electrons
          if (showIons && Math.random() < 0.45) {
            if (effectiveElectrodeIsNeg) {
              // Ions drift upward toward electrode
              particles.push({
                x: rodX + (Math.random() - 0.5) * 30,
                y: workSurfaceY - 4,
                vx: (Math.random() - 0.5) * 1.0,
                vy: -(1.2 + Math.random() * 1.5),
                type: 'ion',
                life: 0,
                maxLife: 35 + Math.random() * 12,
                size: 3.8,
                color: '#f97316'
              });
            } else {
              // Ions bombard downward toward base metal (Cathodic cleaning!)
              particles.push({
                x: rodX + spawnOffset * 0.9,
                y: rodY + 16,
                vx: (Math.random() - 0.5) * 1.2,
                vy: 1.5 + Math.random() * 2.0,
                type: 'ion',
                life: 0,
                maxLife: 35 + Math.random() * 12,
                size: 3.8,
                color: '#fb923c'
              });
            }
          }

          // 3. Cathodic Cleaning Sparkles (in DCEP or AC cleaning half-cycle)
          if (!effectiveElectrodeIsNeg && Math.random() < 0.3) {
            particles.push({
              x: rodX + (Math.random() - 0.5) * 50,
              y: workSurfaceY + (Math.random() - 0.5) * 4,
              vx: (Math.random() - 0.5) * 2.5,
              vy: -(Math.random() * 2.0),
              type: 'sparkle',
              life: 0,
              maxLife: 15,
              size: 1.5,
              color: '#fef08a'
            });
          }

          // 4. Molten droplet transfer
          if (Math.random() < 0.05 * currentRatio) {
            particles.push({
              x: rodX + (Math.random() - 0.5) * 4,
              y: rodY + 22,
              vx: (Math.random() - 0.5) * 0.6,
              vy: 2.2 + currentRatio * 0.8,
              type: 'droplet',
              life: 0,
              maxLife: 30,
              size: isDCEP ? 4.5 : isDCEN ? 6.0 : 5.0,
              color: '#fef08a'
            });
          }
        }
      }

      // Clear Canvas
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, width, height);

      // Draw Base Metal Steel Plate
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, workSurfaceY, width, height - workSurfaceY);

      // Draw subtle steel plate bevel / grid lines
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.strokeRect(10, workSurfaceY, width - 20, height - workSurfaceY - 10);

      // Dynamic Penetration Pool Shape Calculation
      const poolWidthPx = (isDCEP ? 110 : isDCEN ? 70 : 88) * (currentRatio * 0.85);
      const poolDepthPx = (isDCEN ? 75 : isDCEP ? 45 : 60) * (currentRatio * 0.85);

      // Draw Heat Affected Zone (HAZ) outer contour
      if (showHeatmap) {
        ctx.save();
        const hazGrad = ctx.createRadialGradient(
          rodX, workSurfaceY + 10, 10,
          rodX, workSurfaceY + 20, poolWidthPx * 0.9
        );
        hazGrad.addColorStop(0, 'rgba(239, 68, 68, 0.45)');
        hazGrad.addColorStop(0.5, 'rgba(185, 28, 28, 0.25)');
        hazGrad.addColorStop(0.85, 'rgba(127, 29, 29, 0.12)');
        hazGrad.addColorStop(1, 'rgba(15, 23, 42, 0)');

        ctx.fillStyle = hazGrad;
        ctx.beginPath();
        ctx.ellipse(rodX, workSurfaceY + poolDepthPx * 0.45, poolWidthPx * 0.85, poolDepthPx * 1.1, 0, 0, Math.PI);
        ctx.fill();
        ctx.restore();
      }

      // Draw Molten Weld Pool (Liquid Steel)
      ctx.save();
      const poolGrad = ctx.createRadialGradient(
        rodX, workSurfaceY + 10, 5,
        rodX, workSurfaceY + poolDepthPx * 0.4, poolDepthPx
      );
      if (isDCEN) {
        // DCEN: Intense white-yellow hot center deep in the workpiece
        poolGrad.addColorStop(0, '#ffffff');
        poolGrad.addColorStop(0.25, '#fef08a');
        poolGrad.addColorStop(0.65, '#f97316');
        poolGrad.addColorStop(1, '#991b1b');
      } else if (isDCEP) {
        // DCEP: Wider, moderate surface glow
        poolGrad.addColorStop(0, '#fef08a');
        poolGrad.addColorStop(0.45, '#fb923c');
        poolGrad.addColorStop(0.8, '#ea580c');
        poolGrad.addColorStop(1, '#991b1b');
      } else {
        // AC: Pulsating intermediate
        poolGrad.addColorStop(0, '#fffbeb');
        poolGrad.addColorStop(0.35, '#f59e0b');
        poolGrad.addColorStop(0.75, '#dc2626');
        poolGrad.addColorStop(1, '#7f1d1d');
      }

      ctx.fillStyle = poolGrad;
      ctx.beginPath();
      // Curve of the weld pool bottom
      if (isDCEN) {
        // Finger-like deep root
        ctx.moveTo(rodX - poolWidthPx / 2, workSurfaceY);
        ctx.bezierCurveTo(
          rodX - poolWidthPx * 0.2, workSurfaceY + poolDepthPx * 0.6,
          rodX - poolWidthPx * 0.15, workSurfaceY + poolDepthPx,
          rodX, workSurfaceY + poolDepthPx
        );
        ctx.bezierCurveTo(
          rodX + poolWidthPx * 0.15, workSurfaceY + poolDepthPx,
          rodX + poolWidthPx * 0.2, workSurfaceY + poolDepthPx * 0.6,
          rodX + poolWidthPx / 2, workSurfaceY
        );
      } else {
        // Wide basin (DCEP) or intermediate bowl (AC)
        ctx.moveTo(rodX - poolWidthPx / 2, workSurfaceY);
        ctx.quadraticCurveTo(rodX, workSurfaceY + poolDepthPx * 1.35, rodX + poolWidthPx / 2, workSurfaceY);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Slag Crust on Molten Surface (Edges)
      ctx.fillStyle = 'rgba(180, 83, 9, 0.85)';
      ctx.fillRect(rodX - poolWidthPx / 2 - 8, workSurfaceY - 2, 14, 4);
      ctx.fillRect(rodX + poolWidthPx / 2 - 6, workSurfaceY - 2, 14, 4);

      // Marangoni Convection / Fluid Flow Circulation Arrows
      if (showConvection) {
        ctx.save();
        ctx.strokeStyle = '#fef08a';
        ctx.fillStyle = '#fef08a';
        ctx.lineWidth = 1.6;
        ctx.setLineDash([3, 2]);

        const flowPhase = (localTime * 2) % 1;

        if (isDCEN) {
          // Inward & Downward flow (digging jet)
          // Left vortex: clockwise down
          ctx.beginPath();
          ctx.arc(rodX - poolWidthPx * 0.22, workSurfaceY + poolDepthPx * 0.4, poolDepthPx * 0.25, 0.2, Math.PI * 1.4);
          ctx.stroke();

          // Right vortex: counter-clockwise down
          ctx.beginPath();
          ctx.arc(rodX + poolWidthPx * 0.22, workSurfaceY + poolDepthPx * 0.4, poolDepthPx * 0.25, Math.PI * -0.4, Math.PI * 0.8);
          ctx.stroke();
        } else {
          // Outward surface flow (cleaning & widening)
          ctx.beginPath();
          ctx.arc(rodX - poolWidthPx * 0.25, workSurfaceY + poolDepthPx * 0.35, poolDepthPx * 0.22, Math.PI * 0.8, Math.PI * 1.9);
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(rodX + poolWidthPx * 0.25, workSurfaceY + poolDepthPx * 0.35, poolDepthPx * 0.22, Math.PI * 1.1, Math.PI * 2.2);
          ctx.stroke();
        }
        ctx.setLineDash([]);
        ctx.restore();
      }

      // Draw Arc Plasma Column (Ionized Arc Flare)
      const arcGrad = ctx.createRadialGradient(
        rodX, rodY + arcGapPx * 0.5, 4,
        rodX, rodY + arcGapPx * 0.5, arcGapPx * 0.9
      );
      arcGrad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      arcGrad.addColorStop(0.3, 'rgba(56, 189, 248, 0.65)');
      arcGrad.addColorStop(0.7, 'rgba(14, 165, 233, 0.25)');
      arcGrad.addColorStop(1, 'rgba(2, 132, 199, 0)');

      ctx.fillStyle = arcGrad;
      ctx.beginPath();
      ctx.ellipse(rodX, rodY + arcGapPx * 0.55, 24 + arcLengthMm * 3, arcGapPx * 0.6, 0, 0, Math.PI * 2);
      ctx.fill();

      // Draw Electrode Stinger & Consumable Rod
      // 1. Flux Coating
      ctx.fillStyle = '#78350f';
      ctx.strokeStyle = '#b45309';
      ctx.lineWidth = 1.5;
      ctx.fillRect(rodX - 9, 0, 18, rodY);
      ctx.strokeRect(rodX - 9, 0, 18, rodY);

      // 2. Core Metallic Wire
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(rodX - 3.5, 0, 7, rodY + 6);

      // 3. Rod Tip Burn-off and Heat Concentration
      const rodTipHeatGrad = ctx.createRadialGradient(
        rodX, rodY + 4, 1,
        rodX, rodY + 4, 16
      );
      if (isDCEP) {
        // DCEP: 70% rod heat! Extremely bright white/orange molten tip
        rodTipHeatGrad.addColorStop(0, '#ffffff');
        rodTipHeatGrad.addColorStop(0.3, '#fef08a');
        rodTipHeatGrad.addColorStop(0.7, '#f97316');
        rodTipHeatGrad.addColorStop(1, 'transparent');
      } else {
        // DCEN: Rod tip remains comparatively cooler
        rodTipHeatGrad.addColorStop(0, '#fef08a');
        rodTipHeatGrad.addColorStop(0.5, '#ea580c');
        rodTipHeatGrad.addColorStop(1, 'transparent');
      }
      ctx.fillStyle = rodTipHeatGrad;
      ctx.beginPath();
      ctx.arc(rodX, rodY + 8, 14, 0, Math.PI * 2);
      ctx.fill();

      // Render Active Particles (Electrons, Ions, Droplets, Sparkles)
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        if (isPlaying) {
          p.x += p.vx * simSpeed;
          p.y += p.vy * simSpeed;
          p.life += simSpeed;
        }

        const progress = p.life / p.maxLife;
        if (progress >= 1 || p.y > workSurfaceY + poolDepthPx || p.y < rodY - 10) {
          particles.splice(i, 1);
          continue;
        }

        const alpha = 1 - progress;
        ctx.save();
        ctx.globalAlpha = alpha;

        if (p.type === 'electron') {
          // Glowing electron dot with tail
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          // Tiny tail
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.vx * 1.5, p.y - p.vy * 1.5);
          ctx.stroke();
        } else if (p.type === 'ion') {
          // Heavier positive ion with glowing aura
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          // Plus sign badge inside
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 6px monospace';
          ctx.fillText('+', p.x - 2, p.y + 2);
        } else if (p.type === 'droplet') {
          // Molten metal droplet
          ctx.fillStyle = '#fef08a';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'sparkle') {
          // Cathodic oxide cleaning flash
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(p.x, p.y, 2, 2);
        }
        ctx.restore();
      }

      // Draw Cathodic Cleaning Zone Indicators on Surface
      if (!effectiveElectrodeIsNeg) {
        ctx.save();
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
        ctx.lineWidth = 2;
        ctx.strokeRect(rodX - poolWidthPx / 2 - 16, workSurfaceY - 1, poolWidthPx + 32, 2);
        ctx.fillStyle = '#38bdf8';
        ctx.font = '9px monospace';
        ctx.fillText('Cathodic Cleaning Band (Oxide Sputtering)', rodX - 100, workSurfaceY - 6);
        ctx.restore();
      }

      // Dimensional Annotations overlay
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px monospace';
      // Penetration depth arrow & label
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(rodX + poolWidthPx / 2 + 15, workSurfaceY);
      ctx.lineTo(rodX + poolWidthPx / 2 + 15, workSurfaceY + poolDepthPx);
      ctx.stroke();
      ctx.fillText(`Depth: ${penetrationMm}mm`, rodX + poolWidthPx / 2 + 20, workSurfaceY + poolDepthPx * 0.6);

      // Arc Gap label
      ctx.strokeStyle = '#38bdf8';
      ctx.beginPath();
      ctx.moveTo(rodX - 45, rodY + 10);
      ctx.lineTo(rodX - 45, workSurfaceY);
      ctx.stroke();
      ctx.fillText(`Gap: ${arcLengthMm.toFixed(1)}mm`, rodX - 110, rodY + arcGapPx * 0.55);

      // Polarity Sign Badges on Terminals
      // Top Stud / Electrode Sign
      ctx.fillStyle = effectiveElectrodeIsNeg ? '#1d4ed8' : '#b91c1c';
      ctx.beginPath();
      ctx.arc(rodX - 22, 25, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px monospace';
      ctx.fillText(effectiveElectrodeIsNeg ? '-' : '+', rodX - 25, 29);

      // Workpiece Sign
      ctx.fillStyle = effectiveElectrodeIsNeg ? '#b91c1c' : '#1d4ed8';
      ctx.beginPath();
      ctx.arc(40, workSurfaceY + 25, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.fillText(effectiveElectrodeIsNeg ? '+' : '-', 37, workSurfaceY + 29);

      // Oscilloscope Mini-Box for AC mode
      if (isAC) {
        ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
        ctx.fillRect(width - 130, 15, 115, 45);
        ctx.strokeStyle = '#475569';
        ctx.strokeRect(width - 130, 15, 115, 45);

        ctx.strokeStyle = '#c084fc';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let x = 0; x < 100; x++) {
          const y = 37 + Math.sin((x * 0.1) - (localTime * 4)) * 14;
          if (x === 0) ctx.moveTo(width - 122 + x, y);
          else ctx.lineTo(width - 122 + x, y);
        }
        ctx.stroke();

        ctx.fillStyle = '#c084fc';
        ctx.font = '8px monospace';
        ctx.fillText('AC 50Hz Wave', width - 122, 26);
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [activePolarity, isPlaying, simSpeed, amperage, arcLengthMm, showElectrons, showIons, showConvection, showHeatmap, currentRatio]);

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 space-y-5">
      {/* Visualizer Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-400" />
              Dynamic Polarity &amp; Weld Pool Fluid Physics Simulator
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time particle dynamics showing electron drift direction, positive ion bombardment, Marangoni convection, and crater geometry.
          </p>
        </div>

        {/* Polarity Mode Selector */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
          {(['DCEN', 'DCEP', 'AC'] as const).map((pol) => {
            const isSelected = activePolarity === pol;
            return (
              <button
                key={pol}
                onClick={() => setActivePolarity(pol)}
                className={`px-2.5 sm:px-3 py-1.5 rounded-md font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-850'
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

      {/* Simulator Control Toolbar */}
      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          {/* Playback Controls & Speed */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`min-h-[38px] px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-colors cursor-pointer active:scale-95 ${
                isPlaying
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'bg-emerald-600 text-white'
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause Motion' : 'Resume Sim'}</span>
            </button>

            {/* Speed Buttons */}
            <div className="flex items-center gap-1 bg-slate-900 px-2 py-1 rounded-lg border border-slate-800 text-[11px] font-mono min-h-[38px]">
              <span className="text-slate-500 mr-1 hidden xs:inline">Speed:</span>
              {[0.5, 1.0, 2.0].map((s) => (
                <button
                  key={s}
                  onClick={() => setSimSpeed(s)}
                  className={`px-2 py-1 rounded cursor-pointer transition-colors ${
                    simSpeed === s ? 'bg-slate-750 text-amber-400 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>

          {/* Real-time Sliders (Amperage & Arc Length) */}
          <div className="grid grid-cols-2 gap-3 w-full sm:w-auto sm:flex sm:items-center">
            <div className="flex items-center justify-between sm:justify-start gap-2 bg-slate-900/60 sm:bg-transparent px-2.5 sm:px-0 py-1.5 sm:py-0 rounded-lg">
              <span className="text-slate-400 font-medium text-[11px] sm:text-xs">Current:</span>
              <input
                type="range"
                min={70}
                max={220}
                value={amperage}
                onChange={(e) => setAmperage(Number(e.target.value))}
                className="w-16 sm:w-24 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <span className="font-mono font-bold text-amber-400 text-[11px] sm:text-xs min-w-[36px] text-right">{amperage}A</span>
            </div>

            <div className="flex items-center justify-between sm:justify-start gap-2 bg-slate-900/60 sm:bg-transparent px-2.5 sm:px-0 py-1.5 sm:py-0 rounded-lg">
              <span className="text-slate-400 font-medium text-[11px] sm:text-xs">Gap:</span>
              <input
                type="range"
                min={1.5}
                max={6.0}
                step={0.5}
                value={arcLengthMm}
                onChange={(e) => setArcLengthMm(Number(e.target.value))}
                className="w-16 sm:w-20 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <span className="font-mono font-bold text-cyan-400 text-[11px] sm:text-xs min-w-[38px] text-right">{arcLengthMm.toFixed(1)}mm</span>
            </div>
          </div>
        </div>

        {/* Layer Toggles */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-2 border-t border-slate-900 text-[11px]">
          <label className="flex items-center gap-1.5 text-slate-300 cursor-pointer min-h-[32px]">
            <input
              type="checkbox"
              checked={showElectrons}
              onChange={(e) => setShowElectrons(e.target.checked)}
              className="rounded bg-slate-850 text-amber-500 focus:ring-0 w-3.5 h-3.5"
            />
            <span>Electrons (e⁻)</span>
          </label>
          <label className="flex items-center gap-1.5 text-slate-300 cursor-pointer min-h-[32px]">
            <input
              type="checkbox"
              checked={showIons}
              onChange={(e) => setShowIons(e.target.checked)}
              className="rounded bg-slate-850 text-amber-500 focus:ring-0 w-3.5 h-3.5"
            />
            <span>Ions (X⁺)</span>
          </label>
          <label className="flex items-center gap-1.5 text-slate-300 cursor-pointer min-h-[32px]">
            <input
              type="checkbox"
              checked={showConvection}
              onChange={(e) => setShowConvection(e.target.checked)}
              className="rounded bg-slate-850 text-amber-500 focus:ring-0 w-3.5 h-3.5"
            />
            <span>Marangoni Flow</span>
          </label>
        </div>
      </div>

      {/* Main Simulation Viewport (Canvas + Physics HUD) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left 2 Cols: Live Canvas Stage */}
        <div className="lg:col-span-2 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between relative overflow-hidden">
          {/* Top Stage Badges */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2.5 z-10">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold border ${
                isDCEN
                  ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                  : isDCEP
                    ? 'bg-red-500/20 text-red-300 border-red-500/30'
                    : 'bg-purple-500/20 text-purple-300 border-purple-500/30'
              }`}>
                {isDCEN ? 'DCEN (Straight)' : isDCEP ? 'DCEP (Reverse)' : 'AC Polarity'}
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                {isDCEN ? 'Cathode = Rod, Anode = Work' : isDCEP ? 'Cathode = Work, Anode = Rod' : '50/60Hz Polarity Reversal'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-xs text-slate-300">
              <span className="text-slate-400">Deposition:</span>
              <strong className="text-emerald-400 font-bold">{burnoffRateKg} kg/h</strong>
            </div>
          </div>

          {/* HTML5 Canvas */}
          <div className="w-full flex justify-center items-center bg-[#090d16] rounded-xl overflow-hidden border border-slate-800 shadow-inner relative">
            <canvas
              ref={canvasRef}
              width={560}
              height={330}
              className="w-full max-w-lg h-auto block select-none"
            />

            {/* Desktop-only In-canvas probe overlay pins (hidden on mobile to prevent obscuring the arc) */}
            <div className="hidden sm:block absolute top-3 left-3 text-[10px] font-mono bg-slate-900/85 backdrop-blur px-2.5 py-1.5 rounded-lg border border-slate-800 text-slate-300 space-y-0.5 pointer-events-none shadow-md">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                <span>Electrons: <strong>{isDCEN ? 'Down (Rod → Work)' : isDCEP ? 'Up (Work → Rod)' : 'Oscillating'}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                <span>Positive Ions: <strong>{isDCEN ? 'Up to Rod' : isDCEP ? 'Down to Work' : 'Oscillating'}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                <span>Surface Action: <strong>{isDCEP ? 'Cathodic Oxide Cleaning' : 'High Thermal Digging'}</strong></span>
              </div>
            </div>
          </div>

          {/* Mobile-Only Live Particle Telemetry Card (placed safely below canvas so arc is 100% visible) */}
          <div className="sm:hidden mt-2.5 bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 text-[11px] font-mono space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0"></span>
                Electrons:
              </span>
              <strong className="text-slate-200">{isDCEN ? 'Down (Rod → Work)' : isDCEP ? 'Up (Work → Rod)' : 'Oscillating'}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2 h-2 rounded-full bg-orange-400 shrink-0"></span>
                Positive Ions:
              </span>
              <strong className="text-slate-200">{isDCEN ? 'Up to Rod' : isDCEP ? 'Down to Work' : 'Oscillating'}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2 h-2 rounded-full bg-yellow-400 shrink-0"></span>
                Surface Action:
              </span>
              <strong className="text-amber-300">{isDCEP ? 'Cathodic Oxide Cleaning' : 'High Thermal Digging'}</strong>
            </div>
          </div>

          {/* Microscopic Particle Legend */}
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] font-mono">
            <div className="bg-slate-900 p-2 rounded border border-slate-800 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-400 shrink-0"></span>
              <div>
                <strong className="text-white block">Electrons (e⁻)</strong>
                <span className="text-slate-400 text-[10px]">Mass: 9.1×10⁻³¹ kg (High speed)</span>
              </div>
            </div>
            <div className="bg-slate-900 p-2 rounded border border-slate-800 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-orange-500 shrink-0"></span>
              <div>
                <strong className="text-white block">Gas Ions (Ar⁺/Fe⁺)</strong>
                <span className="text-slate-400 text-[10px]">Mass: ~1800x heavy bombardment</span>
              </div>
            </div>
            <div className="bg-slate-900 p-2 rounded border border-slate-800 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-yellow-300 shrink-0"></span>
              <div>
                <strong className="text-white block">Molten Droplets</strong>
                <span className="text-slate-400 text-[10px]">Pinch-off transfer to puddle</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Live Thermodynamics & Weld Pool Geometry */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="border-b border-slate-850 pb-2">
              <span className="text-xs font-mono text-amber-400 font-bold block">
                THERMAL CONCENTRATION GAUGES
              </span>
              <h4 className="text-sm font-bold text-white">
                Anode Fall vs. Cathode Fall
              </h4>
            </div>

            {/* Workpiece Heat Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Workpiece Plate Absorption:</span>
                <span className="font-mono font-bold text-amber-400">{workHeat}% Total Heat</span>
              </div>
              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-500 to-red-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${workHeat}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-500">
                {isDCEN ? 'Anode bombardment: maximum deep base metal melt' : isDCEP ? 'Cathode spot: reduced base heat, wide surface puddle' : 'Equal 50/50 balance'}
              </span>
            </div>

            {/* Electrode Heat Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Consumable Electrode Rod:</span>
                <span className="font-mono font-bold text-cyan-400">{rodHeat}% Total Heat</span>
              </div>
              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${rodHeat}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-500">
                {isDCEP ? 'Anode heating: fast burn-off & high deposition rate' : isDCEN ? 'Cathode emission: slower rod melting rate' : 'Balanced rod burn-off'}
              </span>
            </div>

            {/* Real-time Calculated Bead Cross-Section Metrics */}
            <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
              <span className="text-slate-400 font-bold text-[11px] block border-b border-slate-800 pb-1">
                Calculated Bead Profile Dimensions:
              </span>
              <div className="flex justify-between">
                <span className="text-slate-400">Penetration Depth (h):</span>
                <strong className="text-white">{penetrationMm} mm</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Bead Width (w):</span>
                <strong className="text-white">{beadWidthMm} mm</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Aspect Ratio (w/h):</span>
                <strong className="text-amber-400">{(Number(beadWidthMm) / Number(penetrationMm)).toFixed(2)}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Fluid Flow Regime:</span>
                <strong className={isDCEN ? 'text-blue-400' : 'text-orange-400'}>
                  {isDCEN ? 'Inward Vortex (Digging)' : isDCEP ? 'Outward Vortex (Scouring)' : 'Pulsating Wave'}
                </strong>
              </div>
            </div>
          </div>

          {/* Suitable Electrodes Pill List */}
          <div className="pt-2 border-t border-slate-850 text-xs">
            <span className="text-slate-400 font-semibold block mb-1.5">
              Optimized Electrode Formulations:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {isDCEN && (
                <>
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-amber-300 font-mono text-[11px]">E6012 (Rutile)</span>
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-amber-300 font-mono text-[11px]">E7024 (Iron Powder)</span>
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-cyan-300 font-mono text-[11px]">GTAW Carbon Steel</span>
                </>
              )}
              {isDCEP && (
                <>
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-amber-300 font-mono text-[11px]">E7018 (Low-Hydrogen)</span>
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-amber-300 font-mono text-[11px]">E6010 (Cellulosic Pipe)</span>
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-emerald-300 font-mono text-[11px]">E308L Stainless Steel</span>
                </>
              )}
              {isAC && (
                <>
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-amber-300 font-mono text-[11px]">E6011 (Cellulosic AC)</span>
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-amber-300 font-mono text-[11px]">E6013 (General Rutile)</span>
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-purple-300 font-mono text-[11px]">E7018-AC Specialized</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3-Way Side-by-Side Weld Pool Geometry Comparison */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-amber-400" />
            Direct 3-Way Bead Geometry &amp; Heat Concentration Comparison
          </h4>
          <span className="text-[11px] font-mono text-slate-400">AWS Welding Handbook Fundamentals</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {/* 1. DCEN Box */}
          <div className={`p-3 rounded-xl border transition-all ${
            isDCEN ? 'bg-slate-900 border-amber-500/80 shadow-md' : 'bg-slate-900/50 border-slate-800'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <strong className="text-blue-400 font-mono">DCEN (Straight)</strong>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                Electrode (-) / Work (+)
              </span>
            </div>

            {/* Miniature Cross-Section SVG */}
            <svg viewBox="0 0 160 70" className="w-full h-14 bg-slate-950 rounded border border-slate-800 my-2">
              {/* Base plate */}
              <rect x="0" y="20" width="160" height="50" fill="#1e293b" />
              {/* Deep finger bead */}
              <path d="M 55 20 Q 80 65 105 20 Z" fill="#38bdf8" opacity="0.85" />
              {/* Weld crown */}
              <path d="M 55 20 Q 80 14 105 20 Z" fill="#0284c7" />
              {/* Electron arrow down */}
              <line x1="80" y1="5" x2="80" y2="17" stroke="#67e8f9" strokeWidth="2" strokeDasharray="2 2" />
              <polygon points="80,19 77,14 83,14" fill="#67e8f9" />
            </svg>

            <ul className="space-y-1 text-[11px] text-slate-300">
              <li>• <strong>Penetration:</strong> Deep, narrow finger profile</li>
              <li>• <strong>Heat:</strong> 70% in Base Plate / 30% in Rod</li>
              <li>• <strong>Burn-off:</strong> Slower electrode melt rate</li>
              <li>• <strong>Risk:</strong> High burn-through risk on thin plate</li>
            </ul>
          </div>

          {/* 2. DCEP Box */}
          <div className={`p-3 rounded-xl border transition-all ${
            isDCEP ? 'bg-slate-900 border-amber-500/80 shadow-md' : 'bg-slate-900/50 border-slate-800'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <strong className="text-red-400 font-mono">DCEP (Reverse)</strong>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-red-950 text-red-300 border border-red-800">
                Electrode (+) / Work (-)
              </span>
            </div>

            {/* Miniature Cross-Section SVG */}
            <svg viewBox="0 0 160 70" className="w-full h-14 bg-slate-950 rounded border border-slate-800 my-2">
              {/* Base plate */}
              <rect x="0" y="20" width="160" height="50" fill="#1e293b" />
              {/* Wide shallow/medium basin */}
              <path d="M 35 20 Q 80 46 125 20 Z" fill="#f87171" opacity="0.85" />
              {/* Higher crown buildup */}
              <path d="M 35 20 Q 80 8 125 20 Z" fill="#ef4444" />
              {/* Electron arrow up */}
              <line x1="80" y1="18" x2="80" y2="6" stroke="#fca5a5" strokeWidth="2" strokeDasharray="2 2" />
              <polygon points="80,4 77,9 83,9" fill="#fca5a5" />
            </svg>

            <ul className="space-y-1 text-[11px] text-slate-300">
              <li>• <strong>Penetration:</strong> Medium depth, wide scouring basin</li>
              <li>• <strong>Heat:</strong> 70% in Rod / 30% in Base Plate</li>
              <li>• <strong>Burn-off:</strong> Maximum rod melt &amp; deposition</li>
              <li>• <strong>Benefit:</strong> Cathodic cleaning of surface oxides</li>
            </ul>
          </div>

          {/* 3. AC Box */}
          <div className={`p-3 rounded-xl border transition-all ${
            isAC ? 'bg-slate-900 border-amber-500/80 shadow-md' : 'bg-slate-900/50 border-slate-800'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <strong className="text-purple-400 font-mono">AC (Alternating)</strong>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                50/60 Hz Reversal
              </span>
            </div>

            {/* Miniature Cross-Section SVG */}
            <svg viewBox="0 0 160 70" className="w-full h-14 bg-slate-950 rounded border border-slate-800 my-2">
              {/* Base plate */}
              <rect x="0" y="20" width="160" height="50" fill="#1e293b" />
              {/* Balanced intermediate bowl */}
              <path d="M 45 20 Q 80 54 115 20 Z" fill="#c084fc" opacity="0.85" />
              {/* Medium crown */}
              <path d="M 45 20 Q 80 11 115 20 Z" fill="#a855f7" />
              {/* Oscillating arrow */}
              <line x1="80" y1="5" x2="80" y2="18" stroke="#e9d5ff" strokeWidth="2" />
              <polygon points="80,19 77,15 83,15" fill="#e9d5ff" />
              <polygon points="80,4 77,8 83,8" fill="#e9d5ff" />
            </svg>

            <ul className="space-y-1 text-[11px] text-slate-300">
              <li>• <strong>Penetration:</strong> Balanced intermediate bowl profile</li>
              <li>• <strong>Heat:</strong> 50% in Base Plate / 50% in Rod</li>
              <li>• <strong>Burn-off:</strong> Moderate deposition rate</li>
              <li>• <strong>Supreme Advantage:</strong> Zero magnetic arc blow</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
