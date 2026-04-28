import { Award, BookOpen, GraduationCap, Trophy, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { instructor } from "@/data/instructor";

type Props = {
  className?: string;
};

export function InstructorPortrait({ className }: Props) {
  const credentials = [
    {
      icon: GraduationCap,
      label: "所属",
      value: "名古屋大学 工学部",
      sub: "電気電子情報工学科",
      tone: "brand" as const,
    },
    {
      icon: Trophy,
      label: "共通テスト 物理",
      value: "満点",
      sub: "100 / 100 点",
      tone: "warm" as const,
    },
    {
      icon: Trophy,
      label: "二次試験 物理",
      value: "9 割",
      sub: "難関大レベル",
      tone: "brand" as const,
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
      tone: "forest" as const,
    },
  ];

  const toneClass = (tone: "brand" | "warm" | "gold" | "forest") => {
    switch (tone) {
      case "brand":
        return {
          wrap: "border-brand/25 bg-brand-bg",
          icon: "border-brand/30 bg-white text-brand",
          value: "text-brand-deep",
        };
      case "warm":
        return {
          wrap: "border-warm/30 bg-warm-bg",
          icon: "border-warm/30 bg-white text-warm-deep",
          value: "text-warm-deep",
        };
      case "gold":
        return {
          wrap: "border-gold/30 bg-gold-soft",
          icon: "border-gold/30 bg-white text-gold-deep",
          value: "text-gold-deep",
        };
      case "forest":
        return {
          wrap: "border-forest/30 bg-forest-bg",
          icon: "border-forest/30 bg-white text-forest-deep",
          value: "text-forest-deep",
        };
    }
  };

  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden rounded-2xl border border-ink-900/10 bg-white shadow-card",
        className,
      )}
    >
      {/* subtle orbital motif */}
      <svg
        aria-hidden
        viewBox="0 0 400 600"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full opacity-30"
      >
        <defs>
          <radialGradient id="portrait-nucleus" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#caa34b" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#caa34b" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g transform="translate(200 280)">
          <ellipse
            rx="240"
            ry="90"
            fill="none"
            stroke="#3b7cd9"
            strokeOpacity="0.2"
            strokeWidth="0.8"
            transform="rotate(30)"
          />
          <ellipse
            rx="200"
            ry="100"
            fill="none"
            stroke="#e28040"
            strokeOpacity="0.18"
            strokeWidth="0.8"
            transform="rotate(-40)"
          />
          <circle r="110" fill="url(#portrait-nucleus)" />
        </g>
      </svg>

      {/* Header */}
      <div className="relative flex items-center justify-between border-b border-ink-900/10 bg-paper-soft/50 px-6 py-4">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-warm" />
          <span className="font-mono text-[10px] tracking-[0.3em] text-warm-deep">
            CHIEF INSTRUCTOR
          </span>
        </span>
        <span className="font-mono text-[10px] tracking-[0.22em] text-ink-400">
          PROFILE / 01
        </span>
      </div>

      {/* NAME block */}
      <div className="relative px-5 sm:px-6 pt-6 sm:pt-7">
        <p className="text-[10px] tracking-[0.24em] sm:tracking-[0.3em] uppercase text-ink-500">
          Instructor
        </p>
        <h3 className="mt-2 font-serif text-[2rem] sm:text-4xl leading-none text-ink-900">
          {instructor.name}
        </h3>
        <p className="mt-2 break-all font-mono text-[10.5px] sm:text-[11px] tracking-[0.22em] sm:tracking-[0.32em] text-ink-500">
          {instructor.nameEn.toUpperCase()}
        </p>
        <p className="mt-4 text-[12.5px] sm:text-xs leading-[1.7] sm:leading-relaxed text-ink-700">
          電磁気を専門領域として扱いながら、塾講師として大学受験物理の指導に携わる。
        </p>
      </div>

      {/* divider */}
      <div className="relative mx-6 mt-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-ink-900/10" />
        <Award className="h-3 w-3 text-warm-deep" aria-hidden />
        <span className="font-mono text-[10px] tracking-[0.3em] text-warm-deep">
          CREDENTIALS
        </span>
        <span className="h-px flex-1 bg-ink-900/10" />
      </div>

      {/* Credentials list */}
      <ul className="relative flex-1 space-y-2 px-5 sm:px-6 py-5">
        {credentials.map((c) => {
          const t = toneClass(c.tone);
          return (
            <li
              key={c.label}
              className={cn(
                "flex items-center gap-3 rounded-lg border px-3 py-2.5",
                t.wrap,
              )}
            >
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border",
                  t.icon,
                )}
              >
                <c.icon className="h-3.5 w-3.5" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[9px] tracking-[0.18em] sm:tracking-[0.22em] uppercase text-ink-500">
                  {c.label}
                </p>
                <p className={cn("mt-0.5 font-serif text-[13px] sm:text-sm leading-tight", t.value)}>
                  {c.value}
                </p>
              </div>
              <p className="hidden shrink-0 text-[10px] text-ink-500 sm:block">{c.sub}</p>
            </li>
          );
        })}
      </ul>

      {/* Footer */}
      <div className="relative border-t border-ink-900/10 bg-paper-soft/50 px-6 py-4">
        <p className="text-center font-serif text-xs leading-relaxed text-ink-700">
          <span className="text-warm-deep">“</span>
          物理が苦手な人から、難関大を目指す人まで。
          <span className="text-warm-deep">”</span>
        </p>
      </div>
    </div>
  );
}
