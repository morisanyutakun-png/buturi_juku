import Link from "next/link";
import {
  ArrowRight,
  FileText,
  MonitorCheck,
  Target,
  Waves,
} from "lucide-react";
import { Section } from "@/components/section";

const intents = [
  {
    icon: FileText,
    keyword: "AI復習プリント 個別指導",
    title: "解けなかった 1 問を、その子専用の復習プリントに",
    body: "AI（REM）が類題・解答・解説の復習 PDF を生成、講師確認のうえお渡しします。",
    href: "/online",
    cta: "復習プリントの仕組みを見る",
  },
  {
    icon: Target,
    keyword: "高校物理 個別指導 大学受験",
    title: "大学受験物理を、志望校から逆算して伸ばしたい",
    body: "出題傾向・残り期間・現状の理解度から学習ルートを設計します。",
    href: "/courses/electromagnetism",
    cta: "電磁気集中講座を見る",
  },
  {
    icon: MonitorCheck,
    keyword: "高校物理 オンライン 個別指導",
    title: "通塾せず、オンラインで 1 対 1 指導を受けたい",
    body: "画面共有とライブ解説で図の描き方・立式の順序を一緒になぞります。板書 PDF も即日お渡し。",
    href: "/online",
    cta: "オンライン指導の詳細を見る",
  },
  {
    icon: Waves,
    keyword: "力学 電磁気 苦手 克服",
    title: "苦手分野だけを、短期で立て直したい",
    body: "失点原因を分野別に切り分け、必要な単元に絞って補強。復習プリントで定着まで。",
    href: "/courses",
    cta: "分野別講座を見る",
  },
] as const;

export function SeoIntentSection() {
  return (
    <Section
      eyebrow="SEARCH INTENT"
      title={<>高校物理の『悩み』に、<br className="sm:hidden" />すべて答えます。</>}
      className="bg-paper-soft"
    >
      <div className="grid gap-3 sm:gap-5 md:grid-cols-2">
        {intents.map((intent) => (
          <article
            key={intent.keyword}
            className="group rounded-2xl border border-ink-900/10 bg-white p-5 sm:p-7 shadow-soft transition hover:-translate-y-0.5 hover:border-brand/35 hover:shadow-card"
          >
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border border-brand/25 bg-brand-bg text-brand-deep">
                <intent.icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
              </span>
              <p className="text-[10px] sm:text-[10px] tracking-[0.18em] sm:tracking-[0.25em] uppercase text-ink-500">
                {intent.keyword}
              </p>
            </div>
            <h3 className="mt-4 sm:mt-6 font-serif text-[1.05rem] sm:text-xl leading-[1.45] sm:leading-snug text-ink-900">
              {intent.title}
            </h3>
            <p className="mt-3 sm:mt-4 text-[13px] sm:text-sm leading-[1.85] sm:leading-relaxed text-ink-700">
              {intent.body}
            </p>
            <Link
              href={intent.href}
              className="mt-4 sm:mt-6 inline-flex min-h-[40px] sm:min-h-[44px] items-center gap-1 text-[13.5px] sm:text-sm text-brand-deep transition group-hover:translate-x-0.5"
            >
              {intent.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </div>
    </Section>
  );
}
