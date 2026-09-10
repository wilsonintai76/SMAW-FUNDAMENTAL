import { Zap, Sliders, Cpu, Layers, Scale, Compass, CheckSquare, Crosshair, Award, ArrowRight, ShieldCheck, ShieldAlert, BookOpen } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SectionId } from '../types';
import { SECTIONS_META } from '../data/weldingData';

interface OverviewDashboardProps {
  onSelectSection: (id: SectionId) => void;
  onOpenCalc: () => void;
  onOpenChecklist: () => void;
  onOpenQuiz: () => void;
  onOpenSafety?: () => void;
  onOpenGlossary?: () => void;
}

const SECTION_ICONS: Partial<Record<SectionId, LucideIcon>> = {
  '7.1.1': Zap,
  '7.1.2': Sliders,
  '7.1.3': Cpu,
  '7.1.4': Layers,
  '7.1.5': Scale,
  '7.1.6': Compass,
  '7.1.7': CheckSquare,
  '7.1.8': Crosshair,
  '7.1.9': Award
};

export default function OverviewDashboard({
  onSelectSection,
  onOpenCalc,
  onOpenChecklist,
  onOpenQuiz,
  onOpenSafety,
  onOpenGlossary
}: OverviewDashboardProps) {
  return (
    <div className="space-y-8">
      {/* Executive Industrial Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-750 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded bg-amber-500 text-slate-950 font-mono text-xs font-bold shadow-sm">
              TECHNICAL SOP 7.1
            </span>
            <span className="text-xs text-amber-400/90 font-mono font-medium">
              AWS D1.1 / ASME Section IX / ISO 4063 (111) / OSHA 1910.252
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            Manage Shielded Metal Arc Welding (SMAW) According to Standard Operating Procedure
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Welcome to the comprehensive technical operating and training reference for manual metal arc welding (Process 111). 
            This standard operating framework details the fundamental arc column physics, ampere calibration laws, equipment architecture, 
            polarity dynamics, labeled process anatomy, five-phase pre-welding procedures, and the engineering design of the five basic joints.
          </p>

          {/* Quick Action Buttons (Optimized for Mobile Phone Grids and Desktop Strips) */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 pt-2">
            <button
              onClick={() => onSelectSection('7.1.1')}
              className="col-span-2 sm:col-span-1 min-h-[44px] px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:bg-amber-450 text-slate-950 font-black text-xs flex items-center justify-center sm:justify-start gap-2 transition-all cursor-pointer shadow-md active:scale-[0.98]"
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span className="sm:hidden">Start Technical Guide (7.1.1)</span>
              <span className="hidden sm:inline">Begin Technical Guide (7.1.1)</span>
            </button>

            {onOpenSafety && (
              <button
                onClick={onOpenSafety}
                className="min-h-[44px] px-3 sm:px-4 py-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 active:bg-red-500/40 text-red-300 font-bold text-xs flex items-center justify-center sm:justify-start gap-2 transition-all cursor-pointer border border-red-500/40 active:scale-[0.98]"
              >
                <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                <span className="sm:hidden">Safety &amp; PPE</span>
                <span className="hidden sm:inline">Safety Protocols &amp; PPE</span>
              </button>
            )}

            <button
              onClick={onOpenCalc}
              className="min-h-[44px] px-3 sm:px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 active:bg-slate-700 text-white font-bold text-xs flex items-center justify-center sm:justify-start gap-2 transition-all cursor-pointer border border-slate-750 active:scale-[0.98]"
            >
              <Sliders className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="sm:hidden">Ampere Calc</span>
              <span className="hidden sm:inline">Ampere Calculator</span>
            </button>

            <button
              onClick={onOpenChecklist}
              className="min-h-[44px] px-3 sm:px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 active:bg-slate-700 text-white font-bold text-xs flex items-center justify-center sm:justify-start gap-2 transition-all cursor-pointer border border-slate-750 active:scale-[0.98]"
            >
              <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="sm:hidden">Pre-Weld SOP</span>
              <span className="hidden sm:inline">Pre-Weld Safety Audit</span>
            </button>

            <button
              onClick={onOpenQuiz}
              className="min-h-[44px] px-3 sm:px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 active:bg-slate-700 text-white font-bold text-xs flex items-center justify-center sm:justify-start gap-2 transition-all cursor-pointer border border-slate-750 active:scale-[0.98]"
            >
              <Award className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="sm:hidden">Mastery Quiz</span>
              <span className="hidden sm:inline">10-Question Quiz</span>
            </button>

            {onOpenGlossary && (
              <button
                onClick={onOpenGlossary}
                className="col-span-2 sm:col-span-1 min-h-[44px] px-3 sm:px-4 py-2.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 active:bg-purple-500/40 text-purple-300 font-bold text-xs flex items-center justify-center sm:justify-start gap-2 transition-all cursor-pointer border border-purple-500/40 active:scale-[0.98]"
              >
                <BookOpen className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="sm:hidden">Technical Glossary</span>
                <span className="hidden sm:inline">Technical Glossary (AWS A3.0)</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid of the 9 Clauses */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" />
            Standard Operating Procedure Modules (7.1.1 to 7.1.9)
          </h3>
          <span className="text-xs text-slate-400 font-mono">9 Verified Technical Clauses</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SECTIONS_META.filter(s => s.id !== 'overview').map((sec) => {
            const Icon = SECTION_ICONS[sec.id] || Zap;
            return (
              <div
                key={sec.id}
                onClick={() => onSelectSection(sec.id as SectionId)}
                className="bg-slate-900 hover:bg-slate-850 p-5 rounded-xl border border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {sec.code}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                    {sec.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {sec.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-850 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Icon className="w-3.5 h-3.5 text-amber-400" />
                    Interactive Module
                  </span>
                  <span className="font-mono group-hover:text-slate-300 transition-colors">Explore →</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* The Five Golden Rules of SMAW (SOP Shop-Floor Standards) */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-amber-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            The Five Golden Operational Rules of Shielded Metal Arc Welding (SOP Mandates)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
            <span className="text-amber-400 font-bold block">1. Arc Length Rule</span>
            <p className="text-slate-300 leading-relaxed">
              Always maintain an arc length equal to the core wire diameter. E.g. a 3.2mm rod demands a 3mm arc gap to prevent spatter and voltage drop.
            </p>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
            <span className="text-cyan-400 font-bold block">2. Travel Drag Angle</span>
            <p className="text-slate-300 leading-relaxed">
              Hold the electrode at a 70°–80° inclination in the direction of travel. This ensures arc force pushes molten slag behind the puddle.
            </p>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
            <span className="text-emerald-400 font-bold block">3. Amperage Formula</span>
            <p className="text-slate-300 leading-relaxed">
              Calibrate roughly 35 to 40 Amperes per millimeter of core diameter (e.g. 3.2mm × 38A = ~120A). Reduce 12% for vertical/overhead passes.
            </p>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
            <span className="text-orange-400 font-bold block">4. Direct Ground Contact</span>
            <p className="text-slate-300 leading-relaxed">
              Clamp the return lead directly to clean, bare, rust-free workpiece steel. Never clamp to conduit, pipes, or machine bearings.
            </p>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
            <span className="text-purple-400 font-bold block">5. Rod Oven Baking</span>
            <p className="text-slate-300 leading-relaxed">
              Store basic low-hydrogen rods (AWS E7018) in holding ovens at 120°C (250°F) to prevent atmospheric moisture pickup and underbead cracking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
