import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Atom,
  BookMarked,
  Brain,
  GraduationCap,
  Sparkles,
  Target,
} from "lucide-react";
import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { ProofStrip } from "@/components/proof-strip";
import { PainPointsSection } from "@/components/pain-points-section";
import { BookCoversStrip } from "@/components/book-covers-strip";
import { PrintsTeaser } from "@/components/prints-teaser";
import { SupportTierSection } from "@/components/support-tier-section";
import { TrialSpotlight } from "@/components/trial-spotlight";
import { Section } from "@/components/section";
import { FeatureCard } from "@/components/feature-card";
import { CtaBlock } from "@/components/cta-block";
import { OnlineSection } from "@/components/online-section";
import { ComparisonTable } from "@/components/comparison-table";
import { PhilosophySection } from "@/components/philosophy-section";
import { BookShowcase } from "@/components/book-showcase";
import { Testimonials } from "@/components/testimonials";
import { ForEveryoneSection } from "@/components/for-everyone-section";
import { InstructorPortrait } from "@/components/instructor-portrait";
import { JsonLdGraph } from "@/components/json-ld";
import { SeoIntentSection } from "@/components/seo-intent-section";
import { ManifestoBand } from "@/components/manifesto-band";
import { ProofShowcase } from "@/components/proof-showcase";
import { PullQuote } from "@/components/pull-quote";
import { MiniFaq } from "@/components/mini-faq";
import { NotePromoSection } from "@/components/note-promo-section";
import { SafetyPolicySection } from "@/components/safety-policy-section";
import { visibleCourses } from "@/data/courses";
import { articles, articleHref } from "@/data/articles";
import { instructor } from "@/data/instructor";
import { siteConfig } from "@/data/site";
import { breadcrumbJsonLd, itemListJsonLd, webPageJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title:
    "Solvora Learning Lab ｜ 高校物理の演習プリント・解説 PDF・参考書",
  description:
    "公式は覚えたのに解けない——その壁は、立式の手順を踏み直せば崩せます。Solvora Learning Lab では、力学・電磁気・波動・熱・原子の演習プリントを解答・解説まで無料で公開しています。さらに体系的に学びたい方には、講師作の参考書『考える力を育てる』全 6 冊と note の有料単発 PDF を。それでも詰まる単元には、60 分の体験授業と週次サポートも。",
  path: "/",
  keywords: [
    "高校物理 プリント",
    "高校物理 演習プリント",
    "物理 プリント PDF",
    "高校物理 問題集 無料",
    "高校物理 参考書",
    "高校物理 解説 PDF",
    "Solvora Learning Lab",
    "高校物理 オンライン",
    "高校物理 個別指導",
    "大学受験 物理 専門塾",
  ],
  category: "education",
});

const features: {
  icon: typeof Atom;
  title: string;
  description: string;
  tone: "brand" | "warm" | "forest" | "gold";
}[] = [
  {
    icon: Atom,
    title: "物理だけを、深く",
    description: "総合塾ではなく物理専門。全 5 分野を本質まで踏み込んで扱う。",
    tone: "brand",
  },
  {
    icon: Brain,
    title: "暗記ではなく理解",
    description: "『なぜそう立式するか』を語れる状態へ。",
    tone: "warm",
  },
  {
    icon: Target,
    title: "志望校から逆算",
    description: "残り期間と出題傾向から、投資対効果の高い単元に集中。",
    tone: "forest",
  },
  {
    icon: BookMarked,
    title: "全分野を自ら執筆",
    description: "力学・電磁気・熱・波動・原子の 6 冊を執筆、授業の軸に。",
    tone: "gold",
  },
];

const teachingSteps = [
  {
    step: "01",
    label: "言語化",
    title: "現象を、自分の言葉で説明する",
    body: "公式の前に、何が起きているかを語れる状態へ。",
    accent: "text-brand-deep",
  },
  {
    step: "02",
    label: "立式",
    title: "言語化したものを、数式に翻訳する",
    body: "系・座標・力の列挙・立式。この順序を機械的になぞれるように。",
    accent: "text-warm-deep",
  },
  {
    step: "03",
    label: "演習",
    title: "立式の型を、実戦で固める",
    body: "標準問題で型を固め、過去問で志望校の傾向に磨き込む。",
    accent: "text-forest-deep",
  },
];

const subjects = [
  { name: "力学", description: "運動方程式・保存則・円運動・単振動・剛体", accent: "text-brand-deep" },
  { name: "電磁気", description: "電場・電位・磁場・電磁誘導・交流回路", accent: "text-warm-deep" },
  { name: "波動", description: "波の基本式・干渉・屈折・ドップラー", accent: "text-forest-deep" },
  { name: "熱力学", description: "状態方程式・熱力学第一法則・熱機関", accent: "text-gold-deep" },
  { name: "原子", description: "光電効果・原子モデル・原子核", accent: "text-brand-deep" },
];

export default function HomePage() {
  const latestArticles = articles.slice(0, 4);

  return (
    <>
      {/* ============================================================
          TOP PAGE — 教材主導の構成（2026.05 リブランド）
          流入想定: Google 広告 / SEO → /prints が着地。
          順序: Hero → 演習プリント（無料） → note（有料 PDF） → KDP 参考書 6 冊
              → 体験授業（60 分） → 信頼 → 講師 → 続けて伴走が必要な方向けの週次サポート → 締め
          ============================================================ */}

      {/* FV — 悩み駆動の H1 + 演習プリント主導 + 体験授業を soft link で残す */}
      <Hero />

      {/* 1. 無料の演習プリント — メイン入口 */}
      <div className="cv-auto">
        <PrintsTeaser />
      </div>

      {/* 2. note の有料プリント — 単発 PDF 流入 */}
      <div className="cv-auto">
        <NotePromoSection />
      </div>

      {/* 3. KDP 参考書 6 冊 — 全分野を体系的に読みたい人へ */}
      <div className="cv-auto">
        <BookCoversStrip />
      </div>

      {/* 4. 体験授業（60 分・¥3,000）— 教材で詰まる方の入口として復活 */}
      <div className="cv-auto">
        <TrialSpotlight />
      </div>

      {/* 5. 信頼 — 教材をつくっている人の実績ストリップ */}
      <div className="cv-auto">
        <ProofStrip />
      </div>

      {/* ============================================================
          BELOW-THE-FOLD（モバイルでは大半を hidden sm:block で削る）
          デスクトップで深掘りしたい人向けの content と SEO 価値の保持。
          ============================================================ */}
      <div className="hidden cv-auto sm:block">
        {/* MANIFESTO — dark contrast pivot */}
        <ManifestoBand />

        {/* PROOF — giant numbers showcase（実績の詳細） */}
        <ProofShowcase />

        {/* FOR EVERYONE */}
        <ForEveryoneSection />

        {/* SEO Intent */}
        <SeoIntentSection />
      </div>

      <div className="hidden cv-auto sm:block">
        {/* SUBJECTS — 全 5 分野の概観 */}
        <Section
          eyebrow="SUBJECTS"
          title="力学から原子まで、すべての分野を扱います。"
          description="演習プリントも参考書 6 冊も、5 分野を同じ視座から書いています。"
          className="bg-paper-soft"
        >
          <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-5">
            {subjects.map((s, i) => (
              <div
                key={s.name}
                className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-ink-900/[0.07] bg-white/85 p-5 sm:p-7 shadow-soft backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-ink-900/[0.12] hover:shadow-card"
              >
                <span className="font-mono text-[10.5px] sm:text-[11px] text-ink-400">
                  0{i + 1}
                </span>
                <h3 className={`mt-3 sm:mt-5 font-serif text-[1.4rem] sm:text-[1.6rem] tracking-[-0.012em] ${s.accent}`}>{s.name}</h3>
                <p className="mt-3 sm:mt-5 text-[12.5px] sm:text-[12.5px] leading-[1.75] sm:leading-[1.75] text-ink-600">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* PHILOSOPHY */}
        <PhilosophySection />

        {/* FEATURES */}
        <Section
          eyebrow="WHY SOLVORA"
          title="教材設計の、4 つの軸。"
          className="bg-paper"
        >
          <div className="grid gap-6 md:grid-cols-2">
            {features.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
        </Section>

        {/* TEACHING METHOD — 教材の作り方そのもの */}
        <Section
          eyebrow="TEACHING METHOD"
          title={<>教材は、<br className="sm:hidden" />言語化 → 立式 → 演習。</>}
          description="プリントも参考書も、この 3 ステップで一貫して組み立てています。"
          className="bg-paper"
        >
          <div className="grid gap-5 md:grid-cols-3">
            {teachingSteps.map((s) => (
              <article
                key={s.step}
                className="group relative h-full overflow-hidden rounded-3xl border border-ink-900/[0.07] bg-white/85 p-7 sm:p-9 shadow-soft backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-ink-900/[0.12] hover:shadow-card"
              >
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="font-mono text-[12px] sm:text-[11px] tracking-[0.18em] text-ink-400">
                    STEP {s.step}
                  </span>
                  <span className={`font-serif text-[1.55rem] sm:text-[1.45rem] tracking-[-0.012em] ${s.accent}`}>
                    {s.label}
                  </span>
                </div>
                <h3 className="mt-6 sm:mt-7 font-serif text-[1.25rem] sm:text-[1.15rem] leading-[1.6] sm:leading-snug tracking-[-0.008em] text-ink-900">
                  {s.title}
                </h3>
                <p className="mt-4 text-[15px] sm:text-[13.5px] leading-[2] sm:leading-[1.85] text-ink-600">
                  {s.body}
                </p>
              </article>
            ))}
          </div>
        </Section>
      </div>

      {/* PULL QUOTE / BookShowcase（フル詳細）はデスクトップのみ */}
      <div className="hidden cv-auto sm:block">
        <PullQuote />
        <BookShowcase />
      </div>

      {/* INSTRUCTOR — 「教材を作っている人」として、プリント・参考書の直後に紹介 */}
      <div className="cv-auto">
      <Section
        eyebrow="INSTRUCTOR — 教材をつくっている人"
        title="講師紹介"
        className="bg-paper"
      >
        <div className="grid gap-7 rounded-2xl sm:rounded-[2rem] border border-ink-900/[0.07] bg-white/85 p-5 shadow-card backdrop-blur-sm sm:gap-10 sm:p-10 md:grid-cols-[1fr_1.4fr] md:gap-12 md:p-16">
          <InstructorPortrait />
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] sm:tracking-[0.32em] text-brand-deep">
              <GraduationCap className="h-3.5 w-3.5" aria-hidden strokeWidth={1.6} />
              PROFILE
            </div>
            <h3 className="mt-3 sm:mt-5 font-serif text-[1.45rem] leading-[1.4] sm:text-display-md sm:leading-tight tracking-[-0.012em] text-ink-900">
              プリントも参考書も、<br className="sm:hidden" />
              全部この人が書きました。
            </h3>
            {/* モバイル：3 文に分割。デスクトップ：従来の長文。 */}
            <ul className="mt-4 sm:hidden space-y-2.5 text-[13.5px] leading-[1.85] text-ink-700">
              <li>
                名古屋大学 工学部 電気電子情報工学科で電磁気を専門領域として扱う、現役の研究者・塾講師。
              </li>
              <li>
                共通テスト物理 <strong className="font-medium text-ink-900">満点</strong>・二次試験 <strong className="font-medium text-ink-900">9割</strong> を自ら達成。これまでに <strong className="text-warm-deep font-medium">名古屋大学合格者の指導経験</strong>あり。
              </li>
              <li>
                <strong className="font-medium text-ink-900">『考える力を育てる』シリーズ</strong>（力学・電磁気・熱・波動・原子）と、当サイトの演習プリント全教材を自ら執筆しています。
              </li>
            </ul>
            <p className="mt-6 sm:mt-7 text-[15px] leading-[1.85] text-ink-600 hidden sm:block">
              名古屋大学 工学部 電気電子情報工学科で電磁気を専門領域として扱いながら、塾講師として大学受験物理の指導にあたる。自身も共通テスト物理 満点・二次試験物理 9割を達成。これまでの指導で<strong className="text-warm-deep font-medium">名古屋大学合格者の指導経験</strong>もあります。<strong className="text-ink-900 font-medium">『考える力を育てる』シリーズ（力学・電磁気・熱・波動・原子）</strong>と、当サイトの演習プリント全教材を自ら執筆。教材も授業も、すべて同じ枠組みで設計しています。
            </p>

            <div className="mt-5 sm:mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl sm:rounded-2xl border border-ink-900/[0.07] bg-ink-900/[0.06] sm:grid-cols-4">
              {instructor.achievements.map((a) => (
                <div
                  key={a.label}
                  className="bg-paper/85 p-3 sm:p-4 text-center"
                >
                  <p className="text-[9px] sm:text-[9px] font-medium tracking-[0.14em] sm:tracking-[0.22em] uppercase text-ink-500 leading-tight">
                    {a.label}
                  </p>
                  <p className="mt-1 sm:mt-1.5 font-serif text-[12px] sm:text-[14px] leading-tight tracking-[-0.005em] text-warm-deep">
                    {a.value}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/teacher"
              className="mt-6 sm:mt-9 inline-flex min-h-[44px] items-center gap-2 text-[13px] sm:text-[13.5px] text-ink-900 transition hover:text-brand-deep"
            >
              講師紹介を詳しく見る
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </Section>
      </div>

      {/* COMPARISON は構造化・差別化のため desktop only に温存 */}
      <div className="hidden cv-auto sm:block">
        <ComparisonTable />
      </div>

      {/* ============================================================
          ここから「教材＋体験では足りなかった方」向けの週次サポート枠
          ============================================================ */}

      {/* 共感 — 教材だけでは詰まる典型的な 3 つのつまずき */}
      <div className="cv-auto">
        <PainPointsSection />
      </div>

      {/* 学習サポート（週次） — 体験のあと続けて伴走が必要な方向け */}
      <div className="cv-auto">
        <SupportTierSection />
      </div>

      {/* オンライン優位性 — サポート対象者向けに、深掘りはデスクトップのみ */}
      <div className="hidden cv-auto sm:block">
        <OnlineSection />
      </div>

      {/* 指導モデルケース — サポートを検討中の人向け */}
      <div className="cv-auto">
        <Testimonials />
      </div>

      {/* 不安解消 — モバイルでも見せるミニ FAQ */}
      <div className="cv-auto">
        <MiniFaq />
      </div>

      {/* 安心ポリシー — Zoom / 回数割返金 / 機材トラブル対応 */}
      <div className="cv-auto">
        <SafetyPolicySection />
      </div>

      {/* ARTICLES — コンパクトな見出しリスト（desktop only）
          学習コラムは SEO とブランドの厚みのため残すが、フル幅 4 カードはトップでは重い。
          見出し＋日付の控えめなリスト + 全件リンクに圧縮し、必要な人だけが辿れる形にする。 */}
      <div className="hidden cv-auto sm:block">
        <section aria-labelledby="articles-teaser-heading" className="border-y border-ink-900/[0.06] bg-paper">
          <div className="container py-12 sm:py-16">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
              <div>
                <p className="flex flex-wrap items-center gap-x-2 text-[10px] font-medium uppercase tracking-[0.28em] text-brand-deep before:inline-block before:h-px before:w-5 before:bg-current before:opacity-50">
                  INSIGHTS — 物理学習コラム
                </p>
                <h2
                  id="articles-teaser-heading"
                  className="mt-3 font-serif text-[1.45rem] sm:text-[1.7rem] leading-[1.35] tracking-[-0.012em] text-ink-900"
                >
                  プリントの裏側を、すこし長めに。
                </h2>
              </div>
              <Link
                href="/articles"
                className="self-start inline-flex items-center gap-1.5 rounded-full border border-ink-900/15 bg-white/80 px-4 py-2.5 text-[13px] text-ink-800 backdrop-blur transition hover:border-ink-900/30 hover:bg-white sm:self-end"
              >
                すべてのコラムを見る
                <ArrowRight className="h-3.5 w-3.5 opacity-60" />
              </Link>
            </div>

            <ul className="mt-6 sm:mt-7 divide-y divide-ink-900/[0.07] rounded-2xl border border-ink-900/[0.07] bg-white/85 backdrop-blur-sm">
              {latestArticles.slice(0, 4).map((a) => {
                const isExternal = Boolean(a.externalUrl);
                const href = articleHref(a);
                const inner = (
                  <div className="group flex items-center gap-4 px-5 py-4 sm:px-6 sm:py-4 transition hover:bg-paper-soft/60">
                    <span className="inline-flex w-[78px] shrink-0 text-[9.5px] font-medium uppercase tracking-[0.22em] text-brand-deep">
                      {a.category}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block font-serif text-[14px] sm:text-[14.5px] leading-[1.55] text-ink-900 line-clamp-1">
                        {a.title}
                      </span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11.5px] text-ink-500 shrink-0">
                      {a.readingTime}
                      {isExternal ? (
                        <ArrowUpRight className="h-3 w-3 opacity-60 transition group-hover:-translate-y-0.5" />
                      ) : (
                        <ArrowRight className="h-3 w-3 opacity-60 transition group-hover:translate-x-0.5" />
                      )}
                    </span>
                  </div>
                );
                return (
                  <li key={a.slug}>
                    {isExternal ? (
                      <a href={href} target="_blank" rel="noopener noreferrer">
                        {inner}
                      </a>
                    ) : (
                      <Link href={href}>{inner}</Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </div>

      {/* 最終 CTA（プリント主導の copy で締める） */}
      <div className="cv-auto">
        <CtaBlock />
      </div>

      {/* スピリットの締め — デスクトップのみ */}
      <div className="hidden cv-auto sm:block">
        <Section className="py-24 text-center bg-paper">
          <div className="mx-auto flex max-w-xl flex-col items-center">
            <span
              aria-hidden
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-warm-bg ring-1 ring-warm/30"
            >
              <Sparkles className="h-4 w-4 text-warm-deep" aria-hidden strokeWidth={1.6} />
            </span>
            <p className="mt-7 font-serif text-[1.5rem] tracking-[-0.012em] text-ink-900 leading-relaxed">
              物理を、<span className="text-warm-deep">わかる</span>に変える。
            </p>
            <p className="mt-4 text-[14px] leading-[1.85] text-ink-600">
              まずは 1 単元、自分のペースで。
            </p>
          </div>
        </Section>
      </div>

      <JsonLdGraph
        id="ld-graph-home"
        nodes={[
          breadcrumbJsonLd([{ name: "ホーム", href: "/" }]),
          webPageJsonLd({
            name: `${siteConfig.name} ｜ 高校物理 演習プリント・解説 PDF・参考書`,
            description: siteConfig.description,
            path: "/",
          }),
          itemListJsonLd({
            name: `${siteConfig.name} の主要サポート`,
            description:
              "Solvora Learning Lab の演習プリント・参考書で進めても一人では難しい方向けに、森祐太による個別の学習サポート（体験授業・分野別講座）を用意しています。",
            path: "/",
            items: visibleCourses().map((course) => ({
              name: course.title,
              href: `/courses/${course.slug}`,
              description: course.summary,
            })),
          }),
        ]}
      />
    </>
  );
}
