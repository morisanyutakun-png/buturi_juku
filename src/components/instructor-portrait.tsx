import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { instructor } from "@/data/instructor";

type Props = {
  className?: string;
  variant?: "default" | "compact";
};

/**
 * Photoless instructor avatar.
 * Uses the 「森」 monogram with an orbital physics motif.
 * Feels more personal than a stock silhouette, no real photo required.
 * When a real photo is ready, replace this component's inner visual only.
 */
export function InstructorPortrait({ className, variant = "default" }: Props) {
  const isCompact = variant === "compact";

  return (
    <div
      className={cn(
        "relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-2xl border border-paper/10 bg-gradient-to-br from-navy-800 via-ink-900 to-ink-950",
        className,
      )}
    >
      {/* background grid */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.12]"
      >
        <defs>
          <pattern id="portrait-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.6"
              className="text-paper/50"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#portrait-grid)" />
      </svg>

      {/* orbital motif */}
      <svg
        aria-hidden
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <radialGradient id="portrait-nucleus" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f2d99a" stopOpacity="0.65" />
            <stop offset="70%" stopColor="#e8c57a" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#b88a3e" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="portrait-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6ea8ff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#6ea8ff" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <g transform="translate(200 250)">
          <ellipse
            cx="0"
            cy="0"
            rx="220"
            ry="80"
            fill="none"
            stroke="url(#portrait-stroke)"
            strokeWidth="0.8"
            transform="rotate(20)"
          />
          <ellipse
            cx="0"
            cy="0"
            rx="180"
            ry="90"
            fill="none"
            stroke="url(#portrait-stroke)"
            strokeWidth="0.8"
            transform="rotate(-40)"
          />
          <ellipse
            cx="0"
            cy="0"
            rx="150"
            ry="70"
            fill="none"
            stroke="url(#portrait-stroke)"
            strokeWidth="0.8"
            transform="rotate(80)"
          />
          <circle cx="0" cy="0" r="90" fill="url(#portrait-nucleus)" />
        </g>
      </svg>

      {/* top label */}
      <div className="relative flex items-center justify-between p-6">
        <p className="font-mono text-[10px] tracking-[0.3em] text-gold">
          CHIEF INSTRUCTOR
        </p>
        <span className="font-mono text-[10px] tracking-[0.22em] text-paper/40">
          / 01
        </span>
      </div>

      {/* centerpiece monogram */}
      <div className="relative flex flex-1 items-center justify-center">
        <div className="relative">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 translate-x-1 translate-y-1 font-serif text-[10rem] leading-none text-accent/10 blur-[2px] sm:text-[12rem]"
          >
            森
          </span>
          <span className="relative font-serif text-[9rem] leading-none text-paper sm:text-[11rem]">
            森
          </span>
        </div>
      </div>

      {/* footer info */}
      <div className="relative border-t border-paper/10 bg-ink-950/50 p-6 backdrop-blur">
        <p className="font-serif text-xl text-paper sm:text-2xl">
          {instructor.name}
        </p>
        <p className="mt-1 font-mono text-[10px] tracking-[0.3em] text-paper/50">
          {instructor.nameEn}
        </p>
        {!isCompact && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[10px] text-accent">
              <GraduationCap className="h-3 w-3" aria-hidden />
              {instructor.affiliationShort}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-1 text-[10px] text-gold">
              電磁気 書籍
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
