import { useState } from 'react';
import { Award, CheckCircle2, XCircle, Building2, ShieldCheck, Factory, Gauge } from 'lucide-react';
import { WELDING_JOINTS } from '../data/weldingData';
import { WeldingJoint } from '../types';

export default function Section719JointUses() {
  const [selectedJointId, setSelectedJointId] = useState<string>('butt-joint');

  const currentJoint: WeldingJoint = WELDING_JOINTS.find(j => j.id === selectedJointId) || WELDING_JOINTS[0];

  return (
    <section id="section-7-1-9" className="space-y-6">
      {/* Section Header */}
      <div className="bg-slate-850 rounded-xl p-5 border border-slate-750 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-400 font-mono text-xs font-bold border border-amber-500/30">
              SOP Clause 7.1.9
            </span>
            <span className="text-xs text-slate-400 font-medium">Mechanical Performance &amp; Applications</span>
          </div>
          <span className="text-xs text-slate-500 font-mono">AISC 360 / AWS D1.1 / ASME Section VIII</span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          Advantages and Industrial Uses of Every Joint
        </h2>
        <p className="text-slate-300 text-sm mt-1 max-w-4xl">
          Selecting the appropriate joint configuration balances tensile load capacity, fatigue resistance under cyclic stresses, 
          edge preparation costs, and accessibility during fabrication.
        </p>
      </div>

      {/* Joint Switcher Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-900 p-2 rounded-xl border border-slate-800">
        {WELDING_JOINTS.map((joint) => {
          const isSelected = joint.id === selectedJointId;
          return (
            <button
              key={joint.id}
              onClick={() => setSelectedJointId(joint.id)}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                isSelected
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Factory className="w-3.5 h-3.5" />
              {joint.name}
            </button>
          );
        })}
      </div>

      {/* Deep-Dive Card for the Selected Joint */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono text-amber-400 font-bold block mb-1">
              Engineering Profile &amp; Load Analysis
            </span>
            <h3 className="text-lg font-bold text-white">
              {currentJoint.name} ({currentJoint.aka})
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
              {currentJoint.description}
            </p>
          </div>

          {/* Strength Ratings Box */}
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs font-mono space-y-1">
            <div className="flex justify-between gap-4 text-slate-400">
              <span>Tensile Efficiency:</span>
              <strong className="text-emerald-400">{currentJoint.strengthCharacteristics.tensile}</strong>
            </div>
            <div className="flex justify-between gap-4 text-slate-400">
              <span>Fatigue Resistance:</span>
              <strong className="text-cyan-400">{currentJoint.strengthCharacteristics.fatigue}</strong>
            </div>
            <div className="flex justify-between gap-4 text-slate-400">
              <span>Shear Strength:</span>
              <strong className="text-amber-400">{currentJoint.strengthCharacteristics.shear}</strong>
            </div>
          </div>
        </div>

        {/* Advantages & Limitations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Engineering Advantages */}
          <div className="bg-slate-950 p-4 rounded-xl border border-emerald-950/60 space-y-3">
            <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Key Engineering Advantages:
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {currentJoint.advantages.map((adv, i) => (
                <li key={i} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-emerald-400 font-bold mt-0.5">•</span>
                  <span>{adv}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Engineering Disadvantages */}
          <div className="bg-slate-950 p-4 rounded-xl border border-red-950/60 space-y-3">
            <h4 className="text-xs font-bold text-red-400 flex items-center gap-1.5 uppercase tracking-wider">
              <XCircle className="w-4 h-4 text-red-400" />
              Engineering Limitations &amp; Disadvantages:
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {currentJoint.disadvantages.map((dis, i) => (
                <li key={i} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-red-400 font-bold mt-0.5">•</span>
                  <span>{dis}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Real-World Industrial Uses */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
          <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
            <Building2 className="w-4 h-4 text-amber-400" />
            Mandatory Industrial &amp; Field Uses:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-300">
            {currentJoint.industrialUses.map((use, i) => (
              <div key={i} className="bg-slate-900 p-2.5 rounded border border-slate-800 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"></span>
                <span>{use}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comprehensive 5-Joint Comparative Matrix Table */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 overflow-x-auto space-y-3">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          Master Joint Suitability &amp; Stress Path Summary Table:
        </h4>
        <table className="w-full text-xs text-left text-slate-300 min-w-[700px]">
          <thead className="text-[11px] uppercase bg-slate-950 text-slate-400 border-b border-slate-800 font-mono">
            <tr>
              <th className="py-3 px-3">Joint Type</th>
              <th className="py-3 px-3">Edge Prep Needed</th>
              <th className="py-3 px-3">Tensile Efficiency</th>
              <th className="py-3 px-3">Fatigue Resistance</th>
              <th className="py-3 px-3">Distortion Risk</th>
              <th className="py-3 px-3">Primary Sector</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {WELDING_JOINTS.map((j) => (
              <tr key={j.id} className="hover:bg-slate-850/50 transition-colors">
                <td className="py-3 px-3 font-semibold text-white">
                  {j.name}
                </td>
                <td className="py-3 px-3 text-slate-400">
                  {j.id === 'butt-joint' ? 'High (Beveling 60°)' : j.id === 'lap-joint' ? 'None (Square shear)' : 'Low to Medium'}
                </td>
                <td className="py-3 px-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    j.strengthCharacteristics.tensile === 'Excellent'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-300'
                  }`}>
                    {j.strengthCharacteristics.tensile}
                  </span>
                </td>
                <td className="py-3 px-3 font-mono">
                  {j.strengthCharacteristics.fatigue}
                </td>
                <td className="py-3 px-3 text-slate-400">
                  {j.id === 'butt-joint' ? 'Angular butterfly' : j.id === 'corner-joint' ? 'High corner tilt' : 'Moderate'}
                </td>
                <td className="py-3 px-3 text-amber-400">
                  {j.industrialUses[0].split(' (')[0]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
