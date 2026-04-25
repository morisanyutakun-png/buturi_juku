import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/section";
import { CtaBlock } from "@/components/cta-block";
import { Breadcrumb } from "@/components/breadcrumb";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, itemListJsonLd, webPageJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";
import { articles, articleHref } from "@/data/articles";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "物理学習コラム",
  description:
    "高校物理の学び方・分野別の苦手克服・受験戦略について、現場から発信するコラム一覧です。",
  path: "/articles",
  keywords: [
    "物理 勉強法",
    "高校物理 苦手",
    "大学受験物理 勉強法",
    "力学 勉強法",
    "電磁気 勉強法",
  ],
  category: "education",
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
          {sorted.map((a) => {
            const isExternal = Boolean(a.externalUrl);
            const href = articleHref(a);
            const className =
              "group flex h-full flex-col justify-between rounded-3xl border border-ink-900/[0.07] bg-white/85 p-9 shadow-soft backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-ink-900/[0.14] hover:shadow-card";

            const inner = (
              <>
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-[10px] font-medium tracking-[0.28em] uppercase text-brand-deep">
                    <span>{a.category}</span>
                    <span className="h-px w-5 bg-ink-900/15" aria-hidden />
                    <time dateTime={a.publishedAt} className="text-ink-400">
                      {formatDate(a.publishedAt)}
                    </time>
                    {isExternal && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-ink-900/[0.08] bg-paper px-2 py-0.5 text-[9px] tracking-[0.22em] text-ink-500 normal-case">
                        yuta-eng.com
                        <ArrowUpRight className="h-2.5 w-2.5" />
                      </span>
                    )}
                  </div>
                  <h2 className="mt-5 font-serif text-[1.35rem] leading-snug tracking-[-0.012em] text-ink-900">
                    {a.title}
                  </h2>
                  <p className="mt-5 text-[14px] leading-[1.85] text-ink-600">
                    {a.description}
                  </p>
                </div>
                <div className="mt-9 flex items-center justify-between text-[12px] text-ink-500">
                  <span>{a.readingTime}</span>
                  <span className="inline-flex items-center gap-1.5 text-ink-900 transition-transform duration-300 group-hover:translate-x-0.5">
                    続きを読む
                    {isExternal ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowRight className="h-3 w-3" />
                    )}
                  </span>
                </div>
              </>
            );

            return isExternal ? (
              <a
                key={a.slug}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
              >
                {inner}
              </a>
            ) : (
              <Link key={a.slug} href={href} className={className}>
                {inner}
              </Link>
            );
          })}
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
      <JsonLd
        id="ld-webpage-articles"
        data={webPageJsonLd({
          name: "物理学習コラム",
          description:
            "高校物理の学び方、分野別の苦手克服、大学受験物理の戦略をまとめた記事一覧です。",
          path: "/articles",
        })}
      />
      <JsonLd
        id="ld-articles-itemlist"
        data={itemListJsonLd({
          name: "物理学習コラム一覧",
          description: "高校物理・大学受験物理の学習記事一覧です。",
          path: "/articles",
          items: sorted.map((article) => ({
            name: article.title,
            href: articleHref(article),
            description: article.description,
          })),
        })}
      />
    </>
  );
}
