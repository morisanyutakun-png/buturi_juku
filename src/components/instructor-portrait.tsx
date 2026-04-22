import { Award, BookOpen, GraduationCap, Trophy, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { instructor } from "@/data/instructor";

type Props = {
  className?: string;
};

/**
 * Photoless instructor "credentials card".
 * Shows concrete, verifiable credentials instead of a face photo.
 * This builds trust through evidence rather than visual identity alone.
 */
export function InstructorPortrait({ className }: Props) {
  const credentials = [
    {
      icon: GraduationCap,
      label: "所属",
      value: "名古屋大学 工学部",
      sub: "電気電子情報工学科",
      tone: "accent" as const,
    },
    {
      icon: Trophy,
      label: "共通テスト 物理",
      value: "満点",
      sub: "100 / 100 点",
      tone: "gold" as const,
    },
    {
      icon: Trophy,
      label: "二次試験 物理",
      value: "9 割",
      sub: "難関大レベル",
      tone: "accent" as const,
    },
    {
      icon: BookOpen,
      label: "書籍執筆",
      value: "電磁気",
      sub: "大学受験物理",
      tone: "gold" as const,
    },
    {
      icon: Users,
      label: "指導実績",
      value: "名大合格生を輩出",
      sub: "塾講師として指導",
      tone: "gold" as const,
    },
  ];

  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden rounded-2xl border border-paper/10 bg-gradient-to-br from-navy-800 via-ink-900 to-ink-950",
        className,
      )}
    >
      {/* background grid */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.1]"
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

      {/* subtle orbital motif */}
      <svg
        aria-hidden
        viewBox="0 0 400 600"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full opacity-40"
      >
        <defs>
          <radialGradient id="portrait-nucleus" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f2d99a" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#b88a3e" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g transform="translate(200 280)">
          <ellipse
            rx="240"
            ry="90"
            fill="none"
            stroke="#6ea8ff"
            strokeOpacity="0.22"
            strokeWidth="0.8"
            transform="rotate(30)"
          />
          <ellipse
            rx="200"
            ry="100"
            fill="none"
            stroke="#6ea8ff"
            strokeOpacity="0.18"
            strokeWidth="0.8"
            transform="rotate(-40)"
          />
          <circle r="110" fill="url(#portrait-nucleus)" />
        </g>
      </svg>

      {/* TOP: header */}
      <div className="relative flex items-center justify-between border-b border-paper/5 px-6 py-4">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          <span className="font-mono text-[10px] tracking-[0.3em] text-gold">
            CHIEF INSTRUCTOR
          </span>
        </span>
        <span className="font-mono text-[10px] tracking-[0.22em] text-paper/40">
          PROFILE / 01
        </span>
      </div>

      {/* NAME block */}
      <div className="relative px-6 pt-7">
        <p className="text-[10px] tracking-[0.3em] uppercase text-paper/40">
          Instructor
        </p>
        <h3 className="mt-2 font-serif text-4xl leading-none text-paper">
          {instructor.name}
        </h3>
        <p className="mt-2 font-mono text-[11px] tracking-[0.32em] text-paper/50">
          {instructor.nameEn.toUpperCase()}
        </p>
        <p className="mt-4 text-xs leading-relaxed text-paper/60">
          電磁気を専門領域として扱いながら、塾講師として大学受験物理の指導に携わる。
        </p>
      </div>

      {/* divider */}
      <div className="relative mx-6 mt-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-paper/10" />
        <Award className="h-3 w-3 text-gold" aria-hidden />
        <span className="font-mono text-[10px] tracking-[0.3em] text-gold">
          CREDENTIALS
        </span>
        <span className="h-px flex-1 bg-paper/10" />
      </div>

      {/* Credentials list */}
      <ul className="relative flex-1 space-y-2 px-6 py-5">
        {credentials.map((c) => (
          <li
            key={c.label}
            className={cn(
              "flex items-center gap-3 rounded-lg border px-3 py-2.5",
              c.tone === "gold"
                ? "border-gold/20 bg-gold/5"
                : "border-accent/20 bg-accent/5",
            )}
          >
            <span
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border",
                c.tone === "gold"
                  ? "border-gold/30 bg-gold/10 text-gold"
                  : "border-accent/30 bg-accent/10 text-accent",
              )}
            >
              <c.icon className="h-3.5 w-3.5" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[9px] tracking-[0.22em] uppercase text-paper/45">
                {c.label}
              </p>
              <p
                className={cn(
                  "mt-0.5 font-serif text-sm leading-tight",
                  c.tone === "gold" ? "text-gold-soft" : "text-paper",
                )}
              >
                {c.value}
              </p>
            </div>
            <p className="shrink-0 text-[10px] text-paper/45">{c.sub}</p>
          </li>
        ))}
      </ul>

      {/* Footer badge */}
      <div className="relative border-t border-paper/5 bg-ink-950/40 px-6 py-4 backdrop-blur">
        <p className="text-center font-serif text-xs leading-relaxed text-paper/60">
          <span className="text-gold">“</span>
          物理が苦手な人から、難関大を目指す人まで。
          <span className="text-gold">”</span>
        </p>
      </div>
    </div>
  );
}
