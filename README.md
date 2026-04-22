# 森祐太 物理専門塾 公式サイト

高校物理に特化した物理専門塾「森祐太 物理専門塾」のブランド／集客サイトです。

- Framework: Next.js 15 (App Router) / React 19
- Language: TypeScript
- Styling: Tailwind CSS v3
- Icons: lucide-react
- Deploy: Vercel

---

## セットアップ

```bash
# 依存インストール
npm install
# or
pnpm install

# 開発サーバ起動
npm run dev
```

ブラウザで http://localhost:3000 を開くと確認できます。

## ビルド / 本番起動

```bash
# 本番ビルド(型チェックも兼ねます)
npm run build

# 本番モードで起動
npm run start
```

## Vercelへのデプロイ

1. この repository を GitHub などの Git ホスティングに push する
2. https://vercel.com/new から該当リポジトリを import する
3. Framework preset は `Next.js` が自動検出されます
4. ビルドコマンド / 出力ディレクトリはデフォルトのまま
5. `Deploy` をクリック
6. 発行された URL(例 `https://xxx.vercel.app`)で動作確認

### カスタムドメインを設定する

1. Vercel のプロジェクト `Settings → Domains` に独自ドメインを追加
2. DNS レコードを表示通りに設定(ネームサーバー委任 or CNAME / A)
3. `src/data/site.ts` の `siteConfig.url` を本番ドメインに書き換える
   - 例: `url: "https://buturi-juku.com"`
4. 再デプロイ
5. これだけで `canonical` / OGP / `sitemap.xml` / `robots.txt` / JSON-LD がすべて新ドメインで同期されます

## サイト設定の一元管理

すべてのサイト文言・URL は [`src/data/site.ts`](src/data/site.ts) の `siteConfig` に集約されています。
ブランド名・タグライン・メールアドレス・OG画像パス・Twitter ハンドルをここで一元管理してください。

## データ拡張

- 新しい講座を追加: [`src/data/courses.ts`](src/data/courses.ts) の `courses` 配列にエントリを足す
  - 自動で `/courses/[slug]` が生成されます
- 新しい記事を追加: [`src/data/articles.ts`](src/data/articles.ts) の `articles` 配列にエントリを足す
  - 自動で `/articles/[slug]` が生成されます
- 新しい FAQ を追加: [`src/data/faq.ts`](src/data/faq.ts) の `faqItems` 配列にエントリを足す

## SEO まわり

- すべてのページに固有の `title` / `description` を設定済み
- JSON-LD: Organization / WebSite / Breadcrumb / Person / Article / Course / FAQPage
- `app/sitemap.ts` と `app/robots.ts` により sitemap.xml / robots.txt を動的生成
- OG 画像は `public/og-default.svg`(SVG)。PNG 化して差し替えも推奨

## ディレクトリ構成

```
src/
├── app/         # App Router のルート
├── components/  # UI コンポーネント
├── data/        # サイトコンテンツ
└── lib/         # ユーティリティと SEO ヘルパー
```

## フォーム送信の実運用化

現状の `src/components/contact-form.tsx` はダミー送信です。
将来的に `src/app/api/contact/route.ts` を実装するか、外部フォームサービス(Formspree / Resend / SendGrid 等)を使って実送信に差し替えてください。

## ライセンス

社内利用を想定した非公開プロジェクトです。
