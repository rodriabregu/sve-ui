import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		// Ensure Svelte resolves to the browser (client) bundle.
		// Without this, the sveltekit() plugin defaults to SSR conditions in tests.
		conditions: ['browser']
	},
	test: {
		coverage: {
			provider: 'v8',
			reporter: ['text-summary', 'json-summary'],
			// Only the shipped surface. Fixtures and tests would inflate the number
			// while saying nothing about what consumers get.
			include: ['src/lib/**/*.{svelte,ts}'],
			exclude: ['src/lib/**/index.ts', 'src/lib/**/*.d.ts'],
			// No threshold yet, deliberately. One picked before reading the report
			// just codifies today's blind spots as the target.
			thresholds: undefined
		},
		include: ['src/tests/**/*.{test,spec}.{js,ts,svelte.ts}'],
		environment: 'jsdom',
		globals: true,
		setupFiles: ['./src/tests/setup.ts']
	}
});
