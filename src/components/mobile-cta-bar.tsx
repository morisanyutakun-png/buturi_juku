"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, FileText } from "lucide-react";

/**
 * Mobile bottom sticky CTA。
 *
 * 表示条件:
 *   - スマホ（md未満）のみ
 *   - ホーム `/` および /prints ではページ内に CTA があるため非表示
 *   - /trial /contact /thanks など、ページ自体がコンバージョン場の場合も非表示
 *
 * デザイン:
 *   - 教材棚 (prints) を起点にしたサイト方針に合わせ、CTA は「演習プリントを開く」に統一。
 *     売り込み感を抑え、教材へのアクセスを最短化する。
 *
 * Pairs with `main { padding-bottom: 64px }` in globals.css so the
 * bar never overlaps page content.
 */
export function MobileCtaBar() {
  const pathname = usePathname();

  const hidden =
    pathname === "/" ||
    pathname === "/prints" ||
    pathname === "/trial" ||
    pathname === "/contact" ||
    pathname === "/thanks";

  if (hidden) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 border-t border-ink-900/[0.08] bg-paper/95 backdrop-blur-md md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      aria-label="モバイル下部CTA"
    >
      <div className="container py-2">
        <Link
          href="/prints"
          className="group inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-full px-3 text-[14px] font-medium text-white shadow-warm active:scale-[0.98] transition-transform"
          style={{
            background:
              "linear-gradient(120deg, #b35f27 0%, #e28040 60%, #f3a86c 100%)",
          }}
        >
          <FileText className="h-3.5 w-3.5 opacity-90" />
          演習プリントを開く
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
