# ABTA - Astro Blog Tags Archive

日本語ブログ執筆者のために最適化された、シンプルで高機能なAstroブログテンプレートです。

## 🌟 特徴

- ✅ **日本語最適化** - Noto Sans JPフォントと読みやすい行間設定
- ✅ **タグ機能** - 記事をタグで分類・検索
- ✅ **時系列アーカイブ** - 月別・年別の記事一覧
- ✅ **高速な静的サイト生成** - Astro 5.0採用
- ✅ **レスポンシブデザイン** - モバイル・タブレット・デスクトップ対応
- ✅ **OKLCH色空間** - 統一感のあるデザインシステム
- ✅ **SEO対応** - メタデータとOGP設定
- ✅ **RSS配信** - 自動生成されるRSSフィード
- ✅ **Markdown/MDX対応** - 簡単な記事作成

## 🚀 クイックスタート

### 必要な環境

- Node.js 18.17.1以上
- npm または yarn

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/yourusername/abta.git
cd abta

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

開発サーバーは `http://localhost:4321` で起動します。

## 📝 使い方

### 記事の作成

1. `src/content/blog/` ディレクトリに新しいフォルダを作成
2. フォルダ内に `index.md` または `index.mdx` ファイルを作成
3. フロントマターを設定して記事を書く

```markdown
---
title: '記事のタイトル'
description: '記事の説明文'
pubDate: '2025-01-15'
updatedDate: '2025-01-16' # オプション
heroImage: './hero-image.jpg' # オプション
tags: ['タグ1', 'タグ2']
---

記事の本文をここに書きます。
```

### コマンド一覧

| コマンド | 説明 |
|---------|------|
| `npm run dev` | 開発サーバーを起動 |
| `npm run build` | 本番用ビルドを作成 |
| `npm run preview` | ビルド結果をプレビュー |
| `npm run astro` | Astro CLIコマンドを実行 |

## 🎨 カスタマイズ

### サイト情報の変更

`src/consts.ts` でサイトのタイトルと説明を設定：

```typescript
export const SITE_TITLE = 'あなたのブログタイトル';
export const SITE_DESCRIPTION = 'あなたのブログの説明';
```

### カラーテーマ

`src/styles/global.css` でOKLCH色空間を使用したカラー変数を調整：

```css
:root {
  --primary: oklch(45% 0.25 262);
  --primary-dark: oklch(25% 0.22 262);
  --primary-light: oklch(65% 0.20 262);
  --primary-foreground: oklch(12% 0.02 262);
  --primary-background: oklch(97% 0.01 262);
}
```

### ソーシャルリンク

`src/components/Header.astro` と `src/components/Footer.astro` でソーシャルメディアのリンクを更新できます。

## 📂 プロジェクト構造

```
/
├── public/           # 静的ファイル
├── src/
│   ├── components/   # Astroコンポーネント
│   ├── content/      # ブログ記事
│   │   └── blog/     # 各記事のフォルダ
│   ├── layouts/      # レイアウトテンプレート
│   ├── pages/        # ルーティングページ
│   │   ├── archive/  # アーカイブページ
│   │   ├── blog/     # ブログ一覧・詳細
│   │   └── tags/     # タグページ
│   └── styles/       # グローバルスタイル
├── astro.config.mjs  # Astro設定
├── package.json
└── tsconfig.json
```

## 🤝 貢献

プルリクエストや Issue の作成を歓迎します！

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。詳細は [LICENSE](LICENSE) ファイルを参照してください。

## 🙏 謝辞

このテンプレートは [Astro](https://astro.build/) の公式ブログテンプレートをベースに、日本語ブログ用に最適化したものです。