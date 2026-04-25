import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  tone?: "brand" | "warm" | "forest" | "gold";
};

const toneStyles: Record<
  NonNullable<Props["tone"]>,
  { ring: string; bg: string; text: string }
> = {
  brand: { ring: "ring-brand/20", bg: "bg-brand-bg", text: "text-brand-deep" },
  warm: { ring: "ring-warm/20", bg: "bg-warm-bg", text: "text-warm-deep" },
  forest: {
    ring: "ring-forest/20",
    bg: "bg-forest-bg",
    text: "text-forest-deep",
  },
  gold: {
    ring: "ring-gold/30",
    bg: "bg-gold-soft",
    text: "text-gold-deep",
  },
};

export function FeatureCard({
  icon: Icon,
  title,
  description,
  className,
  tone = "brand",
}: Props) {
  const t = toneStyles[tone];
  return (
    <article
      className={cn(
        "group relative h-full overflow-hidden rounded-3xl border border-ink-900/[0.07] bg-white/80 p-9 shadow-soft backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-ink-900/[0.12] hover:shadow-card",
        className,
      )}
    >
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-2xl ring-1 ${t.ring} ${t.bg} ${t.text}`}
      >
        <Icon className="h-[18px] w-[18px]" aria-hidden strokeWidth={1.6} />
      </div>
      <h3 className="mt-7 font-serif text-[1.2rem] leading-snug tracking-[-0.008em] text-ink-900">
        {title}
      </h3>
      <p className="mt-3.5 text-[14px] leading-[1.75] text-ink-600">
        {description}
      </p>
    </article>
  );
}
