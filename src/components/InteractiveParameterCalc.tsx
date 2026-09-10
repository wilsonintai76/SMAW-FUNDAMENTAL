import { useState, useId } from 'react';
import { Calculator, AlertTriangle, Info, X } from 'lucide-react';
import { ELECTRODE_PARAMETERS, buttJointPrepFor } from '../data/weldingData';
import { arcVoltageMidpoint, DEFAULT_TRAVEL_SPEED_MM_PER_MIN, heatInputKjPerMm } from '../lib/weldMath';
import { useModalA11y } from '../lib/useModalA11y';

interface InteractiveParameterCalcProps {
  onClose?: () => void;
}

const WELD_POSITIONS = [
  { id: '1G', label: '1G Flat' },
  { id: '2G', label: '2G Horiz' },
  { id: '3G', label: '3G Vert' },
  { id: '4G', label: '4G O/H' }
] as const;

type WeldPosition = (typeof WELD_POSITIONS)[number]['id'];

export default function InteractiveParameterCalc({ onClose }: InteractiveParameterCalcProps) {
  const [selectedElectrode, setSelectedElectrode] = useState<string>('E7018');
  const [selectedDiaIdx, setSelectedDiaIdx] = useState<number>(1);
  const [plateThicknessMm, setPlateThicknessMm] = useState<number>(6);
  const [weldPosition, setWeldPosition] = useState<WeldPosition>('1G');

  const dialogRef = useModalA11y(onClose);
  const thicknessInputId = useId();

  const electrodeObj = ELECTRODE_PARAMETERS.find(e => e.code === selectedElectrode) || ELECTRODE_PARAMETERS[3];
  const diaObj = electrodeObj.diameters[selectedDiaIdx] || electrodeObj.diameters[0];

  // Position adjustment: Vertical-up (3G) and Overhead (4G) typically require 10%-15% lower amperage for puddle control
  const positionReductionFactor = (weldPosition === '3G' || weldPosition === '4G') ? 0.88 : 1.0;
  
  const recommendedMin = Math.round(diaObj.ampMin * positionReductionFactor);
  const recommendedOpt = Math.round(diaObj.optAmp * positionReductionFactor);
  const recommendedMax = Math.round(diaObj.ampMax * positionReductionFactor);

  // Arc voltage comes from the electrode's own published band rather than a fixed guess.
  const arcVoltageMid = arcVoltageMidpoint(diaObj.voltRange);
  const heatInputKjMm = heatInputKjPerMm(arcVoltageMid, recommendedOpt, DEFAULT_TRAVEL_SPEED_MM_PER_MIN).toFixed(2);

  // Plate thickness selects the edge preparation and drives the burn-through caution:
  // a root pass cannot be run with a consumable thicker than the plate being joined.
  const prep = buttJointPrepFor(plateThicknessMm);
  const isThinPlate = plateThicknessMm <= 4;
  const electrodeTooHeavy = isThinPlate && diaObj.sizeMm > plateThicknessMm;

  const thicknessAdvisory = electrodeTooHeavy
    ? {
        tone: 'border-red-500/40 bg-red-500/10 text-red-300',
        title: `Ø${diaObj.sizeMm} mm electrode exceeds the ${plateThicknessMm} mm plate thickness`,
        body: 'A root pass cannot be run with a consumable thicker than the base metal — expect burn-through and an uncontrolled keyhole. Step down to a smaller diameter, or reduce the current to the low end of the range.'
      }
    : isThinPlate
    ? {
        tone: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
        title: 'Thin plate (≤ 4 mm) — burn-through risk',
        body: 'Thin sections need a shorter arc and a smaller electrode. Keep the core diameter at or below the plate thickness, favour the lower half of the current range, and check the fit-up before striking an arc.'
      }
    : null;

  return (
    <div
      ref={dialogRef}
      className="bg-slate-900 rounded-2xl border border-slate-800 p-4 sm:p-6 space-y-5 sm:space-y-6 shadow-xl"
      role="dialog"
      aria-modal="true"
      aria-labelledby="calc-modal-title"
      tabIndex={-1}
    >
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 sm:pb-4 gap-2">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold border border-amber-500/20 shrink-0">
            <Calculator className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h3 id="calc-modal-title" className="text-sm sm:text-base font-bold text-white truncate">
              SMAW Parameter &amp; Heat Calculator
            </h3>
            <p className="text-[10px] sm:text-xs text-slate-400 truncate">
              AWS D1.1 calibration standards &amp; heat input calculation
            </p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close calculator"
            className="min-h-[44px] min-w-[44px] p-2 rounded-xl bg-slate-950 hover:bg-slate-800 active:bg-slate-750 border border-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer flex items-center justify-center shrink-0 active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Input Parameters Form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Electrode Class */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-300">
            AWS Electrode Class:
          </label>
          <select
            value={selectedElectrode}
            onChange={(e) => {
              setSelectedElectrode(e.target.value);
              setSelectedDiaIdx(0);
            }}
            className="w-full min-h-[42px] bg-slate-950 border border-slate-750 text-white rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:border-amber-500"
          >
            {ELECTRODE_PARAMETERS.map(e => (
              <option key={e.code} value={e.code}>
                {e.code} - {e.type.split(' (')[0]}
              </option>
            ))}
          </select>
          <span className="text-[10px] text-slate-400 block">
            Polarity: <strong className="text-amber-400 font-mono">{electrodeObj.currentType}</strong>
          </span>
        </div>

        {/* 2. Diameter */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-300">
            Core Diameter:
          </label>
          <select
            value={selectedDiaIdx}
            onChange={(e) => setSelectedDiaIdx(Number(e.target.value))}
            className="w-full min-h-[42px] bg-slate-950 border border-slate-750 text-white rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:border-amber-500"
          >
            {electrodeObj.diameters.map((d, i) => (
              <option key={i} value={i}>
                {d.sizeMm} mm ({d.sizeInch})
              </option>
            ))}
          </select>
          <span className="text-[10px] text-slate-400 block">
            Arc Gap Rule: <strong className="text-slate-200">~{diaObj.sizeMm} mm</strong>
          </span>
        </div>

        {/* 3. Base Metal Thickness */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <label htmlFor={thicknessInputId} className="font-semibold text-slate-300">Plate Thickness:</label>
            <span className="font-mono text-amber-400 font-bold">{plateThicknessMm} mm</span>
          </div>
          <input
            id={thicknessInputId}
            type="range"
            min={1}
            max={25}
            value={plateThicknessMm}
            onChange={(e) => setPlateThicknessMm(Number(e.target.value))}
            aria-valuetext={`${plateThicknessMm} mm`}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500 my-2"
          />
          <div className="flex justify-between text-[10px] text-slate-500">
            <span>1 mm (Sheet)</span>
            <span>25 mm (Heavy)</span>
          </div>
        </div>

        {/* 4. Welding Position */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-300">
            Welding Position:
          </label>
          <div className="grid grid-cols-4 gap-1.5">
            {WELD_POSITIONS.map((pos) => (
              <button
                key={pos.id}
                onClick={() => setWeldPosition(pos.id)}
                aria-pressed={weldPosition === pos.id}
                className={`min-h-[42px] py-2 px-1 rounded-xl text-center text-xs font-mono font-bold transition-all cursor-pointer border active:scale-95 ${
                  weldPosition === pos.id
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-850'
                }`}
                title={pos.label}
              >
                {pos.id}
              </button>
            ))}
          </div>
          <span className="text-[10px] text-slate-400 block">
            {weldPosition === '3G' || weldPosition === '4G' ? 'Puddle damping: -12% Amps' : 'Standard flat parameter'}
          </span>
        </div>
      </div>

      {/* Calculated Recommendation Output Box */}
      <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
        <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
          Calculated Welding Procedure Specification (WPS) Parameters:
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-1">Target Current:</span>
            <div className="text-xl font-bold font-mono text-emerald-400">
              {recommendedOpt} <span className="text-xs text-slate-400">Amps</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">Range: {recommendedMin}A – {recommendedMax}A</span>
          </div>

          <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-1">Required Polarity:</span>
            <div className="text-lg font-bold font-mono text-amber-400">
              {electrodeObj.currentType}
            </div>
            <span className="text-[10px] text-slate-500">Flux: {electrodeObj.type.split(' ')[0]}</span>
          </div>

          <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-1">Estimated Voltage:</span>
            <div className="text-lg font-bold font-mono text-cyan-400">
              {arcVoltageMid} V
            </div>
            <span className="text-[10px] text-slate-500">Band: {diaObj.voltRange}</span>
          </div>

          <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-1">Estimated Heat Input:</span>
            <div className="text-lg font-bold font-mono text-orange-400">
              {heatInputKjMm} <span className="text-xs">kJ/mm</span>
            </div>
            <span className="text-[10px] text-slate-500">@ {DEFAULT_TRAVEL_SPEED_MM_PER_MIN} mm/min Travel</span>
          </div>
        </div>

        {/* Edge preparation driven by the selected plate thickness */}
        <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-slate-400">Required Edge Preparation for {plateThicknessMm} mm Plate:</span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30">
              {prep.label}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
            <div>
              <span className="text-slate-500 block">Bevel / Groove</span>
              <span className="text-slate-200 font-medium">{prep.bevel}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Root Face</span>
              <span className="text-slate-200 font-medium">{prep.rootFace}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Root Opening</span>
              <span className="text-slate-200 font-medium">{prep.rootOpening}</span>
            </div>
          </div>
        </div>

        {thicknessAdvisory && (
          <div className={`p-3 rounded-lg border flex items-start gap-2.5 text-xs ${thicknessAdvisory.tone}`}>
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <strong className="block">{thicknessAdvisory.title}</strong>
              <span className="text-slate-300">{thicknessAdvisory.body}</span>
            </div>
          </div>
        )}

        {/* Practical Welder Rule of Thumb */}
        <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 flex items-start gap-2.5 text-xs text-slate-300">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-amber-400">Practical Shop Rule of Thumb: </strong>
            For mild steel SMAW, calibrate approximately <strong>35 to 40 Amperes per 1 mm</strong> of electrode core diameter. 
            For a 3.2mm electrode: 3.2 × 38 ≈ 120–125 Amperes. Adjust downward by 10–15% when performing vertical-up or overhead passes to maintain control over the molten pool.
          </div>
        </div>
      </div>
    </div>
  );
}
