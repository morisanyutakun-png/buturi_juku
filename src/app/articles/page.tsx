import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/section";
import { CtaBlock } from "@/components/cta-block";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { breadcrumbJsonLd, collectionPageJsonLd, itemListJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";
import { articles, articleHref } from "@/data/articles";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "高校物理の学習コラム ｜ Solvora Learning Lab",
  description:
    "Solvora Learning Lab（高校物理専門塾としての指導も継続）が発信する高校物理の学習コラム一覧です。高校物理の勉強法、力学・電磁気・波動・熱力学・原子の分野別の苦手克服、大学受験物理の戦略について、現場から発信します。",
  path: "/articles",
  keywords: [
    "高校物理 勉強法",
    "高校物理 苦手",
    "Solvora Learning Lab コラム",
    "高校物理専門塾 コラム",
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
      <PageHero
        eyebrow="INSIGHTS — 高校物理の学習コラム"
        watermark="解"
        tone="ink"
        breadcrumb={[
          { label: "ホーム", href: "/" },
          { label: "物理学習コラム", href: "/articles" },
        ]}
        title={
          <>
            <span className="block">高校物理を</span>
            <span className="block">
              <span className="text-brand-deep">解きほぐす</span>、
            </span>
            <span className="block">学習コラム。</span>
          </>
        }
        description="Solvora Learning Lab から、高校物理の学び方・分野別の躓きやすいポイント・大学受験物理の戦略を、指導現場の視点で発信します（高校物理専門塾としての発信を継続）。"
      />

      <Section
        eyebrow="ALL ARTICLES"
        title="記事一覧"
        description="新着順 — 学習法・分野別・受験戦略のカテゴリで読み分けできます。"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {sorted.map((a) => {
            const isExternal = Boolean(a.externalUrl);
            const href = articleHref(a);
            const className =
              "group flex h-full flex-col justify-between rounded-3xl border border-ink-900/[0.07] bg-white/85 p-7 sm:p-9 shadow-soft backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-ink-900/[0.14] hover:shadow-card";

            const inner = (
              <>
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-[11px] sm:text-[10px] font-medium tracking-[0.22em] sm:tracking-[0.28em] uppercase text-brand-deep">
                    <span>{a.category}</span>
                    <span className="h-px w-5 bg-ink-900/15" aria-hidden />
                    <time dateTime={a.publishedAt} className="text-ink-400">
                      {formatDate(a.publishedAt)}
                    </time>
                    {isExternal && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-ink-900/[0.08] bg-paper px-2 py-0.5 text-[10px] sm:text-[9px] tracking-[0.18em] sm:tracking-[0.22em] text-ink-500 normal-case">
                        yuta-eng.com
                        <ArrowUpRight className="h-2.5 w-2.5" />
                      </span>
                    )}
                  </div>
                  <h2 className="mt-5 font-serif text-[1.45rem] sm:text-[1.35rem] leading-[1.5] sm:leading-snug tracking-[-0.012em] text-ink-900">
                    {a.title}
                  </h2>
                  <p className="mt-5 text-[15px] sm:text-[14px] leading-[2] sm:leading-[1.85] text-ink-600">
                    {a.description}
                  </p>
                </div>
                <div className="mt-8 sm:mt-9 flex items-center justify-between text-[13px] sm:text-[12px] text-ink-500">
                  <span>{a.readingTime}</span>
                  <span className="inline-flex items-center gap-1.5 text-ink-900 transition-transform duration-300 group-hover:translate-x-0.5">
                    高校物理の学習コラムを読む
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
        id="ld-collection-articles"
        data={collectionPageJsonLd({
          name: "高校物理の学習コラム ｜ Solvora Learning Lab",
          description:
            "Solvora Learning Lab（高校物理専門塾としての指導も継続）が発信する、高校物理の学び方・分野別の苦手克服・大学受験物理の戦略をまとめた記事一覧です。",
          path: "/articles",
          items: sorted.map((article) => ({
            name: article.title,
            href: articleHref(article),
            description: article.description,
          })),
        })}
      />
      <JsonLd
        id="ld-articles-itemlist"
        data={itemListJsonLd({
          name: "高校物理の学習コラム一覧",
          description: "Solvora Learning Lab（高校物理専門塾）による、高校物理・大学受験物理の学習記事一覧です。",
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
