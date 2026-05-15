"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

/**
 * ホームの Below-Fold "デスクトップ専用" 重いセクションを、
 * クライアント側で遅延ハイドレートするためのラッパー。
 *
 * 目的:
 *   Lighthouse の "Desktop" 監査で DOM が 2,500+ 要素 / backdrop-blur 100+ 層に達し、
 *   "LHR failed to render" が発生していた。これらのセクションは sm:block で
 *   モバイルでは非表示、PC では Below-Fold（スクロールしないと見えない）。
 *   SSR HTML から外し、初回ペイント後 → 必要な時にだけ動的読み込みする。
 *
 * 仕様:
 *   - `next/dynamic({ ssr: false })` で SSR HTML から除外
 *   - `requestIdleCallback`（未対応環境は setTimeout）で初回ペイント後に load
 *   - viewport が sm 以上のときだけマウント（モバイルでは JS も走らせない）
 *   - 装飾セクションのみ対象（SEO 上重要な本文は page.tsx に残す）
 */

const ManifestoBand = dynamic(
  () => import("@/components/manifesto-band").then((m) => ({ default: m.ManifestoBand })),
  { ssr: false },
);
const ProofShowcase = dynamic(
  () => import("@/components/proof-showcase").then((m) => ({ default: m.ProofShowcase })),
  { ssr: false },
);
const WhiteboardFlow = dynamic(
  () => import("@/components/whiteboard-flow").then((m) => ({ default: m.WhiteboardFlow })),
  { ssr: false },
);
const ForEveryoneSection = dynamic(
  () => import("@/components/for-everyone-section").then((m) => ({ default: m.ForEveryoneSection })),
  { ssr: false },
);
const SeoIntentSection = dynamic(
  () => import("@/components/seo-intent-section").then((m) => ({ default: m.SeoIntentSection })),
  { ssr: false },
);
const PullQuote = dynamic(
  () => import("@/components/pull-quote").then((m) => ({ default: m.PullQuote })),
  { ssr: false },
);
const BookShowcase = dynamic(
  () => import("@/components/book-showcase").then((m) => ({ default: m.BookShowcase })),
  { ssr: false },
);

type Variant = "narrative" | "books";

type Props = {
  /** どのブロックを差し替えるか:
   *   - narrative: ManifestoBand + ProofShowcase + WhiteboardFlow + ForEveryone + SeoIntent
   *   - books:     PullQuote + BookShowcase
   */
  variant: Variant;
};

export function HomeDeferredDesktop({ variant }: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // モバイルでは描画しない（CSS で非表示なだけだと JS は実行される）
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(min-width: 640px)").matches) return;

    // 初回ペイント完了後にハイドレート開始
    type IdleWindow = Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout?: number }) => number;
    };
    const w = window as IdleWindow;
    if (typeof w.requestIdleCallback === "function") {
      w.requestIdleCallback(() => setReady(true), { timeout: 1500 });
    } else {
      const id = window.setTimeout(() => setReady(true), 350);
      return () => window.clearTimeout(id);
    }
  }, []);

  if (!ready) return null;

  if (variant === "narrative") {
    return (
      <div className="cv-auto">
        <ManifestoBand />
        <ProofShowcase />
        <WhiteboardFlow />
        <ForEveryoneSection />
        <SeoIntentSection />
      </div>
    );
  }

  return (
    <div className="cv-auto">
      <PullQuote />
      <BookShowcase />
    </div>
  );
}
