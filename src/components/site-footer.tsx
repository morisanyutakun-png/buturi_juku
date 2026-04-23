import Link from "next/link";
import { footerNav, siteConfig } from "@/data/site";
import { BrandMark } from "@/components/brand-mark";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-ink-900/10 bg-paper-soft">
      <div className="container py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <BrandMark />
            <p className="mt-6 max-w-md text-sm leading-relaxed text-ink-700">
              {siteConfig.description}
            </p>
            <p className="mt-6 text-xs tracking-widest uppercase text-ink-500">
              {siteConfig.contact.hours}
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {footerNav.map((group) => (
              <div key={group.heading}>
                <h3 className="text-xs tracking-[0.28em] uppercase text-brand-deep">
                  {group.heading}
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-ink-700">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="hover:text-brand transition"
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

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-ink-900/10 pt-8 text-xs text-ink-500 sm:flex-row sm:items-center">
          <p>© {year} {siteConfig.name} ({siteConfig.nameSub}). All rights reserved.</p>
          <p className="font-serif tracking-[0.2em] uppercase text-ink-500">
            {siteConfig.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
