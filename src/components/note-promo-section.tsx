import { ArrowUpRight, FileText, Sparkles } from "lucide-react";
import { Container } from "@/components/container";

const NOTE_URL = "https://note.com/yuta_mori_ind";

/**
 * note.com で販売中の REM 製 有料プリント（PDF）への送客セクション。
 * Solvora の塾サービスとは別の「教材だけ欲しい人」向けの逃げ道として機能する。
 *
 * - LP のミドルセクション（書籍カバーの直下あたり）に置くことで、
 *   「6冊の書籍 → REM 復習プリント → note.com の有料単発プリント」と
 *   "教材レイヤー" を一連の流れで提示する。
 * - 体験申込 CTA とは色を分け（ゴールド系）、競合しないよう抑えめに。
 */
export function NotePromoSection() {
  return (
    <section className="relative overflow-hidden border-y border-ink-900/[0.06] bg-paper-soft/55">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_85%_15%,rgba(202,163,75,0.10),transparent_55%),radial-gradient(circle_at_10%_85%,rgba(59,124,217,0.08),transparent_55%)]"
      />
      <Container className="relative py-12 sm:py-24">
        <div className="grid gap-8 sm:gap-12 md:grid-cols-[1fr_1.05fr] md:items-center">
          <div>
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] sm:text-[10px] font-medium uppercase tracking-[0.18em] sm:tracking-[0.32em] text-gold-deep before:inline-block before:h-px before:w-5 before:bg-current before:opacity-50">
              NOTE — 単発で買える REM 製プリント
            </p>
            <h2 className="mt-4 sm:mt-6 font-serif text-[1.55rem] sm:text-[2rem] leading-[1.4] sm:leading-[1.25] tracking-[-0.012em] text-ink-900">
              「いま、この単元だけ」を、<br className="hidden sm:block" />
              <span className="text-gold-deep">PDFで買って解く</span>。
            </h2>
            <p className="mt-4 sm:mt-6 text-[14px] sm:text-[15px] leading-[1.95] sm:leading-[1.85] text-ink-700">
              授業ではなく、教材だけが欲しい方向けに、
              <strong className="font-medium text-ink-900">REM</strong>
              で作成した有料プリント（問題 + 解答 + 解説 PDF）を
              <strong className="font-medium text-ink-900"> note </strong>
              で販売しています。
            </p>
            <ul className="mt-5 sm:mt-6 space-y-2.5 sm:space-y-2 text-[13.5px] sm:text-[14px] leading-[1.8] text-ink-700">
              <li className="flex items-start gap-2.5">
                <span className="mt-[7px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold-deep" />
                苦手な単元だけ単発で購入できます
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-[7px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold-deep" />
                類題 / 解答 / 解説 がセットになった印刷向け PDF
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-[7px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold-deep" />
                授業を申し込まずに教材だけ手元に置きたい方にも
              </li>
            </ul>

            <a
              href={NOTE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 sm:mt-8 inline-flex min-h-[52px] sm:min-h-0 items-center justify-center gap-2 rounded-full bg-ink-900 px-6 py-3.5 text-[14.5px] sm:text-[14px] font-medium text-paper transition hover:bg-ink-800"
            >
              note のアカウントを見る
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <p className="mt-3 break-all text-[11.5px] sm:text-[11px] tracking-[0.04em] text-ink-500">
              {NOTE_URL}
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[420px]">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-6 -z-10"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(202,163,75,0.30), transparent 65%), radial-gradient(closest-side at 30% 80%, rgba(155,188,255,0.25), transparent 70%)",
              }}
            />
            <div className="relative rounded-[1.5rem] border border-ink-900/[0.10] bg-white/95 p-5 sm:p-6 shadow-card backdrop-blur-sm">
              <div className="flex items-start justify-between gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-gold-soft/70 px-3 py-1 text-[10px] font-medium tracking-[0.18em] uppercase text-gold-deep">
                  <Sparkles className="h-3 w-3" aria-hidden />
                  REM PRINT
                </span>
                <span className="font-mono text-[10.5px] tracking-[0.18em] text-ink-400">
                  PDF / NOTE
                </span>
              </div>
              <p className="mt-4 font-serif text-[1.1rem] leading-[1.45] tracking-[-0.005em] text-ink-900">
                例：単振動 — 等価ばね定数の見抜き方（演習＋解説 PDF）
              </p>
              <ul className="mt-4 space-y-2.5 text-[12.5px] leading-[1.7] text-ink-700">
                {[
                  "類題 3問（基礎 → 標準 → 応用）",
                  "解答（正答 + 別解）",
                  "解説（言語化 → 立式 → 演習の3ステップ）",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-2.5">
                    <FileText className="mt-[3px] h-3.5 w-3.5 shrink-0 text-gold-deep" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl border border-ink-900/[0.08] bg-paper-soft/70 p-3.5">
                <p className="text-[11px] leading-[1.7] text-ink-600">
                  ※ 単元・難易度ごとに販売しています。最新ラインナップは note でご確認ください。
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
