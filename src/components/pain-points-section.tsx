import { AlertCircle } from "lucide-react";
import { Container } from "@/components/container";

/**
 * 「こんな悩み、ありませんか？」— 体験申込前の共感セクション。
 * 3 つの典型的な物理学習のつまずきを並べ、Solvora 式メソッドへの導入を促す。
 *
 * 設計方針:
 *   - 短く、刺さる文。読み返さなくても通じる粒度。
 *   - モバイル：縦並び 3 カード。
 *   - デスクトップ：横並び 3 カード。
 */
const painPoints = [
  {
    title: "公式は覚えたのに、初見で手が止まる",
    body: "模試になると『どの公式を使うか』判断できない。",
  },
  {
    title: "どこから手をつければいいかわからない",
    body: "苦手分野が複数あって、優先順位がつかない。",
  },
  {
    title: "復習が雑になり、同じ問題を間違える",
    body: "似た問題が出るとまた落とす。",
  },
];

export function PainPointsSection() {
  return (
    <section
      aria-labelledby="pain-points-heading"
      className="border-b border-ink-900/[0.06] bg-paper"
    >
      <Container className="py-12 sm:py-20">
        <p className="text-[10px] sm:text-[10px] font-medium tracking-[0.18em] sm:tracking-[0.32em] uppercase text-brand-deep">
          YOUR STUCK POINT
        </p>
        <h2
          id="pain-points-heading"
          className="mt-3 sm:mt-5 max-w-3xl font-serif text-[1.5rem] sm:text-[2rem] leading-[1.4] sm:leading-[1.3] tracking-[-0.012em] text-ink-900"
        >
          こんな悩み、<br className="sm:hidden" />ありませんか？
        </h2>

        <ul className="mt-6 sm:mt-10 grid gap-3 sm:gap-5 md:grid-cols-3">
          {painPoints.map((p) => (
            <li
              key={p.title}
              className="lift flex gap-3 rounded-2xl border border-ink-900/[0.08] bg-white p-4 sm:p-6 shadow-soft sm:flex-col sm:gap-4"
            >
              <span className="inline-flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-warm-bg text-warm-deep">
                <AlertCircle className="h-4 w-4 sm:h-[18px] sm:w-[18px]" aria-hidden strokeWidth={1.6} />
              </span>
              <div>
                <h3 className="font-serif text-[1rem] sm:text-[1.1rem] leading-[1.45] sm:leading-snug tracking-[-0.008em] text-ink-900">
                  {p.title}
                </h3>
                <p className="mt-2 sm:mt-3 text-[12.5px] sm:text-[13.5px] leading-[1.75] sm:leading-[1.75] text-ink-600">
                  {p.body}
                </p>
              </div>
            </li>
          ))}
        </ul>

      </Container>
    </section>
  );
}
