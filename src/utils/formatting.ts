/**
 * Formatting.ts - フォーマット関連ユーティリティ
 */

/**
 * 記事数を日本語形式で表示する（例：5記事）
 */
export function formatPostCount(count: number): string {
	return `${count}記事`;
}

/**
 * 記事数を読みやすい形式で表示する（例：記事数: 5）
 */
export function formatPostCountWithLabel(count: number): string {
	return `記事数: ${count}`;
}

/**
 * タグ数を日本語形式で表示する（例：3タグ）
 */
export function formatTagCount(count: number): string {
	return `${count}タグ`;
}

/**
 * テキストを指定長で切り詰める
 */
export function truncateText(text: string, maxLength: number): string {
	if (text.length <= maxLength) {
		return text;
	}
	return text.substring(0, maxLength - 1) + '…';
}

/**
 * HTMLタグを除去する
 */
export function stripHtmlTags(html: string): string {
	return html.replace(/<[^>]*>/g, '');
}

/**
 * URLのスラッグを生成する（日本語対応）
 */
export function createSlug(text: string): string {
	return text
		.toLowerCase()
		.replace(/[\s\u3000]+/g, '-') // スペースと全角スペースをハイフンに置換
		.replace(/[^\w\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF-]/g, '') // 英数字、ひらがな、カタカナ、漢字、ハイフンのみ許可
		.replace(/--+/g, '-') // 連続するハイフンを単一化
		.replace(/^-|-$/g, ''); // 先頭・末尾のハイフンを除去
}

/**
 * 相対URLを絶対URLに変換する
 */
export function toAbsoluteUrl(relativeUrl: string, baseUrl: string): string {
	if (relativeUrl.startsWith('http://') || relativeUrl.startsWith('https://')) {
		return relativeUrl;
	}
	
	const base = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
	const relative = relativeUrl.startsWith('/') ? relativeUrl.substring(1) : relativeUrl;
	
	return base + relative;
}

/**
 * ファイル拡張子を取得する
 */
export function getFileExtension(filename: string): string {
	const lastDotIndex = filename.lastIndexOf('.');
	if (lastDotIndex === -1) {
		return '';
	}
	return filename.substring(lastDotIndex + 1).toLowerCase();
}

/**
 * ファイル名から拡張子を除去する
 */
export function removeFileExtension(filename: string): string {
	const lastDotIndex = filename.lastIndexOf('.');
	if (lastDotIndex === -1) {
		return filename;
	}
	return filename.substring(0, lastDotIndex);
}

/**
 * バイト数を読みやすい形式で表示する（例：1.2KB, 3.4MB）
 */
export function formatBytes(bytes: number, decimals = 2): string {
	if (bytes === 0) return '0 Bytes';

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * 配列をカンマ区切りの文字列に変換する（日本語対応）
 */
export function joinWithComma(items: string[]): string {
	return items.join('、');
}

/**
 * 配列を「と」で区切りの文字列に変換する（例：A、B、Cと）
 */
export function joinWithJapaneseAnd(items: string[]): string {
	if (items.length === 0) return '';
	if (items.length === 1) return items[0];
	if (items.length === 2) return `${items[0]}と${items[1]}`;
	
	const allButLast = items.slice(0, -1);
	const last = items[items.length - 1];
	return `${allButLast.join('、')}と${last}`;
}

/**
 * 数値を3桁区切りで表示する（例：1,234,567）
 */
export function formatNumber(num: number): string {
	return num.toLocaleString('ja-JP');
}

/**
 * パーセンテージを日本語形式で表示する（例：85%）
 */
export function formatPercentage(value: number, total: number, decimals = 1): string {
	if (total === 0) return '0%';
	const percentage = (value / total) * 100;
	return percentage.toFixed(decimals) + '%';
}

/**
 * CSS変数名を生成する
 */
export function createCssVariable(name: string): string {
	return `var(--${name})`;
}

/**
 * カラーコードの妥当性をチェックする（HEX、RGB、OKLCH対応）
 */
export function isValidColor(color: string): boolean {
	// HEXカラー
	if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)) {
		return true;
	}
	
	// RGBカラー
	if (/^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/.test(color)) {
		return true;
	}
	
	// OKLCHカラー
	if (/^oklch\(.+\)$/.test(color)) {
		return true;
	}
	
	return false;
}