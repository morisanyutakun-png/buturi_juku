import Link from "next/link";
import { ArrowRight, Clock, FileText, MessageCircle } from "lucide-react";
import { Container } from "@/components/container";

/**
 * トップページの「体験授業」スポット。
 *
 * 位置づけ:
 *   - 演習プリント → note → 参考書 で進めてもまだ詰まる人のための入口。
 *   - プリント主導の流れの中で見落とされないよう、視覚的にしっかり主張する
 *     （warm 色の太いバンド、価格・所要時間を大きく、独立した H2）。
 *   - 売り込みではなく「困っているならここ」という標識として置く。
 */
export function TrialSpotlight() {
  return (
    <section
      id="trial-spotlight"
      aria-labelledby="trial-spotlight-heading"
      className="relative overflow-hidden border-y-2 border-warm/30"
    >
      {/* base warm wash — プリント・参考書セクションよりも明確にトーンを変える */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #fef4eb 0%, #fce8d4 55%, #fad8b5 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_92%_8%,rgba(226,128,64,0.22),transparent_60%),radial-gradient(circle_at_8%_92%,rgba(31,90,166,0.10),transparent_55%)]"
      />

      <Container className="relative py-14 sm:py-24">
        <div className="grid items-start gap-8 sm:gap-12 md:grid-cols-[1.05fr_1fr]">
          <div>
            {/* eyebrow + price-time chip ペア — 60 分・¥3,000 が一目で入る */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-warm-deep px-3 py-1 text-[10.5px] sm:text-[11px] font-medium uppercase tracking-[0.18em] sm:tracking-[0.24em] text-white">
                <span className="relative inline-flex h-1.5 w-1.5" aria-hidden>
                  <span className="absolute inline-flex h-1.5 w-1.5 animate-ping rounded-full bg-white/70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                </span>
                TRIAL
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-warm-deep/30 bg-white/85 px-3 py-1 text-[11.5px] sm:text-[12px] font-medium tracking-[0.04em] text-warm-deep">
                60 分・¥3,000
              </span>
            </div>

            <h2
              id="trial-spotlight-heading"
              className="mt-5 sm:mt-6 font-serif text-[1.95rem] sm:text-[2.6rem] lg:text-[2.95rem] leading-[1.2] sm:leading-[1.15] tracking-[-0.018em] text-ink-900"
              style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}
            >
              <span className="block">プリントを解いて、</span>
              <span className="block">
                それでも止まる方は——
              </span>
              <span className="block">
                <span className="relative inline-block">
                  <span className="text-warm-deep">60 分だけ、お預かりします。</span>
                  <span
                    aria-hidden
                    className="absolute inset-x-0 -bottom-1 h-[8px] sm:h-[10px] -z-10 rounded-full bg-warm/35"
                  />
                </span>
              </span>
            </h2>

            <p className="mt-5 sm:mt-7 max-w-xl text-[14.5px] sm:text-[16px] leading-[1.95] sm:leading-[1.85] text-ink-800">
              立式の癖は、自分では見えづらいものです。事前にお送りするプリントを題材に、つまずきの位置と次の一手を、講師・<strong className="font-medium text-ink-900">森祐太</strong>が直接お渡しします。
            </p>

            <ul className="mt-5 sm:mt-7 space-y-2.5 text-[13.5px] sm:text-[14.5px] leading-[1.8] text-ink-800">
              <li className="flex items-start gap-2.5">
                <FileText className="mt-[3px] h-4 w-4 shrink-0 text-warm-deep" aria-hidden strokeWidth={1.8} />
                <span>事前に演習プリントを送付。当日それを題材に進めます</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MessageCircle className="mt-[3px] h-4 w-4 shrink-0 text-warm-deep" aria-hidden strokeWidth={1.8} />
                <span>立式の癖と、残り期間からの学習方針を整理してお渡しします</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-[3px] h-4 w-4 shrink-0 text-warm-deep" aria-hidden strokeWidth={1.8} />
                <span>続けて週次サポートに進むかは、体験のあとで判断していただいて構いません</span>
              </li>
            </ul>

            <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3">
              <Link
                href="/contact?topic=trial#contact-form"
                className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-4 text-[15.5px] sm:text-[15px] font-medium text-paper transition duration-300 ease-out shadow-warm min-h-[54px] sm:min-h-0"
                style={{
                  background:
                    "linear-gradient(120deg, #b35f27 0%, #e28040 55%, #f3a86c 100%)",
                }}
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  体験授業を申し込む
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.28),transparent)] transition-transform duration-700 group-hover:translate-x-full"
                />
              </Link>
              <Link
                href="/trial"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-ink-900/20 bg-white/85 px-6 py-3.5 text-[14.5px] sm:text-[14px] text-ink-900 backdrop-blur transition hover:border-ink-900/35 hover:bg-white min-h-[52px] sm:min-h-0"
              >
                体験授業の中身を詳しく見る
                <ArrowRight className="h-3.5 w-3.5 opacity-60" />
              </Link>
            </div>
          </div>

          {/* 右側：受講ステップを 4 行で。長文の説明より、順序で伝える方が早い */}
          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-6 -z-10"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(255,200,148,0.45), transparent 65%)",
              }}
            />
            <ol className="relative space-y-3 rounded-2xl border border-warm/35 bg-white/95 p-5 sm:p-6 shadow-card backdrop-blur-sm">
              <li className="border-b border-ink-900/[0.06] pb-3.5">
                <p className="text-[10px] font-medium tracking-[0.24em] uppercase text-warm-deep">
                  HOW IT WORKS
                </p>
                <p className="mt-1.5 font-serif text-[14px] sm:text-[15px] leading-[1.5] text-ink-900">
                  申込から授業まで、4 ステップ
                </p>
              </li>
              {[
                {
                  step: "01",
                  title: "苦手な単元を選んで申込み",
                  body: "申込フォームで分野・単元・学年をお伝えください。",
                },
                {
                  step: "02",
                  title: "授業前日までに、プリントが届く",
                  body: "難易度を合わせた演習プリント（問題＋解答＋解説 PDF）を送付。",
                },
                {
                  step: "03",
                  title: "当日 60 分、つまずきを一緒に見る",
                  body: "事前プリントを題材に『言語化 → 立式 → 演習』の順で進めます。",
                },
                {
                  step: "04",
                  title: "学習方針を整理して、解散",
                  body: "次に取り組む単元・教材・進め方をその場でお渡しします。",
                },
              ].map((s) => (
                <li key={s.step} className="flex items-start gap-3 sm:gap-4">
                  <span className="inline-flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-warm-deep text-white font-mono text-[11px] sm:text-[12px] tracking-[0.05em]">
                    {s.step}
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <p className="font-serif text-[13.5px] sm:text-[14.5px] leading-[1.5] tracking-[-0.005em] text-ink-900">
                      {s.title}
                    </p>
                    <p className="mt-1 text-[11.5px] sm:text-[12px] leading-[1.7] text-ink-600">
                      {s.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
