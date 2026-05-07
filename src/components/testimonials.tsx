import { Compass } from "lucide-react";
import { Section } from "@/components/section";
import { caseStudies } from "@/data/testimonials";

/**
 * 立ち上げ期のため、実在の受講生の声は掲載していません。
 * 代わりに『この塾が、どういう生徒に、どう向き合うか』を
 * 指導設計として明示するモデルケースを表示します。
 */
export function Testimonials() {
  return (
    <Section
      eyebrow="TEACHING APPROACH — 指導モデルケース"
      title="高校物理が苦手な受験生に、どう向き合うか。"
      description="立ち上げ期のため、実在の受講生の声ではなく、よくあるつまずきのタイプ別に、講師がどのように指導を設計するかをモデルケースとして示します。"
      className="bg-paper"
    >
      <div className="grid gap-3 sm:gap-6 md:grid-cols-3">
        {caseStudies.map((c) => (
          <article
            key={c.profile}
            className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink-900/10 bg-white p-5 sm:p-8 shadow-soft"
          >
            <div className="flex items-center gap-2 sm:gap-2.5 text-brand-deep">
              <Compass className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden strokeWidth={1.6} />
              <p className="text-[10px] sm:text-[10.5px] font-medium tracking-[0.18em] sm:tracking-[0.28em] uppercase">
                CASE
              </p>
            </div>

            <h3 className="mt-3 sm:mt-5 font-serif text-[1.05rem] sm:text-[1.15rem] leading-[1.45] sm:leading-[1.5] tracking-[-0.008em] text-ink-900">
              {c.profile}
            </h3>
            <p className="mt-1.5 sm:mt-2 text-[10.5px] sm:text-[11px] tracking-[0.14em] sm:tracking-[0.18em] uppercase text-ink-500">
              {c.role}
            </p>

            <dl className="mt-4 sm:mt-6 space-y-3 sm:space-y-4 text-[13px] sm:text-[13.5px] leading-[1.85] sm:leading-[1.8] text-ink-700">
              <div>
                <dt className="text-[10.5px] sm:text-[11px] font-medium tracking-[0.12em] sm:tracking-[0.16em] uppercase text-ink-500">
                  典型的なつまずき
                </dt>
                <dd className="mt-1 sm:mt-1.5">{c.struggle}</dd>
              </div>
              <div>
                <dt className="text-[10.5px] sm:text-[11px] font-medium tracking-[0.12em] sm:tracking-[0.16em] uppercase text-ink-500">
                  指導アプローチ
                </dt>
                <dd className="mt-1 sm:mt-1.5">{c.approach}</dd>
              </div>
            </dl>

            <p className="mt-5 sm:mt-7 inline-flex rounded-full border border-warm/30 bg-warm-bg px-3 sm:px-3.5 py-1 sm:py-1.5 text-[11.5px] sm:text-xs leading-snug text-warm-deep">
              到達：{c.outcome}
            </p>
          </article>
        ))}
      </div>
      <p className="mt-6 text-xs text-ink-500">
        ※ 上記は実在の受講生体験談ではなく、つまずきのタイプ別に指導設計を示したモデルケースです。実在の受講事例は、本人の許諾を得たものから順次差し替えていきます。
      </p>
    </Section>
  );
}
