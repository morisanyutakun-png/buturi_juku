import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  ClipboardList,
  Globe2,
  MonitorPlay,
  PencilLine,
} from "lucide-react";
import { Section } from "@/components/section";
import { CtaBlock } from "@/components/cta-block";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { OnlineSection } from "@/components/online-section";
import { PricePreview } from "@/components/price-preview";
import { Testimonials } from "@/components/testimonials";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  serviceJsonLd,
  webPageJsonLd,
} from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "オンライン個別サポート｜Solvora Learning Lab — 全国どこからでも 1 対 1 で",
  description:
    "Solvora Learning Lab のオンライン個別サポートは、通塾不要・全国対応・1 対 1 の高校物理の学習サポートです。画面共有でのライブ解説、授業ノート（PDF 配布）、毎回の宿題と次回フィードバック、AI 復習プリントまでを一貫して提供します。プリントや参考書で進めても詰まる方向けの、上位サポート枠です。",
  path: "/online",
  keywords: [
    "高校物理 オンライン 個別指導",
    "高校物理 通信 塾",
    "オンライン 物理 高校生",
    "全国対応 物理 個別指導",
    "オンライン 物理 1対1",
    "高校物理 学習サポート",
  ],
  category: "education",
});

const onlineFaqs = [
  {
    question: "オンラインでも対面と同じ品質で受けられますか？",
    answer:
      "Solvora Learning Lab のオンライン指導では、問題用紙と図を画面共有しながら、力の取り方・座標の置き方・立式の順序を一緒になぞって進めます。授業中に作成した板書・解説は授業後にPDF/画像でお渡ししますので、その日のうちに見返して復習に使えます（高校物理専門塾としての指導継続）。",
  },
  {
    question: "対応エリアは？地方や海外からでも受講できますか？",
    answer:
      "全国どこからでも受講可能です。地方在住・海外在住の受験生も、都市部の生徒と同じ指導をそのまま受けられます。時差のあるエリアの方も時間割の相談に対応します。",
  },
  {
    question: "受講に必要な機材・環境は？",
    answer:
      "PC（推奨）またはタブレット、安定したインターネット回線、Webカメラ、マイクがあれば受講できます。問題用紙はお手元で解いていただき、書画カメラ／スマートフォンのカメラで映していただく形でも進められます。使用ツールは受講開始時に詳しくご案内します。",
  },
  {
    question: "授業外で質問はできますか？",
    answer:
      "授業の最後に、次回までに取り組んでいただく問題を指定し、次回授業の冒頭で立式手順までさかのぼって添削するスタイルを基本にしています。学習のテンポが止まらないよう、授業内でその週の質問を集中的に扱う設計です。",
  },
  {
    question: "部活や定期試験との両立は可能ですか？",
    answer:
      "授業時間は柔軟に調整できます。部活・定期試験・遠征など、生活のリズムに合わせて週ごとに時間帯を変更可能。引退後の追い上げ設計にも対応します。",
  },
] as const;

const advantages = [
  {
    icon: MonitorPlay,
    title: "画面共有 × ライブ解説で対面と同等",
    body: "問題用紙と図を画面共有しながら、力の取り方・座標の置き方・立式の順序を一緒になぞって進めます。式変形のプロセスがすべて見える双方向授業です。",
  },
  {
    icon: PencilLine,
    title: "授業ノートをPDFで配布",
    body: "画面共有した板書・解説は授業後にPDF/画像でお渡し。自分のノートに貼って、模試直前の総復習にも使えます。",
  },
  {
    icon: ClipboardList,
    title: "毎回の宿題と次回フィードバック",
    body: "授業の最後に、次回までに解く問題を指定。次回冒頭で立式の手順までさかのぼって添削するので、つまずきをその週のうちに解消できます。",
  },
  {
    icon: Globe2,
    title: "全国・海外から同じ授業を",
    body: "地方在住・海外在住の受験生も、都市部の生徒と同じ指導をそのまま受けられます。通塾の往復時間がそのまま学習時間に変わります。",
  },
];

export default function OnlinePage() {
  return (
    <>
      <PageHero
        eyebrow="ONLINE — 全国どこからでも 1 対 1 の学習サポート"
        watermark="繋"
        tone="gold"
        breadcrumb={[
          { label: "ホーム", href: "/" },
          { label: "学習サポート", href: "/courses" },
          { label: "オンライン受講", href: "/online" },
        ]}
        title={
          <>
            <span className="block">詰まった単元を、</span>
            <span className="block">
              <span className="text-brand">オンライン</span>で
            </span>
            <span className="block">一緒にほどく。</span>
          </>
        }
        description="Solvora Learning Lab のオンライン個別サポートは、通塾不要・全国対応・1 対 1 の高校物理学習サポートです。演習プリントと参考書で進めても詰まる単元を、画面共有のライブ解説と AI（REM）の復習プリントで一緒にほどきます。地方・海外からでも、都市部と同じ品質でお受けいただけます。"
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="/trial"
            className="group inline-flex items-center gap-2 rounded-full bg-warm px-7 py-4 text-[15px] sm:text-[14px] font-medium text-white shadow-warm transition hover:bg-warm-deep min-h-[52px] sm:min-h-0"
          >
            体験授業を申し込む
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/prints"
            className="inline-flex items-center gap-2 rounded-full border border-ink-900/[0.14] bg-white/80 px-7 py-4 text-[15px] sm:text-[14px] text-ink-800 transition hover:border-ink-900/30 hover:bg-white min-h-[52px] sm:min-h-0"
          >
            まず演習プリントを試す
            <ArrowRight className="h-3.5 w-3.5 opacity-50" />
          </Link>
        </div>
      </PageHero>

      <Section
        eyebrow="WHY ONLINE"
        title={
          <>
            Solvora Learning Lab を、
            <br className="sm:hidden" />
            オンラインで受ける4つの理由。
          </>
        }
        description="『オンラインは対面の代替』ではありません。高校物理の学習サポートは、オンラインのほうが加速します。"
        className="bg-paper-soft"
      >
        <div className="grid gap-5 md:grid-cols-2">
          {advantages.map((a) => (
            <article
              key={a.title}
              className="group relative overflow-hidden rounded-3xl border border-ink-900/[0.07] bg-white/85 p-7 sm:p-8 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card"
            >
              <div className="flex h-12 w-12 sm:h-11 sm:w-11 items-center justify-center rounded-2xl ring-1 ring-brand/20 bg-brand-bg text-brand-deep">
                <a.icon className="h-5 w-5 sm:h-[18px] sm:w-[18px]" aria-hidden strokeWidth={1.6} />
              </div>
              <h3 className="mt-6 sm:mt-7 font-serif text-[1.25rem] sm:text-[1.15rem] leading-[1.55] sm:leading-snug tracking-[-0.008em] text-ink-900">
                {a.title}
              </h3>
              <p className="mt-4 sm:mt-3 text-[15px] sm:text-[13.5px] leading-[2] sm:leading-[1.75] text-ink-600">
                {a.body}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <OnlineSection />

      <PricePreview />

      <Section
        eyebrow="REQUIREMENTS — 受講環境"
        title="Solvora Learning Lab オンラインの受講環境"
        description="必要な機材・推奨環境・対応ツールをまとめました。手元にないものがあっても、開始時にあわせて整えていきますのでご相談ください。"
        className="bg-paper"
      >
        <div className="overflow-hidden rounded-2xl border border-ink-900/[0.10] bg-white shadow-soft">
          <ul className="divide-y divide-ink-900/10 text-[15px] sm:text-sm">
            {[
              { k: "対応エリア", v: "日本全国 / 海外（時差は要相談）" },
              { k: "推奨デバイス", v: "PC（Mac/Windows） + Webカメラ + マイク" },
              { k: "推奨回線", v: "光回線 / 安定した Wi-Fi（モバイル回線でも可）" },
              { k: "授業ツール", v: "Web 会議ツール（画面共有でのライブ解説 / 受講開始時にご案内）" },
              { k: "授業時間帯", v: "月・木・金 13:00–20:00、土日 10:00–18:00（火・水は休講・現状／その他時間帯も相談可）" },
              { k: "授業ノート", v: "板書・解説を毎回PDF/画像で配布" },
              { k: "宿題・添削", v: "毎回指定 / 次回授業の冒頭でフィードバック" },
            ].map((row) => (
              <li
                key={row.k}
                className="grid grid-cols-1 gap-1 p-5 sm:grid-cols-[14rem_1fr] sm:gap-6 sm:p-6"
              >
                <span className="text-[12.5px] sm:text-xs font-medium tracking-[0.18em] sm:tracking-[0.22em] uppercase text-ink-600">
                  {row.k}
                </span>
                <span className="text-ink-800 leading-[1.85] sm:leading-relaxed">{row.v}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section
        eyebrow="FAQ — オンライン受講のよくある質問"
        title="Solvora Learning Lab オンラインのFAQ"
        description="オンライン受講前によく寄せられるご質問をまとめました。"
        className="bg-paper-soft"
      >
        <div className="space-y-3">
          {onlineFaqs.map((q) => (
            <details
              key={q.question}
              className="group rounded-2xl border border-ink-900/10 bg-white p-6 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-serif text-[1.05rem] sm:text-base leading-[1.55] text-ink-900 min-h-[40px]">
                <span>{q.question}</span>
                <span
                  aria-hidden
                  className="inline-flex h-8 w-8 sm:h-6 sm:w-6 items-center justify-center rounded-full border border-ink-900/15 text-base sm:text-xs transition group-open:rotate-45 shrink-0"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 text-[15px] sm:text-sm leading-[2.05] sm:leading-relaxed text-ink-700">
                {q.answer}
              </p>
            </details>
          ))}
        </div>
      </Section>

      <Testimonials />

      <CtaBlock
        eyebrow="START ONLINE — 学習サポートの入口"
        title="まずは演習プリントを試して、それでも詰まればオンラインで。"
        description="無料の演習プリントと参考書だけで届かない方向けに、オンラインで 1 対 1 の学習サポートを残しています。入塾前提ではない学習相談としてもご利用いただけます。"
        primary={{ label: "体験授業を申し込む", href: "/contact?topic=trial#contact-form" }}
        secondary={{ label: "演習プリントを開く", href: "/prints" }}
      />

      <JsonLd
        id="ld-breadcrumb-online"
        data={breadcrumbJsonLd([
          { name: "ホーム", href: "/" },
          { name: "学習サポート", href: "/courses" },
          { name: "オンライン受講", href: "/online" },
        ])}
      />
      <JsonLd
        id="ld-webpage-online"
        data={webPageJsonLd({
          name: "オンライン個別サポート ｜ Solvora Learning Lab — 全国どこからでも 1 対 1 で",
          description:
            "Solvora Learning Lab のオンライン個別サポートの専用ページ。通塾不要・全国対応・1 対 1 の高校物理学習サポートと AI 復習プリントの特徴・受講環境・FAQ をまとめています。",
          path: "/online",
        })}
      />
      <JsonLd
        id="ld-service-online"
        data={serviceJsonLd({
          name: "Solvora Learning Lab のオンライン学習サポート（高校物理）",
          description:
            "プリントや参考書で進めても詰まる高校生・受験生向けの、全国オンライン対応の高校物理 1 対 1 個別サポート。AI 復習プリント（REM 補助）で力学・電磁気・波動・熱力学・原子の全分野を体系的に組み立て直します。",
          path: "/online",
          serviceType: "オンライン高校物理 個別サポート",
        })}
      />
      <JsonLd
        id="ld-faq-online"
        data={faqPageJsonLd(
          onlineFaqs.map((q) => ({ question: q.question, answer: q.answer })),
        )}
      />
    </>
  );
}
