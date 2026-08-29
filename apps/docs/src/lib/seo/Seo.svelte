<script lang="ts">
	import { page } from '$app/state';
	import {
		SITE_NAME,
		SITE_DESCRIPTION,
		OG_IMAGE,
		OG_IMAGE_WIDTH,
		OG_IMAGE_HEIGHT,
		OG_IMAGE_ALT,
		absolute
	} from './site';

	interface Props {
		/** Full <title> text, already including the brand suffix. */
		title: string;
		description?: string;
		/**
		 * Canonical path. Defaults to the path actually being rendered, which is
		 * exact under prerendering and avoids hand-written paths going stale.
		 */
		path?: string;
		/** og:type — 'website' for landing pages, 'article' for docs content. */
		type?: 'website' | 'article';
		/** JSON-LD graph nodes appended to this page's structured data. */
		jsonLd?: Record<string, unknown>[];
	}

	let {
		title,
		description = SITE_DESCRIPTION,
		path = page.url.pathname,
		type = 'website',
		jsonLd = []
	}: Props = $props();

	let canonical = $derived(absolute(path));
	let image = $derived(absolute(OG_IMAGE));

	/**
	 * Svelte cannot render a script tag from markup, so structured data goes in
	 * through {@html}. Every `<` is escaped to its JSON `\u003c` form: that is what
	 * stops a stray closing script tag inside a description from ending the block
	 * early and injecting markup. The closing tag below is escaped for the same
	 * reason — an unescaped one would terminate THIS component's script element.
	 */
	let structuredData = $derived.by(() => {
		if (!jsonLd.length) return '';

		// A @graph declares @context once for the whole document, so the per-node
		// copies the builders emit are stripped here rather than repeated.
		const stripContext = (node: Record<string, unknown>) => {
			const copy = { ...node };
			delete copy['@context'];
			return copy;
		};

		const payload =
			jsonLd.length === 1
				? jsonLd[0]
				: { '@context': 'https://schema.org', '@graph': jsonLd.map(stripContext) };

		const json = JSON.stringify(payload).replace(/</g, '\\u003c');

		// The escape IS required: an unescaped closing script tag in this template
		// literal would terminate the component's own <script> element at parse
		// time. eslint only sees the JS string, where the escape looks redundant.
		// eslint-disable-next-line no-useless-escape
		return `<script type="application/ld+json">${json}<\/script>`;
	});
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />

	<meta property="og:type" content={type} />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:locale" content="en_US" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={image} />
	<meta property="og:image:width" content={String(OG_IMAGE_WIDTH)} />
	<meta property="og:image:height" content={String(OG_IMAGE_HEIGHT)} />
	<meta property="og:image:alt" content={OG_IMAGE_ALT} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
	<meta name="twitter:image:alt" content={OG_IMAGE_ALT} />

	{#if structuredData}
		<!-- Safe by construction: the payload is JSON.stringify output with every
		     `<` escaped above, so no caller-supplied string can emit markup. This is
		     the only way to render a <script> tag from Svelte markup. -->
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html structuredData}
	{/if}
</svelte:head>
