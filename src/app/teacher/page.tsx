import type { Metadata } from "next";
import { BookOpen, ExternalLink, GraduationCap, Trophy } from "lucide-react";
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
import { instructor } from "@/data/instructor";

export const metadata: Metadata = buildMetadata({
  title: "講師紹介",
  description:
    "森祐太 物理専門塾の主宰講師・森祐太(名古屋大学 工学部 電気電子情報工学科)のプロフィール。共通テスト物理満点、二次試験9割、電磁気書籍の執筆実績、塾講師経験など、講師の強みと指導スタンスをご紹介します。",
  path: "/teacher",
});

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
        description={instructor.leadline}
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
              <p className="mt-3 font-serif text-3xl text-paper">
                {instructor.name}
              </p>
              <p className="mt-1 font-mono text-[10px] tracking-[0.3em] text-paper/50">
                {instructor.nameEn}
              </p>
              <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] text-accent">
                <GraduationCap className="h-3 w-3" aria-hidden />
                {instructor.affiliationShort}
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs tracking-[0.28em] uppercase text-accent">
              PROFILE
            </p>
            <h2 className="mt-4 font-serif text-display-md text-paper">
              初学者にも、難関大志望にも、<br className="sm:hidden" />
              あなた専用のルートを。
            </h2>
            <p className="mt-6 text-paper/70 leading-[1.9]">
              {instructor.bio}
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {instructor.achievements.map((a) => (
                <div
                  key={a.label}
                  className="rounded-xl border border-paper/10 bg-ink-900/60 p-5"
                >
                  <p className="text-[10px] tracking-[0.28em] uppercase text-paper/50">
                    {a.label}
                  </p>
                  <p className="mt-2 font-serif text-lg text-gold">
                    {a.value}
                  </p>
                  {a.note && (
                    <p className="mt-1 text-[11px] text-paper/50">{a.note}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* BIG RESULTS / KPI BANNER */}
      <section className="relative overflow-hidden border-y border-paper/10 bg-gradient-to-b from-navy-900/40 to-ink-950">
        <div
          aria-hidden
          className="absolute inset-0 opacity-50 [background-image:radial-gradient(circle_at_10%_30%,rgba(110,168,255,0.2),transparent_55%),radial-gradient(circle_at_90%_70%,rgba(232,197,122,0.15),transparent_55%)]"
        />
        <div className="container relative grid gap-6 py-16 md:grid-cols-4">
          {[
            {
              value: "満点",
              label: "共通テスト 物理",
              note: "100 / 100 点",
              color: "text-gold",
              icon: Trophy,
            },
            {
              value: "9 割",
              label: "二次試験 物理",
              note: "難関大レベル",
              color: "text-accent",
              icon: Trophy,
            },
            {
              value: "名大",
              label: "所属大学",
              note: "工学部 電気電子情報工学科",
              color: "text-accent",
              icon: GraduationCap,
            },
            {
              value: "電磁気",
              label: "書籍 執筆",
              note: "大学受験物理",
              color: "text-gold",
              icon: BookOpen,
            },
          ].map((x) => (
            <div
              key={x.label}
              className="rounded-2xl border border-paper/10 bg-ink-900/60 p-6 text-center backdrop-blur"
            >
              <x.icon className={`mx-auto h-5 w-5 ${x.color}`} aria-hidden />
              <p className={`mt-4 font-serif text-4xl ${x.color}`}>
                {x.value}
              </p>
              <p className="mt-3 text-[11px] tracking-[0.28em] uppercase text-paper/50">
                {x.label}
              </p>
              <p className="mt-1 text-xs text-paper/60">{x.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Book showcase */}
      <BookShowcase />

      <Section
        eyebrow="STRENGTHS"
        title="講師・森祐太の強み"
        description="単なる学歴や数字ではなく、受験指導の現場で機能している強みを8つに整理しました。"
        className="bg-ink-900/40"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {instructor.strengths.map((s, i) => (
            <div
              key={s.title}
              className="relative overflow-hidden rounded-2xl border border-paper/10 bg-ink-900/60 p-8"
            >
              <p className="font-mono text-xs text-gold">
                0{i + 1}
              </p>
              <h3 className="mt-4 font-serif text-xl text-paper">
                {s.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-paper/70">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="CREDO"
        title="指導で、大切にしていること"
        description="講師としての信念です。すべての授業の土台にしています。"
      >
        <ul className="grid gap-4 md:grid-cols-2">
          {instructor.credo.map((c, i) => (
            <li
              key={c}
              className="relative overflow-hidden rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/5 via-ink-900/60 to-ink-900 p-8"
            >
              <p className="font-mono text-xs tracking-[0.3em] text-gold">
                CREDO 0{i + 1}
              </p>
              <p className="mt-4 font-serif text-lg leading-relaxed text-paper">
                {c}
              </p>
            </li>
          ))}
        </ul>
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
            <p className="font-mono text-sm text-paper/40 md:w-24">—</p>
            <div className="md:flex-1">
              <p className="text-[10px] tracking-[0.28em] uppercase text-paper/40">
                指導経験
              </p>
              <p className="mt-1 font-serif text-lg text-paper">
                塾講師として、幅広い学力層を指導
              </p>
              <p className="mt-2 text-sm text-paper/70">
                初学者〜難関大志望まで、多様なフェーズの受験生を担当。
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
          name: instructor.name,
          role: `${instructor.role} / ${instructor.affiliationShort}`,
          url: absoluteUrl("/teacher", siteConfig.url),
          description: instructor.bio,
          sameAs: books.map((b) => b.amazonUrl),
        })}
      />
    </>
  );
}
