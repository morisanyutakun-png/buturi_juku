import Link from "next/link";
import { mainNav } from "@/data/site";
import { BrandMark } from "@/components/brand-mark";
import { MobileNav } from "@/components/mobile-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-ink-900/[0.06] bg-paper/95 supports-[backdrop-filter]:bg-paper/75 supports-[backdrop-filter]:backdrop-blur-md">
      <div className="container flex h-16 sm:h-[68px] items-center justify-between">
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
            href="/courses"
            className="rounded-full px-4 py-2 text-[13px] text-ink-700 transition hover:bg-ink-900/[0.04] hover:text-ink-900"
          >
            学習サポート
          </Link>
          <Link
            href="/prints"
            className="group inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-medium text-paper shadow-warm transition duration-200 hover:brightness-105"
            style={{
              background:
                "linear-gradient(120deg, #b35f27 0%, #e28040 60%, #f3a86c 100%)",
            }}
          >
            演習プリント
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
