import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";

type Props = {
  className?: string;
  asLink?: boolean;
};

/**
 * BrandMark — Solvora Learning Lab の二段ロックアップ。
 * 上段 = 英大文字でブランド名（メイン）、下段 = 小さな日本語サブコピー。
 * アイコンは Solvora 公式マーク（書籍 + S + 軌道アトム + sparkle）の PNG。
 */
export function BrandMark({ className, asLink = true }: Props) {
  const inner = (
    <span className={cn("inline-flex items-center gap-2.5 sm:gap-3", className)}>
      <span
        aria-hidden
        className="relative inline-flex h-9 w-9 items-center justify-center"
      >
        <Image
          src="/brand/solvora-icon.png"
          alt=""
          width={36}
          height={36}
          priority
          sizes="36px"
          className="h-9 w-9 object-contain"
        />
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
