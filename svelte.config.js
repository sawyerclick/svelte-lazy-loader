import path from 'path';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
import adapter from '@sveltejs/adapter-static';
import { imagetools } from 'vite-imagetools';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],
	preprocess: [mdsvex(mdsvexConfig)],
	kit: {
		adapter: adapter(),
		vite: {
			plugins: [imagetools()],
			resolve: {
				alias: {
					'svelte-lazy-loader': path.resolve('src/lib')
				}
			}
		}
	}
};

export default config;
