import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.svelte.md'],
	kit: {
		adapter: adapter()
	}
};

export default config;
