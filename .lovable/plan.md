# Bluegrass Fence Co. — Demo Site Plan

A premium, conversion-focused marketing site for a Somerset, KY fencing company, anchored by an interactive Fencing Calculator. Built on the existing TanStack Start + Tailwind v4 stack with a warm, authentic Kentucky design system.

## Design system

Establish tokens in `src/styles.css` (oklch):
- Deep forest green (primary), bourbon amber (accent), cream/parchment (background), warm charcoal (foreground), navy (secondary), warm brown (muted).
- Typography loaded via `<link>` in `__root.tsx`: **Fraunces** (display serif, subtle Kentucky elegance) + **Inter** (body). Optional **Caveat** script accent for handwritten flourishes ("Kentucky Roots").
- Generous radii, soft warm shadows, subtle grain/paper texture on hero sections.

## Routes (TanStack file-based)

```
src/routes/
  __root.tsx          → shared header/footer, sitewide meta, font links
  index.tsx           → Homepage
  services.tsx        → All fence types overview
  portfolio.tsx       → Gallery grid
  about.tsx           → Family story, KY heritage
  calculator.tsx      → Full-page interactive calculator
  contact.tsx         → Quote form (accepts prefilled calc data)
  faq.tsx             → Local fencing FAQ / blog teasers
```

Each route defines its own `head()` with unique title/description/og tags, canonical, and JSON-LD (LocalBusiness on root; Service/FAQPage where relevant).

## Homepage sections

1. Hero — full-bleed photo of cedar fence line across rolling bluegrass hills at golden hour. Tagline: "Strong Fences. Kentucky Roots." Sub: family craftsmanship since [year]. Primary CTA → Calculator, secondary → Free Estimate.
2. Trust strip — years in business, # of installs, licensed & insured, family-owned, free estimates.
3. Services overview — 6 cards (Cedar Privacy, Horse & Farm, Vinyl, Chain Link, Ornamental Iron, Horizontal Modern) each with authentic photo.
4. Calculator teaser — split section with screenshot preview + "Estimate your project in 60 seconds" CTA.
5. Portfolio teaser — 4-image asymmetric grid → link to full portfolio.
6. Testimonials — 3 quotes from Somerset / Lake Cumberland / Lexington-area customers.
7. Local coverage — service-area map/list (Pulaski, Wayne, McCreary, Russell, Laurel counties).
8. CTA footer band — "Let's build something that lasts" → contact.

## Fencing Calculator (centerpiece)

Client-side React component under `src/components/calculator/`. Tabs / stepped UI:

**Step 1 — Project basics**
- Total fence length (linear ft), fence height (ft), style dropdown (Cedar privacy, Chain link, Vinyl privacy, Ornamental iron, Horse board, Horizontal modern), # of gates, gate width.

**Step 2 — Posts & concrete**
- Post spacing (default per style), hole diameter (8/10/12 in), hole depth (24/30/36 in), post length recommendation.
- Computes: post count = ceil(length / spacing) + gate posts + 1; concrete volume per hole (cylinder minus post displacement); total 80lb / 60lb bag counts (0.6 / 0.45 cu ft yield).

**Step 3 — Materials**
- Panels/pickets/boards, top & bottom rails, tension wire (chain link), hardware kits, gate hardware. Formulas per style with sensible defaults.

**Step 4 — Labor & summary**
- DIY vs Pro toggle → labor range ($/linear ft band by style).
- Line-item breakdown (materials + labor + 10% waste), grand total range, per-linear-ft cost.
- Actions: Print/PDF summary, Copy shareable link (state encoded in URL), **Get Pro Quote** → routes to `/contact` with query params prefilling name/email/project.

UX: sliders + numeric inputs with units, tooltips explaining KY frost-line depth (30–36"), live recompute (debounced), sticky summary panel on desktop, collapsible on mobile. Fully accessible (labels, aria, keyboard).

## Images

All hero and section imagery generated as photorealistic Kentucky scenes via `imagegen` (standard tier), then externalized with `lovable-assets`. Prompts specify: Central/Eastern KY bluegrass, rolling hills, cedar/board fences on horse farms, natural golden-hour lighting, no people or blurred faces, honest craftsmanship — no stock/plastic look.

Asset list (~10 images):
- Hero cedar fence + bluegrass sunrise
- 6 service tiles (one per fence type in authentic KY setting)
- 4 portfolio installs (farm board fence, residential cedar privacy, ornamental iron entrance, chain link commercial)
- About: family/workshop scene, weathered hands on cedar

## Contact & lead capture

Zod-validated form (name, email, phone, address, project details). Reads `?length=&style=&total=` query params from calculator handoff and prefills. Client-side only for demo (toast confirmation); note in code where to wire a server function + Lovable Cloud table later.

## SEO

- Route-specific title/description with local keywords ("Fencing Somerset KY", "Kentucky horse fence", "Lake Cumberland fence installer").
- LocalBusiness JSON-LD on root (name, area served, phone placeholder, geo).
- Service JSON-LD on services page; FAQPage JSON-LD on FAQ.
- Relative canonical + og:url per route; og:image at leaf routes using the hero asset of that page.
- `robots.txt` allow-all; `sitemap.xml` scaffold with TODO base URL.

## Technical notes

- Stack: existing TanStack Start v1 + React 19 + Tailwind v4 (no config changes to framework).
- Fonts loaded via `<link rel="stylesheet">` in `__root.tsx` head (never `@import` remote in CSS).
- Semantic tokens only in components — no hardcoded colors.
- Calculator state in a single `useReducer`; URL-sync via `useSearch`/`useNavigate`.
- No backend needed for the demo; Lovable Cloud not enabled unless the user wants real lead capture later.

## Out of scope for this build

- Real CMS/blog posts (FAQ page ships with static entries).
- Real lead submission backend, email delivery, PDF generation server-side (client-side print stylesheet only).
- Auth, admin dashboard, payment.
