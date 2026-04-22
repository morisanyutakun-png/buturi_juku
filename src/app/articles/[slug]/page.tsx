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
  getArticleBySlug,
  getRelatedArticles,
} from "@/data/articles";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
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
    title: article.title,
    description: article.description,
    path: `/articles/${article.slug}`,
    type: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt ?? article.publishedAt,
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
            <div className="flex flex-wrap items-center gap-3 text-[10px] tracking-[0.28em] uppercase text-accent">
              <span>{article.category}</span>
              <span className="h-px w-6 bg-accent/40" aria-hidden />
              <time dateTime={article.publishedAt} className="text-paper/40">
                {formatDate(article.publishedAt)}
              </time>
              <span className="text-paper/40">{article.readingTime}</span>
            </div>
            <h1 className="mt-6 font-serif text-display-md text-paper leading-tight">
              {article.title}
            </h1>
            <p className="mt-6 text-paper/70 leading-relaxed">{article.lead}</p>

            <ul className="mt-8 flex flex-wrap gap-2">
              {article.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-paper/10 bg-ink-900/60 px-3 py-1 text-xs text-paper/60"
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
              <div className="mt-20 rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 via-ink-900/60 to-ink-900 p-8">
                <p className="text-[10px] tracking-[0.28em] uppercase text-accent">
                  NEXT STEP
                </p>
                <h2 className="mt-3 font-serif text-2xl text-paper">
                  読むだけで終わらせない。<br className="sm:hidden" />
                  体験授業で、現在地を診断しませんか。
                </h2>
                <p className="mt-4 text-sm text-paper/70 leading-relaxed">
                  体験授業では、この記事の内容をあなたの現状に合わせて具体化します。
                  60分で学習戦略のドラフトをお渡しします。
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/trial"
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-ink-950 hover:bg-accent-soft transition"
                  >
                    体験授業を申し込む
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/courses"
                    className="inline-flex items-center gap-2 rounded-full border border-paper/20 px-5 py-3 text-sm text-paper hover:border-accent hover:text-accent transition"
                  >
                    講座を見る
                  </Link>
                </div>
              </div>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <ArticleToc sections={article.sections} />

              <div className="rounded-2xl border border-paper/10 bg-ink-900/60 p-6 text-sm">
                <p className="text-[10px] tracking-[0.28em] uppercase text-accent">
                  AUTHOR
                </p>
                <p className="mt-3 font-serif text-paper">森 祐太</p>
                <p className="mt-2 text-xs text-paper/60 leading-relaxed">
                  物理専門塾 主宰。書籍執筆・教材開発を手がける。
                </p>
                <Link
                  href="/teacher"
                  className="mt-4 inline-flex items-center gap-1 text-xs text-accent hover:text-accent-soft transition"
                >
                  プロフィールを見る
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
          className="bg-ink-900/40"
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <Link
                key={a.slug}
                href={`/articles/${a.slug}`}
                className="group rounded-2xl border border-paper/10 bg-ink-900/60 p-7 transition hover:border-accent/40 hover:bg-ink-800/60"
              >
                <p className="text-[10px] tracking-[0.28em] uppercase text-accent">
                  {a.category}
                </p>
                <h3 className="mt-3 font-serif text-lg leading-snug text-paper">
                  {a.title}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-paper/60">
                  {a.description}
                </p>
                <p className="mt-4 inline-flex items-center gap-1 text-xs text-accent transition group-hover:translate-x-0.5">
                  続きを読む
                  <ArrowRight className="h-3 w-3" />
                </p>
              </Link>
            ))}
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
        })}
      />
    </>
  );
}
