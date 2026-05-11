import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, BookOpen, Check } from "lucide-react";
import { Section } from "@/components/section";
import { CtaBlock } from "@/components/cta-block";
import { Breadcrumb } from "@/components/breadcrumb";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import {
  allCourseSlugs,
  getCourseBySlug,
  visibleCourses,
} from "@/data/courses";
import { getBookBySlug } from "@/data/books";
import {
  breadcrumbJsonLd,
  courseJsonLd,
  faqPageJsonLd,
  webPageJsonLd,
} from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return allCourseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return {};
  return buildMetadata({
    title: `${course.title} ｜ Solvora Learning Lab の講座`,
    description: `Solvora Learning Lab（高校物理・理系個別指導）の${course.title}。${course.subtitle} — ${course.summary}`,
    path: `/courses/${course.slug}`,
    keywords: [
      "Solvora Learning Lab",
      "高校物理専門塾",
      `高校物理専門塾 ${course.category}`,
      course.title,
      course.subtitle,
      course.category,
      ...course.targets,
      ...course.highlights,
    ],
    category: "education",
  });
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const book = course.basedOnBookSlug
    ? getBookBySlug(course.basedOnBookSlug)
    : undefined;

  const others = visibleCourses()
    .filter((c) => c.slug !== course.slug)
    .slice(0, 3);

  return (
    <>
      <Container className="pt-10">
        <Breadcrumb
          items={[
            { label: "ホーム", href: "/" },
            { label: "講座一覧", href: "/courses" },
            { label: course.title, href: `/courses/${course.slug}` },
          ]}
        />
      </Container>

      <Section
        eyebrow={course.category}
        title={course.title}
        description={course.subtitle}
      >
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-10">
            <div className="rounded-2xl border border-ink-900/10 bg-white p-8">
              <p className="text-xs tracking-[0.28em] uppercase text-brand-deep">
                OVERVIEW
              </p>
              <p className="mt-4 text-ink-800 leading-[1.9]">{course.summary}</p>
            </div>

            {book && (
              <div className="rounded-2xl border border-gold/30 bg-gradient-to-br from-gold-soft/40 via-white to-paper-soft/60 p-6 sm:p-8">
                <div className="flex items-center gap-2 text-[10.5px] tracking-[0.24em] sm:tracking-[0.28em] uppercase text-gold-deep">
                  <BookOpen className="h-3.5 w-3.5" aria-hidden strokeWidth={1.8} />
                  BASED ON BOOK — 著者執筆の書籍に沿った授業
                </div>
                <div className="mt-5 grid gap-6 sm:gap-8 sm:grid-cols-[auto_1fr] sm:items-start">
                  <div className="mx-auto w-[140px] shrink-0 sm:mx-0 sm:w-[160px]">
                    <div className="relative overflow-hidden rounded-lg border border-ink-900/[0.08] bg-white shadow-card">
                      <Image
                        src={book.coverImage}
                        alt={`${book.title} の書影`}
                        width={book.coverWidth}
                        height={book.coverHeight}
                        className="h-auto w-full"
                        sizes="(min-width: 640px) 160px, 140px"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif text-[1.2rem] sm:text-[1.35rem] leading-[1.45] tracking-[-0.008em] text-ink-900">
                      『{book.title}』に沿って、<br className="hidden sm:block" />
                      <span className="text-gold-deep">基礎から応用までを完走</span>します。
                    </h3>
                    <p className="mt-4 text-[13.5px] sm:text-[14px] leading-[1.9] text-ink-700">
                      本講座は、講師（森祐太）が執筆した『{book.title}』を指定教材として、書籍の章立て・思考順序に沿って授業を進めます。基礎の立式から、難関大入試レベルの応用問題までを、{course.duration.replace(/（.*?）/g, "").trim()}の中で一気通貫で扱い、最後まで完走することを設計の前提としています。
                    </p>
                    <ul className="mt-5 space-y-2 text-[13px] sm:text-[13.5px] leading-[1.7] text-ink-700">
                      {book.highlights.slice(0, 3).map((h) => (
                        <li key={h} className="flex items-start gap-2.5">
                          <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-gold-deep" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-5 text-[11.5px] sm:text-[12px] leading-[1.7] text-ink-500">
                      ※ 書籍は別途ご購入をお願いしています。
                      {book.amazonUrl && (
                        <>
                          {" "}
                          <a
                            href={book.amazonUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-0.5 text-brand-deep underline-offset-2 hover:underline"
                          >
                            Amazon で見る
                            <ArrowUpRight className="h-3 w-3" aria-hidden />
                          </a>
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <p className="text-xs tracking-[0.28em] uppercase text-brand-deep">
                FOR WHOM
              </p>
              <h2 className="mt-4 font-serif text-2xl text-ink-900">対象者</h2>
              <ul className="mt-6 space-y-3">
                {course.targets.map((t) => (
                  <li
                    key={t}
                    className="flex items-start gap-3 rounded-xl border border-ink-900/10 bg-white p-4 text-sm text-ink-800"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-deep" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs tracking-[0.28em] uppercase text-brand-deep">
                CURRICULUM
              </p>
              <h2 className="mt-4 font-serif text-2xl text-ink-900">
                学べる内容
              </h2>
              <ol className="mt-6 space-y-4">
                {course.curriculum.map((c, i) => (
                  <li
                    key={c.heading}
                    className="rounded-xl border border-ink-900/10 bg-white p-6"
                  >
                    <p className="font-mono text-xs text-brand-deep">
                      UNIT {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-3 font-serif text-lg text-ink-900">
                      {c.heading}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-700">
                      {c.body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            {course.slug !== "trial" && (
              <div>
                <p className="text-xs tracking-[0.28em] uppercase text-brand-deep">
                  FLOW
                </p>
                <h2 className="mt-4 font-serif text-2xl text-ink-900">
                  本講座のお申し込み〜受講開始まで
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">
                  すべての講座は、まず体験授業（60分・¥3,000）からスタートしていただきます。本講座への申し込みは、体験授業のあとに行います。
                </p>
                <ol className="mt-6 grid gap-4 sm:grid-cols-2">
                  {[
                    {
                      step: "01",
                      title: "体験授業（¥3,000）を受講",
                      body: "現状の苦手調査 → REM 演習プリントを使った授業 → 質疑応答 → 学習方針の提案までを、講師（森祐太）が直接担当します。",
                    },
                    {
                      step: "02",
                      title: "支払いフォームでご入金 → お申し込み完了",
                      body: "本講座を受講される場合は、体験後にお送りする支払いフォームでご入金いただきます。入金確認をもって正式に申し込み完了となります（体験当日に決める必要はありません）。",
                    },
                    {
                      step: "03",
                      title: "日程調整",
                      body: "ご都合に合わせて授業の日程を組みます。週1ペースが基本ですが、ご希望に応じて柔軟に調整可能です。",
                    },
                    {
                      step: "04",
                      title: "ご都合の日に受講開始",
                      body: "決定した日程で授業を実施。毎週の授業で理解度を確認しながら、解けなかった1問は AI（REM）で復習プリント化し最後まで伴走します。",
                    },
                  ].map((s) => (
                    <li
                      key={s.step}
                      className="rounded-xl border border-ink-900/10 bg-white p-5"
                    >
                      <p className="font-mono text-xs text-brand-deep">STEP {s.step}</p>
                      <p className="mt-2 font-serif text-ink-900">{s.title}</p>
                      <p className="mt-2 text-xs leading-relaxed text-ink-700">{s.body}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <div>
              <p className="text-xs tracking-[0.28em] uppercase text-brand-deep">
                FAQ
              </p>
              <h2 className="mt-4 font-serif text-2xl text-ink-900">
                よくある質問
              </h2>
              <div className="mt-6 space-y-3">
                {course.faq.map((q) => (
                  <details
                    key={q.question}
                    className="group rounded-xl border border-ink-900/10 bg-white p-6 [&_summary::-webkit-details-marker]:hidden"
                  >
                    <summary className="flex cursor-pointer items-center justify-between gap-4 font-serif text-ink-900">
                      <span>{q.question}</span>
                      <span
                        aria-hidden
                        className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-ink-900/15 text-xs transition group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-4 text-sm leading-relaxed text-ink-700">
                      {q.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-ink-900/10 bg-gradient-to-br from-paper-soft to-white p-7 sm:p-8">
              <p className="text-[11px] sm:text-[10px] tracking-[0.24em] sm:tracking-[0.28em] uppercase text-brand-deep">
                {course.price.label}
              </p>
              <p className="mt-4 font-serif text-[2.4rem] sm:text-3xl leading-tight text-ink-900">
                {course.price.value}
              </p>
              {course.price.note && (
                <p className="mt-3 text-[13.5px] sm:text-xs leading-[1.85] sm:leading-relaxed text-ink-600">
                  {course.price.note}
                </p>
              )}

              <ul className="mt-8 space-y-4 sm:space-y-3 text-[14.5px] sm:text-sm">
                <li className="flex justify-between gap-3">
                  <span className="text-ink-600">形式</span>
                  <span className="text-right text-ink-800">{course.format}</span>
                </li>
                <li className="flex justify-between gap-3">
                  <span className="text-ink-600">時間</span>
                  <span className="text-right text-ink-800">{course.duration}</span>
                </li>
              </ul>

              <ul className="mt-7 sm:mt-6 space-y-3 sm:space-y-2 text-[14px] sm:text-xs leading-[1.7] text-ink-700">
                {course.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 sm:gap-2">
                    <Check className="mt-1 sm:mt-0.5 h-4 w-4 sm:h-3 sm:w-3 shrink-0 text-brand-deep" />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3">
                {/* 受講のスタートは必ず体験授業（¥3,000）から。CTA は `/contact` フォームに
                    クエリで講座情報を渡し、受講希望講座を自動入力する。 */}
                <Link
                  href="/contact?topic=trial#contact-form"
                  className="inline-flex min-h-[52px] sm:min-h-0 items-center justify-center gap-2 rounded-full bg-warm px-5 py-4 sm:py-3 text-[15px] sm:text-sm font-medium text-white hover:bg-warm-deep transition"
                >
                  {course.slug === "trial"
                    ? "体験授業を申し込む"
                    : "まずは体験授業を申し込む"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                {course.slug !== "trial" && (
                  <p className="text-center text-[12px] leading-[1.65] text-ink-500">
                    受講のスタートは必ず体験授業（60分・¥3,000）から。体験当日に本講座のご案内もいたします。
                  </p>
                )}
                <Link
                  href="/contact"
                  className="inline-flex min-h-[52px] sm:min-h-0 items-center justify-center gap-2 rounded-full border border-ink-900/15 px-5 py-4 sm:py-3 text-[15px] sm:text-sm text-ink-900 hover:border-brand hover:text-brand transition"
                >
                  まず質問だけしたい（メールで相談）
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <Section
        eyebrow="OTHER COURSES"
        title="他の講座"
        className="bg-paper-soft"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {others.map((c) => (
            <Link
              key={c.slug}
              href={`/courses/${c.slug}`}
              className="group rounded-2xl border border-ink-900/10 bg-white p-7 transition hover:border-brand/40 hover:bg-paper-soft"
            >
              <p className="text-[10px] tracking-[0.28em] uppercase text-brand-deep">
                {c.category}
              </p>
              <h3 className="mt-3 font-serif text-lg text-ink-900">{c.title}</h3>
              <p className="mt-2 text-xs text-ink-600">{c.subtitle}</p>
              <p className="mt-4 inline-flex items-center gap-1 text-sm text-brand-deep transition group-hover:translate-x-0.5">
                他のコースを見る
                <ArrowRight className="h-4 w-4" />
              </p>
            </Link>
          ))}
        </div>
      </Section>

      <CtaBlock />

      <JsonLd
        id={`ld-breadcrumb-course-${course.slug}`}
        data={breadcrumbJsonLd([
          { name: "ホーム", href: "/" },
          { name: "講座一覧", href: "/courses" },
          { name: course.title, href: `/courses/${course.slug}` },
        ])}
      />
      <JsonLd
        id={`ld-course-${course.slug}`}
        data={courseJsonLd({
          name: course.title,
          description: course.summary,
          slug: course.slug,
          category: course.category,
          format: course.format,
          targets: course.targets,
          price: (course.price.value.match(/[\d,]+/) ?? ["0"])[0].replace(/,/g, ""),
          priceCurrency: "JPY",
        })}
      />
      <JsonLd
        id={`ld-webpage-course-${course.slug}`}
        data={webPageJsonLd({
          name: course.title,
          description: course.summary,
          path: `/courses/${course.slug}`,
        })}
      />
      {course.faq.length > 0 && (
        <JsonLd
          id={`ld-course-faq-${course.slug}`}
          data={faqPageJsonLd(
            course.faq.map((q) => ({
              question: q.question,
              answer: q.answer,
            })),
          )}
        />
      )}
    </>
  );
}
