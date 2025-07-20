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

### 日本語最適化デザインシステム

#### 言語・ローカライゼーション設定
- **言語設定**: 全HTMLファイルで`lang="ja"`を使用
- **日付フォーマット**: ja-JP（YYYY/M/D形式）で統一
- **UI文言**: 日本語化済み（例：「最終更新:」等）

#### 日本語タイポグラフィ（`src/styles/global.css`）
- **フォントファミリー**: `'Noto Sans JP', 'Atkinson', 'Hiragino Kaku Gothic ProN', 'Yu Gothic', sans-serif`
- **Google Fonts**: Noto Sans JPを`src/components/BaseHead.astro`で読み込み
- **本文フォントサイズ**: `clamp(16px, 2.5vw, 18px)`（レスポンシブ）
- **行間**: 1.8（日本語最適化）
- **見出しサイズ**: h1(2em) → h2(1.8em) → h3(1.6em) → h4(1.4em) → h5(1.3em) → h6(1.2em)

#### 日本語UI最適化
- **イタリック回避**: `em`, `i`要素を下線表示（`text-decoration: underline`）に変更
- **太字強調**: `strong`, `b`要素にプライマリカラー適用
- **インラインコード**: ダーク背景（`--primary-dark`）・明るい文字（`--primary-background`）
- **コードブロック**: 90%サイズ（`0.9em`）
- **引用ブロック**: 95%サイズ（`0.95em`）・行間1.6

#### ブログ一覧ページ（`src/pages/blog/index.astro`）とタグページ（`src/pages/tags/[tag].astro`）
- CSS Gridを使用したカードベースのレスポンシブレイアウト
- **グリッド設定**: `repeat(auto-fill, minmax(350px, 1fr))`で左寄せ配置
- **カード一貫性**: ブログ一覧とタグページで完全に統一されたカードデザイン
- 全記事が統一されたカードサイズで表示
- ホバーエフェクト：カードの浮き上がりと画像のズーム効果
- タグデザイン：`var(--primary-dark)`を使用し、統一されたスタイル
- **タグページ特徴**: 
  - ページヘッダーにタグバッジ、タイトル、記事件数を表示
  - 「すべてのタグ」への戻りリンク
  - カード内にタグ表示（ブログ一覧と同様）

#### 色システム（`src/styles/global.css`）
- **必須**: 全ての色指定はOKLCH色空間のCSS変数を使用すること
- **利用可能な色変数**:
  - `--primary: oklch(45% 0.25 262)` - プライマリ色（青系）
  - `--primary-dark: oklch(25% 0.22 262)` - 濃いプライマリ色
  - `--primary-foreground: oklch(12% 0.02 262)` - 前景色（テキスト等）
  - `--primary-background: oklch(97% 0.01 262)` - 背景色（コンテンツ背景等）
- **シャドウ**: `--box-shadow`変数で統一されたドロップシャドウ
- **使用例**: `color: var(--primary-foreground)`, `background: var(--primary-background)`
- **OKLCH**: L（明度0-100%）、C（彩度）、H（色相角度）による知覚的に均一な色空間
- **設計思想**: プライマリ系色のみを使用したミニマルなカラーシステム

#### レスポンシブデザイン
- デスクトップ：auto-fillグリッドレイアウト（最小350px、左寄せ）
- モバイル（768px以下）：1カラムレイアウト
- 全デバイスで統一されたカードサイズ
- **グリッド左寄せ**: `justify-content: start`で2つのカードでも左から配置

#### ブログ記事ページ（`src/layouts/BlogPost.astro`）
- **レイアウト構造**:
  - Large（1280px以上）：3カラム（タグクラウド｜記事本文｜目次）
  - Middle（768px-1279px）：2カラム（記事本文｜目次）
  - Mobile（767px以下）：1カラム（記事本文のみ、目次は右下固定）
- **目次（TableOfContents）**:
  - デスクトップ・タブレット：画面上部32pxに固定でスクロール追従（`position: sticky`）
  - モバイル：右下32px位置に固定表示（`position: fixed`）、折りたたみ可能
  - H2とH3の階層構造を視覚的に表現（縦線と丸アイコン）
  - アクティブセクションのハイライト機能
- **タグクラウド（TagCloud）**:
  - Large：左サイドバーに表示
  - Middle以下：記事下部に表示

### コンテンツ管理

#### 日本語記事サンプル
- `src/content/blog/markdown-style-guide-ja/`: 日本語Markdownスタイルガイド
- 日本語記事作成時の参考として活用
- 見出し、段落、リスト、コード、引用等の記法例を提供

### 注意事項

- 現在テスト、リント、フォーマッター設定なし
- サイトURLは`https://example.com`のままなので変更が必要
- 画像最適化にSharpを使用
- **デザイン変更時は既存のCSS変数を使用し、新しい色は定義しない**
- **日本語サイトとして最適化済み - 言語設定やフォント変更時は注意**