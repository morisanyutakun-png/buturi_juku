import { ClipboardList, Lightbulb, FileText, Check } from "lucide-react";
import { Container } from "@/components/container";

/**
 * 「AI 復習プリントは何をしてくれるのか」を一目で分かる 4 ステップ図解。
 *
 * モバイル：縦のステップフロー。
 * デスクトップ：横並び 4 カード + 矢印で接続。
 *
 * AI/REM の名前は意図的に小さく。読み手が知りたいのは「何が起きるか」であって、
 * 内部実装ではない。各ステップは動詞主体・短文。
 */
const steps = [
  {
    n: "01",
    icon: ClipboardList,
    title: "解けなかった問題",
    body: "つまずいた 1 問を、講師がその場で記録。",
    tone: "warm",
  },
  {
    n: "02",
    icon: Lightbulb,
    title: "つまずきの分析",
    body: "立式・計算・概念、どこで詰まったかを言語化。",
    tone: "brand",
  },
  {
    n: "03",
    icon: FileText,
    title: "類題プリントを作成",
    body: "AI が類題＋解答＋解説を生成、講師確認のうえお渡し。",
    tone: "gold",
  },
  {
    n: "04",
    icon: Check,
    title: "次回授業で再確認",
    body: "同じつまずきが解消されたかを冒頭で確認。",
    tone: "brand",
  },
] as const;

const toneMap = {
  warm: { ring: "ring-warm/30", bg: "bg-warm-bg", text: "text-warm-deep" },
  brand: { ring: "ring-brand/30", bg: "bg-brand-bg", text: "text-brand-deep" },
  gold: { ring: "ring-gold/40", bg: "bg-gold-soft/60", text: "text-gold-deep" },
} as const;

export function AiPrintFigure() {
  return (
    <section
      aria-labelledby="ai-figure-heading"
      className="relative border-b border-ink-900/[0.06] bg-paper-soft/55"
    >
      <Container className="py-12 sm:py-24">
        <p className="text-[10px] sm:text-[10px] font-medium tracking-[0.18em] sm:tracking-[0.32em] uppercase text-brand-deep">
          AI REVIEW PRINT
        </p>
        <h2
          id="ai-figure-heading"
          className="mt-3 sm:mt-5 max-w-3xl font-serif text-[1.5rem] sm:text-[2rem] leading-[1.4] sm:leading-[1.3] tracking-[-0.012em] text-ink-900"
        >
          AI復習プリントは、<br className="sm:hidden" />こう動きます。
        </h2>
        <p className="mt-3 sm:mt-5 max-w-2xl text-[13.5px] sm:text-[15px] leading-[1.85] text-ink-700">
          解けなかった 1 問が、次回までに「次は解ける状態」になる仕組み。
        </p>

        <ol className="mt-7 sm:mt-12 grid gap-3 sm:gap-4 md:grid-cols-4">
          {steps.map((s, i) => {
            const t = toneMap[s.tone];
            return (
              <li key={s.n} className="relative">
                <div className="relative flex h-full flex-col rounded-2xl border border-ink-900/[0.08] bg-white p-4 sm:p-5 shadow-soft">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <span
                      className={`inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl ring-1 ${t.ring} ${t.bg} ${t.text}`}
                    >
                      <s.icon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" aria-hidden strokeWidth={1.6} />
                    </span>
                    <span
                      className={`font-mono text-[10px] sm:text-[10.5px] tracking-[0.18em] sm:tracking-[0.22em] ${t.text}`}
                    >
                      STEP {s.n}
                    </span>
                  </div>
                  <h3 className="mt-3 sm:mt-4 font-serif text-[1.05rem] sm:text-[1.1rem] leading-[1.4] sm:leading-snug tracking-[-0.008em] text-ink-900">
                    {s.title}
                  </h3>
                  <p className="mt-2 sm:mt-2.5 text-[12.5px] sm:text-[13px] leading-[1.75] text-ink-600">
                    {s.body}
                  </p>
                </div>

                {/* connector arrow — between cards */}
                {i < steps.length - 1 && (
                  <span
                    aria-hidden
                    className="my-1 mx-auto block h-3 w-px bg-ink-900/15 md:absolute md:left-full md:top-1/2 md:my-0 md:h-px md:w-3 md:-translate-y-1/2"
                  />
                )}
              </li>
            );
          })}
        </ol>

        <p className="mt-6 sm:mt-8 max-w-2xl text-[12px] sm:text-[12.5px] leading-[1.75] text-ink-500">
          ※ 授業は講師（森祐太）が担当。AI 生成内容は講師が最終確認のうえお渡しします。
        </p>
      </Container>
    </section>
  );
}
