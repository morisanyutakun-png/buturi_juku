import Link from "next/link";
import {
  ArrowRight,
  Atom,
  BookMarked,
  Brain,
  Compass,
  GraduationCap,
  ListChecks,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { Section } from "@/components/section";
import { FeatureCard } from "@/components/feature-card";
import { CtaBlock } from "@/components/cta-block";
import { Container } from "@/components/container";
import { courses } from "@/data/courses";
import { articles } from "@/data/articles";
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

const targetAudiences = [
  "高校物理が苦手で、得点が伸び悩んでいる高校生",
  "医歯薬・理工系志望で、物理を得点源にしたい受験生",
  "数学は得意だが、物理で思うように得点できない人",
  "独学で進めてきたが、行き詰まりを感じている人",
  "総合塾では物理だけを深く見てもらえなかった人",
];

const subjects = [
  { name: "力学", description: "運動方程式・保存則・円運動・単振動・剛体" },
  { name: "電磁気", description: "電場・電位・磁場・電磁誘導・交流回路" },
  { name: "波動", description: "波の基本式・干渉・屈折・ドップラー・光の諸現象" },
  { name: "熱力学", description: "気体の状態方程式・熱力学第一法則・熱機関" },
  { name: "原子", description: "光電効果・原子モデル・原子核・素粒子の基礎" },
];

const flow = [
  {
    step: "01",
    title: "無料体験授業のお申し込み",
    description:
      "Webフォームから3分でお申し込みいただけます。日程候補を複数お送りください。",
  },
  {
    step: "02",
    title: "体験授業(60分)",
    description:
      "現在の理解度ヒアリング、診断ミニ授業、学習戦略のご提案までをその場で行います。",
  },
  {
    step: "03",
    title: "カリキュラム設計",
    description:
      "志望校・現状・残り期間から、投資対効果の高いカリキュラムをオーダーメイドで作成します。",
  },
  {
    step: "04",
    title: "受講開始・週次PDCA",
    description:
      "毎週の授業で理解度を確認しながら、小刻みに軌道修正。最後まで伴走します。",
  },
];

export default function HomePage() {
  const featuredCourses = courses.filter((c) => c.slug !== "trial").slice(0, 4);
  const latestArticles = articles.slice(0, 3);

  return (
    <>
      <Hero />

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

      {/* TARGET */}
      <Section
        eyebrow="FOR WHOM"
        title="このような方が受講されています。"
        description="物理専門塾だからこそ、現状と目標に合わせた『届くレベル』の指導ができます。"
        className="bg-ink-900/40"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {targetAudiences.map((t, i) => (
            <div
              key={t}
              className="flex items-start gap-4 rounded-2xl border border-paper/10 bg-ink-900/60 p-6"
            >
              <span className="font-mono text-sm text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-paper/80 leading-relaxed">{t}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* SUBJECTS */}
      <Section
        eyebrow="SUBJECTS"
        title="指導分野"
        description="高校物理5分野すべてをカバーします。分野別の集中講座でピンポイント補強も可能です。"
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {subjects.map((s, i) => (
            <div
              key={s.name}
              className="relative overflow-hidden rounded-2xl border border-paper/10 bg-gradient-to-b from-ink-900/70 to-ink-950 p-6"
            >
              <span className="font-mono text-xs text-paper/40">
                0{i + 1}
              </span>
              <h3 className="mt-4 font-serif text-xl text-paper">{s.name}</h3>
              <p className="mt-3 text-xs leading-relaxed text-paper/60">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* STYLE */}
      <Section
        eyebrow="TEACHING STYLE"
        title={<>理解から始め、<br className="sm:hidden" />入試本番まで伴走する。</>}
        description="一方的に問題を解かせる授業ではありません。現象の言語化・立式プロセスの共有・つまずきの言語化まで、学習者のOSを書き換えていく授業です。"
        className="bg-navy-900/30"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "現象の言語化",
              body: "その問題で起きていることを、まず日本語で説明できるようにします。数式はその翻訳として後から立ち上がります。",
            },
            {
              title: "立式プロセスの可視化",
              body: "ホワイトボードで立式の順番を逐一示し、『自分の手でも同じ順に書ける』状態まで持っていきます。",
            },
            {
              title: "つまずきの言語化",
              body: "『どこで詰まったか』を毎回言葉にしてもらい、理解のズレを翌週に持ち越しません。",
            },
          ].map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-paper/10 bg-ink-900/60 p-8"
            >
              <h3 className="font-serif text-xl text-paper">{s.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-paper/70">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* TEACHER */}
      <Section
        eyebrow="INSTRUCTOR"
        title="講師紹介"
        description="大学受験物理の書籍を手がけた主宰講師が、すべての授業を担当します。"
      >
        <div className="grid gap-10 rounded-3xl border border-paper/10 bg-gradient-to-br from-navy-900/80 via-ink-900/80 to-ink-950 p-8 md:grid-cols-[1fr_1.4fr] md:p-14">
          <div className="relative flex aspect-[4/5] items-end overflow-hidden rounded-2xl border border-paper/10 bg-navy-800">
            <div
              aria-hidden
              className="absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_30%_20%,rgba(110,168,255,0.4),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(19,32,68,0.9),transparent_60%)]"
            />
            <div className="relative p-8">
              <p className="text-xs tracking-[0.3em] uppercase text-accent/80">
                Chief Instructor
              </p>
              <p className="mt-3 font-serif text-2xl text-paper">森 祐太</p>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-accent">
              <GraduationCap className="h-4 w-4" aria-hidden />
              PROFILE
            </div>
            <h3 className="mt-4 font-serif text-display-md text-paper">
              物理を『わかる』まで、<br className="sm:hidden" />
              あなたの隣で言語化する講師。
            </h3>
            <p className="mt-6 text-paper/70 leading-relaxed">
              大学受験物理の指導歴を軸に、書籍執筆や教材開発にも携わる。『現象の言語化』と『立式のプロセス共有』を指導スタイルの中心に置き、物理が伸び悩む高校生の学習OSを書き換えることを得意とする。
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-paper/10 bg-ink-900/60 p-5">
                <p className="text-[10px] tracking-[0.28em] uppercase text-paper/50">
                  EXPERTISE
                </p>
                <p className="mt-2 font-serif text-paper">物理全分野 / 受験戦略設計</p>
              </div>
              <div className="rounded-xl border border-paper/10 bg-ink-900/60 p-5">
                <p className="text-[10px] tracking-[0.28em] uppercase text-paper/50">
                  PUBLISHED
                </p>
                <p className="mt-2 font-serif text-paper">大学受験物理 関連書籍</p>
              </div>
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

      {/* FAQ TEASE */}
      <Section
        eyebrow="FAQ"
        title="よくある質問"
        description="体験授業・料金・オンライン授業など、よく寄せられるご質問の一部です。"
      >
        <Container className="p-0">
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                q: "体験授業だけでも参加できますか?",
                a: "はい、入塾を前提としない学習相談としてご利用いただけます。",
              },
              {
                q: "途中からでも入塾できますか?",
                a: "可能です。現在地に合わせたカリキュラムを再設計します。",
              },
              {
                q: "物理基礎だけの対策にも対応していますか?",
                a: "対応しています。短期で仕上げる設計もご提案可能です。",
              },
              {
                q: "オンライン授業の環境は?",
                a: "Zoom + 手書きホワイトボードで、対面と遜色ない双方向指導を行います。",
              },
            ].map((f) => (
              <div
                key={f.q}
                className="rounded-2xl border border-paper/10 bg-ink-900/60 p-6"
              >
                <p className="flex items-center gap-2 font-serif text-paper">
                  <ListChecks className="h-4 w-4 text-accent" aria-hidden />
                  {f.q}
                </p>
                <p className="mt-3 text-sm text-paper/70 leading-relaxed">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 rounded-full border border-paper/20 px-6 py-3 text-sm text-paper hover:border-accent hover:text-accent transition"
            >
              よくある質問をすべて見る
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </Section>

      <CtaBlock />

      <Section className="py-20 text-center">
        <div className="mx-auto flex max-w-xl flex-col items-center">
          <Sparkles className="h-5 w-5 text-accent" aria-hidden />
          <p className="mt-4 font-serif text-xl text-paper leading-relaxed">
            物理を、<span className="text-accent">わかる</span>に変える。
          </p>
          <p className="mt-3 text-sm text-paper/50">
            一人ひとりの『わからない』と、最後まで向き合います。
          </p>
        </div>
      </Section>
    </>
  );
}
