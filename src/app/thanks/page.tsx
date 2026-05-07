import type { Metadata } from "next";
import { Section } from "@/components/section";
import { Container } from "@/components/container";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ThanksConfirmation } from "@/components/thanks-confirmation";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "申し込みありがとうございました ｜ Solvora Learning Lab",
  description:
    "Solvora Learning Lab — 体験授業（¥3,000）のお申し込み、決済完了をもって受付が確定しました。担当の森祐太より2営業日以内にご連絡いたします。",
  path: "/thanks",
  noIndex: true,
});

export default function ThanksPage() {
  return (
    <>
      <Container className="pt-10">
        <Breadcrumb
          items={[
            { label: "ホーム", href: "/" },
            { label: "申し込み完了", href: "/thanks" },
          ]}
        />
      </Container>

      <Section
        eyebrow="THANK YOU — 申し込み完了"
        title="ご決済ありがとうございました。"
        description="お申し込みを正式に受け付けました。担当の森祐太より、2営業日以内にご入力のメールアドレスへご連絡いたします。"
      >
        <ThanksConfirmation />
      </Section>

      <JsonLd
        id="ld-breadcrumb-thanks"
        data={breadcrumbJsonLd([
          { name: "ホーム", href: "/" },
          { name: "申し込み完了", href: "/thanks" },
        ])}
      />
      <JsonLd
        id="ld-webpage-thanks"
        data={webPageJsonLd({
          name: "申し込みありがとうございました ｜ Solvora Learning Lab",
          description:
            "Solvora Learning Lab — 体験授業（¥3,000）の申し込み完了ページ。",
          path: "/thanks",
        })}
      />
    </>
  );
}
