/**
 * Archive.ts - 日付・アーカイブ処理ユーティリティ
 * 
 * 注意: 現在このファイルの関数は使用されていませんが、
 * 将来的なアーカイブ機能の拡張時に使用予定です。
 */

export interface BlogPost {
	slug: string;
	data: {
		title: string;
		pubDate: Date;
		updatedDate?: Date;
		tags?: string[];
	};
}

export interface MonthlyArchiveItem {
	year: number;
	month: number;
	count: number;
	posts: BlogPost[];
}

export interface YearlyArchiveItem {
	year: number;
	count: number;
	posts: BlogPost[];
	monthlyBreakdown: MonthlyArchiveItem[];
}

/**
 * 日本語形式で月を表示する（例：2024年1月）
 */
export function formatJapaneseYearMonth(year: number, month: number): string {
	return `${year}年${month}月`;
}

/**
 * 日本語形式で年を表示する（例：2024年）
 */
export function formatJapaneseYear(year: number): string {
	return `${year}年`;
}

/**
 * 日本語形式で日付を表示する（例：2024/1/15）
 */
export function formatJapaneseDate(date: Date): string {
	return date.toLocaleDateString('ja-JP', {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric'
	});
}

/**
 * 記事を月別にグループ化する
 */
export function groupPostsByMonth(posts: BlogPost[]): MonthlyArchiveItem[] {
	const monthlyMap = new Map<string, MonthlyArchiveItem>();

	posts.forEach(post => {
		const date = post.data.pubDate;
		const year = date.getFullYear();
		const month = date.getMonth() + 1; // 0-based indexなので+1
		const key = `${year}-${month}`;

		if (!monthlyMap.has(key)) {
			monthlyMap.set(key, {
				year,
				month,
				count: 0,
				posts: []
			});
		}

		const item = monthlyMap.get(key)!;
		item.count++;
		item.posts.push(post);
	});

	// 新しい月順（降順）でソート
	return Array.from(monthlyMap.values())
		.sort((a, b) => {
			const aDate = new Date(a.year, a.month - 1);
			const bDate = new Date(b.year, b.month - 1);
			return bDate.getTime() - aDate.getTime();
		});
}

/**
 * 記事を年別にグループ化する
 */
export function groupPostsByYear(posts: BlogPost[]): YearlyArchiveItem[] {
	const yearlyMap = new Map<number, YearlyArchiveItem>();

	posts.forEach(post => {
		const year = post.data.pubDate.getFullYear();

		if (!yearlyMap.has(year)) {
			yearlyMap.set(year, {
				year,
				count: 0,
				posts: [],
				monthlyBreakdown: []
			});
		}

		const item = yearlyMap.get(year)!;
		item.count++;
		item.posts.push(post);
	});

	// 各年の記事を月別に分解
	yearlyMap.forEach((item, year) => {
		item.monthlyBreakdown = groupPostsByMonth(item.posts);
	});

	// 新しい年順（降順）でソート
	return Array.from(yearlyMap.values())
		.sort((a, b) => b.year - a.year);
}

/**
 * 特定の年月の記事を取得する
 */
export function getPostsByYearMonth(posts: BlogPost[], year: number, month: number): BlogPost[] {
	return posts.filter(post => {
		const date = post.data.pubDate;
		return date.getFullYear() === year && date.getMonth() + 1 === month;
	});
}

/**
 * 特定の年の記事を取得する
 */
export function getPostsByYear(posts: BlogPost[], year: number): BlogPost[] {
	return posts.filter(post => {
		return post.data.pubDate.getFullYear() === year;
	});
}

/**
 * 記事から利用可能な年の一覧を取得する
 */
export function getAvailableYears(posts: BlogPost[]): number[] {
	const years = new Set<number>();
	posts.forEach(post => {
		years.add(post.data.pubDate.getFullYear());
	});
	return Array.from(years).sort((a, b) => b - a); // 降順
}

/**
 * 記事から利用可能な年月の一覧を取得する
 */
export function getAvailableYearMonths(posts: BlogPost[]): { year: number; month: number; }[] {
	const yearMonths = new Set<string>();
	posts.forEach(post => {
		const date = post.data.pubDate;
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		yearMonths.add(`${year}-${month}`);
	});

	return Array.from(yearMonths)
		.map(key => {
			const [year, month] = key.split('-').map(Number);
			return { year, month };
		})
		.sort((a, b) => {
			// 新しい日付順（降順）
			const aDate = new Date(a.year, a.month - 1);
			const bDate = new Date(b.year, b.month - 1);
			return bDate.getTime() - aDate.getTime();
		});
}