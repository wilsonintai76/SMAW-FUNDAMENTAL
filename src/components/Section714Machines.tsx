import { useState } from 'react';
import { Layers, ShieldCheck, Zap, Activity, BatteryCharging, Fuel, RefreshCw, FileText } from 'lucide-react';
import { MACHINE_TYPES } from '../data/weldingData';
import { MachineType } from '../types';

export default function Section714Machines() {
  const [selectedMachineId, setSelectedMachineId] = useState<string>('dc-rectifier');

  const activeMachine: MachineType = MACHINE_TYPES.find(m => m.id === selectedMachineId) || MACHINE_TYPES[0];

  return (
    <section id="section-7-1-4" className="space-y-6">
      {/* Section Header */}
      <div className="bg-slate-850 rounded-xl p-5 border border-slate-750 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-400 font-mono text-xs font-bold border border-amber-500/30">
              SOP Clause 7.1.4
            </span>
            <span className="text-xs text-slate-400 font-medium">Power Source Classification & Standards</span>
          </div>
          <span className="text-xs text-slate-500 font-mono">EN 60974-1 / IEC 60974-1 / NEMA EW-1 / AWS D1.1</span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          Five Types of Arc Welding Machines &amp; Working Principles
        </h2>
        <p className="text-slate-300 text-sm mt-1 max-w-4xl">
          Arc welding power sources are classified by their electrical power conversion topology and primary energy source. 
          Each machine type operates under distinct electro-mechanical principles governed by recognized national and international engineering codes.
        </p>
      </div>

      {/* Machine Type Selector Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {MACHINE_TYPES.map((m, idx) => {
          const isSelected = m.id === selectedMachineId;
          return (
            <button
              key={m.id}
              onClick={() => setSelectedMachineId(m.id)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-amber-500/15 border-amber-500 text-white shadow-sm'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <div>
                <span className="text-[10px] font-mono text-amber-400 block mb-1">
                  Type 0{idx + 1}
                </span>
                <span className="text-xs font-bold block leading-snug line-clamp-2">
                  {m.shortName}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-[10px]">
                <span className="font-mono text-slate-400">{m.outputCurrent}</span>
                <span className={`px-1.5 py-0.5 rounded ${isSelected ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800'}`}>
                  Select
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Machine Working Principle Detail Card */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Output: {activeMachine.outputCurrent}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Efficiency: {activeMachine.efficiency}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Portability: {activeMachine.portability}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              {activeMachine.name}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Primary Power Source: <span className="text-slate-200 font-medium">{activeMachine.electricalSource}</span>
            </p>
          </div>
        </div>

        {/* Electrical Flow Topology Diagram */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
          <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5" />
            Internal Electro-Mechanical Energy Flow:
          </span>
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800/80 font-mono text-xs text-slate-200 leading-relaxed overflow-x-auto">
            {activeMachine.internalMechanism}
          </div>
        </div>

        {/* Working Principle Narrative */}
        <div className="space-y-2">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            Detailed Working Principle:
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-850 p-4 rounded-xl border border-slate-750">
            {activeMachine.workingPrinciple}
          </p>
        </div>

        {/* International & National Recognized Standards Section */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Recognized International &amp; National Standards:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {activeMachine.standards.map((std, i) => (
              <div key={i} className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-mono font-bold text-amber-400">
                      {std.code}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-300 block mb-1">
                    {std.organization}
                  </span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {std.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Industrial Applications Checklist */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
          <span className="text-xs font-bold text-slate-300 block mb-2">
            Primary Industrial &amp; Field Applications:
          </span>
          <div className="flex flex-wrap gap-2">
            {activeMachine.commonApplications.map((app, i) => (
              <span key={i} className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                {app}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
