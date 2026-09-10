import { X, Printer, ExternalLink, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

interface PrintHelperModalProps {
  isOpen: boolean;
  onClose: () => void;
  sectionCode: string;
  sectionTitle: string;
}

export default function PrintHelperModal({
  isOpen,
  onClose,
  sectionCode,
  sectionTitle
}: PrintHelperModalProps) {
  if (!isOpen) return null;

  const handleLaunchTab = () => {
    // Open in a new tab where standard sandbox limitations do not apply
    window.open(window.location.href, '_blank');
  };

  const handleBypassPrint = () => {
    // Force call print inside the frame anyway
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-slate-900 border border-slate-850 rounded-2xl shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200 flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/30">
            <Printer className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Print Workspace Utility
            </span>
            <h2 className="text-lg font-bold text-slate-100 mt-1">
              Archival View &amp; PDF Export
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Clause {sectionCode}: {sectionTitle}
            </p>
          </div>
        </div>

        {/* Alert Description about iFrame Sandbox */}
        <div className="bg-slate-850/60 border border-slate-800 rounded-xl p-4 space-y-2.5 mb-6 text-xs text-slate-300">
          <div className="flex items-center gap-2 text-amber-400 font-bold">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Security Sandbox Restriction</span>
          </div>
          <p className="leading-relaxed text-slate-400">
            Because this application is currently running inside a secured workspace iframe preview, the browser restricts access to the system print dialog to prevent automated popups.
          </p>
          <p className="leading-relaxed">
            To generate a beautiful, clean, printer-friendly layout or download a manual archive PDF, please open the application in a standard browser tab.
          </p>
        </div>

        {/* Dynamic Step Instructions */}
        <div className="space-y-4 mb-6 text-xs">
          <h3 className="font-mono uppercase font-bold tracking-wider text-slate-400 text-[10px]">
            Recommended Procedure
          </h3>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-mono text-[10px] font-bold shrink-0">
                1
              </div>
              <p className="text-slate-300 leading-relaxed">
                Click the <strong className="text-amber-400">Launch SOP in New Tab</strong> button below.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-mono text-[10px] font-bold shrink-0">
                2
              </div>
              <p className="text-slate-300 leading-relaxed">
                Once the new tab loads, click the same <strong className="text-slate-100">Print Clause</strong> button on the top toolbar to launch your browser's system printer wizard instantly.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-mono text-[10px] font-bold shrink-0">
                3
              </div>
              <p className="text-slate-300 leading-relaxed">
                Under Destination, choose <strong className="text-emerald-400">"Save as PDF"</strong> or select your network printer for a simplified, physical handbook page.
              </p>
            </div>
          </div>
        </div>

        {/* Actions Section */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-auto">
          <button
            onClick={handleLaunchTab}
            className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer text-xs"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Launch SOP in New Tab</span>
          </button>
          
          <button
            onClick={handleBypassPrint}
            className="w-full sm:w-auto py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white font-semibold transition-all cursor-pointer text-xs"
            title="Try calling print within the iframe if your browser supports it"
          >
            Bypass &amp; Print
          </button>
        </div>
      </div>
    </div>
  );
}
