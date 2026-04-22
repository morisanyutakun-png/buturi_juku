# AGENTS.md

このリポジトリで作業する AI エージェント・開発者向けのガイドです。

## プロジェクト概要

- 目的: 物理専門塾「森祐太 物理専門塾」のブランド/集客サイト
- スタック: Next.js 15 (App Router) / React 19 / TypeScript / Tailwind CSS v3
- デプロイ先: Vercel
- CMS: なし(ローカルの `src/data/*` で管理。将来的に Headless CMS へ移行可能な前提)

## 一次ソース

機能追加・修正にあたっては、まず以下の一次ドキュメントを優先参照してください。

1. Next.js 公式: https://nextjs.org/docs (App Router / Metadata API / ISR / Sitemap / Robots)
2. Tailwind CSS 公式: https://tailwindcss.com/docs
3. Vercel Docs: https://vercel.com/docs
4. Lucide Icons: https://lucide.dev
5. Schema.org: https://schema.org (JSON-LD を書く際)

チュートリアル記事・ブログ記事は二次情報として扱い、必ず公式ドキュメントで裏取りしてください。

## ディレクトリ構造ルール

- `src/app`: App Router のルート。ページごとに `page.tsx` / `layout.tsx` を置く
- `src/components`: ルート非依存の UI コンポーネント。再利用可能なものに限定
- `src/data`: コンテンツデータ(`site.ts` / `courses.ts` / `articles.ts` / `faq.ts`)
- `src/lib`: フレームワーク依存の薄いユーティリティと SEO ヘルパー
- `public`: 静的アセット

### 命名

- コンポーネントはケバブケース `.tsx` ファイル + PascalCase export
- データファイルの型は `Course`, `Article` のようなエンティティ名単数形
- Server Component を基本とし、`"use client"` を付けるのは必要最小限に

## 開発フロー

1. 依存インストール: `pnpm install` または `npm install`
2. 開発サーバ: `npm run dev` (http://localhost:3000)
3. 型チェック: `npm run build` が最も確実な型チェック手段
4. Lint: `npm run lint`

## SEO の取り決め

- 各ページは `src/lib/metadata.ts` の `buildMetadata()` を使って `metadata` または `generateMetadata` を設定する
- `siteConfig.url` をカスタムドメインに差し替えると、canonical / OGP / sitemap / robots / JSON-LD が同期して更新される
- JSON-LD は `src/components/json-ld.tsx` + `src/lib/jsonld.ts` を通じて注入する
- 新しいルートを追加したら `src/app/sitemap.ts` にも反映する

## データ追加ルール

### 講座を追加する

`src/data/courses.ts` の `courses` 配列に `Course` 型でエントリを追加する。
`slug` が URL になり `/courses/[slug]` に自動で反映される。

### 記事を追加する

`src/data/articles.ts` の `articles` 配列に `Article` 型でエントリを追加する。
`sections` の `id` はアンカー(目次リンク)になるため、一意かつ URL-safe にする。
関連記事は `related: ["slug-a", "slug-b"]` の形で指定する。

### FAQ を追加する

`src/data/faq.ts` の `faqItems` に追加する。`category` は既存のものから選ぶか、必要に応じて型 `FaqItem['category']` を拡張する。

## コーディング規約

- Server Component をデフォルトに、状態を持つ UI だけ Client Component にする
- Tailwind の `container` 等は `src/components/container.tsx` を経由させ、直接 `max-w-` を散在させない
- セクションの余白は `Section` コンポーネントに集約する
- アクセシビリティ: `aria-label` / `aria-current` / セマンティック HTML を優先
- 画像は `public/` に置くか、本文に関係するものは Next.js の `<Image>` を使う

## 今後やること候補

- お問い合わせ API (`src/app/api/contact/route.ts`) の実装(Resend / SendGrid 連携)
- Contentlayer / Headless CMS 移行
- OG 画像の自動生成(`opengraph-image.tsx` による動的 OG)
- サイト内検索(Algolia / Pagefind)
