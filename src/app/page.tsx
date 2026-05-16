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
import { AiPrintFigure } from "@/components/ai-print-figure";
import { BookCoversStrip } from "@/components/book-covers-strip";
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
import { PricePreview } from "@/components/price-preview";
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
  title: "Solvora Learning Lab ｜ AI復習プリント付き 高校物理・理系個別指導",
  description:
    "Solvora Learning Lab は、解けなかった1問からその子専用の復習プリントを作る、AI復習プリント付きの高校物理・理系個別指導です。森祐太が作成した物理教材と類題生成 AI「REM」を活用し、つまずきの原因分析、構造理解、類題演習、復習PDF作成まで一貫して支援します（高校物理専門塾としての指導も継続）。",
  path: "/",
  keywords: [
    "Solvora Learning Lab",
    "AI復習プリント",
    "理系個別指導",
    "高校物理 個別指導",
    "高校物理専門塾 オンライン",
    "高校物理専門塾 個別指導",
    "大学受験 物理 専門塾",
    "医学部 物理 専門塾",
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

const flow = [
  {
    step: "01",
    title: "体験授業のお申し込み（¥3,000）",
    description: "Web フォームから 3 分。送信時に Stripe 決済で確定します。",
  },
  {
    step: "02",
    title: "体験授業（60 分）＋ 学習方針の提案",
    description: "事前プリントを送付。当日は苦手調査 → 授業 → 学習方針の提案まで森祐太が担当。",
  },
  {
    step: "03",
    title: "各講座のお申し込み",
    description: "受講したい講座が決まったら、支払いフォームでご入金。当日決める必要はありません。",
  },
  {
    step: "04",
    title: "日程調整 → 受講開始",
    description: "ご都合に合わせて日程を組み、毎週の授業 + AI 復習プリントで伴走します。",
  },
];

export default function HomePage() {
  // 体験以外の `featured` 講座を、データ定義順で並べる。
  // /courses ページや TOP の price-preview と同じ courses.ts を参照することで、
  // タイトル・価格表記がページ間でずれないことを保証する。
  const featuredCourses = visibleCourses().filter(
    (c) => c.featured && c.slug !== "trial",
  );
  const latestArticles = articles.slice(0, 4);

  return (
    <>
      {/* ============================================================
          MOBILE FIRST FUNNEL
          スマホ広告流入想定。「読ませる」のではなく「3秒で判断させる」設計。
          順序（モバイル）: Hero → 何を → 誰向け → 信頼 → 料金 → 流れ → 不安 → 申込
          中ほどに CTA を挟まないことで、最後までの導線を一本化する。
          ============================================================ */}

      {/* FV — H1 + サブ + 本文 + CTA2つ */}
      <Hero />

      {/* 1. 何をしてくれるか — AI復習プリントの 4 ステップ図解
          モバイル fold 直下のため cv-auto でラップ。fold より下にあれば layout/paint を
          スキップ、可視時は通常通り描画（content-visibility: auto の挙動）。 */}
      <div className="cv-auto">
        <AiPrintFigure />
      </div>

      {/* 2. 誰向けか — 3つのつまずき（悩みベースで対象を示す）
          下層は `cv-auto` でラップしてオフスクリーンの layout/paint を
          スキップ。Style&Layout タスクを大幅に削減し、TBT/SI を改善する。 */}
      <div className="cv-auto">
        <PainPointsSection />
      </div>

      {/* 3. 信頼 — 実績ストリップ（共テ100/二次9割/名大/6冊） */}
      <div className="cv-auto">
        <ProofStrip />
      </div>

      {/* 3-b. 信頼 — 講師作の教材6冊を最大の差別化として前面に */}
      <div className="cv-auto">
        <BookCoversStrip />
      </div>

      {/* 3-c. note の有料プリント送客（授業ではなく教材だけ欲しい層への逃げ道） */}
      <div className="cv-auto">
        <NotePromoSection />
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
      {/* SUBJECTS */}
      <Section
        eyebrow="SUBJECTS"
        title="高校物理 全 5 分野を、一貫した視座で"
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

      {/* WhiteboardFlow（4ステップメソッド）は ABOVE-THE-FOLD で表示済みのため、
          ここでは重複を避けて再描画しない。 */}

      {/* FEATURES */}
      <Section
        eyebrow="WHY SOLVORA"
        title="物理専門 × AI 復習プリント、4 つの軸。"
        className="bg-paper"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </Section>

      {/* ONLINE */}
      <OnlineSection />

      {/* TEACHING METHOD */}
      <Section
        eyebrow="TEACHING METHOD"
        title={<>授業は、<br className="sm:hidden" />言語化 → 立式 → 演習。</>}
        description="どの分野でも、授業の組み立てはこの 3 ステップで一貫します。"
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

        <div className="mt-10 rounded-3xl border border-ink-900/[0.07] bg-paper-soft/70 p-6 sm:p-8">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-warm-deep">
                TRIAL FORMAT
              </p>
              <p className="mt-3 font-serif text-[1.1rem] sm:text-[1.15rem] leading-snug tracking-[-0.008em] text-ink-900">
                体験授業では、事前送付したプリントで『言語化 → 立式 → 演習』を 60 分で実体験。
              </p>
            </div>
            <Link
              href="/trial"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-ink-900/[0.12] bg-white/80 px-5 py-3 text-[13px] text-ink-800 backdrop-blur transition hover:border-ink-900/30 hover:bg-white"
            >
              体験授業の流れを見る
              <ArrowRight className="h-3.5 w-3.5 opacity-60" />
            </Link>
          </div>
        </div>
      </Section>

      {/* COMPARISON */}
      <ComparisonTable />
      </div>

      {/* PULL QUOTE / BookShowcase（フル詳細）はデスクトップのみ。
          モバイルでは BookCoversStrip がコンパクトに 6 冊を見せている。 */}
      <div className="hidden cv-auto sm:block">
        <PullQuote />
        <BookShowcase />
      </div>

      {/* TEACHER — cv-auto でオフスクリーン時の layout/paint をスキップ。
          ポートレート + 4セル実績グリッド + 長文 + アイコンを含む重いセクション。 */}
      <div className="cv-auto">
      <Section
        eyebrow="INSTRUCTOR"
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
              初学者にも、難関大志望にも、<br className="sm:hidden" />
              あなた専用のルートを。
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
                <strong className="font-medium text-ink-900">『考える力を育てる』シリーズ全6冊</strong>（力学・電磁気・熱・波動・原子・高校物理I/II）を自ら執筆し、自作教材で授業します。
              </li>
            </ul>
            <p className="mt-6 sm:mt-7 text-[15px] leading-[1.85] text-ink-600 hidden sm:block">
              名古屋大学 工学部 電気電子情報工学科で電磁気を専門領域として扱いながら、塾講師として大学受験物理の指導にあたる。自身も共通テスト物理 満点・二次試験物理 9割を達成。これまでの指導で<strong className="text-warm-deep font-medium">名古屋大学合格者の指導経験</strong>もあります。<strong className="text-ink-900 font-medium">『考える力を育てる』シリーズ（力学・電磁気・熱・波動・原子・高校物理I／II）</strong>を自ら執筆し、授業はこの自作教材を軸に、一人ひとりに合わせた学習ルートを設計します。
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

      {/* COURSES — モバイルでは PricePreview と重複するため非表示。
          デスクトップでは詳細カード（subtitle + summary + 価格 + duration）を見せる。
          cv-auto でオフスクリーン時の layout/paint をスキップ（Lighthouse-Desktop 軽量化）。 */}
      <div className="hidden cv-auto sm:block">
      <Section
        eyebrow="COURSES"
        title="主な講座"
        className="bg-paper-soft"
      >
        <div className="grid gap-3 sm:gap-6 md:grid-cols-2">
          {featuredCourses.map((c) => {
            const isRecommended = c.slug === "electromagnetism";
            return (
            <Link
              key={c.slug}
              href={`/courses/${c.slug}`}
              className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border bg-white/85 p-5 sm:p-9 shadow-soft backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-0.5 hover:shadow-card ${
                isRecommended
                  ? "border-brand/40 ring-2 ring-brand/30 hover:border-brand/60"
                  : "border-ink-900/[0.07] hover:border-ink-900/[0.12]"
              }`}
            >
              {isRecommended && (
                <span className="absolute right-3 top-3 sm:right-5 sm:top-5 inline-flex rounded-full bg-brand px-2.5 sm:px-3 py-0.5 sm:py-1 text-[9.5px] sm:text-[10.5px] font-medium tracking-[0.16em] sm:tracking-[0.2em] text-white">
                  おすすめ
                </span>
              )}
              <div>
                <p className="text-[10px] sm:text-[10px] font-medium tracking-[0.18em] sm:tracking-[0.28em] uppercase text-brand-deep pr-16 sm:pr-20">
                  {c.category}
                </p>
                <h3 className="mt-3 sm:mt-5 font-serif text-[1.25rem] sm:text-[1.55rem] tracking-[-0.012em] leading-[1.35] sm:leading-[1.4] text-ink-900">
                  {c.title}
                </h3>
                <p className="mt-2 sm:mt-3 text-[13px] sm:text-[13.5px] leading-[1.55] sm:leading-[1.65] text-ink-600">{c.subtitle}</p>
                <p className="mt-4 sm:mt-7 text-[13px] sm:text-[14px] leading-[1.85] sm:leading-[1.8] text-ink-600">
                  {c.summary}
                </p>
              </div>
              <div className="mt-5 sm:mt-9 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-0.5 text-[12.5px] sm:text-[12.5px]">
                  <span className="font-serif text-[0.95rem] sm:text-[1rem] text-ink-900">
                    {c.price.value}
                  </span>
                  <span className="text-ink-500">{c.duration}</span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[13px] sm:text-[13px] text-ink-900 transition-transform duration-300 group-hover:translate-x-0.5">
                  コース詳細を見る
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
            );
          })}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 rounded-full border border-ink-900/[0.12] bg-white/70 px-6 py-3.5 text-[13.5px] text-ink-800 backdrop-blur transition hover:border-ink-900/30 hover:bg-white"
          >
            高校物理・理系個別指導の講座を見る
            <ArrowRight className="h-3.5 w-3.5 opacity-60" />
          </Link>
        </div>
      </Section>
      </div>

      {/* TESTIMONIALS — モバイルでも残す（指導モデルケースは信頼補強として軽量） */}
      <div className="cv-auto">
        <Testimonials />
      </div>

      {/* 料金 — 信頼の直後 */}
      <div className="cv-auto">
        <PricePreview />
      </div>

      {/* 受講の流れ — モバイルでも見せる（申込前の最後の不安解消ステップ） */}
      <div className="cv-auto">
        <Section
          eyebrow="HOW IT WORKS"
          title="受講の流れ"
          className="bg-paper-soft"
        >
          <ol className="grid gap-3 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
            {flow.map((s) => (
              <li
                key={s.step}
                className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-ink-900/[0.07] bg-white/85 p-5 sm:p-8 shadow-soft backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-ink-900/[0.12] hover:shadow-card"
              >
                <p className="font-mono text-[10.5px] sm:text-[10.5px] tracking-[0.16em] sm:tracking-[0.18em] text-warm-deep">
                  STEP {s.step}
                </p>
                <h3 className="mt-3 sm:mt-5 font-serif text-[1.05rem] sm:text-[1.15rem] leading-[1.45] sm:leading-snug tracking-[-0.008em] text-ink-900">
                  {s.title}
                </h3>
                <p className="mt-2.5 sm:mt-4 text-[13px] sm:text-[13.5px] leading-[1.85] sm:leading-[1.8] text-ink-600">
                  {s.description}
                </p>
              </li>
            ))}
          </ol>
        </Section>
      </div>

      {/* 不安 — モバイルでも見せるミニ FAQ */}
      <div className="cv-auto">
        <MiniFaq />
      </div>

      {/* 安心ポリシー — Zoom / 回数割返金 / 機材トラブル対応の3点を最終CTA直前に */}
      <div className="cv-auto">
        <SafetyPolicySection />
      </div>

      {/* ARTICLES — デスクトップのみ */}
      <div className="hidden cv-auto sm:block">
      <Section
        eyebrow="INSIGHTS"
        title="物理学習コラム"
        className="bg-paper"
      >
        <div className="grid gap-3 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
          {latestArticles.map((a) => {
            const isExternal = Boolean(a.externalUrl);
            const href = articleHref(a);
            const className =
              "group flex h-full flex-col justify-between rounded-2xl sm:rounded-3xl border border-ink-900/[0.07] bg-white/85 p-5 sm:p-7 shadow-soft backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-ink-900/[0.12] hover:shadow-card";

            const inner = (
              <>
                <div>
                  <div className="flex items-center gap-2 text-[10px] sm:text-[10px] font-medium tracking-[0.18em] sm:tracking-[0.28em] uppercase text-brand-deep">
                    <span>{a.category}</span>
                    {isExternal && (
                      <span className="inline-flex items-center gap-0.5 rounded-full border border-ink-900/[0.08] bg-paper px-1.5 py-0.5 text-[9px] sm:text-[8.5px] tracking-[0.14em] sm:tracking-[0.18em] text-ink-500 normal-case">
                        yuta-eng
                        <ArrowUpRight className="h-2 w-2" />
                      </span>
                    )}
                  </div>
                  <h3 className="mt-3 sm:mt-4 font-serif text-[1rem] sm:text-[1.05rem] leading-[1.45] sm:leading-snug tracking-[-0.005em] text-ink-900">
                    {a.title}
                  </h3>
                  <p className="mt-2.5 sm:mt-3.5 text-[12.5px] sm:text-[13px] leading-[1.75] sm:leading-[1.75] text-ink-600 line-clamp-4">
                    {a.description}
                  </p>
                </div>
                <p className="mt-6 inline-flex items-center gap-1.5 text-[13.5px] sm:text-[12px] text-ink-900 transition-transform duration-300 group-hover:translate-x-0.5">
                  高校物理の学習コラムを読む
                  {isExternal ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowRight className="h-3 w-3" />
                  )}
                </p>
              </>
            );

            return isExternal ? (
              <a
                key={a.slug}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
              >
                {inner}
              </a>
            ) : (
              <Link key={a.slug} href={href} className={className}>
                {inner}
              </Link>
            );
          })}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 rounded-full border border-ink-900/[0.12] bg-white/70 px-6 py-3.5 text-[13.5px] text-ink-800 backdrop-blur transition hover:border-ink-900/30 hover:bg-white"
          >
            高校物理の学習コラム一覧
            <ArrowRight className="h-3.5 w-3.5 opacity-60" />
          </Link>
        </div>
      </Section>
      </div>

      {/* 最終 CTA（モバイル / デスクトップ両方） */}
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
              一人ひとりの『わからない』と、最後まで向き合います。
            </p>
          </div>
        </Section>
      </div>

      <JsonLdGraph
        id="ld-graph-home"
        nodes={[
          breadcrumbJsonLd([{ name: "ホーム", href: "/" }]),
          webPageJsonLd({
            name: `${siteConfig.name} ｜ AI復習プリント付き 高校物理・理系個別指導`,
            description: siteConfig.description,
            path: "/",
          }),
          itemListJsonLd({
            name: `${siteConfig.name} の主要講座`,
            description:
              "Solvora Learning Lab（高校物理専門塾としても運営）が提供する、大学受験物理・高校物理・理系個別指導のオンライン講座一覧です。",
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
