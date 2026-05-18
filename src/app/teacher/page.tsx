import type { Metadata } from "next";
import { BookOpen, ExternalLink, GraduationCap, Trophy, Users } from "lucide-react";
import { Section } from "@/components/section";
import { CtaBlock } from "@/components/cta-block";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { BookShowcase } from "@/components/book-showcase";
import { InstructorPortrait } from "@/components/instructor-portrait";
import { breadcrumbJsonLd, personJsonLd, webPageJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/data/site";
import { absoluteUrl } from "@/lib/utils";
import { books } from "@/data/books";
import { instructor } from "@/data/instructor";

export const metadata: Metadata = buildMetadata({
  title: "講師・著者 森祐太 — Solvora Learning Lab の教材をつくっている人",
  description:
    "Solvora Learning Lab の演習プリント全教材と参考書『考える力を育てる』シリーズを書いている森祐太（名古屋大学 工学部 電気電子情報工学科）のプロフィール。共通テスト物理満点、二次試験 9 割、力学・電磁気・熱・波動・原子の参考書 6 冊執筆、高校物理の個別指導経験など、教材設計の背景と指導スタンスをご紹介します。",
  path: "/teacher",
  keywords: [
    "森祐太 物理",
    "高校物理 著者",
    "名古屋大学 物理 講師",
    "考える力を育てる 力学",
    "考える力を育てる 電磁気学",
    "考える力を育てる 熱力学",
    "考える力を育てる 波動 原子",
    "高校物理 参考書",
    "大学受験物理 講師",
  ],
  category: "education",
});

export default function TeacherPage() {
  return (
    <>
      <PageHero
        eyebrow="INSTRUCTOR — 教材をつくっている人"
        watermark="師"
        tone="warm"
        breadcrumb={[
          { label: "ホーム", href: "/" },
          { label: "講師紹介", href: "/teacher" },
        ]}
        title={
          <>
            <span className="block">プリントも参考書も、</span>
            <span className="block">
              『<span className="text-warm">言語化</span>』する人が
            </span>
            <span className="block">全部書きました。</span>
          </>
        }
        description={instructor.leadline}
      />

      <Section
        eyebrow="PROFILE"
        title="主宰講師のプロフィール"
        description="名古屋大学で電磁気を専攻しながら、Solvora Learning Lab の演習プリント全教材と参考書『考える力を育てる』シリーズを自ら執筆。プリントや参考書で進めても詰まる方への学習サポート（個別指導）も森祐太が直接担当しています。"
      >
        <div className="grid gap-10 rounded-3xl border border-ink-900/10 bg-gradient-to-br from-paper-soft via-white to-paper-soft p-8 md:grid-cols-[1fr_1.3fr] md:p-14">
          <InstructorPortrait />

          <div>
            <p className="text-xs tracking-[0.28em] uppercase text-brand-deep">
              PROFILE
            </p>
            <h2 className="mt-4 font-serif text-display-md text-ink-900">
              初学者にも、難関大志望にも、<br className="sm:hidden" />
              あなた専用のルートを。
            </h2>
            <p className="mt-6 text-ink-700 leading-[1.9]">
              {instructor.bio}
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {instructor.achievements.map((a) => (
                <div
                  key={a.label}
                  className="rounded-xl border border-ink-900/10 bg-white p-5"
                >
                  <p className="text-[10px] tracking-[0.28em] uppercase text-ink-500">
                    {a.label}
                  </p>
                  <p className="mt-2 font-serif text-lg text-gold-deep">
                    {a.value}
                  </p>
                  {a.note && (
                    <p className="mt-1 text-[11px] text-ink-500">{a.note}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* BIG RESULTS / KPI BANNER */}
      <section className="relative overflow-hidden border-y border-ink-900/10 bg-gradient-to-b from-paper-soft to-paper-soft">
        <div
          aria-hidden
          className="absolute inset-0 opacity-50 [background-image:radial-gradient(circle_at_10%_30%,rgba(110,168,255,0.2),transparent_55%),radial-gradient(circle_at_90%_70%,rgba(232,197,122,0.15),transparent_55%)]"
        />
        <div className="container relative grid grid-cols-2 gap-3 py-12 sm:gap-6 sm:py-16 md:grid-cols-4">
          {[
            {
              value: "満点",
              label: "共通テスト 物理",
              note: "100 / 100 点",
              color: "text-gold-deep",
              icon: Trophy,
            },
            {
              value: "9 割",
              label: "二次試験 物理",
              note: "難関大レベル",
              color: "text-brand-deep",
              icon: Trophy,
            },
            {
              value: "名大",
              label: "所属大学",
              note: "工学部 電気電子情報工学科",
              color: "text-brand-deep",
              icon: GraduationCap,
            },
            {
              value: "電磁気",
              label: "書籍 執筆",
              note: "大学受験物理",
              color: "text-gold-deep",
              icon: BookOpen,
            },
          ].map((x) => (
            <div
              key={x.label}
              className="rounded-2xl border border-ink-900/10 bg-white p-4 sm:p-6 text-center backdrop-blur"
            >
              <x.icon className={`mx-auto h-5 w-5 ${x.color}`} aria-hidden />
              <p className={`mt-3 sm:mt-4 font-serif text-[1.85rem] sm:text-4xl leading-tight ${x.color}`}>
                {x.value}
              </p>
              <p className="mt-2.5 sm:mt-3 text-[10px] sm:text-[11px] tracking-[0.22em] sm:tracking-[0.28em] uppercase text-ink-500">
                {x.label}
              </p>
              <p className="mt-1 text-[11.5px] sm:text-xs leading-[1.5] text-ink-600">{x.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEACHING TRACK RECORD */}
      <Section
        eyebrow="TEACHING TRACK RECORD"
        title={<>塾講師として、<br className="sm:hidden" />物理指導の実績があります。</>}
        description="名古屋大学で電磁気学を専攻しながら、塾講師として大学受験物理の指導に携わっています。これまでの指導で名古屋大学合格者を担当した経験など、幅広い学力層への指導実績があります。"
      >
        <div className="grid gap-5 md:grid-cols-2">
          {instructor.trackRecord.map((t, i) => (
            <div
              key={t.label}
              className="group relative overflow-hidden rounded-2xl border border-ink-900/10 bg-gradient-to-br from-paper-soft via-white to-paper-soft p-7"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full bg-brand-bg blur-2xl transition group-hover:bg-warm/15"
              />
              <div className="relative flex items-start justify-between">
                <p className="font-mono text-[10px] tracking-[0.3em] text-brand-deep">
                  RECORD 0{i + 1}
                </p>
                <Users className="h-4 w-4 text-brand/60" aria-hidden />
              </div>
              <p className="relative mt-5 text-[11px] tracking-[0.22em] uppercase text-ink-500">
                {t.label}
              </p>
              <p className="relative mt-3 font-serif text-xl text-ink-900">
                {t.value}
              </p>
              <p className="relative mt-3 text-sm leading-relaxed text-ink-600">
                {t.note}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-gold/40 bg-gradient-to-br from-gold/10 via-white to-white">
          <div className="grid gap-8 p-8 md:grid-cols-[auto_1fr] md:items-center md:gap-10 md:p-10">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-gold-soft/50 text-gold-deep">
              <Trophy className="h-6 w-6" aria-hidden />
            </div>
            <div>
              <p className="font-mono text-[10px] tracking-[0.3em] text-gold-deep">
                HIGHLIGHT
              </p>
              <p className="mt-3 font-serif text-xl leading-relaxed text-ink-900 sm:text-2xl">
                塾講師として指導した受講生の中に、
                <span className="text-gold-deep">名古屋大学合格者</span>
                がいます。
              </p>
              <p className="mt-3 text-sm text-ink-700 leading-relaxed">
                中堅大から難関大まで、物理指導を通して多様な受講生を志望校まで伴走してきました。
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Book showcase — `#books` アンカーは /teacher#books として外部から参照される */}
      <div id="books" className="scroll-mt-24" />
      <BookShowcase />

      <Section
        eyebrow="STRENGTHS"
        title="講師・森祐太の強み"
        description="単なる学歴や数字ではなく、受験指導の現場で機能している強みを8つに整理しました。"
        className="bg-paper-soft"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {instructor.strengths.map((s, i) => (
            <div
              key={s.title}
              className="relative overflow-hidden rounded-2xl border border-ink-900/10 bg-white p-8"
            >
              <p className="font-mono text-xs text-gold-deep">
                0{i + 1}
              </p>
              <h3 className="mt-4 font-serif text-xl text-ink-900">
                {s.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-ink-700">
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
              className="relative overflow-hidden rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/5 via-white to-white p-8"
            >
              <p className="font-mono text-xs tracking-[0.3em] text-gold-deep">
                CREDO 0{i + 1}
              </p>
              <p className="mt-4 font-serif text-lg leading-relaxed text-ink-900">
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
        className="bg-paper-soft"
      >
        <div className="divide-y divide-ink-900/10 overflow-hidden rounded-2xl border border-ink-900/10 bg-white">
          {books.map((b) => (
            <div
              key={b.slug}
              className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:gap-10"
            >
              <p className="font-mono text-sm text-gold-deep md:w-24">
                {b.publishedYear}
              </p>
              <div className="md:flex-1">
                <p className="text-[10px] tracking-[0.28em] uppercase text-ink-400">
                  書籍 / {b.field}
                </p>
                <p className="mt-1 font-serif text-lg text-ink-900">{b.title}</p>
                <p className="mt-2 text-sm text-ink-700">{b.subtitle}</p>
              </div>
              {b.amazonUrl ? (
                <a
                  href={b.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-gold/40 bg-gold-soft/50 px-5 py-2.5 text-xs text-gold-deep hover:bg-gold-soft/60 transition"
                >
                  Amazonで見る
                  <ExternalLink className="h-3 w-3 transition group-hover:translate-x-0.5" />
                </a>
              ) : (
                <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-ink-900/15 bg-paper px-5 py-2.5 text-xs text-ink-600">
                  {b.publishedYear} 刊行予定
                </span>
              )}
            </div>
          ))}
        </div>
      </Section>

      <CtaBlock
        eyebrow="MEET YOUR AUTHOR — 教材を書いている人と話す"
        title="まずは教材を読んで、必要なら 60 分、対話してみませんか。"
        description="演習プリントと参考書 6 冊で進めて、それでも詰まる単元があれば、教材を書いた本人が直接担当する 60 分の体験授業をご用意しています。"
        primary={{ label: "演習プリントを開く", href: "/prints" }}
        secondary={{ label: "体験授業を申し込む", href: "/contact?topic=trial#contact-form" }}
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
          sameAs: books.map((b) => b.amazonUrl).filter((u): u is string => Boolean(u)),
        })}
      />
      <JsonLd
        id="ld-webpage-teacher"
        data={webPageJsonLd({
          name: "講師・著者 森祐太 — Solvora Learning Lab の教材をつくっている人",
          description: instructor.leadline,
          path: "/teacher",
        })}
      />
    </>
  );
}
