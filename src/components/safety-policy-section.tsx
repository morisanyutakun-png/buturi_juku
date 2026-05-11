import Link from "next/link";
import { ShieldCheck, Video, RefreshCcw, ArrowRight } from "lucide-react";
import { Container } from "@/components/container";

/**
 * 安心して受講していただくための運用ポリシーを 3 カラムで提示するセクション。
 * - Zoom 使用の明示（コミュニケーションの安心感）
 * - 途中解約の回数割返金（金銭面の安心感）
 * - 機材トラブル時の振替対応（実運用の安心感）
 *
 * 法定の詳細は tokushoho ページに集約し、本セクションは要旨のみ。
 */
export function SafetyPolicySection() {
  const items = [
    {
      icon: Video,
      eyebrow: "TOOL",
      title: "授業は Zoom で実施",
      body: "オンライン授業は Zoom（無料アカウントで参加可）を使用します。画面共有・板書共有・録画機能を活用し、対面に近い学習体験を実現します。初回前に接続テストもご案内するので、機材が初めての方でも安心して始められます。",
      tone: "brand",
    },
    {
      icon: RefreshCcw,
      eyebrow: "REFUND",
      title: "途中解約は回数割で返金",
      body: "受講途中で解約される場合は、未実施回数分を回数割で全額返金します（例：全6回 ¥66,000 の講座で 2回実施後に解約 → 残り4回分 ¥44,000 を返金）。開始前のキャンセルは全額返金。安心して受講をスタートできるよう、金銭的なリスクは最小限にしています。",
      tone: "warm",
    },
    {
      icon: ShieldCheck,
      eyebrow: "TROUBLE",
      title: "機材トラブル時は振替で対応",
      body: "講師側の機材・通信障害で授業ができなかった場合は、無償で振替授業を実施します。受講者側の機材トラブルでも、開始から15分以内にご連絡いただければ振替日程を調整します（月1回まで）。トラブルで授業料が無駄になる、ということは起こらないようにしています。",
      tone: "forest",
    },
  ] as const;

  const toneClass = {
    brand: {
      ring: "border-brand/30",
      chip: "bg-brand/15 text-brand-deep",
      eyebrow: "text-brand-deep",
    },
    warm: {
      ring: "border-warm/30",
      chip: "bg-warm/15 text-warm-deep",
      eyebrow: "text-warm-deep",
    },
    forest: {
      ring: "border-forest/30",
      chip: "bg-forest/15 text-forest-deep",
      eyebrow: "text-forest-deep",
    },
  } as const;

  return (
    <section
      aria-labelledby="safety-heading"
      className="relative overflow-hidden border-y border-ink-900/[0.06] bg-white"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_10%_15%,rgba(59,124,217,0.07),transparent_55%),radial-gradient(circle_at_90%_85%,rgba(80,140,90,0.06),transparent_55%)]"
      />
      <Container className="relative py-12 sm:py-24">
        <div className="max-w-2xl">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] sm:text-[10px] font-medium uppercase tracking-[0.18em] sm:tracking-[0.32em] text-brand-deep before:inline-block before:h-px before:w-5 sm:before:w-6 before:bg-current before:opacity-50">
            SAFETY & POLICY — 安心して受講いただくために
          </p>
          <h2
            id="safety-heading"
            className="mt-4 sm:mt-6 font-serif text-[1.6rem] sm:text-[2.1rem] leading-[1.4] sm:leading-[1.25] tracking-[-0.012em] text-ink-900"
          >
            「申し込んで大丈夫かな」を、<br className="sm:hidden" />
            <span className="text-forest-deep">運用ポリシー</span>で消します。
          </h2>
          <p className="mt-4 sm:mt-5 text-[14px] sm:text-[15px] leading-[1.9] sm:leading-[1.85] text-ink-700">
            個人運営のオンライン塾を選ぶときに、特に気になる「ツール」「お金」「トラブル」の3点を、最初に明示します。
          </p>
        </div>

        <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-5 md:grid-cols-3">
          {items.map((it) => {
            const t = toneClass[it.tone];
            return (
              <article
                key={it.title}
                className={`relative flex h-full flex-col rounded-2xl border ${t.ring} bg-white p-5 sm:p-7 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card`}
              >
                <span
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${t.chip}`}
                >
                  <it.icon className="h-5 w-5" aria-hidden strokeWidth={1.6} />
                </span>
                <p
                  className={`mt-5 text-[10px] sm:text-[10.5px] font-medium tracking-[0.22em] sm:tracking-[0.28em] uppercase ${t.eyebrow}`}
                >
                  {it.eyebrow}
                </p>
                <h3 className="mt-3 font-serif text-[1.15rem] sm:text-[1.25rem] leading-[1.45] tracking-[-0.008em] text-ink-900">
                  {it.title}
                </h3>
                <p className="mt-4 text-[13.5px] sm:text-[13.5px] leading-[1.9] sm:leading-[1.85] text-ink-700">
                  {it.body}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-8 sm:mt-10 flex flex-col items-start gap-3 rounded-2xl border border-ink-900/[0.08] bg-paper-soft/60 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6">
          <p className="text-[13px] sm:text-[13.5px] leading-[1.85] text-ink-700">
            返金・キャンセル・機材トラブルの詳細条件は、特定商取引法に基づく表記ページで確認できます。
          </p>
          <Link
            href="/tokushoho"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-ink-900/15 bg-white px-5 py-2.5 text-[13px] sm:text-[13.5px] text-ink-800 transition hover:border-ink-900/30 hover:bg-paper-soft"
          >
            特定商取引法に基づく表記を見る
            <ArrowRight className="h-3.5 w-3.5 opacity-60" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
