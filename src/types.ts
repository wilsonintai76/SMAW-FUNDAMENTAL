export type SectionId = 
  | 'overview'
  | '7.1.1' 
  | '7.1.2' 
  | '7.1.3' 
  | '7.1.4' 
  | '7.1.5' 
  | '7.1.6' 
  | '7.1.7' 
  | '7.1.8' 
  | '7.1.9';

export interface SectionMeta {
  id: SectionId;
  code: string;
  title: string;
  shortTitle: string;
  description: string;
}

export interface MachineType {
  id: string;
  name: string;
  shortName: string;
  electricalSource: string;
  outputCurrent: 'AC' | 'DC' | 'AC/DC';
  workingPrinciple: string;
  internalMechanism: string;
  standards: {
    code: string;
    organization: string;
    description: string;
  }[];
  advantages: string[];
  disadvantages: string[];
  efficiency: string;
  portability: 'High' | 'Medium' | 'Low' | 'Stationary / Heavy';
  costTier: '$' | '$$' | '$$$' | '$$$$';
  arcBlowVulnerability: 'None (AC)' | 'Moderate' | 'High' | 'Low';
  commonApplications: string[];
}

export interface PolarityMode {
  id: 'DCEN' | 'DCEP' | 'AC';
  name: string;
  commonName: string;
  electrodeConnection: string;
  workConnection: string;
  electronFlow: string;
  heatDistribution: {
    electrode: number;
    workpiece: number;
  };
  characteristics: string[];
  beadGeometry: {
    penetration: 'Deep' | 'Medium' | 'Shallow';
    width: 'Narrow' | 'Medium' | 'Wide';
    buildup: string;
  };
  suitableElectrodes: string[];
  advantages: string[];
  limitations: string[];
}

export interface MachineComponent {
  id: string;
  name: string;
  function: string;
  specs: string;
  sopInspection: string;
  safetyNote: string;
  x: number; // percentage in schematic
  y: number;
}

export interface ProcessLabel {
  id: string;
  number: number;
  label: string;
  technicalRole: string;
  temperatureOrMaterial: string;
  sopCrucialPoint: string;
  x: number; // SVG coordinates
  y: number;
}

export interface PreWeldSopStep {
  id: string;
  stepNumber: number;
  phase: 'Safety & PPE' | 'Equipment & Cable' | 'Base Metal Prep' | 'Electrode Handling' | 'Machine Setup';
  title: string;
  standardClause: string;
  detailedProcedure: string;
  hazardsAvoided: string[];
  acceptanceCriteria: string;
}

export interface WeldingJoint {
  id: string;
  name: string;
  aka: string;
  description: string;
  variations: string[];
  advantages: string[];
  disadvantages: string[];
  industrialUses: string[];
  preparationRequirements: string;
  strengthCharacteristics: {
    tensile: 'Excellent' | 'Good' | 'Fair';
    fatigue: 'High' | 'Medium' | 'Low';
    shear: 'High' | 'Moderate';
  };
  thicknessRange: string;
}

/**
 * Edge preparation for a butt joint, expressed as discrete thickness bands.
 * Mirrors the rules quoted in WELDING_JOINTS so prose and calculation agree.
 */
export interface ButtJointPrep {
  /** Inclusive upper bound of the band in mm; null means "and above". */
  maxThicknessMm: number | null;
  /** Lower bound of the band in mm. */
  minThicknessMm: number;
  label: string;
  bevel: string;
  rootFace: string;
  rootOpening: string;
}

export interface QuizQuestion {
  id: number;
  sectionCode: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  standardReference: string;
}
