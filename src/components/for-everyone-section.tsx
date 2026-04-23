import { Section } from "@/components/section";
import { audiences } from "@/data/audiences";

const toneClasses: Record<string, string> = {
  beginner: "border-brand/25 bg-brand-bg",
  mid: "border-ink-900/10 bg-white",
  advanced: "border-warm/30 bg-warm-bg",
  independent: "border-forest/25 bg-forest-bg",
};

export function ForEveryoneSection() {
  return (
    <Section
      eyebrow="FOR EVERY LEARNER"
      title={<>物理を高めたい人、<br className="sm:hidden" />みんなウェルカム。</>}
      description="初学者から難関大志望まで、物理を伸ばしたい全ての方のための塾です。『苦手だから無理かも』『自分のレベルでは申し込めない』ということは、一切ありません。あなたに合ったルートを、体験授業で一緒に設計します。"
      className="bg-paper"
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {audiences.map((a) => (
          <article
            key={a.level}
            className={`group relative overflow-hidden rounded-2xl border p-7 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card ${toneClasses[a.tone]}`}
          >
            <p className="font-mono text-[10px] tracking-[0.3em] text-ink-500">
              {a.level}
            </p>
            <h3 className="mt-4 font-serif text-lg leading-snug text-ink-900">
              {a.label}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-ink-700">
              {a.body}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-warm/30 bg-gradient-to-br from-warm-bg via-paper to-brand-bg p-8 text-center shadow-soft md:p-10">
        <p className="font-mono text-xs tracking-[0.3em] text-warm-deep">
          OUR STANCE
        </p>
        <p className="mt-4 font-serif text-xl leading-relaxed text-ink-900 sm:text-2xl">
          『<span className="text-warm-deep">あなたのレベルに合うルート</span>』は、必ず存在します。
        </p>
        <p className="mt-4 text-sm text-ink-700 leading-relaxed">
          体験授業では、今のあなたの現在地を丁寧にヒアリングしたうえで、
          <br className="hidden sm:block" />
          合うと感じられたときだけ、受講を選んでください。
        </p>
      </div>
    </Section>
  );
}
