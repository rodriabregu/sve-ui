import svelteConfig from '@repo/eslint-config/svelte';

/** @type {import('eslint').Linter.Config[]} */
export default [
	...svelteConfig,
	{
		files: ['**/*.svelte'],
		rules: {
			// This docs site is deployed at the domain root and links to in-page
			// hash anchors (e.g. /#theming); SvelteKit base-path resolution adds no
			// value here, so the resolve() requirement is disabled for the docs app.
			'svelte/no-navigation-without-resolve': 'off'
		}
	}
];
