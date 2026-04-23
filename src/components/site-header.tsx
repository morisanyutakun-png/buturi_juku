import Link from "next/link";
import { mainNav } from "@/data/site";
import { BrandMark } from "@/components/brand-mark";
import { MobileNav } from "@/components/mobile-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-ink-900/10 bg-paper/80 backdrop-blur-md">
      <div className="container flex h-[72px] items-center justify-between">
        <BrandMark />

        <nav aria-label="メインナビゲーション" className="hidden md:block">
          <ul className="flex items-center gap-7 text-sm text-ink-700">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="relative transition-colors hover:text-brand"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/trial"
            className="rounded-full border border-ink-900/15 bg-white px-4 py-2 text-sm text-ink-800 hover:border-brand hover:text-brand transition"
          >
            体験授業
          </Link>
          <Link
            href="/contact"
            className="rounded-full bg-warm px-4 py-2 text-sm font-medium text-white shadow-warm hover:bg-warm-deep transition"
          >
            お問い合わせ
          </Link>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
