import svelte from 'eslint-plugin-svelte';
import tseslint from 'typescript-eslint';
import { base } from './index.js';

/**
 * Flat config for Svelte packages: base TS/JS rules + Svelte template linting.
 * The recommended Svelte config wires svelte-eslint-parser; we add the TS
 * parser for <script lang="ts"> blocks.
 *
 * NOTE: exact config keys (svelte.configs.recommended) target
 * eslint-plugin-svelte v3 — validate on first `pnpm lint` after install.
 */
export const svelteConfig = [
  ...base,
  ...svelte.configs.recommended,
  {
    files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        projectService: true,
        extraFileExtensions: ['.svelte']
      }
    }
  }
];

export default svelteConfig;
