"use client";

import dynamic from "next/dynamic";

/**
 * クライアント側で `next/dynamic({ ssr: false })` を使うためのラッパー。
 * App Router の Server Component（layout.tsx）からは `ssr: false` を
 * 直接指定できないため、この小さなクライアント境界を挟む。
 *
 * これによりレイアウト全体は SSR を維持しつつ、MobileCtaBar 本体は
 * クライアントハイドレーション後に遅延マウントされ、初期 TBT を削減する。
 */
const MobileCtaBar = dynamic(
  () => import("@/components/mobile-cta-bar").then((m) => m.MobileCtaBar),
  { ssr: false },
);

export function MobileCtaBarClient() {
  return <MobileCtaBar />;
}
