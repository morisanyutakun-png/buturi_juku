import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
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
      <div className="container py-16 sm:py-24">
        <div className="grid gap-12 sm:gap-14 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <BrandMark />
            <p className="mt-6 sm:mt-7 max-w-md text-[15px] sm:text-[14px] leading-[2] sm:leading-[1.85] text-ink-600">
              {siteConfig.description}
            </p>
            <div className="mt-7 sm:mt-8 inline-flex items-center gap-3 rounded-full border border-ink-900/[0.08] bg-white/70 px-4 py-2.5 sm:py-2 text-[12px] sm:text-[11px] tracking-[0.16em] sm:tracking-[0.18em] text-ink-600 backdrop-blur">
              <span
                className="inline-flex h-1.5 w-1.5 rounded-full bg-forest"
                aria-hidden
              />
              {siteConfig.contact.hours}
            </div>

            {/* SNS — まずは note のみ。今後追加するなら同じ列に並べる。 */}
            <div className="mt-7 sm:mt-8">
              <h3 className="text-[11px] sm:text-[10px] font-medium tracking-[0.28em] sm:tracking-[0.32em] uppercase text-brand-deep">
                SNS / Follow
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                <li>
                  <a
                    href="https://note.com/yuta_mori_ind"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="森祐太の note を新しいタブで開く"
                    className="group inline-flex min-h-[40px] items-center gap-2 rounded-full border border-ink-900/[0.12] bg-white/80 px-4 py-2 text-[13px] sm:text-[13px] text-ink-800 backdrop-blur transition hover:border-ink-900/30 hover:bg-white"
                  >
                    <Image
                      src="/brand/note-icon.webp"
                      width={24}
                      height={24}
                      alt=""
                      aria-hidden
                      className="h-6 w-6 rounded-full border border-ink-900/15 bg-white p-[3px]"
                    />
                    <span className="font-medium">note</span>
                    <span className="text-ink-400">/ yuta_mori_ind</span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 opacity-50 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid gap-9 sm:gap-10 grid-cols-2 lg:grid-cols-4">
            {footerNav.map((group) => (
              <div key={group.heading}>
                <h3 className="text-[11px] sm:text-[10px] font-medium tracking-[0.28em] sm:tracking-[0.32em] uppercase text-brand-deep">
                  {group.heading}
                </h3>
                <ul className="mt-5 space-y-4 sm:space-y-3 text-[15px] sm:text-[14px] text-ink-700">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="inline-flex min-h-[28px] items-center transition hover:text-ink-900"
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

        <div className="mt-16 sm:mt-20 flex flex-col items-start justify-between gap-4 border-t border-ink-900/[0.06] pt-8 text-[12.5px] sm:text-[12px] text-ink-500 sm:flex-row sm:items-center">
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
