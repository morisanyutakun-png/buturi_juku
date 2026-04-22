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
    title: course.title,
    description: `${course.subtitle} — ${course.summary}`,
    path: `/courses/${course.slug}`,
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
            <div className="rounded-2xl border border-paper/10 bg-ink-900/60 p-8">
              <p className="text-xs tracking-[0.28em] uppercase text-accent">
                OVERVIEW
              </p>
              <p className="mt-4 text-paper/80 leading-[1.9]">{course.summary}</p>
            </div>

            <div>
              <p className="text-xs tracking-[0.28em] uppercase text-accent">
                FOR WHOM
              </p>
              <h2 className="mt-4 font-serif text-2xl text-paper">対象者</h2>
              <ul className="mt-6 space-y-3">
                {course.targets.map((t) => (
                  <li
                    key={t}
                    className="flex items-start gap-3 rounded-xl border border-paper/10 bg-ink-900/60 p-4 text-sm text-paper/80"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs tracking-[0.28em] uppercase text-accent">
                CURRICULUM
              </p>
              <h2 className="mt-4 font-serif text-2xl text-paper">
                学べる内容
              </h2>
              <ol className="mt-6 space-y-4">
                {course.curriculum.map((c, i) => (
                  <li
                    key={c.heading}
                    className="rounded-xl border border-paper/10 bg-ink-900/60 p-6"
                  >
                    <p className="font-mono text-xs text-accent">
                      UNIT {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-3 font-serif text-lg text-paper">
                      {c.heading}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-paper/70">
                      {c.body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <p className="text-xs tracking-[0.28em] uppercase text-accent">
                FLOW
              </p>
              <h2 className="mt-4 font-serif text-2xl text-paper">
                受講の流れ
              </h2>
              <ol className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  { step: "01", title: "お申し込み", body: "フォームから3分で申し込み可能です。" },
                  { step: "02", title: "面談・日程調整", body: "Zoomで簡単な面談を行い、カリキュラムを確定します。" },
                  { step: "03", title: "授業開始", body: "受講開始。週次で進捗を共有しながら進めます。" },
                  { step: "04", title: "到達確認", body: "到達度を見ながら、追加施策をご提案します。" },
                ].map((s) => (
                  <li
                    key={s.step}
                    className="rounded-xl border border-paper/10 bg-ink-900/60 p-5"
                  >
                    <p className="font-mono text-xs text-accent">STEP {s.step}</p>
                    <p className="mt-2 font-serif text-paper">{s.title}</p>
                    <p className="mt-2 text-xs leading-relaxed text-paper/70">{s.body}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <p className="text-xs tracking-[0.28em] uppercase text-accent">
                FAQ
              </p>
              <h2 className="mt-4 font-serif text-2xl text-paper">
                よくある質問
              </h2>
              <div className="mt-6 space-y-3">
                {course.faq.map((q) => (
                  <details
                    key={q.question}
                    className="group rounded-xl border border-paper/10 bg-ink-900/60 p-6 [&_summary::-webkit-details-marker]:hidden"
                  >
                    <summary className="flex cursor-pointer items-center justify-between gap-4 font-serif text-paper">
                      <span>{q.question}</span>
                      <span
                        aria-hidden
                        className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-paper/20 text-xs transition group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-4 text-sm leading-relaxed text-paper/70">
                      {q.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-paper/10 bg-gradient-to-br from-navy-900/80 to-ink-900/80 p-8">
              <p className="text-[10px] tracking-[0.28em] uppercase text-accent">
                {course.price.label}
              </p>
              <p className="mt-4 font-serif text-3xl text-paper">
                {course.price.value}
              </p>
              {course.price.note && (
                <p className="mt-3 text-xs text-paper/60 leading-relaxed">
                  {course.price.note}
                </p>
              )}

              <dl className="mt-8 space-y-3 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-paper/50">形式</dt>
                  <dd className="text-right text-paper/80">{course.format}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-paper/50">時間</dt>
                  <dd className="text-right text-paper/80">{course.duration}</dd>
                </div>
              </dl>

              <ul className="mt-6 space-y-2 text-xs text-paper/70">
                {course.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-3 w-3 shrink-0 text-accent" />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3">
                <Link
                  href="/trial"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-ink-950 hover:bg-accent-soft transition"
                >
                  体験授業を申し込む
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-paper/20 px-5 py-3 text-sm text-paper hover:border-accent hover:text-accent transition"
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
        className="bg-ink-900/40"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {others.map((c) => (
            <Link
              key={c.slug}
              href={`/courses/${c.slug}`}
              className="group rounded-2xl border border-paper/10 bg-ink-900/60 p-7 transition hover:border-accent/40 hover:bg-ink-800/60"
            >
              <p className="text-[10px] tracking-[0.28em] uppercase text-accent">
                {c.category}
              </p>
              <h3 className="mt-3 font-serif text-lg text-paper">{c.title}</h3>
              <p className="mt-2 text-xs text-paper/60">{c.subtitle}</p>
              <p className="mt-4 inline-flex items-center gap-1 text-sm text-accent transition group-hover:translate-x-0.5">
                詳しく見る
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
