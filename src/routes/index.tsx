import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calculator, CheckCircle2, MapPin, Quote, ShieldCheck, Sparkles } from "lucide-react";

import heroImg from "@/assets/hero-bluegrass-fence.jpg";
import cedar from "@/assets/service-cedar.jpg";
import horse from "@/assets/service-horse.jpg";
import vinyl from "@/assets/service-vinyl.jpg";
import iron from "@/assets/service-iron.jpg";
import chain from "@/assets/service-chainlink.jpg";
import horizontal from "@/assets/service-horizontal.jpg";
import p1 from "@/assets/portfolio-1.jpg";
import p2 from "@/assets/portfolio-2.jpg";
import p3 from "@/assets/portfolio-3.jpg";
import p4 from "@/assets/portfolio-4.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bluegrass Fence Co. — Kentucky Fence Builders in Somerset, KY" },
      {
        name: "description",
        content:
          "Custom cedar, vinyl, chain link, ornamental iron, and horse fencing across Somerset and Central Kentucky. Family owned, free estimates, and an interactive Kentucky fence calculator.",
      },
      { property: "og:title", content: "Bluegrass Fence Co. — Kentucky Fence Builders" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const SERVICES = [
  { img: cedar, title: "Cedar Privacy", desc: "Rough-sawn Kentucky cedar built for weather and quiet backyards." },
  { img: horse, title: "Horse & Farm", desc: "Classic 4-board and paddock fencing for Bluegrass horse farms." },
  { img: vinyl, title: "Vinyl", desc: "Low-maintenance vinyl with a lifetime warranty on premium lines." },
  { img: chain, title: "Chain Link", desc: "Galvanized commercial-grade chain link with privacy slat options." },
  { img: iron, title: "Ornamental Iron", desc: "Powder-coated aluminum & steel with stone pillars for estates." },
  { img: horizontal, title: "Horizontal Modern", desc: "Clean cedar slats for contemporary homes and courtyards." },
];

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImg}
          alt="Black plank fence at sunrise over rolling Kentucky bluegrass hills"
          width={1920}
          height={1280}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />
        <div className="mx-auto flex min-h-[640px] max-w-7xl flex-col justify-end px-4 pb-16 pt-32 sm:px-6 sm:pb-24 sm:pt-40 lg:px-8">
          <p className="script text-2xl text-[color:oklch(0.85_0.14_75)]">Somerset, Kentucky · since 2004</p>
          <h1 className="mt-2 max-w-3xl font-display text-5xl font-semibold text-white sm:text-6xl lg:text-7xl">
            Strong fences.<br />Kentucky roots.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/85">
            Family-crafted cedar, vinyl, iron, and horse fencing built to hold up
            to forty Kentucky winters — and frame every view of the bluegrass.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/calculator"
              className="group inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-base font-semibold text-accent-foreground shadow-lg transition hover:brightness-95"
            >
              <Calculator className="h-5 w-5" />
              Estimate your project
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-white/40 bg-white/10 px-6 py-3 text-base font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              Get a free estimate
            </Link>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:grid-cols-4 sm:px-6 lg:px-8">
          {[
            { n: "20+", l: "Years building fences" },
            { n: "1,200+", l: "Kentucky installations" },
            { n: "5-yr", l: "Craftsmanship warranty" },
            { n: "Free", l: "On-site estimates" },
          ].map((t) => (
            <div key={t.l} className="text-center sm:text-left">
              <p className="font-display text-3xl font-semibold text-primary">{t.n}</p>
              <p className="text-sm text-muted-foreground">{t.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="script text-xl text-accent">What we build</p>
            <h2 className="mt-1 font-display text-4xl font-semibold text-foreground">
              Fencing done the Kentucky way
            </h2>
          </div>
          <Link
            to="/services"
            className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:underline md:inline-flex"
          >
            All services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <article
              key={s.title}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:shadow-lg"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-semibold text-foreground">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Calculator teaser */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="script text-xl text-accent">The centerpiece</p>
            <h2 className="mt-1 font-display text-4xl font-semibold">
              Estimate your fence in about 60 seconds
            </h2>
            <p className="mt-4 max-w-lg text-primary-foreground/85">
              Post count, concrete bags, panels, hardware, and a materials-plus-labor
              range — tuned for Central Kentucky pricing and our clay soil.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-primary-foreground/85">
              {[
                "Live posts + cylinder-volume concrete (KY frost line)",
                "Full material estimates for all 6 fence styles",
                "DIY vs Pro toggle with realistic Somerset pricing",
                "Shareable links, print/PDF, and instant quote request",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-accent" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link
                to="/calculator"
                className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg transition hover:brightness-95"
              >
                Open the calculator <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-6 backdrop-blur">
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                ["Style", "Cedar Privacy"],
                ["Length", "150 ft"],
                ["Height", "6 ft"],
                ["Gates", "1 (4 ft)"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-lg bg-primary-foreground/10 p-3">
                  <p className="text-xs uppercase tracking-wider text-primary-foreground/60">{k}</p>
                  <p className="mt-1 font-medium">{v}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl bg-accent p-5 text-accent-foreground">
              <p className="text-xs uppercase tracking-wider">Estimated range</p>
              <p className="font-display text-3xl font-semibold">$6,000 – $9,300</p>
              <p className="mt-1 text-xs opacity-80">Materials + pro install · 10% waste</p>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs text-primary-foreground/80">
              <div><p className="font-display text-lg text-primary-foreground">21</p>Posts</div>
              <div><p className="font-display text-lg text-primary-foreground">54</p>80lb bags</div>
              <div><p className="font-display text-lg text-primary-foreground">19</p>Panels</div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio teaser */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="script text-xl text-accent">Recent work</p>
            <h2 className="mt-1 font-display text-4xl font-semibold text-foreground">
              Built across Central Kentucky
            </h2>
          </div>
          <Link to="/portfolio" className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:underline md:inline-flex">
            Full portfolio <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-6">
          <img src={p1} alt="Farm plank fence in fog" loading="lazy" className="col-span-4 aspect-[4/3] w-full rounded-2xl object-cover" />
          <img src={p2} alt="Cedar privacy fence patio" loading="lazy" className="col-span-2 aspect-[4/5] w-full rounded-2xl object-cover" />
          <img src={p3} alt="Ornamental iron entrance gate" loading="lazy" className="col-span-2 aspect-[4/5] w-full rounded-2xl object-cover" />
          <img src={p4} alt="Chain link commercial fence" loading="lazy" className="col-span-4 aspect-[4/3] w-full rounded-2xl object-cover" />
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="script text-center text-xl text-accent">Neighbors say</p>
          <h2 className="mt-1 text-center font-display text-4xl font-semibold text-foreground">
            Honest people. Honest fences.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                q: "They set every gate post 36 inches deep and the whole run is dead level. Two winters and not a board out of place.",
                a: "Sarah W.",
                l: "Lake Cumberland",
              },
              {
                q: "Fair estimate, showed up on the day they said, and the paddock looks like it belongs on a Lexington horse farm.",
                a: "Mike & Dana R.",
                l: "Somerset",
              },
              {
                q: "The calculator got us within a couple hundred dollars of the final quote. First contractor that felt straight-forward.",
                a: "Jason P.",
                l: "London, KY",
              },
            ].map((t) => (
              <figure key={t.a} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <Quote className="h-5 w-5 text-accent" />
                <blockquote className="mt-3 text-sm text-foreground">“{t.q}”</blockquote>
                <figcaption className="mt-4 text-sm">
                  <span className="font-semibold text-foreground">{t.a}</span>
                  <span className="text-muted-foreground"> · {t.l}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="script text-xl text-accent">Where we work</p>
            <h2 className="mt-1 font-display text-4xl font-semibold text-foreground">
              Serving South-Central Kentucky
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              We're proud to build across the lake country, horse country, and
              hollers we've called home for three generations.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Pulaski", "Wayne", "McCreary", "Russell", "Laurel", "Casey", "Lincoln", "Rockcastle"].map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1 text-sm text-foreground"
                >
                  <MapPin className="h-3.5 w-3.5 text-accent" /> {c} County
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-accent/15 text-accent">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-lg font-semibold text-foreground">Licensed &amp; insured</p>
                <p className="text-sm text-muted-foreground">Kentucky general contractor · $2M liability</p>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-accent/15 text-accent">
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-lg font-semibold text-foreground">Craftsmanship warranty</p>
                <p className="text-sm text-muted-foreground">5-year on all installations · lifetime on qualifying vinyl</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-accent">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-14 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <p className="script text-xl text-accent-foreground/80">Ready when you are</p>
            <h2 className="mt-1 font-display text-3xl font-semibold text-accent-foreground sm:text-4xl">
              Let's build something that lasts.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/calculator"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow transition hover:bg-primary/90"
            >
              Try the calculator
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-md border-2 border-primary bg-transparent px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
            >
              Get a free estimate
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
