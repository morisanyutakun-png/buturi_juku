import { Quote } from "lucide-react";
import { Section } from "@/components/section";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <Section
      eyebrow="STUDENTS' VOICES"
      title="受講生・保護者の声"
      description="物理が苦手だった受講生が、どのように考え方を変えていったのか。匿名で一部をご紹介します。"
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
              {t.score && (
                <p className="mt-3 inline-flex rounded-full border border-warm/30 bg-warm-bg px-3 py-1.5 text-[12.5px] sm:text-xs text-warm-deep">
                  {t.score}
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
