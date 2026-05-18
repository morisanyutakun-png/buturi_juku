import Link from "next/link";
import { ArrowRight, FileText, UserCheck } from "lucide-react";
import { Container } from "@/components/container";
import { getCourseBySlug } from "@/data/courses";

/**
 * 「学習サポート」セクション。
 *
 * 体験授業（TrialSpotlight）の次段に置き、続けて伴走が必要な方向けに
 * 週次の個別サポート（電磁気集中 / テスト前集中）を提示する。
 */

type TierMeta = {
  slug: string;
  badge?: string;
  highlight?: boolean;
  blurb: string;
  span: string;
};

const tierMeta: TierMeta[] = [
  {
    slug: "electromagnetism",
    badge: "おすすめ",
    highlight: true,
    blurb:
      "参考書『考える力を育てる 電磁気学』に沿って、場のイメージから回路までを 6 回で読み通す主力サポート。",
    span: "90 分 × 全 6 回",
  },
  {
    slug: "test-prep",
    blurb:
      "直前期に詰まった単元だけを 3 回で。授業中に解けなかった問題は AI（REM）で復習プリント化します。",
    span: "90 分 × 全 3 回",
  },
];

const tiers = tierMeta.map((m) => {
  const course = getCourseBySlug(m.slug);
  if (!course) {
    throw new Error(
      `[support-tier-section] courses.ts に slug="${m.slug}" の講座がありません。`,
    );
  }
  return {
    href: `/courses/${course.slug}`,
    title: course.title,
    price: course.price.value,
    span: m.span,
    blurb: m.blurb,
    badge: m.badge,
    highlight: m.highlight ?? false,
  };
});

export function SupportTierSection() {
  return (
    <section
      id="learning-support"
      aria-labelledby="support-tier-heading"
      className="relative overflow-hidden border-y border-ink-900/[0.06] bg-paper-soft/55"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_15%_85%,rgba(59,124,217,0.10),transparent_55%),radial-gradient(circle_at_85%_15%,rgba(202,163,75,0.10),transparent_55%)]"
      />
      <Container className="relative py-12 sm:py-28">
        <div className="grid gap-6 sm:gap-10 md:grid-cols-[1fr_1.55fr] md:items-start">
          <div>
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] sm:text-[10px] font-medium uppercase tracking-[0.18em] sm:tracking-[0.32em] text-brand-deep before:inline-block before:h-px before:w-5 sm:before:w-6 before:bg-current before:opacity-50">
              LEARNING SUPPORT — 続けて伴走が必要な方へ
            </p>
            <h2
              id="support-tier-heading"
              className="mt-4 sm:mt-6 font-serif text-[1.6rem] sm:text-[2.1rem] leading-[1.35] sm:leading-[1.2] tracking-[-0.012em] text-ink-900"
            >
              体験のあと、
              <br className="hidden sm:block" />
              <span className="text-warm-deep">毎週そばで見てほしい</span>方には。
            </h2>
            <p className="mt-4 sm:mt-6 max-w-md text-[14px] sm:text-[15px] leading-[1.9] sm:leading-[1.85] text-ink-700">
              「立式の癖はわかった。でも、ひとりで直す自信がない」——そんな方のために、週次で並走する個別サポートを用意しています。書籍ベースの分野別集中と、テスト前の駆け込み対応の 2 種類です。
            </p>
            <ul className="mt-5 space-y-2.5 sm:mt-6 text-[13.5px] sm:text-[14px] leading-[1.8] text-ink-700">
              <li className="flex items-start gap-2.5">
                <UserCheck
                  className="mt-[3px] h-4 w-4 shrink-0 text-brand-deep"
                  aria-hidden
                  strokeWidth={1.7}
                />
                完全 1 対 1 のオンライン（全国・海外対応）
              </li>
              <li className="flex items-start gap-2.5">
                <UserCheck
                  className="mt-[3px] h-4 w-4 shrink-0 text-brand-deep"
                  aria-hidden
                  strokeWidth={1.7}
                />
                授業の軸は同じ『考える力を育てる』シリーズ
              </li>
              <li className="flex items-start gap-2.5">
                <UserCheck
                  className="mt-[3px] h-4 w-4 shrink-0 text-brand-deep"
                  aria-hidden
                  strokeWidth={1.7}
                />
                入塾金 0 円・途中解約のペナルティなし
              </li>
            </ul>
            <p className="mt-5 sm:mt-7 rounded-2xl border border-ink-900/[0.08] bg-white/80 px-4 py-3 text-[12.5px] sm:text-[13px] leading-[1.8] text-ink-600">
              <span className="inline-flex items-center gap-1.5 text-warm-deep">
                <FileText className="h-3.5 w-3.5" aria-hidden />
                <span className="font-medium">受講の順番</span>
              </span>
              ：まず{" "}
              <Link
                href="/prints"
                className="font-medium text-ink-900 underline decoration-warm/40 underline-offset-[3px] hover:decoration-warm-deep"
              >
                演習プリント
              </Link>
              を試して、立式の癖が気になったら体験授業へ。そこで合うと感じたら、この週次サポートを検討してください。
            </p>
          </div>

          <div className="grid gap-3 sm:gap-4">
            {tiers.map((t) => (
              <Link
                key={t.title}
                href={t.href}
                className={`group relative overflow-hidden rounded-2xl border bg-white/95 p-5 sm:p-7 shadow-soft backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-card ${
                  t.highlight
                    ? "border-brand/40 ring-1 ring-brand/30 hover:border-brand/60"
                    : "border-ink-900/[0.08] hover:border-ink-900/[0.18]"
                }`}
              >
                {t.badge && (
                  <span
                    className={`absolute right-3 top-3 sm:right-4 sm:top-4 inline-flex rounded-full px-2 sm:px-2.5 py-0.5 sm:py-1 text-[9.5px] sm:text-[10.5px] font-medium tracking-[0.14em] sm:tracking-[0.18em] uppercase ${
                      t.highlight
                        ? "bg-brand text-white"
                        : "bg-warm/85 text-white"
                    }`}
                  >
                    {t.badge}
                  </span>
                )}
                <p className="text-[10px] sm:text-[10.5px] font-medium tracking-[0.18em] sm:tracking-[0.24em] uppercase text-ink-500 pr-12 sm:pr-16">
                  {t.span}
                </p>
                <h3 className="mt-2 sm:mt-3 font-serif text-[1.15rem] sm:text-[1.3rem] leading-[1.4] tracking-[-0.008em] text-ink-900 pr-12 sm:pr-16">
                  {t.title}
                </h3>
                <p className="mt-3 sm:mt-4 text-[13px] sm:text-[13.5px] leading-[1.85] text-ink-700">
                  {t.blurb}
                </p>
                <div className="mt-4 sm:mt-5 flex items-center justify-between gap-3">
                  <p className="font-serif text-[1rem] sm:text-[1.1rem] tracking-[-0.005em] text-ink-900">
                    {t.price}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[12.5px] text-ink-900 transition-transform group-hover:translate-x-0.5">
                    詳しく見る
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}

            <Link
              href="/courses"
              className="mt-1 inline-flex items-center justify-center gap-1.5 rounded-full border border-ink-900/15 bg-white/80 px-5 py-3 text-[13px] text-ink-800 backdrop-blur transition hover:border-ink-900/30 hover:bg-white"
            >
              ほかのサポート・料金を見る
              <ArrowRight className="h-3.5 w-3.5 opacity-60" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
