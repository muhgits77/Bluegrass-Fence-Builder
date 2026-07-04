import { createFileRoute, useSearch } from "@tanstack/react-router";
import FencingCalculator from "@/components/calculator/FencingCalculator";
import { deserializeCalcState } from "@/lib/calculator";
import { z } from "zod";

const calcSearchSchema = z.object({
  style: z.string().optional(),
  length: z.coerce.number().optional(),
  height: z.coerce.number().optional(),
  gates: z.coerce.number().optional(),
  gw: z.coerce.number().optional(),
  hd: z.coerce.number().optional(),
  dep: z.coerce.number().optional(),
  ps: z.coerce.number().optional(),
  bag: z.coerce.number().optional(),
  mode: z.string().optional(),
});

export const Route = createFileRoute("/calculator")({
  validateSearch: (s) => calcSearchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Kentucky Fence Calculator — Materials, Concrete & Cost · Bluegrass Fence Co." },
      {
        name: "description",
        content:
          "Free Kentucky fence calculator. Estimate posts, concrete bags, panels, hardware, and installed cost for cedar, vinyl, chain link, iron, and horse fencing. The most accurate estimator for Central Kentucky.",
      },
      { property: "og:title", content: "Free Kentucky Fence Calculator — Bluegrass Fence Co." },
      { property: "og:url", content: "/calculator" },
    ],
    links: [{ rel: "canonical", href: "/calculator" }],
  }),
  component: CalculatorPage,
});

function CalculatorPage() {
  const search = useSearch({ from: "/calculator" });
  const initialState = deserializeCalcState(search);

  return (
    <>
      <header className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="script text-xl text-accent">The centerpiece • Somerset, KY</p>
          <h1 className="mt-1 max-w-4xl font-display text-4xl font-semibold text-foreground sm:text-5xl">
            Kentucky fence calculator
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Live post counts, cylinder-volume concrete, material breakdowns, and realistic
            installed pricing for Central Kentucky clay and weather. 10% waste included.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <FencingCalculator initialState={initialState} />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">How our math works</p>
          <p className="mt-1">
            Posts = ceil(length / spacing) + 1 + 2×gates. Concrete = πr²h cylinder minus post volume per hole × posts × (1 + 10% waste). 
            Pricing ranges drawn from current Somerset / Lake Cumberland material + local labor markets.
          </p>
          <p className="mt-1 text-xs">Hole depth defaults respect Central Kentucky frost line (~30"). Gates add realistic hardware & install premiums.</p>
        </div>
      </div>
    </>
  );
}
