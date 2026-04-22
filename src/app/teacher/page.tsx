import type { Metadata } from "next";
import { BookOpen, ExternalLink, Flame, ShieldCheck, Sparkles } from "lucide-react";
import { Section } from "@/components/section";
import { CtaBlock } from "@/components/cta-block";
import { Breadcrumb } from "@/components/breadcrumb";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { BookShowcase } from "@/components/book-showcase";
import { breadcrumbJsonLd, personJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/data/site";
import { absoluteUrl } from "@/lib/utils";
import { books } from "@/data/books";

export const metadata: Metadata = buildMetadata({
  title: "講師紹介",
  description:
    "森祐太 物理専門塾の主宰講師・森祐太の経歴、指導スタンス、出版実績、強みをご紹介します。電磁気の著書・Amazonでの購入リンクもこちらから。",
  path: "/teacher",
});

const strengths = [
  {
    icon: Flame,
    title: "苦手分野の再構築",
    body: "力学・電磁気の根本的な躓きを、現象の言語化から組み立て直します。",
  },
  {
    icon: ShieldCheck,
    title: "難関大への対応力",
    body: "旧帝大・医学部・早慶クラスの入試問題を、出題の背景まで踏み込んで扱えます。",
  },
  {
    icon: BookOpen,
    title: "教材・出版実績",
    body: "大学受験物理の書籍執筆経験。独学層の悩みに対する解像度が高いことが強みです。",
  },
  {
    icon: Sparkles,
    title: "学習戦略設計",
    body: "分野の優先順位・時間配分・過去問投入時期までを、数字で提示します。",
  },
];

export default function TeacherPage() {
  return (
    <>
      <Container className="pt-10">
        <Breadcrumb
          items={[
            { label: "ホーム", href: "/" },
            { label: "講師紹介", href: "/teacher" },
          ]}
        />
      </Container>

      <Section
        eyebrow="INSTRUCTOR"
        title={<>物理を『わかる』まで、<br className="sm:hidden" />言語化する人。</>}
        description="主宰講師が、すべての授業を担当します。書籍執筆の経験を背景に、独学層・苦手層の解像度を高く保った指導を行います。"
      >
        <div className="grid gap-10 rounded-3xl border border-paper/10 bg-gradient-to-br from-navy-900/70 via-ink-900/80 to-ink-950 p-8 md:grid-cols-[1fr_1.3fr] md:p-14">
          <div className="relative flex aspect-[4/5] items-end overflow-hidden rounded-2xl border border-paper/10 bg-navy-800">
            <div
              aria-hidden
              className="absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_30%_20%,rgba(110,168,255,0.4),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(232,197,122,0.25),transparent_60%)]"
            />
            <div className="relative p-8">
              <p className="text-xs tracking-[0.3em] uppercase text-gold">
                Chief Instructor
              </p>
              <p className="mt-3 font-serif text-3xl text-paper">森 祐太</p>
              <p className="mt-2 text-sm text-paper/60">
                {siteConfig.name} 主宰
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs tracking-[0.28em] uppercase text-accent">
              PROFILE
            </p>
            <h2 className="mt-4 font-serif text-display-md text-paper">
              物理の伸び悩みの正体を、<br className="sm:hidden" />
              解像度高く言語化する講師。
            </h2>
            <p className="mt-6 text-paper/70 leading-relaxed">
              大学受験物理を主戦場に、書籍執筆・教材開発・オンライン指導を行う。『公式に当てはめる』学習から、『原理から立式する』学習への移行を徹底させる指導で、模試成績の停滞した受験生を複数志望校合格へと導いてきた。
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <InfoCard label="専門" value="高校物理 全分野" />
              <InfoCard label="対応" value="旧帝大 / 医学部 / 早慶 / 共通テスト" />
              <InfoCard label="形式" value="オンライン1対1 / 集中講座" />
              <InfoCard label="実績" value="大学受験物理 書籍執筆" />
            </div>
          </div>
        </div>
      </Section>

      {/* Book showcase highlighted on teacher page */}
      <BookShowcase />

      <Section
        eyebrow="STRENGTHS"
        title="指導の強み"
        description="強みは、テクニックではなく『言語化の深さ』にあります。"
        className="bg-ink-900/40"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {strengths.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-paper/10 bg-ink-900/60 p-8"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/30 bg-accent/5 text-accent">
                <s.icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-6 font-serif text-xl text-paper">{s.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-paper/70">{s.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="PHILOSOPHY"
        title="指導スタンス"
        description="授業観は、シンプルな3つの約束にまとまります。"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              t: "わかった気にさせない",
              b: "聞いた瞬間の納得と、自力で再現できる理解は別物です。後者を常にゴールに置きます。",
            },
            {
              t: "量ではなく順序",
              b: "伸びない原因の多くは、学ぶ順序の誤りです。量を増やす前に、順序を正します。",
            },
            {
              t: "最短距離を示す",
              b: "受験には期限があります。到達までの最短ルートを、学習計画として具体的に提示します。",
            },
          ].map((x) => (
            <div
              key={x.t}
              className="rounded-2xl border border-paper/10 bg-ink-900/60 p-8"
            >
              <h3 className="font-serif text-xl text-paper">{x.t}</h3>
              <p className="mt-4 text-sm leading-relaxed text-paper/70">{x.b}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="PUBLICATIONS"
        title="出版・関連活動"
        description="指導現場の知見を、書籍・教材として体系化しています。"
        className="bg-ink-900/40"
      >
        <div className="divide-y divide-paper/10 overflow-hidden rounded-2xl border border-paper/10 bg-ink-900/60">
          {books.map((b) => (
            <div
              key={b.slug}
              className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:gap-10"
            >
              <p className="font-mono text-sm text-gold md:w-24">
                {b.publishedYear}
              </p>
              <div className="md:flex-1">
                <p className="text-[10px] tracking-[0.28em] uppercase text-paper/40">
                  書籍 / {b.field}
                </p>
                <p className="mt-1 font-serif text-lg text-paper">{b.title}</p>
                <p className="mt-2 text-sm text-paper/70">{b.subtitle}</p>
              </div>
              <a
                href={b.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-5 py-2.5 text-xs text-gold hover:bg-gold/15 transition"
              >
                Amazonで見る
                <ExternalLink className="h-3 w-3 transition group-hover:translate-x-0.5" />
              </a>
            </div>
          ))}
          <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:gap-10">
            <p className="font-mono text-sm text-paper/40 md:w-24">2024</p>
            <div className="md:flex-1">
              <p className="text-[10px] tracking-[0.28em] uppercase text-paper/40">
                教材開発
              </p>
              <p className="mt-1 font-serif text-lg text-paper">
                物理学習オンライン教材
              </p>
              <p className="mt-2 text-sm text-paper/70">
                独学層向けに、現象理解と立式プロセスを段階学習できる教材を監修。
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:gap-10">
            <p className="font-mono text-sm text-paper/40 md:w-24">2023</p>
            <div className="md:flex-1">
              <p className="text-[10px] tracking-[0.28em] uppercase text-paper/40">
                指導実績
              </p>
              <p className="mt-1 font-serif text-lg text-paper">
                難関大合格指導
              </p>
              <p className="mt-2 text-sm text-paper/70">
                旧帝・医学部・早慶クラスへの複数合格者を個別指導から輩出。
              </p>
            </div>
          </div>
        </div>
      </Section>

      <CtaBlock
        eyebrow="MEET YOUR INSTRUCTOR"
        title="まずは60分、対話してみませんか。"
        description="体験授業は主宰講師が直接担当します。学習戦略の提案までその場で行います。"
      />

      <JsonLd
        id="ld-breadcrumb-teacher"
        data={breadcrumbJsonLd([
          { name: "ホーム", href: "/" },
          { name: "講師紹介", href: "/teacher" },
        ])}
      />
      <JsonLd
        id="ld-person-teacher"
        data={personJsonLd({
          name: siteConfig.author.name,
          role: siteConfig.author.role,
          url: absoluteUrl("/teacher", siteConfig.url),
          description:
            "大学受験物理の書籍執筆・教材開発を手がける講師。現象の言語化と立式プロセスの共有を中心とした指導を行う。",
          sameAs: books.map((b) => b.amazonUrl),
        })}
      />
    </>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-paper/10 bg-ink-900/60 p-5">
      <p className="text-[10px] tracking-[0.28em] uppercase text-paper/50">
        {label}
      </p>
      <p className="mt-2 font-serif text-paper">{value}</p>
    </div>
  );
}
