import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";

type Props = {
  className?: string;
  asLink?: boolean;
};

/**
 * BrandMark — Solvora Learning Lab の二段ロックアップ。
 * 上段 = 英大文字でブランド名（メイン）、下段 = 小さな日本語サブコピー。
 * アイコンは旧ブランドの 3 軌道アトムを保持しつつ、
 * 緑（forest）の楕円を slate(#475569) に差し替えて「森」感を抜いた。
 */
export function BrandMark({ className, asLink = true }: Props) {
  const inner = (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        aria-hidden
        className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand/12 to-ink-900/10 ring-1 ring-ink-900/[0.06]"
      >
        <svg viewBox="0 0 32 32" className="h-5 w-5">
          <ellipse
            cx="16"
            cy="16"
            rx="12"
            ry="4.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            className="text-brand"
          />
          <ellipse
            cx="16"
            cy="16"
            rx="12"
            ry="4.5"
            fill="none"
            stroke="#475569"
            strokeWidth="1.3"
            transform="rotate(60 16 16)"
          />
          <ellipse
            cx="16"
            cy="16"
            rx="12"
            ry="4.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            className="text-warm"
            transform="rotate(-60 16 16)"
          />
          <circle cx="16" cy="16" r="2" className="fill-gold" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[0.95rem] sm:text-[1rem] font-medium tracking-[0.06em] text-ink-900">
          {siteConfig.nameEn}
        </span>
        <span className="mt-1.5 text-[10px] tracking-[0.18em] text-ink-500">
          {siteConfig.nameSub}
        </span>
      </span>
    </span>
  );

  if (!asLink) return inner;
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} トップへ`}
      className="group inline-flex"
    >
      {inner}
    </Link>
  );
}
