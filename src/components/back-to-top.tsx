"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/**
 * モバイル長ページ用の「上へ戻る」フローター。
 *
 * 設計:
 *   - 一定距離スクロールしたら現れる（800px）
 *   - 下部の MobileCtaBar とぶつからないよう、bottom を bar 分（約 64px）+ 余白で逃がす
 *   - md 以上では非表示（PC ではスクロールも短く、不要）
 *   - JS は IntersectionObserver / scroll で軽量、`passive` イベント
 *   - LCP に影響しないよう、初期は描画されず（visibility hidden）
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const threshold = 800;
    const onScroll = () => setVisible(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="ページの上に戻る"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className={`fixed right-3 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink-900/15 bg-white/95 text-ink-800 shadow-card backdrop-blur-md transition active:scale-[0.95] md:hidden ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-2 pointer-events-none"
      }`}
      style={{
        bottom: "calc(76px + env(safe-area-inset-bottom, 0px))",
        transition: "opacity 200ms ease, transform 200ms ease",
      }}
    >
      <ArrowUp className="h-4 w-4" aria-hidden strokeWidth={2} />
    </button>
  );
}
