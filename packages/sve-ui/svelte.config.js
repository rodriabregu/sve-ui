import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		// Library package — no adapter needed for publishing.
		// Add adapter-auto here only if a dev/preview app is re-introduced.
	}
};

export default config;
