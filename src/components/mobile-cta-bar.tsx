"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";

/**
 * Always-visible bottom CTA on phones — improves conversion without
 * adding layout shift. Hidden where it would link to the current page
 * (avoids showing "申し込む" while the user is already on /trial).
 *
 * Pairs with `main { padding-bottom: 88px }` in globals.css so the
 * bar never overlaps page content.
 */
export function MobileCtaBar() {
  const pathname = usePathname();
  // Hide on conversion pages — the form/CTA is already on screen.
  if (pathname === "/trial" || pathname === "/contact") return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 border-t border-ink-900/[0.08] bg-paper/95 backdrop-blur-md md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      aria-label="モバイル下部CTA"
    >
      <div className="container flex items-center gap-2.5 py-2.5">
        <Link
          href="/contact"
          className="inline-flex h-12 flex-1 items-center justify-center rounded-full border border-ink-900/15 bg-white px-3 text-[13.5px] text-ink-800 active:scale-[0.98] transition-transform"
        >
          相談する
        </Link>
        <Link
          href="/trial"
          className="group inline-flex h-12 flex-[1.4] items-center justify-center gap-1.5 rounded-full px-3 text-[14px] font-medium text-white shadow-warm active:scale-[0.98] transition-transform"
          style={{
            background:
              "linear-gradient(120deg, #b35f27 0%, #e28040 60%, #f3a86c 100%)",
          }}
        >
          体験授業 ¥3,000 を申し込む
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
