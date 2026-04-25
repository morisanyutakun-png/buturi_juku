import Link from "next/link";
import {
  ArrowRight,
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
import { JsonLd } from "@/components/json-ld";
import { SeoIntentSection } from "@/components/seo-intent-section";
import { courses } from "@/data/courses";
import { articles } from "@/data/articles";
import { instructor } from "@/data/instructor";
import { siteConfig } from "@/data/site";
import { itemListJsonLd, webPageJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "大学受験物理のオンライン専門塾",
  description:
    "大学受験物理・高校物理に特化したオンライン物理専門塾。名古屋大学 工学部 電気電子情報工学科所属の森祐太が、初学者から難関大・医学部志望まで1対1で指導します。",
  path: "/",
  keywords: [
    "大学受験 物理 塾",
    "高校物理 オンライン",
    "物理 個別指導 オンライン",
    "医学部 物理 対策",
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
      "Zoomベースの双方向授業。地方在住・海外在住の受験生もそのまま受講できます。",
    tone: "warm",
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

      {/* STATS RIBBON */}
      <section className="border-b border-ink-900/[0.06] bg-white/60 backdrop-blur-sm">
        <div className="container grid grid-cols-2 divide-y divide-ink-900/[0.06] md:grid-cols-4 md:divide-x md:divide-y-0">
          {[
            { k: "共通テスト 物理", v: "満点", s: "講師の受験実績", color: "text-warm-deep" },
            { k: "二次試験 物理", v: "9割", s: "難関大レベル", color: "text-brand-deep" },
            { k: "指導実績", v: "名大合格生を輩出", s: "塾講師としての実績", color: "text-forest-deep" },
            { k: "対応エリア", v: "全国 Online", s: "初学者〜難関大まで", color: "text-brand-deep" },
          ].map((x) => (
            <div key={x.k} className="px-5 py-8 text-center md:py-10">
              <p className="text-[10px] font-medium tracking-[0.28em] uppercase text-ink-500">
                {x.k}
              </p>
              <p className={`mt-3.5 font-serif text-[1.4rem] tracking-[-0.012em] md:text-[1.55rem] ${x.color}`}>
                {x.v}
              </p>
              <p className="mt-1.5 text-[11.5px] text-ink-600">{x.s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOR EVERYONE */}
      <ForEveryoneSection />

      <SeoIntentSection />

      {/* SUBJECTS */}
      <Section
        eyebrow="SUBJECTS"
        title="高校物理の全分野を、体系的に"
        description="単元ごとに分断して教えるのではなく、分野をまたぐ共通構造から指導します。"
        className="bg-paper-soft"
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {subjects.map((s, i) => (
            <div
              key={s.name}
              className="group relative overflow-hidden rounded-3xl border border-ink-900/[0.07] bg-white/85 p-7 shadow-soft backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-ink-900/[0.12] hover:shadow-card"
            >
              <span className="font-mono text-[11px] text-ink-400">
                0{i + 1}
              </span>
              <h3 className={`mt-5 font-serif text-[1.6rem] tracking-[-0.012em] ${s.accent}`}>{s.name}</h3>
              <p className="mt-1.5 text-[10px] tracking-[0.22em] uppercase text-ink-500">
                {s.kana}
              </p>
              <p className="mt-5 text-[12.5px] leading-[1.75] text-ink-600">
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
        eyebrow="WHY PHYSICS ACADEMY"
        title={<>物理専門塾である、<br className="sm:hidden" />6つの理由。</>}
        description="物理を伸ばす近道は、物理だけを深く教える環境にいること。総合塾では実現しにくい、専門塾としての価値をお伝えします。"
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

      {/* COMPARISON */}
      <ComparisonTable />

      {/* BOOK */}
      <BookShowcase />

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
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-ink-900/[0.07] bg-white/85 p-9 shadow-soft backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-ink-900/[0.12] hover:shadow-card"
            >
              <div>
                <p className="text-[10px] font-medium tracking-[0.28em] uppercase text-brand-deep">
                  {c.category}
                </p>
                <h3 className="mt-5 font-serif text-[1.55rem] tracking-[-0.012em] text-ink-900">
                  {c.title}
                </h3>
                <p className="mt-2.5 text-[13.5px] text-ink-600">{c.subtitle}</p>
                <p className="mt-7 text-[14px] leading-[1.8] text-ink-600">
                  {c.summary}
                </p>
              </div>
              <div className="mt-9 flex items-center justify-between text-[13px]">
                <span className="text-ink-500">{c.duration}</span>
                <span className="inline-flex items-center gap-1.5 text-ink-900 transition-transform duration-300 group-hover:translate-x-0.5">
                  詳しく見る
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
            講座一覧をすべて見る
            <ArrowRight className="h-3.5 w-3.5 opacity-60" />
          </Link>
        </div>
      </Section>

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
              className="group relative overflow-hidden rounded-3xl border border-ink-900/[0.07] bg-white/85 p-8 shadow-soft backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-ink-900/[0.12] hover:shadow-card"
            >
              <p className="font-mono text-[10.5px] tracking-[0.18em] text-warm-deep">
                STEP {s.step}
              </p>
              <h3 className="mt-5 font-serif text-[1.15rem] tracking-[-0.008em] text-ink-900">
                {s.title}
              </h3>
              <p className="mt-4 text-[13.5px] leading-[1.8] text-ink-600">
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
          {latestArticles.map((a) => (
            <Link
              key={a.slug}
              href={`/articles/${a.slug}`}
              className="group flex h-full flex-col justify-between rounded-3xl border border-ink-900/[0.07] bg-white/85 p-7 shadow-soft backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-ink-900/[0.12] hover:shadow-card"
            >
              <div>
                <p className="text-[10px] font-medium tracking-[0.28em] uppercase text-brand-deep">
                  {a.category}
                </p>
                <h3 className="mt-4 font-serif text-[1.05rem] leading-snug tracking-[-0.005em] text-ink-900">
                  {a.title}
                </h3>
                <p className="mt-3.5 text-[13px] leading-[1.75] text-ink-600 line-clamp-4">
                  {a.description}
                </p>
              </div>
              <p className="mt-6 inline-flex items-center gap-1.5 text-[12px] text-ink-900 transition-transform duration-300 group-hover:translate-x-0.5">
                続きを読む
                <ArrowRight className="h-3 w-3" />
              </p>
            </Link>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 rounded-full border border-ink-900/[0.12] bg-white/70 px-6 py-3.5 text-[13.5px] text-ink-800 backdrop-blur transition hover:border-ink-900/30 hover:bg-white"
          >
            コラム一覧を見る
            <ArrowRight className="h-3.5 w-3.5 opacity-60" />
          </Link>
        </div>
      </Section>

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

      <JsonLd
        id="ld-webpage-home"
        data={webPageJsonLd({
          name: `${siteConfig.name} | 大学受験物理のオンライン専門塾`,
          description: siteConfig.description,
          path: "/",
        })}
      />
      <JsonLd
        id="ld-home-courses"
        data={itemListJsonLd({
          name: "物理の森の主要講座",
          description: "大学受験物理・高校物理に対応するオンライン講座の一覧です。",
          path: "/",
          items: courses.map((course) => ({
            name: course.title,
            href: `/courses/${course.slug}`,
            description: course.summary,
          })),
        })}
      />
    </>
  );
}
