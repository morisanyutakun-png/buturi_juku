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
  { label: "販売事業者", value: `${siteConfig.name}（運営：森祐太 / 個人事業主）` },
  { label: "運営責任者", value: siteConfig.author.name },
  { label: "所在地", value: "請求があり次第、遅滞なく開示します。" },
  { label: "連絡先", value: siteConfig.contact.email },
  { label: "受付時間", value: siteConfig.contact.hours },
  { label: "販売価格", value: "各講座ページに記載(税込)" },
  {
    label: "商品以外の必要料金",
    value: "インターネット接続にかかる通信費、および指定教材（市販の問題集等。任意。コースにより推奨）の購入費はお客様のご負担となります。",
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
    value:
      "受講開始後に途中で解約される場合は、未実施回数分を回数割でご返金いたします（例：全6回 ¥66,000 の講座で 2回実施後に解約 → 残り4回分 ¥44,000 を返金）。実施済みの回・体験授業（役務提供完了）は返金対象外です。開始前のキャンセルは全額返金いたします。返金は原則として決済時と同一の手段で、申し出から14営業日以内に手続きします。",
  },
  {
    label: "機材トラブル時の対応",
    value:
      "講師側の機材・通信障害により授業が実施できなかった場合、その回は無償で振替授業を実施します。受講者側のトラブルでも、開始から15分以内にご連絡いただければ振替日程を調整します（月1回まで）。なお、ご連絡なく開始30分を経過した場合は当該回を実施扱いとさせていただきます。",
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
        <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-ink-900/10 bg-white">
          <dl className="divide-y divide-ink-900/10">
            {rows.map((row) => (
              <div
                key={row.label}
                role="group"
                className="grid gap-2 px-6 py-5 sm:grid-cols-[10rem_1fr] sm:items-start"
              >
                <dt className="text-[11px] tracking-[0.24em] uppercase text-ink-600">
                  {row.label}
                </dt>
                <dd className="text-sm leading-relaxed text-ink-800">
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
