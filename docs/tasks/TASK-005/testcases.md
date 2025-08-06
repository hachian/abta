# TASK-005: デバイス固有の問題対応 - テストケース

## 1. テストカテゴリ

### 1.1 テスト分類
- **機能テスト**: デバイス固有機能の動作確認
- **互換性テスト**: 各デバイス・ブラウザでの動作確認
- **パフォーマンステスト**: デバイス固有処理の負荷測定
- **ユーザビリティテスト**: 実際の使用シナリオでの検証

## 2. iPad Split View テストケース

### TC-501: Split View検出テスト

#### 目的
iPadのSplit Viewモードを正確に検出できることを確認する。

#### 前提条件
- iPadOS 15.0以上のデバイス
- Safari 15以上
- 目次付きのブログ記事を表示

#### テスト手順
1. iPadでブログ記事を全画面表示で開く
2. 別のアプリを起動し、Split Viewを有効にする
3. Split Viewのサイズを変更する（1/3、1/2、2/3）
4. コンソールでデバッグ情報を確認する

#### 期待結果
- [ ] Split Viewが有効になったことが検出される
- [ ] window.innerWidthが正確に取得される
- [ ] 適切なレイアウトモードが選択される
- [ ] コンソールにエラーが表示されない

#### 検証項目
```javascript
// Split View検出の確認
console.log('Is Split View:', isSplitView());
console.log('Window Width:', window.innerWidth);
console.log('Screen Width:', screen.width);
console.log('Layout Mode:', getLayoutMode());
```

### TC-502: Split Viewレイアウト調整テスト

#### 目的
Split View時に目次レイアウトが適切に調整されることを確認する。

#### テストケース
| Split Viewサイズ | ウィンドウ幅 | 期待レイアウト | 目次表示 |
|-----------------|-------------|--------------|---------|
| 1/3画面 | ~340px | モバイル | 右下固定 |
| 1/2画面 | ~512px | モバイル | 右下固定 |
| 2/3画面 | ~683px | モバイル | 右下固定 |
| 1/2画面（横向き） | ~683px | モバイル | 右下固定 |
| 2/3画面（横向き） | ~910px | タブレット | スクロール追従 |

#### 検証手順
各サイズで以下を確認：
1. 目次の表示位置が適切か
2. 記事本文との間隔が適切か
3. スクロール動作が正常か
4. タップ操作が可能か

### TC-503: Split View切り替えアニメーションテスト

#### 目的
Split Viewのサイズ変更時に滑らかな遷移が行われることを確認する。

#### テスト手順
1. Split Viewを1/3サイズで開始
2. ドラッグして1/2サイズに変更
3. さらに2/3サイズに変更
4. 全画面に戻す

#### 期待結果
- [ ] 目次の位置が滑らかに遷移する
- [ ] ガタつきやちらつきがない
- [ ] 遷移中も目次が操作可能
- [ ] 遷移完了後に正しい位置に配置される

## 3. Androidマルチウィンドウ テストケース

### TC-504: マルチウィンドウ検出テスト

#### 目的
Androidのマルチウィンドウモードを検出できることを確認する。

#### 対象デバイス
- Galaxy Tab S8
- Pixel Tablet
- Xiaomi Pad 5

#### テスト手順
1. Chrome for Androidでブログ記事を開く
2. マルチウィンドウモードを有効にする
3. ウィンドウサイズを変更する
4. Picture-in-Pictureモードを試す

#### 期待結果
- [ ] マルチウィンドウが検出される
- [ ] ウィンドウサイズが正確に取得される
- [ ] 適切なレイアウトが適用される
- [ ] PiPモードでエラーが発生しない

### TC-505: マルチウィンドウレイアウトテスト

#### テストマトリックス
| ウィンドウ幅 | レイアウト | 目次表示 | スクロール |
|------------|----------|---------|-----------|
| < 768px | モバイル | 右下固定 | 無効 |
| 768-1279px | タブレット | スクロール追従 | 有効 |
| ≥ 1280px | デスクトップ | スクロール追従 | 有効 |

#### 検証項目
- レイアウトの切り替えが正常
- 目次の位置が適切
- タッチ操作が可能
- パフォーマンスが維持される

## 4. 画面回転 テストケース

### TC-506: 画面向き変更検出テスト

#### 目的
デバイスの画面回転を正確に検出できることを確認する。

#### テスト手順
1. 縦向きでブログ記事を開く
2. デバイスを90度回転（横向き）
3. さらに90度回転（縦向き）
4. 各回転時のイベントを記録

#### 期待結果
```javascript
// orientationchangeイベントの発火
window.addEventListener('orientationchange', (e) => {
    console.log('Orientation changed:', window.orientation);
    console.log('Is Landscape:', Math.abs(window.orientation) === 90);
});
```

### TC-507: 回転時の位置保持テスト

#### 目的
画面回転後もユーザーの閲覧位置が維持されることを確認する。

#### テスト手順
1. 記事の中間部分までスクロール
2. 特定の段落が画面に表示されている状態で回転
3. 回転完了後の表示位置を確認

#### 検証項目
- [ ] スクロール位置が維持される
- [ ] 表示されていた段落が画面内に残る
- [ ] 目次のアクティブ項目が変わらない
- [ ] 100ms以内にレイアウトが更新される

### TC-508: 回転パフォーマンステスト

#### 測定項目
| 指標 | 目標値 | 測定方法 |
|-----|-------|---------|
| レイアウト更新時間 | < 100ms | Performance API |
| フレームレート | > 30fps | Chrome DevTools |
| メモリ増加 | < 1MB | Memory Profiler |
| イベント処理時間 | < 16ms | Event Timing API |

## 5. タッチ操作 テストケース

### TC-509: タッチスクロール最適化テスト

#### 目的
タッチデバイスでのスクロールがスムーズであることを確認する。

#### テスト手順
1. タッチデバイスで記事を開く
2. 指でスクロール操作を行う
3. 高速スクロール、ゆっくりスクロールを試す
4. 慣性スクロール中の目次の動作を確認

#### 期待結果
- [ ] スクロールが60fpsで動作
- [ ] 目次の追従が遅延なく動作
- [ ] passive: trueが適用されている
- [ ] タッチ操作中にブロッキングが発生しない

### TC-510: タップ領域テスト

#### 目的
目次のタップ可能領域が適切なサイズであることを確認する。

#### 検証項目
```css
/* タップ領域の最小サイズ */
.toc-item {
    min-height: 44px;
    min-width: 44px;
    padding: 12px; /* タップしやすさのための余白 */
}
```

#### テスト手順
1. 各デバイスで目次項目をタップ
2. 隣接する項目の誤タップがないか確認
3. 小さい画面でも操作可能か確認

## 6. エラー処理 テストケース

### TC-511: デバイス検出失敗時のフォールバック

#### 目的
デバイス固有の機能が利用できない場合でも基本機能が動作することを確認する。

#### テストシナリオ
1. User Agentを偽装して未知のデバイスとして動作
2. JavaScript APIを一部無効化
3. プライベートブラウジングモードで動作

#### 期待結果
- [ ] 基本的な目次機能が動作する
- [ ] エラーがユーザーに表示されない
- [ ] コンソールに適切なログが出力される
- [ ] デフォルトレイアウトが適用される

### TC-512: メモリリークテスト

#### 目的
デバイス固有の処理でメモリリークが発生しないことを確認する。

#### テスト手順
1. Memory Profilerを起動
2. 画面回転を10回繰り返す
3. Split View切り替えを10回繰り返す
4. 10分間放置後のメモリ使用量を測定

#### 合格基準
- メモリ増加が1MB以下
- イベントリスナーが適切に削除される
- DOMノードがリークしない

## 7. 統合テストシナリオ

### ITC-501: 実使用シナリオテスト

#### シナリオ1: iPadでの読書体験
1. iPadを縦向きで使用開始
2. 記事を読み進める（スクロール）
3. Split Viewで参考資料を開く
4. 横向きに回転
5. Split Viewを閉じて全画面に戻る

#### シナリオ2: Androidタブレットでの作業
1. マルチウィンドウで記事とメモアプリを開く
2. ウィンドウサイズを調整しながら作業
3. 画面を回転させて横向きで使用
4. Picture-in-Pictureで動画を見ながら読む

#### 評価項目
- ユーザー体験の一貫性
- 操作の応答性
- レイアウトの適切性
- エラーの有無

## 8. パフォーマンス基準

### 8.1 必須要件
- フレームレート: 60fps維持
- レイアウト更新: 100ms以内
- メモリ使用: +1MB以下
- CPU使用率: +5%以下

### 8.2 推奨要件
- First Input Delay: < 100ms
- Cumulative Layout Shift: < 0.1
- タッチ応答: < 50ms

## 9. デバイステストマトリックス

### 9.1 iOS/iPadOS
| デバイス | OS | ブラウザ | 優先度 |
|---------|----|---------| ------|
| iPad Pro 12.9" | iPadOS 17 | Safari 17 | 高 |
| iPad Air | iPadOS 16 | Safari 16 | 高 |
| iPad mini | iPadOS 15 | Safari 15 | 中 |
| iPad (第10世代) | iPadOS 16 | Chrome | 中 |

### 9.2 Android
| デバイス | OS | ブラウザ | 優先度 |
|---------|----|---------| ------|
| Galaxy Tab S9 | Android 13 | Chrome | 高 |
| Pixel Tablet | Android 14 | Chrome | 高 |
| Xiaomi Pad 6 | Android 13 | Chrome | 中 |
| Surface Duo | Android 12 | Edge | 低 |

## 10. 自動化可能なテスト

### 10.1 単体テスト
```javascript
describe('Device Detection', () => {
    test('Split View detection on iPad', () => {
        // Mock iPad user agent
        Object.defineProperty(navigator, 'userAgent', {
            value: 'Mozilla/5.0 (iPad; CPU OS 16_0 like Mac OS X)',
            writable: true
        });
        
        // Test split view detection
        expect(isSplitView()).toBe(false);
        
        // Mock split view dimensions
        window.innerWidth = 512;
        Object.defineProperty(screen, 'width', { value: 1024 });
        
        expect(isSplitView()).toBe(true);
    });
});
```

### 10.2 E2Eテスト
```javascript
describe('Orientation Change', () => {
    it('maintains scroll position on rotation', async () => {
        // Navigate to article
        await page.goto('/blog/sample-article');
        
        // Scroll to middle
        await page.evaluate(() => window.scrollTo(0, 1000));
        const initialScrollY = await page.evaluate(() => window.scrollY);
        
        // Simulate rotation
        await page.setViewport({ width: 1024, height: 768 });
        
        // Check scroll position maintained
        const newScrollY = await page.evaluate(() => window.scrollY);
        expect(Math.abs(newScrollY - initialScrollY)).toBeLessThan(100);
    });
});
```

## 11. 手動テストチェックリスト

### iPad Split View
- [ ] 1/3サイズで正常動作
- [ ] 1/2サイズで正常動作
- [ ] 2/3サイズで正常動作
- [ ] サイズ変更時の遷移が滑らか
- [ ] 全画面復帰が正常

### Android マルチウィンドウ
- [ ] 分割画面で正常動作
- [ ] フローティングウィンドウで正常動作
- [ ] PiPモードでエラーなし
- [ ] フォーカス切り替えが正常

### 画面回転
- [ ] 縦→横の回転が正常
- [ ] 横→縦の回転が正常
- [ ] 回転時の位置保持
- [ ] 回転後のレイアウト

### タッチ操作
- [ ] スクロールがスムーズ
- [ ] タップ操作が正確
- [ ] ピンチズーム時の動作
- [ ] 長押し操作の対応