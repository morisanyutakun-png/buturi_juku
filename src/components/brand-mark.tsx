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
        className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-accent/40 bg-navy-900/60"
      >
        <span className="absolute inset-1 rounded-full border border-accent/20" />
        <span className="absolute h-1 w-1 rounded-full bg-accent shadow-[0_0_12px_rgba(110,168,255,0.9)]" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[10px] tracking-[0.32em] uppercase text-accent/80">
          Physics Academy
        </span>
        <span className="mt-1 font-serif text-base text-paper">
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
