import { Section } from "@/components/section";
import { principles } from "@/data/philosophy";

export function PhilosophySection() {
  return (
    <Section
      eyebrow="LEARNING PHILOSOPHY"
      title="学習理念 — 物理が伸びる5つの原則"
      description="私たちが授業で一貫して守っている、5つの原則です。テクニックではなく、学びの姿勢そのものを書き換えることが、物理を伸ばす近道だと考えています。"
      className="bg-paper-soft"
    >
      <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {principles.map((p) => (
          <li
            key={p.number}
            className="group relative overflow-hidden rounded-3xl border border-ink-900/[0.07] bg-white/85 p-7 sm:p-9 shadow-soft backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-warm/30 hover:shadow-card"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-12 -top-14 select-none font-serif text-[9rem] leading-none text-warm/[0.08] transition-all duration-700 group-hover:text-warm/[0.16]"
            >
              {p.kanji}
            </div>
            <p className="relative font-mono text-[11px] sm:text-[10.5px] tracking-[0.24em] sm:tracking-[0.28em] text-warm-deep">
              PRINCIPLE {p.number}
            </p>
            <h3 className="relative mt-5 font-serif text-[1.3rem] sm:text-[1.2rem] leading-[1.5] sm:leading-snug tracking-[-0.008em] text-ink-900">
              {p.title}
            </h3>
            <p className="relative mt-4 text-[14.5px] sm:text-[13.5px] leading-[2] sm:leading-[1.85] text-ink-600">
              {p.description}
            </p>
          </li>
        ))}

        <li className="relative flex flex-col justify-center overflow-hidden rounded-3xl border border-warm/25 bg-gradient-to-br from-warm-bg/70 via-paper to-brand-bg/70 p-8 sm:p-9 shadow-soft">
          <p className="font-mono text-[11px] sm:text-[10.5px] tracking-[0.28em] sm:tracking-[0.32em] text-warm-deep">
            OUR BELIEF
          </p>
          <p className="mt-5 sm:mt-6 font-serif text-[1.4rem] sm:text-[1.25rem] leading-[1.55] sm:leading-relaxed tracking-[-0.012em] text-ink-900">
            物理の伸び悩みは、<br />
            才能ではなく、<br />
            <span className="text-warm-deep">学び方</span>の問題です。
          </p>
          <p className="mt-5 sm:mt-6 text-[14px] sm:text-[12.5px] leading-[2] sm:leading-[1.85] text-ink-600">
            正しい順序で、正しい姿勢で学べば、物理は着実に伸びていきます。Solvora Learning Lab は、そのための伴走者です。
          </p>
        </li>
      </ol>
    </Section>
  );
}
