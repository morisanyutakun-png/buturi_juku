import Link from "next/link";
import Image from "next/image";
import { ArrowRight, FileDown, FileText, Sparkles } from "lucide-react";
import { Container } from "@/components/container";
import {
  prints,
  printsBySubject,
  printThumbPath,
  PRINT_BLUR_DATA_URL,
  type Print,
  type PrintSubject,
} from "@/data/prints";

/**
 * TOP の「教材棚」セクション。
 *
 * サイト方針（2026.05）以降:
 *   - ホームの第一フォールド直下に置き、Hero の「演習プリントを開く」CTA から
 *     1 スクロールでプリント棚そのものが見える状態にする。
 *   - 単元別チップ → 棚の 6 冊サムネ → 価値訴求バー → 全教材リンク、の順で
 *     /prints への深い導線を作る。
 *   - 個別指導サイトではなく "教材リソースサイト" の表情を作る主役セクション。
 */

const subjectAccent: Record<PrintSubject, string> = {
  力学: "text-brand-deep",
  電磁気: "text-warm-deep",
  波動: "text-forest-deep",
  熱力学: "text-gold-deep",
  原子: "text-ink-800",
};

const subjectChipTone: Record<PrintSubject, string> = {
  力学: "border-brand/30 bg-brand-bg/65 text-brand-deep hover:bg-brand-bg",
  電磁気: "border-warm/35 bg-warm-bg/65 text-warm-deep hover:bg-warm-bg",
  波動: "border-forest/30 bg-forest-bg/65 text-forest-deep hover:bg-forest-bg",
  熱力学: "border-gold/35 bg-gold-soft/55 text-gold-deep hover:bg-gold-soft",
  原子: "border-ink-900/15 bg-white/80 text-ink-800 hover:bg-white",
};

const subjectAnchor: Record<PrintSubject, string> = {
  力学: "subject-mechanics",
  電磁気: "subject-electromagnetism",
  波動: "subject-waves",
  熱力学: "subject-thermodynamics",
  原子: "subject-atomic",
};

/** 単元の散らばりを優先しつつ 6 枚を選ぶ。 */
function pickShelfCards(): Print[] {
  const seen = new Set<PrintSubject>();
  const picked: Print[] = [];
  for (const p of prints) {
    if (!seen.has(p.subject)) {
      picked.push(p);
      seen.add(p.subject);
    }
    if (picked.length >= 6) return picked;
  }
  for (const p of prints) {
    if (picked.length >= 6) break;
    if (!picked.includes(p)) picked.push(p);
  }
  return picked;
}

export function PrintsTeaser() {
  const cards = pickShelfCards();
  const total = prints.length;
  const subjects = printsBySubject();

  return (
    <section
      id="prints-teaser"
      aria-labelledby="prints-teaser-heading"
      className="relative isolate overflow-hidden border-b border-ink-900/[0.06]"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #fdfbf5 0%, #f9f1da 60%, #f3ecd3 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_8%_12%,rgba(59,124,217,0.10),transparent_55%),radial-gradient(circle_at_92%_88%,rgba(226,128,64,0.12),transparent_55%)]"
      />

      <Container className="relative py-12 sm:py-24">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
          <div className="max-w-2xl">
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] sm:text-[10px] font-medium uppercase tracking-[0.22em] sm:tracking-[0.32em] text-warm-deep before:inline-block before:h-px before:w-5 before:bg-current before:opacity-50">
              PRINTS — 高校物理 演習プリント
            </p>
            <h2
              id="prints-teaser-heading"
              className="mt-3 sm:mt-5 font-serif text-[1.55rem] sm:text-[2.2rem] leading-[1.35] sm:leading-[1.25] tracking-[-0.012em] text-ink-900"
            >
              苦手な単元から、棚にあるプリントを
              <br className="hidden sm:block" />
              <span className="text-warm-deep">そのまま開いて読む</span>。
            </h2>
            <p className="mt-3 sm:mt-5 text-[13.5px] sm:text-[15px] leading-[1.85] text-ink-700">
              ダウンロード前に、ページ画像と解答解説を Web で読めます。気に入ったら印刷向け PDF をどうぞ。<strong className="font-medium text-ink-900">登録も申込も不要、すべて無料</strong>です。
            </p>
          </div>
          <Link
            href="/prints"
            className="self-start inline-flex items-center gap-1.5 rounded-full border border-ink-900/15 bg-white/80 px-4 sm:px-5 py-2.5 sm:py-3 text-[12.5px] sm:text-[13.5px] text-ink-800 backdrop-blur transition hover:border-ink-900/30 hover:bg-white sm:self-end"
          >
            全 {total} 教材を見る
            <ArrowRight className="h-3.5 w-3.5 opacity-60" />
          </Link>
        </div>

        {/* 単元チップ — /prints の同じアンカーへ直行 */}
        <ul className="mt-6 sm:mt-8 flex flex-wrap items-center gap-2">
          <li className="hidden sm:inline-flex text-[10.5px] font-medium uppercase tracking-[0.24em] text-ink-500 pr-1">
            JUMP TO
          </li>
          {subjects.map((g) => (
            <li key={g.subject}>
              <Link
                href={`/prints#${subjectAnchor[g.subject]}`}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[12.5px] sm:text-[12px] font-medium tracking-[0.04em] backdrop-blur-sm transition ${
                  subjectChipTone[g.subject]
                }`}
              >
                {g.subject}
                <span className="font-mono text-[10px] opacity-70">
                  {g.items.length}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* 教材棚（6 冊サムネ） */}
        <ul className="mt-7 sm:mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-6">
          {cards.map((p, i) => (
            <li key={p.slug}>
              <Link
                href={`/prints/${p.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-ink-900/[0.08] bg-white/95 shadow-soft transition hover:-translate-y-0.5 hover:border-ink-900/[0.18] hover:shadow-card"
                aria-label={`${p.title} を開く`}
              >
                <div className="relative aspect-[210/297] w-full overflow-hidden bg-paper-soft">
                  <Image
                    src={printThumbPath(p)}
                    alt={`${p.title} — 1 ページ目プレビュー`}
                    fill
                    sizes="(min-width: 1024px) 200px, (min-width: 640px) 33vw, 50vw"
                    quality={68}
                    loading={i < 3 ? undefined : "lazy"}
                    placeholder="blur"
                    blurDataURL={PRINT_BLUR_DATA_URL}
                    className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                  <span className="absolute left-2 top-2 inline-flex rounded-full bg-white/95 px-2 py-0.5 font-mono text-[9px] tracking-[0.14em] text-ink-700 shadow-soft">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="absolute right-2 top-2 inline-flex rounded-full bg-ink-900/85 px-2 py-0.5 font-mono text-[9px] tracking-[0.14em] text-paper">
                    {p.subject}
                  </span>
                </div>
                <div className="flex flex-1 flex-col px-3 py-3 sm:px-3.5 sm:py-3.5">
                  <p
                    className={`text-[9.5px] sm:text-[10px] font-medium uppercase tracking-[0.16em] ${
                      subjectAccent[p.subject]
                    }`}
                  >
                    {p.topic}
                  </p>
                  <p className="mt-1.5 font-serif text-[11.5px] sm:text-[12px] leading-[1.45] tracking-[-0.005em] text-ink-900 line-clamp-2 min-h-[2.9em]">
                    {p.title}
                  </p>
                  <p className="mt-2 inline-flex items-center gap-1 text-[10.5px] text-ink-500">
                    <FileText className="h-3 w-3 opacity-70" aria-hidden />
                    全 {p.pageCount} P
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {/* 価値訴求バー — 「無料・Web・PDF・解説」を 1 行で */}
        <ul className="mt-7 sm:mt-10 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
          {[
            { icon: FileText, label: "Web で読める" },
            { icon: FileDown, label: "PDF 印刷 OK" },
            { icon: Sparkles, label: "解答・解説つき" },
            { icon: FileText, label: "登録不要 / 無料" },
          ].map((x) => (
            <li
              key={x.label}
              className="inline-flex items-center gap-2 rounded-full border border-ink-900/[0.08] bg-white/85 px-3 sm:px-4 py-2 sm:py-2.5 text-[12px] sm:text-[13px] text-ink-700 shadow-soft"
            >
              <x.icon
                className="h-3.5 w-3.5 shrink-0 text-warm-deep"
                aria-hidden
                strokeWidth={1.7}
              />
              {x.label}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
