---
title: 'Markdownスタイルガイド'
description: 'AstroでMarkdownコンテンツを書く際に使用できる基本的なMarkdown記法のサンプルです。'
pubDate: 'Jun 19 2025'
heroImage: './hero.jpg'
tags: ['markdown', 'ガイド', 'ドキュメント']
---

AstroでMarkdownコンテンツを書く際に使用できる基本的なMarkdown記法のサンプルです。

## 見出し

以下のHTML `<h1>`〜`<h6>` 要素は6つのレベルのセクション見出しを表します。`<h1>` が最高レベルのセクション、`<h6>` が最低レベルです。

# H1

## H2

### H3

#### H4

##### H5

###### H6

## 段落

これは段落のサンプルテキストです。Markdownでは段落間に空行を入れることで、段落を分けることができます。`インラインコード`、*イタリック*、**太字**などの文字装飾を使って、読みやすい文書を作成することができます。日本語でも同様に、複数行にわたる文章を自然に表示することができます。

段落の区切りは空行で表現され、連続する行は一つの段落として扱われます。これによって読みやすい文書を作成することができます。

## 画像

### 記法

```markdown
![代替テキスト](./full/or/relative/path/of/image)
```

### 出力

![ブログプレースホルダー](./about.jpg)

## 引用

blockquote要素は、他のソースから引用されたコンテンツを表します。オプションで引用元を`footer`や`cite`要素内に記載したり、注釈や略語などのインライン変更を含めることができます。

### 引用元なしの引用

#### 記法

```markdown
> これは引用文のサンプルです。  
> **注意**: 引用文の中でも _Markdown記法_ を使用することができます。
```

#### 出力

> これは引用文のサンプルです。  
> **注意**: 引用文の中でも _Markdown記法_ を使用することができます。

### 引用元ありの引用

#### 記法

```markdown
> メモリを共有することで通信するのではなく、通信することでメモリを共有せよ。<br>
> — <cite>Rob Pike[^1]</cite>
```

#### 出力

> メモリを共有することで通信するのではなく、通信することでメモリを共有せよ。<br>
> — <cite>Rob Pike[^1]</cite>

[^1]: 上記の引用は、Rob Pikeが2015年11月18日のGopherfestで行った[講演](https://www.youtube.com/watch?v=PAAkCSZUG1c)からの抜粋です。

## テーブル

### 記法

```markdown
| イタリック | 太字       | コード   |
| ---------- | ---------- | -------- |
| _イタリック_ | **太字** | `コード` |
```

### 出力

| イタリック | 太字       | コード   |
| ---------- | ---------- | -------- |
| _イタリック_ | **太字** | `コード` |

## コードブロック

### 記法

新しい行で3つのバッククォート ``` を使用してコードスニペットを書き、新しい行で3つのバッククォートで閉じます。言語固有のシンタックスハイライトを適用するには、最初の3つのバッククォートの後に言語名を一語で書きます（例：html、javascript、css、markdown、typescript、txt、bash）。

````markdown
```html
<!doctype html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <title>HTML5ドキュメントの例</title>
  </head>
  <body>
    <p>テスト</p>
  </body>
</html>
```
````

### 出力

```html
<!doctype html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <title>HTML5ドキュメントの例</title>
  </head>
  <body>
    <p>テスト</p>
  </body>
</html>
```

## リストの種類

### 順序付きリスト

#### 記法

```markdown
1. 最初の項目
2. 2番目の項目
3. 3番目の項目
```

#### 出力

1. 最初の項目
2. 2番目の項目
3. 3番目の項目

### 順序なしリスト

#### 記法

```markdown
- リスト項目
- 別の項目
- さらに別の項目
```

#### 出力

- リスト項目
- 別の項目
- さらに別の項目

### ネストしたリスト

#### 記法

```markdown
- 果物
  - りんご
  - オレンジ
  - バナナ
- 乳製品
  - 牛乳
  - チーズ
```

#### 出力

- 果物
  - りんご
  - オレンジ
  - バナナ
- 乳製品
  - 牛乳
  - チーズ

## その他の要素 — abbr、sub、sup、kbd、mark

### 記法

```markdown
<abbr title="Graphics Interchange Format">GIF</abbr>はビットマップ画像形式です。

H<sub>2</sub>O

X<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup>

<kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>Delete</kbd> を押してセッションを終了します。

ほとんどの<mark>サラマンダー</mark>は夜行性で、昆虫や虫、その他の小さな生き物を狩ります。
```

### 出力

<abbr title="Graphics Interchange Format">GIF</abbr>はビットマップ画像形式です。

H<sub>2</sub>O

X<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup>

<kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>Delete</kbd> を押してセッションを終了します。

ほとんどの<mark>サラマンダー</mark>は夜行性で、昆虫や虫、その他の小さな生き物を狩ります。
