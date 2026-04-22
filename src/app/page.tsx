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
import { courses } from "@/data/courses";
import { articles } from "@/data/articles";
import { instructor } from "@/data/instructor";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "トップ",
  path: "/",
});

const features = [
  {
    icon: Atom,
    title: "物理だけを、深く",
    description:
      "総合塾ではなく物理専門塾。全5分野を体系的に、本質まで踏み込んだ授業で扱います。",
  },
  {
    icon: Brain,
    title: "暗記ではなく理解",
    description:
      "公式に当てはめる学習から卒業し、『なぜそう立式するのか』を語れる状態を目指します。",
  },
  {
    icon: Target,
    title: "志望校から逆算",
    description:
      "残り期間と出題傾向から、投資対効果の高い分野・単元に学習を集中させます。",
  },
  {
    icon: Users,
    title: "完全1対1指導",
    description:
      "講師は固定制。あなたの思考のクセと分野別の苦手に、ピンポイントで介入します。",
  },
  {
    icon: BookMarked,
    title: "書籍出版実績のある講師",
    description:
      "大学受験物理の書籍を手がけた主宰講師が、すべての生徒のカリキュラムを設計します。",
  },
  {
    icon: Compass,
    title: "オンラインで全国対応",
    description:
      "Zoomベースの双方向授業。地方在住・海外在住の受験生もそのまま受講できます。",
  },
];

const subjects = [
  { name: "力学", kana: "りきがく", description: "運動方程式・保存則・円運動・単振動・剛体" },
  { name: "電磁気", kana: "でんじき", description: "電場・電位・磁場・電磁誘導・交流回路" },
  { name: "波動", kana: "はどう", description: "波の基本式・干渉・屈折・ドップラー・光の現象" },
  { name: "熱力学", kana: "ねつりきがく", description: "気体の状態方程式・熱力学第一法則・熱機関" },
  { name: "原子", kana: "げんし", description: "光電効果・原子モデル・原子核・素粒子の基礎" },
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
  const latestArticles = articles.slice(0, 3);

  return (
    <>
      <Hero />

      {/* STATS RIBBON */}
      <section className="border-b border-paper/10 bg-navy-900/30">
        <div className="container grid grid-cols-2 divide-paper/10 md:grid-cols-4 md:divide-x">
          {[
            { k: "共通テスト 物理", v: "満点", s: "講師の受験実績", color: "text-gold" },
            { k: "二次試験 物理", v: "9割", s: "難関大レベル", color: "text-accent" },
            { k: "講師の所属", v: "名古屋大学", s: "電気電子情報工学科", color: "text-accent" },
            { k: "対応エリア", v: "全国 Online", s: "初学者〜難関大まで", color: "text-gold" },
          ].map((x) => (
            <div key={x.k} className="px-4 py-6 text-center md:py-8">
              <p className="text-[10px] tracking-[0.28em] uppercase text-paper/40">
                {x.k}
              </p>
              <p className={`mt-3 font-serif text-xl md:text-2xl ${x.color}`}>
                {x.v}
              </p>
              <p className="mt-1 text-[11px] text-paper/50">{x.s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOR EVERYONE */}
      <ForEveryoneSection />

      {/* SUBJECTS */}
      <Section
        eyebrow="SUBJECTS"
        title="高校物理の全分野を、体系的に"
        description="単元ごとに分断して教えるのではなく、分野をまたぐ共通構造から指導します。"
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {subjects.map((s, i) => (
            <div
              key={s.name}
              className="group relative overflow-hidden rounded-2xl border border-paper/10 bg-gradient-to-b from-ink-900/80 to-ink-950 p-6 transition hover:border-accent/40"
            >
              <span className="font-mono text-xs text-paper/40">
                0{i + 1}
              </span>
              <h3 className="mt-4 font-serif text-2xl text-paper">{s.name}</h3>
              <p className="mt-1 text-[11px] tracking-widest uppercase text-paper/40">
                {s.kana}
              </p>
              <p className="mt-4 text-xs leading-relaxed text-paper/60">
                {s.description}
              </p>
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-10 -right-10 h-24 w-24 rounded-full bg-accent/10 opacity-0 blur-2xl transition group-hover:opacity-100"
              />
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

      {/* BOOK — the "lighter" visual break section */}
      <BookShowcase />

      {/* TEACHER */}
      <Section
        eyebrow="INSTRUCTOR"
        title="講師紹介"
        description="書籍を手がけた主宰講師が、体験授業からカリキュラム設計・授業まですべてを担当します。"
      >
        <div className="grid gap-10 rounded-3xl border border-paper/10 bg-gradient-to-br from-navy-900/80 via-ink-900/80 to-ink-950 p-8 md:grid-cols-[1fr_1.4fr] md:p-14">
          <div className="relative flex aspect-[4/5] items-end overflow-hidden rounded-2xl border border-paper/10 bg-navy-800">
            <div
              aria-hidden
              className="absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_30%_20%,rgba(110,168,255,0.4),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(232,197,122,0.25),transparent_60%)]"
            />
            <div className="relative p-8">
              <p className="text-xs tracking-[0.3em] uppercase text-gold">
                Chief Instructor
              </p>
              <p className="mt-3 font-serif text-2xl text-paper">
                {instructor.name}
              </p>
              <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] text-accent">
                <GraduationCap className="h-3 w-3" aria-hidden />
                {instructor.affiliationShort}
              </p>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-accent">
              <GraduationCap className="h-4 w-4" aria-hidden />
              PROFILE
            </div>
            <h3 className="mt-4 font-serif text-display-md text-paper">
              初学者にも、難関大志望にも、<br className="sm:hidden" />
              あなた専用のルートを。
            </h3>
            <p className="mt-6 text-paper/70 leading-relaxed">
              名古屋大学 工学部 電気電子情報工学科で電磁気を専門領域として扱いながら、大学受験物理の指導にも深く携わる。自身も共通テスト物理 満点・二次試験物理 9割を達成。塾講師経験と書籍執筆の経験を背景に、一人ひとりに合わせた学習ルートを設計します。
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-4">
              {instructor.achievements.map((a) => (
                <div
                  key={a.label}
                  className="rounded-xl border border-paper/10 bg-ink-900/60 p-3 text-center"
                >
                  <p className="text-[9px] tracking-[0.22em] uppercase text-paper/50">
                    {a.label}
                  </p>
                  <p className="mt-1 font-serif text-sm text-gold">
                    {a.value}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/teacher"
              className="mt-8 inline-flex items-center gap-2 text-sm text-accent hover:text-accent-soft transition"
            >
              講師紹介を詳しく見る
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>

      {/* COURSES */}
      <Section
        eyebrow="COURSES"
        title="主な講座"
        description="個別指導を軸に、志望校や目的に合わせた集中講座をご用意しています。"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {featuredCourses.map((c) => (
            <Link
              key={c.slug}
              href={`/courses/${c.slug}`}
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-paper/10 bg-ink-900/60 p-8 transition hover:border-accent/40 hover:bg-ink-800/70"
            >
              <div>
                <p className="text-[10px] tracking-[0.28em] uppercase text-accent">
                  {c.category}
                </p>
                <h3 className="mt-4 font-serif text-2xl text-paper">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm text-paper/60">{c.subtitle}</p>
                <p className="mt-6 text-sm leading-relaxed text-paper/70">
                  {c.summary}
                </p>
              </div>
              <div className="mt-8 flex items-center justify-between text-sm">
                <span className="text-paper/60">{c.duration}</span>
                <span className="inline-flex items-center gap-1 text-accent transition group-hover:translate-x-0.5">
                  詳しく見る
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 rounded-full border border-paper/20 px-6 py-3 text-sm text-paper hover:border-accent hover:text-accent transition"
          >
            講座一覧をすべて見る
            <ArrowRight className="h-4 w-4" />
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
        className="bg-ink-900/40"
      >
        <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {flow.map((s) => (
            <li
              key={s.step}
              className="relative rounded-2xl border border-paper/10 bg-ink-900/60 p-8"
            >
              <p className="font-mono text-xs text-accent">STEP {s.step}</p>
              <h3 className="mt-4 font-serif text-lg text-paper">{s.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-paper/70">
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
      >
        <div className="grid gap-6 md:grid-cols-3">
          {latestArticles.map((a) => (
            <Link
              key={a.slug}
              href={`/articles/${a.slug}`}
              className="group flex h-full flex-col justify-between rounded-2xl border border-paper/10 bg-ink-900/60 p-7 transition hover:border-accent/40 hover:bg-ink-800/60"
            >
              <div>
                <p className="text-[10px] tracking-[0.28em] uppercase text-accent">
                  {a.category}
                </p>
                <h3 className="mt-4 font-serif text-lg text-paper leading-snug">
                  {a.title}
                </h3>
                <p className="mt-3 text-sm text-paper/70 leading-relaxed">
                  {a.description}
                </p>
              </div>
              <p className="mt-6 inline-flex items-center gap-1 text-xs text-accent transition group-hover:translate-x-0.5">
                続きを読む
                <ArrowRight className="h-3 w-3" />
              </p>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 rounded-full border border-paper/20 px-6 py-3 text-sm text-paper hover:border-accent hover:text-accent transition"
          >
            コラム一覧を見る
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <CtaBlock />

      <Section className="py-20 text-center">
        <div className="mx-auto flex max-w-xl flex-col items-center">
          <Sparkles className="h-5 w-5 text-gold" aria-hidden />
          <p className="mt-4 font-serif text-xl text-paper leading-relaxed">
            物理を、<span className="text-gold">わかる</span>に変える。
          </p>
          <p className="mt-3 text-sm text-paper/50">
            一人ひとりの『わからない』と、最後まで向き合います。
          </p>
        </div>
      </Section>
    </>
  );
}
