// Fencing calculator engine — pure functions, no React.
// Formulas are practical KY-market estimates for demo purposes.

export type FenceStyle =
  | "cedar_privacy"
  | "chain_link"
  | "vinyl_privacy"
  | "ornamental_iron"
  | "horse_board"
  | "horizontal_modern";

export interface StyleSpec {
  id: FenceStyle;
  label: string;
  postSpacingFt: number;         // typical center-to-center
  panelWidthFt: number;          // for panelized styles
  materialPerLft: [number, number]; // low/high $ per linear ft (material only)
  laborPerLft: [number, number];    // pro install $ per linear ft
  recommendedHoleIn: number;     // hole diameter inches
  recommendedDepthIn: number;    // hole depth inches (KY frost line ~30")
  postSectionIn: number;         // approx post side/diameter, inches
  extras: string[];              // notes shown in breakdown
}

export const STYLES: Record<FenceStyle, StyleSpec> = {
  cedar_privacy: {
    id: "cedar_privacy",
    label: "Cedar Privacy",
    postSpacingFt: 8,
    panelWidthFt: 8,
    materialPerLft: [22, 34],
    laborPerLft: [18, 28],
    recommendedHoleIn: 10,
    recommendedDepthIn: 30,
    postSectionIn: 4,
    extras: ["Rough-sawn Kentucky cedar pickets", "2 pressure-treated rails per section"],
  },
  chain_link: {
    id: "chain_link",
    label: "Chain Link",
    postSpacingFt: 10,
    panelWidthFt: 10,
    materialPerLft: [12, 18],
    laborPerLft: [8, 14],
    recommendedHoleIn: 10,
    recommendedDepthIn: 30,
    postSectionIn: 2,
    extras: ["Galvanized mesh + tension wire", "Terminal posts every 100 ft"],
  },
  vinyl_privacy: {
    id: "vinyl_privacy",
    label: "Vinyl",
    postSpacingFt: 8,
    panelWidthFt: 8,
    materialPerLft: [28, 42],
    laborPerLft: [16, 24],
    recommendedHoleIn: 10,
    recommendedDepthIn: 30,
    postSectionIn: 5,
    extras: ["Pre-fab vinyl panels", "Lifetime warranty on premium lines"],
  },
  ornamental_iron: {
    id: "ornamental_iron",
    label: "Ornamental Iron",
    postSpacingFt: 6.5,
    panelWidthFt: 6.5,
    materialPerLft: [38, 62],
    laborPerLft: [22, 34],
    recommendedHoleIn: 12,
    recommendedDepthIn: 36,
    postSectionIn: 3,
    extras: ["Powder-coated aluminum or steel", "Stone pillars for estate entries"],
  },
  horse_board: {
    id: "horse_board",
    label: "Horse & Farm",
    postSpacingFt: 8,
    panelWidthFt: 8,
    materialPerLft: [16, 26],
    laborPerLft: [10, 18],
    recommendedHoleIn: 12,
    recommendedDepthIn: 36,
    postSectionIn: 5,
    extras: ["1x6 oak or PT boards", "Classic black finish for Bluegrass farms"],
  },
  horizontal_modern: {
    id: "horizontal_modern",
    label: "Horizontal",
    postSpacingFt: 6,
    panelWidthFt: 6,
    materialPerLft: [34, 52],
    laborPerLft: [22, 32],
    recommendedHoleIn: 10,
    recommendedDepthIn: 30,
    postSectionIn: 4,
    extras: ["Clear cedar slats", "Steel post option for perfect alignment"],
  },
};

export interface CalcInput {
  style: FenceStyle;
  lengthFt: number;
  heightFt: number;
  gates: number;
  gateWidthFt: number;
  holeDiameterIn: number;
  holeDepthIn: number;
  postSpacingFt?: number;   // optional override
  bagSize: 60 | 80;
  laborMode: "diy" | "pro";
  wastePct: number; // 0.10 default
}

export const DEFAULT_INPUT: CalcInput = {
  style: "cedar_privacy",
  lengthFt: 150,
  heightFt: 6,
  gates: 1,
  gateWidthFt: 4,
  holeDiameterIn: 10,
  holeDepthIn: 30,
  postSpacingFt: 8,
  bagSize: 80,
  laborMode: "pro",
  wastePct: 0.1,
};

export interface CalcResult {
  spec: StyleSpec;
  postCount: number;
  gatePosts: number;
  concreteBagsPerHole: number;
  totalBags: number;
  concreteCuFt: number;
  panels: number;
  railsLft: number;
  picketsOrBoards: number | null; // null for chain-link/iron
  hardwareKits: number;
  gateHardwareKits: number;
  materialLow: number;
  materialHigh: number;
  laborLow: number;
  laborHigh: number;
  totalLow: number;
  totalHigh: number;
  costPerLft: [number, number];
  recommendedPostLengthFt: number;
}

// bag yield (cubic ft): 80lb ≈ 0.60, 60lb ≈ 0.45
const BAG_YIELD_CU_FT = { 60: 0.45, 80: 0.6 } as const;

export function calculate(input: CalcInput): CalcResult {
  const spec = STYLES[input.style];
  const length = Math.max(0, input.lengthFt);
  const height = Math.max(3, input.heightFt);

  // Support custom post spacing override
  const spacing = input.postSpacingFt && input.postSpacingFt > 0 ? input.postSpacingFt : spec.postSpacingFt;

  // Posts: line posts every spacing, plus start post, plus 2 gate posts per gate
  const linePosts = length > 0 ? Math.ceil(length / spacing) + 1 : 0;
  const gatePosts = input.gates * 2;
  const postCount = linePosts + gatePosts;

  // Concrete per hole = cylinder volume - post displacement
  const rIn = input.holeDiameterIn / 2;
  const holeVolCuIn = Math.PI * rIn * rIn * input.holeDepthIn;
  const postVolCuIn = spec.postSectionIn * spec.postSectionIn * input.holeDepthIn;
  const netCuIn = Math.max(0, holeVolCuIn - postVolCuIn);
  const netCuFt = netCuIn / 1728;
  const bagsPerHole = netCuFt / BAG_YIELD_CU_FT[input.bagSize];
  const totalBags = Math.ceil(bagsPerHole * postCount * (1 + input.wastePct));
  const concreteCuFt = netCuFt * postCount;

  // Panels & materials
  const panels = length > 0 ? Math.ceil(length / spec.panelWidthFt) : 0;
  const railsLft = length * 2; // 2 rails per run typical
  const picketsOrBoards = (() => {
    switch (spec.id) {
      case "cedar_privacy":
      case "vinyl_privacy":
        // ~5.5" pickets on 6" spacing → ~2.2 per lft
        return Math.ceil(length * 2.2 * (1 + input.wastePct));
      case "horizontal_modern":
        // ~1x6 slats stacked to height, ceil(height/0.5ft) rows across length
        return Math.ceil((height / 0.5) * length * (1 + input.wastePct) / 6); // per 6' board
      case "horse_board":
        return Math.ceil(4 * length * (1 + input.wastePct) / 16); // 4 boards, 16' lengths
      default:
        return null;
    }
  })();

  const hardwareKits = panels; // 1 kit per panel
  const gateHardwareKits = input.gates;

  const [mLo, mHi] = spec.materialPerLft;
  const materialLow = Math.round(length * mLo);
  const materialHigh = Math.round(length * mHi);

  const [lLo, lHi] = spec.laborPerLft;
  const laborLow = input.laborMode === "pro" ? Math.round(length * lLo) : 0;
  const laborHigh = input.laborMode === "pro" ? Math.round(length * lHi) : 0;

  const gateAdder = input.gates * (input.laborMode === "pro" ? 350 : 120);
  const totalLow = materialLow + laborLow + gateAdder;
  const totalHigh = materialHigh + laborHigh + Math.round(gateAdder * 1.4);

  const recommendedPostLengthFt = Math.ceil(height + input.holeDepthIn / 12);

  return {
    spec,
    postCount,
    gatePosts,
    concreteBagsPerHole: Math.round(bagsPerHole * 10) / 10,
    totalBags,
    concreteCuFt: Math.round(concreteCuFt * 10) / 10,
    panels,
    railsLft: Math.round(railsLft),
    picketsOrBoards,
    hardwareKits,
    gateHardwareKits,
    materialLow,
    materialHigh,
    laborLow,
    laborHigh,
    totalLow,
    totalHigh,
    costPerLft: [
      length > 0 ? Math.round(totalLow / length) : 0,
      length > 0 ? Math.round(totalHigh / length) : 0,
    ],
    recommendedPostLengthFt,
  };
}

export const formatUsd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

// UI-friendly style options for the calculator (matches user request exactly)
export const STYLE_OPTIONS: Array<{
  id: FenceStyle;
  label: string;
  desc: string;
  recommendedSpacing: number;
}> = [
  { id: "cedar_privacy", label: "Cedar Privacy", desc: "Classic Kentucky cedar for quiet, private yards.", recommendedSpacing: 8 },
  { id: "horse_board", label: "Horse & Farm", desc: "4-board paddock & pasture fencing for Bluegrass farms.", recommendedSpacing: 8 },
  { id: "vinyl_privacy", label: "Vinyl", desc: "Low-maintenance, lifetime warranty vinyl panels.", recommendedSpacing: 8 },
  { id: "chain_link", label: "Chain Link", desc: "Durable galvanized or vinyl-coated for farms & yards.", recommendedSpacing: 10 },
  { id: "ornamental_iron", label: "Ornamental Iron", desc: "Elegant powder-coated for estates and entries.", recommendedSpacing: 6.5 },
  { id: "horizontal_modern", label: "Horizontal", desc: "Clean modern cedar slats for contemporary homes.", recommendedSpacing: 6 },
];

// Serialize state for URL sharing (compact query params)
export function serializeCalcState(input: CalcInput): Record<string, string> {
  const obj: Record<string, string> = {
    style: input.style,
    length: String(input.lengthFt),
    height: String(input.heightFt),
    gates: String(input.gates),
    gw: String(input.gateWidthFt),
    hd: String(input.holeDiameterIn),
    dep: String(input.holeDepthIn),
    bag: String(input.bagSize),
    mode: input.laborMode,
  };
  if (input.postSpacingFt) obj.ps = String(input.postSpacingFt);
  return obj;
}

export function deserializeCalcState(params: URLSearchParams | Record<string, string | undefined>): Partial<CalcInput> {
  const p = params instanceof URLSearchParams ? Object.fromEntries(params) : params;
  const out: Partial<CalcInput> = {};
  if (p.style && (["cedar_privacy","chain_link","vinyl_privacy","ornamental_iron","horse_board","horizontal_modern"] as const).includes(p.style as any)) {
    out.style = p.style as FenceStyle;
  }
  if (p.length) out.lengthFt = Math.max(20, Math.min(600, Number(p.length) || 150));
  if (p.height) out.heightFt = Math.max(3, Math.min(9, Number(p.height) || 6));
  if (p.gates) out.gates = Math.max(0, Math.min(6, Math.floor(Number(p.gates) || 0)));
  if (p.gw) out.gateWidthFt = Math.max(2, Math.min(12, Number(p.gw) || 4));
  if (p.hd) out.holeDiameterIn = Math.max(6, Math.min(16, Number(p.hd) || 10));
  if (p.dep) out.holeDepthIn = Math.max(18, Math.min(48, Number(p.dep) || 30));
  if (p.ps) out.postSpacingFt = Math.max(4, Math.min(14, Number(p.ps)));
  if (p.bag) out.bagSize = (Number(p.bag) === 60 ? 60 : 80);
  if (p.mode === "diy" || p.mode === "pro") out.laborMode = p.mode;
  return out;
}

// Create a nice human summary for contact prefill
export function buildQuoteMessage(input: CalcInput, result: CalcResult): string {
  const spec = result.spec;
  return [
    `Calculator estimate for Bluegrass Fence Co.`,
    ``,
    `Style: ${spec.label}`,
    `Length: ${input.lengthFt} ft  •  Height: ${input.heightFt} ft`,
    `Gates: ${input.gates} × ${input.gateWidthFt} ft wide`,
    `Posts: ${result.postCount}  •  Concrete: ${result.totalBags} × ${input.bagSize}lb bags`,
    `Estimated total (incl. 10% waste): ${formatUsd(result.totalLow)} – ${formatUsd(result.totalHigh)}`,
    `Per foot: ${formatUsd(result.costPerLft[0])} – ${formatUsd(result.costPerLft[1])}`,
    ``,
    `Labor mode: ${input.laborMode === "pro" ? "Professional install" : "DIY"}`,
    `Hole depth: ${input.holeDepthIn}" (Central KY)`,
    ``,
    `I'd like a real on-site quote. Please contact me to schedule.`,
  ].join("\n");
}
