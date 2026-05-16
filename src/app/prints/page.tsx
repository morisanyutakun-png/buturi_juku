import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight, FileText, Layers } from "lucide-react";
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
  PRINT_BLUR_DATA_URL,
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

const subjectChipTone: Record<string, string> = {
  力学: "border-brand/35 bg-brand-bg/70 text-brand-deep hover:bg-brand-bg",
  電磁気: "border-warm/40 bg-warm-bg/70 text-warm-deep hover:bg-warm-bg",
  波動: "border-forest/35 bg-forest-bg/70 text-forest-deep hover:bg-forest-bg",
  熱力学: "border-gold/40 bg-gold-soft/60 text-gold-deep hover:bg-gold-soft",
  原子: "border-ink-900/15 bg-white/85 text-ink-800 hover:bg-white",
};

/** 単元名 → アンカー id（ASCII 化）。section の id とチップの href を一致させる。 */
const subjectAnchor: Record<string, string> = {
  力学: "subject-mechanics",
  電磁気: "subject-electromagnetism",
  波動: "subject-waves",
  熱力学: "subject-thermodynamics",
  原子: "subject-atomic",
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

function PrintCard({ p, eager = false }: { p: Print; eager?: boolean }) {
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
          quality={72}
          loading={eager ? undefined : "lazy"}
          placeholder="blur"
          blurDataURL={PRINT_BLUR_DATA_URL}
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

      {/* 単元アンカー — 着地直後のユーザーが「自分の単元」へ最短でジャンプできる導線。
          横スクロール（モバイル）/ 折返し（PC）両対応。 */}
      <div className="sticky top-16 sm:top-[68px] z-20 border-b border-ink-900/[0.06] bg-paper/85 backdrop-blur-md supports-[backdrop-filter]:bg-paper/70">
        <Container className="py-3 sm:py-4">
          <div className="flex items-center gap-3 overflow-x-auto sm:flex-wrap sm:overflow-visible">
            <span className="hidden sm:inline-flex shrink-0 text-[10.5px] font-medium uppercase tracking-[0.24em] text-ink-500">
              JUMP TO
            </span>
            {groups.map((group) => (
              <Link
                key={group.subject}
                href={`#${subjectAnchor[group.subject] ?? group.subject}`}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[12.5px] sm:text-[12px] font-medium tracking-[0.04em] backdrop-blur-sm transition ${
                  subjectChipTone[group.subject] ?? subjectChipTone["原子"]
                }`}
              >
                {group.subject}
                <span className="font-mono text-[10px] opacity-70">
                  {group.items.length}
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </div>

      {/* 単元別 — Section の eyebrow / title でやや控えめなトーンに（H1 と差別化） */}
      <div id="materials" className="scroll-mt-32" />
      {groups.map((group, gi) => (
        <section
          key={group.subject}
          id={subjectAnchor[group.subject] ?? group.subject}
          className={`relative scroll-mt-32 py-12 sm:py-20 ${gi % 2 === 0 ? "bg-paper-soft" : "bg-paper"}`}
        >
          <Container>
            <div className="mb-7 sm:mb-9">
              <p
                className={`text-[10px] sm:text-[10px] font-medium uppercase tracking-[0.24em] sm:tracking-[0.32em] ${
                  subjectAccent[group.subject] ?? "text-brand-deep"
                }`}
              >
                {group.subject} ／ {group.items.length} 教材
              </p>
              <h2 className="mt-2 font-serif text-[1.4rem] sm:text-[1.7rem] leading-tight tracking-[-0.012em] text-ink-900">
                {group.subject}
              </h2>
            </div>

            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {group.items.map((p, ci) => (
                // 最上段（最初のグループの最初のカード）だけ eager に。それ以降は lazy。
                <PrintCard key={p.slug} p={p} eager={gi === 0 && ci === 0} />
              ))}
            </div>
          </Container>
        </section>
      ))}

      {/* 「もっと欲しい人」への分岐 — note の有料プリント送客 */}
      <NotePromoSection />

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
