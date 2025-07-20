# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 開発コマンド

- `npm run dev` - 開発サーバーを起動（localhost:4321）
- `npm run build` - 本番用ビルド（./dist/に出力）
- `npm run preview` - ビルド済みサイトのプレビュー
- `npm run astro` - Astro CLIコマンド実行

## アーキテクチャ概要

このプロジェクトはAstro 5を使用した静的サイト生成ブログです。

### Content Collections

- ブログ投稿は`src/content/blog/`にフォルダベースで組織化
- 各投稿は`folder-name/index.md`形式
- Zodスキーマによるタイプセーフなフロントマター（`src/content/config.ts`）
- ヒーロー画像とタグ機能をサポート

### ルーティング構造

- `src/pages/` - ファイルベースルーティング
- `src/layouts/BlogPost.astro` - ブログ投稿の共通レイアウト
- `src/pages/tags/[tag].astro` - 動的タグページ生成
- `src/pages/rss.xml.js` - RSSフィード生成

### コンポーネント設計

- `src/components/` - 再利用可能なAstroコンポーネント
- `BaseHead.astro` - 共通のHTMLメタデータ設定
- TypeScript厳密モードが有効

### 設定ファイル

- `src/consts.ts` - サイト全体の定数（SITE_TITLE, SITE_DESCRIPTION等）
- `astro.config.mjs` - サイトURL、統合設定（MDX、サイトマップ）
- Content Collectionsのスキーマは`src/content/config.ts`で定義

### テスト

- MCPのPlaywrightツールを使用してE2Eテストを実行
- `npm run dev`でサーバー起動後、Playwrightでブラウザテストが可能

### デザインシステム

#### ブログ一覧ページ（`src/pages/blog/index.astro`）
- CSS Gridを使用したカードベースのレスポンシブレイアウト
- 全記事が統一されたカードサイズで表示
- ホバーエフェクト：カードの浮き上がりと画像のズーム効果
- タグデザイン：`var(--primary-dark)`を使用し、統一されたスタイル

#### 色システム（`src/styles/global.css`）
- **必須**: 全ての色指定はCSS変数を使用すること
- **利用可能な色変数**:
  - `--primary: #2337ff` - プライマリ色
  - `--primary-dark: #000d8a` - 濃いプライマリ色
  - `--black: 15, 18, 25` - テキスト黒色（RGB値）
  - `--white: 255, 255, 255` - 白色（RGB値）
  - `--secondary: 96, 115, 159` - セカンダリ色（RGB値）
  - `--secondary-light: 229, 233, 240` - 薄いセカンダリ色（RGB値）
  - `--secondary-dark: 34, 41, 57` - 濃いセカンダリ色（RGB値）
- **シャドウ**: `--box-shadow`変数で統一されたドロップシャドウ
- **使用例**: `color: rgb(var(--white))`, `background: var(--primary-dark)`

#### レスポンシブデザイン
- デスクトップ：auto-fitグリッドレイアウト（最小350px）
- モバイル（768px以下）：1カラムレイアウト
- 全デバイスで統一されたカードサイズ

### 注意事項

- 現在テスト、リント、フォーマッター設定なし
- サイトURLは`https://example.com`のままなので変更が必要
- 画像最適化にSharpを使用
- デザイン変更時は既存のCSS変数を使用し、新しい色は定義しない