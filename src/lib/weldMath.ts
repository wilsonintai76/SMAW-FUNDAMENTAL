/**
 * Shared SMAW arithmetic. Both the amperage lab (7.1.2) and the parameter calculator
 * use these helpers so the two surfaces can never report different numbers for the
 * same set of inputs.
 */

/** Travel speed assumed for heat-input estimates when the user has not measured one. */
export const DEFAULT_TRAVEL_SPEED_MM_PER_MIN = 120;

/**
 * Heat input in kJ/mm for an arc welding procedure:
 *
 *   H = (V x I x 60) / (S x 1000)
 *
 * where V is arc voltage, I is welding current in amperes and S is travel speed in
 * mm/min. The 60/1000 factor converts volts x amps x seconds to kilojoules per
 * millimetre.
 *
 * No arc-efficiency factor is applied. Arc efficiency describes how much of the
 * generated heat is actually absorbed by the workpiece — a heat *transfer* figure —
 * whereas heat input is defined purely from the electrical energy delivered per unit
 * length of weld, which is what the WPS records.
 */
export function heatInputKjPerMm(voltage: number, amperage: number, travelSpeedMmPerMin: number): number {
  if (travelSpeedMmPerMin <= 0) return 0;
  return (voltage * amperage * 60) / (travelSpeedMmPerMin * 1000);
}

/**
 * Midpoint of an arc-voltage range string as stored in ELECTRODE_PARAMETERS,
 * e.g. '24-28V' -> 26, '26-32V' -> 29.
 */
export function arcVoltageMidpoint(voltRange: string): number {
  const values = (voltRange.match(/\d+(?:\.\d+)?/g) || []).map(Number);
  if (values.length === 0) return 0;
  return (Math.min(...values) + Math.max(...values)) / 2;
}
