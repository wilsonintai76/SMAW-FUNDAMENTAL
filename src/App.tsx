import { lazy, Suspense, useState } from 'react';
import { SectionId } from './types';
import { SECTIONS_META, SECTION_ORDER } from './data/weldingData';
import Navbar from './components/Navbar';
import OverviewDashboard from './components/OverviewDashboard';
import { ChevronLeft, ChevronRight, ShieldAlert, Flame, Printer } from 'lucide-react';

// Clause views and modals are code-split so only the clause the user is reading
// (plus the shell) is downloaded on first paint.
const Section711Principles = lazy(() => import('./components/Section711Principles'));
const Section712Amperage = lazy(() => import('./components/Section712Amperage'));
const Section713Components = lazy(() => import('./components/Section713Components'));
const Section714Machines = lazy(() => import('./components/Section714Machines'));
const Section715ProsCons = lazy(() => import('./components/Section715ProsCons'));
const Section716Polarity = lazy(() => import('./components/Section716Polarity'));
const Section717ProcessAndSOP = lazy(() => import('./components/Section717ProcessAndSOP'));
const Section718Joints = lazy(() => import('./components/Section718Joints'));
const Section719JointUses = lazy(() => import('./components/Section719JointUses'));
const InteractiveParameterCalc = lazy(() => import('./components/InteractiveParameterCalc'));
const MasteryQuiz = lazy(() => import('./components/MasteryQuiz'));
const SafetyProtocolPanel = lazy(() => import('./components/SafetyProtocolPanel'));
const TechnicalGlossary = lazy(() => import('./components/TechnicalGlossary'));
const PrintHelperModal = lazy(() => import('./components/PrintHelperModal'));

function LoadingPanel() {
  return (
    <div className="flex items-center justify-center gap-3 py-24" role="status" aria-live="polite">
      <div className="w-7 h-7 rounded-full border-2 border-slate-700 border-t-amber-500 animate-spin" />
      <span className="text-xs font-mono text-slate-400">Loading clause data…</span>
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('overview');
  const [isCalcOpen, setIsCalcOpen] = useState<boolean>(false);
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);
  const [isSafetyOpen, setIsSafetyOpen] = useState<boolean>(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState<boolean>(false);
  const [isPrintHelperOpen, setIsPrintHelperOpen] = useState<boolean>(false);

  const handlePrint = () => {
    // Detect if we are inside an iFrame sandbox
    const isInIFrame = typeof window !== 'undefined' && window.self !== window.top;
    if (isInIFrame) {
      setIsPrintHelperOpen(true);
    } else {
      window.print();
    }
  };

  // Clause ordered list for next/previous navigation (single source of truth)
  const orderedSections = SECTION_ORDER;
  const lastClauseCode = SECTIONS_META[SECTIONS_META.length - 1].code;

  const currentIndex = orderedSections.indexOf(activeSection);
  const prevSection = currentIndex > 0 ? orderedSections[currentIndex - 1] : null;
  const nextSection = currentIndex < orderedSections.length - 1 ? orderedSections[currentIndex + 1] : null;

  const currentMeta = SECTIONS_META.find(s => s.id === activeSection);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar
        activeSection={activeSection}
        onSelectSection={(id) => {
          setActiveSection(id);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenCalc={() => setIsCalcOpen(true)}
        onOpenChecklist={() => {
          setActiveSection('7.1.7');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenSafety={() => setIsSafetyOpen(true)}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
        onPrint={handlePrint}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-8 space-y-6 sm:space-y-8 pb-24 md:pb-8">
        {/* Printable-only Archival Document Header */}
        <div className="hidden print:block border-b-2 border-black pb-4 mb-6">
          <div className="flex justify-between items-baseline">
            <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-slate-700">AWS D1.1 TECHNICAL COMPLIANCE MANUAL</span>
            <span className="text-[10px] font-mono text-slate-700">{new Date().toLocaleString()}</span>
          </div>
          <h1 className="text-2xl font-black text-black mt-2 uppercase tracking-tight">
            SOP Clause {currentMeta?.code || 'Overview'}: {currentMeta?.title || 'System Dashboard'}
          </h1>
          <div className="mt-1.5 flex gap-4 text-[10px] font-mono text-slate-600">
            <span>Process: SMAW / MMAW (111)</span>
            <span>•</span>
            <span>Standard: AWS D1.1 / ASME Section IX</span>
            <span>•</span>
            <span>Document ID: SMAW-SOP-71-{activeSection.replace(/\./g, '')}</span>
          </div>
        </div>

        {/* Screen-only Workspace Breadcrumb Utility Bar */}
        <div className="hidden md:flex items-center justify-between bg-slate-900/40 border border-slate-850 px-4 py-2.5 rounded-xl print:hidden">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="font-semibold text-slate-300">SOP Workspace</span>
            <span>&gt;</span>
            <span className="font-mono text-amber-400 font-semibold bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
              Clause {currentMeta?.code || 'Overview'}
            </span>
            <span>&gt;</span>
            <span className="text-slate-300 font-medium">{currentMeta?.shortTitle || 'Overview Dashboard'}</span>
          </div>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-amber-400 border border-slate-700 transition-all text-xs font-semibold cursor-pointer active:scale-95"
            title="Export/Print Current Clause"
          >
            <Printer className="w-3.5 h-3.5 text-amber-500" />
            <span>Print Clause</span>
          </button>
        </div>

        {/* Render View Based on Active Section */}
        {activeSection === 'overview' && (
          <OverviewDashboard
            onSelectSection={(id) => {
              setActiveSection(id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenCalc={() => setIsCalcOpen(true)}
            onOpenChecklist={() => {
              setActiveSection('7.1.7');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenQuiz={() => setIsQuizOpen(true)}
            onOpenSafety={() => setIsSafetyOpen(true)}
            onOpenGlossary={() => setIsGlossaryOpen(true)}
          />
        )}

        {activeSection === '7.1.1' && <Suspense fallback={<LoadingPanel />}><Section711Principles /></Suspense>}
        {activeSection === '7.1.2' && <Suspense fallback={<LoadingPanel />}><Section712Amperage /></Suspense>}
        {activeSection === '7.1.3' && <Suspense fallback={<LoadingPanel />}><Section713Components /></Suspense>}
        {activeSection === '7.1.4' && <Suspense fallback={<LoadingPanel />}><Section714Machines /></Suspense>}
        {activeSection === '7.1.5' && <Suspense fallback={<LoadingPanel />}><Section715ProsCons /></Suspense>}
        {activeSection === '7.1.6' && <Suspense fallback={<LoadingPanel />}><Section716Polarity /></Suspense>}
        {activeSection === '7.1.7' && <Suspense fallback={<LoadingPanel />}><Section717ProcessAndSOP onOpenSafety={() => setIsSafetyOpen(true)} /></Suspense>}
        {activeSection === '7.1.8' && <Suspense fallback={<LoadingPanel />}><Section718Joints /></Suspense>}
        {activeSection === '7.1.9' && <Suspense fallback={<LoadingPanel />}><Section719JointUses /></Suspense>}

        {/* Stepper Navigation (Next / Previous Clause) - Desktop only (Mobile utilizes the persistent sticky bottom bar) */}
        {activeSection !== 'overview' && (
          <div className="hidden md:flex pt-6 border-t border-slate-800 items-center justify-between gap-2.5">
            {prevSection ? (
              <button
                id="btn-prev-clause"
                onClick={() => {
                  setActiveSection(prevSection);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="min-h-[44px] px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 active:bg-slate-800 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-2 border border-slate-800 transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <ChevronLeft className="w-4 h-4 shrink-0 text-slate-400" />
                <span className="text-slate-400">Previous:</span>
                <span>
                  {SECTIONS_META.find(s => s.id === prevSection)?.shortTitle || 'Overview'}
                </span>
              </button>
            ) : <div />}

            <div className="text-center">
              <span className="text-xs font-mono text-slate-400">
                Standard Progress: Clause {currentMeta?.code} of {lastClauseCode}
              </span>
            </div>

            {nextSection ? (
              <button
                id="btn-next-clause"
                onClick={() => {
                  setActiveSection(nextSection);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="min-h-[44px] px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 active:bg-amber-450 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <span>Next:</span>
                <span>
                  {SECTIONS_META.find(s => s.id === nextSection)?.shortTitle}
                </span>
                <ChevronRight className="w-4 h-4 shrink-0" />
              </button>
            ) : (
              <button
                id="btn-finish-quiz"
                onClick={() => setIsQuizOpen(true)}
                className="min-h-[44px] px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <span>Mastery Certification Quiz</span>
                <ChevronRight className="w-4 h-4 shrink-0" />
              </button>
            )}
          </div>
        )}
      </main>

      {/* Sticky Bottom Navigation Bar on Mobile (Phones & Small Tablets) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-slate-900/98 backdrop-blur-xl border-t border-slate-800 px-3 py-2 flex items-center justify-between gap-2 shadow-2xl safe-area-bottom">
        {/* Mobile Prev Button */}
        <button
          onClick={() => {
            if (prevSection) {
              setActiveSection(prevSection);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          disabled={!prevSection}
          className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1 border shrink-0 transition-all ${
            prevSection 
              ? 'bg-slate-850 text-white border-slate-750 active:scale-95 cursor-pointer shadow-sm' 
              : 'bg-slate-900/40 text-slate-600 border-slate-850 cursor-not-allowed opacity-40'
          }`}
          aria-label="Previous section"
        >
          <ChevronLeft className="w-4 h-4 shrink-0" />
          <span>Prev</span>
        </button>

        {/* Mobile Center SOP Indicator / Home Button */}
        <button
          onClick={() => {
            setActiveSection('overview');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="min-h-[44px] px-2.5 py-1 rounded-xl flex flex-col items-center justify-center flex-1 min-w-0 hover:bg-slate-800/80 active:bg-slate-800 border border-slate-800/80 transition-colors"
          title="Return to SOP Overview"
        >
          <span className="text-[10px] font-mono text-amber-400 font-black tracking-wide leading-none">
            {activeSection === 'overview' ? 'SOP OVERVIEW' : `CLAUSE ${currentMeta?.code}`}
          </span>
          <span className="text-[11px] text-slate-200 font-medium truncate max-w-[140px] leading-tight mt-0.5">
            {activeSection === 'overview' ? 'All 9 Clauses' : currentMeta?.shortTitle}
          </span>
        </button>

        {/* Mobile Quick Safety Trigger */}
        <button
          onClick={() => setIsSafetyOpen(true)}
          aria-label="Safety & PPE matrix"
          className="min-h-[44px] px-2.5 py-2 rounded-xl bg-red-500/15 border border-red-500/35 text-red-400 active:scale-95 transition-all cursor-pointer flex items-center justify-center shrink-0"
          title="Open Safety Protocols"
        >
          <ShieldAlert className="w-4 h-4" />
        </button>

        {/* Mobile Next or Quiz Button */}
        <button
          onClick={() => {
            if (nextSection) {
              setActiveSection(nextSection);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              setIsQuizOpen(true);
            }
          }}
          className="min-h-[44px] px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 active:bg-amber-350 text-slate-950 text-xs font-black shadow-md cursor-pointer flex items-center gap-1 shrink-0 active:scale-95 transition-all"
        >
          <span>{nextSection ? 'Next' : 'Quiz'}</span>
          <ChevronRight className="w-4 h-4 shrink-0" />
        </button>
      </div>

      {/* Parameter Calculator Modal */}

      {isCalcOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-3xl w-full my-8">
            <Suspense fallback={null}>
              <InteractiveParameterCalc onClose={() => setIsCalcOpen(false)} />
            </Suspense>
          </div>
        </div>
      )}

      {/* Quiz Assessment Modal */}
      {isQuizOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-2xl w-full my-8">
            <Suspense fallback={null}>
              <MasteryQuiz onClose={() => setIsQuizOpen(false)} />
            </Suspense>
          </div>
        </div>
      )}

      {/* Safety Protocol Slide-out Panel / Overlay */}
      <Suspense fallback={null}>
        <SafetyProtocolPanel
          isOpen={isSafetyOpen}
          onClose={() => setIsSafetyOpen(false)}
        />
      </Suspense>

      {/* Technical Glossary Modal */}
      <Suspense fallback={null}>
        <TechnicalGlossary
          isOpen={isGlossaryOpen}
          onClose={() => setIsGlossaryOpen(false)}
          onNavigateToSection={(sectionId) => {
            setActiveSection(sectionId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </Suspense>

      {/* Industrial Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 pt-6 pb-24 md:py-6 px-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-500" />
            <span className="text-slate-300 font-semibold">
              SMAW FUNDAMENTAL (SOP 7.1) Technical Operating Guide
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-slate-500 font-mono text-[11px]">
            <span>AWS D1.1/D1.1M</span>
            <span>•</span>
            <span>ISO 4063 Process 111</span>
            <span>•</span>
            <span>EN 60974-1</span>
            <span>•</span>
            <span>OSHA 29 CFR 1910.252</span>
            <span>•</span>
            <span>ASME Section IX</span>
          </div>
        </div>
      </footer>

      {/* Printer-Friendly Helper Modal */}
      <Suspense fallback={null}>
        <PrintHelperModal
          isOpen={isPrintHelperOpen}
          onClose={() => setIsPrintHelperOpen(false)}
          sectionCode={currentMeta?.code || 'Overview'}
          sectionTitle={currentMeta?.shortTitle || 'Overview Dashboard'}
        />
      </Suspense>
    </div>
  );
}
