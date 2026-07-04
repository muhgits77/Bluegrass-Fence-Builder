import { createFileRoute, Link } from "@tanstack/react-router";
import craftsman from "@/assets/about-craftsman.jpg";
import hero from "@/assets/hero-bluegrass-fence.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Family-Owned Kentucky Fence Builders · Bluegrass Fence Co." },
      {
        name: "description",
        content:
          "Three generations of Kentucky fence builders based in Somerset. Honest craftsmanship, local roots, and fences built to hold up to Bluegrass weather.",
      },
      { property: "og:title", content: "About · Bluegrass Fence Co." },
      { property: "og:url", content: "/about" },
      { property: "og:image", content: craftsman },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border">
        <img src={hero} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 -z-10 bg-background/85" />
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <p className="script text-xl text-accent">Three generations, one crew</p>
          <h1 className="mt-1 max-w-3xl font-display text-5xl font-semibold text-foreground sm:text-6xl">
            We've been building Kentucky fences since our granddad's pickup was new.
          </h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <img
          src={craftsman}
          alt="Craftsman fitting a cedar board with a drill"
          loading="lazy"
          className="aspect-[4/3] w-full rounded-2xl object-cover shadow-sm"
        />
        <div className="space-y-4 text-foreground/90">
          <h2 className="font-display text-3xl font-semibold text-foreground">Our story</h2>
          <p>
            Bluegrass Fence Co. started in 2004 out of a shop on the family farm
            just south of Somerset. Grandpa Ray taught our founder how to sink a
            post the summer he turned twelve, and twenty years later that same
            crew has grown into the largest independent fence builder in South-Central Kentucky.
          </p>
          <p>
            Everything we build carries the same standard: 30–36 inch holes,
            plumb posts, tight joinery, and boards that meet at the seams. If it
            wouldn't hold up in the field behind our own house, we won't put it
            in yours.
          </p>
          <p>
            We keep our crews small on purpose. The same lead that measures your
            property will be there the day the last gate hardware goes on. That's
            the Kentucky way we were raised on, and it's the only way we know how
            to do this work.
          </p>
        </div>
      </section>

      <section className="border-t border-border bg-muted/40 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {[
            {
              t: "Honest craftsmanship",
              d: "No shortcuts on hole depth, hardware, or post spacing. The stuff that shows up in year seven, not year one.",
            },
            {
              t: "Local through and through",
              d: "Our team lives in Pulaski, Wayne, Russell, and Laurel counties. We're building for our neighbors.",
            },
            {
              t: "Fair, straight pricing",
              d: "Our online calculator gets within a couple hundred dollars of the real quote. No games, no upsells.",
            },
          ].map((v) => (
            <div key={v.t} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h3 className="font-display text-xl font-semibold text-foreground">{v.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-16 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <div>
          <p className="script text-xl text-accent">Come see for yourself</p>
          <h2 className="mt-1 font-display text-3xl font-semibold text-foreground">
            Let's walk your property.
          </h2>
        </div>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow transition hover:brightness-95"
        >
          Book a free estimate
        </Link>
      </section>
    </>
  );
}
