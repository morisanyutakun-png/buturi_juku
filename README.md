# 物理の森 公式サイト

物理専門塾「物理の森 / 森祐太の物理専門塾」のブランド・集客サイトです。広告流入と自然検索流入の両方を受ける前提で、講座ページ、体験授業導線、学習コラム、FAQ、構造化データを実装しています。

## 現在の技術構成

- Framework: Next.js ^15.1.6 (App Router / current lock: 15.5.15)
- Runtime UI: React ^19.0.0 (current lock: 19.2.5)
- Language: TypeScript ^5.7.2 (current lock: 5.9.3)
- Styling: Tailwind CSS ^3.4.17 (current lock: 3.4.19)
- Icons: lucide-react 0.456.0
- Deploy: Vercel
- Content: Headless CMS なし。`src/data/*` のローカルデータで管理
- Site version: 2026.04.23

## セットアップ

```bash
npm install
cp .env.example .env.local
npm run dev
```

開発サーバーは `http://localhost:3000` で起動します。

本番URLは `.env.local` または Vercel の Environment Variables で設定してください。

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

`NEXT_PUBLIC_SITE_URL` は canonical、OGP、`sitemap.xml`、`robots.txt`、JSON-LD のURL生成に使われます。未設定時は `https://example.com` が入るため、本番公開前に必ず設定してください。

## コマンド

```bash
npm run dev
npm run build
npm run start
npm run lint
```

`npm run build` は Next.js の本番ビルドで、型チェックも含めた最終確認として使います。

## 主要ルート

- `/`: トップページ。広告/SEO両方の受け皿
- `/about`: 塾の理念、物理専門塾としての違い
- `/teacher`: 講師紹介、出版・指導実績
- `/courses`: 講座一覧
- `/courses/[slug]`: 講座詳細
- `/trial`: 無料体験授業
- `/articles`: 物理学習コラム一覧
- `/articles/[slug]`: コラム詳細
- `/faq`: よくある質問
- `/contact`: お問い合わせ
- `/privacy`: プライバシーポリシー
- `/tokushoho`: 特定商取引法に基づく表記

## SEO 実装方針

SEOは「検索エンジンに正しく伝える技術SEO」と「検索意図に答えるコンテンツSEO」の両方で設計しています。

- `src/lib/metadata.ts` の `buildMetadata()` で、title、description、canonical、OGP、Twitter Card、robots、ページ別キーワードを生成
- `src/lib/jsonld.ts` で、EducationalOrganization、WebSite、WebPage、BreadcrumbList、ItemList、Article、Course、FAQPage、Service を生成
- `src/app/sitemap.ts` で静的ページ、講座ページ、記事ページを動的に列挙
- `src/app/robots.ts` で sitemap の場所とクロール許可を明示
- トップページに検索意図別セクションを設置し、「大学受験 物理 塾」「オンライン 物理 個別指導」「共通テスト 物理 対策」「力学 / 電磁気 苦手 克服」などの高意図クエリから講座へ内部リンク
- 広告流入のUTMパラメータが付いても canonical は各ページの正規URLへ統一

## SEO 運用ルール

新しいページを追加したら、最低限以下を確認してください。

1. `buildMetadata()` で固有の `title`、`description`、`path`、`keywords` を設定する
2. パンくずUIと `breadcrumbJsonLd()` を追加する
3. 検索結果に出したい一覧・詳細ページなら `webPageJsonLd()`、`itemListJsonLd()`、`articleJsonLd()`、`courseJsonLd()` など適切なJSON-LDを追加する
4. 新しい静的ルートは `src/app/sitemap.ts` に追加する
5. 広告専用で内容がSEOページと重複するLPは、必要に応じて `noIndex: true` を検討する

## データ更新

コンテンツは `src/data/*` に集約しています。

- サイト共通設定: `src/data/site.ts`
- 講座: `src/data/courses.ts`
- 記事: `src/data/articles.ts`
- FAQ: `src/data/faq.ts`
- 講師情報: `src/data/instructor.ts`
- 書籍情報: `src/data/books.ts`
- 対象者セグメント: `src/data/audiences.ts`

講座を追加すると `/courses/[slug]` に自動反映されます。記事を追加すると `/articles/[slug]` に自動反映されます。記事の `sections[].id` は目次アンカーになるため、URL-safe かつ一意にしてください。

## 広告運用との分け方

広告は `/trial`、`/courses/private`、必要に応じて専用LPへ着地させます。SEOはトップ、講座一覧、講座詳細、学習コラム、FAQで中長期的に拾います。

広告LPを追加する場合は、既存SEOページのコピーにしすぎないようにしてください。重複が避けられない場合は `buildMetadata({ noIndex: true })` を使い、広告専用ページとして扱うのが安全です。

## デプロイ

Vercel で Next.js として import すればデフォルト設定でデプロイできます。

1. GitHub などに push
2. Vercel で該当リポジトリを import
3. Environment Variables に `NEXT_PUBLIC_SITE_URL` を設定
4. Deploy
5. `/sitemap.xml`、`/robots.txt`、主要ページの canonical / OGP を確認

## 本番公開前チェック

- `NEXT_PUBLIC_SITE_URL` が本番ドメインになっている
- `npm run build` が通る
- `sitemap.xml` に主要ルート、講座、記事が含まれている
- `robots.txt` の sitemap URL が本番ドメインになっている
- OGP画像がSNSプレビューで表示される
- Google Search Console にドメイン登録し、sitemap を送信する
- 広告URLのUTMパラメータと canonical の挙動を確認する

## フォーム送信

`src/components/contact-form.tsx` は現状ダミー送信です。実運用では `src/app/api/contact/route.ts` を実装し、Resend / SendGrid / 外部フォームサービスなどに接続してください。

## ライセンス

非公開プロジェクトです。
