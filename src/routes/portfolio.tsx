import { createFileRoute } from "@tanstack/react-router";

import p1 from "@/assets/portfolio-1.jpg";
import p2 from "@/assets/portfolio-2.jpg";
import p3 from "@/assets/portfolio-3.jpg";
import p4 from "@/assets/portfolio-4.jpg";
import cedar from "@/assets/service-cedar.jpg";
import horse from "@/assets/service-horse.jpg";
import horizontal from "@/assets/service-horizontal.jpg";
import vinyl from "@/assets/service-vinyl.jpg";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Kentucky Fence Installations · Bluegrass Fence Co." },
      {
        name: "description",
        content:
          "Recent fence installations across Somerset, Lake Cumberland, and the Kentucky bluegrass — cedar privacy, horse board, ornamental iron, and commercial chain link.",
      },
      { property: "og:title", content: "Portfolio · Bluegrass Fence Co." },
      { property: "og:url", content: "/portfolio" },
      { property: "og:image", content: p1 },
    ],
    links: [{ rel: "canonical", href: "/portfolio" }],
  }),
  component: Portfolio,
});

const ITEMS = [
  { img: p1, title: "Thoroughbred paddock", loc: "Danville, KY", type: "Horse board" },
  { img: cedar, title: "Backyard sanctuary", loc: "Somerset, KY", type: "Cedar privacy" },
  { img: p3, title: "Estate entrance", loc: "Berea, KY", type: "Ornamental iron + stone" },
  { img: horse, title: "Bluegrass pasture", loc: "Nicholasville, KY", type: "Vinyl 4-board" },
  { img: p2, title: "Patio surround", loc: "Somerset, KY", type: "Cedar privacy" },
  { img: horizontal, title: "Modern courtyard", loc: "London, KY", type: "Horizontal cedar" },
  { img: p4, title: "Commercial yard", loc: "Corbin, KY", type: "Chain link + slats" },
  { img: vinyl, title: "Family backyard", loc: "Monticello, KY", type: "Vinyl semi-privacy" },
];

function Portfolio() {
  return (
    <>
      <header className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="script text-xl text-accent">Built to last</p>
          <h1 className="mt-1 font-display text-5xl font-semibold text-foreground">
            Portfolio
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            A few recent installs from Pulaski, Wayne, and the surrounding
            counties. Every fence built and stood by the same crew.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>figure]:mb-4 [&>figure]:break-inside-avoid">
          {ITEMS.map((it) => (
            <figure
              key={it.title}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
            >
              <img src={it.img} alt={it.title} loading="lazy" className="w-full object-cover" />
              <figcaption className="flex items-center justify-between gap-3 p-4">
                <div>
                  <p className="font-display text-base font-semibold text-foreground">{it.title}</p>
                  <p className="text-xs text-muted-foreground">{it.loc}</p>
                </div>
                <span className="rounded-full bg-accent/15 px-2.5 py-1 text-xs font-medium text-[color:var(--color-bourbon-deep)]">
                  {it.type}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </>
  );
}
