import Link from "next/link";
import { mainNav } from "@/data/site";
import { BrandMark } from "@/components/brand-mark";
import { MobileNav } from "@/components/mobile-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-ink-900/[0.06] bg-paper/70 backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-paper/55">
      <div className="container flex h-[68px] items-center justify-between">
        <BrandMark />

        <nav aria-label="メインナビゲーション" className="hidden md:block">
          <ul className="flex items-center gap-1 text-[13.5px] text-ink-700">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="relative rounded-full px-3.5 py-2 transition-colors duration-200 hover:bg-ink-900/[0.04] hover:text-ink-900"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/trial"
            className="rounded-full px-4 py-2 text-[13px] text-ink-700 transition hover:bg-ink-900/[0.04] hover:text-ink-900"
          >
            体験授業
          </Link>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-1.5 rounded-full bg-ink-900 px-4 py-2 text-[13px] font-medium text-paper transition duration-200 hover:bg-ink-800"
          >
            お問い合わせ
            <span
              aria-hidden
              className="inline-block transition-transform duration-300 group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
