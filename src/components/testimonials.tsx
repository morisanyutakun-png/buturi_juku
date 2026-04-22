import { Quote } from "lucide-react";
import { Section } from "@/components/section";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <Section
      eyebrow="STUDENTS' VOICES"
      title="受講生・保護者の声"
      description="物理が苦手だった受講生が、どのように考え方を変えていったのか。匿名で一部をご紹介します。"
    >
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-paper/10 bg-gradient-to-br from-navy-900/60 via-ink-900/80 to-ink-950 p-8"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-6 -top-8 select-none font-serif text-[10rem] leading-none text-accent/5"
            >
              &ldquo;
            </div>

            <Quote className="relative h-6 w-6 text-accent" aria-hidden />
            <blockquote className="relative mt-6 text-sm leading-[1.9] text-paper/85">
              {t.body}
            </blockquote>

            <figcaption className="relative mt-8 border-t border-paper/10 pt-5">
              <p className="font-serif text-paper">{t.name}</p>
              <p className="mt-1 text-[11px] tracking-widest uppercase text-paper/50">
                {t.role}
              </p>
              {t.score && (
                <p className="mt-3 inline-flex rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs text-gold">
                  {t.score}
                </p>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-6 text-xs text-paper/40">
        ※ 受講生の学習成果は個人差があります。掲載は本人の許諾を得た範囲で一部情報を加工しています。
      </p>
    </Section>
  );
}
