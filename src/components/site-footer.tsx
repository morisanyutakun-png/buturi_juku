import Link from "next/link";
import { footerNav, siteConfig } from "@/data/site";
import { BrandMark } from "@/components/brand-mark";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-ink-900/[0.06] bg-paper-soft/60">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-hairline-x"
      />
      <div className="container py-20 sm:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <BrandMark />
            <p className="mt-7 max-w-md text-[14px] leading-[1.85] text-ink-600">
              {siteConfig.description}
            </p>
            <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-ink-900/[0.08] bg-white/70 px-4 py-2 text-[11px] tracking-[0.18em] text-ink-600 backdrop-blur">
              <span
                className="relative inline-flex h-1.5 w-1.5"
                aria-hidden
              >
                <span className="absolute inline-flex h-1.5 w-1.5 animate-ping rounded-full bg-forest/60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-forest" />
              </span>
              {siteConfig.contact.hours}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {footerNav.map((group) => (
              <div key={group.heading}>
                <h3 className="text-[10px] font-medium tracking-[0.32em] uppercase text-brand-deep">
                  {group.heading}
                </h3>
                <ul className="mt-5 space-y-3 text-[14px] text-ink-700">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="transition hover:text-ink-900"
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

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-ink-900/[0.06] pt-8 text-[12px] text-ink-500 sm:flex-row sm:items-center">
          <p>
            © {year} {siteConfig.name} ({siteConfig.nameSub}). All rights
            reserved.
          </p>
          <p className="font-serif tracking-[0.2em] text-ink-500">
            {siteConfig.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
