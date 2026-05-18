import { Section } from "@/components/section";
import { audiences } from "@/data/audiences";

const toneClasses: Record<string, string> = {
  beginner: "border-brand/20 bg-brand-bg/60",
  mid: "border-ink-900/[0.08] bg-white/85",
  advanced: "border-warm/25 bg-warm-bg/60",
  independent: "border-forest/20 bg-forest-bg/60",
};

export function ForEveryoneSection() {
  return (
    <Section
      eyebrow="FOR EVERY LEARNER"
      title={<>高校物理を高めたい人、<br className="sm:hidden" />みんなウェルカム。</>}
      description="Solvora Learning Lab の演習プリントと参考書は、初学者から難関大志望まで、誰でも自由に手に取れます。『苦手だから無理かも』『自分のレベルでは申し込めない』ということは一切ありません。まずは演習プリントを 1 単元、自分のペースで開いてみてください。"
      className="bg-paper"
    >
      <div className="grid gap-3 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
        {audiences.map((a) => (
          <article
            key={a.level}
            className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl border p-5 sm:p-8 shadow-soft backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-0.5 hover:shadow-card ${toneClasses[a.tone]}`}
          >
            <p className="font-mono text-[10px] sm:text-[10px] tracking-[0.18em] sm:tracking-[0.28em] text-ink-500">
              {a.level}
            </p>
            <h3 className="mt-3 sm:mt-4 font-serif text-[1.05rem] sm:text-[1.15rem] leading-[1.45] sm:leading-snug tracking-[-0.008em] text-ink-900">
              {a.label}
            </h3>
            <p className="mt-2.5 sm:mt-4 text-[13px] sm:text-[13.5px] leading-[1.85] sm:leading-[1.8] text-ink-600">
              {a.body}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-8 sm:mt-12 rounded-2xl sm:rounded-[2rem] border border-warm/25 bg-gradient-to-br from-warm-bg/70 via-paper to-brand-bg/70 p-6 sm:p-10 text-center shadow-soft md:p-12">
        <p className="font-mono text-[10px] sm:text-[10.5px] tracking-[0.18em] sm:tracking-[0.32em] text-warm-deep">
          OUR STANCE
        </p>
        <p className="mt-3 sm:mt-5 font-serif text-[1.15rem] sm:text-[1.35rem] tracking-[-0.012em] leading-[1.55] sm:leading-relaxed text-ink-900 sm:text-[1.55rem]">
          まずは <span className="text-warm-deep">演習プリントを 1 単元</span>、<br className="sm:hidden" />自分のペースで開いてみてください。
        </p>
        <p className="mt-3 sm:mt-5 text-[13px] sm:text-[14px] leading-[1.85] sm:leading-[1.85] text-ink-600">
          一人で進めるのが難しい単元があったときだけ、<br className="hidden sm:block" />
          学習サポート（個別指導）を検討していただいて構いません。
        </p>
      </div>
    </Section>
  );
}
