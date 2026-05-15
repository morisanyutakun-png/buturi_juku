import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Calendar,
  Download,
  FileText,
  GraduationCap,
  Printer,
  Sparkles,
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
  type PrintBlock,
  type PrintSection,
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

function Blocks({ blocks }: { blocks: PrintBlock[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (b.kind === "p") {
          return (
            <p
              key={i}
              dangerouslySetInnerHTML={{ __html: b.html }}
            />
          );
        }
        if (b.kind === "eq") {
          return (
            <div
              key={i}
              className="print-eq"
              dangerouslySetInnerHTML={{ __html: b.html }}
            />
          );
        }
        if (b.kind === "list") {
          return (
            <ul key={i} className="my-4 list-disc space-y-2 pl-6 leading-[1.9] text-ink-700">
              {b.items.map((item, j) => (
                <li key={j} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>
          );
        }
        if (b.kind === "callout") {
          return (
            <aside
              key={i}
              className="my-6 rounded-2xl border border-warm/25 bg-warm-bg/55 p-5 sm:p-6"
            >
              <p className="text-[10px] tracking-[0.28em] uppercase text-warm-deep">
                {b.label}
              </p>
              <p
                className="mt-3 leading-[1.95] text-ink-800"
                dangerouslySetInnerHTML={{ __html: b.html }}
              />
            </aside>
          );
        }
        return null;
      })}
    </>
  );
}

function SolutionSection({ s }: { s: PrintSection }) {
  return (
    <section id={s.id} className="scroll-mt-24">
      <h4 className="mt-8 mb-3 font-serif text-[1.1rem] sm:text-[1.18rem] leading-snug text-ink-900">
        {s.heading}
      </h4>
      <Blocks blocks={s.blocks} />
    </section>
  );
}

/**
 * 教材詳細ページのメタ情報ストリップ（分野・難易度・学年・ページ数・更新日）。
 * Hero 内に配置して、見出しの直後に「この教材は何か」が 1 行で読めるようにする。
 */
function MetaStrip({ print }: { print: Print }) {
  const items: { icon: typeof FileText; label: string; value: string }[] = [
    { icon: BookOpen, label: "分野", value: `${print.subject} / ${print.topic}` },
    {
      icon: Sparkles,
      label: "難易度",
      value: `${print.difficulty}（配点 ${print.points}）`,
    },
    { icon: GraduationCap, label: "対象", value: print.gradeLevel },
    { icon: FileText, label: "ページ", value: `全 ${print.pageCount} ページ` },
    {
      icon: Calendar,
      label: "更新",
      value: formatDate(print.updatedAt ?? print.publishedAt),
    },
  ];
  return (
    <dl className="mt-8 grid grid-cols-2 gap-x-5 gap-y-3 rounded-2xl border border-ink-900/[0.08] bg-white/85 px-5 py-4 sm:grid-cols-3 sm:px-6 sm:py-5">
      {items.map((it) => (
        <div key={it.label} className="flex items-start gap-2.5">
          <it.icon className="mt-[3px] h-3.5 w-3.5 shrink-0 text-ink-400" aria-hidden />
          <div className="min-w-0">
            <dt className="text-[10px] tracking-[0.18em] uppercase text-ink-500">
              {it.label}
            </dt>
            <dd className="mt-0.5 text-[12.5px] text-ink-800 leading-snug truncate">
              {it.value}
            </dd>
          </div>
        </div>
      ))}
    </dl>
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

      {/* HERO — title, meta, lead, primary CTA (PDF DL) */}
      <article>
        <Container className="py-10 sm:py-14">
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] tracking-[0.22em] sm:tracking-[0.28em] uppercase text-brand-deep">
              <span>{print.subject} / {print.topic}</span>
              <span className="h-px w-6 bg-warm/40" aria-hidden />
              <span className="inline-flex rounded-full border border-warm/30 bg-warm-bg/60 px-2 py-0.5 text-[9.5px] text-warm-deep">
                {print.difficulty}
              </span>
              {isFree ? (
                <span className="inline-flex rounded-full border border-forest/30 bg-forest-bg/60 px-2 py-0.5 text-[9.5px] text-forest-deep">
                  無料
                </span>
              ) : (
                <span className="inline-flex rounded-full border border-gold/40 bg-gold-soft/50 px-2 py-0.5 text-[9.5px] text-gold-deep">
                  有料
                </span>
              )}
            </div>

            <h1 className="mt-5 sm:mt-6 font-serif text-[1.9rem] sm:text-display-md text-ink-900 leading-[1.3] sm:leading-tight tracking-[-0.012em]">
              {print.title}
            </h1>
            <p className="mt-5 text-[15px] sm:text-[15.5px] leading-[1.95] text-ink-700">
              {print.lead}
            </p>

            <MetaStrip print={print} />

            <ul className="mt-5 flex flex-wrap gap-2">
              {print.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-ink-900/10 bg-white px-3 py-1 text-xs text-ink-600"
                >
                  #{t}
                </li>
              ))}
            </ul>

            {/* PDF DL — primary CTA above the fold */}
            <div className="mt-8 sm:mt-10 rounded-2xl border border-ink-900/[0.08] bg-gradient-to-br from-warm-bg/70 via-paper to-brand-bg/40 p-5 sm:p-7 shadow-card">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.28em] uppercase text-warm-deep">
                    <Sparkles className="h-3 w-3" aria-hidden />
                    {isFree ? "FREE PDF — REM 製プリント" : "PAID — note で購入"}
                  </p>
                  <p className="mt-3 font-serif text-[1.05rem] sm:text-[1.15rem] leading-snug text-ink-900">
                    {isFree
                      ? `問題 + 解答 + 解説（全 ${print.pageCount} ページ・印刷向け）`
                      : `${print.subject} / ${print.topic} の有料教材（全 ${print.pageCount} ページ）`}
                  </p>
                  <p className="mt-2 text-[12.5px] leading-[1.7] text-ink-600">
                    {isFree
                      ? "会員登録なし。授業・自習・配布・直前演習に自由にお使いください。"
                      : "note で購入すると、完全版 PDF と詳しい解説がダウンロードできます。"}
                  </p>
                </div>
                {isFree ? (
                  <a
                    href={print.pdfPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 px-6 py-3.5 text-[14.5px] font-medium text-paper transition hover:bg-ink-800"
                  >
                    <Download className="h-4 w-4" aria-hidden />
                    PDF をダウンロード
                  </a>
                ) : (
                  <a
                    href={print.paidUrl ?? NOTE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 px-6 py-3.5 text-[14.5px] font-medium text-paper transition hover:bg-ink-800"
                  >
                    note で購入する
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11.5px] text-ink-500">
                <span className="inline-flex items-center gap-1.5">
                  <Printer className="h-3 w-3" aria-hidden />
                  A4 印刷向けレイアウト
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <FileText className="h-3 w-3" aria-hidden />
                  問題＋解答解説セット
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <BookOpen className="h-3 w-3" aria-hidden />
                  Web プレビューあり
                </span>
              </div>
            </div>
          </div>
        </Container>

        {/* Web プレビュー — メインビュー */}
        <section className="bg-paper-soft py-12 sm:py-16 border-y border-ink-900/[0.06]">
          <Container>
            <div className="mx-auto mb-8 max-w-3xl text-center sm:text-left">
              <p className="flex flex-wrap items-center justify-center gap-x-2 text-[10px] sm:text-[10px] font-medium uppercase tracking-[0.22em] sm:tracking-[0.32em] text-warm-deep sm:justify-start sm:before:inline-block sm:before:h-px sm:before:w-5 sm:before:bg-current sm:before:opacity-50">
                READ ON THE WEB
              </p>
              <h2 className="mt-3 font-serif text-[1.5rem] sm:text-[1.85rem] leading-tight tracking-[-0.012em] text-ink-900">
                ダウンロードしなくても、ここで全文読めます。
              </h2>
              <p className="mt-3 text-[13.5px] sm:text-[14px] leading-[1.9] text-ink-600">
                PDF と同じレイアウトを、Web 上でそのまま縦に読めます。印刷したいときだけ、上のボタンから A4 PDF をダウンロードしてください。
              </p>
            </div>
            <PrintPreview print={print} />
          </Container>
        </section>

        {/* SNS Share */}
        <section className="py-10 sm:py-12">
          <Container>
            <PrintShareBar
              path={`/prints/${print.slug}`}
              title={print.title}
            />
          </Container>
        </section>

        {/* HTML 文字起こし — SEO 用、開閉可能 */}
        <Container className="pb-12 sm:pb-16">
          <details className="mx-auto max-w-3xl group rounded-2xl border border-ink-900/[0.08] bg-white/85 shadow-soft" open>
            <summary className="cursor-pointer list-none px-5 sm:px-7 py-4 sm:py-5 flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] tracking-[0.28em] uppercase text-brand-deep">
                  TRANSCRIPT — 問題本文と解答解説（読み上げ・検索向け）
                </p>
                <p className="mt-1 text-[12.5px] text-ink-500">
                  PDF と同じ内容を HTML で展開しています。コピー＆ペーストや読み上げに便利です。
                </p>
              </div>
              <ArrowRight
                className="h-4 w-4 text-ink-400 transition-transform group-open:rotate-90"
                aria-hidden
              />
            </summary>

            <div className="border-t border-ink-900/[0.06] px-5 sm:px-7 pb-8 sm:pb-10 print-content">
              <h3 className="mt-7 font-serif text-[1.3rem] sm:text-[1.4rem] text-warm-deep border-b-2 border-warm/70 pb-3 tracking-[-0.01em]">
                問題
              </h3>
              <div className="mt-4">
                <Blocks blocks={print.problemSetup} />
              </div>
              <ol className="mt-6 list-decimal space-y-3 pl-6 leading-[1.95] text-ink-700">
                {print.problemQuestions.map((q, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: q }} />
                ))}
              </ol>

              <h3 className="mt-12 font-serif text-[1.3rem] sm:text-[1.4rem] text-warm-deep border-b-2 border-warm/70 pb-3 tracking-[-0.01em]">
                解答・解説
              </h3>
              <div>
                {print.solution.map((s) => (
                  <SolutionSection key={s.id} s={s} />
                ))}
              </div>

              {print.pointNote && print.pointNote.length > 0 && (
                <div className="mt-8">
                  <Blocks blocks={print.pointNote} />
                </div>
              )}
            </div>
          </details>
        </Container>

        {/* Inline CTA — note の有料プリントへ */}
        <Container className="pb-10 sm:pb-14">
          <aside className="mx-auto max-w-3xl rounded-2xl border border-gold/30 bg-gradient-to-br from-gold-soft/40 via-white to-paper p-6 sm:p-8">
            <p className="flex items-center gap-2 text-[10px] tracking-[0.28em] uppercase text-gold-deep">
              <Sparkles className="h-3 w-3" aria-hidden />
              MORE PRINTS — note
            </p>
            <p className="mt-3 font-serif text-[1.05rem] sm:text-[1.15rem] leading-snug text-ink-900">
              同じ単元の<strong className="font-medium">類題セット（基礎→標準→応用）</strong>を、note で販売しています。
            </p>
            <p className="mt-3 text-[13.5px] leading-[1.85] text-ink-600">
              解いた手応えを残したまま、もう一段踏み込みたい人向けに、REM で生成した類題＋詳細解説の PDF を単元別に提供しています。
            </p>
            <a
              href={NOTE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-5 inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-3 text-[13.5px] font-medium text-paper transition hover:bg-ink-800"
            >
              note のラインナップを見る
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </aside>
        </Container>

        {/* Inline CTA — 体験授業 */}
        <Container className="pb-14 sm:pb-20">
          <aside className="mx-auto max-w-3xl rounded-2xl border border-brand/30 bg-gradient-to-br from-brand-bg via-white to-paper p-6 sm:p-8">
            <p className="text-[10px] tracking-[0.28em] uppercase text-brand-deep">
              NEXT STEP
            </p>
            <h3 className="mt-3 font-serif text-[1.15rem] sm:text-[1.3rem] leading-snug text-ink-900">
              解説を読んでも『なぜそう立式するか』が腑に落ちない方へ。
            </h3>
            <p className="mt-3 text-[13.5px] sm:text-[14px] leading-[1.9] text-ink-700">
              体験授業（60 分）では、このプリントを題材に <strong className="font-medium text-ink-900">言語化 → 立式 → 演習</strong> の手順を、対話で再現します。<br className="hidden sm:block" />
              どこで止まっているかを、その場で言葉にしてお返しします。
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/trial"
                className="group inline-flex items-center gap-2 rounded-full bg-warm px-5 py-3 text-[13.5px] font-medium text-white transition hover:bg-warm-deep"
              >
                体験授業を申し込む
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 rounded-full border border-ink-900/[0.14] bg-white/80 px-5 py-3 text-[13.5px] text-ink-800 backdrop-blur transition hover:border-ink-900/30 hover:bg-white"
              >
                講座一覧を見る
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
