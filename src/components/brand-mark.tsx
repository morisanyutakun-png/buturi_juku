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
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand/15 to-forest/20 ring-1 ring-brand/30"
      >
        {/* small atomic leaf mark */}
        <svg viewBox="0 0 32 32" className="h-6 w-6">
          <ellipse cx="16" cy="16" rx="12" ry="4.5" fill="none" stroke="currentColor" strokeWidth="1.4" className="text-brand" />
          <ellipse cx="16" cy="16" rx="12" ry="4.5" fill="none" stroke="currentColor" strokeWidth="1.4" className="text-forest" transform="rotate(60 16 16)" />
          <ellipse cx="16" cy="16" rx="12" ry="4.5" fill="none" stroke="currentColor" strokeWidth="1.4" className="text-warm" transform="rotate(-60 16 16)" />
          <circle cx="16" cy="16" r="2.2" className="fill-gold" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[9px] font-semibold tracking-[0.3em] uppercase text-brand">
          {siteConfig.nameEn}
        </span>
        <span className="mt-1.5 font-serif text-lg text-ink-900">
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
