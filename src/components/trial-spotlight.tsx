import Link from "next/link";
import { ArrowRight, Clock, FileText, MessageCircle } from "lucide-react";
import { Container } from "@/components/container";

/**
 * トップページの「体験授業」スポット。
 *
 * 位置づけ:
 *   - 演習プリント → note → 参考書 と教材で進めても、まだ詰まる人のための入口。
 *   - 売り込みを最小化し、何が手に入るかだけを 3 点で示す。
 *   - SupportTierSection の前段に置いて「体験 → 必要ならサポートへ」の自然な流れを作る。
 */
export function TrialSpotlight() {
  return (
    <section
      id="trial-spotlight"
      aria-labelledby="trial-spotlight-heading"
      className="relative overflow-hidden border-b border-ink-900/[0.06] bg-paper"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_92%_12%,rgba(226,128,64,0.12),transparent_55%),radial-gradient(circle_at_8%_88%,rgba(59,124,217,0.08),transparent_55%)]"
      />
      <Container className="relative py-12 sm:py-20">
        <div className="grid items-center gap-7 sm:gap-12 md:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] sm:text-[10px] font-medium uppercase tracking-[0.18em] sm:tracking-[0.32em] text-warm-deep before:inline-block before:h-px before:w-5 sm:before:w-6 before:bg-current before:opacity-50">
              TRIAL — 60 分の体験授業（¥3,000）
            </p>
            <h2
              id="trial-spotlight-heading"
              className="mt-3 sm:mt-5 font-serif text-[1.65rem] sm:text-[2.15rem] leading-[1.35] sm:leading-[1.22] tracking-[-0.012em] text-ink-900"
            >
              それでも、<br className="sm:hidden" />
              <span className="text-warm-deep">1 問で止まる単元</span>があれば。
            </h2>
            <p className="mt-4 sm:mt-6 max-w-xl text-[14px] sm:text-[15.5px] leading-[1.9] sm:leading-[1.85] text-ink-700">
              立式の癖は、自分では見えづらいものです。事前にお送りするプリントを題材に、つまずきの位置と次の一手を、講師・森祐太が直接お渡しします。
            </p>

            <ul className="mt-5 sm:mt-7 space-y-2.5 text-[13.5px] sm:text-[14px] leading-[1.8] text-ink-700">
              <li className="flex items-start gap-2.5">
                <FileText className="mt-[3px] h-4 w-4 shrink-0 text-warm-deep" aria-hidden strokeWidth={1.7} />
                事前に演習プリントをお送りし、当日それを題材に進めます
              </li>
              <li className="flex items-start gap-2.5">
                <MessageCircle className="mt-[3px] h-4 w-4 shrink-0 text-warm-deep" aria-hidden strokeWidth={1.7} />
                立式の癖を言語化し、残り期間からの学習方針を整理してお渡しします
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-[3px] h-4 w-4 shrink-0 text-warm-deep" aria-hidden strokeWidth={1.7} />
                60 分・¥3,000・前払い。サポートを続けるかは体験後に判断していただいて構いません
              </li>
            </ul>

            <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3">
              <Link
                href="/contact?topic=trial#contact-form"
                className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-warm px-7 py-4 text-[15px] sm:text-[14.5px] font-medium text-white shadow-warm transition hover:bg-warm-deep min-h-[52px] sm:min-h-0"
              >
                体験授業を申し込む
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/trial"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-ink-900/15 bg-white/80 px-6 py-3.5 text-[14.5px] sm:text-[14px] text-ink-800 backdrop-blur transition hover:border-ink-900/30 hover:bg-white min-h-[52px] sm:min-h-0"
              >
                体験授業の中身を見る
                <ArrowRight className="h-3.5 w-3.5 opacity-60" />
              </Link>
            </div>
          </div>

          {/* 右側：受講ステップを 3 行で。長文の説明より、何が起きるかを順序で伝える方が早い */}
          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-6 -z-10"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(255,200,148,0.30), transparent 65%)",
              }}
            />
            <ol className="relative space-y-3 rounded-2xl border border-ink-900/[0.08] bg-white/95 p-5 sm:p-6 shadow-soft backdrop-blur-sm">
              {[
                {
                  step: "01",
                  title: "申し込み時、苦手な単元を選ぶ",
                  body: "申込フォームで分野・単元・学年をお伝えください。",
                },
                {
                  step: "02",
                  title: "授業前日までに、プリントが届く",
                  body: "難易度を合わせた演習プリント（問題＋解答＋解説 PDF）をメールで送付。",
                },
                {
                  step: "03",
                  title: "当日 60 分、つまずきの位置を一緒に見る",
                  body: "事前プリントを題材に『言語化 → 立式 → 演習』の順で進めます。",
                },
                {
                  step: "04",
                  title: "学習方針を整理して、解散",
                  body: "次に取り組む単元・教材・進め方をその場でお渡しします。",
                },
              ].map((s) => (
                <li
                  key={s.step}
                  className="flex items-start gap-3 sm:gap-4 rounded-xl border border-ink-900/[0.06] bg-paper-soft/50 p-3.5 sm:p-4"
                >
                  <span className="inline-flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-warm-bg text-warm-deep font-mono text-[11px] sm:text-[12px] tracking-[0.05em]">
                    {s.step}
                  </span>
                  <div className="min-w-0">
                    <p className="font-serif text-[13.5px] sm:text-[14.5px] leading-[1.5] tracking-[-0.005em] text-ink-900">
                      {s.title}
                    </p>
                    <p className="mt-1.5 text-[11.5px] sm:text-[12px] leading-[1.7] text-ink-600">
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
