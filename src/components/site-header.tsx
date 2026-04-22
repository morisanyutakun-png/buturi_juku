import Link from "next/link";
import { mainNav } from "@/data/site";
import { BrandMark } from "@/components/brand-mark";
import { MobileNav } from "@/components/mobile-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-paper/5 bg-ink-950/70 backdrop-blur-md">
      <div className="container flex h-[72px] items-center justify-between">
        <BrandMark />

        <nav aria-label="メインナビゲーション" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm text-paper/80">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="relative transition-colors hover:text-paper"
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
            className="rounded-full border border-paper/20 px-4 py-2 text-sm text-paper hover:border-accent hover:text-accent transition"
          >
            体験授業
          </Link>
          <Link
            href="/contact"
            className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-ink-950 hover:bg-accent-soft transition"
          >
            お問い合わせ
          </Link>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
