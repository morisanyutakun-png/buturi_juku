import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { Section } from "@/components/section";
import { CtaBlock } from "@/components/cta-block";
import { Breadcrumb } from "@/components/breadcrumb";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import {
  allCourseSlugs,
  courses,
  getCourseBySlug,
} from "@/data/courses";
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
    title: `${course.title} | 高校物理専門塾の講座`,
    description: `高校物理専門塾「物理の森」の${course.title}。${course.subtitle} — ${course.summary}`,
    path: `/courses/${course.slug}`,
    keywords: [
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

  const others = courses.filter((c) => c.slug !== course.slug).slice(0, 3);

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

            <div>
              <p className="text-xs tracking-[0.28em] uppercase text-brand-deep">
                FLOW
              </p>
              <h2 className="mt-4 font-serif text-2xl text-ink-900">
                受講の流れ
              </h2>
              <ol className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  { step: "01", title: "お申し込み", body: "フォームから3分で申し込み可能です。" },
                  { step: "02", title: "面談・日程調整", body: "オンラインで簡単な面談を行い、カリキュラムを確定します。" },
                  { step: "03", title: "授業開始", body: "受講開始。週次で進捗を共有しながら進めます。" },
                  { step: "04", title: "到達確認", body: "到達度を見ながら、追加施策をご提案します。" },
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

              <dl className="mt-8 space-y-4 sm:space-y-3 text-[14.5px] sm:text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-ink-500">形式</dt>
                  <dd className="text-right text-ink-800">{course.format}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-ink-500">時間</dt>
                  <dd className="text-right text-ink-800">{course.duration}</dd>
                </div>
              </dl>

              <ul className="mt-7 sm:mt-6 space-y-3 sm:space-y-2 text-[14px] sm:text-xs leading-[1.7] text-ink-700">
                {course.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 sm:gap-2">
                    <Check className="mt-1 sm:mt-0.5 h-4 w-4 sm:h-3 sm:w-3 shrink-0 text-brand-deep" />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3">
                <Link
                  href="/trial"
                  className="inline-flex min-h-[52px] sm:min-h-0 items-center justify-center gap-2 rounded-full bg-warm px-5 py-4 sm:py-3 text-[15px] sm:text-sm font-medium text-white hover:bg-warm-deep transition"
                >
                  体験授業を申し込む
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex min-h-[52px] sm:min-h-0 items-center justify-center gap-2 rounded-full border border-ink-900/15 px-5 py-4 sm:py-3 text-[15px] sm:text-sm text-ink-900 hover:border-brand hover:text-brand transition"
                >
                  この講座について問い合わせる
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
                高校物理専門塾の他コースを見る
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
