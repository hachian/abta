// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://abta.hachian.com',
	integrations: [mdx(), sitemap()],
	build: {
		inlineStylesheets: 'always', // すべてのCSSをインライン化してブロッキング完全解消
		assets: '_astro'
	},
	compressHTML: true,
	prefetch: {
		prefetchAll: true,
		defaultStrategy: 'viewport'
	},
	vite: {
		build: {
			cssMinify: true,
			minify: 'esbuild',
			rollupOptions: {
				output: {
					manualChunks: {
						'astro': ['astro'],
					},
					assetFileNames: (assetInfo) => {
						const info = assetInfo.name.split('.');
						const ext = info[info.length - 1];
						if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
							return `images/[name].[hash][extname]`;
						}
						if (/woff2?|ttf|eot/i.test(ext)) {
							return `fonts/[name].[hash][extname]`;
						}
						return `[name].[hash][extname]`;
					}
				}
			}
		},
		css: {
			transformer: 'postcss'
		}
	}
});
