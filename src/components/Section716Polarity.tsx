import PolaritySvgSimulation from './PolaritySvgSimulation';
import PolarityInteractiveSimulation from './PolarityInteractiveSimulation';
import PolarityCircuitSchematic from './PolarityCircuitSchematic';

export default function Section716Polarity() {
  return (
    <section id="section-7-1-6" className="space-y-6">
      {/* Section Header */}
      <div className="bg-slate-850 rounded-xl p-5 border border-slate-750 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-400 font-mono text-xs font-bold border border-amber-500/30">
              SOP Clause 7.1.6
            </span>
            <span className="text-xs text-slate-400 font-medium">Electrical Physics &amp; Terminology</span>
          </div>
          <span className="text-xs text-slate-500 font-mono">AWS A3.0 Standard Welding Terms / AWS D1.1</span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          Terminology &amp; Characteristics of Polarity (Straight vs. Reverse vs. AC)
        </h2>
        <p className="text-slate-300 text-sm mt-1 max-w-4xl">
          Polarity refers to the direction of direct current (DC) electrical flow in the welding circuit. 
          The polarity chosen fundamentally dictates whether thermal energy concentrates in the base metal or the consumable electrode, 
          governing penetration depth, deposition speed, and susceptibility to magnetic arc blow.
        </p>
      </div>

      {/* Interactive SVG Polarity & Heat Distribution Simulation */}
      <PolaritySvgSimulation />

      {/* Real-Time Weld Pool & Electron Movement Physics Simulation Engine */}
      <PolarityInteractiveSimulation />

      {/* Interactive Power Source & Cable Terminal Circuit Schematic */}
      <PolarityCircuitSchematic />
    </section>
  );
}
