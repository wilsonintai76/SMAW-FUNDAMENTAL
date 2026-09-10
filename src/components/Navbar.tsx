import { useState, useRef, useEffect } from 'react';
import { 
  Flame, 
  ShieldAlert, 
  Sliders, 
  CheckSquare, 
  Award, 
  BookOpen, 
  Menu, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Layers,
  Zap,
  CheckCircle2,
  ExternalLink,
  Printer
} from 'lucide-react';
import { SectionId } from '../types';
import { SECTIONS_META } from '../data/weldingData';

interface NavbarProps {
  activeSection: SectionId;
  onSelectSection: (id: SectionId) => void;
  onOpenCalc: () => void;
  onOpenChecklist: () => void;
  onOpenQuiz: () => void;
  onOpenSafety: () => void;
  onOpenGlossary: () => void;
  onPrint?: () => void;
}

export default function Navbar({
  activeSection,
  onSelectSection,
  onOpenCalc,
  onOpenChecklist,
  onOpenQuiz,
  onOpenSafety,
  onOpenGlossary,
  onPrint
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Clause ordered list
  const orderedSectionIds: SectionId[] = [
    'overview',
    '7.1.1',
    '7.1.2',
    '7.1.3',
    '7.1.4',
    '7.1.5',
    '7.1.6',
    '7.1.7',
    '7.1.8',
    '7.1.9'
  ];

  const currentIndex = orderedSectionIds.indexOf(activeSection);
  const prevSection = currentIndex > 0 ? orderedSectionIds[currentIndex - 1] : null;
  const nextSection = currentIndex < orderedSectionIds.length - 1 ? orderedSectionIds[currentIndex + 1] : null;
  const activeMeta = SECTIONS_META.find(s => s.id === activeSection) || SECTIONS_META[0];

  // Scroll checking for horizontal tabs
  const checkScroll = () => {
    if (navScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = navScrollRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  // Scroll active tab into view smoothly
  useEffect(() => {
    if (navScrollRef.current) {
      const activeEl = navScrollRef.current.querySelector(`[data-nav-id="${activeSection}"]`) as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeSection]);

  const scrollTabs = (direction: 'left' | 'right') => {
    if (navScrollRef.current) {
      const offset = direction === 'left' ? -220 : 220;
      navScrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handleSelect = (id: SectionId) => {
    onSelectSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 shadow-xl">
      {/* 1. TOP STANDARD COMPLIANCE BAR */}
      <div className="bg-slate-950 px-3 sm:px-6 py-1 border-b border-slate-850 text-[10px] sm:text-[11px] text-slate-400 flex items-center justify-between">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 font-mono font-bold text-[10px] border border-amber-500/20 shrink-0">
            SOP 7.1
          </span>
          <span className="hidden sm:inline text-slate-300 font-medium">
            SMAW Standard Operating Procedure
          </span>
          <span className="hidden sm:inline text-slate-600">•</span>
          <span className="text-slate-400 font-mono truncate text-[10px] sm:text-[11px]">
            AWS D1.1 • ASME IX • ISO 4063 (111)
          </span>
        </div>

        {/* Quick Safety Badge in Top Bar (Desktop & Tablet) */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenSafety}
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-red-500/15 hover:bg-red-500/25 text-red-300 border border-red-500/30 transition-all font-semibold text-[11px] cursor-pointer"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            <span>Safety Protocol</span>
          </button>
        </div>
      </div>

      {/* 2. MAIN HEADER BAR */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3 overflow-hidden">
        {/* Left: Brand Identity */}
        <div 
          onClick={() => handleSelect('overview')}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer select-none group min-w-0 shrink"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950 font-bold shrink-0 transition-transform group-hover:scale-105">
            <Flame className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-slate-950" />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5">
              <h1 className="text-sm sm:text-base md:text-lg font-black text-white tracking-tight leading-none group-hover:text-amber-400 transition-colors truncate">
                SMAW FUNDAMENTALS
              </h1>
              <span className="px-1 py-0.5 rounded bg-slate-800 text-amber-400 font-mono text-[9px] font-bold border border-slate-700 shrink-0">
                111
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block mt-0.5 truncate">
              Technical Standard Operating Procedure &amp; Arc Control Guide (7.1.1 – 7.1.9)
            </p>
          </div>
        </div>

        {/* Right: Desktop Interactive Tools Pill Group */}
        <div className="hidden lg:flex items-center gap-1.5">
          <button
            id="nav-tool-safety"
            onClick={onOpenSafety}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 text-red-300 hover:text-white border border-red-500/35 transition-all text-xs font-semibold cursor-pointer shadow-sm"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            <span>Safety Protocols</span>
          </button>

          <button
            id="nav-tool-calc"
            onClick={onOpenCalc}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-750 text-slate-300 hover:text-amber-400 border border-slate-700 transition-all text-xs font-medium cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span>Ampere Calc</span>
          </button>

          <button
            id="nav-tool-sop"
            onClick={onOpenChecklist}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-750 text-slate-300 hover:text-emerald-400 border border-slate-700 transition-all text-xs font-medium cursor-pointer"
          >
            <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>Pre-Weld SOP</span>
          </button>

          <button
            id="nav-tool-quiz"
            onClick={onOpenQuiz}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-750 text-slate-300 hover:text-cyan-400 border border-slate-700 transition-all text-xs font-medium cursor-pointer"
          >
            <Award className="w-3.5 h-3.5 text-cyan-400" />
            <span>Mastery Quiz</span>
          </button>

          <button
            id="nav-tool-glossary"
            onClick={onOpenGlossary}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-750 text-slate-300 hover:text-purple-400 border border-slate-700 transition-all text-xs font-medium cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-purple-400" />
            <span>Glossary</span>
          </button>

          <button
            id="nav-tool-print"
            onClick={onPrint || (() => window.print())}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-750 text-slate-300 hover:text-amber-400 border border-slate-700 transition-all text-xs font-medium cursor-pointer"
            title="Print Current Clause"
          >
            <Printer className="w-3.5 h-3.5 text-amber-500" />
            <span>Print Clause</span>
          </button>
        </div>

        {/* Right: Mobile & Tablet Actions */}
        <div className="flex lg:hidden items-center gap-1.5 shrink-0">
          {/* Quick Safety Button on Mobile */}
          <button
            onClick={onOpenSafety}
            aria-label="Open safety protocols"
            className="min-h-[40px] px-2.5 sm:px-3 py-1.5 rounded-lg bg-red-500/15 border border-red-500/35 text-red-400 hover:bg-red-500/25 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold shrink-0 shadow-sm"
          >
            <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
            <span className="font-semibold hidden sm:inline">Safety</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className={`min-h-[40px] px-2.5 sm:px-3 py-1.5 rounded-lg border active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold shrink-0 shadow-sm ${
              mobileMenuOpen
                ? 'bg-amber-500 text-slate-950 border-amber-400'
                : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-750'
            }`}
          >
            {mobileMenuOpen ? (
              <>
                <X className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">Close</span>
              </>
            ) : (
              <>
                <Menu className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">Menu</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 3. DEDICATED CLAUSE NAVIGATION STRIP (NO SCROLLBAR) */}
      <div className="bg-slate-950/95 border-t border-slate-850 relative">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 relative flex items-center">
          {/* Desktop Left Scroll Button (appears when scrolled right) */}
          {canScrollLeft && (
            <button
              onClick={() => scrollTabs('left')}
              aria-label="Scroll clauses left"
              className="hidden md:flex absolute left-1 z-10 w-7 h-7 rounded-full bg-slate-900/90 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 items-center justify-center shadow-lg transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          {/* Left Fade Gradient Mask */}
          {canScrollLeft && (
            <div className="hidden md:block absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-950 to-transparent z-[5] pointer-events-none" />
          )}

          {/* Horizontal Clause Tabs Container */}
          <nav
            ref={navScrollRef}
            onScroll={checkScroll}
            className="flex items-center gap-1 py-1.5 overflow-x-auto no-scrollbar w-full scroll-smooth"
          >
            {/* Overview Tab */}
            <button
              id="clause-tab-overview"
              data-nav-id="overview"
              onClick={() => handleSelect('overview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                activeSection === 'overview'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Overview</span>
            </button>

            {/* Separator */}
            <div className="h-4 w-[1px] bg-slate-800 mx-1 shrink-0" />

            {/* Technical Clause Tabs (7.1.1 to 7.1.9) */}
            {SECTIONS_META.filter(s => s.id !== 'overview').map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  id={`clause-tab-${sec.id}`}
                  data-nav-id={sec.id}
                  onClick={() => handleSelect(sec.id as SectionId)}
                  title={sec.title}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1 cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-850 border border-transparent'
                  }`}
                >
                  <span className={`font-mono text-[10px] ${isActive ? 'text-slate-900 font-black' : 'text-amber-500/80 font-bold'}`}>
                    {sec.code}
                  </span>
                  <span>{sec.shortTitle}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Fade Gradient Mask */}
          {canScrollRight && (
            <div className="hidden md:block absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-950 to-transparent z-[5] pointer-events-none" />
          )}

          {/* Desktop Right Scroll Button (appears when content overflows right) */}
          {canScrollRight && (
            <button
              onClick={() => scrollTabs('right')}
              aria-label="Scroll clauses right"
              className="hidden md:flex absolute right-1 z-10 w-7 h-7 rounded-full bg-slate-900/90 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 items-center justify-center shadow-lg transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* FULL MOBILE DRAWER MENU (TOOLS & CLAUSES) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900/98 backdrop-blur-xl border-b border-slate-800 p-4 max-h-[85vh] overflow-y-auto space-y-5 shadow-2xl animate-in slide-in-from-top duration-200">
          {/* Mobile Tools Grid */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold">
              Engineering &amp; Audit Tools
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => { onOpenSafety(); setMobileMenuOpen(false); }}
                className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-left space-y-1 hover:bg-red-500/25 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-1.5 text-red-300 font-bold">
                  <ShieldAlert className="w-4 h-4 text-red-400" />
                  <span>Safety Protocols</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  PPE matrix, OCV, ventilation &amp; 35ft hot work rule
                </p>
              </button>

              <button
                onClick={() => { onOpenCalc(); setMobileMenuOpen(false); }}
                className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-left space-y-1 hover:bg-slate-750 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <Sliders className="w-4 h-4" />
                  <span>Ampere Calc</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  Electrode diameter, travel speed &amp; heat input
                </p>
              </button>

              <button
                onClick={() => { onOpenChecklist(); setMobileMenuOpen(false); }}
                className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-left space-y-1 hover:bg-slate-750 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <CheckSquare className="w-4 h-4" />
                  <span>Pre-Weld SOP</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  5-stage mandatory pre-arc sign-off checklist
                </p>
              </button>

              <button
                onClick={() => { onOpenQuiz(); setMobileMenuOpen(false); }}
                className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-left space-y-1 hover:bg-slate-750 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
                  <Award className="w-4 h-4" />
                  <span>Mastery Quiz</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  10-question certification test with live scoring
                </p>
              </button>
            </div>

            <button
              onClick={() => { onOpenGlossary(); setMobileMenuOpen(false); }}
              className="w-full p-3 rounded-xl bg-purple-500/15 border border-purple-500/30 text-left flex items-center justify-between hover:bg-purple-500/25 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2 text-purple-300 font-bold text-xs">
                <BookOpen className="w-4 h-4 text-purple-400" />
                <span>Technical Engineering Glossary</span>
              </div>
              <span className="text-[11px] font-mono text-purple-400">AWS A3.0 &amp; ISO</span>
            </button>

            <button
              onClick={() => { if (onPrint) { onPrint(); } else { window.print(); } setMobileMenuOpen(false); }}
              className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-left flex items-center justify-between hover:bg-slate-750 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                <Printer className="w-4 h-4 text-amber-500" />
                <span>Print / Save Archival PDF</span>
              </div>
              <span className="text-[11px] font-mono text-amber-400">SOP Copy</span>
            </button>
          </div>

          {/* Mobile All Clauses List */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold">
              Standard Operating Procedure Clauses (7.1.1 – 7.1.9)
            </h4>
            <div className="space-y-1">
              {SECTIONS_META.map((sec) => {
                const isSelected = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => handleSelect(sec.id as SectionId)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                        : 'bg-slate-850 hover:bg-slate-800 text-slate-200 border border-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className={`px-1.5 py-0.5 rounded font-mono text-[11px] font-bold ${
                        isSelected ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-amber-400 border border-slate-700'
                      }`}>
                        {sec.code}
                      </span>
                      <span className="truncate">{sec.title}</span>
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 shrink-0 text-slate-950" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
