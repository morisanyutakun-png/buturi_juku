"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";

/**
 * Mobile bottom sticky CTA。
 *
 * 表示条件:
 *   - スマホ（md未満）のみ
 *   - ホーム `/` ではページ内 CTA が複数あるため非表示（邪魔感の解消）
 *   - /trial /contact /thanks など、ページ自体がコンバージョン場の場合も非表示
 *
 * デザイン:
 *   - 「相談する」サブボタンを撤去し、単一 CTA（体験申込）のみに簡素化。
 *   - 高さ・パディングを詰めて、コンテンツ閲覧の妨げを最小化。
 *
 * Pairs with `main { padding-bottom: 64px }` in globals.css so the
 * bar never overlaps page content.
 */
export function MobileCtaBar() {
  const pathname = usePathname();

  // 非表示にするパス
  const hidden =
    pathname === "/" ||
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
          href="/contact?topic=trial#contact-form"
          className="group inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-full px-3 text-[14px] font-medium text-white shadow-warm active:scale-[0.98] transition-transform"
          style={{
            background:
              "linear-gradient(120deg, #b35f27 0%, #e28040 60%, #f3a86c 100%)",
          }}
        >
          体験授業を申し込む
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
