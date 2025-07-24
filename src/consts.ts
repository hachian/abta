// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'ABTA';
export const SITE_DESCRIPTION = '日本語に最適化されたAstroブログテンプレート';

// Image dimensions
export const BLOG_IMAGE_WIDTH = 720;
export const BLOG_IMAGE_HEIGHT = 360;

// Grid settings
export const GRID_MIN_WIDTH = 350; // px
export const CARD_MAX_WIDTH_DESKTOP = 400; // px
export const CARD_MAX_WIDTH_TABLET = 500; // px

// Feature flags
export const FEATURES = {
	TAGS_ENABLED: true,      // タグ機能の有効/無効
	ARCHIVE_ENABLED: true,   // アーカイブ機能の有効/無効
};

// Sidebar settings
export const SIDEBAR_ARCHIVE_LIMIT = 5; // サイドバーに表示する月別アーカイブの最大数
export const SIDEBAR_TAG_LIMIT = 7; // サイドバーに表示するタグの最大数（0 = 無制限）
