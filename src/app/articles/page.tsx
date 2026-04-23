import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/section";
import { CtaBlock } from "@/components/cta-block";
import { Breadcrumb } from "@/components/breadcrumb";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";
import { articles } from "@/data/articles";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "物理学習コラム",
  description:
    "高校物理の学び方・分野別の苦手克服・受験戦略について、現場から発信するコラム一覧です。",
  path: "/articles",
});

export default function ArticlesIndexPage() {
  const sorted = [...articles].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );

  return (
    <>
      <Container className="pt-10">
        <Breadcrumb
          items={[
            { label: "ホーム", href: "/" },
            { label: "物理学習コラム", href: "/articles" },
          ]}
        />
      </Container>

      <Section
        eyebrow="INSIGHTS"
        title="物理学習コラム"
        description="物理の学び方・分野別の躓きやすいポイント・受験戦略について、現場から発信しています。"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {sorted.map((a) => (
            <Link
              key={a.slug}
              href={`/articles/${a.slug}`}
              className="group flex h-full flex-col justify-between rounded-2xl border border-ink-900/10 bg-white p-8 transition hover:border-brand/40 hover:bg-paper-soft"
            >
              <div>
                <div className="flex items-center gap-3 text-[10px] tracking-[0.28em] uppercase text-brand-deep">
                  <span>{a.category}</span>
                  <span className="h-px w-6 bg-warm/40" aria-hidden />
                  <time dateTime={a.publishedAt} className="text-ink-400">
                    {formatDate(a.publishedAt)}
                  </time>
                </div>
                <h2 className="mt-4 font-serif text-xl leading-snug text-ink-900">
                  {a.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-ink-700">
                  {a.description}
                </p>
              </div>
              <div className="mt-8 flex items-center justify-between text-xs text-ink-500">
                <span>{a.readingTime}</span>
                <span className="inline-flex items-center gap-1 text-brand-deep transition group-hover:translate-x-0.5">
                  続きを読む
                  <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <CtaBlock />

      <JsonLd
        id="ld-breadcrumb-articles"
        data={breadcrumbJsonLd([
          { name: "ホーム", href: "/" },
          { name: "物理学習コラム", href: "/articles" },
        ])}
      />
    </>
  );
}
