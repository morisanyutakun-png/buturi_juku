import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/container";

type Tier = {
  label: string;
  price: string;
  unit: string;
  note: string;
  href: string;
  /** カードのフレーム配色 */
  accent: string;
  /** 主力訴求 (badge + 強調) */
  badge?: string;
  highlight?: boolean;
};

/**
 * 料金プレビュー（TOP）。
 * 主力動線：体験授業 (¥3,000) → 電磁気集中（著者本人講座）→ 個別指導。
 * 主力カード = 電磁気集中。体験は入口、個別と共通テスト・テスト前は補助。
 */
const tiers: Tier[] = [
  {
    label: "体験授業（60分）",
    price: "3,000円",
    unit: "60分 / 初回のみ",
    note: "現状診断 + 学習戦略の提案までその場で実施。電磁気集中・個別指導への接続を前提にした、本気の体験。",
    href: "/trial",
    accent: "border-warm/35 bg-warm-bg/55",
    badge: "まずはここから",
  },
  {
    label: "電磁気集中講座",
    price: "全6回 58,000円",
    unit: "90分 × 6回 / 著者本人講座",
    note: "『考える力を育てる 電磁気学』の著者・森祐太が直接担当。場のイメージから回路までを書籍と同じ枠組みで一気通貫。Solvora の主力講座。",
    href: "/courses/electromagnetism",
    accent: "border-brand/40 bg-brand-bg/65",
    badge: "MAIN COURSE",
    highlight: true,
  },
  {
    label: "1対1個別指導",
    price: "月 38,000円〜",
    unit: "90分 × 月4回 / 講師固定",
    note: "志望校から逆算したフルカスタム。AI復習プリント作成つき。難関大・医学部向けの上位プラン（月 58,000円）あり。",
    href: "/courses/private",
    accent: "border-gold/40 bg-gold-soft/45",
  },
  {
    label: "テスト前集中講座",
    price: "全3回 18,000円",
    unit: "90分 × 3回 / 駆け込み対応",
    note: "学校テスト直前 7〜10日前から。出題範囲を絞って、立式の型と誤答パターンを一気に仕上げます。",
    href: "/courses/test-prep",
    accent: "border-ink-900/15 bg-white/80",
  },
];

export function PricePreview() {
  return (
    <section
      aria-labelledby="price-preview-heading"
      className="relative overflow-hidden border-b border-ink-900/[0.06] bg-paper-soft/55"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_85%_15%,rgba(202,163,75,0.12),transparent_55%),radial-gradient(circle_at_10%_85%,rgba(59,124,217,0.10),transparent_55%)]"
      />
      <Container className="relative py-16 sm:py-28">
        <div className="grid gap-8 md:grid-cols-[1fr_1.6fr] md:items-end">
          <div>
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10.5px] sm:text-[10px] font-medium uppercase tracking-[0.22em] sm:tracking-[0.32em] text-brand-deep before:inline-block before:h-px before:w-5 sm:before:w-6 before:bg-current before:opacity-50">
              PRICING — Solvora Learning Lab の料金
            </p>
            <h2
              id="price-preview-heading"
              className="mt-6 font-serif text-display-md tracking-[-0.012em] text-ink-900"
            >
              料金は、
              <br className="hidden sm:block" />
              <span className="text-warm-deep">最初に</span>明示します。
            </h2>
            <p className="mt-5 max-w-md text-[15.5px] sm:text-[15px] leading-[2] sm:leading-[1.85] text-ink-700">
              <strong className="font-medium text-ink-900">主力動線は、体験授業（¥3,000）→ 電磁気集中講座</strong>。著者本人が担当する電磁気を軸に、必要に応じて 1対1個別指導や分野別講座へ展開します。入塾金・システム利用料は<strong className="font-medium text-ink-900">0円</strong>です。
            </p>
            <p className="mt-3 max-w-md text-[12.5px] sm:text-[12px] leading-[1.75] text-ink-500">
              ※ 指定教材（『考える力を育てる』シリーズ等）のみ、別途ご購入をお願いしています。
            </p>
            <Link
              href="/courses"
              className="mt-7 inline-flex min-h-[48px] items-center gap-2 rounded-full border border-ink-900/15 bg-white/80 px-5 py-3 text-[14.5px] sm:text-[13.5px] text-ink-800 backdrop-blur transition hover:border-ink-900/30 hover:bg-white"
            >
              全 8 講座・料金詳細を見る
              <ArrowRight className="h-3.5 w-3.5 opacity-60" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {tiers.map((t) => (
              <Link
                key={t.label}
                href={t.href}
                className={`group relative overflow-hidden rounded-2xl border ${t.accent} ${
                  t.highlight ? "ring-2 ring-brand/40" : ""
                } bg-white/90 p-6 sm:p-7 shadow-soft backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-card`}
              >
                {t.badge && (
                  <span
                    className={`absolute right-4 top-4 inline-flex rounded-full px-2.5 py-1 text-[10.5px] font-medium tracking-[0.18em] uppercase ${
                      t.highlight
                        ? "bg-brand text-white"
                        : "bg-warm text-white"
                    }`}
                  >
                    {t.badge}
                  </span>
                )}
                <p
                  className={`text-[11px] sm:text-[10.5px] font-medium tracking-[0.24em] sm:tracking-[0.28em] uppercase ${
                    t.highlight ? "text-brand-deep" : "text-ink-700"
                  }`}
                >
                  {t.label}
                </p>
                <p className="mt-4 font-serif text-[2rem] sm:text-[2.3rem] leading-none tracking-[-0.018em] text-ink-900">
                  {t.price}
                </p>
                <p className="mt-3 text-[12.5px] sm:text-[12px] tracking-wide text-ink-500">
                  {t.unit}
                </p>
                <p className="mt-4 text-[14px] sm:text-[13.5px] leading-[1.85] text-ink-700">
                  {t.note}
                </p>
                <p className="mt-5 inline-flex items-center gap-1.5 text-[13.5px] sm:text-[13px] text-ink-900 transition-transform group-hover:translate-x-0.5">
                  詳しく見る
                  <ArrowRight className="h-3.5 w-3.5" />
                </p>
              </Link>
            ))}
          </div>
        </div>

        <ul className="mt-12 grid gap-3 sm:grid-cols-3">
          {[
            "入塾金 0円",
            "システム利用料 0円",
            "途中解約ペナルティなし",
          ].map((x) => (
            <li
              key={x}
              className="inline-flex items-center gap-3 rounded-full border border-ink-900/[0.08] bg-white/80 px-5 py-3 text-[14px] sm:text-[13.5px] text-ink-700"
            >
              <Check className="h-4 w-4 text-brand-deep" aria-hidden />
              {x}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
