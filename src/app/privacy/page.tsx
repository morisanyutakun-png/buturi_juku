import type { Metadata } from "next";
import { Section } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = buildMetadata({
  title: "プライバシーポリシー",
  description:
    "Solvora Learning Lab（運営：森祐太）における個人情報の取り扱いに関する方針を定めています。",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <Container className="pt-10">
        <Breadcrumb
          items={[
            { label: "ホーム", href: "/" },
            { label: "プライバシーポリシー", href: "/privacy" },
          ]}
        />
      </Container>

      <Section
        eyebrow="PRIVACY POLICY"
        title="プライバシーポリシー"
        description={`${siteConfig.name}（運営：森祐太 / 個人事業主、以下「当サービス」）は、ご提供いただく個人情報を以下の方針に基づき取り扱います。`}
      >
        <div className="article-content mx-auto max-w-3xl">
          <h2>1. 個人情報の定義</h2>
          <p>
            本ポリシーにおける個人情報とは、氏名・メールアドレス・学年・ご相談内容など、特定の個人を識別できる情報を指します。
          </p>

          <h2>2. 取得する情報</h2>
          <p>
            当サービスは、お問い合わせ・体験授業申込・受講契約に際し、必要な範囲で以下の情報を取得します。
          </p>
          <ul>
            <li>氏名</li>
            <li>メールアドレス</li>
            <li>学年・学年相当区分</li>
            <li>ご相談内容、志望校情報</li>
          </ul>

          <h2>3. 利用目的</h2>
          <p>取得した個人情報は以下の目的で利用します。</p>
          <ul>
            <li>お問い合わせ・体験授業申込への返信</li>
            <li>受講の契約・案内・連絡</li>
            <li>受講者の学習状況に関する連絡</li>
            <li>当サービスからのサービスに関する情報提供</li>
          </ul>

          <h2>4. 第三者提供</h2>
          <p>
            法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供することはありません。
          </p>

          <h2>5. 安全管理</h2>
          <p>
            取得した個人情報は、適切な安全管理措置を講じて保管します。漏洩・紛失・改ざん等の防止に努めます。
          </p>

          <h2>6. 開示・訂正・削除の請求</h2>
          <p>
            ご本人からのご請求に応じて、保有する個人情報の開示・訂正・削除に対応します。ご希望の方はお問い合わせフォームよりご連絡ください。
          </p>

          <h2>7. Cookie等の利用</h2>
          <p>
            本ウェブサイトでは、利便性向上や利用状況分析のためにCookie等を使用する場合があります。ブラウザ設定により無効化することが可能です。
          </p>

          <h2>8. 改定</h2>
          <p>
            本ポリシーの内容は、法令その他の事情により予告なく変更する場合があります。最新版は本ページに掲載します。
          </p>

          <h2>9. お問い合わせ窓口</h2>
          <p>
            本ポリシーに関するお問い合わせは、{siteConfig.contact.email}
            までご連絡ください。
          </p>
        </div>
      </Section>

      <JsonLd
        id="ld-breadcrumb-privacy"
        data={breadcrumbJsonLd([
          { name: "ホーム", href: "/" },
          { name: "プライバシーポリシー", href: "/privacy" },
        ])}
      />
    </>
  );
}
