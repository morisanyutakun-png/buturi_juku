import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/section";
import { CtaBlock } from "@/components/cta-block";
import { Breadcrumb } from "@/components/breadcrumb";
import { ArticleToc } from "@/components/article-toc";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import {
  allArticleSlugs,
  articleHref,
  getArticleBySlug,
  getRelatedArticles,
} from "@/data/articles";
import { articleJsonLd, breadcrumbJsonLd, webPageJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";
import { formatDate } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return allArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return buildMetadata({
    title: `${article.title} | 高校物理専門塾の学習コラム`,
    description: article.description,
    path: `/articles/${article.slug}`,
    type: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt ?? article.publishedAt,
    keywords: ["高校物理専門塾", article.category, ...article.tags],
    category: article.category,
  });
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getRelatedArticles(article.slug);

  return (
    <>
      <Container className="pt-10">
        <Breadcrumb
          items={[
            { label: "ホーム", href: "/" },
            { label: "物理学習コラム", href: "/articles" },
            { label: article.title, href: `/articles/${article.slug}` },
          ]}
        />
      </Container>

      <article>
        <Container className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 text-[10px] tracking-[0.28em] uppercase text-brand-deep">
              <span>{article.category}</span>
              <span className="h-px w-6 bg-warm/40" aria-hidden />
              <time dateTime={article.publishedAt} className="text-ink-400">
                {formatDate(article.publishedAt)}
              </time>
              <span className="text-ink-400">{article.readingTime}</span>
            </div>
            <h1 className="mt-6 font-serif text-display-md text-ink-900 leading-tight">
              {article.title}
            </h1>
            <p className="mt-6 text-ink-700 leading-relaxed">{article.lead}</p>

            <ul className="mt-8 flex flex-wrap gap-2">
              {article.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-ink-900/10 bg-white px-3 py-1 text-xs text-ink-600"
                >
                  #{t}
                </li>
              ))}
            </ul>
          </div>
        </Container>

        <Container className="pb-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_18rem]">
            <div className="article-content max-w-none">
              {article.sections.map((s) => (
                <section key={s.id} id={s.id}>
                  <h2>{s.heading}</h2>
                  {s.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </section>
              ))}
              <div className="mt-20 rounded-2xl border border-brand/30 bg-gradient-to-br from-accent/10 via-white to-white p-8">
                <p className="text-[10px] tracking-[0.28em] uppercase text-brand-deep">
                  NEXT STEP
                </p>
                <h2 className="mt-3 font-serif text-2xl text-ink-900">
                  読むだけで終わらせない。<br className="sm:hidden" />
                  体験授業で、現在地を診断しませんか。
                </h2>
                <p className="mt-4 text-sm text-ink-700 leading-relaxed">
                  体験授業では、この記事の内容をあなたの現状に合わせて具体化します。
                  60分で学習戦略のドラフトをお渡しします。
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/trial"
                    className="inline-flex items-center gap-2 rounded-full bg-warm px-5 py-3 text-sm font-medium text-white hover:bg-warm-deep transition"
                  >
                    体験授業を申し込む
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/courses"
                    className="inline-flex items-center gap-2 rounded-full border border-ink-900/15 px-5 py-3 text-sm text-ink-900 hover:border-brand hover:text-brand transition"
                  >
                    高校物理専門塾の講座を見る
                  </Link>
                </div>
              </div>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <ArticleToc sections={article.sections} />

              <div className="rounded-2xl border border-ink-900/10 bg-white p-6 text-sm">
                <p className="text-[10px] tracking-[0.28em] uppercase text-brand-deep">
                  AUTHOR
                </p>
                <p className="mt-3 font-serif text-ink-900">森 祐太</p>
                <p className="mt-2 text-xs text-ink-600 leading-relaxed">
                  物理専門塾 主宰。書籍執筆・教材開発を手がける。
                </p>
                <Link
                  href="/teacher"
                  className="mt-4 inline-flex items-center gap-1 text-xs text-brand-deep hover:text-brand transition"
                >
                  講師・森祐太のプロフィールを見る
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </article>

      {related.length > 0 && (
        <Section
          eyebrow="RELATED"
          title="関連するコラム"
          className="bg-paper-soft"
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => {
              const isExternal = Boolean(a.externalUrl);
              const href = articleHref(a);
              const className =
                "group rounded-2xl border border-ink-900/10 bg-white p-7 transition hover:border-brand/40 hover:bg-paper-soft";

              const inner = (
                <>
                  <p className="text-[10px] tracking-[0.28em] uppercase text-brand-deep">
                    {a.category}
                  </p>
                  <h3 className="mt-3 font-serif text-lg leading-snug text-ink-900">
                    {a.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-ink-600">
                    {a.description}
                  </p>
                  <p className="mt-4 inline-flex items-center gap-1 text-xs text-brand-deep transition group-hover:translate-x-0.5">
                    高校物理の関連コラムを読む
                    <ArrowRight className="h-3 w-3" />
                  </p>
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
      )}

      <CtaBlock />

      <JsonLd
        id={`ld-breadcrumb-article-${article.slug}`}
        data={breadcrumbJsonLd([
          { name: "ホーム", href: "/" },
          { name: "物理学習コラム", href: "/articles" },
          { name: article.title, href: `/articles/${article.slug}` },
        ])}
      />
      <JsonLd
        id={`ld-article-${article.slug}`}
        data={articleJsonLd({
          title: article.title,
          description: article.description,
          slug: article.slug,
          publishedAt: article.publishedAt,
          updatedAt: article.updatedAt,
          keywords: ["高校物理専門塾", article.category, ...article.tags],
          articleSection: article.category,
          wordCount: article.sections
            .flatMap((s) => s.paragraphs)
            .reduce((total, p) => total + p.length, 0),
        })}
      />
      <JsonLd
        id={`ld-webpage-article-${article.slug}`}
        data={webPageJsonLd({
          name: article.title,
          description: article.description,
          path: `/articles/${article.slug}`,
          dateModified: article.updatedAt ?? article.publishedAt,
        })}
      />
    </>
  );
}
