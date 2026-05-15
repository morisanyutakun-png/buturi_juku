import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, Download, FileText, Sparkles } from "lucide-react";
import { Section } from "@/components/section";
import { CtaBlock } from "@/components/cta-block";
import { NotePromoSection } from "@/components/note-promo-section";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/container";
import { JsonLdGraph } from "@/components/json-ld";
import { buildMetadata } from "@/lib/metadata";
import {
  breadcrumbJsonLd,
  collectionPageJsonLd,
  itemListJsonLd,
} from "@/lib/jsonld";
import { siteConfig } from "@/data/site";
import { prints, printsBySubject, type Print } from "@/data/prints";

export const metadata: Metadata = buildMetadata({
  title: "高校物理 無料プリント集 ｜ REM 製 問題＋解答解説 PDF",
  description:
    "森祐太の物理専門塾 Solvora Learning Lab が無料公開する高校物理プリント集。力学・電磁気の典型問題を、問題本文・段階解説・印刷向け PDF でそのまま使えます。共通テスト〜難関大対策の演習教材として、塾生・独学者問わずダウンロード自由です。",
  path: "/prints",
  keywords: [
    "高校物理 プリント",
    "高校物理 プリント 無料",
    "物理 プリント PDF",
    "物理 演習問題 PDF",
    "高校物理 問題集 無料",
    "コンデンサ 問題 PDF",
    "単振動 問題 PDF",
    "REM プリント",
    "高校物理 演習プリント 無料",
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

function PrintCard({ p }: { p: Print }) {
  return (
    <Link
      href={`/prints/${p.slug}`}
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border border-ink-900/[0.07] bg-white/85 p-5 sm:p-7 shadow-soft backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-ink-900/[0.14] hover:shadow-card"
    >
      <div>
        <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-[10px] font-medium tracking-[0.18em] sm:tracking-[0.24em] uppercase">
          <span className={subjectAccent[p.subject] ?? "text-brand-deep"}>
            {p.subject} / {p.topic}
          </span>
          <span
            className={`inline-flex rounded-full border px-2 py-0.5 text-[9.5px] tracking-[0.14em] ${
              difficultyBadge[p.difficulty] ?? difficultyBadge["標準"]
            }`}
          >
            {p.difficulty}
          </span>
        </div>
        <h3 className="mt-4 sm:mt-5 font-serif text-[1.15rem] sm:text-[1.3rem] leading-[1.45] tracking-[-0.01em] text-ink-900">
          {p.title}
        </h3>
        <p className="mt-3 sm:mt-4 text-[13px] sm:text-[13.5px] leading-[1.85] text-ink-600 line-clamp-4">
          {p.description}
        </p>
      </div>
      <div className="mt-5 sm:mt-6 flex items-center justify-between text-[12.5px] sm:text-[12px] text-ink-500">
        <span className="inline-flex items-center gap-1.5">
          <FileText className="h-3.5 w-3.5" aria-hidden />
          PDF・[{p.points} 点]
        </span>
        <span className="inline-flex items-center gap-1.5 text-ink-900 transition-transform duration-300 group-hover:translate-x-0.5">
          無料プリントを見る
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}

export default function PrintsIndexPage() {
  const total = prints.length;

  return (
    <>
      <PageHero
        eyebrow={`PRINTS — REM 無料プリント集（全 ${total} 枚 / 順次追加）`}
        watermark="解"
        tone="warm"
        breadcrumb={[
          { label: "ホーム", href: "/" },
          { label: "プリント集", href: "/prints" },
        ]}
        title={
          <>
            <span className="block">高校物理の典型問題を、</span>
            <span className="block">
              <span className="text-warm-deep">PDF と解説</span>でそのまま。
            </span>
          </>
        }
        description="森祐太の物理専門塾 Solvora Learning Lab が、授業・体験で使っている REM 製プリントの一部を無料公開しています。問題本文・段階解説・印刷向け PDF まで、すべて自由にお使いください。塾生でなくても、独学・部活引退後の集中演習・直前期の復習教材として活用できます。"
      >
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-900/[0.12] bg-white/80 px-3.5 py-1.5 text-[12px] sm:text-[12.5px] text-ink-700 backdrop-blur">
            <Sparkles className="h-3 w-3 text-warm-deep" aria-hidden />
            すべて無料 / 会員登録なし
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-900/[0.12] bg-white/80 px-3.5 py-1.5 text-[12px] sm:text-[12.5px] text-ink-700 backdrop-blur">
            <Download className="h-3 w-3 text-brand-deep" aria-hidden />
            印刷 / 配布も可
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-900/[0.12] bg-white/80 px-3.5 py-1.5 text-[12px] sm:text-[12.5px] text-ink-700 backdrop-blur">
            <FileText className="h-3 w-3 text-forest-deep" aria-hidden />
            問題＋解答解説セット
          </span>
        </div>
      </PageHero>

      {/* 単元別カテゴリ */}
      {groups.map((group) => (
        <Section
          key={group.subject}
          eyebrow={`${group.subject} — ${group.items.length} 枚`}
          title={`${group.subject}の無料プリント`}
          description={`${group.subject}分野で頻出する典型問題を、PDF と HTML 解説のセットで公開しています。授業・自習・直前演習にそのまま使えます。`}
          className={group.subject === "力学" ? "bg-paper-soft" : "bg-paper"}
        >
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {group.items.map((p) => (
              <PrintCard key={p.slug} p={p} />
            ))}
          </div>
        </Section>
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
              className="mt-4 sm:mt-6 font-serif text-[1.45rem] sm:text-[1.75rem] leading-[1.4] tracking-[-0.012em] text-ink-900"
            >
              プリントだけでは詰まる箇所がある人へ。
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
            { name: "プリント集", href: "/prints" },
          ]),
          collectionPageJsonLd({
            name: "高校物理 無料プリント集 ｜ REM 製 問題＋解答解説 PDF",
            description:
              "Solvora Learning Lab が無料公開する高校物理プリント集。力学・電磁気の典型問題を、問題本文・段階解説・印刷向け PDF で提供します。",
            path: "/prints",
            items: prints.map((p) => ({
              name: p.title,
              href: `/prints/${p.slug}`,
              description: p.description,
            })),
          }),
          itemListJsonLd({
            name: "REM 無料プリント一覧",
            description: `${siteConfig.name} が無料公開する高校物理プリント（問題＋解答解説 PDF）の一覧です。`,
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
