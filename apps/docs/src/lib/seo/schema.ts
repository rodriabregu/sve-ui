/**
 * Schema.org structured data builders.
 *
 * These describe the library to search engines in a machine-readable way, which
 * is what makes a result eligible for rich treatment (breadcrumb trails, sitelinks
 * search, software app cards) instead of a plain blue link.
 */

import pkg from 'sve-ui/package.json';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, REPO_URL, absolute, OG_IMAGE } from './site';

const CONTEXT = 'https://schema.org';

/** Identifies the site itself and enables the sitelinks search box. */
export function websiteSchema(): Record<string, unknown> {
	return {
		'@context': CONTEXT,
		'@type': 'WebSite',
		'@id': `${SITE_URL}/#website`,
		name: SITE_NAME,
		alternateName: 'sve-ui',
		url: SITE_URL,
		description: SITE_DESCRIPTION,
		inLanguage: 'en'
	};
}

/**
 * The library as a product. `offers` at price 0 is not decoration: Google's
 * software-app rich result requires either an offer or an aggregate rating, and
 * a free MIT package genuinely has the former.
 */
export function softwareSchema(): Record<string, unknown> {
	return {
		'@context': CONTEXT,
		'@type': 'SoftwareApplication',
		'@id': `${SITE_URL}/#software`,
		name: 'sve-ui',
		alternateName: SITE_NAME,
		applicationCategory: 'DeveloperApplication',
		applicationSubCategory: 'UI Component Library',
		description: SITE_DESCRIPTION,
		url: SITE_URL,
		image: absolute(OG_IMAGE),
		softwareVersion: pkg.version,
		license: 'https://opensource.org/licenses/MIT',
		codeRepository: REPO_URL,
		programmingLanguage: ['Svelte', 'TypeScript'],
		operatingSystem: 'Any',
		keywords: pkg.keywords?.join(', '),
		author: {
			'@type': 'Person',
			name: 'Rodrigo Abregu',
			url: 'https://rodriab.io/'
		},
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'USD'
		}
	};
}

/** A page documenting one component, tied back to the library it belongs to. */
export function techArticleSchema(input: {
	name: string;
	description: string;
	path: string;
}): Record<string, unknown> {
	return {
		'@context': CONTEXT,
		'@type': 'TechArticle',
		headline: input.name,
		description: input.description,
		url: absolute(input.path),
		image: absolute(OG_IMAGE),
		inLanguage: 'en',
		isPartOf: { '@id': `${SITE_URL}/#website` },
		about: { '@id': `${SITE_URL}/#software` },
		author: { '@type': 'Person', name: 'Rodrigo Abregu', url: 'https://rodriab.io/' }
	};
}

/** Renders the crumb trail Google shows in place of a raw URL. */
export function breadcrumbSchema(
	crumbs: { name: string; path: string }[]
): Record<string, unknown> {
	return {
		'@context': CONTEXT,
		'@type': 'BreadcrumbList',
		itemListElement: crumbs.map((c, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: c.name,
			item: absolute(c.path)
		}))
	};
}

/** The component index as an enumerated list — one entry per documented component. */
export function itemListSchema(items: { name: string; path: string }[]): Record<string, unknown> {
	return {
		'@context': CONTEXT,
		'@type': 'ItemList',
		name: 'Svelte UI Components',
		numberOfItems: items.length,
		itemListElement: items.map((it, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: it.name,
			url: absolute(it.path)
		}))
	};
}
