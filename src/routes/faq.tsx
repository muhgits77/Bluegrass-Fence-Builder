import { createFileRoute, Link } from "@tanstack/react-router";

const FAQS = [
  {
    q: "How deep should fence posts go in Kentucky?",
    a: "The National Weather Service frost line for Central and Southern Kentucky sits around 24–30 inches. We set standard posts 30 inches deep and gate / corner posts 36 inches to keep everything plumb through freeze-thaw cycles.",
  },
  {
    q: "What's the best fence for a Kentucky horse farm?",
    a: "For thoroughbreds, a 4-board oak or PT pine fence painted black is the classic Bluegrass look. For lower maintenance, vinyl 4-board is durable, safe, and doesn't need re-painting. Both use 5x5 posts set 36 inches deep with corner bracing on tension runs.",
  },
  {
    q: "Cedar vs vinyl privacy — which lasts longer in Kentucky weather?",
    a: "Cedar naturally resists rot and can last 20–25 years if sealed every few years. Vinyl carries a lifetime warranty and shrugs off UV, moisture, and mildew — no staining ever. Cedar has more warmth and character; vinyl wins on maintenance.",
  },
  {
    q: "How many 80-lb concrete bags per fence post?",
    a: "For a typical 10-inch diameter, 30-inch deep hole with a 4-inch post, you'll need roughly 1.5–2 bags of 80-lb concrete per hole. Our calculator does the math based on your exact hole size and post section.",
  },
  {
    q: "Do you build fences outside Pulaski County?",
    a: "Yes. We regularly serve Pulaski, Wayne, McCreary, Russell, Laurel, Casey, Lincoln, and Rockcastle counties. For jobs outside our normal service area, ask — we may still be a fit.",
  },
  {
    q: "How long does a residential fence install take?",
    a: "Most residential jobs (150–300 linear ft) take our crew 2–4 working days from post-set to gate hardware. Weather delays for concrete cure time can add a day.",
  },
  {
    q: "Do you pull permits?",
    a: "Yes, when required. Rules vary by county and HOA. We check permit requirements as part of every free estimate.",
  },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Kentucky Fence Building Questions · Bluegrass Fence Co." },
      {
        name: "description",
        content:
          "Common Kentucky fence questions: how deep to set posts, best horse fence styles, cedar vs vinyl, concrete bag counts, permits, and more.",
      },
      { property: "og:title", content: "FAQ · Bluegrass Fence Co." },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Faq,
});

function Faq() {
  return (
    <>
      <header className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="script text-xl text-accent">Common questions</p>
          <h1 className="mt-1 font-display text-5xl font-semibold text-foreground">FAQ</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Straight answers about Kentucky fencing — depths, materials, and the
            way we build.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="divide-y divide-border rounded-2xl border border-border bg-card shadow-sm">
          {FAQS.map((f) => (
            <details key={f.q} className="group px-6 py-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
                <span className="font-display text-lg font-semibold text-foreground">{f.q}</span>
                <span className="grid h-7 w-7 flex-none place-items-center rounded-full border border-border text-accent transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-primary p-8 text-primary-foreground">
          <p className="script text-lg text-accent">Didn't see your question?</p>
          <h2 className="mt-1 font-display text-2xl font-semibold">Ask us directly.</h2>
          <p className="mt-2 text-primary-foreground/80">
            The same crew that builds your fence will answer your questions.
          </p>
          <Link
            to="/contact"
            className="mt-5 inline-flex items-center rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition hover:brightness-95"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </>
  );
}
