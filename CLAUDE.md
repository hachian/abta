# CLAUDE.md

日本語ブログ向けAstroテンプレート（ABTA）の開発ガイド

## 開発コマンド

- `npm run dev` - 開発サーバー起動（localhost:4321）
- `npm run build` - 本番ビルド
- `npm run preview` - ビルド済みサイトプレビュー

## アーキテクチャ

### 構造
- **Content**: `src/content/blog/` - フォルダベース記事管理
- **Pages**: `src/pages/` - ファイルベースルーティング
- **Components**: `src/components/` - 再利用可能コンポーネント
- **Styles**: `src/styles/` - CSS変数ベーススタイル
- **Utils**: `src/utils/` - ユーティリティ関数

### 主要コンポーネント
- `Header.astro` - ナビゲーション（レスポンシブ対応）
- `BlogCard.astro` - 記事カード表示
- `SocialLinks.astro` - ソーシャルリンク
- `Lightbox.astro` - 画像拡大機能

### 設定ファイル
- `src/consts.ts` - サイト定数・機能フラグ
- `config.json` - サイト設定（タイトル、テーマ、ソーシャルリンク等）
- `src/content/config.ts` - Content Collectionsスキーマ

## デザインシステム

### 色システム
OKLCH色空間のCSS変数を使用：
- `--primary` - メインカラー
- `--primary-dark` - 濃色
- `--primary-foreground` - テキスト色
- `--primary-background` - 背景色

**重要**: 新しい色は定義せず、既存CSS変数を使用すること

### 日本語最適化
- フォント: Noto Sans JP優先
- 行間: 1.8（日本語読みやすさ重視）
- UI文言: 完全日本語化
- レスポンシブ: モバイル768px以下対応

## 機能制御

`src/consts.ts`の`FEATURES`で機能ON/OFF：
- `TAGS_ENABLED` - タグ機能
- `ARCHIVE_ENABLED` - アーカイブ機能

## 設定カスタマイズ

`config.json`で以下を設定可能：
- サイト基本情報（タイトル、説明、著者）
- テーマカラー（`primaryHue`: 0-360）
- ソーシャルリンク（8プラットフォーム対応）
- アナリティクス設定
- サイドバー表示数制限

## 実装済み機能

- **ライトボックス**: 画像クリック拡大表示
- **レスポンシブヘッダー**: ホバー効果付きナビゲーション
- **タグ・アーカイブ**: 記事分類・時系列表示
- **SEO最適化**: 構造化データ、OGP対応
- **RSS配信**: 自動生成

## 注意事項

- テスト・リント設定なし
- 既存コンポーネント・スタイル・ユーティリティを優先使用
- `config.json`変更後は開発サーバー再起動必要
- 日本語最適化済み - 言語・フォント変更時は注意