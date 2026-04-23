import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { Section } from "@/components/section";
import { CtaBlock } from "@/components/cta-block";
import { Breadcrumb } from "@/components/breadcrumb";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";
import { courses } from "@/data/courses";

export const metadata: Metadata = buildMetadata({
  title: "講座一覧",
  description:
    "森祐太 物理専門塾の講座一覧。体験授業、1対1個別指導、共通テスト対策、力学・電磁気の集中講座まで、目的に応じた講座をご用意しています。",
  path: "/courses",
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
        title="講座一覧"
        description="個別指導を軸に、志望校や目的に合わせた集中講座をご用意しています。すべての講座はオンラインで全国からご受講いただけます。"
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
    </>
  );
}
