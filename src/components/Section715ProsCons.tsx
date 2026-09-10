import { useState } from 'react';
import { CheckCircle2, XCircle, Table, Eye } from 'lucide-react';
import { MACHINE_TYPES } from '../data/weldingData';

export default function Section715ProsCons() {
  const [activeView, setActiveView] = useState<'cards' | 'matrix'>('cards');
  const [selectedMachineId, setSelectedMachineId] = useState<string>('all');

  const filteredMachines = selectedMachineId === 'all'
    ? MACHINE_TYPES
    : MACHINE_TYPES.filter(m => m.id === selectedMachineId);

  return (
    <section id="section-7-1-5" className="space-y-6">
      {/* Section Header */}
      <div className="bg-slate-850 rounded-xl p-5 border border-slate-750 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-400 font-mono text-xs font-bold border border-amber-500/30">
              SOP Clause 7.1.5
            </span>
            <span className="text-xs text-slate-400 font-medium">Comparative Equipment Analysis</span>
          </div>
          <span className="text-xs text-slate-500 font-mono">AWS Welding Handbook / EN ISO Standards</span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          Advantages &amp; Disadvantages of the 5 Arc Welding Machine Types
        </h2>
        <p className="text-slate-300 text-sm mt-1 max-w-4xl">
          A rigorous comparative engineering evaluation covering Direct Current (DC), Alternating Current (AC), 
          Integrated AC/DC Multi-Process, Petrol/Diesel Engine DC Generators, and Electric Motor-Driven DC Generators.
        </p>
      </div>

      {/* View Mode & Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 p-3 rounded-xl border border-slate-800">
        {/* Machine Filter Dropdown / Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold text-slate-400 mr-1">Filter Machine:</span>
          <button
            onClick={() => setSelectedMachineId('all')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
              selectedMachineId === 'all'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-750'
            }`}
          >
            All 5 Machines
          </button>
          {MACHINE_TYPES.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedMachineId(m.id)}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                selectedMachineId === m.id
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-750'
              }`}
            >
              {m.shortName}
            </button>
          ))}
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => setActiveView('cards')}
            className={`px-3 py-1 rounded font-medium flex items-center gap-1.5 cursor-pointer ${
              activeView === 'cards'
                ? 'bg-slate-800 text-white font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Detailed Cards
          </button>
          <button
            onClick={() => setActiveView('matrix')}
            className={`px-3 py-1 rounded font-medium flex items-center gap-1.5 cursor-pointer ${
              activeView === 'matrix'
                ? 'bg-slate-800 text-white font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            Comparison Matrix
          </button>
        </div>
      </div>

      {/* Cards View */}
      {activeView === 'cards' && (
        <div className="space-y-6">
          {filteredMachines.map((machine, idx) => (
            <div
              key={machine.id}
              id={`machine-card-${machine.id}`}
              className="bg-slate-900 rounded-xl border border-slate-800 p-5 space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-amber-400">
                      Machine 0{idx + 1}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                      Output: {machine.outputCurrent}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Efficiency: {machine.efficiency}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {machine.name}
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-slate-400">Cost: <strong className="text-amber-400">{machine.costTier}</strong></span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-400">Portability: <strong className="text-slate-200">{machine.portability}</strong></span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-400">Arc Blow: <strong className={machine.arcBlowVulnerability === 'None (AC)' ? 'text-emerald-400' : 'text-amber-400'}>{machine.arcBlowVulnerability}</strong></span>
                </div>
              </div>

              {/* Side-by-Side Pros & Cons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Advantages */}
                <div className="bg-slate-950 p-4 rounded-xl border border-emerald-950/60 space-y-2.5">
                  <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Engineering Advantages:
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {machine.advantages.map((adv, i) => (
                      <li key={i} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-emerald-400 font-bold mt-0.5">•</span>
                        <span>{adv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Disadvantages */}
                <div className="bg-slate-950 p-4 rounded-xl border border-red-950/60 space-y-2.5">
                  <h4 className="text-xs font-bold text-red-400 flex items-center gap-1.5 uppercase tracking-wider">
                    <XCircle className="w-4 h-4 text-red-400" />
                    Engineering Disadvantages &amp; Limitations:
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {machine.disadvantages.map((dis, i) => (
                      <li key={i} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-red-400 font-bold mt-0.5">•</span>
                        <span>{dis}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Common Industry Applications */}
              <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80 text-xs text-slate-300 flex flex-wrap items-center gap-2">
                <span className="font-semibold text-slate-400">Prime Industry Applications:</span>
                {machine.commonApplications.map((app, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
                    {app}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Comparison Matrix View */}
      {activeView === 'matrix' && (
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-300 min-w-[700px]">
            <thead className="text-[11px] uppercase bg-slate-950 text-slate-400 border-b border-slate-800 font-mono">
              <tr>
                <th className="py-3 px-3">Machine Type</th>
                <th className="py-3 px-3">Output Type</th>
                <th className="py-3 px-3">Efficiency</th>
                <th className="py-3 px-3">Arc Blow Risk</th>
                <th className="py-3 px-3">Portability</th>
                <th className="py-3 px-3">Relative Cost</th>
                <th className="py-3 px-3">Grid Independence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {MACHINE_TYPES.map((m) => (
                <tr key={m.id} className="hover:bg-slate-850/50 transition-colors">
                  <td className="py-3 px-3 font-semibold text-white">
                    {m.shortName}
                  </td>
                  <td className="py-3 px-3 font-mono text-amber-400">
                    {m.outputCurrent}
                  </td>
                  <td className="py-3 px-3 font-mono">
                    {m.efficiency}
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                      m.arcBlowVulnerability === 'None (AC)'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {m.arcBlowVulnerability}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    {m.portability}
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-amber-400">
                    {m.costTier}
                  </td>
                  <td className="py-3 px-3">
                    {m.id === 'engine-driven-generator' ? (
                      <span className="text-emerald-400 font-semibold">100% Independent (Fuel)</span>
                    ) : (
                      <span className="text-slate-400">Requires AC Mains Grid</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
