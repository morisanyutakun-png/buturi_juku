import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Atom,
  BookMarked,
  Brain,
  Compass,
  GraduationCap,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import { Hero } from "@/components/hero";
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
import { WhiteboardFlow } from "@/components/whiteboard-flow";
import { PullQuote } from "@/components/pull-quote";
import { PricePreview } from "@/components/price-preview";
import { courses } from "@/data/courses";
import { articles, articleHref } from "@/data/articles";
import { instructor } from "@/data/instructor";
import { siteConfig } from "@/data/site";
import { breadcrumbJsonLd, itemListJsonLd, webPageJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "高校物理専門塾「物理の森」| オンライン全国対応・大学受験物理の個別指導",
  description:
    "高校物理専門塾「物理の森」は、高校物理・大学受験物理だけを扱うオンライン専門塾です。名古屋大学 工学部 電気電子情報工学科所属・大学受験物理の書籍執筆実績を持つ森祐太が、高校物理の初学者から難関大・医学部志望まで1対1で個別指導。全国どこからでも、高校物理専門塾の指導が受けられます。",
  path: "/",
  keywords: [
    "高校物理専門塾",
    "高校物理専門塾 オンライン",
    "高校物理専門塾 個別指導",
    "高校物理専門塾 大学受験",
    "高校物理 オンライン 専門塾",
    "高校物理 個別指導",
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
    description:
      "総合塾ではなく物理専門塾。全5分野を体系的に、本質まで踏み込んだ授業で扱います。",
    tone: "brand",
  },
  {
    icon: Brain,
    title: "暗記ではなく理解",
    description:
      "公式に当てはめる学習から卒業し、『なぜそう立式するのか』を語れる状態を目指します。",
    tone: "warm",
  },
  {
    icon: Target,
    title: "志望校から逆算",
    description:
      "残り期間と出題傾向から、投資対効果の高い分野・単元に学習を集中させます。",
    tone: "forest",
  },
  {
    icon: Users,
    title: "完全1対1指導",
    description:
      "講師は固定制。あなたの思考のクセと分野別の苦手に、ピンポイントで介入します。",
    tone: "brand",
  },
  {
    icon: BookMarked,
    title: "書籍出版実績のある講師",
    description:
      "大学受験物理の書籍を手がけた主宰講師が、すべての生徒のカリキュラムを設計します。",
    tone: "gold",
  },
  {
    icon: Compass,
    title: "オンラインで全国対応",
    description:
      "双方向のライブ授業。地方在住・海外在住の受験生もそのまま受講できます。",
    tone: "warm",
  },
];

const teachingSteps = [
  {
    step: "01",
    label: "言語化",
    title: "現象を、自分の言葉で説明できるようにする",
    body: "公式の前に、何が起きているかを日本語で語れるか。図と矢印で現象を捉える訓練からはじめます。",
    accent: "text-brand-deep",
  },
  {
    step: "02",
    label: "立式",
    title: "言語化したものを、数式に翻訳する",
    body: "系の選び方、座標の取り方、力の列挙、立式。この順序を機械的になぞれる状態を作ります。",
    accent: "text-warm-deep",
  },
  {
    step: "03",
    label: "演習",
    title: "立式の型を、実戦で固める",
    body: "標準問題で型を固め、過去問で志望校の出題傾向に合わせて磨き込みます。",
    accent: "text-forest-deep",
  },
];

const subjects = [
  { name: "力学", kana: "りきがく", description: "運動方程式・保存則・円運動・単振動・剛体", accent: "text-brand-deep" },
  { name: "電磁気", kana: "でんじき", description: "電場・電位・磁場・電磁誘導・交流回路", accent: "text-warm-deep" },
  { name: "波動", kana: "はどう", description: "波の基本式・干渉・屈折・ドップラー・光の現象", accent: "text-forest-deep" },
  { name: "熱力学", kana: "ねつりきがく", description: "気体の状態方程式・熱力学第一法則・熱機関", accent: "text-gold-deep" },
  { name: "原子", kana: "げんし", description: "光電効果・原子モデル・原子核・素粒子の基礎", accent: "text-brand-deep" },
];

const flow = [
  {
    step: "01",
    title: "無料体験授業のお申し込み",
    description: "Webフォームから3分でお申し込みいただけます。日程候補を複数お送りください。",
  },
  {
    step: "02",
    title: "体験授業(60分)",
    description: "現在の理解度ヒアリング、診断ミニ授業、学習戦略のご提案までをその場で行います。",
  },
  {
    step: "03",
    title: "カリキュラム設計",
    description: "志望校・現状・残り期間から、投資対効果の高いカリキュラムをオーダーメイドで作成します。",
  },
  {
    step: "04",
    title: "受講開始・週次PDCA",
    description: "毎週の授業で理解度を確認しながら、小刻みに軌道修正。最後まで伴走します。",
  },
];

export default function HomePage() {
  const featuredCourses = courses.filter((c) => c.slug !== "trial").slice(0, 4);
  const latestArticles = articles.slice(0, 4);

  return (
    <>
      <Hero />

      {/* KEYWORD LEAD — primary SEO anchor */}
      <section
        aria-labelledby="lead-heading"
        className="border-b border-ink-900/[0.06] bg-paper"
      >
        <div className="container py-12 sm:py-16">
          <p className="text-[11px] sm:text-[10px] font-medium tracking-[0.28em] sm:tracking-[0.32em] uppercase text-brand-deep">
            HIGH-SCHOOL PHYSICS SPECIALTY
          </p>
          <h2
            id="lead-heading"
            className="mt-5 max-w-3xl font-serif text-[1.7rem] leading-[1.6] tracking-[-0.012em] text-ink-900 sm:text-[1.85rem] sm:leading-[1.55]"
          >
            <span className="text-brand-deep">高校物理が苦手な受験生</span>を、
            <br className="sm:hidden" />
            <span className="text-warm-deep">得点源</span>まで引き上げる、
            オンライン高校物理専門塾。
          </h2>
          <p className="mt-7 sm:mt-6 max-w-3xl text-[16px] sm:text-[15px] leading-[2.05] sm:leading-[1.95] text-ink-700">
            高校物理専門塾「物理の森」は、<strong className="font-medium text-ink-900">高校物理が苦手で止まっている受験生</strong>を、得点源まで引き上げることに特化したオンライン専門塾です。高校物理だけを扱うので、『公式に当てはめる物理』ではなく『現象から立式できる物理』に組み直すところまで、最後の一歩まで伴走します。初学者から共通テスト・難関大・医学部の大学受験物理志望者まで、力学・電磁気・波動・熱力学・原子の全分野を体系的にカバーします。
          </p>
        </div>
      </section>

      <div className="cv-auto">
        {/* MANIFESTO — dark contrast pivot */}
        <ManifestoBand />

        {/* PROOF — giant numbers showcase */}
        <ProofShowcase />

        {/* PRICE PREVIEW — surface fees on TOP */}
        <PricePreview />

        {/* FOR EVERYONE */}
        <ForEveryoneSection />

        <SeoIntentSection />
      </div>

      <div className="cv-auto">
      {/* SUBJECTS */}
      <Section
        eyebrow="SUBJECTS"
        title="高校物理専門塾として、高校物理の全分野を体系的に"
        description="高校物理専門塾の指導は、単元ごとに分断して教えるのではなく、分野をまたぐ共通構造から組み立てます。力学・電磁気・波動・熱力学・原子の5分野を、1人の専門講師が一貫して扱います。"
        className="bg-paper-soft"
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {subjects.map((s, i) => (
            <div
              key={s.name}
              className="group relative overflow-hidden rounded-3xl border border-ink-900/[0.07] bg-white/85 p-7 sm:p-7 shadow-soft backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-ink-900/[0.12] hover:shadow-card"
            >
              <span className="font-mono text-[12px] sm:text-[11px] text-ink-400">
                0{i + 1}
              </span>
              <h3 className={`mt-5 font-serif text-[1.75rem] sm:text-[1.6rem] tracking-[-0.012em] ${s.accent}`}>{s.name}</h3>
              <p className="mt-2 text-[11px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.22em] uppercase text-ink-500">
                {s.kana}
              </p>
              <p className="mt-5 text-[14px] sm:text-[12.5px] leading-[2] sm:leading-[1.75] text-ink-600">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* PHILOSOPHY */}
      <PhilosophySection />

      {/* WHITEBOARD —授業設計図 */}
      <WhiteboardFlow />

      {/* FEATURES */}
      <Section
        eyebrow="WHY HIGH-SCHOOL PHYSICS SPECIALTY"
        title={<>高校物理専門塾を選ぶ、<br className="sm:hidden" />6つの理由。</>}
        description="高校物理を伸ばす近道は、高校物理だけを深く教える環境にいることです。総合塾では実現しにくい、高校物理専門塾としての価値をお伝えします。"
        className="bg-paper"
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
        description="どの分野・どのレベルでも、授業の組み立てはこの3ステップで一貫しています。問題を解く前に、現象が自分の言葉で語れるか。語れたら、機械的に立式できるか。立式できたら、実戦の型が固まっているか。"
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

        <div className="mt-10 rounded-3xl border border-ink-900/[0.07] bg-paper-soft/70 p-7 sm:p-8">
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div>
              <p className="text-[11px] sm:text-[10px] font-medium tracking-[0.28em] sm:tracking-[0.32em] uppercase text-warm-deep">
                FIRST 30 MIN
              </p>
              <p className="mt-4 sm:mt-3 font-serif text-[1.25rem] sm:text-[1.15rem] leading-[1.6] sm:leading-snug tracking-[-0.008em] text-ink-900">
                体験授業の冒頭30分は、現状ヒアリングに使います。
              </p>
              <p className="mt-3 sm:mt-2 text-[14.5px] sm:text-[13px] leading-[2] sm:leading-[1.8] text-ink-600">
                模試・志望校・使用教材・つまずきを丁寧に整理してから、診断ミニ授業に進みます。
              </p>
            </div>
            <Link
              href="/trial"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-ink-900/[0.12] bg-white/80 px-5 py-3.5 sm:py-3 text-[14px] sm:text-[13px] text-ink-800 backdrop-blur transition hover:border-ink-900/30 hover:bg-white min-h-[48px] sm:min-h-0"
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

      <div className="cv-auto">
      {/* PULL QUOTE — emotional pivot */}
      <PullQuote />

      {/* BOOK */}
      <BookShowcase />
      </div>

      {/* TEACHER */}
      <Section
        eyebrow="INSTRUCTOR"
        title="講師紹介"
        description="書籍を手がけた主宰講師が、体験授業からカリキュラム設計・授業まですべてを担当します。"
        className="bg-paper"
      >
        <div className="grid gap-12 rounded-[2rem] border border-ink-900/[0.07] bg-white/85 p-10 shadow-card backdrop-blur-sm md:grid-cols-[1fr_1.4fr] md:p-16">
          <InstructorPortrait />
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.32em] text-brand-deep">
              <GraduationCap className="h-3.5 w-3.5" aria-hidden strokeWidth={1.6} />
              PROFILE
            </div>
            <h3 className="mt-5 font-serif text-display-md tracking-[-0.012em] text-ink-900">
              初学者にも、難関大志望にも、<br className="sm:hidden" />
              あなた専用のルートを。
            </h3>
            <p className="mt-7 text-[15px] leading-[1.85] text-ink-600">
              名古屋大学 工学部 電気電子情報工学科で電磁気を専門領域として扱いながら、塾講師として大学受験物理の指導にあたる。自身も共通テスト物理 満点・二次試験物理 9割を達成し、これまでの指導で<strong className="text-warm-deep font-medium">名古屋大学合格生</strong>も輩出。書籍執筆の経験とあわせ、一人ひとりに合わせた学習ルートを設計します。
            </p>

            <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-ink-900/[0.07] bg-ink-900/[0.06] sm:grid-cols-4">
              {instructor.achievements.map((a) => (
                <div
                  key={a.label}
                  className="bg-paper/85 p-4 text-center"
                >
                  <p className="text-[9px] font-medium tracking-[0.22em] uppercase text-ink-500">
                    {a.label}
                  </p>
                  <p className="mt-1.5 font-serif text-[14px] tracking-[-0.005em] text-warm-deep">
                    {a.value}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/teacher"
              className="mt-9 inline-flex items-center gap-2 text-[13.5px] text-ink-900 transition hover:text-brand-deep"
            >
              講師紹介を詳しく見る
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </Section>

      {/* COURSES */}
      <Section
        eyebrow="COURSES"
        title="主な講座"
        description="個別指導を軸に、志望校や目的に合わせた集中講座をご用意しています。"
        className="bg-paper-soft"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {featuredCourses.map((c) => (
            <Link
              key={c.slug}
              href={`/courses/${c.slug}`}
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-ink-900/[0.07] bg-white/85 p-7 sm:p-9 shadow-soft backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-ink-900/[0.12] hover:shadow-card"
            >
              <div>
                <p className="text-[11px] sm:text-[10px] font-medium tracking-[0.24em] sm:tracking-[0.28em] uppercase text-brand-deep">
                  {c.category}
                </p>
                <h3 className="mt-5 font-serif text-[1.7rem] sm:text-[1.55rem] tracking-[-0.012em] leading-[1.4] text-ink-900">
                  {c.title}
                </h3>
                <p className="mt-3 text-[14.5px] sm:text-[13.5px] leading-[1.65] text-ink-600">{c.subtitle}</p>
                <p className="mt-6 sm:mt-7 text-[15px] sm:text-[14px] leading-[2] sm:leading-[1.8] text-ink-600">
                  {c.summary}
                </p>
              </div>
              <div className="mt-8 sm:mt-9 flex items-center justify-between text-[14px] sm:text-[13px]">
                <span className="text-ink-500">{c.duration}</span>
                <span className="inline-flex items-center gap-1.5 text-ink-900 transition-transform duration-300 group-hover:translate-x-0.5">
                  高校物理専門塾のコース詳細を見る
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 rounded-full border border-ink-900/[0.12] bg-white/70 px-6 py-3.5 text-[13.5px] text-ink-800 backdrop-blur transition hover:border-ink-900/30 hover:bg-white"
          >
            高校物理専門塾の講座を見る
            <ArrowRight className="h-3.5 w-3.5 opacity-60" />
          </Link>
        </div>
      </Section>

      <div className="cv-auto">
      {/* TESTIMONIALS */}
      <Testimonials />

      {/* FLOW */}
      <Section
        eyebrow="HOW IT WORKS"
        title="受講の流れ"
        description="お申し込みから受講開始までの流れはシンプルです。"
        className="bg-paper-soft"
      >
        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {flow.map((s) => (
            <li
              key={s.step}
              className="group relative overflow-hidden rounded-3xl border border-ink-900/[0.07] bg-white/85 p-7 sm:p-8 shadow-soft backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-ink-900/[0.12] hover:shadow-card"
            >
              <p className="font-mono text-[12px] sm:text-[10.5px] tracking-[0.18em] text-warm-deep">
                STEP {s.step}
              </p>
              <h3 className="mt-5 font-serif text-[1.25rem] sm:text-[1.15rem] leading-[1.55] sm:leading-snug tracking-[-0.008em] text-ink-900">
                {s.title}
              </h3>
              <p className="mt-4 text-[15px] sm:text-[13.5px] leading-[2] sm:leading-[1.8] text-ink-600">
                {s.description}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ARTICLES */}
      <Section
        eyebrow="INSIGHTS"
        title="物理学習コラム"
        description="物理の学び方・分野別の躓き方・受験戦略について、現場から発信します。"
        className="bg-paper"
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {latestArticles.map((a) => {
            const isExternal = Boolean(a.externalUrl);
            const href = articleHref(a);
            const className =
              "group flex h-full flex-col justify-between rounded-3xl border border-ink-900/[0.07] bg-white/85 p-7 sm:p-7 shadow-soft backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-ink-900/[0.12] hover:shadow-card";

            const inner = (
              <>
                <div>
                  <div className="flex items-center gap-2 text-[11px] sm:text-[10px] font-medium tracking-[0.24em] sm:tracking-[0.28em] uppercase text-brand-deep">
                    <span>{a.category}</span>
                    {isExternal && (
                      <span className="inline-flex items-center gap-0.5 rounded-full border border-ink-900/[0.08] bg-paper px-1.5 py-0.5 text-[9.5px] sm:text-[8.5px] tracking-[0.18em] text-ink-500 normal-case">
                        yuta-eng
                        <ArrowUpRight className="h-2 w-2" />
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 font-serif text-[1.15rem] sm:text-[1.05rem] leading-[1.55] sm:leading-snug tracking-[-0.005em] text-ink-900">
                    {a.title}
                  </h3>
                  <p className="mt-4 sm:mt-3.5 text-[14.5px] sm:text-[13px] leading-[1.95] sm:leading-[1.75] text-ink-600 line-clamp-4">
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

      <CtaBlock />

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

      <JsonLdGraph
        id="ld-graph-home"
        nodes={[
          breadcrumbJsonLd([{ name: "ホーム", href: "/" }]),
          webPageJsonLd({
            name: `高校物理専門塾「${siteConfig.name}」| オンライン全国対応・大学受験物理の個別指導`,
            description: siteConfig.description,
            path: "/",
          }),
          itemListJsonLd({
            name: "高校物理専門塾「物理の森」の主要講座",
            description:
              "高校物理専門塾として、大学受験物理・高校物理に対応するオンライン講座の一覧です。",
            path: "/",
            items: courses.map((course) => ({
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
