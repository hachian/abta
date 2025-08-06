# TASK-004: パフォーマンス最適化 - テストケース

## テスト戦略

### 1. 単体テスト
JavaScriptのパフォーマンス最適化機能をテスト

### 2. パフォーマンステスト
Chrome DevToolsを使用した実際のパフォーマンス測定

### 3. 統合テスト
実際のブラウザ環境での動作確認

## テストケース一覧

### TC-P001: スクロールイベント最適化テスト

**目的**: requestAnimationFrameが適切に使用されていることを確認

**前提条件**:
- ブログ記事ページが表示されている
- 目次が存在する
- 画面幅が768px以上

**テスト手順**:
1. Chrome DevToolsのPerformanceタブを開く
2. 記録を開始
3. 連続して10秒間スクロール操作を行う
4. 記録を停止
5. フレームレートとイベント処理を分析

**期待結果**:
- 平均フレームレート > 55fps
- ドロップフレーム率 < 5%
- 各スクロールイベント処理時間 < 16ms
- requestAnimationFrame使用の確認

**テストデータ**:
- 長い記事（5000文字以上）
- 目次項目数: 10個以上

---

### TC-P002: Passive Event Listener確認テスト

**目的**: イベントリスナーがpassive:trueで登録されていることを確認

**前提条件**:
- 開発者ツールでイベントリスナーを確認可能

**テスト手順**:
1. Chrome DevToolsのElementsタブを開く
2. windowオブジェクトを選択
3. Event Listenersタブを確認
4. scrollイベントリスナーの設定を確認

**期待結果**:
- scrollイベントリスナーでpassive: trueが設定されている
- resizeイベントリスナーでpassive: trueが設定されている
- touchstartイベントリスナーでpassive: trueが設定されている（該当する場合）

**検証方法**:
```javascript
// Console上で確認
getEventListeners(window).scroll.forEach(listener => {
    console.log('Passive:', listener.passive);
});
```

---

### TC-P003: メモリリーク検出テスト

**目的**: 長時間使用時にメモリリークが発生しないことを確認

**前提条件**:
- Chrome DevToolsのMemoryタブが使用可能
- ブログ記事ページが表示されている

**テスト手順**:
1. Chrome DevToolsのMemoryタブを開く
2. 初期状態のヒープスナップショットを作成
3. 10分間継続して以下の操作を繰り返す:
   - スクロール操作（上下）
   - 画面リサイズ
   - ページ内リンククリック
4. 操作後のヒープスナップショットを作成
5. メモリ使用量の変化を分析

**期待結果**:
- メモリ使用量の継続的増加がない（< 5MB増加）
- GCによる適切なメモリ解放の確認
- DOM要素の不要な保持がない

**監視項目**:
- JSヒープサイズ
- DOMノード数
- EventListener数

---

### TC-P004: タッチスクロール応答性テスト

**目的**: タッチデバイスでの応答性が向上していることを確認

**前提条件**:
- タッチ対応デバイス、またはChrome DevToolsのデバイスシミュレーション
- ブログ記事ページが表示されている

**テスト手順**:
1. Chrome DevToolsでタブレットデバイスをシミュレート
2. Performanceタブで記録開始
3. タッチスクロール操作を10秒間実行
4. 記録停止・分析

**期待結果**:
- タッチ開始から目次移動まで < 100ms
- スクロール中のジャンクなし
- 60fps近い滑らかな動作

**測定項目**:
- Input lag
- Frame rate
- Long tasks (> 50ms)

---

### TC-P005: リサイズ時パフォーマンステスト

**目的**: 画面リサイズ時の処理が最適化されていることを確認

**前提条件**:
- デスクトップブラウザ
- ブログ記事ページが表示されている

**テスト手順**:
1. Chrome DevToolsのPerformanceタブを開く
2. 記録開始
3. ブラウザウィンドウを連続して10回リサイズ
4. 記録停止・分析

**期待結果**:
- 各リサイズイベント処理時間 < 50ms
- レイアウトスラッシング（連続的な再計算）なし
- UI応答性の維持

---

### TC-P006: DOM要素キャッシュ効果テスト

**目的**: DOM要素のキャッシュ化により処理速度が向上していることを確認

**テスト手順**:
1. Performance.measureを使用してDOM検索時間を測定
2. 初回と2回目以降の処理時間を比較

**期待結果**:
- 2回目以降の処理時間が初回より短縮
- document.querySelectorの呼び出し回数減少

**測定コード例**:
```javascript
// 初回
performance.mark('dom-search-start');
const element = document.getElementById('toc-sidebar');
performance.mark('dom-search-end');
performance.measure('dom-search', 'dom-search-start', 'dom-search-end');

// キャッシュ後
performance.mark('cache-access-start');
const cachedElement = tocCache.sidebar;
performance.mark('cache-access-end');
performance.measure('cache-access', 'cache-access-start', 'cache-access-end');
```

---

### TC-P007: 既存機能への影響テスト

**目的**: パフォーマンス最適化が既存機能に悪影響を与えないことを確認

**テスト手順**:
1. 目次のスクロール追従機能が正常動作
2. 目次リンクのクリック動作が正常
3. アクティブセクションのハイライトが正常
4. モバイルでの固定表示が正常

**期待結果**:
- すべての既存機能が正常動作
- 機能の応答性向上または維持

---

## パフォーマンス測定基準

### フレームレート測定
```javascript
let frameCount = 0;
let startTime = performance.now();

function countFrames() {
    frameCount++;
    const currentTime = performance.now();
    if (currentTime - startTime >= 1000) {
        console.log('FPS:', frameCount);
        frameCount = 0;
        startTime = currentTime;
    }
    requestAnimationFrame(countFrames);
}
```

### イベント処理時間測定
```javascript
function measureEventHandling(eventName, handler) {
    return function(...args) {
        const start = performance.now();
        const result = handler.apply(this, args);
        const end = performance.now();
        console.log(`${eventName} processing time: ${end - start}ms`);
        return result;
    };
}
```

### メモリ使用量監視
```javascript
function logMemoryUsage() {
    if (performance.memory) {
        console.log({
            used: Math.round(performance.memory.usedJSHeapSize / 1048576),
            allocated: Math.round(performance.memory.totalJSHeapSize / 1048576),
            limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576)
        });
    }
}
```

## 自動化テストの実装

### Lighthouse CI設定
```json
{
  "ci": {
    "collect": {
      "url": ["http://localhost:4321/blog/markdown-style-guide-ja/"],
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.9}]
      }
    }
  }
}
```

### Jest Performance Tests
```javascript
describe('TOC Performance', () => {
  test('scroll event handling should be under 16ms', async () => {
    const start = performance.now();
    // Simulate scroll event handling
    const end = performance.now();
    expect(end - start).toBeLessThan(16);
  });

  test('should not leak memory after 100 scroll events', async () => {
    const initialMemory = performance.memory.usedJSHeapSize;
    // Simulate 100 scroll events
    const finalMemory = performance.memory.usedJSHeapSize;
    expect(finalMemory - initialMemory).toBeLessThan(5 * 1024 * 1024); // 5MB
  });
});
```

## テスト環境

### デスクトップ
- Chrome 120+
- Firefox 120+
- Safari 17+

### モバイル/タブレット
- iOS Safari (iPad)
- Chrome for Android
- Samsung Internet

### 測定ツール
- Chrome DevTools Performance
- Chrome DevTools Memory
- Lighthouse
- Web Vitals Extension