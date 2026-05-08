import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Container } from "@/components/container";

/**
 * モバイル LP 用のミニ FAQ。スマホ流入の「申込前の最後の不安」だけを潰すための
 * 4 件に絞っている。フル FAQ ページ /faq への動線を末尾に置く。
 *
 * `<details>/<summary>` を使って JS なしで開閉できるようにし、初回読み込みの
 * パフォーマンスを犠牲にしない。アクセシビリティ的にも screen reader に親和的。
 */

const items = [
  {
    q: "物理が苦手でも大丈夫ですか？",
    a: "大丈夫です。最初に「どこでつまずいているか」を確認し、現象の理解・図の描き方・立式の順番から整理します。基礎の修復から始めて構いません。",
  },
  {
    q: "体験授業の料金はいくらですか？",
    a: "60分・¥3,000（前払い・Stripe決済）です。本気で受験と向き合う方に集中するための軽い参加コストとして設定しています。60分まるごと、森祐太が現状診断・診断ミニ授業・学習戦略提案までを担当します。",
  },
  {
    q: "体験だけで終わっても大丈夫ですか？",
    a: "もちろん大丈夫です。学習相談単体としてのご利用も歓迎します。体験後の無理な勧誘は行いません。",
  },
  {
    q: "オンラインで本当に身につきますか？",
    a: "画面共有とライブ解説で、図の描き方・力の取り方・立式の順序を一緒になぞって進めます。授業中に作成した板書・解説は当日中にお渡しし、復習に使えます。",
  },
];

export function MiniFaq() {
  return (
    <section
      aria-labelledby="mini-faq-heading"
      className="border-b border-ink-900/[0.06] bg-paper-soft/55"
    >
      <Container className="py-10 sm:py-16">
        <p className="text-[10px] sm:text-[11px] font-medium tracking-[0.18em] sm:tracking-[0.3em] uppercase text-brand-deep">
          FAQ — 申し込み前の不安に答えます
        </p>
        <h2
          id="mini-faq-heading"
          className="mt-3 sm:mt-4 font-serif text-[1.5rem] sm:text-[2rem] tracking-[-0.012em] text-ink-900"
        >
          よくある不安、その場で解消。
        </h2>

        <ul className="mt-6 sm:mt-8 space-y-2 sm:space-y-3">
          {items.map((it) => (
            <li key={it.q}>
              <details className="group rounded-xl border border-ink-900/10 bg-white px-4 py-3 sm:px-5 sm:py-4 open:border-brand/30 open:bg-paper-soft/60">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[14px] sm:text-[14.5px] font-medium text-ink-900">
                  <span>{it.q}</span>
                  <ChevronDown
                    className="h-4 w-4 shrink-0 text-ink-500 transition-transform group-open:rotate-180"
                    aria-hidden
                  />
                </summary>
                <p className="mt-3 text-[13px] sm:text-[13.5px] leading-[1.85] text-ink-700">
                  {it.a}
                </p>
              </details>
            </li>
          ))}
        </ul>

        <Link
          href="/faq"
          className="mt-6 sm:mt-8 inline-flex min-h-[44px] items-center gap-1.5 text-[13px] sm:text-[13.5px] text-ink-900 transition hover:text-brand-deep"
        >
          すべての FAQ を見る
          <ArrowRight className="h-3.5 w-3.5 opacity-60" />
        </Link>
      </Container>
    </section>
  );
}
