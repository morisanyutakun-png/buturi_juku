import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen } from "lucide-react";
import type { Metadata } from "next";
import { Section } from "@/components/section";
import { CtaBlock } from "@/components/cta-block";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { breadcrumbJsonLd, collectionPageJsonLd, itemListJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";
import { visibleCourses } from "@/data/courses";
import { getBookBySlug } from "@/data/books";

const courseList = visibleCourses();

export const metadata: Metadata = buildMetadata({
  title: "講座一覧 — Solvora Learning Lab（高校物理・理系個別指導 / AI復習プリント付き）",
  description:
    "Solvora Learning Lab の講座一覧です。体験授業、力学・電磁気の集中講座、定期テスト対策まで、目的に応じた高校物理・理系個別指導の講座をご用意しています（高校物理専門塾としての指導継続）。",
  path: "/courses",
  keywords: [
    "Solvora Learning Lab 講座",
    "AI復習プリント 講座",
    "高校物理専門塾 講座",
    "高校物理 個別指導 講座",
    "高校物理 オンライン 講座",
    "大学受験 物理 個別指導",
    "力学 集中講座",
    "電磁気 集中講座",
  ],
  category: "education",
});

export default function CoursesIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="COURSES — Solvora の全講座"
        watermark="講"
        tone="brand"
        breadcrumb={[
          { label: "ホーム", href: "/" },
          { label: "講座一覧", href: "/courses" },
        ]}
        title={
          <>
            <span className="block">高校物理・理系個別指導の</span>
            <span className="block">
              <span className="text-brand">講座一覧</span>。
            </span>
          </>
        }
        description="Solvora Learning Lab では、書籍ベースの集中講座を軸に、志望校や目的に合わせて高校物理・理系個別指導をご用意しています。すべての講座はオンラインで全国からご受講いただけます（高校物理専門塾としての指導継続）。"
      />

      <Section
        eyebrow="ALL COURSES"
        title="目的別 — コース一覧"
        description="体験授業から志望校別カリキュラム、分野別集中講座、定期テスト対策まで。"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {courseList.map((c) => {
            const isRecommended = c.slug === "electromagnetism";
            const book = c.basedOnBookSlug ? getBookBySlug(c.basedOnBookSlug) : undefined;
            return (
            <Link
              key={c.slug}
              href={`/courses/${c.slug}`}
              className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border bg-white p-7 sm:p-8 transition hover:bg-paper-soft ${
                isRecommended
                  ? "border-brand/40 ring-2 ring-brand/30 hover:border-brand/60"
                  : "border-ink-900/10 hover:border-brand/40"
              }`}
            >
              {isRecommended && (
                <span className="absolute right-5 top-5 z-10 inline-flex rounded-full bg-brand px-3 py-1 text-[10.5px] font-medium tracking-[0.2em] text-white">
                  おすすめ
                </span>
              )}

              {/* 書籍ベース講座は、書影を右側に配置してビジュアル強化。 */}
              <div className={book ? "grid gap-5 sm:gap-7 sm:grid-cols-[1fr_auto]" : ""}>
                <div>
                  <p className="text-[11px] sm:text-[10px] tracking-[0.24em] sm:tracking-[0.28em] uppercase text-brand-deep">
                    {c.category}
                  </p>
                  <h2 className="mt-4 font-serif text-[1.6rem] sm:text-2xl leading-[1.4] text-ink-900 pr-16 sm:pr-20">
                    {c.title}
                  </h2>
                  <p className="mt-3 text-[14.5px] sm:text-sm leading-[1.7] text-ink-600">{c.subtitle}</p>
                  {book && (
                    <p className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-gold/35 bg-gold-soft/40 px-2.5 py-1 text-[10.5px] sm:text-[10px] tracking-[0.14em] sm:tracking-[0.18em] text-gold-deep">
                      <BookOpen className="h-3 w-3" aria-hidden strokeWidth={1.8} />
                      『{book.title.replace("考える力を育てる ", "")}』に沿って基礎〜応用を完走
                    </p>
                  )}
                  <p className="mt-6 text-[15px] sm:text-sm leading-[2] sm:leading-relaxed text-ink-700">
                    {c.summary}
                  </p>
                </div>

                {book && (
                  <div className="order-first mx-auto w-[120px] shrink-0 sm:order-none sm:mx-0 sm:w-[112px] md:w-[120px] lg:w-[128px]">
                    <div className="relative overflow-hidden rounded-md border border-ink-900/[0.08] bg-white shadow-card transition-transform duration-500 ease-out group-hover:-translate-y-0.5 group-hover:rotate-[1.5deg]">
                      <Image
                        src={book.coverImage}
                        alt={`${book.title} の書影`}
                        width={book.coverWidth}
                        height={book.coverHeight}
                        unoptimized={book.coverImage.endsWith(".svg")}
                        loading="lazy"
                        className="h-auto w-full"
                        sizes="(min-width: 1024px) 128px, (min-width: 640px) 112px, 120px"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 text-[12.5px] sm:text-xs">
                <div className="rounded-lg border border-ink-900/10 bg-white p-3.5 sm:p-3">
                  <p className="text-[11px] sm:text-[10px] tracking-[0.18em] sm:tracking-widest uppercase text-ink-400">
                    TIME
                  </p>
                  <p className="mt-1.5 text-ink-800">{c.duration}</p>
                </div>
                <div className="rounded-lg border border-ink-900/10 bg-white p-3.5 sm:p-3">
                  <p className="text-[11px] sm:text-[10px] tracking-[0.18em] sm:tracking-widest uppercase text-ink-400">
                    PRICE
                  </p>
                  <p className="mt-1.5 text-ink-800">{c.price.value}</p>
                </div>
              </div>
              <p className="mt-6 inline-flex min-h-[44px] items-center gap-1 text-[15px] sm:text-sm text-brand-deep transition group-hover:translate-x-0.5">
                コース詳細を見る
                <ArrowRight className="h-4 w-4" />
              </p>
            </Link>
            );
          })}
        </div>
      </Section>

      <CtaBlock />

      <JsonLd
        id="ld-breadcrumb-courses"
        data={breadcrumbJsonLd([
          { name: "ホーム", href: "/" },
          { name: "講座一覧", href: "/courses" },
        ])}
      />
      <JsonLd
        id="ld-collection-courses"
        data={collectionPageJsonLd({
          name: "Solvora Learning Lab の講座一覧（高校物理・理系個別指導）",
          description:
            "Solvora Learning Lab の体験授業、分野別集中講座、定期テスト対策を比較できる講座一覧ページです（高校物理専門塾としての指導継続）。",
          path: "/courses",
          items: courseList.map((course) => ({
            name: course.title,
            href: `/courses/${course.slug}`,
            description: course.summary,
          })),
        })}
      />
      <JsonLd
        id="ld-courses-itemlist"
        data={itemListJsonLd({
          name: "Solvora Learning Lab 講座一覧",
          description: "目的別に選べる、高校物理・理系個別指導（AI復習プリント付き）の講座一覧です。",
          path: "/courses",
          items: courseList.map((course) => ({
            name: course.title,
            href: `/courses/${course.slug}`,
            description: course.summary,
          })),
        })}
      />
    </>
  );
}
