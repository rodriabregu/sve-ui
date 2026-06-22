import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		// Ensure Svelte resolves to the browser (client) bundle.
		// Without this, the sveltekit() plugin defaults to SSR conditions in tests.
		conditions: ['browser'],
	},
	test: {
		include: ['src/tests/**/*.{test,spec}.{js,ts,svelte.ts}'],
		environment: 'jsdom',
		globals: true,
		setupFiles: ['./src/tests/setup.ts'],
	},
});
