/**
 * Canonical site identity — the single source of truth for every absolute URL
 * the site emits: canonical tags, Open Graph, structured data and the sitemap.
 *
 * Absolute URLs are unavoidable in SEO markup (a canonical or an og:image MUST
 * be absolute), so they are derived here instead of being spelled out per page.
 * Change the domain once and nothing is left pointing at the old one.
 */

export const SITE_URL = 'https://sveui.org';

export const SITE_NAME = 'Sve·UI';

/** Primary keyword phrase. Reused across titles, descriptions and JSON-LD. */
export const SITE_TAGLINE = 'Svelte UI Component Library';

export const SITE_DESCRIPTION =
	'Sve·UI is a Svelte 5 UI component library: fully styled, fully accessible components built on Bits UI. No Tailwind and no config in your project — install, import, and theme with CSS variables.';

/** 1200×630 social card. Regenerate with `pnpm gen:og`. */
export const OG_IMAGE = '/og.png';
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const OG_IMAGE_ALT = 'Sve·UI — styled, accessible Svelte 5 UI components. Zero config.';

export const REPO_URL = 'https://github.com/rodriabregu/sve-ui';
export const NPM_URL = 'https://www.npmjs.com/package/sve-ui';

/**
 * Resolve a site-relative path to its absolute canonical URL.
 * `/` stays `https://sveui.org/`; every other path keeps SvelteKit's default
 * `trailingSlash: 'never'` shape so canonicals match the URLs actually served.
 */
export function absolute(path: string): string {
	return new URL(path, SITE_URL).href;
}
