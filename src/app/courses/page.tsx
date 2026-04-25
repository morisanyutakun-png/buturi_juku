import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { Section } from "@/components/section";
import { CtaBlock } from "@/components/cta-block";
import { Breadcrumb } from "@/components/breadcrumb";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, itemListJsonLd, webPageJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";
import { courses } from "@/data/courses";

export const metadata: Metadata = buildMetadata({
  title: "高校物理専門塾の講座一覧 — オンライン個別指導・共通テスト・分野別",
  description:
    "高校物理専門塾「物理の森」の講座一覧です。高校物理専門塾の体験授業、1対1個別指導、共通テスト対策、力学・電磁気の集中講座まで、目的に応じた高校物理専門塾の講座をご用意しています。",
  path: "/courses",
  keywords: [
    "高校物理専門塾 講座",
    "高校物理 個別指導 講座",
    "高校物理 オンライン 講座",
    "大学受験 物理 個別指導",
    "共通テスト 物理 講座",
    "力学 集中講座",
    "電磁気 集中講座",
  ],
  category: "education",
});

export default function CoursesIndexPage() {
  return (
    <>
      <Container className="pt-10">
        <Breadcrumb
          items={[
            { label: "ホーム", href: "/" },
            { label: "講座一覧", href: "/courses" },
          ]}
        />
      </Container>

      <Section
        eyebrow="COURSES"
        title="高校物理専門塾の講座一覧"
        description="高校物理専門塾「物理の森」では、個別指導を軸に、志望校や目的に合わせた集中講座をご用意しています。すべての講座はオンラインで全国からご受講いただけます。"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {courses.map((c) => (
            <Link
              key={c.slug}
              href={`/courses/${c.slug}`}
              className="group flex h-full flex-col justify-between rounded-2xl border border-ink-900/10 bg-white p-8 transition hover:border-brand/40 hover:bg-paper-soft"
            >
              <div>
                <p className="text-[10px] tracking-[0.28em] uppercase text-brand-deep">
                  {c.category}
                </p>
                <h2 className="mt-4 font-serif text-2xl text-ink-900">
                  {c.title}
                </h2>
                <p className="mt-2 text-sm text-ink-600">{c.subtitle}</p>
                <p className="mt-6 text-sm leading-relaxed text-ink-700">
                  {c.summary}
                </p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-lg border border-ink-900/10 bg-white p-3">
                  <p className="text-[10px] tracking-widest uppercase text-ink-400">
                    TIME
                  </p>
                  <p className="mt-1 text-ink-800">{c.duration}</p>
                </div>
                <div className="rounded-lg border border-ink-900/10 bg-white p-3">
                  <p className="text-[10px] tracking-widest uppercase text-ink-400">
                    PRICE
                  </p>
                  <p className="mt-1 text-ink-800">{c.price.value}</p>
                </div>
              </div>
              <p className="mt-6 inline-flex items-center gap-1 text-sm text-brand-deep transition group-hover:translate-x-0.5">
                コース詳細を見る
                <ArrowRight className="h-4 w-4" />
              </p>
            </Link>
          ))}
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
        id="ld-webpage-courses"
        data={webPageJsonLd({
          name: "高校物理専門塾の講座一覧",
          description:
            "高校物理専門塾「物理の森」の体験授業、1対1個別指導、共通テスト対策、分野別集中講座を比較できる講座一覧ページです。",
          path: "/courses",
        })}
      />
      <JsonLd
        id="ld-courses-itemlist"
        data={itemListJsonLd({
          name: "高校物理専門塾「物理の森」 講座一覧",
          description: "高校物理専門塾として目的別に選べる大学受験物理・高校物理の講座一覧です。",
          path: "/courses",
          items: courses.map((course) => ({
            name: course.title,
            href: `/courses/${course.slug}`,
            description: course.summary,
          })),
        })}
      />
    </>
  );
}
