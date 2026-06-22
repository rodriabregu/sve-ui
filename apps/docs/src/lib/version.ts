import pkg from 'sve-ui/package.json';

/**
 * The live sve-ui package version, read from the package at build time.
 * Updates automatically on every release (Vercel rebuilds the docs after a
 * version bump), so the landing never shows a stale hardcoded version.
 */
export const SVE_UI_VERSION = `v${pkg.version}`;
