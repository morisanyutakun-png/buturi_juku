import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowRight,
  ArrowUpRight,
  Download,
} from "lucide-react";
import { Section } from "@/components/section";
import { CtaBlock } from "@/components/cta-block";
import { Container } from "@/components/container";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLdGraph } from "@/components/json-ld";
import { PrintPreview } from "@/components/print-preview";
import { PrintShareBar } from "@/components/print-share-bar";
import {
  allPrintSlugs,
  getPrintBySlug,
  getRelatedPrints,
  printThumbPath,
  type Print,
} from "@/data/prints";
import { articles, articleHref } from "@/data/articles";
import { siteConfig } from "@/data/site";
import { absoluteUrl, formatDate } from "@/lib/utils";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/jsonld";

const NOTE_URL = "https://note.com/yuta_mori_ind";

export const dynamicParams = false;

export function generateStaticParams() {
  return allPrintSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const print = getPrintBySlug(slug);
  if (!print) return {};
  return buildMetadata({
    title: `${print.title} ｜ Web で読める 演習プリント（${print.subject}・${print.topic}）`,
    description: print.description,
    path: `/prints/${print.slug}`,
    type: "article",
    publishedTime: print.publishedAt,
    modifiedTime: print.updatedAt ?? print.publishedAt,
    keywords: [
      "高校物理 プリント",
      "物理 PDF",
      `${print.subject} 問題`,
      `${print.topic} 問題 PDF`,
      ...print.tags,
    ],
    category: "education",
    // 1 ページ目を OG / Twitter Card のサムネとして使う。
    images: [printThumbPath(print)],
    imageAlt: `${print.title} — 1 ページ目プレビュー`,
  });
}

/**
 * 教材詳細ページのメタ情報。分野・難易度・対象・ページ数・更新日。
 * 1 行のドット区切りに圧縮して、見出し直下に控えめに配置する。
 */
function MetaLine({ print }: { print: Print }) {
  const items = [
    `${print.subject} / ${print.topic}`,
    `${print.difficulty}（${print.points} 点）`,
    print.gradeLevel,
    `全 ${print.pageCount} ページ`,
    `更新 ${formatDate(print.updatedAt ?? print.publishedAt)}`,
  ];
  return (
    <p className="mt-5 text-[12px] sm:text-[12.5px] leading-[1.85] text-ink-500">
      {items.map((it, i) => (
        <span key={i}>
          {it}
          {i < items.length - 1 && (
            <span className="mx-2 text-ink-300" aria-hidden>
              ·
            </span>
          )}
        </span>
      ))}
    </p>
  );
}

export default async function PrintDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const print = getPrintBySlug(slug);
  if (!print) notFound();

  const relatedPrints = getRelatedPrints(print.slug);
  const relatedArticles = (print.relatedArticleSlugs ?? [])
    .map((s) => articles.find((a) => a.slug === s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  const pdfAbsoluteUrl = absoluteUrl(print.pdfPath, siteConfig.url);
  const isFree = print.kind === "free";

  return (
    <>
      <Container className="pt-10">
        <Breadcrumb
          items={[
            { label: "ホーム", href: "/" },
            { label: "演習プリント", href: "/prints" },
            { label: print.title, href: `/prints/${print.slug}` },
          ]}
        />
      </Container>

      {/* HERO — title, lead, meta line, primary CTA (PDF DL) */}
      <article>
        <Container className="pt-8 pb-10 sm:pt-10 sm:pb-12">
          <div className="mx-auto max-w-3xl">
            <p className="text-[10px] sm:text-[11px] tracking-[0.24em] sm:tracking-[0.28em] uppercase text-brand-deep">
              {print.subject} / {print.topic}
              <span className="mx-2 text-ink-300" aria-hidden>·</span>
              {isFree ? "無料" : "有料"}
            </p>

            <h1 className="mt-4 sm:mt-5 font-serif text-[1.85rem] sm:text-display-md text-ink-900 leading-[1.3] sm:leading-tight tracking-[-0.012em]">
              {print.title}
            </h1>
            <p className="mt-5 text-[14.5px] sm:text-[15px] leading-[1.95] text-ink-700">
              {print.lead}
            </p>

            <MetaLine print={print} />

            {/* PDF DL — primary CTA */}
            <div className="mt-7 sm:mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              {isFree ? (
                <a
                  href={print.pdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-[14px] font-medium text-paper transition hover:bg-ink-800"
                >
                  <Download className="h-4 w-4" aria-hidden />
                  PDF をダウンロード
                </a>
              ) : (
                <a
                  href={print.paidUrl ?? NOTE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-[14px] font-medium text-paper transition hover:bg-ink-800"
                >
                  note で購入する
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}
              <p className="text-[11.5px] text-ink-500">
                A4 印刷向けレイアウト・問題と解答解説セット
              </p>
            </div>
          </div>
        </Container>

        {/* Web プレビュー — メインビュー */}
        <section className="bg-paper-soft py-10 sm:py-14 border-y border-ink-900/[0.06]">
          <Container>
            <PrintPreview print={print} />
          </Container>
        </section>

        {/* SNS Share */}
        <section className="py-8 sm:py-10">
          <Container>
            <PrintShareBar
              path={`/prints/${print.slug}`}
              title={print.title}
            />
          </Container>
        </section>

        {/* Inline CTA — このプリントの単元から、note・参考書・体験授業へ */}
        <Container className="pb-12 sm:pb-16">
          <aside className="mx-auto max-w-3xl rounded-2xl border border-brand/25 bg-gradient-to-br from-brand-bg/60 via-white to-paper p-6 sm:p-8">
            <p className="text-[10px] tracking-[0.28em] uppercase text-brand-deep">
              NEXT STEP
            </p>
            <h3 className="mt-3 font-serif text-[1.1rem] sm:text-[1.25rem] leading-snug text-ink-900">
              これが効いたなら、同じ枠組みの本で全分野を読み通せます。
            </h3>
            <p className="mt-3 text-[13.5px] leading-[1.85] text-ink-700">
              『考える力を育てる』シリーズ全 6 冊（力学・電磁気・熱・波動・原子）は、このプリントと同じ「現象 → 立式 → 演習」の順序で書かれています。
              <br />
              「もっと類題を解きたい」方は note の有料単発 PDF、「1 問で止まる癖を一緒に見てほしい」方は 60 分の体験授業もあります。
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={NOTE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-warm px-5 py-2.5 text-[13.5px] font-medium text-white transition hover:bg-warm-deep"
              >
                note の有料プリントを見る
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <Link
                href="/teacher#books"
                className="inline-flex items-center gap-2 rounded-full border border-ink-900/[0.14] bg-white/80 px-5 py-2.5 text-[13.5px] text-ink-800 backdrop-blur transition hover:border-ink-900/30 hover:bg-white"
              >
                参考書 6 冊を見る
                <ArrowRight className="h-3.5 w-3.5 opacity-60" />
              </Link>
              <Link
                href="/trial"
                className="inline-flex items-center gap-2 rounded-full border border-ink-900/[0.14] bg-white/80 px-5 py-2.5 text-[13.5px] text-ink-800 backdrop-blur transition hover:border-ink-900/30 hover:bg-white"
              >
                体験授業を見る
                <ArrowRight className="h-3.5 w-3.5 opacity-50" />
              </Link>
            </div>
          </aside>
        </Container>
      </article>

      {/* 関連プリント */}
      {relatedPrints.length > 0 && (
        <Section eyebrow="RELATED PRINTS" title="関連する演習プリント" className="bg-paper-soft">
          <div className="grid gap-5 md:grid-cols-2">
            {relatedPrints.map((p) => (
              <Link
                key={p.slug}
                href={`/prints/${p.slug}`}
                className="group rounded-2xl border border-ink-900/[0.07] bg-white p-6 transition hover:border-warm/40 hover:shadow-soft"
              >
                <p className="text-[10px] tracking-[0.24em] uppercase text-warm-deep">
                  {p.subject} / {p.topic}
                </p>
                <h3 className="mt-3 font-serif text-[1.05rem] leading-snug text-ink-900">
                  {p.title}
                </h3>
                <p className="mt-3 text-[13px] leading-[1.85] text-ink-600 line-clamp-3">
                  {p.description}
                </p>
                <p className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] text-ink-900 transition-transform duration-300 group-hover:translate-x-0.5">
                  プリントを開く
                  <ArrowRight className="h-3.5 w-3.5" />
                </p>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* 関連コラム */}
      {relatedArticles.length > 0 && (
        <Section
          eyebrow="DEEPER READING"
          title="関連する高校物理の学習コラム"
          className="bg-paper"
        >
          <div className="grid gap-5 md:grid-cols-2">
            {relatedArticles.map((a) => {
              const isExternal = Boolean(a.externalUrl);
              const href = articleHref(a);
              const inner = (
                <>
                  <p className="text-[10px] tracking-[0.24em] uppercase text-brand-deep">
                    {a.category}
                  </p>
                  <h3 className="mt-3 font-serif text-[1.05rem] leading-snug text-ink-900">
                    {a.title}
                  </h3>
                  <p className="mt-3 text-[13px] leading-[1.85] text-ink-600 line-clamp-3">
                    {a.description}
                  </p>
                  <p className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] text-brand-deep transition-transform duration-300 group-hover:translate-x-0.5">
                    学習コラムを読む
                    {isExternal ? (
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    ) : (
                      <ArrowRight className="h-3.5 w-3.5" />
                    )}
                  </p>
                </>
              );
              const className =
                "group rounded-2xl border border-ink-900/[0.07] bg-white p-6 transition hover:border-brand/40 hover:shadow-soft";
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
      )}

      <CtaBlock
        eyebrow="BOOK A TRIAL SESSION"
        title="このプリントを題材に、60 分の体験授業で診断します。"
        description="プリントを解いたうえで体験授業に来ていただくと、どこで止まっているかを最短で言語化できます。残り時間と志望校から逆算した学習戦略をお持ち帰りください。"
      />

      <JsonLdGraph
        id={`ld-graph-print-${print.slug}`}
        nodes={[
          breadcrumbJsonLd([
            { name: "ホーム", href: "/" },
            { name: "演習プリント", href: "/prints" },
            { name: print.title, href: `/prints/${print.slug}` },
          ]),
          webPageJsonLd({
            name: print.title,
            description: print.description,
            path: `/prints/${print.slug}`,
            dateModified: print.updatedAt ?? print.publishedAt,
          }),
          learningResourceJsonLd(print, pdfAbsoluteUrl),
        ]}
      />
    </>
  );
}

/**
 * 無料プリントを LearningResource として宣言する。
 * Google の教育系コンテンツ理解で広く解釈されるタイプ。`encoding` に PDF を添える。
 */
function learningResourceJsonLd(print: Print, pdfUrl: string) {
  const pageUrl = absoluteUrl(`/prints/${print.slug}`, siteConfig.url);
  const thumbUrl = absoluteUrl(printThumbPath(print), siteConfig.url);
  return {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "@id": `${pageUrl}#learning-resource`,
    name: print.title,
    description: print.description,
    url: pageUrl,
    inLanguage: "ja",
    isAccessibleForFree: print.kind === "free",
    learningResourceType: "Worksheet",
    educationalUse: "study",
    educationalLevel: print.gradeLevel,
    about: `${print.subject} / ${print.topic}`,
    keywords: [
      "高校物理 プリント",
      "物理 PDF",
      `${print.subject} 問題`,
      `${print.topic} 問題 PDF`,
      ...print.tags,
    ].join(", "),
    datePublished: print.publishedAt,
    dateModified: print.updatedAt ?? print.publishedAt,
    thumbnailUrl: thumbUrl,
    image: thumbUrl,
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "student",
    },
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: absoluteUrl("/teacher", siteConfig.url),
    },
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    encoding: {
      "@type": "MediaObject",
      contentUrl: pdfUrl,
      encodingFormat: "application/pdf",
      name: `${print.title}（PDF）`,
    },
  };
}
