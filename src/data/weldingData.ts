import { MachineType, PolarityMode, MachineComponent, ProcessLabel, PreWeldSopStep, WeldingJoint, QuizQuestion } from '../types';

export const SECTIONS_META = [
  {
    id: 'overview',
    code: '7.1',
    title: 'Manage Shielded Metal Arc Welding (SMAW) According to SOP',
    shortTitle: 'SOP Overview',
    description: 'Standard Operating Procedure management framework covering safety, principles, equipment, and weld geometry.'
  },
  {
    id: '7.1.1',
    code: '7.1.1',
    title: 'Basic Principles of Arc Welding',
    shortTitle: 'Arc Principles',
    description: 'Electrical arc column physics, thermal ionization (3,500°C–6,000°C), flux shielding decomposition, and molten weld puddle metallurgy.'
  },
  {
    id: '7.1.2',
    code: '7.1.2',
    title: 'Function of the Ampere Adjustment Control',
    shortTitle: 'Ampere Control',
    description: 'Regulation of current volume, heat input equation, arc voltage interplay, burn-off rates, and bead geometry defects.'
  },
  {
    id: '7.1.3',
    code: '7.1.3',
    title: 'Basic Components of an Arc Welding Machine',
    shortTitle: 'Machine Components',
    description: 'Power source, current rheostat, polarity selector, stinger electrode holder, ground clamp, output terminals, and cooling loop.'
  },
  {
    id: '7.1.4',
    code: '7.1.4',
    title: 'Five Types of Arc Welding Machines & Working Principles',
    shortTitle: '5 Machine Types',
    description: 'Transformer, Rectifier, Inverter, Engine Generator, and Motor-Generator systems mapped to AWS D1.1 and EN 60974-1 standards.'
  },
  {
    id: '7.1.5',
    code: '7.1.5',
    title: 'Advantages & Disadvantages of the 5 Arc Welding Machines',
    shortTitle: 'Comparative Analysis',
    description: 'Deep-dive engineering evaluation of DC, AC, Integrated AC/DC, Petrol/Diesel Engine DC, and Motor-Driven DC Generators.'
  },
  {
    id: '7.1.6',
    code: '7.1.6',
    title: 'Terminology & Characteristics of Polarity (DCEN, DCEP, AC)',
    shortTitle: 'Polarity Dynamics',
    description: 'Straight polarity (DCEN) vs. reverse polarity (DCEP) vs. AC, electron drift dynamics, 70/30 heat distribution, and arc blow mitigation.'
  },
  {
    id: '7.1.7',
    code: '7.1.7',
    title: 'Label of the Arc Welding Process & Pre-Welding SOP Steps',
    shortTitle: 'Process & Pre-Weld SOP',
    description: 'Interactive labeled cross-section of the SMAW process and 5-stage standard operating procedure to execute before striking an arc.'
  },
  {
    id: '7.1.8',
    code: '7.1.8',
    title: 'Five Types of Arc Welding Basic Joints',
    shortTitle: '5 Basic Joints',
    description: 'Architectural configurations and root bevel geometries for Butt, Tee (T), Corner, Lap, and Edge joints.'
  },
  {
    id: '7.1.9',
    code: '7.1.9',
    title: 'Advantages and Industrial Uses of Every Joint',
    shortTitle: 'Joint Uses & Merits',
    description: 'Engineering trade-offs, stress path distributions, preparation costs, and structural industrial applications.'
  }
] as const;

// 7.1.3 Machine Components
export const MACHINE_COMPONENTS: MachineComponent[] = [
  {
    id: 'power-source',
    name: 'Main Welding Power Source (Power Supply)',
    function: 'Transforms incoming high-voltage, low-amperage utility electrical mains (e.g. 230V/415V AC) into safe, low-voltage (18V-36V) and high-current (50A-500A) suitable for striking and sustaining an electric arc.',
    specs: 'Open Circuit Voltage (OCV): 50V–80V; Operating Arc Voltage: 18V–36V; Duty cycle rating: 40%–100%.',
    sopInspection: 'Check housing ground pin, verify cooling vents are clear of metallic grinding dust, confirm no internal burning smell.',
    safetyNote: 'OCV can deliver lethal electric shock in humid or damp environments. Always operate on dry insulating mats.',
    x: 35,
    y: 35
  },
  {
    id: 'amp-control',
    name: 'Current / Ampere Adjustment Control (Rheostat/Digital Dial)',
    function: 'Allows the welder to calibrate the exact current output in Amperes to match electrode classification, core diameter, metal thickness, and welding position.',
    specs: 'Stepless rotary dial, magnetic shunt lever, or microprocessor digital encoder display.',
    sopInspection: 'Verify potentiometer knob rotates smoothly without slippage; test digital readout displays stable numerical value without flickering.',
    safetyNote: 'Do not adjust amperage under load (while the arc is burning), as this causes contact arcing and pitting inside mechanical switches.',
    x: 48,
    y: 28
  },
  {
    id: 'polarity-switch',
    name: 'Polarity Selector Switch',
    function: 'Reverses the direction of direct current flow between the electrode and the workpiece (DCEP, DCEN) or shifts to AC on dual-mode machines.',
    specs: 'Heavy-duty rotary cam switch rated for maximum machine current capacity.',
    sopInspection: 'Ensure switch locks firmly into detent positions (DC+, DC-, AC); inspect contacts for oxidation or thermal discoloration.',
    safetyNote: 'NEVER change the polarity switch while welding. Stop the arc before toggling to protect internal contactors from explosive flashover.',
    x: 24,
    y: 28
  },
  {
    id: 'output-terminals',
    name: 'Output Cable Terminals (Dinse / Stud Terminals)',
    function: 'Heavy brass or copper connection points marked (+) and (-) where the electrode cable and work return cable are securely fastened.',
    specs: 'Standard 35-50 or 50-70 Dinse quick-lock connectors or threaded insulated studs.',
    sopInspection: 'Inspect for loose twist-locks or thread stripping. A loose terminal creates severe resistive heating, melting the insulation.',
    safetyNote: 'Tighten securely by hand with a twist lock or wrench. Hot terminals are an immediate fire hazard.',
    x: 40,
    y: 65
  },
  {
    id: 'electrode-cable',
    name: 'Electrode Cable (Lead Cable)',
    function: 'Carries high amperage electrical current from the power source terminal to the electrode holder (stinger).',
    specs: 'High-flexibility fine stranded copper (Class K/M), heavy neoprene or EPDM jacket, 1/0 to 4/0 AWG.',
    sopInspection: 'Unroll completely to avoid magnetic inductive choke. Inspect every foot for cuts, exposed copper strands, burns, or tape splices.',
    safetyNote: 'Splices within 10 feet (3 meters) of the electrode holder are strictly prohibited by OSHA standards due to electric shock risks.',
    x: 60,
    y: 60
  },
  {
    id: 'electrode-holder',
    name: 'Electrode Holder (Stinger)',
    function: 'Mechanically grips the bare end of the coated electrode at multiple preset angles (45°, 90°, 180°) while insulating the welder from electrical current.',
    specs: 'Heat-resistant fiberglass/phenolic insulated jaws, heavy spring tension, rated 200A–500A with duty cycle.',
    sopInspection: 'Check that upper and lower insulation jaws have zero cracks or exposed metal screws; ensure spring provides firm clamping pressure.',
    safetyNote: 'Never dip a hot electrode holder into a water bucket to cool it; this breaks insulation and causes dangerous conductivity.',
    x: 75,
    y: 45
  },
  {
    id: 'work-clamp',
    name: 'Work Clamp (Ground Return Clamp)',
    function: 'Completes the electrical circuit by clamping firmly to the workpiece or metallic welding bench, allowing current to return to the machine.',
    specs: 'High-tension spring clamp or screw-type C-clamp with copper braided shunt connecting both jaws.',
    sopInspection: 'Verify copper jaws are clean and free of heavy slag, paint, rust, or spatter. Inspect internal copper shunt for broken strands.',
    safetyNote: 'Attaching the work clamp to conduit pipes, gas lines, or bearings can cause disastrous arcs, fires, or bearing destruction.',
    x: 65,
    y: 80
  },
  {
    id: 'work-cable',
    name: 'Work Return Cable',
    function: 'Low-resistance conductor returning electrical current from the work clamp back to the power source terminal.',
    specs: 'Fine stranded copper wire identical in gauge to the electrode cable to maintain balanced electrical resistance.',
    sopInspection: 'Verify tight lug termination, check for kinks, oil contamination, and crushing damage from heavy shop equipment.',
    safetyNote: 'Must match or exceed the cross-sectional area of the electrode lead to prevent dangerous overheating.',
    x: 50,
    y: 85
  },
  {
    id: 'cooling-fan',
    name: 'Forced-Air Cooling Fan & Thermal Overload Sensor',
    function: 'Draws ambient air across transformer windings, diodes, and inverter heat sinks to dissipate resistive Joule heat during operation.',
    specs: 'Continuous or on-demand thermostatically controlled high-CFM axial fan with automatic thermal cutoff switch.',
    sopInspection: 'Listen for smooth fan bearing rotation when machine is energized; verify thermal trip warning light functions during self-test.',
    safetyNote: 'If the thermal light illuminates, leave the machine ON so the fan can cool internal components. Do not shut off power.',
    x: 20,
    y: 50
  },
  {
    id: 'primary-cable',
    name: 'Primary Power Input Cable & Circuit Breaker',
    function: 'Supplies high-voltage AC mains power from the shop distribution panel into the welding machine.',
    specs: '3-core or 4-core heavy industrial rubber-sheathed cable with separate dedicated green/yellow ground conductor.',
    sopInspection: 'Confirm plug prongs are clean and undamaged; verify green earth conductor is securely grounded to earth ground.',
    safetyNote: 'Never remove the round earth grounding pin from the primary power plug. Always connect to a properly fused disconnect switch.',
    x: 10,
    y: 35
  }
];

// 7.1.4 & 7.1.5 Five Machine Types & Comparative Data
export const MACHINE_TYPES: MachineType[] = [
  {
    id: 'dc-rectifier',
    name: 'Direct Current (DC) Arc Welding Machine (Transformer-Rectifier)',
    shortName: 'DC Rectifier',
    electricalSource: '3-Phase or Single-Phase AC Mains (230V / 400V / 460V)',
    outputCurrent: 'DC',
    workingPrinciple: 'Utilizes a step-down transformer to reduce incoming AC line voltage, followed by a heavy-duty solid-state diode or silicon-controlled rectifier (SCR) bridge that converts AC sine waves into smooth direct current (DC). Smoothing inductors (choke coils) filter out residual voltage ripple to stabilize the arc.',
    internalMechanism: 'Primary & secondary copper/aluminum transformer coils -> Full-wave selenium/silicon diode bridge -> Filtering reactor choke -> Output terminals.',
    standards: [
      { code: 'AWS D1.1 / D1.1M', organization: 'American Welding Society', description: 'Structural Welding Code - Steel; mandates constant-current DC power sources for critical structural SMAW joints.' },
      { code: 'EN 60974-1', organization: 'European Standard (CENELEC)', description: 'Arc welding equipment - Part 1: Welding power sources safety, electrical insulation, and performance.' },
      { code: 'NEMA EW-1', organization: 'National Electrical Manufacturers Association', description: 'Electric Arc-Welding Power Apparatus standards for rating and duty cycle tests.' }
    ],
    advantages: [
      'Allows precise selection of polarity: DCEN (straight) or DCEP (reverse) for tailored penetration.',
      'Extremely stable, quiet, and smooth arc with substantially reduced spatter compared to AC.',
      'Compatible with all AWS electrode classifications, including cellulose E6010 and low-hydrogen E7018.',
      'Superior out-of-position welding capability (vertical-up and overhead) due to consistent puddle control.',
      'Easy arc striking and restriking, reducing electrode freezing and sticking.'
    ],
    disadvantages: [
      'Susceptible to "Arc Blow" caused by unbalanced magnetic fields in magnetic metals and corners.',
      'Higher initial capital cost and greater weight than simple AC transformers.',
      'Rectifier diodes produce heat losses, yielding slightly lower electrical efficiency (~65%–75%).',
      'Requires clean ambient cooling air; metallic grinding dust can short-circuit diode heatsinks.'
    ],
    efficiency: '65% - 75%',
    portability: 'Stationary / Heavy',
    costTier: '$$$',
    arcBlowVulnerability: 'High',
    commonApplications: ['Pressure vessel fabrication', 'Structural steel erection (shop)', 'Pipeline welding', 'Shipbuilding heavy manufacturing']
  },
  {
    id: 'ac-transformer',
    name: 'Alternating Current (AC) Arc Welding Machine (Step-Down Transformer)',
    shortName: 'AC Transformer',
    electricalSource: 'Single-Phase AC Mains (110V / 230V / 400V)',
    outputCurrent: 'AC',
    workingPrinciple: 'Operates purely on electromagnetic mutual induction. A magnetic core with a primary winding (high voltage, low current) induces a low voltage, high amperage current into a movable secondary winding. Current reverses direction 50 or 60 times per second (50Hz/60Hz), crossing zero volts 100 or 120 times every second.',
    internalMechanism: 'Laminated silicon steel core -> Primary winding -> Moving core or magnetic shunt leakage control -> Secondary output winding.',
    standards: [
      { code: 'ISO 4063 (Process 111)', organization: 'International Organization for Standardization', description: 'Manual metal arc welding (metal arc welding with covered electrode).' },
      { code: 'EN 60974-1', organization: 'European Standard', description: 'Safety requirements for electric arc welding power supplies.' },
      { code: 'ANSI Z49.1', organization: 'American National Standards Institute', description: 'Safety in Welding, Cutting, and Allied Processes.' }
    ],
    advantages: [
      'Completely immune to "Arc Blow" because the alternating magnetic field cancels itself out every half-cycle.',
      'Lowest initial purchase price of any industrial welding machine type.',
      'Simple, robust construction with no moving electronic components; exceptional mechanical durability.',
      'Low maintenance requirements and long operating lifespan with minimal servicing.',
      'Ideal for heavy plate fabrication where magnetized steel would deflect a DC arc.'
    ],
    disadvantages: [
      'Arc is less stable and harsher; arc extinguishes and reignites at every zero-voltage crossing.',
      'Higher spatter levels and poorer surface bead finish compared to DC.',
      'Incompatible with pure DC electrodes such as AWS E6010 (requires specialized AC electrodes like E6011 or E6013).',
      'Cannot change polarity; heat is fixed at approximately 50% electrode / 50% workpiece.',
      'Heavy and bulky for its power output; poor electrical power factor without correction capacitors.'
    ],
    efficiency: '80% - 85%',
    portability: 'Stationary / Heavy',
    costTier: '$',
    arcBlowVulnerability: 'None (AC)',
    commonApplications: ['General farm maintenance', 'Educational vocational basic training', 'Heavy structural plate where magnetic arc blow is severe', 'Sheet metal tacking']
  },
  {
    id: 'integrated-ac-dc',
    name: 'Integrated AC/DC Multi-Process & Inverter Arc Welding Machine',
    shortName: 'Integrated AC/DC Inverter',
    electricalSource: 'Single-Phase or 3-Phase AC (110V–480V Auto-Line)',
    outputCurrent: 'AC/DC',
    workingPrinciple: 'Incoming line AC power is directly rectified into high-voltage DC, then rapidly switched on/off by high-speed Insulated Gate Bipolar Transistors (IGBTs) or MOSFETs at ultrasonic frequencies (20 kHz to 100+ kHz). A miniature high-frequency transformer steps down the voltage, followed by ultra-fast recovery diodes and microprocessors that synthesize either pristine DC or custom square-wave AC with adjustable frequency and balance.',
    internalMechanism: 'Input rectifier -> Microprocessor IGBT inverter bridge (20-100 kHz) -> High-frequency ferrite transformer -> Output ultra-fast diodes -> Waveform microprocessor.',
    standards: [
      { code: 'IEC 60974-1 / EN 60974-10', organization: 'International Electrotechnical Commission', description: 'Power source safety and electromagnetic compatibility (EMC) requirements.' },
      { code: 'AWS D1.1 Clause 5', organization: 'American Welding Society', description: 'Power source calibration and qualification for pre-qualified welding procedures.' },
      { code: 'ASME Section IX', organization: 'American Society of Mechanical Engineers', description: 'Boiler and Pressure Vessel Code - Welding Qualifications.' }
    ],
    advantages: [
      'Unrivaled electrical energy efficiency (85%–93%), slashing power consumption and utility costs.',
      'Ultra-lightweight and compact (often 8kg–18kg), allowing operators to carry it on shoulder straps.',
      'Dual capability: seamless switching between DCEP, DCEN, and full variable-frequency AC.',
      'Advanced digital arc dynamics: Hot Start (strike ease), Arc Force (anti-sticking), and adjustable inductance.',
      'Multi-process adaptability: easily runs SMAW, GTAW (TIG with HF pulse), and GMAW (MIG).'
    ],
    disadvantages: [
      'Higher initial purchase price due to sophisticated solid-state electronics.',
      'Vulnerable to harsh moisture, conductive metal grinding dust, and corrosive maritime environments.',
      'Complex internal circuitry requires certified electronic technicians for troubleshooting and repair.',
      'Can generate high-frequency electromagnetic interference (EMI) if not properly shielded.'
    ],
    efficiency: '88% - 93%',
    portability: 'High',
    costTier: '$$$$',
    arcBlowVulnerability: 'Low',
    commonApplications: ['Field repairs and mechanical plant maintenance', 'Aerospace and sanitary pipe welding', 'Offshore rig emergency maintenance', 'Precision tool and die repair']
  },
  {
    id: 'engine-driven-generator',
    name: 'Power-Driven Direct Current Petrol/Diesel Arc Welding Generator',
    shortName: 'Engine DC Generator',
    electricalSource: 'Internal Combustion Engine (Diesel or Petrol Fuel)',
    outputCurrent: 'DC',
    workingPrinciple: 'An internal combustion engine (petrol or diesel) drives a heavy rotating mechanical alternator/dynamo. As the rotor coils turn through an electromagnetic stator field, three-phase high-amperage current is generated, which is rectified internally into pure, stable direct current. Mechanical governors or electronic throttle controls adjust engine RPM based on arc load demands.',
    internalMechanism: '4-stroke diesel/petrol engine -> Direct drive coupling -> Rotating armature/field coils -> Brushless alternator -> Heavy rectifier / slip rings -> Auxiliary 120V/240V generator outlets.',
    standards: [
      { code: 'API 1104', organization: 'American Petroleum Institute', description: 'Welding of Pipelines and Related Facilities; industry standard for overland cross-country pipe welding.' },
      { code: 'AWS D1.1 / D1.5', organization: 'American Welding Society', description: 'Structural and Bridge Welding Codes for remote outdoor infrastructure.' },
      { code: 'EPA Tier 4 / EU Stage V', organization: 'Environmental Protection Agencies', description: 'Emission limits for off-road compression ignition diesel engines.' }
    ],
    advantages: [
      '100% independent of electrical grid infrastructure; operates anywhere in remote fields or deserts.',
      'Produces an exceptionally smooth, soft, buttery DC arc highly prized by cross-country pipeline welders.',
      'Provides simultaneous high-capacity auxiliary AC power (5kW–15kW) to run grinders, lights, and heaters.',
      'Extremely rugged, weatherproof construction built for mud, dust, and sub-zero outdoor conditions.',
      'High continuous 100% duty cycle rating for all-day heavy welding operations.'
    ],
    disadvantages: [
      'High fuel consumption, ongoing fossil fuel expense, and continuous carbon exhaust emissions.',
      'Loud acoustic noise requires hearing protection and violates urban night noise ordinances.',
      'Heavy physical mass (300kg to over 1,000kg), requiring dedicated truck beds or crane trailers.',
      'Demands frequent mechanical maintenance (engine oil, filters, coolant, glow plugs, belts).'
    ],
    efficiency: '30% - 40% (Fuel thermal)',
    portability: 'Medium',
    costTier: '$$$$',
    arcBlowVulnerability: 'Moderate',
    commonApplications: ['Overland cross-country oil & gas pipelines', 'Bridge and highway construction', 'Remote farm and ranch fencing/structures', 'Emergency disaster infrastructure repair']
  },
  {
    id: 'motor-driven-generator',
    name: 'Electric Motor-Driven Direct Current Arc Welding Generator',
    shortName: 'Motor-Driven DC Generator',
    electricalSource: '3-Phase AC Mains Electric Motor (400V/460V)',
    outputCurrent: 'DC',
    workingPrinciple: 'An electric AC induction motor (running on utility power) is coupled on a single common shaft to a direct current dynamo generator. The motor rotates the generator armature within an electromagnetic stator field. Carbon brushes resting on a segmented commutator collect the induced DC current, delivering pure, ripple-free direct current with massive rotating rotational inertia that buffers momentary load shocks.',
    internalMechanism: '3-Phase AC induction motor -> Common steel drive shaft -> DC dynamo generator -> Commutator & carbon brushes -> Interpole windings for spark-free commutation.',
    standards: [
      { code: 'NEMA EW-1 Clause 4', organization: 'National Electrical Manufacturers Association', description: 'Motor-generator arc welding apparatus ratings and temperature rise limits.' },
      { code: 'BS 638', organization: 'British Standards Institution', description: 'Arc welding equipment, power sources and accessories specification.' },
      { code: 'ASME Section IX', organization: 'American Society of Mechanical Engineers', description: 'Prequalified power characteristics for heavy wall nuclear and pressure vessels.' }
    ],
    advantages: [
      'Produces the purest, most ripple-free direct current possible, yielding zero electronic harmonic noise.',
      'Massive rotational inertia of the heavy spinning armature absorbs arc flutter and prevents arc stalling.',
      'Extraordinary physical longevity; classic units (e.g. Lincoln SAE-400 / Hobart) often run for 40+ years.',
      'Zero local engine emissions; safe for indoor industrial bays with suitable electrical service.',
      'Tolerates wide fluctuations in utility line voltage without changing arc characteristics.'
    ],
    disadvantages: [
      'Very high idle electricity consumption because the heavy motor and generator spin continuously.',
      'Carbon brushes and commutators require regular inspection, cleaning, reseating, and maintenance.',
      'Extremely heavy, bulky, and noisy due to high-speed cooling fan and rotating bearings.',
      'Requires heavy 3-phase industrial power wiring and heavy starting contactors.',
      'Obsolete in new production, largely superseded by modern lightweight digital inverters.'
    ],
    efficiency: '50% - 60%',
    portability: 'Stationary / Heavy',
    costTier: '$$$',
    arcBlowVulnerability: 'Moderate',
    commonApplications: ['Heavy boiler manufacturing shops', 'Historic shipyard drydocks', 'Railway locomotive fabrication', 'Heavy structural fabricators with dedicated 3-phase substations']
  }
];

// 7.1.6 Polarity Modes & Physics
export const POLARITY_MODES: Record<string, PolarityMode> = {
  DCEN: {
    id: 'DCEN',
    name: 'Direct Current Electrode Negative (DCEN)',
    commonName: 'Straight Polarity',
    electrodeConnection: 'Connected to Negative Terminal (-)',
    workConnection: 'Connected to Positive Terminal (+)',
    electronFlow: 'Electrons flow continuously from the Electrode (-) across the arc column to the Workpiece (+).',
    heatDistribution: {
      electrode: 30,
      workpiece: 70
    },
    characteristics: [
      'Workpiece receives approximately 65%–70% of total electrical arc heat energy due to positive kinetic electron bombardment.',
      'Electrode melts at a controlled, slower burn-off rate.',
      'Creates deep base metal fusion and narrower weld bead geometry on thick plate sections.',
      'Higher heat in the base metal reduces risk of cold lap when joining heavy steel sections.'
    ],
    beadGeometry: {
      penetration: 'Deep',
      width: 'Narrow',
      buildup: 'Slightly crowned, fast freezing'
    },
    suitableElectrodes: ['E6012', 'E6013 (on DC-)', 'Specialized hardfacing rods', 'GTAW (TIG on steel/stainless)'],
    advantages: [
      'Excellent for cutting/gouging and deep penetration on heavy joints.',
      'High base metal heating melts heavy bevel roots rapidly.',
      'Stable arc with minimal cathode wander.'
    ],
    limitations: [
      'High burn-through risk on thin gauge sheet metal (<2mm).',
      'Higher susceptibility to magnetic arc blow than AC.'
    ]
  },
  DCEP: {
    id: 'DCEP',
    name: 'Direct Current Electrode Positive (DCEP)',
    commonName: 'Reverse Polarity',
    electrodeConnection: 'Connected to Positive Terminal (+)',
    workConnection: 'Connected to Negative Terminal (-)',
    electronFlow: 'Electrons flow from the Workpiece (-) across the arc column into the Electrode (+).',
    heatDistribution: {
      electrode: 70,
      workpiece: 30
    },
    characteristics: [
      'The consumable electrode receives approximately 65%–70% of arc thermal energy, resulting in rapid electrode melting and high deposition rates.',
      'Cathode cleaning action at the base plate breaks up surface oxide films.',
      'Creates a smooth, wide, medium-to-deep penetrating weld bead with excellent side-wall wetting.',
      'Universally preferred polarity for code-certified pipe welding and out-of-position structural joints.'
    ],
    beadGeometry: {
      penetration: 'Deep',
      width: 'Medium',
      buildup: 'Uniform, fine ripple profile'
    },
    suitableElectrodes: ['E6010 (Cellulose pipe rod)', 'E7018 (Low-hydrogen structural rod)', 'E7024', 'E308L (Stainless steel)'],
    advantages: [
      'Cleanest arc action with low spatter and superior penetration profile.',
      'Essential for AWS E6010 deep-penetrating open root pipeline passes.',
      'Optimal puddle control for vertical-up (3G/3F) and overhead (4G/4F) welding.'
    ],
    limitations: [
      'Susceptible to magnetic arc blow in heavy plate corners and joints.',
      'Slightly faster electrode burn-off requires experienced hand travel speed.'
    ]
  },
  AC: {
    id: 'AC',
    name: 'Alternating Current (AC)',
    commonName: 'Balanced Polarity (Cycles 50/60 Hz)',
    electrodeConnection: 'Alternates polarity between (+) and (-) 50/60 times per second',
    workConnection: 'Alternates polarity opposite to electrode terminal',
    electronFlow: 'Electrons oscillate back and forth continuously, changing direction every half-cycle (100 or 120 times/sec).',
    heatDistribution: {
      electrode: 50,
      workpiece: 50
    },
    characteristics: [
      'Heat is evenly split: approximately 50% at the electrode and 50% at the workpiece.',
      'Magnetic fields generated around the arc reverse at 50/60 Hz, neutralizing localized magnetic poles.',
      'Completely prevents and cures magnetic "Arc Blow" in deep groove joints and corner welds.',
      'Medium penetration depth with a balanced width-to-depth weld bead profile.'
    ],
    beadGeometry: {
      penetration: 'Medium',
      width: 'Wide',
      buildup: 'Moderate crown, slightly coarse ripples'
    },
    suitableElectrodes: ['E6011 (AC cellulose)', 'E6013 (AC rutile general purpose)', 'E7018-AC (Modified low hydrogen)'],
    advantages: [
      'ZERO magnetic arc blow under all structural joint geometries.',
      'Allows use of heavy, economical step-down transformer machines.',
      'Safe, reliable performance for magnetized steels and salvage welding.'
    ],
    limitations: [
      'Cannot run standard E6010 cellulose DC electrodes (arc will extinguish at zero voltage).',
      'Slightly harsher arc with higher spatter generation than pure DC.'
    ]
  }
};

// 7.1.7 Process Labels (Interactive Diagram Data)
export const PROCESS_LABELS: ProcessLabel[] = [
  {
    id: 'core-wire',
    number: 1,
    label: 'Electrode Core Wire',
    technicalRole: 'Solid metallic wire (usually low-carbon mild steel) that conducts electrical current and melts to provide the filler metal for the weld joint.',
    temperatureOrMaterial: 'Mild Steel (AWS A5.1 / ER70S grade), 1,450°C - 1,530°C melting point.',
    sopCrucialPoint: 'Must match or exceed the tensile strength of the base metal (e.g. 70,000 psi for E7018).',
    x: 210,
    y: 70
  },
  {
    id: 'flux-coating',
    number: 2,
    label: 'Extruded Flux Coating',
    technicalRole: 'Concentrated chemical coating (cellulose, rutile, iron powder, limestone, fluorides) that burns to produce shielding gas, deoxidizers, and protective slag.',
    temperatureOrMaterial: 'Mineral & organic composite, burns at 1,200°C–2,500°C.',
    sopCrucialPoint: 'Must be dry and free of cracks. Low-hydrogen electrodes (E7018) must be stored in rod ovens at 120°C (250°F) to prevent hydrogen embrittlement cracking.',
    x: 245,
    y: 110
  },
  {
    id: 'gas-shield',
    number: 3,
    label: 'Gaseous Shielding Envelope',
    technicalRole: 'Expanding cloud of carbon monoxide (CO), carbon dioxide (CO2), water vapor, and hydrogen produced by flux pyrolysis, displacing ambient air.',
    temperatureOrMaterial: 'Gas cloud, 1,500°C–3,000°C.',
    sopCrucialPoint: 'Prevents oxygen and nitrogen in the atmosphere from contacting molten steel, preventing porosity, nitrides, and catastrophic weld embrittlement.',
    x: 160,
    y: 175
  },
  {
    id: 'arc-stream',
    number: 4,
    label: 'Electric Arc Column (Plasma)',
    technicalRole: 'High-density stream of ionized gas and incandescent metal vapor carrying electrical current across the gap between the electrode tip and the weld puddle.',
    temperatureOrMaterial: 'Ionized plasma, 3,500°C to 6,000°C (6,300°F - 10,800°F).',
    sopCrucialPoint: 'Maintain arc length equal to the core wire diameter (approx. 2.5mm - 3.2mm). Excessive arc length causes spatter, porosity, and voltage drop.',
    x: 210,
    y: 195
  },
  {
    id: 'molten-pool',
    number: 5,
    label: 'Molten Weld Pool (Puddle)',
    technicalRole: 'Liquid mixture of melted base metal and transferred electrode filler metal droplets where complete metallurgical fusion occurs.',
    temperatureOrMaterial: 'Liquid steel, ~1,550°C to 1,650°C.',
    sopCrucialPoint: 'Control puddle width to 2x - 3x core wire diameter. Watch leading puddle edge to ensure complete fusion with base metal sidewalls.',
    x: 230,
    y: 225
  },
  {
    id: 'slag-blanket',
    number: 6,
    label: 'Solidifying Slag Blanket',
    technicalRole: 'Liquid silicate/titanate compounds that float to the pool surface due to lower density, deoxidizing the weld and solidifying into a vitreous protective crust.',
    temperatureOrMaterial: 'Vitreous slag, solidifies at ~1,200°C.',
    sopCrucialPoint: 'Slows the cooling rate of the hot bead to prevent martensitic quench cracking, shapes the bead crown, and must be chipped off before the next pass.',
    x: 295,
    y: 200
  },
  {
    id: 'weld-bead',
    number: 7,
    label: 'Solidified Weld Metal (Bead)',
    technicalRole: 'The finished crystalline weld deposit joining the workpieces, exhibiting uniform ripple pattern and designated mechanical properties.',
    temperatureOrMaterial: 'Solidified alloy steel, cooling from 1,400°C to ambient.',
    sopCrucialPoint: 'Inspect visually for uniform width, absence of undercut at the toes, no overlap, and zero surface pores or crater cracks.',
    x: 350,
    y: 220
  },
  {
    id: 'penetration-depth',
    number: 8,
    label: 'Penetration Depth & Fusion Line',
    technicalRole: 'The exact depth to which the base metal has melted and fused with the deposited filler metal along the root of the joint.',
    temperatureOrMaterial: 'Melt boundary boundary (1,500°C).',
    sopCrucialPoint: 'Crucial for load capacity. Incomplete penetration (lack of penetration) acts as a severe internal stress notch leading to joint failure.',
    x: 230,
    y: 255
  },
  {
    id: 'base-metal',
    number: 9,
    label: 'Base Metal (Workpiece)',
    technicalRole: 'The parent structural steel plates, pipes, or sections being permanently coalesced by the welding thermal cycle.',
    temperatureOrMaterial: 'Structural Steel (e.g. ASTM A36 / Grade 50).',
    sopCrucialPoint: 'Surfaces must be cleaned 25mm (1 inch) on each side of the joint, removing all rust, oil, grease, primer, and mill scale before welding.',
    x: 100,
    y: 245
  },
  {
    id: 'haz-zone',
    number: 10,
    label: 'Heat Affected Zone (HAZ)',
    technicalRole: 'Region of base metal adjacent to the weld that did not melt, but whose microstructure and mechanical properties were altered by welding heat.',
    temperatureOrMaterial: 'Solid state transformation zone (723°C - 1,400°C).',
    sopCrucialPoint: 'Excessive heat input creates grain coarsening in the HAZ, reducing toughness and increasing risk of hydrogen-induced delayed cracking.',
    x: 320,
    y: 255
  }
];

// 7.1.7 SOP Pre-welding Steps (Standard Operating Procedure Checklist)
export const PRE_WELD_SOP_STEPS: PreWeldSopStep[] = [
  {
    id: 'sop-1',
    stepNumber: 1,
    phase: 'Safety & PPE',
    title: 'Personal Protective Equipment (PPE) & Environment Verification',
    standardClause: 'OSHA 29 CFR 1910.252 / ANSI Z49.1 Clause 4',
    detailedProcedure: 'Don an approved welding helmet fitted with shade DIN 10–12 filter lens and clean clear cover plates. Put on dry flame-retardant split-cowhide leather welding gauntlets, leather protective jacket/sleeves, and steel-toe safety boots with metatarsal protection. Verify fire extinguisher (Class ABC / CO2) is within 10 meters. Confirm local exhaust ventilation (LEV) is running and surrounding area is free of combustible materials within a 35-foot (11m) radius.',
    hazardsAvoided: ['Arc eye (photokeratitis)', 'Third-degree UV/IR skin radiation burns', 'Toxic hexavalent chromium/ozone inhalation', 'Workshop fires'],
    acceptanceCriteria: 'Welder 100% outfitted in undamaged PPE; welding booth dry, clear of flammables, exhaust functional.'
  },
  {
    id: 'sop-2',
    stepNumber: 2,
    phase: 'Equipment & Cable',
    title: 'Welding Machine, Electrical Cables & Ground Return Inspection',
    standardClause: 'AWS D1.1 Clause 5.11 / EN 60974-1',
    detailedProcedure: 'Inspect primary power cable and plug for cuts, exposed insulation, or damaged grounding pins. Uncoil electrode and work cables completely to prevent inductive coil choke. Check cables for bare copper strands, taped splices within 3 meters of stinger, and ensure Dinse connector lugs are firmly locked. Inspect electrode holder jaws for cracked insulation and strong spring tension. Secure work clamp directly to clean bare metal on the workpiece (never onto painted surfaces or bearings).',
    hazardsAvoided: ['Electric shock (electrocution)', 'Resistive cable fires', 'Erratic arc instability', 'Bearing destruction'],
    acceptanceCriteria: 'Zero exposed copper conductors; solid metal-to-metal ground clamp contact; stinger jaws fully insulated.'
  },
  {
    id: 'sop-3',
    stepNumber: 3,
    phase: 'Base Metal Prep',
    title: 'Base Metal Cleaning, Joint Geometry & Fit-Up Check',
    standardClause: 'AWS D1.1 Clause 5.14 & 5.21 / ISO 9692-1',
    detailedProcedure: 'Using an angle grinder with wire cup brush or abrasive disc, grind joint faces and adjacent surfaces at least 25mm (1 inch) back from the weld bevel. Remove all rust, heavy mill scale, paint, oil, cutting grease, moisture, and slag from previous flame cutting. Verify root gap (typically 1.5mm–3.2mm), root face (1.5mm–2.5mm), and included bevel angle (60°–70° for V-joints) using a certified welding bridge cam gauge.',
    hazardsAvoided: ['Hydrogen porosity', 'Lack of root fusion', 'Wormhole porosity from oil pyrolysis', 'Excessive shrinkage stress'],
    acceptanceCriteria: 'Bright shiny bare metal surface; root opening and alignment within ±0.8mm WPS tolerance.'
  },
  {
    id: 'sop-4',
    stepNumber: 4,
    phase: 'Electrode Handling',
    title: 'Electrode Identification, Moisture Verification & Baking Status',
    standardClause: 'AWS A5.1 / ASME SFA-5.1 / AWS D1.1 Table 5.1',
    detailedProcedure: 'Verify the AWS classification stamped on the electrode coating matches the approved Welding Procedure Specification (WPS) (e.g. AWS E7018-H4R for structural steel). If using basic low-hydrogen electrodes (E7018), confirm they were drawn from a holding oven maintained at 120°C (250°F) and are within their 4-hour atmospheric exposure limit. Reject electrodes with chipped flux, rust on core wire, or oil stains.',
    hazardsAvoided: ['Underbead cracking (cold cracking)', 'Hydrogen-assisted stress cracking', 'Arc flare from chipped flux'],
    acceptanceCriteria: 'Electrode classification verified; flux coating intact; low-hydrogen rods hot from holding quiver.'
  },
  {
    id: 'sop-5',
    stepNumber: 5,
    phase: 'Machine Setup',
    title: 'Polarity Selection, Amperage Calibration & Test Strike on Scrap Plate',
    standardClause: 'WPS Parameter Compliance / AWS D1.1 Clause 5.3',
    detailedProcedure: 'Set machine polarity switch to match electrode requirements (e.g., DCEP for E7018 / E6010; DCEN or AC as specified). Calculate and dial in the target amperage based on core diameter (Rule of thumb: ~35-40 Amps per mm of core diameter, e.g. 110A–130A for 3.2mm E7018). Power on machine, observe cooling fan, and execute a brief test strike on an isolated scrap plate of identical thickness to verify arc stability, sound ("crisp frying sizzle"), and absence of spatter before touching the production assembly.',
    hazardsAvoided: ['Lack of penetration from low amps', 'Undercut/burn-through from excessive current', 'Inadvertent reverse polarity'],
    acceptanceCriteria: 'Target amperage dial set within WPS band; stable arc proven on scrap test piece.'
  }
];

// 7.1.8 & 7.1.9 Five Types of Basic Joints & Their Merits/Uses
export const WELDING_JOINTS: WeldingJoint[] = [
  {
    id: 'butt-joint',
    name: 'Butt Joint',
    aka: 'Square Butt, Single-V, Double-V, U-Groove, J-Groove',
    description: 'A joint between two members lying in substantially the same plane, placed edge-to-edge. Commonly used for joining plates, structural beam webs, and pipe circumferences.',
    variations: [
      'Square Butt (plates up to 4mm / 3/16")',
      'Single-V Butt (plates 5mm - 16mm, 60° included angle)',
      'Double-V Butt (heavy plates >16mm, balances thermal distortion)',
      'Single-U / Double-U Butt (thick pressure vessels >20mm to minimize filler metal volume)'
    ],
    advantages: [
      'Provides the highest mechanical efficiency: when welded with full penetration, it achieves 100% joint efficiency equal to the parent metal strength.',
      'Smooth, continuous stress-flow lines with minimal stress concentration, providing superior resistance to fatigue and dynamic cyclic loading.',
      'Aesthetically flat and flush when ground, requiring zero overlapping metal.',
      'Easy to inspect non-destructively using Radiographic (RT) and Ultrasonic (UT) testing methods.'
    ],
    disadvantages: [
      'Requires precise edge preparation (beveling/grinding) and tight dimensional fit-up tolerances.',
      'Susceptible to angular distortion (transverse shrinkage causing plates to peak or butterfly).',
      'Requires backing bars or skilled root-pass manipulation to prevent burn-through or lack of penetration.'
    ],
    industrialUses: [
      'High-pressure vessels, steam boilers, and chemical autoclaves (ASME Section VIII).',
      'Overland petroleum and natural gas cross-country pipelines (API 1104).',
      'Shipbuilding hull plating, deck seams, and submarine hulls.',
      'Structural steel bridge girders and building column splices (AWS D1.1).'
    ],
    preparationRequirements: 'Plates >5mm require 30° bevels (60° included V), 1.5mm-2.5mm root face, and 2mm-3mm root opening.',
    strengthCharacteristics: {
      tensile: 'Excellent',
      fatigue: 'High',
      shear: 'High'
    },
    thicknessRange: 'From 1.5mm sheet up to 100mm+ heavy forge plate'
  },
  {
    id: 'tee-joint',
    name: 'Tee (T) Joint',
    aka: 'T-Fillet, Bevel-Tee, J-Groove Tee',
    description: 'A joint between two members located approximately at right angles (90°) to each other in the form of a "T". One of the most ubiquitous joints in structural steel fabrication.',
    variations: [
      'Square Tee with Single Fillet Weld',
      'Square Tee with Double Fillet Welds (standard for structural ribs)',
      'Single-Bevel / Double-Bevel Groove Tee (for deep dynamic load penetration)',
      'Deep Penetration Fillet'
    ],
    advantages: [
      'Extremely simple and economical to fit up; requires little to no edge beveling for standard fillet welds on plates up to 12mm.',
      'Outstanding stiffness and rigidity against bending moments and torsional loads.',
      'Double fillet welds balance structural shear capacity on both sides of the vertical web.',
      'Versatile: can be welded in flat (1F), horizontal (2F), vertical (3F), and overhead (4F) positions.'
    ],
    disadvantages: [
      'Creates abrupt 90° geometric transitions that generate high stress concentrations at the weld toes.',
      'Lower fatigue resistance under cyclic or vibrating loads compared to a full penetration butt joint.',
      'Susceptible to lamellar tearing in heavy rolled steel plates under high through-thickness shrinkage strain.'
    ],
    industrialUses: [
      'Fabricated structural I-beams, H-columns, and heavy crane runway girders.',
      'Internal stiffeners and bulkheads in ship hulls and offshore platforms.',
      'Heavy machinery machine beds, press frames, and engine foundation bases.',
      'Storage tank bottoms joined to vertical cylindrical shell walls (API 650).'
    ],
    preparationRequirements: 'Square edges acceptable for fillet welds; heavy loads require single or double 45° bevel on vertical web.',
    strengthCharacteristics: {
      tensile: 'Good',
      fatigue: 'Medium',
      shear: 'High'
    },
    thicknessRange: '3mm to 50mm+'
  },
  {
    id: 'corner-joint',
    name: 'Corner Joint',
    aka: 'Flush Corner, Half-Open Corner, Full-Open Corner',
    description: 'A joint between two members located approximately at right angles (90°) to each other at their outer edges, forming an L-shape.',
    variations: [
      'Flush (Closed) Corner (for thin sheet metal, light structural frames)',
      'Half-Open Corner (medium plates, provides a natural V-groove without beveling)',
      'Full-Open Corner (heavy plate tanks and rectangular box beams, allows maximum penetration and easiest welding)'
    ],
    advantages: [
      'Full-open corner naturally creates an ideal V-groove groove, requiring zero preparatory machining or beveling.',
      'Allows welding from both outside (groove weld) and inside (fillet weld) for maximum strength.',
      'Enables construction of clean, rigid rectangular cross-sections, box columns, and enclosures.',
      'High torsional rigidity when fabricated into closed rectangular hollow sections (RHS).'
    ],
    disadvantages: [
      'Difficult to maintain exact 90° squareness during tacking and welding without heavy clamping fixtures.',
      'High angular distortion due to asymmetric shrinkage around the outer corner corner.',
      'Flush corner joints have poor root penetration and low load resistance under internal pressure.'
    ],
    industrialUses: [
      'Rectangular box girders, hollow boom sections for construction cranes and excavators.',
      'Tanks, bins, hoppers, pressure containers, and sheet metal transformer casings.',
      'Machine guards, electrical enclosures, and industrial ductwork.',
      'Architectural structural hollow columns and canopy frames.'
    ],
    preparationRequirements: 'Full-open requires precise 90° corner-to-corner edge alignment; flush corners need light clamping.',
    strengthCharacteristics: {
      tensile: 'Good',
      fatigue: 'Medium',
      shear: 'Moderate'
    },
    thicknessRange: '1.2mm sheet to 30mm heavy box section'
  },
  {
    id: 'lap-joint',
    name: 'Lap Joint',
    aka: 'Single Lap, Double Lap, Jogged Lap, Plug/Slot Lap',
    description: 'A joint between two overlapping members in parallel planes. The overlapping surfaces are joined by one or two fillet welds along the seam edges, or by plug/slot welds.',
    variations: [
      'Single Fillet Lap Joint (light loads only)',
      'Double Fillet Lap Joint (balances transverse shear)',
      'Jogged (Offset) Lap Joint (minimizes eccentricity)',
      'Plug / Slot Welded Lap Joint (for wide overlapping plates)'
    ],
    advantages: [
      'Zero edge preparation required: square sheared, sawed, or flame-cut edges can be welded directly without beveling.',
      'Forgiving dimensional fit-up: easily accommodates minor plate length errors by adjusting overlap distance.',
      'Double fillet lap provides high shear load capacity across the overlapping interface.',
      'Ideal for field repair patches, tank floor plate laps, and joining dissimilar thickness materials.'
    ],
    disadvantages: [
      'Inherently eccentric load path creates bending stresses under tensile loading, reducing effective strength.',
      'Traps an unwelded gap between plates that can trap moisture and cause hidden crevice corrosion.',
      'Adds dead weight due to overlapping steel (minimum overlap is typically 4x to 5x thinner plate thickness).'
    ],
    industrialUses: [
      'Storage tank bottoms (annular and sketch plates) in petroleum storage tanks (API 650).',
      'Automotive chassis repair, truck body reinforcement patches, and trailer floors.',
      'HVAC sheet metal ductwork, agricultural implement wear plates, and farm hopper linings.',
      'Structural gusset plates connecting diagonal bridge truss members.'
    ],
    preparationRequirements: 'Overlapping surfaces must be cleaned of heavy rust and oil; minimum overlap = 4t.',
    strengthCharacteristics: {
      tensile: 'Fair',
      fatigue: 'Low',
      shear: 'High'
    },
    thicknessRange: '1.0mm to 20mm plate'
  },
  {
    id: 'edge-joint',
    name: 'Edge Joint',
    aka: 'Flanged Edge, Square Edge, Beveled Edge',
    description: 'A joint between the edges of two or more parallel or nearly parallel members. Commonly used where two sheet metal edges or plate ends meet side-by-side.',
    variations: [
      'Square Edge Joint (flush edges welded across top)',
      'Flanged Edge Joint (edges pre-bent 90° and fused together, often autogenous or with light filler)',
      'Beveled Edge Joint (one or both edges pre-chamfered for deeper penetration)'
    ],
    advantages: [
      'Most economical joint for thin sheet metal containers and light assemblies.',
      'Can frequently be welded with minimal filler metal or by simply melting down flanged edges.',
      'Very fast travel speed and minimal total heat input, minimizing thermal distortion in thin sheets.',
      'Easy to tack weld and align along long sheet metal seams.'
    ],
    disadvantages: [
      'Lowest mechanical load capacity of all 5 joints; poor resistance to bending, impact, or tensile stress.',
      'Under tensile load, the root notch opens up easily, leading to rapid peeling and catastrophic failure.',
      'Not permitted for structural building frames, pressurized vessels, or fatigue-critical piping.'
    ],
    industrialUses: [
      'Sheet metal muffler casings, decorative metal containers, and architectural flashing.',
      'Light metal enclosures, acoustic baffles, and electrical control cabinet covers.',
      'Reinforcing edge flanges on automotive stamped panels and oil pans.',
      'Laminating multiple thin sheet metal leaves for non-structural cladding.'
    ],
    preparationRequirements: 'Edges must be sheared square and clamped tight with zero gap between parallel sheets.',
    strengthCharacteristics: {
      tensile: 'Fair',
      fatigue: 'Low',
      shear: 'Moderate'
    },
    thicknessRange: '0.8mm to 6mm sheet metal'
  }
];

// Reference Welding Electrodes & Parameters
export const ELECTRODE_PARAMETERS = [
  {
    code: 'E6010',
    type: 'Cellulose Sodium (High Cellulose)',
    currentType: 'DCEP Only',
    penetration: 'Deep / Forceful',
    slag: 'Thin, friable',
    positions: 'All Positions (1G, 2G, 3G Vertical-Down & Up, 4G, 5G, 6G)',
    primaryUse: 'Pipeline cross-country open root passes (API 1104), rusty/dirty steel',
    diameters: [
      { sizeMm: 2.4, sizeInch: '3/32"', ampMin: 40, ampMax: 70, optAmp: 55, voltRange: '24-28V' },
      { sizeMm: 3.2, sizeInch: '1/8"', ampMin: 65, ampMax: 130, optAmp: 95, voltRange: '24-28V' },
      { sizeMm: 4.0, sizeInch: '5/32"', ampMin: 90, ampMax: 175, optAmp: 135, voltRange: '24-30V' },
      { sizeMm: 5.0, sizeInch: '3/16"', ampMin: 140, ampMax: 225, optAmp: 180, voltRange: '26-32V' }
    ]
  },
  {
    code: 'E6011',
    type: 'Cellulose Potassium (AC/DC Pipe Rod)',
    currentType: 'AC or DCEP',
    penetration: 'Deep / Forceful',
    slag: 'Thin, easily chipped',
    positions: 'All Positions (1G to 4G, Vertical Down/Up)',
    primaryUse: 'Farm repairs, maintenance, AC transformer pipeline welding, dirty steel',
    diameters: [
      { sizeMm: 2.4, sizeInch: '3/32"', ampMin: 45, ampMax: 80, optAmp: 65, voltRange: '22-26V' },
      { sizeMm: 3.2, sizeInch: '1/8"', ampMin: 75, ampMax: 125, optAmp: 100, voltRange: '24-28V' },
      { sizeMm: 4.0, sizeInch: '5/32"', ampMin: 105, ampMax: 165, optAmp: 140, voltRange: '26-30V' },
      { sizeMm: 5.0, sizeInch: '3/16"', ampMin: 150, ampMax: 215, optAmp: 185, voltRange: '26-32V' }
    ]
  },
  {
    code: 'E6013',
    type: 'Rutile Potassium (General Purpose / Sheet Metal)',
    currentType: 'AC, DCEN, or DCEP',
    penetration: 'Shallow to Medium',
    slag: 'Heavy, self-peeling',
    positions: 'All Positions (Outstanding for Sheet Metal & Tacking)',
    primaryUse: 'General fabrication, gates, railings, thin sheet metal, vocational training',
    diameters: [
      { sizeMm: 2.0, sizeInch: '5/64"', ampMin: 30, ampMax: 60, optAmp: 45, voltRange: '18-22V' },
      { sizeMm: 2.5, sizeInch: '3/32"', ampMin: 50, ampMax: 90, optAmp: 70, voltRange: '20-24V' },
      { sizeMm: 3.2, sizeInch: '1/8"', ampMin: 80, ampMax: 130, optAmp: 105, voltRange: '22-26V' },
      { sizeMm: 4.0, sizeInch: '5/32"', ampMin: 110, ampMax: 170, optAmp: 145, voltRange: '24-28V' }
    ]
  },
  {
    code: 'E7018',
    type: 'Basic Low-Hydrogen Potassium Iron Powder',
    currentType: 'DCEP (preferred) or AC',
    penetration: 'Medium',
    slag: 'Heavy, glassy, protective',
    positions: 'All Positions (except vertical down; 3G is vertical-up only)',
    primaryUse: 'Structural steel buildings (AWS D1.1), bridges, heavy machinery, pressure vessels',
    diameters: [
      { sizeMm: 2.5, sizeInch: '3/32"', ampMin: 70, ampMax: 105, optAmp: 90, voltRange: '20-24V' },
      { sizeMm: 3.2, sizeInch: '1/8"', ampMin: 90, ampMax: 150, optAmp: 125, voltRange: '22-26V' },
      { sizeMm: 4.0, sizeInch: '5/32"', ampMin: 130, ampMax: 200, optAmp: 165, voltRange: '23-27V' },
      { sizeMm: 5.0, sizeInch: '3/16"', ampMin: 180, ampMax: 280, optAmp: 230, voltRange: '24-28V' }
    ]
  }
];

// Comprehensive Mastery & Certification Quiz
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    sectionCode: '7.1.1',
    question: 'In Shielded Metal Arc Welding (SMAW), what primary mechanism protects the liquid molten weld pool from oxygen and nitrogen contamination in ambient air?',
    options: [
      'A continuous blast of compressed argon gas supplied from an external pressurized gas cylinder.',
      'The pyrolytic combustion and decomposition of the electrode flux coating creating an expanding protective gaseous shield and liquid slag blanket.',
      'A vacuum created inside the electric arc plasma stream.',
      'The natural high surface tension of molten steel preventing gas absorption.'
    ],
    correctIndex: 1,
    explanation: 'The flux coating on the electrode decomposes in the extreme arc heat, releasing CO, CO2, and mineral gases that displace air, while deoxidizers form a floating slag layer that insulates the hot weld metal.',
    standardReference: 'AWS D1.1 / ISO 4063 Process 111'
  },
  {
    id: 2,
    sectionCode: '7.1.2',
    question: 'What immediate metallurgical and visual defect occurs when the ampere adjustment control is set significantly too HIGH for the electrode diameter?',
    options: [
      'Electrode freezes (sticks) immediately to the workpiece with incomplete fusion.',
      'Narrow, excessively crowned rope-like bead with extreme cold lap at the toes.',
      'Severe undercut along the weld toes, excessive spatter, deep crater burn-through, and overheated flux coating breakdown.',
      'Complete absence of electrical arc ignition.'
    ],
    correctIndex: 2,
    explanation: 'Excessive current generates surplus heat input, causing the arc to gouge out base metal at the toes that cannot be filled in time (undercut), wild spatter, and thermal breakdown of the flux coating before the rod is consumed.',
    standardReference: 'AWS Welding Handbook Vol. 2'
  },
  {
    id: 3,
    sectionCode: '7.1.3',
    question: 'According to OSHA 29 CFR 1910.252, what is the mandatory safety requirement regarding electrical cable condition within 10 feet (3 meters) of the electrode holder (stinger)?',
    options: [
      'Cables may have multiple electrical tape splices provided vinyl tape is used.',
      'Cables within 10 feet of the holder must be completely free of splices, cuts, or repaired joints to protect the welder from lethal shock.',
      'Cables must be made of bare aluminum to shed heat rapidly.',
      'Cables must be coiled tightly in loops next to the welder to reduce voltage drops.'
    ],
    correctIndex: 1,
    explanation: 'OSHA 1910.252(b)(3)(iii) explicitly states that only cables in good condition without splices shall be used within 10 feet (3m) of the holder to eliminate electric shock hazards near the operator hands.',
    standardReference: 'OSHA 29 CFR 1910.252(b)(3)'
  },
  {
    id: 4,
    sectionCode: '7.1.4',
    question: 'Which international and European standard governs the design, electrical safety, insulation, and duty cycle testing of arc welding power sources?',
    options: [
      'ISO 9001:2015 Quality Management Systems',
      'IEC / EN 60974-1 (Arc Welding Equipment - Part 1: Welding Power Sources)',
      'ASTM A36 Standard Specification for Carbon Structural Steel',
      'API 5L Specification for Line Pipe'
    ],
    correctIndex: 1,
    explanation: 'EN 60974-1 (and international equivalent IEC 60974-1) is the recognized global standard defining construction, insulation resistance, duty cycle verification, and thermal safety for arc welding power sources.',
    standardReference: 'EN 60974-1 / IEC 60974-1'
  },
  {
    id: 5,
    sectionCode: '7.1.5',
    question: 'Why is an Alternating Current (AC) welding machine chosen over a Direct Current (DC) machine when welding in deep grooves of magnetized heavy steel plates?',
    options: [
      'AC produces significantly deeper penetration than DC.',
      'AC is completely immune to magnetic "Arc Blow" because the alternating 50/60 Hz field cancels out residual magnetic deflection.',
      'AC allows the welder to use AWS E6010 cellulose electrodes.',
      'AC eliminates the need for personal protective equipment.'
    ],
    correctIndex: 1,
    explanation: 'Magnetic arc blow occurs when DC magnetic fields concentrate in heavy plates or corners, deflecting the arc wildly. AC continuously reverses magnetic direction 100/120 times per second, effectively eliminating arc blow.',
    standardReference: 'AWS D1.1 Clause 5.11'
  },
  {
    id: 6,
    sectionCode: '7.1.6',
    question: 'Under Direct Current Electrode Positive (DCEP / Reverse Polarity), what is the approximate thermal heat distribution between the electrode and the workpiece?',
    options: [
      '100% heat on the workpiece, 0% on the electrode.',
      'Approximately 70% of the heat is generated at the electrode and 30% at the workpiece.',
      'Approximately 30% of the heat is generated at the electrode and 70% at the workpiece.',
      'Heat is exactly 50% / 50% split at all times.'
    ],
    correctIndex: 1,
    explanation: 'In DCEP, electrons stream from the negative work to bombard the positive electrode (+), concentrating ~65-70% of the arc heat at the electrode tip. This accelerates rod melt-off and provides deep penetration and cleaning action.',
    standardReference: 'AWS Technical Publication - Polarity Principles'
  },
  {
    id: 7,
    sectionCode: '7.1.7',
    question: 'What is the primary purpose of holding AWS E7018 low-hydrogen electrodes in a heated electrode oven at 120°C (250°F) before welding?',
    options: [
      'To prevent the steel core wire from oxidizing.',
      'To prevent the flux coating from absorbing atmospheric moisture, which causes hydrogen-induced underbead cracking in high-strength steels.',
      'To make the electrode strike an arc at zero amperage.',
      'To soften the flux so the rod can be bent into 90-degree angles.'
    ],
    correctIndex: 1,
    explanation: 'Basic coatings readily absorb atmospheric humidity. Water (H2O) breaks down in the arc to liberate atomic hydrogen, which migrates into the hard HAZ and causes catastrophic delayed cold cracking (underbead cracking).',
    standardReference: 'AWS D1.1 Table 5.1 / ASME Section IX'
  },
  {
    id: 8,
    sectionCode: '7.1.7',
    question: 'In the labeled cross-section of the SMAW process, what is the region of the base metal called whose microstructure and properties were altered by welding heat without actually melting?',
    options: [
      'The Solidified Slag Cap',
      'The Crater Melt Pool',
      'The Heat Affected Zone (HAZ)',
      'The Dilution Matrix'
    ],
    correctIndex: 2,
    explanation: 'The Heat Affected Zone (HAZ) is the adjacent base metal subjected to thermal cycles between ~723°C and the solidus temperature, altering grain size, phase constituents, and hardness without melting.',
    standardReference: 'AWS A3.0 Standard Welding Terms and Definitions'
  },
  {
    id: 9,
    sectionCode: '7.1.8',
    question: 'Which of the five basic welding joints consists of two plates positioned edge-to-edge lying substantially in the same plane?',
    options: [
      'Tee (T) Joint',
      'Corner Joint',
      'Lap Joint',
      'Butt Joint'
    ],
    correctIndex: 3,
    explanation: 'A Butt Joint joins two plates edge-to-edge in the same plane, commonly configured with square, V, double-V, or U groove preparations for full-penetration high-strength joints.',
    standardReference: 'AWS D1.1 / ISO 9692-1'
  },
  {
    id: 10,
    sectionCode: '7.1.9',
    question: 'What is the principal engineering advantage of a complete joint penetration (CJP) Butt Joint compared to a Lap Joint under dynamic cyclic (fatigue) loading?',
    options: [
      'The Butt Joint requires zero beveling or edge preparation.',
      'The Butt Joint provides a smooth, collinear stress-flow path with minimal stress concentrations, delivering far superior fatigue resistance and 100% joint efficiency.',
      'The Butt Joint can be welded without an earth ground clamp.',
      'The Butt Joint creates an eccentric load path that absorbs vibration.'
    ],
    correctIndex: 1,
    explanation: 'In a full-penetration butt joint, the plates are collinear, allowing tensile and fatigue stress lines to flow smoothly through the joint. Lap joints have built-in offset eccentricity that introduces severe bending stresses and notch effects.',
    standardReference: 'AISC Steel Construction Manual / AWS D1.1'
  }
];
