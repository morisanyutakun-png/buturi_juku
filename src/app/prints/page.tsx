import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  ArrowRight,
  ArrowUpRight,
  FileText,
  Layers,
} from "lucide-react";
import { Section } from "@/components/section";
import { CtaBlock } from "@/components/cta-block";
import { NotePromoSection } from "@/components/note-promo-section";
import { PrintsHero } from "@/components/prints-hero";
import { Container } from "@/components/container";
import { JsonLdGraph } from "@/components/json-ld";
import { buildMetadata } from "@/lib/metadata";
import { formatDate } from "@/lib/utils";
import {
  breadcrumbJsonLd,
  collectionPageJsonLd,
  itemListJsonLd,
} from "@/lib/jsonld";
import { siteConfig } from "@/data/site";
import {
  prints,
  printsBySubject,
  printThumbPath,
  type Print,
} from "@/data/prints";

export const metadata: Metadata = buildMetadata({
  title: "演習プリント アーカイブ ｜ Web で読める 高校物理 教材集",
  description:
    "Solvora Learning Lab が公開する高校物理の演習プリント アーカイブ。ダウンロードしなくても Web 上でページ画像を読め、解答解説も併載。力学・電磁気の典型問題を、印刷向け PDF・段階解説・SEO 最適化された本文でそのまま提供します。",
  path: "/prints",
  keywords: [
    "高校物理 プリント",
    "高校物理 演習プリント",
    "物理 プリント PDF",
    "物理 演習問題 PDF",
    "高校物理 問題集 無料",
    "コンデンサ 問題 PDF",
    "単振動 問題 PDF",
    "REM プリント",
    "高校物理 教材",
    "高校物理 教材アーカイブ",
  ],
  category: "education",
});

const groups = printsBySubject();

const subjectAccent: Record<string, string> = {
  力学: "text-brand-deep",
  電磁気: "text-warm-deep",
  波動: "text-forest-deep",
  熱力学: "text-gold-deep",
  原子: "text-ink-800",
};

const difficultyBadge: Record<string, string> = {
  基礎: "bg-forest-bg text-forest-deep border-forest/30",
  標準: "bg-brand-bg text-brand-deep border-brand/30",
  応用: "bg-warm-bg text-warm-deep border-warm/30",
};

function KindBadge({ p }: { p: Print }) {
  if (p.kind === "paid") {
    return (
      <span className="inline-flex items-center rounded-full border border-gold/40 bg-gold-soft/50 px-2 py-0.5 text-[9.5px] font-medium tracking-[0.14em] uppercase text-gold-deep">
        有料 / note
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full border border-forest/30 bg-forest-bg/60 px-2 py-0.5 text-[9.5px] font-medium tracking-[0.14em] uppercase text-forest-deep">
      無料
    </span>
  );
}

function PrintCard({ p }: { p: Print }) {
  return (
    <Link
      href={`/prints/${p.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-ink-900/[0.07] bg-white/85 shadow-soft backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-ink-900/[0.14] hover:shadow-card"
    >
      {/* Thumbnail — 1 ページ目を A4 比率で */}
      <div className="relative aspect-[210/297] w-full overflow-hidden bg-paper-soft">
        <Image
          src={printThumbPath(p)}
          alt={`${p.title}（${p.subject} / ${p.topic}）— 1 ページ目プレビュー`}
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/30"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <KindBadge p={p} />
          <span
            className={`inline-flex rounded-full border bg-white/95 px-2 py-0.5 text-[9.5px] font-medium tracking-[0.14em] backdrop-blur ${
              difficultyBadge[p.difficulty] ?? difficultyBadge["標準"]
            }`}
          >
            {p.difficulty}
          </span>
        </div>
        <p className="absolute bottom-2 right-2 rounded-full bg-ink-900/85 px-2 py-0.5 font-mono text-[9.5px] tracking-[0.14em] text-paper">
          全 {p.pageCount} P
        </p>
      </div>

      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
        <div>
          <p
            className={`text-[10px] font-medium tracking-[0.22em] uppercase ${
              subjectAccent[p.subject] ?? "text-brand-deep"
            }`}
          >
            {p.subject} / {p.topic}
          </p>
          <h3 className="mt-3 font-serif text-[1.05rem] sm:text-[1.15rem] leading-snug tracking-[-0.005em] text-ink-900">
            {p.title}
          </h3>
          <p className="mt-2.5 text-[12.5px] sm:text-[13px] leading-[1.8] text-ink-600 line-clamp-3">
            {p.description}
          </p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] text-ink-500">
          <span className="inline-flex items-center gap-1.5">
            <Layers className="h-3 w-3" aria-hidden />
            {p.gradeLevel}
          </span>
          <span className="inline-flex items-center gap-1.5 justify-end">
            <FileText className="h-3 w-3" aria-hidden />
            更新 {formatDate(p.updatedAt ?? p.publishedAt)}
          </span>
        </div>

        <div className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] text-ink-900 transition-transform duration-300 group-hover:translate-x-0.5">
          Web で読む
          <ArrowRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </Link>
  );
}

export default function PrintsIndexPage() {
  const total = prints.length;

  // ヒーローに置く 3 枚は、印象の異なる単元から拾うために distinct subject 優先で選抜。
  const heroCards: typeof prints = [];
  const seenSubjects = new Set<string>();
  for (const p of prints) {
    if (!seenSubjects.has(p.subject)) {
      heroCards.push(p);
      seenSubjects.add(p.subject);
    }
    if (heroCards.length >= 3) break;
  }
  if (heroCards.length < 3) {
    for (const p of prints) {
      if (!heroCards.includes(p)) heroCards.push(p);
      if (heroCards.length >= 3) break;
    }
  }

  return (
    <>
      <PrintsHero cards={heroCards} total={total} />

      {/* 単元別 — Section の eyebrow / title でやや控えめなトーンに（H1 と差別化） */}
      <div id="materials" className="scroll-mt-20" />
      {groups.map((group, gi) => (
        <section
          key={group.subject}
          className={`relative py-12 sm:py-20 ${gi % 2 === 0 ? "bg-paper-soft" : "bg-paper"}`}
        >
          <Container>
            <div className="mb-8 sm:mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p
                  className={`flex flex-wrap items-center gap-x-2 text-[10px] sm:text-[10px] font-medium uppercase tracking-[0.22em] sm:tracking-[0.32em] ${
                    subjectAccent[group.subject] ?? "text-brand-deep"
                  } before:inline-block before:h-px before:w-5 before:bg-current before:opacity-50`}
                >
                  {group.subject} ／ {group.items.length} 教材
                </p>
                <h2 className="mt-3 font-serif text-[1.5rem] sm:text-[1.85rem] leading-tight tracking-[-0.012em] text-ink-900">
                  {group.subject}の演習プリント
                </h2>
              </div>
              <p className="max-w-xl text-[13.5px] leading-[1.85] text-ink-600">
                {group.subject}分野で頻出する典型問題を、PDF と Web プレビューのセットで公開しています。授業・自習・直前演習にそのまま使えます。
              </p>
            </div>

            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {group.items.map((p) => (
                <PrintCard key={p.slug} p={p} />
              ))}
            </div>
          </Container>
        </section>
      ))}

      {/* 「もっと欲しい人」への分岐 — note の有料プリント送客 */}
      <NotePromoSection />

      {/* 塾本体への送客 — 体験授業 CTA */}
      <Section className="bg-paper-soft" aria-labelledby="prints-trial-bridge">
        <Container>
          <div className="mx-auto max-w-3xl rounded-3xl border border-ink-900/[0.07] bg-white/85 p-7 sm:p-10 shadow-card backdrop-blur-sm">
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.24em] sm:tracking-[0.32em] text-brand-deep before:inline-block before:h-px before:w-5 before:bg-current before:opacity-50">
              ONE MORE STEP
            </p>
            <h2
              id="prints-trial-bridge"
              className="mt-4 sm:mt-6 font-serif text-[1.4rem] sm:text-[1.7rem] leading-[1.4] tracking-[-0.012em] text-ink-900"
            >
              プリントを解いて、詰まる箇所がある人へ。
            </h2>
            <p className="mt-4 text-[14.5px] sm:text-[15px] leading-[1.95] text-ink-700">
              プリントは『正解への道筋』を見せる教材です。<strong className="font-medium text-ink-900">『なぜそう立式するか』『どこで自分が間違えやすいか』</strong>までを掘り下げたい場合は、60 分の体験授業でこのプリントを題材に診断します。<br className="hidden sm:block" />
              無理な勧誘はしません。プリント 1 枚分の課題感を、その場で言語化してお返しします。
            </p>
            <div className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:gap-3">
              <Link
                href="/trial"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink-900 px-6 py-3.5 text-[14.5px] font-medium text-paper transition hover:bg-ink-800 sm:w-auto"
              >
                体験授業の流れを見る
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/articles"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink-900/[0.14] bg-white/80 px-6 py-3.5 text-[14px] text-ink-800 backdrop-blur transition hover:border-ink-900/30 hover:bg-white sm:w-auto"
              >
                高校物理の学習コラムも読む
                <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBlock
        eyebrow="STILL STUCK?"
        title="プリントを解いて『どこで間違えたか』を、一緒に診断します。"
        description="体験授業ではこのプリントの単元を例に、立式の癖と次の一手をお渡しします。プリントを解いてから来ていただくと、診断の解像度がさらに上がります。"
      />

      <JsonLdGraph
        id="ld-graph-prints"
        nodes={[
          breadcrumbJsonLd([
            { name: "ホーム", href: "/" },
            { name: "演習プリント", href: "/prints" },
          ]),
          collectionPageJsonLd({
            name: "演習プリント アーカイブ ｜ Solvora Learning Lab",
            description:
              "Solvora Learning Lab が公開する高校物理の演習プリント。Web 上でページ画像を読め、解答解説と印刷向け PDF が併載されています。",
            path: "/prints",
            items: prints.map((p) => ({
              name: p.title,
              href: `/prints/${p.slug}`,
              description: p.description,
            })),
          }),
          itemListJsonLd({
            name: "演習プリント一覧",
            description: `${siteConfig.name} が公開する高校物理の演習プリント（Web プレビュー + PDF + 解答解説）の一覧です。`,
            path: "/prints",
            items: prints.map((p) => ({
              name: p.title,
              href: `/prints/${p.slug}`,
              description: p.description,
            })),
          }),
        ]}
      />
    </>
  );
}
