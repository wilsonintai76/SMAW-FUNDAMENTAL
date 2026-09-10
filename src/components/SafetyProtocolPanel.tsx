import { useState } from 'react';
import { 
  ShieldAlert, 
  X, 
  Wind, 
  Flame, 
  Zap, 
  Eye, 
  CheckCircle2, 
  AlertTriangle, 
  HardHat, 
  Shirt, 
  Footprints, 
  Sparkles,
  Layers,
  FileCheck
} from 'lucide-react';
import { useModalA11y } from '../lib/useModalA11y';

interface SafetyPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'ppe' | 'ventilation' | 'fire' | 'electrical' | 'checklist';

export default function SafetyProtocolPanel({ isOpen, onClose }: SafetyPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('ppe');
  const [shadeAmperage, setShadeAmperage] = useState<number>(140);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const dialogRef = useModalA11y(onClose, isOpen);

  if (!isOpen) return null;

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Recommended shade level calculation based on ANSI Z49.1 / OSHA 1910.252
  const getFilterShade = (amps: number): { shade: string; rule: string } => {
    if (amps < 60) return { shade: 'Shade 7 - 8', rule: 'Low amperage SMAW with light electrode (< 2.5mm)' };
    if (amps <= 160) return { shade: 'Shade 10', rule: 'Medium current SMAW (2.5mm - 4.0mm rod: E6010, E7018)' };
    if (amps <= 250) return { shade: 'Shade 11 - 12', rule: 'Heavy structural SMAW (4.0mm - 5.0mm rod)' };
    return { shade: 'Shade 12 - 14', rule: 'Severe high amperage arc gouging & heavy deposition (> 5.0mm)' };
  };

  const currentShade = getFilterShade(shadeAmperage);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm flex justify-end transition-opacity animate-in fade-in duration-200">
      {/* Slide-out Drawer Panel */}
      <div 
        ref={dialogRef}
        className="w-full max-w-2xl bg-slate-900 border-l border-slate-750 h-full flex flex-col shadow-2xl overflow-hidden relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="safety-drawer-title"
        tabIndex={-1}
      >
        {/* Drawer Header */}
        <div className="bg-slate-950 px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-red-500/20 border border-red-500/35 flex items-center justify-center text-red-400 shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h2 id="safety-drawer-title" className="text-sm sm:text-base font-bold text-white truncate">
                SMAW Life-Safety Protocols
              </h2>
              <p className="text-[10px] sm:text-xs text-slate-400 font-mono truncate">
                OSHA 1910.252 • ANSI Z49.1 • NFPA 51B
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close safety panel"
            className="min-h-[44px] min-w-[44px] p-2 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-slate-750 border border-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer flex items-center justify-center shrink-0 active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-925 px-3 sm:px-6 border-b border-slate-800 flex overflow-x-auto gap-1.5 sm:gap-2 py-2 no-scrollbar">
          {[
            { id: 'ppe', label: 'PPE Matrix', shortLabel: 'PPE Matrix', icon: HardHat },
            { id: 'ventilation', label: 'Fumes & Ventilation', shortLabel: 'Ventilation', icon: Wind },
            { id: 'fire', label: 'Fire & Hot Work', shortLabel: 'Fire / 35ft', icon: Flame },
            { id: 'electrical', label: 'Electrical & Shock', shortLabel: 'Electrical', icon: Zap },
            { id: 'checklist', label: 'Safety Audit Sign-Off', shortLabel: 'Sign-Off', icon: FileCheck },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`min-h-[40px] px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer shrink-0 active:scale-95 ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="sm:hidden">{tab.shortLabel}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: PPE Requirements */}
          {activeTab === 'ppe' && (
            <div className="space-y-5">
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-xs text-amber-300 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-sm font-semibold text-amber-200 mb-1">
                    Zero-Tolerance PPE Compliance
                  </strong>
                  The electric arc in SMAW emits intense electromagnetic radiation (Infrared 780-2000nm, Visible Light, and harmful Ultraviolet UV-A/B/C 200-400nm) capable of causing irreversible retinal damage and photokeratitis ("Arc Eye" or "Welder's Flash") in under 1 second of unshielded exposure.
                </div>
              </div>

              {/* Interactive Lens Shade Selector */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5 font-mono">
                    <Eye className="w-4 h-4 text-cyan-400" />
                    Interactive Filter Lens Shade Selector (ANSI Z49.1 / OSHA Standard)
                  </span>
                  <span className="text-xs font-mono text-cyan-400 font-bold bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
                    {currentShade.shade}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono text-slate-400">
                    <span>Arc Operating Current:</span>
                    <strong className="text-amber-400">{shadeAmperage} Amperes</strong>
                  </div>
                  <input
                    type="range"
                    min={40}
                    max={300}
                    step={10}
                    value={shadeAmperage}
                    onChange={(e) => setShadeAmperage(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                  <p className="text-[11px] text-slate-400 italic">
                    Recommendation: {currentShade.rule}
                  </p>
                </div>
              </div>

              {/* Detailed PPE Breakdown Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Helmet & Eyes */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <Eye className="w-4 h-4 text-cyan-400" />
                    <span>Welding Helmet &amp; Safety Glasses</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    ANSI Z87.1 certified safety glasses with side shields must be worn underneath the welding hood at all times to protect against slag chipping impact.
                  </p>
                </div>

                {/* Leather Gauntlet Gloves */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Heavy Split-Cowhide Gauntlets</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Dry, flame-resistant leather gloves with minimum 4-inch cuff to prevent molten spatter and sparks from entering wrist openings. Never handle hot metal with wet gloves.
                  </p>
                </div>

                {/* Flame-Retardant Clothing */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <Shirt className="w-4 h-4 text-emerald-400" />
                    <span>FR Cotton or Heavy Leather Jacket</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Strictly 100% natural fibers (heavy cotton or wool) or chrome-tanned split leather. Synthetic fabrics (polyester, nylon) are strictly prohibited as they melt into skin upon contact with spatter.
                  </p>
                </div>

                {/* Safety Boots */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <Footprints className="w-4 h-4 text-purple-400" />
                    <span>Steel-Toe Leather Boots (EH Rated)</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    ASTM F2413 compliant 8-inch high-top leather work boots with electrical hazard (EH) resistance and leather spatter guards (spats). Pant legs must be worn over boot tops without cuffs.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Ventilation & Fumes */}
          {activeTab === 'ventilation' && (
            <div className="space-y-5">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Wind className="w-4 h-4 text-cyan-400" />
                  <span>Hazardous Fumes, Gases &amp; Inhalation Limits</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  SMAW flux electrode coatings generate dangerous airborne particulate plumes containing metal oxides and gases. Inhalation must be controlled below OSHA Permissible Exposure Limits (PEL).
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono pt-2">
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-red-400 font-bold block">Hexavalent Chromium (Cr VI):</span>
                    <span className="text-[11px] text-slate-400">Emitted when welding Stainless Steel (E308/E316). Severe human lung carcinogen. OSHA PEL: 5 µg/m³.</span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-amber-400 font-bold block">Manganese (Mn):</span>
                    <span className="text-[11px] text-slate-400">Present in structural steel cores. Chronic exposure causes Manganism (Parkinsonian neurological disorder).</span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-blue-400 font-bold block">Ozone (O₃) &amp; Nitrogen Dioxide:</span>
                    <span className="text-[11px] text-slate-400">Formed by UV arc radiation reacting with ambient oxygen. Irritates respiratory tract and triggers pulmonary edema.</span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-emerald-400 font-bold block">Zinc Fumes (Metal Fume Fever):</span>
                    <span className="text-[11px] text-slate-400">Occurs when welding galvanized steel. Strip zinc minimum 50mm (2 inches) back before arc strike!</span>
                  </div>
                </div>
              </div>

              {/* Engineering Ventilation Hierarchy */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  Ventilation Engineering Hierarchy (OSHA 1910.252(c))
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-start gap-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold text-[10px]">Tier 1</span>
                    <div>
                      <strong className="text-white block">Local Exhaust Ventilation (LEV / Fume Extractors)</strong>
                      <span className="text-slate-400 text-[11px]">Position hood within 1 to 2 hood diameters (approx. 10–20 cm) of the welding zone with capture velocity of 100 FPM (0.5 m/s).</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-start gap-3">
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono font-bold text-[10px]">Tier 2</span>
                    <div>
                      <strong className="text-white block">Natural &amp; Mechanical Dilution Ventilation</strong>
                      <span className="text-slate-400 text-[11px]">Acceptable only in open shop spaces over 10,000 cu. ft. per welder with ceiling height &gt; 16 ft and clear air currents.</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-start gap-3">
                    <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-300 font-mono font-bold text-[10px]">Tier 3</span>
                    <div>
                      <strong className="text-white block">Supplied-Air Respirators (PAPR / SAR)</strong>
                      <span className="text-slate-400 text-[11px]">Mandatory in confined spaces, tight tanks, or when chromium/lead levels exceed Action Limits.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Fire Prevention & Hot Work */}
          {activeTab === 'fire' && (
            <div className="space-y-5">
              {/* 35-Foot Rule Diagram / Banner */}
              <div className="bg-red-500/10 border border-red-500/25 rounded-xl p-4 text-xs text-red-200 space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-red-300 font-mono">
                  <Flame className="w-4 h-4 text-red-400" />
                  <span>NFPA 51B: Standard 35-Foot (10.7 Meter) Hot Work Radius</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-300">
                  SMAW spatter sparks can travel up to 35 feet (10.7m) horizontally and drop through floor cracks, deck penetrations, and cable trays into lower compartments.
                </p>
              </div>

              {/* Fire Safety Rule Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                  <strong className="text-amber-400 block font-mono">1. Combustible Clearance</strong>
                  <p className="text-slate-400 text-[11px]">
                    Relocate all flammable liquids, wood chips, cardboard, and grease at least 35 ft away, or cover tightly with FM-approved fireproof blankets (ANSI/FM 4950).
                  </p>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                  <strong className="text-amber-400 block font-mono">2. Mandatory Fire Watch</strong>
                  <p className="text-slate-400 text-[11px]">
                    Assign a dedicated Fire Watch armed with fully charged 10-lb ABC dry chemical or CO₂ extinguisher during welding and for a minimum of <strong>30 to 60 minutes</strong> after arc completion.
                  </p>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                  <strong className="text-amber-400 block font-mono">3. Tanks &amp; Enclosed Drums</strong>
                  <p className="text-slate-400 text-[11px]">
                    Never arc strike on used fuel tanks, closed barrels, or pressurized pipe without prior chemical purging, steam inerting, and 4-gas atmosphere atmospheric testing (LEL &lt; 1%).
                  </p>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                  <strong className="text-amber-400 block font-mono">4. Hot Work Permit Protocol</strong>
                  <p className="text-slate-400 text-[11px]">
                    Verify that an active Hot Work Permit is signed by the Safety Officer prior to any non-designated shop area ignition.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Electrical Safety & Shock Standards */}
          {activeTab === 'electrical' && (
            <div className="space-y-5">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-850 pb-2">
                  <span className="text-xs font-bold text-white flex items-center gap-2 font-mono">
                    <Zap className="w-4 h-4 text-amber-400" />
                    Open Circuit Voltage (OCV) Shock Hazards
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-500/30">
                    OCV: 50V – 90V DC/AC
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  While the welding arc runs between 20V and 30V, the power source delivers an <strong>Open Circuit Voltage of 50V to 90V</strong> whenever the machine is energised but no arc is active. In damp environments or when the welder is sweating, body skin resistance plummets from 100,000 Ω to under 500 Ω, making secondary OCV lethal (ventricular fibrillation threshold &gt; 50mA).
                </p>
              </div>

              {/* Electrical Safeguard Directives */}
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <strong className="text-white flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                    Insulated Electrode Holder (Stinger) Maintenance
                  </strong>
                  <p className="text-slate-400 text-[11px]">
                    Never use holders with cracked or missing insulating jaws. Replace immediately if internal springs become loose or screw contacts loosen.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <strong className="text-white flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                    Primary Machine Grounding (Earth Ground)
                  </strong>
                  <p className="text-slate-400 text-[11px]">
                    The welding power source chassis must have a low-resistance third-wire green earth ground connected directly to electrical service panel ground. Never disconnect earth ground pins.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <strong className="text-white flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-blue-400 shrink-0" />
                    Cable Lead Inspections &amp; Splicing Rules
                  </strong>
                  <p className="text-slate-400 text-[11px]">
                    OSHA 1910.252 mandates that no cable splices or repairs are permitted within <strong>10 feet (3.0 meters)</strong> of the electrode holder. Discard cables with frayed jackets, exposed copper conductors, or thermal scorching.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Interactive Safety Checklist */}
          {activeTab === 'checklist' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div>
                  <h4 className="text-xs font-bold text-white font-mono uppercase">
                    Mandatory Daily Pre-Arc Safety Sign-Off
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Verify all 6 critical points before initiating an arc.
                  </p>
                </div>
                <div className="text-right font-mono text-xs font-bold text-amber-400">
                  {Object.values(checkedItems).filter(Boolean).length} / 6 Verified
                </div>
              </div>

              <div className="space-y-2">
                {[
                  { id: 'check-ppe', text: 'Full PPE inspected (dry gloves, shaded lens, Z87 glasses, FR leather clothing).' },
                  { id: 'check-cables', text: 'Electrode lead and work ground clamp checked with zero bare copper exposed within 10ft of stinger.' },
                  { id: 'check-combustibles', text: 'Combustible materials cleared or protected within a 35-foot perimeter.' },
                  { id: 'check-fire-ext', text: 'Type ABC fire extinguisher charged, inspected, and immediately accessible.' },
                  { id: 'check-vent', text: 'Local fume extraction hood activated and positioned within 12 inches of weld axis.' },
                  { id: 'check-dryness', text: 'Welding zone floor is completely dry; rubber insulating mat placed if working on damp grid.' },
                ].map((item) => {
                  const isChecked = !!checkedItems[item.id];
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleCheck(item.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                        isChecked
                          ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
                          : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                        isChecked ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-600 bg-slate-900'
                      }`}>
                        {isChecked && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                      <span className="text-xs font-medium leading-tight">
                        {item.text}
                      </span>
                    </div>
                  );
                })}
              </div>

              {Object.values(checkedItems).filter(Boolean).length === 6 ? (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center gap-2 font-mono">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>ALL SAFETY AUDIT PROTOCOLS VERIFIED — AUTHORIZED TO PROCEED TO WELDING</span>
                </div>
              ) : (
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-300 text-xs flex items-center gap-2 font-mono">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Complete all checklist verifications prior to striking arc.</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="bg-slate-950 px-4 sm:px-6 py-3 border-t border-slate-800 flex items-center justify-between gap-3 text-xs text-slate-400">
          <span className="font-mono text-[10px] sm:text-[11px] truncate">Safety is Non-Negotiable</span>
          <button
            onClick={onClose}
            className="min-h-[44px] px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-650 text-white font-bold text-xs transition-colors cursor-pointer shrink-0 active:scale-95 shadow-sm"
          >
            <span className="sm:hidden">Close Panel</span>
            <span className="hidden sm:inline">Close Protocol Panel</span>
          </button>
        </div>
      </div>
    </div>
  );
}
