import type { Metadata } from "next";
import { Section } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = buildMetadata({
  title: "特定商取引法に基づく表記",
  description: `${siteConfig.name}における特定商取引法に基づく表記です。`,
  path: "/tokushoho",
});

const rows: { label: string; value: string }[] = [
  { label: "販売事業者", value: siteConfig.name },
  { label: "運営責任者", value: siteConfig.author.name },
  { label: "所在地", value: "請求があり次第、遅滞なく開示します。" },
  { label: "連絡先", value: siteConfig.contact.email },
  { label: "受付時間", value: siteConfig.contact.hours },
  { label: "販売価格", value: "各講座ページに記載(税込)" },
  {
    label: "商品以外の必要料金",
    value: "インターネット接続にかかる通信費・教材購入費(任意)等はお客様のご負担となります。",
  },
  {
    label: "支払方法",
    value: "銀行振込 / クレジットカード(決済サービス経由)",
  },
  {
    label: "支払時期",
    value: "初回授業開始前までに当月分をお支払いいただきます(コースにより異なる)。",
  },
  {
    label: "役務の提供時期",
    value: "お申し込み後、面談・日程調整を経て順次開始します。",
  },
  {
    label: "返品・キャンセル",
    value: "役務の性質上、提供後の返金はお受けしておりません。開始前のキャンセルは所定の条件に基づき対応いたします。",
  },
];

export default function TokushohoPage() {
  return (
    <>
      <Container className="pt-10">
        <Breadcrumb
          items={[
            { label: "ホーム", href: "/" },
            { label: "特定商取引法に基づく表記", href: "/tokushoho" },
          ]}
        />
      </Container>

      <Section
        eyebrow="LEGAL"
        title="特定商取引法に基づく表記"
        description="特定商取引法第11条に基づき、以下の通り表記します。"
      >
        <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-paper/10 bg-ink-900/60">
          <dl className="divide-y divide-paper/10">
            {rows.map((row) => (
              <div
                key={row.label}
                className="grid gap-2 px-6 py-5 sm:grid-cols-[10rem_1fr] sm:items-start"
              >
                <dt className="text-[10px] tracking-[0.28em] uppercase text-paper/50">
                  {row.label}
                </dt>
                <dd className="text-sm leading-relaxed text-paper/80">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <JsonLd
        id="ld-breadcrumb-tokushoho"
        data={breadcrumbJsonLd([
          { name: "ホーム", href: "/" },
          { name: "特定商取引法に基づく表記", href: "/tokushoho" },
        ])}
      />
    </>
  );
}
