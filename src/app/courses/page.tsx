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
  title: "学習サポート一覧 — 一人で進めるのが難しい方へ ｜ Solvora Learning Lab",
  description:
    "演習プリントと参考書『考える力を育てる』シリーズで進めても一人では難しい方向けの、森祐太による個別の学習サポート一覧です。体験授業、電磁気集中、定期テスト対策まで、目的に応じて選べる高校物理の個別サポートを用意しています。",
  path: "/courses",
  keywords: [
    "Solvora Learning Lab 学習サポート",
    "高校物理 個別指導 サポート",
    "高校物理 オンライン 個別指導",
    "大学受験 物理 個別指導",
    "電磁気 集中講座",
    "力学 集中講座",
    "物理 苦手 克服",
  ],
  category: "education",
});

export default function CoursesIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="LEARNING SUPPORT — 学習サポート一覧"
        watermark="支"
        tone="brand"
        breadcrumb={[
          { label: "ホーム", href: "/" },
          { label: "学習サポート", href: "/courses" },
        ]}
        title={
          <>
            <span className="block">プリントと参考書だけで</span>
            <span className="block">
              届かない人のための、<span className="text-brand">人がつくサポート</span>。
            </span>
          </>
        }
        description="演習プリントと参考書『考える力を育てる』シリーズで自分のペースで進めて、それでも詰まる単元・立式の癖がある方向けに、森祐太による個別の学習サポートを用意しています。すべてオンライン・全国対応・入塾金 0 円。原則は、まずプリントを試してから検討してください。"
      />

      <Section
        eyebrow="ALL SUPPORT"
        title="目的別 — サポート一覧"
        description="体験授業（入口）から、書籍ベースの分野別集中、定期テスト対策まで。プリント・参考書では届かない単元だけ、人と一緒に解きます。"
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
          { name: "学習サポート", href: "/courses" },
        ])}
      />
      <JsonLd
        id="ld-collection-courses"
        data={collectionPageJsonLd({
          name: "Solvora Learning Lab の学習サポート一覧（高校物理 個別指導）",
          description:
            "無料プリントと参考書 6 冊で進めても詰まる方向けに、森祐太による個別の学習サポート（体験授業・分野別集中・テスト対策）を一覧化したページです。",
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
          name: "Solvora Learning Lab 学習サポート一覧",
          description:
            "プリント・参考書で進めても詰まる方向けに、目的別に選べる高校物理の個別サポート一覧です。",
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
