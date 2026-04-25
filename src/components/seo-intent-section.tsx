import Link from "next/link";
import { ArrowRight, BookOpenCheck, MonitorCheck, Target, Waves } from "lucide-react";
import { Section } from "@/components/section";

const intents = [
  {
    icon: Target,
    keyword: "高校物理専門塾 大学受験",
    title: "大学受験物理を、高校物理専門塾で志望校から逆算して伸ばしたい",
    body: "高校物理専門塾として、総合塾の進度に合わせるのではなく、志望校の出題傾向・残り期間・今の理解度から、高校物理だけの学習ルートを設計します。",
    href: "/courses/private",
    cta: "1対1個別指導を見る",
  },
  {
    icon: MonitorCheck,
    keyword: "高校物理専門塾 オンライン",
    title: "通塾せず、オンラインの高校物理専門塾で1対1で学びたい",
    body: "高校物理専門塾のライブ授業・手書きボード・授業録画・質問チャットを組み合わせ、オンラインでも思考の詰まりまで見える指導を行います。",
    href: "/about",
    cta: "塾の特徴を見る",
  },
  {
    icon: BookOpenCheck,
    keyword: "共通テスト物理 専門塾",
    title: "共通テスト物理で安定して高得点を取りたい高校生へ",
    body: "高校物理専門塾の対策では、公式暗記ではなく、リード文・グラフ・選択肢を読み解く処理手順を身につけ、時間配分まで含めて指導します。",
    href: "/courses/kyotsu",
    cta: "共通テスト対策を見る",
  },
  {
    icon: Waves,
    keyword: "高校物理 苦手分野 克服",
    title: "力学・電磁気など、高校物理の苦手分野だけを短期で立て直したい",
    body: "高校物理専門塾として、物理の失点原因を分野別に切り分け、力学の立式、電磁気の場のイメージなど、必要な単元に絞って補強します。",
    href: "/courses",
    cta: "分野別講座を見る",
  },
] as const;

export function SeoIntentSection() {
  return (
    <Section
      eyebrow="SEARCH INTENT"
      title={<>高校物理専門塾を検索する<br className="sm:hidden" />『悩み』に、すべて答えます。</>}
      description="『高校物理専門塾』『高校物理専門塾 オンライン』『高校物理 個別指導』など、検索で探される悩みごとに、高校物理専門塾としての答えを整理しました。広告から来た方にも、自然検索で調べている方にも、迷わず次の一歩を選んでいただけます。"
      className="bg-paper-soft"
    >
      <div className="grid gap-5 md:grid-cols-2">
        {intents.map((intent) => (
          <article
            key={intent.keyword}
            className="group rounded-2xl border border-ink-900/10 bg-white p-7 shadow-soft transition hover:-translate-y-0.5 hover:border-brand/35 hover:shadow-card"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand/25 bg-brand-bg text-brand-deep">
                <intent.icon className="h-5 w-5" aria-hidden />
              </span>
              <p className="text-[10px] tracking-[0.25em] uppercase text-ink-500">
                {intent.keyword}
              </p>
            </div>
            <h3 className="mt-6 font-serif text-xl leading-snug text-ink-900">
              {intent.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-ink-700">
              {intent.body}
            </p>
            <Link
              href={intent.href}
              className="mt-6 inline-flex items-center gap-1 text-sm text-brand-deep transition group-hover:translate-x-0.5"
            >
              {intent.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </div>
    </Section>
  );
}
