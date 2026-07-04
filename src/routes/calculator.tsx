import { createFileRoute, useSearch, Link } from "@tanstack/react-router";
import FencingCalculator from "@/components/calculator/FencingCalculator";
import { deserializeCalcState } from "@/lib/calculator";
import { z } from "zod";

const CALC_FAQS = [
  {
    q: "How many fence posts do I need for my project?",
    a: "Use our fencing calculator Kentucky to get the exact number instantly. Formula: line posts = ceil(length / spacing) + 1, plus 2 posts per gate. At 8 ft spacing (common for cedar privacy and horse board), a 100 ft fence needs roughly 14 line posts total before gates. The calculator adds gate posts automatically and lets you tweak spacing live.",
  },
  {
    q: "How many posts per 100 ft of fence?",
    a: "It depends on spacing and style. Typical Kentucky recommendations: 8 ft spacing (cedar, vinyl, horse & farm) ≈ 14 posts per 100 ft including ends; 10 ft (chain link) ≈ 11 posts; 6–6.5 ft (ornamental iron or modern horizontal) ≈ 17 posts. Our free fence calculator shows the precise count the moment you slide length or spacing. Add 2 posts for every gate.",
  },
  {
    q: "How much concrete do I need per fence post?",
    a: "Our fence post concrete calculator uses cylinder volume minus the post itself. For a standard 10\" diameter × 30\" deep hole with a 4×4 post, expect about 1.3–1.8 bags of 80 lb concrete per hole before waste. The tool computes exact bags for your hole size, depth, post style, adds 10% waste, and updates live. Wider gate posts and deeper holes (36\") use more.",
  },
  {
    q: "Do fence posts need concrete in Kentucky?",
    a: "Yes for nearly all permanent fences in Central Kentucky clay. Concrete footings resist frost heave, keep posts plumb, and provide the strength livestock push against. Some temporary farm fences use driven posts or gravel, but our pro installs and the calculator default to concrete. The livestock fence estimator factors realistic bag counts for every style.",
  },
  {
    q: "How deep should fence post holes be in Central Kentucky?",
    a: "Central Kentucky frost line is approximately 24–30 inches. We recommend 30\" for standard line posts and 36\" for gates, corners, and horse farm fencing. The calculator defaults to style-specific depths (30–36\") and lets you adjust. Deeper holes = more concrete and taller posts (add depth/12 to fence height for total post length).",
  },
  {
    q: "How many pickets or boards do I need?",
    a: "It varies by style. Cedar/vinyl privacy: ~2.2 pickets per linear foot. Horse board (4-board): typically 4 boards × length ÷ 16 ft lengths, rounded up. Horizontal modern uses stacked 1×6 slats. Our calculator includes 10% waste and shows exact pickets/boards/panels for your length and height. Switch styles to compare.",
  },
  {
    q: "What are the best materials for livestock and horse fencing?",
    a: "Classic Bluegrass choice is 4-board or 3-board oak or pressure-treated pine, painted black, on 5×5 posts set 36\". Vinyl 4-board is excellent for lower maintenance and horse safety (no splinters). Chain link with top rail works for cattle or perimeter. Avoid barbed wire near horses. Explore horse & farm fencing on our services page and use the livestock fence estimator above.",
  },
  {
    q: "How do maintenance and lifespan differ between fence types?",
    a: "Cedar privacy: 20–25 years, seal every 3–5 years. Vinyl: lifetime warranty, almost zero maintenance. Horse board (wood): 15–20 years, repaint every 4–7 years; black finish hides wear. Ornamental iron/aluminum: 30+ years with occasional touch-up. Chain link: 15–25 years. The calculator shows realistic material + labor ranges so you can compare total ownership cost for your Kentucky property.",
  },
  {
    q: "What's the best fence for a Kentucky horse farm?",
    a: "Most farms around Somerset and the Bluegrass choose 4-board horse fence with 5×5 posts, 8 ft spacing, 36\" deep concrete footings, and black paint or stain. It looks authentic, contains horses safely, and frames the rolling hills beautifully. Vinyl board versions are gaining popularity for zero repaint. Try the horse pasture preset in the calculator and adjust for your exact acreage.",
  },
  {
    q: "How do I estimate fencing for a pasture or paddock?",
    a: "Measure the perimeter in feet. Decide height (typically 4–5 ft for horses), style (horse board or vinyl), and number of gates. Add 10% waste for terrain. Our livestock fence estimator does the heavy lifting: posts, concrete, boards, hardware, and installed price ranges tuned for local labor in Pulaski and surrounding counties. Start with the 300 ft horse pasture quick preset.",
  },
  {
    q: "What post spacing should I use for livestock or horse fencing?",
    a: "8 ft center-to-center is standard and strong for 4-board horse fence and most farm applications in Kentucky. Some cattle operations stretch to 10 ft. Closer (6–7 ft) for high-wind areas or tall privacy. The calculator lets you override recommended spacing per style — changes update posts, concrete, and cost instantly.",
  },
  {
    q: "Do I need corner braces or tension wire on farm fences?",
    a: "Yes on long runs and corners for horse and livestock fencing. Bracing prevents sagging over time, especially with 4-board or chain link. Our pro quotes include proper bracing on tension runs. The calculator focuses on posts, concrete, and primary materials; ask us about bracing when you request a quote from the estimate.",
  },
  {
    q: "Vinyl vs wood for horse fencing — which is safer and lasts longer?",
    a: "Both are safe when installed correctly. Wood (oak/PT) has classic Kentucky character but can splinter or need paint. Vinyl never splinters, won't rot, and carries lifetime warranties — many farms now prefer it for paddocks. Lifespan: vinyl wins on maintenance; wood wins on authentic look. Compare both instantly by switching styles in the fencing calculator Kentucky above.",
  },
  {
    q: "How tall should a horse or livestock fence be?",
    a: "4 ft is common for horses and most livestock; 5–6 ft for privacy or stallions/escape artists. The calculator supports 3–9 ft heights and automatically adjusts material counts (more boards for taller horizontal or privacy styles). Always check local codes and horse temperament.",
  },
  {
    q: "Concrete vs gravel or dirt for setting posts in Kentucky clay?",
    a: "Concrete is strongly recommended for permanent fences in our heavy clay and freeze-thaw climate. Gravel can work for very temporary farm fencing but posts will eventually lean. The fence post concrete calculator shows exact 60 lb or 80 lb bag counts for proper footings. We set most horse farm posts 36 inches deep in concrete.",
  },
  {
    q: "How much does farm or horse fencing cost per foot in Somerset KY?",
    a: "Realistic 2025–2026 installed ranges (materials + pro labor): Horse & Farm board ~$26–$44 per ft; Cedar privacy $40–$62; Vinyl $44–$66; Chain link $20–$32. The calculator includes 10% waste and gate premiums and gives low/high ranges specific to your length and specs. Prices reflect Lake Cumberland area material and crew costs.",
  },
  {
    q: "How many rails or boards for a classic 4-board horse fence?",
    a: "Four horizontal boards per section. Calculator estimates total board count as roughly 4 × length ÷ 16 ft lengths (standard board length), plus 10% waste. It also factors the right number of posts and concrete. Switch to the Horse & Farm style and watch the numbers update.",
  },
  {
    q: "What gates work best for livestock and horse farms?",
    a: "Heavy-duty 8–12 ft tube or wood gates for driveways and equipment; 4 ft walk gates for people. Each gate adds two terminal posts plus hardware. The calculator adds realistic gate premiums ($350-ish per gate installed) and extra posts. Choose gate count and width to see the impact live.",
  },
  {
    q: "When is the best time to install fencing in Kentucky?",
    a: "Spring (March–May) and fall (Sept–Nov) are ideal — ground is workable and concrete cures well. Avoid deep winter freezes and peak summer heat for crews. Our calculator gives you the materials list anytime so you can plan and budget year-round before booking the crew.",
  },
  {
    q: "How much waste should I add when ordering fence materials?",
    a: "We include 10% waste by default in the calculator for cuts, damage, and terrain. Some irregular sites or very long runs use 12–15%. The tool always rounds up posts, panels, bags, and boards so your order covers real-world needs.",
  },
  {
    q: "What post sizes are recommended for horse, cattle, or goat fencing?",
    a: "Line posts: 4×4 or 5×5 pressure-treated or cedar for most horse and farm use; 6×6 for heavy gates/corners and high-pressure areas. For cattle, 4×4 at 8–10 ft often suffices. Goats and sheep benefit from closer spacing (6 ft) plus woven wire or electric strands. The calculator uses realistic counts for your chosen style; our quotes specify exact post dimensions for the livestock you keep.",
  },
  {
    q: "How do I calculate fencing needs for sloped or hilly pasture in Kentucky?",
    a: "Always measure the true surface distance along the slope rather than flat map distance. Hills increase actual footage 5–15% on rolling Bluegrass terrain. You may need stepped rails, shorter sections, or extra bracing. Use the livestock fence estimator for base numbers, then bump length and add extra posts/concrete for the grade. Corner and end posts become critical on slopes.",
  },
  {
    q: "Treated pine vs oak vs cedar for livestock board fencing — pros and cons?",
    a: "Pressure-treated pine: affordable, strong when dry, takes paint beautifully and is the everyday farm standard. Oak: premium traditional Bluegrass look, extremely hard and long-lasting, heavier to handle and costlier. Cedar: naturally rot-resistant, lighter weight, attractive without paint but softer against kicks or chewing. Many Somerset farms choose painted PT or oak for authenticity and durability. The calculator reflects current local pricing for these choices.",
  },
  {
    q: "What fasteners, brackets, and hardware matter most for a long-lasting livestock fence?",
    a: "Hot-dipped galvanized or stainless ring-shank nails (minimum 2–3 per board end), heavy carriage bolts at posts, and quality post caps or rail brackets. Gate hinges, latches, and spring-loaded closers must be livestock-grade. Weak hardware is the #1 reason farm fences fail early. Our estimates include full hardware kits; pro installs use components rated for constant animal pressure and Kentucky weather.",
  },
  {
    q: "How can I use the calculator to plan cross-fencing or multiple paddocks on my farm?",
    a: "Sum the lengths of every run (perimeter + all dividers) or run the tool once per section and total the results. Interior cross fences can sometimes use slightly lighter posts or wider spacing, but still need gates between paddocks. Add 10%+ waste for terrain and corners. Start with the Horse pasture or Livestock 200 ft presets, adjust, then copy the shareable link and send it to us for a complete multi-paddock farm quote.",
  },
];

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
      { title: "Fencing Calculator Kentucky | Free Fence Post & Concrete Estimator | Bluegrass Fence Co." },
      {
        name: "description",
        content:
          "Free Kentucky fence calculator for posts, concrete, pickets & cost. Accurate livestock fence estimator, horse farm fencing calculator, and fence post concrete calculator for Somerset, Central Kentucky & Bluegrass farms. Live updates, 10% waste included.",
      },
      { name: "keywords", content: "fencing calculator Kentucky, fence post concrete calculator, how many posts for 100 ft fence, livestock fence estimator, horse farm fencing Somerset KY, Kentucky fence cost calculator, cedar fence calculator, farm fence post spacing" },
      { property: "og:title", content: "Fencing Calculator Kentucky — Free Post, Concrete & Cost Estimator" },
      { property: "og:description", content: "Estimate exact posts, bags of concrete, boards, and installed cost for any fence style in Central Kentucky. Built for horse farms, livestock, and residential. The most trusted fencing calculator Kentucky." },
      { property: "og:url", content: "/calculator" },
    ],
    links: [{ rel: "canonical", href: "/calculator" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: CALC_FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Bluegrass Fence Co. Kentucky Fence Calculator",
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          description: "Free interactive fencing calculator for Kentucky: posts, concrete volume, materials, and realistic installed pricing for horse farms and residential projects.",
        }),
      },
    ],
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
            The most accurate free <strong>fencing calculator Kentucky</strong> for posts, concrete bags, pickets, boards, and installed cost.
            Perfect for horse farm fencing Somerset KY, livestock fence estimators, cedar privacy, and every Central Kentucky clay soil project. Live updates, 10% waste included.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <FencingCalculator initialState={initialState} />
      </div>

      {/* SEO-rich content: keyword intro, quick reference, comprehensive FAQ, internal links, CTAs */}
      <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="prose prose-neutral max-w-none text-foreground">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground not-prose">
            Free fencing calculator Kentucky — built for horse farms, livestock &amp; Central KY homes
          </h2>
          <p className="text-muted-foreground">
            Get instant, accurate numbers for posts, concrete bags, pickets, rails, hardware, and realistic installed pricing.
            Our <strong>fence post concrete calculator</strong> and <strong>livestock fence estimator</strong> are tuned specifically for Somerset, Pulaski County, and the rolling Bluegrass hills — including frost line depths, clay soil behavior, and local material + labor rates.
          </p>
        </div>
      </div>

      {/* Quick reference — high-intent answers surfaced immediately for SEO and UX */}
      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <h3 className="mb-4 font-display text-xl font-semibold">Common calculations at a glance</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Posts for 100 ft", value: "~14 posts @ 8 ft spacing (cedar/horse)", note: "Plus 2 per gate" },
            { title: "Concrete per post", value: "1.3–2 bags 80 lb", note: "10\"×30\" hole, typical 4×4 post" },
            { title: "Horse farm 300 ft", value: "~42 posts • ~110 bags", note: "4-board, 36\" depth, 2 gates" },
            { title: "Pickets / boards", value: "~220 per 100 ft privacy", note: "Includes 10% waste" },
            { title: "Depth (KY frost line)", value: "30–36 inches", note: "Gates & corners deeper" },
            { title: "Cost range / ft (installed)", value: "$26–$66 typical", note: "Varies by style & labor mode" },
          ].map((item, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-5">
              <div className="text-xs uppercase tracking-[1px] text-accent">{item.title}</div>
              <div className="mt-1.5 font-display text-xl font-semibold tabular-nums text-foreground">{item.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{item.note}</div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          All figures are starting points. Use the live calculator above for your exact length, height, gates, and spacing.
        </p>
      </div>

      {/* Rich comprehensive FAQ with livestock/farm focus + natural keywords */}
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="font-display text-3xl font-semibold tracking-tight">Kentucky fencing calculator FAQ</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            High-intent answers for horse farms, livestock fencing, concrete footings, post counts, and material estimates across Somerset and Central Kentucky.
            Questions about <Link to="/calculator" className="underline decoration-accent/60">fencing calculator Kentucky</Link>, <Link to="/services" className="underline decoration-accent/60">horse farm fencing</Link>, or <Link to="/faq" className="underline decoration-accent/60">general fence questions</Link>?
          </p>
        </div>

        <div className="divide-y divide-border rounded-2xl border border-border bg-card shadow-sm">
          {CALC_FAQS.map((f, idx) => (
            <details
              key={idx}
              className="group px-6 py-5 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
                <span className="font-display text-lg font-semibold text-foreground">{f.q}</span>
                <span className="grid h-7 w-7 flex-none place-items-center rounded-full border border-border text-accent transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-muted/40 p-6 text-sm">
          <p className="font-medium text-foreground">Still have questions?</p>
          <p className="mt-1 text-muted-foreground">
            The calculator gives you precise materials and cost ranges. For site-specific advice (trees, slopes, gates, corner bracing), request a free on-site estimate.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition hover:brightness-95"
            >
              Get a free quote from the crew
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-semibold hover:bg-muted"
            >
              Explore all fence styles
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-semibold hover:bg-muted"
            >
              See Kentucky farm fences we&apos;ve built
            </Link>
          </div>
        </div>
      </div>

      {/* Strong bottom CTA block */}
      <div className="border-t border-border bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="script text-lg text-accent">Ready to build?</p>
              <h3 className="mt-1 font-display text-3xl font-semibold">Turn your estimate into a real Kentucky fence.</h3>
              <p className="mt-2 max-w-lg text-primary-foreground/80">
                Share your calculator link with us or book a free site visit. We serve Somerset, Lake Cumberland, and surrounding counties.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-sm transition hover:brightness-95"
              >
                Request free on-site estimate
              </Link>
              <Link
                to="/faq"
                className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/30 px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary-foreground/10"
              >
                More Kentucky fence answers
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Original how our math works, kept for transparency but de-emphasized after rich FAQ */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">How our math works</p>
          <p className="mt-1">
            Posts = ceil(length / spacing) + 1 + 2×gates. Concrete = πr²h cylinder minus post volume per hole × posts × (1 + 10% waste). 
            Pricing ranges drawn from current Somerset / Lake Cumberland material + local labor markets.
          </p>
          <p className="mt-1 text-xs">Hole depth defaults respect Central Kentucky frost line (~30"). Gates add realistic hardware &amp; install premiums. All estimates include 10% waste.</p>
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          This tool is for planning only. Final pricing requires an on-site visit.{" "}
          <Link to="/contact" className="underline">Get your free quote →</Link>
        </p>
      </div>
    </>
  );
}
