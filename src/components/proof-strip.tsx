import { Trophy, GraduationCap, BookOpen } from "lucide-react";
import { Container } from "@/components/container";

/**
 * Hero 直下に置く「信頼ストリップ」。
 * 共通テスト 100 / 二次 9割 / 名大合格指導 / 物理教材 6冊 を、
 * 短く・大きく・横並びで提示。読まずに目だけで通り過ぎても残る配置を狙う。
 */
type Stat = {
  icon: typeof Trophy;
  big: string;
  unit: string;
  label: string;
  tone: "warm" | "brand" | "ink" | "gold";
};

const stats: Stat[] = [
  {
    icon: Trophy,
    big: "100",
    unit: "/100",
    label: "共通テスト 物理",
    tone: "warm",
  },
  {
    icon: Trophy,
    big: "9",
    unit: "割",
    label: "二次試験 物理",
    tone: "brand",
  },
  {
    icon: GraduationCap,
    big: "名大",
    unit: "指導",
    label: "合格者の指導経験",
    tone: "ink",
  },
  {
    icon: BookOpen,
    big: "6",
    unit: "冊",
    label: "物理教材を制作",
    tone: "gold",
  },
];

const toneMap = {
  warm: { big: "text-warm-deep", chip: "bg-warm/15 text-warm-deep" },
  brand: { big: "text-brand-deep", chip: "bg-brand/15 text-brand-deep" },
  ink: { big: "text-ink-900", chip: "bg-ink-900/10 text-ink-800" },
  gold: { big: "text-gold-deep", chip: "bg-gold/15 text-gold-deep" },
} as const;

export function ProofStrip() {
  return (
    <section
      id="proof"
      aria-label="講師の実績"
      className="relative border-b border-ink-900/[0.06] bg-paper-soft/55"
    >
      <Container className="py-7 sm:py-10">
        <p className="text-[10px] sm:text-[10px] font-medium tracking-[0.18em] sm:tracking-[0.32em] uppercase text-brand-deep">
          INSTRUCTOR RECORD — 講師の実績
        </p>
        <ul className="mt-4 sm:mt-5 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4">
          {stats.map((s) => {
            const t = toneMap[s.tone];
            // 多文字（名大）はモバイルで小さく
            const isLong = /[一-鿿]{2,}/.test(s.big);
            return (
              <li
                key={s.label}
                className="lift flex flex-col rounded-2xl border border-ink-900/[0.07] bg-white/85 p-4 sm:p-5 shadow-soft"
              >
                <span
                  className={`inline-flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg ${t.chip}`}
                >
                  <s.icon
                    className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                    aria-hidden
                    strokeWidth={1.6}
                  />
                </span>
                <div className="mt-3 sm:mt-4 flex items-baseline gap-1">
                  <span
                    className={`font-serif leading-none tracking-[-0.025em] ${t.big} ${
                      isLong
                        ? "text-[1.6rem] sm:text-[2.4rem]"
                        : "text-[2.2rem] sm:text-[3rem]"
                    }`}
                  >
                    {s.big}
                  </span>
                  <span
                    className={`font-serif text-[0.85rem] sm:text-[1.1rem] ${t.big} opacity-80`}
                  >
                    {s.unit}
                  </span>
                </div>
                <p className="mt-2 text-[10.5px] sm:text-[11px] tracking-[0.14em] sm:tracking-[0.2em] uppercase text-ink-500 leading-tight">
                  {s.label}
                </p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
