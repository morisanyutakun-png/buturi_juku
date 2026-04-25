import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";

type Props = {
  className?: string;
  asLink?: boolean;
};

export function BrandMark({ className, asLink = true }: Props) {
  const inner = (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        aria-hidden
        className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand/12 to-forest/15 ring-1 ring-ink-900/[0.06]"
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
            stroke="currentColor"
            strokeWidth="1.3"
            className="text-forest"
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
        <span className="text-[8.5px] font-medium tracking-[0.3em] uppercase text-brand">
          {siteConfig.nameEn}
        </span>
        <span className="mt-1.5 font-serif text-[1.05rem] tracking-[-0.005em] text-ink-900">
          {siteConfig.name}
        </span>
      </span>
    </span>
  );

  if (!asLink) return inner;
  return (
    <Link href="/" aria-label={siteConfig.name} className="group inline-flex">
      {inner}
    </Link>
  );
}
