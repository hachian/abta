# TASK-004: パフォーマンス最適化 - REFACTOR Phase

## リファクタリング方針

### 1. コードの可読性向上
- 変数・関数名の明確化
- コメントの充実化
- 処理ブロックの論理的分割

### 2. エラーハンドリング強化
- DOM要素キャッシュ失敗時の処理
- 画面サイズ異常時の処理
- メモリ制約時の対応

### 3. デバッグ・モニタリング機能
- パフォーマンス測定の組み込み
- 開発時のデバッグ情報
- 本番環境での監視機能

## リファクタリング実装

### 1. 変数・関数名の改善

#### 現在の名前を改善
```javascript
// Before
let cachedViewportWidth = window.innerWidth;
let cachedIsTablet = cachedViewportWidth >= 768 && cachedViewportWidth <= 1279;

// After  
let viewportCache = {
    width: window.innerWidth,
    get isTablet() { return this.width >= 768 && this.width <= 1279; },
    get isDesktop() { return this.width >= 1280; },
    update() {
        this.width = window.innerWidth;
    }
};
```

### 2. 設定の外部化
```javascript
// パフォーマンス設定オブジェクト
const PERFORMANCE_CONFIG = {
    BREAKPOINTS: {
        MOBILE_MAX: 767,
        TABLET_MIN: 768,
        TABLET_MAX: 1279,
        DESKTOP_MIN: 1280
    },
    MARGINS: {
        TABLET: 24,    // 1.5rem
        DESKTOP: 32    // 2rem
    },
    THRESHOLDS: {
        TOC_MAX_WIDTH: 240,  // 15rem
        HEADER_HEIGHT: 72
    }
};
```

### 3. エラーハンドリングの追加
```javascript
// DOM要素キャッシュ with エラーハンドリング
function createDomCache() {
    const cache = {
        mainArticle: null,
        proseElement: null,
        tocSidebar: null,
        isValid: false
    };
    
    try {
        cache.mainArticle = document.querySelector('.main-article');
        cache.tocSidebar = document.getElementById('toc-sidebar');
        
        if (cache.mainArticle) {
            cache.proseElement = cache.mainArticle.querySelector('.prose');
        }
        
        cache.isValid = !!(cache.mainArticle && cache.proseElement && cache.tocSidebar);
        
        if (!cache.isValid) {
            console.warn('[TOC] Required DOM elements not found. Performance optimization disabled.');
        }
    } catch (error) {
        console.error('[TOC] DOM cache initialization failed:', error);
        cache.isValid = false;
    }
    
    return cache;
}
```

### 4. パフォーマンス測定の組み込み

#### 開発時のみ有効なパフォーマンス測定
```javascript
class PerformanceMonitor {
    constructor(enabled = false) {
        this.enabled = enabled && typeof performance !== 'undefined';
        this.metrics = {};
    }
    
    startMeasure(name) {
        if (!this.enabled) return;
        performance.mark(`${name}-start`);
    }
    
    endMeasure(name) {
        if (!this.enabled) return;
        try {
            performance.mark(`${name}-end`);
            performance.measure(name, `${name}-start`, `${name}-end`);
            
            const measure = performance.getEntriesByName(name).pop();
            if (measure) {
                this.metrics[name] = (this.metrics[name] || []);
                this.metrics[name].push(measure.duration);
                
                // 閾値チェック
                if (measure.duration > 16) { // 60fps = 16.67ms
                    console.warn(`[TOC Performance] ${name} took ${measure.duration.toFixed(2)}ms (>16ms)`);
                }
            }
        } catch (error) {
            console.error('[TOC Performance] Measurement failed:', error);
        }
    }
    
    getAverageTime(name) {
        if (!this.metrics[name] || this.metrics[name].length === 0) return 0;
        const sum = this.metrics[name].reduce((a, b) => a + b, 0);
        return sum / this.metrics[name].length;
    }
    
    logSummary() {
        if (!this.enabled || Object.keys(this.metrics).length === 0) return;
        
        console.group('[TOC Performance Summary]');
        Object.keys(this.metrics).forEach(name => {
            const avg = this.getAverageTime(name);
            const count = this.metrics[name].length;
            console.log(`${name}: ${avg.toFixed(2)}ms avg (${count} samples)`);
        });
        console.groupEnd();
    }
}
```

### 5. リファクタリング後の完全なコード構造

```javascript
// スクロール追従機能（リファクタリング版）
function initScrollFollowing() {
    // 基本的な環境チェック
    if (window.innerWidth <= PERFORMANCE_CONFIG.BREAKPOINTS.MOBILE_MAX) {
        return;
    }
    
    // パフォーマンス監視の初期化（開発時のみ）
    const perfMonitor = new PerformanceMonitor(process.env.NODE_ENV === 'development');
    
    // DOM要素キャッシュの初期化
    const domCache = createDomCache();
    if (!domCache.isValid) {
        return; // 必要な要素が見つからない場合は終了
    }
    
    // 画面サイズキャッシュの初期化
    const viewportCache = {
        width: window.innerWidth,
        get isTablet() { 
            return this.width >= PERFORMANCE_CONFIG.BREAKPOINTS.TABLET_MIN && 
                   this.width <= PERFORMANCE_CONFIG.BREAKPOINTS.TABLET_MAX; 
        },
        update() {
            const newWidth = window.innerWidth;
            if (newWidth !== this.width) {
                this.width = newWidth;
                return true; // 変更あり
            }
            return false; // 変更なし
        }
    };
    
    // スクロール・リサイズ処理の状態管理
    let isScrollTicking = false;
    let articleRect = null;
    
    // 記事位置の更新
    function updateArticlePosition() {
        perfMonitor.startMeasure('updateArticlePosition');
        
        try {
            if (domCache.mainArticle) {
                articleRect = domCache.mainArticle.getBoundingClientRect();
            }
        } catch (error) {
            console.error('[TOC] Article position update failed:', error);
        } finally {
            perfMonitor.endMeasure('updateArticlePosition');
        }
    }
    
    // 目次位置の更新
    function updateTocPosition() {
        if (!articleRect || !domCache.proseElement || !domCache.tocSidebar) return;
        
        perfMonitor.startMeasure('updateTocPosition');
        
        try {
            const scrollY = window.scrollY;
            const proseRect = domCache.proseElement.getBoundingClientRect();
            const proseTop = proseRect.top + scrollY;
            
            // レイアウト計算（キャッシュされた値を使用）
            const margins = viewportCache.isTablet ? 
                PERFORMANCE_CONFIG.MARGINS.TABLET : 
                PERFORMANCE_CONFIG.MARGINS.DESKTOP;
            
            const articleRight = articleRect.right;
            const gap = margins;
            
            // 目次の配置
            domCache.tocSidebar.style.position = 'fixed';
            domCache.tocSidebar.style.left = `${articleRight + gap}px`;
            domCache.tocSidebar.style.visibility = 'visible';
            domCache.tocSidebar.style.opacity = '1';
            domCache.tocSidebar.style.transition = 'opacity 0.2s ease, visibility 0.2s ease, top 0s';
            
            // 画面端制御
            const tocWidth = domCache.tocSidebar.offsetWidth;
            const rightMargin = margins;
            const maxLeft = viewportCache.width - tocWidth - rightMargin;
            
            if (articleRight + gap > maxLeft) {
                domCache.tocSidebar.style.left = `${maxLeft}px`;
            }
            
            // 幅制限（タブレット）
            if (viewportCache.isTablet) {
                const maxTocWidth = Math.min(tocWidth, PERFORMANCE_CONFIG.THRESHOLDS.TOC_MAX_WIDTH);
                domCache.tocSidebar.style.width = `${maxTocWidth}px`;
            } else {
                domCache.tocSidebar.style.width = '';
            }
            
            // 縦位置の計算
            const baseTop = scrollY > PERFORMANCE_CONFIG.THRESHOLDS.HEADER_HEIGHT ? 
                margins : 
                PERFORMANCE_CONFIG.THRESHOLDS.HEADER_HEIGHT + margins;
            
            const minTop = proseTop - scrollY;
            const tocTop = Math.max(baseTop, minTop);
            
            domCache.tocSidebar.style.top = `${tocTop}px`;
            
            // 高さ制限
            const maxHeight = window.innerHeight - tocTop - margins;
            domCache.tocSidebar.style.maxHeight = `${maxHeight}px`;
            
        } catch (error) {
            console.error('[TOC] Position update failed:', error);
        } finally {
            perfMonitor.endMeasure('updateTocPosition');
        }
    }
    
    // スクロールイベントハンドラ
    function handleScroll() {
        if (!isScrollTicking) {
            requestAnimationFrame(() => {
                perfMonitor.startMeasure('scrollHandler');
                updateArticlePosition();
                updateTocPosition();
                perfMonitor.endMeasure('scrollHandler');
                isScrollTicking = false;
            });
            isScrollTicking = true;
        }
    }
    
    // リサイズイベントハンドラ
    function handleResize() {
        perfMonitor.startMeasure('resizeHandler');
        
        try {
            const hasViewportChanged = viewportCache.update();
            
            if (hasViewportChanged) {
                // 画面サイズが変わった場合のみ再計算
                updateArticlePosition();
                updateTocPosition();
            }
        } catch (error) {
            console.error('[TOC] Resize handling failed:', error);
        } finally {
            perfMonitor.endMeasure('resizeHandler');
        }
    }
    
    // 初期化
    try {
        updateArticlePosition();
        updateTocPosition();
        
        // イベントリスナー登録（passive最適化）
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize, { passive: true });
        
        // 開発環境でのパフォーマンス監視
        if (perfMonitor.enabled) {
            // 10秒後にサマリー表示
            setTimeout(() => perfMonitor.logSummary(), 10000);
        }
        
    } catch (error) {
        console.error('[TOC] Initialization failed:', error);
        return;
    }
    
    // クリーンアップ関数を返す
    return () => {
        try {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
            perfMonitor.logSummary();
        } catch (error) {
            console.error('[TOC] Cleanup failed:', error);
        }
    };
}
```

## リファクタリングによる改善点

### 1. 可読性向上
- **設定の外部化**: マジックナンバーの排除
- **エラーハンドリング**: 問題発生時の適切な処理
- **コメント充実**: 処理の意図を明確化

### 2. 保守性向上
- **モジュール化**: 機能別の分割
- **設定可能性**: 値の調整が容易
- **デバッグ支援**: 問題特定の支援機能

### 3. 安定性向上
- **エラー分離**: 一部の失敗が全体に影響しない
- **環境対応**: 開発・本番環境の最適化
- **リソース管理**: メモリリークの防止

## 次のステップ

1. **実装の適用**: TableOfContents.astroに段階的に適用
2. **テスト実行**: パフォーマンステストの実行
3. **品質確認**: 既存機能への影響確認
4. **文書化**: 変更内容の記録

このリファクタリングにより、パフォーマンスと保守性の両面で大幅な改善が期待されます。