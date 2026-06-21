import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

/**
 * Base flat config for TypeScript/JavaScript files.
 * Note: `.svelte` files are handled by ./svelte.js (ESLint owns template
 * linting; Oxlint covers plain .ts/.js for speed — see ROADMAP D6).
 */
export const base = [
  {
    ignores: ['dist/', '.svelte-kit/', 'build/', 'node_modules/', '.turbo/', '.vercel/', '.output/']
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node }
    }
  }
];

export default base;
