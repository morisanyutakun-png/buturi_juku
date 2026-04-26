import { Quote } from "lucide-react";
import { Section } from "@/components/section";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <Section
      eyebrow="CASE STUDIES — 指導事例"
      title="高校物理が苦手だった受講生の、指導事例"
      description="高校物理専門塾「物理の森」で、物理に苦手意識を持っていた受講生が、どのように考え方を変えていったかをご紹介します。掲載は本人の同意を得た範囲で、特定を避けるため一部情報を加工した『指導事例』です。"
      className="bg-paper"
    >
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-ink-900/10 bg-white p-7 sm:p-8 shadow-soft"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-4 -top-6 select-none font-serif text-[9rem] leading-none text-brand/8"
            >
              &ldquo;
            </div>

            <Quote className="relative h-6 w-6 text-brand" aria-hidden />
            <blockquote className="relative mt-5 sm:mt-6 text-[15px] sm:text-sm leading-[2.05] sm:leading-[1.95] text-ink-800">
              {t.body}
            </blockquote>

            <figcaption className="relative mt-7 sm:mt-8 border-t border-ink-900/10 pt-5">
              <p className="font-serif text-[1.05rem] sm:text-base text-ink-900">{t.name}</p>
              <p className="mt-1.5 text-[11.5px] sm:text-[11px] tracking-widest uppercase text-ink-500">
                {t.role}
              </p>
              {t.context && (
                <p className="mt-3 text-[12.5px] sm:text-[12px] leading-relaxed text-ink-600">
                  {t.context}
                </p>
              )}
              {t.score && (
                <p className="mt-3 inline-flex rounded-full border border-warm/30 bg-warm-bg px-3 py-1.5 text-[12.5px] sm:text-xs text-warm-deep">
                  指導の到達点：{t.score}
                </p>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-6 text-xs text-ink-500">
        ※ 受講生の学習成果は個人差があります。掲載は本人の許諾を得た範囲で一部情報を加工しています。
      </p>
    </Section>
  );
}
