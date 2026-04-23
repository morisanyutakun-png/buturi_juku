import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  tone?: "brand" | "warm" | "forest" | "gold";
};

const toneStyles: Record<NonNullable<Props["tone"]>, { ring: string; bg: string; text: string }> = {
  brand: { ring: "border-brand/30", bg: "bg-brand-bg", text: "text-brand-deep" },
  warm: { ring: "border-warm/30", bg: "bg-warm-bg", text: "text-warm-deep" },
  forest: { ring: "border-forest/30", bg: "bg-forest-bg", text: "text-forest-deep" },
  gold: { ring: "border-gold/30", bg: "bg-gold-soft", text: "text-gold-deep" },
};

export function FeatureCard({ icon: Icon, title, description, className, tone = "brand" }: Props) {
  const t = toneStyles[tone];
  return (
    <article
      className={cn(
        "group relative h-full overflow-hidden rounded-2xl border border-ink-900/10 bg-white p-8 shadow-soft transition duration-300 hover:-translate-y-0.5 hover:shadow-card",
        className,
      )}
    >
      <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${t.ring} ${t.bg} ${t.text}`}>
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      <h3 className="mt-6 font-serif text-xl text-ink-900">{title}</h3>
      <p className="mt-4 text-sm leading-relaxed text-ink-700">{description}</p>
    </article>
  );
}
