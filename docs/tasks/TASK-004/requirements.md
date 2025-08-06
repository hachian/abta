# TASK-004: パフォーマンス最適化 - 要件定義

## 目的
目次スクロール追従機能のパフォーマンスを最適化し、特にタッチデバイスでのスムーズな動作を実現する。

## 機能要件

### 1. スクロールイベント最適化
- **REQ-P001**: スクロールイベントのスロットリング実装
- **REQ-P002**: requestAnimationFrameの最適な使用
- **REQ-P003**: 不要な再計算の防止

### 2. Passive Listener対応
- **REQ-P004**: スクロールイベントにpassive: trueを適用
- **REQ-P005**: タッチイベントにpassive: trueを適用
- **REQ-P006**: ブラウザのデフォルト動作をブロックしない

### 3. メモリ管理
- **REQ-P007**: イベントリスナーの適切なクリーンアップ
- **REQ-P008**: DOMクエリの最小化とキャッシュ化
- **REQ-P009**: 不要な変数の解放

## 非機能要件

### パフォーマンス要件
- **NFR-P001**: スクロール時60fps維持
- **NFR-P002**: スクロールイベント処理時間 < 16ms
- **NFR-P003**: メモリ使用量の増加 < 5MB

### レスポンシブ要件
- **NFR-P004**: タッチスクロール開始から追従まで < 100ms
- **NFR-P005**: 画面サイズ変更時の再計算 < 50ms
- **NFR-P006**: 初期化時間 < 200ms

### 互換性要件
- **NFR-P007**: iOS Safari 14+で正常動作
- **NFR-P008**: Chrome for Android 90+で正常動作
- **NFR-P009**: 既存のデスクトップブラウザで性能劣化なし

## 技術仕様

### 1. スクロールイベント最適化
```javascript
// Before: 直接的なスクロールイベント処理
window.addEventListener('scroll', updateTocPosition);

// After: 最適化されたスクロールイベント処理
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            updateTocPosition();
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });
```

### 2. DOM要素のキャッシュ化
```javascript
// 初期化時にDOM要素をキャッシュ
const tocCache = {
    sidebar: document.getElementById('toc-sidebar'),
    article: document.querySelector('.main-article'),
    prose: document.querySelector('.prose')
};
```

### 3. 計算の最適化
```javascript
// 変更があった場合のみ再計算
let lastViewportWidth = window.innerWidth;
function updateTocPosition() {
    const currentWidth = window.innerWidth;
    if (currentWidth !== lastViewportWidth) {
        // リサイズ時の処理
        updateArticlePosition();
        lastViewportWidth = currentWidth;
    }
    // 通常の位置更新
    updateTocTop();
}
```

## テスト要件

### パフォーマンステスト
1. **フレームレート測定**
   - Chrome DevToolsのPerformanceタブで計測
   - 連続スクロール時の平均fps > 55fps
   - フレーム dropped rate < 5%

2. **メモリ使用量監視**
   - 10分間の連続操作でメモリリーク検出
   - メモリ使用量の継続的増加がないこと
   - GCによる適切なメモリ解放の確認

3. **レスポンス時間測定**
   - スクロール開始から目次移動まで < 100ms
   - タッチ開始から応答まで < 50ms

## 受け入れ基準

### 機能面
- [ ] すべてのデバイスでスムーズなスクロール追従
- [ ] タッチデバイスでの遅延なし操作
- [ ] 長時間使用時のパフォーマンス劣化なし

### 技術面
- [ ] Passive event listenersの適用完了
- [ ] RequestAnimationFrameの適切な実装
- [ ] メモリリークの解消

### 品質面
- [ ] Lighthouse Performance Score > 90
- [ ] Chrome DevToolsで警告表示なし
- [ ] 既存機能への影響なし

## 実装の制約

1. **既存コードとの互換性**
   - 既存のCSS・HTMLに変更を加えない
   - 既存のJavaScript APIを維持

2. **ブラウザサポート**
   - モダンブラウザのみサポート（IE非対応）
   - Progressive Enhancementの考慮

3. **バンドルサイズ**
   - JavaScriptコードの増加量 < 2KB

## 成功指標

1. **定量的指標**
   - Page Speed Insights Performance Score: 95+ → 95+維持
   - Lighthouse Performance Score: 90+ → 95+
   - スクロール時FPS: 45-50fps → 55-60fps

2. **定性的指標**
   - ユーザーの体感的なスムーズさ向上
   - タッチデバイスでのストレスフリーな操作
   - 長時間使用時の安定性