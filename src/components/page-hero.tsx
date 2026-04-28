import type { ReactNode } from "react";
import { Container } from "@/components/container";
import { Breadcrumb, type Crumb } from "@/components/breadcrumb";
import { cn } from "@/lib/utils";

type Tone = "brand" | "warm" | "forest" | "gold" | "ink";

type Props = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  /** Single decorative kanji rendered at huge scale on the right edge. */
  watermark?: string;
  tone?: Tone;
  breadcrumb?: Crumb[];
  /** CTA buttons / chips rendered below the description. */
  children?: ReactNode;
  className?: string;
};

const toneMap: Record<
  Tone,
  {
    eyebrow: string;
    watermark: string;
    glowA: string;
    glowB: string;
    rule: string;
    dot: string;
  }
> = {
  brand: {
    eyebrow: "text-brand-deep",
    watermark: "text-brand-deep/[0.07]",
    glowA: "rgba(155,188,255,0.55)",
    glowB: "rgba(251,221,196,0.55)",
    rule: "from-brand/55 via-warm/35 to-transparent",
    dot: "bg-brand",
  },
  warm: {
    eyebrow: "text-warm-deep",
    watermark: "text-warm-deep/[0.08]",
    glowA: "rgba(251,221,196,0.7)",
    glowB: "rgba(155,188,255,0.45)",
    rule: "from-warm/55 via-brand/30 to-transparent",
    dot: "bg-warm",
  },
  forest: {
    eyebrow: "text-forest-deep",
    watermark: "text-forest-deep/[0.07]",
    glowA: "rgba(216,228,217,0.7)",
    glowB: "rgba(243,228,182,0.5)",
    rule: "from-forest/55 via-gold/35 to-transparent",
    dot: "bg-forest",
  },
  gold: {
    eyebrow: "text-gold-deep",
    watermark: "text-gold-deep/[0.08]",
    glowA: "rgba(243,228,182,0.7)",
    glowB: "rgba(251,221,196,0.55)",
    rule: "from-gold/55 via-warm/35 to-transparent",
    dot: "bg-gold",
  },
  ink: {
    eyebrow: "text-ink-700",
    watermark: "text-ink-900/[0.06]",
    glowA: "rgba(155,188,255,0.42)",
    glowB: "rgba(251,221,196,0.42)",
    rule: "from-ink-900/40 via-brand/25 to-transparent",
    dot: "bg-ink-800",
  },
};

export function PageHero({
  eyebrow,
  title,
  description,
  watermark,
  tone = "brand",
  breadcrumb,
  children,
  className,
}: Props) {
  const t = toneMap[tone];

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden border-b border-ink-900/[0.06]",
        "bg-[linear-gradient(180deg,#fefcf6_0%,#fbf5e6_55%,#f7f0de_100%)]",
        className,
      )}
    >
      {/* color wash — top-left */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[18%] -top-[24%] h-[80%] w-[70%]"
        style={{
          background: `radial-gradient(closest-side, ${t.glowA}, transparent 75%)`,
        }}
      />
      {/* color wash — top-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[14%] -top-[16%] h-[70%] w-[60%]"
        style={{
          background: `radial-gradient(closest-side, ${t.glowB}, transparent 78%)`,
        }}
      />
      {/* gold halo — center; desktop only (saves paint cost on phones) */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[55%] w-[55%] -translate-x-1/2 -translate-y-1/2 opacity-60 sm:block"
        style={{
          background:
            "radial-gradient(closest-side, rgba(243,228,182,0.4), transparent 80%)",
        }}
      />

      {/* diagonal light beams — desktop only */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-1/4 -top-1/2 hidden h-[200%] w-[55%] rotate-[24deg] opacity-40 sm:block"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
        }}
      />

      {/* huge watermark kanji */}
      {watermark && (
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute -right-[3vw] top-[6%] hidden select-none font-serif leading-[0.8] tracking-[-0.05em] sm:block",
            t.watermark,
          )}
          style={{ fontSize: "clamp(14rem, 30vw, 32rem)" }}
        >
          {watermark}
        </span>
      )}
      {watermark && (
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute select-none font-serif leading-[0.8] tracking-[-0.05em] sm:hidden",
            t.watermark,
          )}
          style={{ fontSize: "clamp(14rem, 70vw, 22rem)", right: "-12%", top: "8%" }}
        >
          {watermark}
        </span>
      )}

      {breadcrumb && breadcrumb.length > 0 && (
        <Container className="relative pt-10">
          <Breadcrumb items={breadcrumb} />
        </Container>
      )}

      <Container className="relative py-16 sm:py-28 lg:py-32">
        <div className="max-w-3xl">
          <p
            className={cn(
              "flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[10.5px] sm:text-[11px] font-medium uppercase tracking-[0.22em] sm:tracking-[0.32em]",
              "before:inline-block before:h-px before:w-5 sm:before:w-6 before:bg-current before:opacity-50",
              t.eyebrow,
            )}
          >
            {eyebrow}
          </p>
          <h1
            className="mt-6 sm:mt-7 font-serif text-display-xl text-ink-900"
            style={{ wordBreak: "keep-all", overflowWrap: "break-word", lineBreak: "strict" }}
          >
            {title}
          </h1>

          <div className="mt-7 sm:mt-8 flex items-center gap-3" aria-hidden>
            <span className="h-px w-12 bg-ink-900/20" />
            <span className={cn("h-1.5 w-1.5 rounded-full", t.dot)} />
            <span
              className={cn(
                "h-px flex-1 max-w-[14rem] bg-gradient-to-r",
                t.rule,
              )}
            />
          </div>

          {description && (
            <p className="mt-6 sm:mt-7 max-w-2xl text-[15.5px] sm:text-[16px] leading-[1.95] sm:leading-[1.85] text-ink-700">
              {description}
            </p>
          )}

          {children && <div className="mt-8 sm:mt-10">{children}</div>}
        </div>
      </Container>
    </section>
  );
}
