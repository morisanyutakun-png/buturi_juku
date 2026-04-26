import { BookOpen, GraduationCap, Trophy } from "lucide-react";
import { Container } from "@/components/container";

const proofs = [
  {
    icon: Trophy,
    big: "100",
    unit: "/100",
    label: "共通テスト 物理",
    sub: "講師の受験実績 — 満点",
    tone: "warm",
  },
  {
    icon: Trophy,
    big: "9",
    unit: "割",
    label: "二次試験 物理",
    sub: "難関大レベルの得点率",
    tone: "brand",
  },
  {
    icon: GraduationCap,
    big: "名大",
    unit: "輩出",
    label: "塾講師としての指導実績",
    sub: "中堅大〜難関大まで対応",
    tone: "forest",
  },
  {
    icon: BookOpen,
    big: "電磁気",
    unit: "刊行",
    label: "大学受験物理の書籍執筆",
    sub: "ガウスの法則から組み直す",
    tone: "gold",
  },
] as const;

const toneMap = {
  warm: {
    bg: "bg-warm-bg",
    border: "border-warm/30",
    big: "text-warm-deep",
    chip: "bg-warm/15 text-warm-deep",
  },
  brand: {
    bg: "bg-brand-bg",
    border: "border-brand/30",
    big: "text-brand-deep",
    chip: "bg-brand/15 text-brand-deep",
  },
  forest: {
    bg: "bg-forest-bg",
    border: "border-forest/30",
    big: "text-forest-deep",
    chip: "bg-forest/15 text-forest-deep",
  },
  gold: {
    bg: "bg-gold-soft/60",
    border: "border-gold/40",
    big: "text-gold-deep",
    chip: "bg-gold/15 text-gold-deep",
  },
} as const;

export function ProofShowcase() {
  return (
    <section
      aria-labelledby="proof-heading"
      className="relative overflow-hidden border-b border-ink-900/[0.06] bg-paper-soft/60"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_15%_20%,rgba(59,124,217,0.12),transparent_55%),radial-gradient(circle_at_85%_80%,rgba(226,128,64,0.12),transparent_55%)]"
      />
      <Container className="relative py-24 sm:py-32">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 text-[11px] sm:text-[10px] font-medium uppercase tracking-[0.32em] text-brand-deep before:inline-block before:h-px before:w-6 before:bg-current before:opacity-50">
            INSTRUCTOR RECORD — 講師の受験・執筆・指導実績
          </p>
          <h2
            id="proof-heading"
            className="mt-6 font-serif text-display-md tracking-[-0.012em] text-ink-900"
          >
            『教える側』の<span className="text-warm-deep">数字</span>で、
            <br className="hidden sm:block" />
            高校物理専門塾を選ぶ根拠を示します。
          </h2>
          <p className="mt-5 max-w-2xl text-[16px] sm:text-[15px] leading-[2] sm:leading-[1.85] text-ink-700">
            以下は、すべて<strong className="font-medium text-ink-900">主宰講師・森祐太自身の実績</strong>です。受験生本人の点数の伸びは個人差があるため、ここでは『教える側がどこまで物理を理解しているか』を数字で開示します。
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {proofs.map((p) => {
            const t = toneMap[p.tone];
            return (
              <article
                key={p.label}
                className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border ${t.border} ${t.bg} p-7 sm:p-8 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card`}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/30 blur-2xl"
                />
                <div
                  className={`relative inline-flex h-11 w-11 items-center justify-center rounded-2xl ${t.chip}`}
                >
                  <p.icon className="h-5 w-5" aria-hidden strokeWidth={1.6} />
                </div>

                <div className="relative mt-9 flex items-baseline gap-1.5">
                  <span
                    className={`font-serif text-[5.4rem] leading-none tracking-[-0.04em] sm:text-[6rem] ${t.big}`}
                  >
                    {p.big}
                  </span>
                  <span className={`font-serif text-[1.4rem] sm:text-[1.55rem] ${t.big} opacity-80`}>
                    {p.unit}
                  </span>
                </div>

                <div className="relative mt-7">
                  <p className="text-[11px] sm:text-[10px] font-medium tracking-[0.24em] sm:tracking-[0.28em] uppercase text-ink-500">
                    {p.label}
                  </p>
                  <p className="mt-2.5 text-[14.5px] sm:text-[13.5px] leading-[1.7] text-ink-700">
                    {p.sub}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
