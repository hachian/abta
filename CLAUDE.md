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
- TypeScript厳密モードが有効

### 設定ファイル

- `src/consts.ts` - サイト全体の定数と機能フラグ
- `astro.config.mjs` - サイトURL、統合設定（MDX、サイトマップ）
- `src/content/config.ts` - Content Collectionsスキーマ

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

## 注意事項

- 現在テスト、リント、フォーマッター設定なし
- サイトURLは`https://example.com`のままなので変更が必要
- 画像最適化にSharpを使用
- **デザイン変更時は既存のCSS変数を使用し、新しい色は定義しない**
- **日本語サイトとして最適化済み - 言語設定やフォント変更時は注意**
- **コンポーネント化済み** - 再利用可能な共通コンポーネントを活用
- **機能フラグ対応済み** - タグとアーカイブ機能を個別に制御可能