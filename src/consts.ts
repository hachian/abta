// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

import config from '../config.json';

// ユーザー設定可能な項目（config.jsonから読み込み）
export const SITE_TITLE = config.site.title;
export const SITE_DESCRIPTION = config.site.description;

export const FEATURES = {
	TAGS_ENABLED: config.features.tagsEnabled,
	ARCHIVE_ENABLED: config.features.archiveEnabled,
};

export const SIDEBAR_ARCHIVE_LIMIT = config.sidebar.archiveLimit;
export const SIDEBAR_TAG_LIMIT = config.sidebar.tagLimit;

export const PRIMARY_HUE = config.theme.primaryHue;

// 内部設定（開発者のみ変更）
export const BLOG_IMAGE_WIDTH = 720;
export const BLOG_IMAGE_HEIGHT = 360;

export const GRID_MIN_WIDTH = 350; // px
export const CARD_MAX_WIDTH_DESKTOP = 400; // px
export const CARD_MAX_WIDTH_TABLET = 500; // px
