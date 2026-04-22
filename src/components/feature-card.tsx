import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
};

export function FeatureCard({ icon: Icon, title, description, className }: Props) {
  return (
    <article
      className={cn(
        "group relative h-full overflow-hidden rounded-2xl border border-paper/10 bg-ink-900/60 p-8 transition duration-300 hover:border-accent/40 hover:bg-ink-800/60",
        className,
      )}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/30 bg-accent/5 text-accent">
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      <h3 className="mt-6 font-serif text-xl text-paper">{title}</h3>
      <p className="mt-4 text-sm leading-relaxed text-paper/70">{description}</p>
      <div className="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 transition group-hover:opacity-100" />
    </article>
  );
}
