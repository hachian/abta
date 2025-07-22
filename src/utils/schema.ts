/**
 * Schema.ts - 構造化データ生成ユーティリティ
 */

interface BaseSchema {
	"@context": "https://schema.org";
	"@type": string;
	name: string;
	description?: string;
	url: string;
	inLanguage: "ja";
}

interface WebSiteSchema extends BaseSchema {
	"@type": "WebSite";
	alternateName?: string;
	publisher: {
		"@type": "Organization";
		name: string;
	};
}

interface CollectionPageSchema extends BaseSchema {
	"@type": "CollectionPage";
	isPartOf: {
		"@type": "WebSite";
		name: string;
		url: string;
	};
	numberOfItems?: number;
}

interface BlogPostSchema extends BaseSchema {
	"@type": "BlogPosting";
	headline: string;
	author: {
		"@type": "Person";
		name: string;
	};
	publisher: {
		"@type": "Organization";
		name: string;
	};
	datePublished: string;
	dateModified: string;
	keywords?: string[];
	image?: string;
}

/**
 * WebSiteスキーマを生成する
 */
export function createWebSiteSchema(
	name: string,
	description: string,
	siteUrl: string,
	alternateName?: string,
	publisherName = "ABTA"
): WebSiteSchema {
	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name,
		alternateName,
		url: siteUrl,
		description,
		publisher: {
			"@type": "Organization",
			name: publisherName
		},
		inLanguage: "ja"
	};
}

/**
 * CollectionPageスキーマを生成する
 */
export function createCollectionPageSchema(
	name: string,
	description: string,
	pageUrl: string,
	siteUrl: string,
	siteName = "ABTA",
	numberOfItems?: number
): CollectionPageSchema {
	return {
		"@context": "https://schema.org",
		"@type": "CollectionPage",
		name,
		description,
		url: pageUrl,
		inLanguage: "ja",
		isPartOf: {
			"@type": "WebSite",
			name: siteName,
			url: siteUrl
		},
		numberOfItems
	};
}

/**
 * BlogPostスキーマを生成する
 */
export function createBlogPostSchema(
	title: string,
	description: string,
	pageUrl: string,
	publishDate: Date,
	updateDate: Date,
	authorName = "ABTA",
	publisherName = "ABTA",
	tags?: string[],
	heroImage?: string
): BlogPostSchema {
	return {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		name: title,
		headline: title,
		description,
		url: pageUrl,
		author: {
			"@type": "Person",
			name: authorName
		},
		publisher: {
			"@type": "Organization",
			name: publisherName
		},
		datePublished: publishDate.toISOString(),
		dateModified: updateDate.toISOString(),
		keywords: tags,
		image: heroImage,
		inLanguage: "ja"
	};
}

/**
 * スキーマオブジェクトをJSON-LD文字列に変換する
 */
export function schemaToJsonLd(schema: BaseSchema | WebSiteSchema | CollectionPageSchema | BlogPostSchema): string {
	return JSON.stringify(schema);
}