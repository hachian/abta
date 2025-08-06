# TASK-006: エラー処理とフォールバック - テストケース

## 1. テストカテゴリ

### 1.1 テスト分類
- **単体テスト**: 個別関数のエラー処理
- **統合テスト**: 複数コンポーネント間のエラー処理
- **エンドツーエンドテスト**: 実際のユーザー操作でのエラー処理
- **負荷テスト**: エラー処理のパフォーマンス影響

## 2. DOM要素エラー処理 テストケース

### TC-601: 必須DOM要素未検出テスト

#### 目的
必要なDOM要素が存在しない場合の適切なエラー処理を確認する。

#### 前提条件
- 目次機能を持つページが読み込まれている
- DOM操作が可能な状態

#### テスト手順と期待結果

| Test Case ID | 条件 | 期待される動作 | 検証項目 |
|--------------|------|----------------|-----------|
| TC-601-1 | `#toc-sidebar`要素がない | 目次機能が無効化される | JSエラーなし、コンソール警告あり |
| TC-601-2 | `.main-article`要素がない | 目次機能が無効化される | JSエラーなし、フォールバック実行 |
| TC-601-3 | `.prose`要素がない | 目次機能が無効化される | JSエラーなし、安全な終了 |
| TC-601-4 | 見出し要素がない | 目次が表示されない | JSエラーなし、早期リターン |

#### 検証コード例
```javascript
// テスト用のDOM要素削除
document.getElementById('toc-sidebar').remove();

// 初期化実行
try {
    initScrollFollowing();
    console.log('✅ エラー処理成功: DOM要素なし');
} catch (error) {
    console.error('❌ 未処理エラー:', error);
}
```

### TC-602: 動的DOM要素対応テスト

#### 目的
DOM要素が後から追加される場合の処理を確認する。

#### テストシナリオ
1. 初期状態では必須要素が存在しない
2. 1秒後に必須要素が動的に追加される
3. 目次機能が適切に初期化されることを確認

#### 期待結果
- [ ] MutationObserverまたはリトライ機構が動作する
- [ ] 動的要素追加後に目次機能が有効化される
- [ ] パフォーマンスに大きな影響がない

### TC-603: DOM要素消失テスト

#### 目的
実行中にDOM要素が削除された場合の処理を確認する。

#### テスト手順
1. 目次機能を正常に初期化
2. スクロール中に`#toc-sidebar`を削除
3. エラーが発生せずに適切にクリーンアップされることを確認

#### 期待結果
- [ ] JavaScriptエラーが発生しない
- [ ] イベントリスナーが適切にクリーンアップされる
- [ ] メモリリークが発生しない

## 3. 記事コンテンツ エラー処理テスト

### TC-604: 短い記事処理テスト

#### 目的
記事本文が非常に短い場合の適切な処理を確認する。

#### テストケース
| 記事の高さ | ビューポート比 | 期待動作 |
|------------|----------------|----------|
| 200px | < 30% | 目次固定表示 |
| 400px | 30-50% | 目次固定表示 |
| 600px | > 50% | スクロール追従 |

#### 検証項目
- [ ] 短い記事では目次がスクロール追従しない
- [ ] 適切なしきい値で動作が切り替わる
- [ ] ビューポートサイズ変更時に再計算される

### TC-605: 見出しなし記事テスト

#### 目的
見出しが存在しない記事での処理を確認する。

#### テスト条件
```html
<article class="main-article">
    <div class="prose">
        <p>見出しのないテキストコンテンツ</p>
        <p>追加のコンテンツ</p>
    </div>
</article>
```

#### 期待結果
- [ ] 目次コンポーネントが表示されない
- [ ] スクロール追従JavaScript が実行されない
- [ ] ページ表示に影響がない

### TC-606: 記事本文なしテスト

#### 目的
記事構造が不完全な場合の処理を確認する。

#### テストパターン
1. `.main-article`要素のみ存在
2. `.prose`要素のみ存在  
3. 両方とも存在しない

#### 期待結果
- [ ] 各パターンで安全に処理が終了する
- [ ] エラーメッセージが適切に出力される
- [ ] 他の機能に影響しない

## 4. 目次表示 エラー処理テスト

### TC-607: 長い目次処理テスト

#### 目的
目次が画面高さを超える場合の処理を確認する。

#### テスト条件
- 見出し数: 50個以上
- 目次の推定高さ: ビューポート高さの150%以上

#### 検証項目
- [ ] 目次内でスクロールが可能
- [ ] 現在のセクションが視認可能な位置に表示
- [ ] 目次のスクロールがページスクロールに干渉しない
- [ ] モバイルデバイスでも正常に動作

#### スクロールテストケース
| スクロール位置 | 目次内表示項目 | 期待動作 |
|----------------|----------------|----------|
| ページ上部 | 最初の見出し群 | 最初の項目がハイライト |
| ページ中間 | 中間の見出し群 | 該当項目が視認範囲内 |
| ページ下部 | 最後の見出し群 | 最後の項目がハイライト |

### TC-608: 動的見出し変更テスト

#### 目的
ページ読み込み後の見出し動的変更への対応を確認する。

#### テストシナリオ
1. 初期状態: H2見出し3個
2. 2秒後: 新しいH2見出しを追加
3. 4秒後: 既存のH3見出しを削除
4. 6秒後: 見出しテキストを変更

#### 期待結果
- [ ] 新しい見出しが目次に追加される
- [ ] 削除された見出しが目次から削除される
- [ ] 見出しテキスト変更が目次に反映される
- [ ] アクティブハイライトが正常に動作する

### TC-609: 位置計算エラーテスト

#### 目的
目次位置計算でのエラー処理を確認する。

#### エラー条件の作成
```javascript
// getBoundingClientRect() のモック化
Element.prototype.getBoundingClientRect = function() {
    throw new Error('Test error');
};
```

#### 期待結果
- [ ] エラーが適切にキャッチされる
- [ ] デフォルト位置にフォールバックする
- [ ] 目次が表示される（固定位置）
- [ ] ユーザー操作に影響しない

## 5. 初期化エラー処理テスト

### TC-610: ページ読み込み不完了テスト

#### 目的
DOM要素が準備できていない状態での初期化処理を確認する。

#### テストシナリオ
1. DOMContentLoaded前にスクリプト実行
2. 必要な要素が段階的に追加される状況
3. 非同期リソース読み込み中の初期化

#### リトライ機構テスト
```javascript
// テスト用の遅延DOM追加
setTimeout(() => {
    document.body.innerHTML += '<div id="toc-sidebar">...</div>';
}, 2000);

// 初期化とリトライ確認
initScrollFollowingWithRetry();
```

#### 期待結果
- [ ] 初回失敗後にリトライが実行される
- [ ] 最大リトライ回数後に適切に終了する
- [ ] リトライ間隔が適切に設定される

### TC-611: 重複初期化防止テスト

#### 目的
目次機能の複数回初期化を防止できることを確認する。

#### テスト手順
```javascript
// 複数回初期化を実行
initScrollFollowing();
initScrollFollowing();
initScrollFollowing();

// 結果確認
const eventListeners = getEventListeners(window);
const scrollListeners = eventListeners.scroll.length;
```

#### 期待結果
- [ ] イベントリスナーが重複登録されない
- [ ] メモリ使用量が増加しない
- [ ] 2回目以降は早期リターンする

### TC-612: メモリリーク防止テスト

#### 目的
ページ破棄時の適切なクリーンアップを確認する。

#### テスト環境
- ブラウザの開発者ツール（Memory タブ）
- 複数回のページ遷移

#### 検証項目
- [ ] `window.removeEventListener`が呼ばれる
- [ ] タイマーが適切にクリアされる
- [ ] DOM参照が適切に解放される
- [ ] メモリ使用量が安定している

#### メモリリークチェック
```javascript
// ページ離脱前のクリーンアップ確認
window.addEventListener('beforeunload', () => {
    console.log('クリーンアップ実行確認');
    // クリーンアップ関数の呼び出し確認
});
```

## 6. 統合エラー処理テスト

### TC-613: 複合エラー状況テスト

#### 目的
複数のエラー条件が同時に発生した場合の処理を確認する。

#### エラー組み合わせパターン
| パターン | 条件1 | 条件2 | 条件3 | 期待動作 |
|----------|-------|-------|-------|----------|
| A | DOM要素なし | 短い記事 | 見出しなし | 完全無効化 |
| B | 位置計算エラー | 長い目次 | 画面回転 | フォールバック表示 |
| C | メモリ不足 | 動的要素変更 | ネットワーク遅延 | グレースフル縮退 |

#### 期待結果
- [ ] 最も安全な動作モードにフォールバックする
- [ ] ユーザーエクスペリエンスが大きく損なわれない
- [ ] 適切なエラーログが出力される

### TC-614: パフォーマンス影響テスト

#### 目的
エラー処理機能によるパフォーマンス影響を測定する。

#### 測定項目
| 指標 | 通常時 | エラー処理有効時 | 許容値 |
|------|--------|------------------|--------|
| 初期化時間 | 基準値 | +5%以下 | 100ms以下 |
| スクロール応答 | 基準値 | +5%以下 | 16ms以下 |
| メモリ使用 | 基準値 | +500KB以下 | 2MB以下 |

#### パフォーマンステスト実行
```javascript
// パフォーマンス測定
performance.mark('toc-init-start');
initScrollFollowingWithErrorHandling();
performance.mark('toc-init-end');

const measure = performance.measure('toc-init', 'toc-init-start', 'toc-init-end');
console.log('初期化時間:', measure.duration, 'ms');
```

### TC-615: ブラウザ互換性テスト

#### 目的
各ブラウザでのエラー処理の一貫性を確認する。

#### 対象ブラウザ
- **Desktop**: Chrome 100+, Firefox 100+, Safari 15+, Edge 100+
- **Mobile**: Chrome Mobile, Safari iOS, Samsung Internet

#### ブラウザ固有エラー
- Internet Explorer: Promise未対応
- Safari: 一部のDOM API制限
- Mobile Chrome: メモリ制限

#### 期待結果
- [ ] 全ブラウザで基本機能が動作する
- [ ] ブラウザ固有エラーが適切に処理される
- [ ] フォールバック機能が一貫している

## 7. エッジケース テスト

### TC-616: 極限状況テスト

#### 7.1 超大量見出しテスト
- 見出し数: 1000個以上
- 期待: パフォーマンス低下なしでの処理

#### 7.2 深いネスト構造テスト
```html
<div style="position: relative;">
  <div style="position: relative;">
    <!-- 50レベルの深いネスト -->
    <article class="main-article">
      <div class="prose">...</div>
    </article>
  </div>
</div>
```

#### 7.3 CSSトランスフォームテスト
```css
.main-article {
    transform: translateX(100px) scale(0.8) rotate(5deg);
}
```

#### 期待結果
- [ ] 極限状況でも目次機能が動作する
- [ ] 位置計算が正確に行われる
- [ ] メモリ使用量が制御されている

### TC-617: セキュリティ関連テスト

#### 7.1 XSS攻撃耐性
```javascript
// 悪意のあるスクリプト注入テスト
const maliciousHeading = '<h2>Normal <script>alert("XSS")</script> Heading</h2>';
```

#### 7.2 DOM改ざん耐性
```javascript
// DOM構造の予期しない変更
document.querySelector('.toc-link').onclick = function() {
    document.body.innerHTML = '<h1>Hacked!</h1>';
};
```

#### 期待結果
- [ ] スクリプト注入が無効化される
- [ ] DOM改ざんでクラッシュしない
- [ ] セキュリティログが出力される

## 8. 自動テスト実装

### 8.1 単体テスト（Jest）
```javascript
describe('TOC Error Handling', () => {
    test('should handle missing DOM elements', () => {
        document.body.innerHTML = '<div></div>'; // 要素なし
        expect(() => initScrollFollowing()).not.toThrow();
    });
    
    test('should fallback on position calculation error', () => {
        // モック化でエラー発生
        Element.prototype.getBoundingClientRect = jest.fn(() => {
            throw new Error('Test error');
        });
        
        expect(() => updateTocPosition()).not.toThrow();
    });
});
```

### 8.2 E2Eテスト（Playwright）
```javascript
test('error handling with dynamic content', async ({ page }) => {
    await page.goto('/blog/test-article');
    
    // DOM要素を動的に削除
    await page.evaluate(() => {
        document.getElementById('toc-sidebar').remove();
    });
    
    // スクロールしてもエラーが発生しないことを確認
    await page.mouse.wheel(0, 500);
    
    const errors = await page.evaluate(() => window.errors || []);
    expect(errors).toHaveLength(0);
});
```

### 8.3 パフォーマンステスト
```javascript
test('error handling performance impact', async ({ page }) => {
    await page.goto('/blog/long-article');
    
    const baseline = await page.evaluate(() => {
        performance.mark('start');
        // 通常の処理
        performance.mark('end');
        return performance.measure('normal', 'start', 'end').duration;
    });
    
    const withErrorHandling = await page.evaluate(() => {
        performance.mark('start');
        // エラー処理を含む処理
        performance.mark('end');
        return performance.measure('with-error', 'start', 'end').duration;
    });
    
    const overhead = (withErrorHandling - baseline) / baseline;
    expect(overhead).toBeLessThan(0.05); // 5%以下
});
```

## 9. 手動テストチェックリスト

### 9.1 DOM要素エラー
- [ ] toc-sidebar要素削除時のエラー処理
- [ ] main-article要素削除時のエラー処理
- [ ] prose要素削除時のエラー処理
- [ ] 見出し要素なし時の処理

### 9.2 コンテンツエラー
- [ ] 極端に短い記事での動作
- [ ] 極端に長い記事での動作
- [ ] 見出しなし記事での動作
- [ ] 画像のみ記事での動作

### 9.3 表示エラー
- [ ] 長い目次のスクロール
- [ ] 画面サイズ変更時の動作
- [ ] 画面回転時の動作
- [ ] ズーム時の動作

### 9.4 初期化エラー
- [ ] ページ読み込み中の初期化
- [ ] 複数回初期化の防止
- [ ] メモリリークの確認
- [ ] クリーンアップの確認

### 9.5 パフォーマンス
- [ ] エラー処理有効時の応答速度
- [ ] メモリ使用量の確認
- [ ] CPU使用率の確認
- [ ] バッテリー消費の確認（モバイル）

## 10. 合格基準

### 必須要件
- JavaScript エラー発生率: 0%
- 基本機能の動作率: 100%
- エラー処理カバレッジ: 90%以上

### 推奨要件
- パフォーマンス影響: 5%以下
- メモリ使用量増加: 500KB以下
- ユーザビリティ保持: エラー時でも記事閲覧可能

### 検証完了チェック
- [ ] すべての単体テストが通過
- [ ] すべてのE2Eテストが通過
- [ ] 手動テストチェックリストが完了
- [ ] パフォーマンステストが合格基準を満たす
- [ ] セキュリティテストで問題なし