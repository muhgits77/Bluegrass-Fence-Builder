import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "../components/site/SiteHeader";
import { SiteFooter } from "../components/site/SiteFooter";
import { Toaster } from "sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="script text-2xl text-accent">Well, shoot.</p>
        <h1 className="mt-2 font-display text-6xl font-semibold text-foreground">404</h1>
        <h2 className="mt-3 text-xl font-semibold text-foreground">This page took a wrong turn.</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for isn't around these parts.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Head Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went sideways. Try again, or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Bluegrass Fence Co. — Kentucky Fence Builders in Somerset, KY" },
      {
        name: "description",
        content:
          "Family-owned fence builders in Somerset, KY. Cedar, vinyl, chain link, ornamental iron, and horse fencing. Free estimates and a Kentucky fence calculator.",
      },
      { name: "author", content: "Bluegrass Fence Co." },
      { property: "og:site_name", content: "Bluegrass Fence Co." },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Bluegrass Fence Co. — Kentucky Fence Builders in Somerset, KY" },
      {
        property: "og:description",
        content:
          "Custom cedar, vinyl, chain link, iron, and horse fencing across Central Kentucky. Free estimates.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Bluegrass Fence Co. — Kentucky Fence Builders in Somerset, KY" },
      { name: "description", content: "Custom cedar, vinyl, chain link, ornamental iron, and horse fencing across Somerset and Central Kentucky. Family owned, free estimates, and an interactive Kentucky fence calculator." },
      { property: "og:description", content: "Custom cedar, vinyl, chain link, ornamental iron, and horse fencing across Somerset and Central Kentucky. Family owned, free estimates, and an interactive Kentucky fence calculator." },
      { name: "twitter:description", content: "Custom cedar, vinyl, chain link, ornamental iron, and horse fencing across Somerset and Central Kentucky. Family owned, free estimates, and an interactive Kentucky fence calculator." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/bb854d07-6498-43d4-929d-6655cff7cf61" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/bb854d07-6498-43d4-929d-6655cff7cf61" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=Caveat:wght@500;600&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": "https://bluegrassfence.co/#business",
          name: "Bluegrass Fence Co.",
          description:
            "Family-owned Kentucky fence company specializing in cedar, vinyl, chain link, ornamental iron, and horse fencing.",
          telephone: "+1-606-555-0142",
          email: "hello@bluegrassfence.co",
          address: {
            "@type": "PostalAddress",
            streetAddress: "1247 South Highway 27",
            addressLocality: "Somerset",
            addressRegion: "KY",
            postalCode: "42501",
            addressCountry: "US",
          },
          areaServed: ["Somerset KY", "Lake Cumberland", "Pulaski County", "Wayne County", "Central Kentucky"],
          priceRange: "$$",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
      <Toaster position="top-center" richColors />
    </QueryClientProvider>
  );
}
