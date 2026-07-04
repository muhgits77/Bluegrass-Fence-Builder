import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, MapPin, Phone } from "lucide-react";
import { STYLES, type FenceStyle } from "@/lib/calculator";

const searchSchema = z.object({
  style: z.string().optional(),
  length: z.coerce.number().optional(),
  height: z.coerce.number().optional(),
  gates: z.coerce.number().optional(),
  total: z.string().optional(),
});

export const Route = createFileRoute("/contact")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Free Fence Estimate — Contact Bluegrass Fence Co. · Somerset KY" },
      {
        name: "description",
        content:
          "Request a free on-site fence estimate in Somerset, Lake Cumberland, or Central Kentucky. We respond within one business day.",
      },
      { property: "og:title", content: "Free Fence Estimate · Bluegrass Fence Co." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

const formSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(7, "Please enter a phone number").max(40),
  address: z.string().trim().max(200).optional(),
  message: z.string().trim().min(5, "Tell us a bit about your project").max(1500),
});

const inputCls =
  "h-11 rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30";

function Contact() {
  const s = useSearch({ from: "/contact" });
  const styleLabel = s.style && STYLES[s.style as FenceStyle]?.label;
  const prefilledMessage = s.length
    ? `From the fence calculator:\n• Style: ${styleLabel ?? s.style}\n• Length: ${s.length} ft\n• Height: ${s.height ?? ""} ft\n• Gates: ${s.gates ?? 0}\n• Estimated range: $${s.total ?? ""}\n\nI'd like a real on-site quote. Please contact me to schedule a visit.`
    : "";

  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const parsed = formSchema.safeParse(data);
    if (!parsed.success) {
      const fe: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        fe[String(i.path[0])] = i.message;
      });
      setErrors(fe);
      return;
    }
    setErrors({});
    setPending(true);
    // Demo submit — swap for a server function + Lovable Cloud table.
    setTimeout(() => {
      setPending(false);
      toast.success("Thanks! We'll be in touch within one business day.");
      (e.target as HTMLFormElement).reset();
    }, 700);
  };

  return (
    <>
      <header className="border-b border-border bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="script text-xl text-accent">Come see us</p>
          <h1 className="mt-1 font-display text-5xl font-semibold">Free estimate</h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/85">
            Tell us about your property. We'll drive out, walk the line, and give you a
            straight, honest number — no pressure.
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:px-8">
        <form onSubmit={onSubmit} noValidate className="space-y-5">
          {s.length ? (
            <div className="rounded-xl border border-accent/50 bg-accent/10 p-4 text-sm text-foreground">
              <p className="font-semibold">Calculator estimate attached</p>
              <p className="mt-1 text-muted-foreground">
                {styleLabel ?? s.style} · {s.length} ft · ${s.total}
              </p>
            </div>
          ) : null}

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium">Name</span>
              <input name="name" required className={inputCls} placeholder="Your name" />
              {errors.name && <span className="text-xs text-destructive">{errors.name}</span>}
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium">Phone</span>
              <input name="phone" required className={inputCls} placeholder="(606) 555-0142" />
              {errors.phone && <span className="text-xs text-destructive">{errors.phone}</span>}
            </label>
          </div>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Email</span>
            <input type="email" name="email" required className={inputCls} placeholder="you@example.com" />
            {errors.email && <span className="text-xs text-destructive">{errors.email}</span>}
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Property address (optional)</span>
            <input name="address" className={inputCls} placeholder="Street, city, county" />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Project details</span>
            <textarea
              name="message"
              defaultValue={prefilledMessage}
              rows={7}
              className={`${inputCls} h-auto py-3`}
              placeholder="Type of fence, approx. length, timing, anything else worth knowing"
            />
            {errors.message && <span className="text-xs text-destructive">{errors.message}</span>}
          </label>

          <button
            type="submit"
            disabled={pending}
            className="inline-flex w-full items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow transition hover:brightness-95 disabled:opacity-60 sm:w-auto"
          >
            {pending ? "Sending…" : "Request free estimate"}
          </button>

          <p className="text-xs text-muted-foreground">
            We reply within one business day. We never share your info.
          </p>
        </form>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="font-display text-xl font-semibold text-foreground">Reach us direct</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-accent" />
                <span>
                  1247 South Highway 27<br />Somerset, KY 42501
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-accent" />
                <a href="tel:+16065550142" className="hover:underline">(606) 555-0142</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-accent" />
                <a href="mailto:hello@bluegrassfence.co" className="hover:underline">
                  hello@bluegrassfence.co
                </a>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-muted/40 p-6 text-sm text-muted-foreground">
            <p className="font-display text-base font-semibold text-foreground">Shop hours</p>
            <p className="mt-2">Mon – Fri · 7:00a – 5:30p</p>
            <p>Saturday · by appointment</p>
            <p className="mt-4 text-xs">On-site estimates run Mon – Sat.</p>
          </div>
        </aside>
      </div>
    </>
  );
}
