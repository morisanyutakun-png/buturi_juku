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
    "Solvora Learning Lab は、高校物理の演習プリント・解説 PDF・参考書をひとつの棚にまとめた学習リソースです。力学・電磁気・波動・熱・原子の典型問題を Web プレビュー＋印刷向け PDF＋解答解説まで無料公開。さらに講師作の参考書『考える力を育てる』全 6 冊で全分野を体系的に読み通せます。一人で進めるのが難しい方には個別の学習サポート（体験授業・分野別講座）もご用意。",
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
          TOP PAGE — 教材棚を主役にした構成（2026.05 リブランド）
          順序: Hero → 演習プリント → 参考書 → note 有料 PDF → 信頼
               → 講師 → 共感 → 学習サポート → 不安解消 → 締めの CTA
          「Google 広告／SEO → /prints → プリント・解説 PDF → KDP 参考書
           → 必要な人だけ学習サポート」という導線を、TOP でも再現する。
          ============================================================ */}

      {/* FV — プリント主導コピー + 参考書サブ CTA + 学習サポート soft link */}
      <Hero />

      {/* 1. 教材棚（無料プリント） — Hero 直下に「実物」を見せる主役セクション */}
      <div className="cv-auto">
        <PrintsTeaser />
      </div>

      {/* 2. 参考書 6 冊 — プリントから KDP 本へ自然に橋渡し */}
      <div className="cv-auto">
        <BookCoversStrip />
      </div>

      {/* 3. note の有料プリント — 「もっと欲しい人向け」の単発 PDF 導線 */}
      <div className="cv-auto">
        <NotePromoSection />
      </div>

      {/* 4. 信頼 — 教材をつくっている人の実績ストリップ */}
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
          title="高校物理 全 5 分野、教材棚で網羅。"
          description="演習プリントと参考書 6 冊で、力学・電磁気・波動・熱・原子をひとつの視座から読み通せます。"
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
          ここから「教材だけでは届かない人」へのソフトな分岐
          ============================================================ */}

      {/* 共感 — 教材だけでは詰まる典型的な3つのつまずき */}
      <div className="cv-auto">
        <PainPointsSection />
      </div>

      {/* 学習サポート — 「必要な人だけ」を強調した個別指導入口 */}
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

      {/* ARTICLES — 学習コラム（教材棚の延長としての読み物） */}
      <div className="hidden cv-auto sm:block">
      <Section
        eyebrow="INSIGHTS"
        title="物理学習コラム"
        description="プリントと参考書の補助として、単元の考え方・解法の構造を読み物として整理しています。"
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
              教材棚を開いて、自分のペースから。
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
