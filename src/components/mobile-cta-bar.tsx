"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, FileText } from "lucide-react";

/**
 * Mobile bottom sticky CTA — デュアル構成。
 *
 * 表示条件:
 *   - スマホ（md 未満）のみ
 *   - ホーム `/` および /prints ではページ内に CTA が複数あるため非表示
 *   - /trial /contact /thanks など、ページ自体がコンバージョン場の場合も非表示
 *
 * デザイン:
 *   - 左 7 / 右 3 のプロポーションで、主 CTA は「演習プリントを開く」(warm gradient)。
 *     右側は控えめな warm-bg ピル「体験」で、長いページでも体験授業から逃さないようにする。
 *   - 安全領域 / 44px tap target / shimmer エフェクトはそのまま維持。
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
        <div className="grid grid-cols-[1fr_auto] gap-2">
          <Link
            href="/prints"
            className="group inline-flex h-11 items-center justify-center gap-1.5 rounded-full px-3 text-[14px] font-medium text-white shadow-warm active:scale-[0.98] transition-transform"
            style={{
              background:
                "linear-gradient(120deg, #b35f27 0%, #e28040 60%, #f3a86c 100%)",
            }}
          >
            <FileText className="h-3.5 w-3.5 opacity-90" aria-hidden />
            演習プリントを開く
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/trial"
            className="inline-flex h-11 items-center justify-center gap-1 rounded-full border border-warm/40 bg-warm-bg/85 px-4 text-[13px] font-medium text-warm-deep active:scale-[0.98] transition-transform"
            aria-label="体験授業の詳細を見る"
          >
            体験
            <span aria-hidden className="text-[10px] opacity-70">60分</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
