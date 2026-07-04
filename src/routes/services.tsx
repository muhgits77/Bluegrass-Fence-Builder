import { createFileRoute, Link } from "@tanstack/react-router";

import cedar from "@/assets/service-cedar.jpg";
import horse from "@/assets/service-horse.jpg";
import vinyl from "@/assets/service-vinyl.jpg";
import iron from "@/assets/service-iron.jpg";
import chain from "@/assets/service-chainlink.jpg";
import horizontal from "@/assets/service-horizontal.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Fencing Services — Cedar, Vinyl, Iron & Horse Fence · Somerset KY" },
      {
        name: "description",
        content:
          "Cedar privacy, vinyl, chain link, ornamental iron, horse board, and horizontal modern fencing installed across Somerset, Lake Cumberland, and Central Kentucky.",
      },
      { property: "og:title", content: "Fencing Services · Bluegrass Fence Co." },
      { property: "og:url", content: "/services" },
      { property: "og:image", content: horse },
    ],
    links: [{ rel: "canonical", href: "/services" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Fence installation",
          areaServed: "Central Kentucky",
          provider: { "@type": "LocalBusiness", name: "Bluegrass Fence Co." },
        }),
      },
    ],
  }),
  component: Services,
});

const ITEMS = [
  {
    id: "cedar",
    img: cedar,
    title: "Cedar Privacy Fence",
    lead: "Rough-sawn Kentucky cedar with concealed hardware.",
    body: "Ideal for backyards that need real privacy and a warm, natural look. Cedar weathers to a soft silver-gray or can be sealed to keep the amber tone. We hand-select every board and set posts 30–36 inches deep so your fence stays plumb through freeze-thaw seasons.",
    bullets: ["6–8 ft heights", "Board-on-board or shadow-box", "Sealed or naturally weathered"],
  },
  {
    id: "horse",
    img: horse,
    title: "Horse & Farm Fencing",
    lead: "Classic Bluegrass 4-board paddock and pasture fence.",
    body: "The look of the horse country you drive through on the way to Keeneland — because our crew has been building it for two decades. Oak or pressure-treated boards, 5x5 posts, painted black or left natural.",
    bullets: ["4-board, 3-board, split-rail", "Corner braces for tension runs", "Oak, PT pine, or vinyl board"],
  },
  {
    id: "vinyl",
    img: vinyl,
    title: "Vinyl Fencing",
    lead: "Low maintenance with a lifetime warranty on premium lines.",
    body: "Made in the USA, UV-stable vinyl that won't rot, warp, or need re-staining. Perfect for pool enclosures and neighborhoods with strict HOA requirements.",
    bullets: ["Privacy, semi-privacy, picket", "Cedar-grain textured options", "Lifetime residential warranty"],
  },
  {
    id: "chain-link",
    img: chain,
    title: "Chain Link Fencing",
    lead: "Galvanized commercial-grade mesh, honest and durable.",
    body: "Residential, farm, and commercial installs. Add green or black privacy slats for backyards, or vinyl-coated mesh for a lower-visibility look.",
    bullets: ["Residential and commercial", "Privacy slats & windscreen", "Barb wire and gate operator options"],
  },
  {
    id: "iron",
    img: iron,
    title: "Ornamental Iron & Aluminum",
    lead: "Powder-coated elegance for estates and pool codes.",
    body: "Pool-code compliant with self-closing gates. Stone or brick pillars available for driveway entries. Aluminum for maintenance-free, steel for maximum security.",
    bullets: ["Pool-code compliant", "Stone pillar options", "Automated driveway gates"],
  },
  {
    id: "horizontal",
    img: horizontal,
    title: "Horizontal Modern",
    lead: "Contemporary cedar slats for modern homes and courtyards.",
    body: "Clear-grade cedar slats on hidden steel frames for the sharp, architectural look you see in new-build neighborhoods around Lexington and Louisville.",
    bullets: ["Clear or knotty cedar", "Steel post option", "Custom heights up to 8 ft"],
  },
];

function Services() {
  return (
    <>
      <header className="border-b border-border bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="script text-xl text-accent">Every kind of fence</p>
          <h1 className="mt-1 font-display text-5xl font-semibold">Services</h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/85">
            Whatever your property calls for — a horse farm, a family backyard, a commercial
            yard, or a country estate — we've built it across Kentucky for twenty years.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-16 sm:px-6 lg:px-8">
        {ITEMS.map((item, i) => (
          <section
            key={item.id}
            id={item.id}
            className={`grid items-center gap-10 lg:grid-cols-2 ${
              i % 2 === 1 ? "lg:[&>img]:order-2" : ""
            }`}
          >
            <img
              src={item.img}
              alt={item.title}
              loading="lazy"
              className="aspect-[4/3] w-full rounded-2xl object-cover shadow-sm"
            />
            <div>
              <p className="script text-lg text-accent">{item.lead}</p>
              <h2 className="mt-1 font-display text-3xl font-semibold text-foreground sm:text-4xl">
                {item.title}
              </h2>
              <p className="mt-4 text-muted-foreground">{item.body}</p>
              <ul className="mt-5 space-y-2 text-sm text-foreground">
                {item.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex gap-3">
                <Link
                  to="/calculator"
                  className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  Estimate this fence
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center rounded-md border border-input bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
                >
                  Get a quote
                </Link>
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
