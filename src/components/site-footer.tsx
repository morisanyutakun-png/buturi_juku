import Link from "next/link";
import { footerNav, siteConfig } from "@/data/site";
import { BrandMark } from "@/components/brand-mark";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-paper/10 bg-ink-950">
      <div className="container py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <BrandMark />
            <p className="mt-6 max-w-md text-sm leading-relaxed text-paper/60">
              {siteConfig.description}
            </p>
            <p className="mt-6 text-xs tracking-widest uppercase text-paper/40">
              {siteConfig.contact.hours}
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {footerNav.map((group) => (
              <div key={group.heading}>
                <h3 className="text-xs tracking-[0.28em] uppercase text-accent/80">
                  {group.heading}
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-paper/70">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="hover:text-paper transition"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-paper/10 pt-8 text-xs text-paper/40 sm:flex-row sm:items-center">
          <p>© {year} {siteConfig.name}. All rights reserved.</p>
          <p className="font-serif tracking-[0.2em] uppercase text-paper/30">
            {siteConfig.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
