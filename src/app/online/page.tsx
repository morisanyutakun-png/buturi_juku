import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Globe2,
  History,
  MessageSquareText,
  MonitorPlay,
} from "lucide-react";
import { Section } from "@/components/section";
import { CtaBlock } from "@/components/cta-block";
import { Breadcrumb } from "@/components/breadcrumb";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
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
  title: "高校物理専門塾 オンライン｜全国どこからでも1対1で受講",
  description:
    "高校物理専門塾「物理の森」のオンライン指導。通塾不要・全国対応・1対1の個別指導で、高校物理が苦手な受験生を得点源まで引き上げます。録画復習・質問チャット・柔軟な時間割で、地方・海外からでも都市部と同じ授業をそのまま受講できます。",
  path: "/online",
  keywords: [
    "高校物理専門塾 オンライン",
    "高校物理 オンライン 個別指導",
    "高校物理 通信 塾",
    "オンライン 物理塾 高校生",
    "全国対応 物理塾",
    "オンライン 物理 1対1",
  ],
  category: "education",
});

const onlineFaqs = [
  {
    question: "オンラインでも対面と同じ品質で受けられますか？",
    answer:
      "高校物理専門塾「物理の森」のオンライン指導では、画面共有とリアルタイム手書き板書を組み合わせ、対面と遜色ない双方向授業を実現しています。授業はすべて録画でお渡しするため、わからなかった瞬間を当日中に見直せる点はオンラインならではの利点です。",
  },
  {
    question: "対応エリアは？地方や海外からでも受講できますか？",
    answer:
      "全国どこからでも受講可能です。地方在住・海外在住の受験生も、都市部の生徒と同じ指導をそのまま受けられます。時差のあるエリアの方も時間割の相談に対応します。",
  },
  {
    question: "受講に必要な機材・環境は？",
    answer:
      "PC（推奨）またはタブレット、安定したインターネット回線、Webカメラ、マイクがあれば受講できます。手書き入力用のタブレット端末をお持ちでない場合も、紙のノートを書画カメラで映す形式で十分対応可能です。使用ツールは受講開始時に詳しくご案内します。",
  },
  {
    question: "授業外で質問はできますか？",
    answer:
      "授業外でも疑問をその場で投げられる専用チャットを用意しています。24時間投稿可能で、24〜48時間以内に回答します。学習のテンポが止まらないよう設計しています。",
  },
  {
    question: "部活や定期試験との両立は可能ですか？",
    answer:
      "授業時間は柔軟に調整できます。部活・定期試験・遠征など、生活のリズムに合わせて週ごとに時間帯を変更可能。引退後の追い上げ設計にも対応します。",
  },
  {
    question: "保護者は同席できますか？",
    answer:
      "可能です。初回の体験授業から同席可能で、ご希望があれば授業の後半30分だけ同席いただく形にも対応します。",
  },
] as const;

const advantages = [
  {
    icon: MonitorPlay,
    title: "ライブ授業 + 手書きボードで対面と同等",
    body: "画面共有とリアルタイムの手書き板書で、現象の図示・式変形のプロセスがすべて見えます。対面の代替ではなく、対面と同質の指導です。",
  },
  {
    icon: History,
    title: "授業はすべて録画 / 復習し放題",
    body: "わからなかった瞬間を、その日のうちに見直せます。視聴期限は在籍中無期限。模試直前の総復習にも使えます。",
  },
  {
    icon: MessageSquareText,
    title: "質問チャットで学習が止まらない",
    body: "授業外でも疑問をその場で投げられる専用チャット。24h投稿可・24〜48h以内に回答。テンポを落とさずに進めます。",
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
      <Container className="pt-10">
        <Breadcrumb
          items={[
            { label: "ホーム", href: "/" },
            { label: "高校物理専門塾 オンライン", href: "/online" },
          ]}
        />
      </Container>

      <Section
        eyebrow="ONLINE — 高校物理専門塾"
        title={
          <>
            高校物理専門塾、
            <br className="sm:hidden" />
            オンラインで全国対応。
          </>
        }
        description="高校物理専門塾「物理の森」のオンライン指導は、通塾不要・全国対応・1対1の個別指導です。高校物理が苦手な受験生を、得点源まで引き上げることに特化しています。地方・海外からでも、都市部と同じ授業をそのまま受講できます。"
        className="bg-paper"
      >
        <div className="mt-2 flex flex-wrap gap-3">
          <Link
            href="/trial"
            className="group inline-flex items-center gap-2 rounded-full bg-warm px-7 py-4 text-[15px] sm:text-[14px] font-medium text-white shadow-warm transition hover:bg-warm-deep min-h-[52px] sm:min-h-0"
          >
            無料体験授業を申し込む
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 rounded-full border border-ink-900/[0.14] bg-white/80 px-7 py-4 text-[15px] sm:text-[14px] text-ink-800 transition hover:border-ink-900/30 hover:bg-white min-h-[52px] sm:min-h-0"
          >
            高校物理専門塾の講座を見る
            <ArrowRight className="h-3.5 w-3.5 opacity-50" />
          </Link>
        </div>
      </Section>

      <Section
        eyebrow="WHY ONLINE"
        title={
          <>
            高校物理専門塾を、
            <br className="sm:hidden" />
            オンラインで受ける4つの理由。
          </>
        }
        description="『オンラインは対面の代替』ではありません。高校物理の学習は、オンラインの高校物理専門塾のほうが加速します。"
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
        title="オンライン高校物理専門塾の受講環境"
        description="必要な機材・推奨環境・対応ツールをまとめました。手元にないものがあっても、開始時にあわせて整えていきますのでご相談ください。"
        className="bg-paper"
      >
        <div className="overflow-hidden rounded-2xl border border-ink-900/[0.10] bg-white shadow-soft">
          <ul className="divide-y divide-ink-900/10 text-[15px] sm:text-sm">
            {[
              { k: "対応エリア", v: "日本全国 / 海外（時差は要相談）" },
              { k: "推奨デバイス", v: "PC（Mac/Windows） + Webカメラ + マイク" },
              { k: "推奨回線", v: "光回線 / 安定した Wi-Fi（モバイル回線でも可）" },
              { k: "授業ツール", v: "Web 会議ツール + 手書きボード（受講開始時にご案内）" },
              { k: "授業時間帯", v: "平日 10:00–22:00（前後要相談）" },
              { k: "録画視聴", v: "在籍中は無期限視聴可能" },
              { k: "質問チャット", v: "24h 投稿可 / 24〜48h 内に回答" },
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
        title="高校物理専門塾 オンラインのFAQ"
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
        eyebrow="START ONLINE"
        title="オンラインで、まず60分の体験授業を。"
        description="入塾前提ではない学習相談としてもご利用いただけます。受講環境のチェックから対応します。"
      />

      <JsonLd
        id="ld-breadcrumb-online"
        data={breadcrumbJsonLd([
          { name: "ホーム", href: "/" },
          { name: "高校物理専門塾 オンライン", href: "/online" },
        ])}
      />
      <JsonLd
        id="ld-webpage-online"
        data={webPageJsonLd({
          name: "高校物理専門塾 オンライン｜全国どこからでも1対1で受講",
          description:
            "高校物理専門塾「物理の森」のオンライン指導の専用ページ。通塾不要・全国対応・1対1個別指導の特徴・受講環境・FAQをまとめています。",
          path: "/online",
        })}
      />
      <JsonLd
        id="ld-service-online"
        data={serviceJsonLd({
          name: "高校物理専門塾「物理の森」のオンライン指導",
          description:
            "高校物理が苦手な高校生・受験生に向けた、全国オンライン対応の高校物理専門塾。1対1個別指導で、力学・電磁気・波動・熱力学・原子の全分野を体系的に組み立て直します。",
          path: "/online",
          serviceType: "オンライン高校物理専門塾 / 大学受験物理 個別指導",
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
