import { Container } from "@/components/container";

type Step = {
  step: string;
  label: string;
  subtitle: string;
  body: string;
  accent: string;
  ringAccent: string;
  tagAccent: string;
};

const steps: Step[] = [
  {
    step: "01",
    label: "確認",
    subtitle: "解けなかった問題を確認",
    body: "生徒がどこで止まったのかを確認します。式を立てる前なのか、公式選択なのか、計算なのか。原因の場所を、まず特定します。",
    accent: "border-brand/30 bg-brand-bg",
    ringAccent: "ring-brand/35 bg-brand-bg text-brand-deep",
    tagAccent: "text-brand-deep",
  },
  {
    step: "02",
    label: "言語化",
    subtitle: "つまずきの原因を言語化",
    body: "「何がわからないのか」を講師が一緒に整理します。生徒自身の言葉で言語化できると、次に何を学べばよいかが見えてきます。",
    accent: "border-warm/35 bg-warm-bg",
    ringAccent: "ring-warm/40 bg-warm-bg text-warm-deep",
    tagAccent: "text-warm-deep",
  },
  {
    step: "03",
    label: "構造",
    subtitle: "授業で構造から理解",
    body: "公式暗記ではなく、現象・図・力の関係・保存則などから立式できる状態を目指します。授業の中身は、言語化 → 立式 → 演習の順で組み立てます。",
    accent: "border-gold/35 bg-gold-soft/45",
    ringAccent: "ring-gold/45 bg-gold-soft/60 text-gold-deep",
    tagAccent: "text-gold-deep",
  },
  {
    step: "04",
    label: "復習プリント",
    subtitle: "REMで復習プリント作成",
    body: "解けなかった1問をもとに、類題・解答・解説付きの復習PDFを作成します。AI（REM）が出力した内容は講師が確認したうえでお渡しします。",
    accent: "border-brand/30 bg-brand-bg",
    ringAccent: "ring-brand/35 bg-brand-bg text-brand-deep",
    tagAccent: "text-brand-deep",
  },
  {
    step: "05",
    label: "再確認",
    subtitle: "次回授業で再確認",
    body: "同じつまずきが解消されたかを次回授業の冒頭で再確認します。必要があればさらに類題を追加し、定着するまで伴走します。",
    accent: "border-warm/35 bg-warm-bg",
    ringAccent: "ring-warm/40 bg-warm-bg text-warm-deep",
    tagAccent: "text-warm-deep",
  },
];

/**
 * Solvora式 つまずき修復メソッドの円環フロー。
 * 旧 WhiteboardFlow（言語化→立式→演習 の3ステップ）を 5 ステップの
 * 環状ダイアグラムに置換。授業の中身（言語化→立式→演習）は STEP 3
 * の説明文の中に縮約して残してある。
 */
export function WhiteboardFlow() {
  return (
    <section
      aria-labelledby="method-heading"
      className="relative overflow-hidden border-y border-ink-900/[0.06] bg-paper"
    >
      {/* notebook ruling — same atmospheric backdrop as the legacy whiteboard */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0, transparent 39px, #142341 39px, #142341 40px)",
        }}
      />

      <Container className="relative py-20 sm:py-28 lg:py-32">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10.5px] sm:text-[10px] font-medium uppercase tracking-[0.22em] sm:tracking-[0.32em] text-brand-deep before:inline-block before:h-px before:w-5 sm:before:w-6 before:bg-current before:opacity-50">
          OUR METHOD — Solvora式 つまずき修復メソッド
        </p>
        <h2
          id="method-heading"
          className="mt-5 sm:mt-6 max-w-3xl font-serif text-display-md tracking-[-0.012em] text-ink-900"
        >
          解けなかった問題を、
          <br className="hidden sm:block" />
          5つのステップで修復します。
        </h2>
        <p className="mt-5 max-w-2xl text-[15.5px] sm:text-[15px] leading-[1.95] sm:leading-[1.85] text-ink-700">
          高校物理・理系個別指導として、ひとつのつまずきに対して同じ流れを繰り返します。
          講師がまず原因を特定し、構造から授業を組み立て、AI（REM）で復習プリントを作成。
          次回授業で再確認するまでが、ひとつのサイクルです。
        </p>

        {/* DESKTOP — circular ring flow */}
        <div className="relative mx-auto mt-16 hidden lg:block" style={{ width: 760, height: 760 }}>
          {/* arrows */}
          <svg
            aria-hidden
            viewBox="0 0 760 760"
            className="absolute inset-0 h-full w-full"
            style={{ pointerEvents: "none" }}
          >
            <defs>
              <marker
                id="method-arrowhead"
                viewBox="0 0 12 12"
                refX="9"
                refY="6"
                markerWidth="9"
                markerHeight="9"
                orient="auto"
              >
                <path d="M0,0 L0,12 L10,6 z" fill="#1f5aa6" opacity="0.55" />
              </marker>
            </defs>
            {/* faint orbital ring */}
            <circle
              cx="380"
              cy="380"
              r="270"
              fill="none"
              stroke="#1f5aa6"
              strokeOpacity="0.10"
              strokeDasharray="3 6"
              strokeWidth="1"
            />
            {/* arrows: arc segments between consecutive nodes (clockwise).
                Each arc spans 72° on the ring of radius ~270 around (380,380).
                We trim each arc by ~12° on each end so it doesn't visually
                penetrate the node circles. */}
            {steps.map((_, i) => {
              const startAngle = -90 + i * 72 + 14;
              const endAngle = -90 + (i + 1) * 72 - 14;
              const r = 270;
              const x1 = 380 + r * Math.cos((startAngle * Math.PI) / 180);
              const y1 = 380 + r * Math.sin((startAngle * Math.PI) / 180);
              const x2 = 380 + r * Math.cos((endAngle * Math.PI) / 180);
              const y2 = 380 + r * Math.sin((endAngle * Math.PI) / 180);
              return (
                <path
                  key={i}
                  d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`}
                  fill="none"
                  stroke="#1f5aa6"
                  strokeOpacity="0.45"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  markerEnd="url(#method-arrowhead)"
                />
              );
            })}
          </svg>

          {/* center hub */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-[260px] w-[260px] flex-col items-center justify-center rounded-full border border-ink-900/10 bg-white text-center shadow-elevate"
          >
            <p className="text-[10.5px] font-medium tracking-[0.32em] uppercase text-brand-deep">
              Solvora Method
            </p>
            <p className="mt-3 px-6 font-serif text-[1.05rem] leading-[1.55] tracking-[-0.008em] text-ink-900">
              つまずき修復<br />メソッド
            </p>
            <span aria-hidden className="mt-3 inline-block h-px w-10 bg-ink-900/20" />
            <p className="mt-3 px-6 text-[11px] leading-[1.6] tracking-[0.04em] text-ink-600">
              講師の確認 × AI復習プリント
            </p>
          </div>

          {/* 5 satellite cards positioned around the hub */}
          {steps.map((s, i) => {
            const angle = -90 + i * 72;
            const r = 270;
            const cx = 380 + r * Math.cos((angle * Math.PI) / 180);
            const cy = 380 + r * Math.sin((angle * Math.PI) / 180);
            return (
              <div
                key={s.step}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: cx, top: cy, width: 220 }}
              >
                <div
                  className={`relative rounded-2xl border ${s.accent} bg-white/95 p-4 shadow-soft`}
                >
                  <span
                    className={`absolute -top-3 left-4 inline-flex h-7 w-7 items-center justify-center rounded-full ring-1 ${s.ringAccent} font-mono text-[11px] font-medium`}
                  >
                    {s.step}
                  </span>
                  <p className={`mt-2 font-serif text-[1.05rem] tracking-[-0.008em] ${s.tagAccent}`}>
                    {s.label}
                  </p>
                  <p className="mt-1 text-[11px] tracking-[0.06em] text-ink-500">
                    {s.subtitle}
                  </p>
                  <p className="mt-3 text-[12.5px] leading-[1.7] text-ink-700">
                    {s.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* MOBILE / TABLET — vertical stack with downward arrows between cards */}
        <ol className="mt-12 grid gap-3 lg:hidden">
          {steps.map((s, i, arr) => (
            <li key={s.step} className="relative">
              <div
                className={`relative overflow-hidden rounded-2xl border bg-white p-5 ${s.accent}`}
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[10.5px] tracking-[0.24em] text-ink-500">
                    STEP {s.step}
                  </span>
                  <span className={`font-serif text-[1.35rem] tracking-[-0.012em] ${s.tagAccent}`}>
                    {s.label}
                  </span>
                </div>
                <p className="mt-2 text-[12.5px] tracking-[0.06em] text-ink-500">
                  {s.subtitle}
                </p>
                <p className="mt-3 text-[14px] leading-[1.85] text-ink-700">
                  {s.body}
                </p>
              </div>
              {i < arr.length - 1 ? (
                <div aria-hidden className="mx-auto my-2 h-5 w-px bg-ink-900/15" />
              ) : (
                <div aria-hidden className="mx-auto my-2 flex items-center justify-center text-[11px] tracking-[0.18em] text-warm-deep">
                  ↻ 次のつまずきへ循環
                </div>
              )}
            </li>
          ))}
        </ol>

        <p className="mt-8 text-center text-[12.5px] tracking-[0.18em] text-warm-deep">
          ✱ Solvora Learning Lab が、このサイクル全体を伴走します
        </p>
      </Container>
    </section>
  );
}
