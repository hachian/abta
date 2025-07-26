# ABTA - Astro Blog Tags Archive

日本語ブログ執筆者のために最適化された、シンプルで高機能なAstroブログテンプレートです。

## 🌟 特徴

- ✅ **日本語最適化** - Noto Sans JPフォントと読みやすい行間設定
- ✅ **軽量設計** - Astro公式パッケージのみ使用、外部フレームワーク不要
- ✅ **タグ機能** - 記事をタグで分類・検索
- ✅ **時系列アーカイブ** - 月別・年別の記事一覧
- ✅ **目次機能** - 記事の自動目次生成とスクロール追従
- ✅ **機能フラグ** - タグ・アーカイブ機能を個別にオン/オフ制御
- ✅ **高速な静的サイト生成** - Astro 5採用
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
# リポジトリをクローン（あなたのユーザー名に変更してください）
git clone https://github.com/hachian/abta.git
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

### 機能の詳細

#### 目次機能

- H2、H3見出しから自動で目次を生成
- デスクトップ・タブレット：画面上部に固定でスクロール追従
- モバイル：右下に折りたたみ可能な目次を表示

#### アーカイブ機能

- 月別・年別で記事を自動分類
- `/archive/monthly/` - 月別一覧ページ
- `/archive/yearly/` - 年別一覧ページ
- 個別の月・年ページも自動生成

#### タグ機能

- 記事のフロントマターで `tags: ['タグ1', 'タグ2']` を設定
- `/tags/` - 全タグ一覧ページ
- `/tags/タグ名` - 個別タグページ

### コマンド一覧

| コマンド | 説明 |
|---------|------|
| `npm run dev` | 開発サーバーを起動 |
| `npm run build` | 本番用ビルドを作成 |
| `npm run preview` | ビルド結果をプレビュー |
| `npm run astro` | Astro CLIコマンドを実行 |

## 🎨 カスタマイズ

### 基本設定（必須）

#### 1. サイトURL設定

`astro.config.mjs` でサイトのURLを設定（サイトマップ生成に必要）：

**GitHub Pagesを使用する場合：**
```javascript
export default defineConfig({
  site: 'https://hachian.github.io/abta', // GitHubユーザー名とリポジトリ名に変更
  integrations: [mdx(), sitemap()],
});
```

**独自ドメインを使用する場合：**
```javascript
export default defineConfig({
  site: 'https://yourdomain.com', // あなたのドメインに変更
  integrations: [mdx(), sitemap()],
});
```

#### 2. サイト基本情報

`config.json` でサイトの基本情報を設定：

```json
{
  "site": {
    "title": "あなたのブログタイトル",
    "description": "あなたのブログの説明文",
    "author": "あなたの名前"
  }
}
```

> **設定の仕組み**: 全ての設定は`config.json`で管理され、`src/consts.ts`が自動的に読み込みます。ユーザーは`config.json`のみを編集してください。

### その他の設定

#### カラーテーマ

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

#### 機能フラグの設定

`src/consts.ts` でタグ機能とアーカイブ機能を個別にオン/オフ制御：

```typescript
export const FEATURES = {
  TAGS_ENABLED: true,    // タグ機能の有効/無効
  ARCHIVE_ENABLED: true, // アーカイブ機能の有効/無効
};
```

#### ブログ画像設定

`src/consts.ts` でヒーロー画像のサイズを設定：

```typescript
export const BLOG_IMAGE_WIDTH = 720;  // px
export const BLOG_IMAGE_HEIGHT = 360; // px
```

#### ソーシャルリンク設定

`config.json` でソーシャルメディアのリンクを設定：

```json
{
  "socialLinks": {
    "twitter": {
      "url": "https://twitter.com/your-username",
      "enabled": true
    },
    "github": {
      "url": "https://github.com/your-username",
      "enabled": true
    }
  }
}
```

#### Google Analytics設定

`config.json` でGoogle Analyticsを設定：

```json
{
  "analytics": {
    "googleAnalyticsId": "G-XXXXXXXXXX",
    "enabled": true
  }
}
```

#### robots.txt更新

`public/robots.txt` のサイトマップURLを変更：

**GitHub Pagesの場合：**
```txt
Sitemap: https://hachian.github.io/abta/sitemap-index.xml
```

**独自ドメインの場合：**
```txt
Sitemap: https://yourdomain.com/sitemap-index.xml
```

## 🚀 デプロイ

### GitHub Pagesへのデプロイ

1. **GitHub Actionsワークフローを設定**

`.github/workflows/deploy.yml` を作成：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

2. **GitHubリポジトリでPagesを有効化**
   - Settings → Pages → Source を "GitHub Actions" に設定

3. **mainブランチにプッシュ**すると自動デプロイされます

## 📂 プロジェクト構造

```text
/
├── public/           # 静的ファイル
├── src/
│   ├── components/   # Astroコンポーネント
│   │   ├── BlogCard.astro      # 記事カード表示
│   │   ├── BlogCardGrid.astro  # カードグリッドレイアウト
│   │   ├── TableOfContents.astro # 目次機能
│   │   ├── TagCloud.astro      # タグクラウド・アーカイブリンク
│   │   └── SocialLinks.astro   # ソーシャルリンク
│   ├── content/      # ブログ記事
│   │   └── blog/     # 各記事のフォルダ
│   ├── layouts/      # レイアウトテンプレート
│   ├── pages/        # ルーティングページ
│   │   ├── archive/  # 月別・年別アーカイブページ
│   │   ├── blog/     # ブログ一覧・詳細
│   │   └── tags/     # タグページ
│   ├── styles/       # グローバルスタイル
│   └── consts.ts     # サイト設定・機能フラグ
├── astro.config.mjs  # Astro設定
├── config.json       # 設定ファイル
├── package.json
└── tsconfig.json
```

## 🪶 軽量設計

ABTAは**最小限の依存関係**で最大限の機能を実現します：

### 依存関係（わずか5パッケージ）

```json
{
  "dependencies": {
    "astro": "^5.11.1",           // メインフレームワーク
    "@astrojs/mdx": "^4.3.0",     // MDXサポート
    "@astrojs/rss": "^4.0.12",    // RSSフィード生成
    "@astrojs/sitemap": "^3.4.1", // サイトマップ生成
    "sharp": "^0.34.2"            // 画像最適化
  }
}
```

### 軽量性の利点

- **⚡ 高速な起動**: 外部フレームワーク不要により瞬時に開発サーバーが起動
- **📦 小さなバンドルサイズ**: 必要最小限のJavaScriptのみ
- **🔧 シンプルな保守**: 複雑な依存関係の競合やアップデートの心配なし
- **🚀 高速なビルド**: 静的ファイル生成により超高速なサイト表示
- **💾 省メモリ**: 開発・本番ともにメモリ使用量を最小限に抑制

### 比較：一般的なブログテンプレート

| 項目 | ABTA | React/Next.js系 | Vue/Nuxt.js系 |
|------|------|----------------|---------------|
| 依存関係数 | **5個** | 50-100個 | 40-80個 |
| 初回ビルド時間 | **数秒** | 数分 | 数分 |
| JavaScript バンドル | **最小限** | 大容量 | 中〜大容量 |
| Lighthouseスコア | **100点** | 80-95点 | 85-95点 |

ABTAは**「シンプルこそ最強」**の哲学で設計されています。

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

このテンプレートは [Astro](https://astro.build/) の公式ブログテンプレートをベースに、[Claude Code](https://claude.ai/code) を活用して日本語ブログ用に最適化・開発されました。AI支援により効率的な開発とコードの品質向上を実現しています。