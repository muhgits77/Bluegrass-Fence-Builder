import { useState, useMemo, useEffect } from "react";
import { toast } from "sonner";
import {
  Calculator,
  Printer,
  Share2,
  ArrowRight,
  Info,
  RotateCcw,
  Check,
} from "lucide-react";

import {
  calculate,
  formatUsd,
  serializeCalcState,
  STYLE_OPTIONS,
  DEFAULT_INPUT,
  STYLES,
  type CalcInput,
  type FenceStyle,
  type CalcResult,
} from "@/lib/calculator";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FencingCalculatorProps {
  initialState?: Partial<CalcInput>;
}

const defaultInput: CalcInput = { ...DEFAULT_INPUT };

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function FencingCalculator({ initialState = {} }: FencingCalculatorProps) {
  const [input, setInput] = useState<CalcInput>(() => {
    const merged = { ...defaultInput, ...initialState };
    if (!merged.postSpacingFt) {
      merged.postSpacingFt = STYLES[merged.style]?.postSpacingFt ?? 8;
    }
    return merged;
  });

  // Sync any late initialState (e.g. from search params)
  useEffect(() => {
    if (initialState && Object.keys(initialState).length > 0) {
      setInput((prev) => ({ ...prev, ...initialState }));
    }
  }, [initialState]);

  const result = useMemo<CalcResult>(() => calculate(input), [input]);

  const spec = result.spec;

  // Update helpers
  const update = <K extends keyof CalcInput>(key: K, value: CalcInput[K]) => {
    setInput((prev) => ({ ...prev, [key]: value }));
  };

  const setStyle = (id: FenceStyle) => {
    const opt = STYLE_OPTIONS.find((o) => o.id === id)!;
    const newSpec = STYLES[id];
    setInput((prev) => ({
      ...prev,
      style: id,
      // auto-apply recommended when changing style (user can override)
      postSpacingFt: opt.recommendedSpacing,
      holeDiameterIn: newSpec.recommendedHoleIn,
      holeDepthIn: newSpec.recommendedDepthIn,
    }));
  };

  // Allow custom post spacing but provide easy reset
  const resetPostSpacing = () => {
    const opt = STYLE_OPTIONS.find((o) => o.id === input.style)!;
    update("postSpacingFt", opt.recommendedSpacing);
  };

  // Number + slider helpers
  const setLength = (v: number) => update("lengthFt", clamp(Math.round(v), 20, 600));
  const setHeight = (v: number) => update("heightFt", clamp(Math.round(v * 2) / 2, 3, 9));
  const setGates = (v: number) => update("gates", clamp(Math.floor(v), 0, 6));
  const setGateWidth = (v: number) => update("gateWidthFt", clamp(v, 2, 12));
  const setHoleDiam = (v: number) => update("holeDiameterIn", clamp(Math.round(v), 6, 16));
  const setHoleDepth = (v: number) => update("holeDepthIn", clamp(Math.round(v), 18, 48));
  const setPostSpacing = (v: number) => update("postSpacingFt", clamp(Math.round(v * 10) / 10, 4, 14));
  const setBag = (size: 60 | 80) => update("bagSize", size);
  const setLabor = (mode: "diy" | "pro") => update("laborMode", mode);

  // Derived display
  const length = input.lengthFt;
  const isPro = input.laborMode === "pro";
  const wasteFactor = 0.1;

  // Build shareable URL (current state)
  const buildShareUrl = () => {
    const params = new URLSearchParams(serializeCalcState(input));
    // Use current origin + path for shareability
    const base = typeof window !== "undefined" ? window.location.origin : "";
    return `${base}/calculator?${params.toString()}`;
  };

  const copyShareLink = async () => {
    const url = buildShareUrl();
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Shareable link copied", {
        description: "Anyone with this link will see your exact estimate.",
      });
    } catch {
      // Fallback
      window.prompt("Copy this link:", url);
    }
  };

  const handlePrint = () => {
    // Brief flash of summary for print view
    window.print();
  };

  // Get Real Quote — rich prefill via search params + message
  const quoteHref = () => {
    const params = new URLSearchParams({
      style: input.style,
      length: String(length),
      height: String(input.heightFt),
      gates: String(input.gates),
      total: `${result.totalLow}-${result.totalHigh}`,
    });
    // Also include a human message via the existing prefill logic
    return `/contact?${params.toString()}`;
  };

  const resetAll = () => {
    setInput({ ...defaultInput });
    toast.info("Estimate reset to defaults");
  };

  // Nice breakdown rows
  const breakdown = [
    { label: "Posts (line + gate)", value: `${result.postCount} total (${result.gatePosts} gate posts)` },
    { label: `Concrete (${input.bagSize} lb bags)`, value: `${result.totalBags} bags • ${result.concreteCuFt} cu ft` },
    { label: "Sections / Panels", value: `${result.panels}` },
    ...(result.picketsOrBoards
      ? [{ label: input.style === "horizontal_modern" ? "Horizontal boards" : "Pickets / boards", value: `${result.picketsOrBoards}` }]
      : []),
    { label: "Hardware kits", value: `${result.hardwareKits + result.gateHardwareKits}` },
  ];

  return (
    <TooltipProvider>
      <div className="mx-auto max-w-7xl">
        {/* Top bar / status */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calculator className="h-4 w-4" />
            Live calculations • 10% waste factor included • Central Kentucky pricing
          </div>
          <button
            onClick={resetAll}
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm hover:bg-muted no-print"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* INPUTS — left / main column */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. STYLE SELECTOR — prominent */}
            <section>
              <div className="mb-3 flex items-center gap-2">
                <h3 className="font-display text-xl font-semibold">1. Fence style</h3>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>Material & labor ranges are style-specific and reflect real KY market pricing.</TooltipContent>
                </Tooltip>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {STYLE_OPTIONS.map((opt) => {
                  const active = input.style === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setStyle(opt.id)}
                      className={`group rounded-2xl border p-4 text-left transition-all ${
                        active
                          ? "border-accent bg-accent/5 ring-1 ring-accent/40"
                          : "border-border bg-card hover:border-accent/40 hover:bg-accent/5"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-display text-lg font-semibold text-foreground">{opt.label}</div>
                          <div className="mt-1 text-sm text-muted-foreground">{opt.desc}</div>
                        </div>
                        {active && <Check className="mt-0.5 h-5 w-5 text-accent" />}
                      </div>
                      <div className="mt-3 text-[10px] uppercase tracking-widest text-muted-foreground/70">
                        {opt.recommendedSpacing} ft spacing • {STYLES[opt.id]?.recommendedDepthIn}" depth
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Quick presets */}
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Backyard 120 ft", apply: () => setInput((p) => ({ ...p, lengthFt: 120, gates: 1 })) },
                { label: "Horse pasture 300 ft", apply: () => setInput((p) => ({ ...p, lengthFt: 300, heightFt: 4, gates: 2, style: "horse_board", postSpacingFt: 8 })) },
                { label: "Driveway entry", apply: () => setInput((p) => ({ ...p, lengthFt: 80, gates: 1, gateWidthFt: 10, style: "ornamental_iron", postSpacingFt: 6.5 })) },
                { label: "Privacy 200 ft", apply: () => setInput((p) => ({ ...p, lengthFt: 200, heightFt: 6, gates: 1, style: "cedar_privacy" })) },
              ].map((p, i) => (
                <button
                  key={i}
                  onClick={p.apply}
                  className="rounded-full border border-border px-3 py-1 text-xs hover:bg-accent hover:text-accent-foreground transition"
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* 2. DIMENSIONS */}
            <section className="space-y-6">
              <h3 className="font-display text-xl font-semibold">2. Dimensions</h3>

              {/* Length */}
              <div>
                <div className="mb-2 flex items-baseline justify-between">
                  <label className="text-sm font-medium">Fence length</label>
                  <div className="font-mono text-lg font-semibold tabular-nums">{length} ft</div>
                </div>
                <Slider
                  min={20}
                  max={600}
                  step={5}
                  value={[length]}
                  onValueChange={([v]) => setLength(v)}
                  className="py-1"
                />
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="number"
                    min={20}
                    max={600}
                    step={1}
                    value={length}
                    onChange={(e) => setLength(Number(e.target.value))}
                    className="w-28 rounded-md border border-input bg-background px-3 py-2 font-mono text-sm"
                  />
                  <span className="text-sm text-muted-foreground">linear feet</span>
                </div>
              </div>

              {/* Height */}
              <div>
                <div className="mb-2 flex items-baseline justify-between">
                  <label className="text-sm font-medium">Fence height</label>
                  <div className="font-mono text-lg font-semibold tabular-nums">{input.heightFt} ft</div>
                </div>
                <Slider
                  min={3}
                  max={8}
                  step={0.5}
                  value={[input.heightFt]}
                  onValueChange={([v]) => setHeight(v)}
                  className="py-1"
                />
                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <input
                    type="number"
                    min={3}
                    max={9}
                    step={0.5}
                    value={input.heightFt}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-20 rounded-md border border-input bg-background px-3 py-1.5 font-mono text-sm"
                  />
                  ft (above ground)
                </div>
              </div>
            </section>

            {/* 3. GATES */}
            <section className="space-y-5">
              <h3 className="font-display text-xl font-semibold">3. Gates</h3>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                    Number of gates
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3.5 w-3.5 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>Each gate adds 2 terminal posts + hardware & labor premium.</TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="flex items-center gap-2">
                    {[0, 1, 2, 3].map((n) => (
                      <button
                        key={n}
                        onClick={() => setGates(n)}
                        className={`flex-1 rounded-lg border py-2 text-sm font-medium transition ${
                          input.gates === n ? "bg-primary text-primary-foreground border-primary" : "hover:bg-muted"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                    <input
                      type="number"
                      min={0}
                      max={6}
                      value={input.gates}
                      onChange={(e) => setGates(Number(e.target.value))}
                      className="w-16 rounded-md border border-input bg-background px-3 py-2 text-center font-mono text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Gate width (each)</label>
                  <div className="flex flex-wrap gap-2">
                    {[3, 4, 5, 6, 8, 10].map((w) => (
                      <button
                        key={w}
                        onClick={() => setGateWidth(w)}
                        className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                          input.gateWidthFt === w ? "bg-accent text-accent-foreground border-accent" : "hover:bg-muted"
                        }`}
                      >
                        {w} ft
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">Typical: 4 ft walk gate, 8–10 ft driveway</div>
                </div>
              </div>
            </section>

            {/* 4. POST & FOOTING (with tooltips) */}
            <section className="space-y-5 rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-semibold">4. Post & footing specs</h3>
                <span className="text-xs uppercase tracking-[1px] text-accent">Kentucky clay</span>
              </div>

              {/* Post spacing */}
              <div>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 font-medium">
                    Post spacing (center to center)
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3.5 w-3.5 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        Closer spacing = stronger fence. Recommended changes per style.
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="font-mono tabular-nums">{(input.postSpacingFt ?? spec.postSpacingFt)} ft</div>
                </div>
                <Slider
                  min={4}
                  max={12}
                  step={0.5}
                  value={[input.postSpacingFt ?? spec.postSpacingFt]}
                  onValueChange={([v]) => setPostSpacing(v)}
                />
                <div className="mt-1.5 flex items-center justify-between text-xs">
                  <button
                    onClick={resetPostSpacing}
                    className="inline-flex items-center gap-1 text-accent hover:underline"
                  >
                    Use recommended for {spec.label} ({STYLE_OPTIONS.find((o) => o.id === input.style)?.recommendedSpacing} ft)
                  </button>
                  <span className="text-muted-foreground">4–12 ft</span>
                </div>
              </div>

              {/* Hole diameter */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <div className="mb-1.5 flex items-center gap-2 text-sm font-medium">
                    Hole diameter
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3.5 w-3.5 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>10–12" typical for 4×4 & 5×5 posts. Wider for gates & iron.</TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="flex items-center gap-3">
                    <Slider
                      min={6}
                      max={16}
                      step={1}
                      value={[input.holeDiameterIn]}
                      onValueChange={([v]) => setHoleDiam(v)}
                      className="flex-1"
                    />
                    <div className="w-14 font-mono text-right text-sm tabular-nums">{input.holeDiameterIn}"</div>
                  </div>
                </div>

                {/* Hole depth — critical KY tooltip */}
                <div>
                  <div className="mb-1.5 flex items-center gap-2 text-sm font-medium">
                    Hole depth
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3.5 w-3.5 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        Central KY frost line is ~30". We set 30–36" standard; 36–42"+ for gates, iron, and tall runs.
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="flex items-center gap-3">
                    <Slider
                      min={24}
                      max={42}
                      step={1}
                      value={[input.holeDepthIn]}
                      onValueChange={([v]) => setHoleDepth(v)}
                      className="flex-1"
                    />
                    <div className="w-14 font-mono text-right text-sm tabular-nums">{input.holeDepthIn}"</div>
                  </div>
                  <div className="mt-1 text-[10px] text-muted-foreground">Recommended for {spec.label}: {spec.recommendedDepthIn}"</div>
                </div>
              </div>
            </section>

            {/* 5. DIY vs PRO */}
            <section>
              <h3 className="mb-3 font-display text-xl font-semibold">5. Build method</h3>
              <div className="inline-flex w-full rounded-2xl border border-border p-1 sm:w-auto">
                <button
                  onClick={() => setLabor("diy")}
                  className={`flex-1 rounded-[14px] px-8 py-3 text-sm font-semibold transition sm:flex-none ${
                    !isPro ? "bg-foreground text-background shadow" : "hover:bg-muted"
                  }`}
                >
                  DIY — I’ll install
                </button>
                <button
                  onClick={() => setLabor("pro")}
                  className={`flex-1 rounded-[14px] px-8 py-3 text-sm font-semibold transition sm:flex-none ${
                    isPro ? "bg-primary text-primary-foreground shadow" : "hover:bg-muted"
                  }`}
                >
                  Professional install
                </button>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {isPro
                  ? "Pro pricing includes crew labor, equipment, and our 5-year craftsmanship warranty."
                  : "DIY pricing is materials only + modest 15% contingency. We still recommend pro footings on clay."}
              </p>
            </section>

            {/* Bag size */}
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="font-medium">Concrete bag size:</span>
              <button
                onClick={() => setBag(80)}
                className={`rounded-full px-4 py-1 transition ${input.bagSize === 80 ? "bg-primary text-primary-foreground" : "border hover:bg-muted"}`}
              >
                80 lb (most common)
              </button>
              <button
                onClick={() => setBag(60)}
                className={`rounded-full px-4 py-1 transition ${input.bagSize === 60 ? "bg-primary text-primary-foreground" : "border hover:bg-muted"}`}
              >
                60 lb
              </button>
            </div>
          </div>

          {/* STICKY SUMMARY — right column */}
          <div className="lg:col-span-5">
            <div className="sticky top-6 rounded-3xl border border-border bg-card shadow-sm calculator-print-area">
              <div className="p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[1.5px] text-accent">Live estimate</div>
                    <div className="font-display text-2xl font-semibold text-foreground">Your project</div>
                  </div>
                  <div className="rounded bg-accent/10 px-3 py-1 text-right text-xs text-accent-foreground/90">
                    +{Math.round(wasteFactor * 100)}% waste
                  </div>
                </div>

                {/* Main total */}
                <div className="mt-6 rounded-2xl bg-background p-5 estimate-total">
                  <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Total installed range</div>
                  <div className="mt-1 font-display text-4xl font-semibold tabular-nums tracking-tighter text-foreground">
                    {formatUsd(result.totalLow)} <span className="text-2xl text-muted-foreground">–</span> {formatUsd(result.totalHigh)}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {formatUsd(result.costPerLft[0])} – {formatUsd(result.costPerLft[1])} per ft • {length} ft run
                  </div>
                </div>

                {/* Mode badge */}
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs">
                  <span className="font-medium">{isPro ? "Professional install" : "DIY materials only"}</span>
                  <span className="text-muted-foreground">•</span>
                  <span>{spec.label}</span>
                </div>

                {/* Detailed breakdown */}
                <div className="mt-6 space-y-3 text-sm">
                  {breakdown.map((row, idx) => (
                    <div key={idx} className="flex justify-between border-b border-border/70 pb-2 last:border-none last:pb-0">
                      <span className="text-muted-foreground">{row.label}</span>
                      <span className="font-medium tabular-nums text-right">{row.value}</span>
                    </div>
                  ))}

                  {/* Materials + Labor breakdown */}
                  <div className="pt-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Materials</span>
                      <span className="font-medium tabular-nums">{formatUsd(result.materialLow)} – {formatUsd(result.materialHigh)}</span>
                    </div>
                    {isPro && (
                      <div className="mt-1 flex justify-between text-sm">
                        <span className="text-muted-foreground">Labor &amp; install</span>
                        <span className="font-medium tabular-nums">{formatUsd(result.laborLow)} – {formatUsd(result.laborHigh)}</span>
                      </div>
                    )}
                    {input.gates > 0 && (
                      <div className="mt-1 flex justify-between text-sm">
                        <span className="text-muted-foreground">Gates &amp; hardware adder</span>
                        <span className="font-medium tabular-nums">
                          {formatUsd(input.gates * (isPro ? 350 : 120))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="my-5 h-px bg-border" />

                {/* Key specs recap */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <div>Posts: <span className="font-medium text-foreground">{result.postCount}</span></div>
                  <div>Concrete: <span className="font-medium text-foreground">{result.totalBags}×{input.bagSize}lb</span></div>
                  <div>Spacing: <span className="font-medium text-foreground">{(input.postSpacingFt ?? spec.postSpacingFt)} ft</span></div>
                  <div>Depth: <span className="font-medium text-foreground">{input.holeDepthIn}"</span></div>
                </div>

                {/* ACTIONS */}
                <div className="sticky-summary-actions mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <button
                    onClick={handlePrint}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background py-3 text-sm font-semibold transition hover:bg-muted active:bg-muted/70"
                  >
                    <Printer className="h-4 w-4" /> Print / Save PDF
                  </button>

                  <button
                    onClick={copyShareLink}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background py-3 text-sm font-semibold transition hover:bg-muted active:bg-muted/70"
                  >
                    <Share2 className="h-4 w-4" /> Copy shareable link
                  </button>

                  <a
                    href={quoteHref()}
                    className="col-span-1 sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-xl bg-accent py-3 text-sm font-semibold text-accent-foreground shadow-sm transition hover:brightness-95 active:brightness-90"
                  >
                    Get a real quote from Bluegrass Fence Co. <ArrowRight className="h-4 w-4" />
                  </a>
                </div>

                <p className="mt-3 text-center text-[10px] text-muted-foreground">
                  Prices are realistic 2025–26 ranges for Somerset &amp; Lake Cumberland. Final quote may vary with site visit.
                </p>
              </div>
            </div>

            {/* Small note below card on desktop */}
            <div className="mt-3 hidden text-xs text-muted-foreground lg:block">
              Tip: Copy the share link to send this exact estimate to a spouse or to us.
            </div>
          </div>
        </div>

        {/* Bottom trust row */}
        <div className="mt-8 rounded-2xl border border-border bg-muted/30 p-4 text-center text-xs text-muted-foreground">
          All estimates include 10% material waste. Concrete volume calculated with precise cylinder math minus post displacement.
          Post depth tuned to Central Kentucky frost line.
        </div>
      </div>
    </TooltipProvider>
  );
}

