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
      description="高校物理専門塾「物理の森」は立ち上げ期のため、ここでは実在の受講生の声ではなく、よくあるつまずきのタイプ別に、講師がどのように指導を設計するかをモデルケースとして示します。体験授業では、あなた自身の状態に合わせて同じ枠組みでルートを設計します。"
      className="bg-paper"
    >
      <div className="grid gap-6 md:grid-cols-3">
        {caseStudies.map((c) => (
          <article
            key={c.profile}
            className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink-900/10 bg-white p-7 sm:p-8 shadow-soft"
          >
            <div className="flex items-center gap-2.5 text-brand-deep">
              <Compass className="h-5 w-5" aria-hidden strokeWidth={1.6} />
              <p className="text-[11px] sm:text-[10.5px] font-medium tracking-[0.22em] sm:tracking-[0.28em] uppercase">
                CASE
              </p>
            </div>

            <h3 className="mt-5 font-serif text-[1.2rem] sm:text-[1.15rem] leading-[1.5] tracking-[-0.008em] text-ink-900">
              {c.profile}
            </h3>
            <p className="mt-2 text-[11.5px] sm:text-[11px] tracking-[0.18em] uppercase text-ink-500">
              {c.role}
            </p>

            <dl className="mt-6 space-y-4 text-[14.5px] sm:text-[13.5px] leading-[1.95] sm:leading-[1.8] text-ink-700">
              <div>
                <dt className="text-[11.5px] sm:text-[11px] font-medium tracking-[0.16em] uppercase text-ink-500">
                  典型的なつまずき
                </dt>
                <dd className="mt-1.5">{c.struggle}</dd>
              </div>
              <div>
                <dt className="text-[11.5px] sm:text-[11px] font-medium tracking-[0.16em] uppercase text-ink-500">
                  指導アプローチ
                </dt>
                <dd className="mt-1.5">{c.approach}</dd>
              </div>
            </dl>

            <p className="mt-7 inline-flex rounded-full border border-warm/30 bg-warm-bg px-3.5 py-1.5 text-[12.5px] sm:text-xs leading-snug text-warm-deep">
              到達イメージ：{c.outcome}
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
