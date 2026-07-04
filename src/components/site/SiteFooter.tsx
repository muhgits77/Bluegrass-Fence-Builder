import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-accent text-accent-foreground">
              <span className="font-display text-lg font-semibold">B</span>
            </span>
            <span className="font-display text-xl font-semibold">Bluegrass Fence Co.</span>
          </div>
          <p className="script mt-2 text-accent">Strong fences. Kentucky roots.</p>
          <p className="mt-4 max-w-md text-sm text-primary-foreground/80">
            Family-rooted fence builders serving Somerset, Lake Cumberland, and Central Kentucky.
            Cedar, vinyl, chain link, ornamental iron, and horse fencing built to last through
            forty Kentucky winters.
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-accent">
            Visit
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/80">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 flex-none text-accent" />
              <span>
                1247 South Highway 27
                <br />
                Somerset, KY 42501
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 flex-none text-accent" />
              <a href="tel:+16065550142" className="hover:text-primary-foreground">
                (606) 555-0142
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 flex-none text-accent" />
              <a href="mailto:hello@bluegrassfence.co" className="hover:text-primary-foreground">
                hello@bluegrassfence.co
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-accent">
            Explore
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/services" className="hover:text-primary-foreground">Services</Link></li>
            <li><Link to="/portfolio" className="hover:text-primary-foreground">Portfolio</Link></li>
            <li><Link to="/calculator" className="hover:text-primary-foreground">Fence Calculator</Link></li>
            <li><Link to="/about" className="hover:text-primary-foreground">About Us</Link></li>
            <li><Link to="/faq" className="hover:text-primary-foreground">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-primary-foreground">Free Estimate</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-primary-foreground/60 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Bluegrass Fence Co. Licensed &amp; insured in Kentucky.</p>
          <p>Serving Pulaski · Wayne · McCreary · Russell · Laurel counties</p>
        </div>
      </div>

      {/* Demo notice — elegant, non-intrusive, consistent with design system */}
      <div className="border-t border-primary-foreground/10 bg-primary/95">
        <div className="mx-auto max-w-7xl px-4 py-3 text-center text-[10px] leading-relaxed text-primary-foreground/45 sm:px-6 lg:px-8">
          This is a fictional demo website built by <span className="font-medium text-primary-foreground/70">Bluegrass Digital Forge</span> to showcase premium design and interactive tools for Kentucky businesses.<br className="hidden sm:inline" /> All company details, addresses, phone numbers, and contact information are entirely fictitious.
        </div>
      </div>
    </footer>
  );
}
