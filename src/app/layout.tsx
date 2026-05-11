import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileCtaBarClient } from "@/components/mobile-cta-bar-client";
import { JsonLd } from "@/components/json-ld";
import { organizationJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { siteConfig } from "@/data/site";
import { GA_ID, GADS_ID } from "@/lib/analytics";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} ｜ AI復習プリント付き 高校物理・理系個別指導`,
    template: `%s ｜ ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.author.name }],
  creator: siteConfig.author.name,
  publisher: siteConfig.name,
  keywords: [
    ...siteConfig.seo.defaultKeywords,
    ...siteConfig.seo.highIntentKeywords,
  ],
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} ｜ AI復習プリント付き 高校物理・理系個別指導`,
    description: siteConfig.description,
    // og:image is auto-injected by Next.js from src/app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitter,
    creator: siteConfig.twitter,
    title: `${siteConfig.name} ｜ AI復習プリント付き 高校物理・理系個別指導`,
    description: siteConfig.description,
    // twitter:image is auto-injected from the same opengraph-image convention
  },
  alternates: {
    canonical: siteConfig.url,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fdfbf5" },
    { media: "(prefers-color-scheme: dark)", color: "#142341" },
  ],
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  // `cover` lets the design extend under the iOS home indicator;
  // `env(safe-area-inset-*)` already pads our sticky CTA correctly.
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="dns-prefetch" href="https://yuta-eng.com" />
        <link rel="dns-prefetch" href="https://amzn.asia" />
        {/*
          注：以前は googletagmanager.com に preconnect していたが、gtag.js を
          interaction-triggered（初回ユーザー操作）でロードする方式に変更したため、
          初期段階で接続を温める意味がなくなり Lighthouse から「未使用 preconnect」
          として警告されていた。dns-prefetch だけ残す（接続コストはほぼゼロで、
          かつユーザー操作後のロードを最速にする）。
        */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        {/*
          注：以前は /trial /courses /online の3ドキュメントを `<link rel="prefetch">`
          していたが、Lighthouse のネットワーク利用率を圧迫していたため停止。
          Next.js の `<Link>` がビューポート内で自動的に必要なルートをプリフェッチ
          するので、ナビ体感はほぼ変わらない。
        */}
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
        >
          メインコンテンツへスキップ
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <MobileCtaBarClient />
        <JsonLd id="ld-organization" data={organizationJsonLd()} />
        <JsonLd id="ld-website" data={websiteJsonLd()} />

        {/* Google tag (gtag.js) — GA4 + Google Ads conversions
            Interaction-triggered loading: gtag.js 本体は **初回のユーザー操作**
            （スクロール / タップ / クリック / キー入力）または 8秒のフォール
            バックタイマで初めてロードされる。Lighthouse の TBT 計測ウィンドウ
            （通常 FCP〜TTI の数秒）からほぼ完全に外れるため、Total Blocking
            Time / Speed Index への寄与が **ゼロに近づく**。

            dataLayer と window.gtag の関数定義は即座に行うため、useEffect で
            trackEvent が呼ばれても安全にキューに積まれ、gtag.js ロード後に
            遡及処理される（analytics.ts の ensureGtag() と同等の挙動）。

            window.__solvoraLoadGtag() を /thanks など即時計測が必要な
            ページから呼ぶことで、deferred ロードをバイパスできる
            （コンバージョン取りこぼしを防ぐ）。 */}
        {(GA_ID || GADS_ID) && (
          <Script
            id="gtag-deferred-loader"
            // beforeInteractive: React hydration より前に走らせる。
            // これにより dataLayer に [js, config G, config AW] の3項目が
            // 必ず先に入り、React useEffect から push される event は
            // 後続として正しく処理される（gtag.js は dataLayer を順番に
            // 処理するため、config より前にある event は測定プロパティが
            // 未初期化として破棄されてしまう）。これが trial_application_complete
            // などのカスタムイベントだけ GA4 に届かない原因だった。
            //
            // 内容は外部フェッチを含まない軽量 IIFE（イベントリスナの登録 +
            // 8秒の setTimeout のみ）なので、beforeInteractive にしても
            // TBT への影響は無視できる。
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                ${GA_ID ? `gtag('config', '${GA_ID}', { send_page_view: true });` : ""}
                ${GADS_ID ? `gtag('config', '${GADS_ID}');` : ""}
                var loaded = false;
                function loadGtag(){
                  if (loaded) return;
                  loaded = true;
                  var s = document.createElement('script');
                  s.async = true;
                  s.src = 'https://www.googletagmanager.com/gtag/js?id=${GA_ID || GADS_ID}';
                  document.head.appendChild(s);
                }
                // /thanks など即時計測が必要なページから呼べるよう export
                window.__solvoraLoadGtag = loadGtag;
                var events = ['pointerdown','touchstart','keydown','scroll','mousemove'];
                events.forEach(function(e){
                  window.addEventListener(e, loadGtag, { once: true, passive: true, capture: true });
                });
                // フォールバック: 操作がなくても 8 秒で読み込む（バウンス計測のため）
                setTimeout(loadGtag, 8000);
              `,
            }}
          />
        )}
      </body>
    </html>
  );
}
