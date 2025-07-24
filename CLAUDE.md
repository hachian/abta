# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

ABTA (Astro Blog Tags Archive) は、日本語ブログ執筆者向けに最適化されたAstroベースのブログテンプレートです。MITライセンスで公開されています。

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
- `src/pages/archive/` - 月別・年別アーカイブページ
- `src/pages/rss.xml.js` - RSSフィード生成

### コンポーネント設計

- `src/components/` - 再利用可能なAstroコンポーネント
- **共通コンポーネント**:
  - `BlogCard.astro` - ブログ記事カード表示
  - `BlogCardGrid.astro` - BlogCardのグリッドレイアウト
  - `SocialLinks.astro` - ソーシャルメディアリンク
  - `Icon.astro` - SVGアイコン
  - `PageLayout.astro` - ヒーロー画像付きページ用の共通レイアウト
  - `ContentLayout.astro` - 一覧ページ用の共通レイアウト
  - `BlogPostLayout.astro` - ブログ記事専用レイアウト（タグクラウド、目次付き）
- TypeScript厳密モードが有効

### 設定ファイル

- `src/consts.ts` - サイト全体の定数と機能フラグ
  - `FEATURES.TAGS_ENABLED` - タグ機能の有効/無効
  - `FEATURES.ARCHIVE_ENABLED` - アーカイブ機能の有効/無効
  - `SIDEBAR_TAG_LIMIT` - サイドバーに表示するタグの最大数（0 = 無制限）
  - `SIDEBAR_ARCHIVE_LIMIT` - サイドバーに表示する月別アーカイブの最大数（0 = 無制限）
- `astro.config.mjs` - サイトURL、統合設定（MDX、サイトマップ）
- `src/content/config.ts` - Content Collectionsスキーマ

### スタイルシステム

- **グローバルスタイル**: `src/styles/global.css` - ベーススタイルとCSS変数定義
- **共通スタイルシート** (global.cssでインポート):
  - `src/styles/components.css` - 再利用可能なコンポーネント用スタイル
  - `src/styles/layouts.css` - レイアウト関連スタイル
  - `src/styles/utilities.css` - ユーティリティクラス

### ユーティリティ関数

- `src/utils/schema.ts` - 構造化データ（JSON-LD）生成関数
  - `createWebSiteSchema()` - WebSiteスキーマ生成
  - `createCollectionPageSchema()` - コレクションページスキーマ生成
  - `createBlogPostSchema()` - ブログ記事スキーマ生成
- `src/utils/archive.ts` - 日付・アーカイブ処理関数
  - `formatJapaneseYearMonth()` - 日本語形式の年月表示
  - `groupPostsByMonth()` - 記事を月別にグループ化
  - `groupPostsByYear()` - 記事を年別にグループ化
- `src/utils/formatting.ts` - フォーマット関連関数
  - `formatPostCount()` - 記事数を日本語形式で表示（例: 5記事）
  - `truncateText()` - テキストの切り詰め
  - `joinWithComma()` - 配列を日本語カンマ区切りに

### テスト

- MCPのPlaywrightツールでE2Eテストを実行
- `npm run dev`でサーバー起動後、Playwrightでブラウザテスト可能

## 日本語最適化デザインシステム

### 言語・ローカライゼーション設定
- **言語設定**: 全HTMLファイルで`lang="ja"`を使用
- **日付フォーマット**: ja-JP（YYYY/M/D形式）で統一
- **UI文言**: 日本語化済み

### 日本語タイポグラフィ（`src/styles/global.css`）
- **フォントファミリー**: `'Noto Sans JP', 'Atkinson', 'Hiragino Kaku Gothic ProN', 'Yu Gothic', sans-serif`
- **Google Fonts**: Noto Sans JPを`src/components/BaseHead.astro`で読み込み
- **本文フォントサイズ**: `clamp(16px, 2.5vw, 18px)`（レスポンシブ）
- **行間**: 1.8（日本語最適化）

### 日本語UI最適化
- **イタリック回避**: `em`, `i`要素を下線表示に変更
- **太字強調**: `strong`, `b`要素にプライマリカラー適用
- **インラインコード**: ダーク背景・明るい文字
- **コードブロック**: 90%サイズ（0.9em）

### 色システム（`src/styles/global.css`）
- **必須**: 全ての色指定はOKLCH色空間のCSS変数を使用すること
- **利用可能な色変数**:
  - `--primary: oklch(45% 0.25 262)` - プライマリ色（青系）
  - `--primary-dark: oklch(25% 0.22 262)` - 濃いプライマリ色
  - `--primary-foreground: oklch(12% 0.02 262)` - 前景色（テキスト等）
  - `--primary-background: oklch(97% 0.01 262)` - 背景色（コンテンツ背景等）
- **シャドウ**: `--box-shadow`変数で統一されたドロップシャドウ
- **設計思想**: プライマリ系色のみを使用したミニマルなカラーシステム

### レスポンシブデザイン
- CSS Gridによるカードベースレイアウト
- グリッド設定: `repeat(auto-fill, minmax(350px, 1fr))`で左寄せ配置
- モバイル（768px以下）：1カラムレイアウト

## 機能フラグによる機能制御

`src/consts.ts`の`FEATURES`オブジェクトで、タグ機能とアーカイブ機能を個別にオン/オフできます。

```typescript
export const FEATURES = {
  TAGS_ENABLED: true,    // タグ機能の有効/無効
  ARCHIVE_ENABLED: true, // アーカイブ機能の有効/無効
};
```

各機能を無効にすると、対応するナビゲーションリンク、ページ要素、コンポーネント内の表示が自動的に非表示になります。

## サイト設定

サイトの基本設定は`config.json`ファイルで管理されています。このファイルを編集することで、コードを変更することなく設定をカスタマイズできます。

### 設定ファイル構造

```json
{
  "site": {
    "title": "ABTA",
    "description": "日本語に最適化されたAstroブログテンプレート",
    "author": "ABTA"
  },
  "features": {
    "tagsEnabled": true,
    "archiveEnabled": true
  },
  "sidebar": {
    "archiveLimit": 5,
    "tagLimit": 7
  },
  "theme": {
    "primaryHue": 262
  },
  "seo": {
    "defaultOgImage": "/og-default.png",
    "locale": "ja_JP"
  },
  "footer": {
    "copyrightText": "ABTA Project. All rights reserved.",
    "startYear": null
  },
  "analytics": {
    "googleAnalyticsId": "",
    "enabled": false
  },
  "socialLinks": {
    "mastodon": {
      "url": "",
      "enabled": false
    },
    "twitter": {
      "url": "https://x.com/yourhandle",
      "enabled": true
    },
    "github": {
      "url": "https://github.com/yourusername",
      "enabled": true
    },
    "steam": {
      "url": "https://steamcommunity.com/id/yourid/",
      "enabled": false
    },
    "facebook": {
      "url": "",
      "enabled": false
    },
    "youtube": {
      "url": "",
      "enabled": false
    },
    "instagram": {
      "url": "",
      "enabled": false
    },
    "discord": {
      "url": "",
      "enabled": false
    }
  }
}
```

### 設定項目の説明

**サイト基本情報:**
- `site.title`: サイトタイトル
- `site.description`: サイトの説明文（メタデータとして使用）
- `site.author`: サイトの著者名（デフォルト: "ABTA"）

**機能制御:**
- `features.tagsEnabled`: タグ機能の有効/無効
- `features.archiveEnabled`: アーカイブ機能の有効/無効

**サイドバー表示設定:**
- `sidebar.tagLimit`: サイドバーに表示するタグの最大数（0 = 無制限）
- `sidebar.archiveLimit`: サイドバーに表示する月別アーカイブの最大数（0 = 無制限）
- タグは記事数の多い順に表示されます
- 月別アーカイブは新しい順に表示されます
- 制限数を超える項目がある場合は「すべて見る」リンクが表示されます

**カラーテーマ設定:**
- `theme.primaryHue`: プライマリカラーの色相（hue）値（0-360）

色相値の例：
- 0 / 360: 赤
- 30: オレンジ
- 60: 黄色
- 120: 緑
- 180: シアン
- 240: 青
- 262: デフォルト値（青紫）
- 300: マゼンタ

この値を変更することで、サイト全体の配色を簡単に変更できます。すべての色（プライマリ、ダーク、ライト、背景、前景）が自動的に調整されます。

**SEO設定:**
- `seo.defaultOgImage`: デフォルトのOGP画像パス（記事にheroImageがない場合に使用。空文字列の場合は`src/assets/blog-placeholder-1.jpg`を使用）
- `seo.locale`: サイトのロケール（デフォルト: "ja_JP"）

**フッター設定:**
- `footer.copyrightText`: コピーライトのテキスト（デフォルト: "ABTA Project. All rights reserved."）
- `footer.startYear`: コピーライト開始年。設定すると「2023-2025」形式で年範囲を表示（nullの場合は現在年のみ）

**アナリティクス設定:**
- `analytics.googleAnalyticsId`: Google Analytics 4の測定ID（例: "G-XXXXXXXXXX"）
- `analytics.enabled`: アナリティクスの有効/無効（デフォルト: false）

**ソーシャルリンク設定:**
- `socialLinks`: 各ソーシャルプラットフォームのURL設定と表示制御
- 対応プラットフォーム:
  - `mastodon`: Mastodon
  - `twitter`: X (Twitter) 
  - `github`: GitHub
  - `steam`: Steam
  - `facebook`: Facebook
  - `youtube`: YouTube
  - `instagram`: Instagram
  - `discord`: Discord
- 各プラットフォームで以下を設定:
  - `url`: プロフィールページのURL
  - `enabled`: 表示する場合は`true`、非表示の場合は`false`
- 有効にしたプラットフォームのアイコンがヘッダーとフッターに表示されます
- Twitter/XのURLは自動的にパースされ、`twitter:site`メタタグに使用されます

### 設定変更後の注意

`config.json`を変更した後は、開発サーバーを再起動してください。

## 注意事項

- 現在テスト、リント、フォーマッター設定なし
- サイトURLは`https://example.com`のままなので変更が必要
- 画像最適化にSharpを使用
- **デザイン変更時は既存のCSS変数を使用し、新しい色は定義しない**
- **日本語サイトとして最適化済み - 言語設定やフォント変更時は注意**
- **コンポーネント化済み** - 再利用可能な共通コンポーネントを活用
- **機能フラグ対応済み** - タグとアーカイブ機能を個別に制御可能
- **リファクタリング済み** - 重複コードを削除し、共通コンポーネント・スタイル・ユーティリティを使用