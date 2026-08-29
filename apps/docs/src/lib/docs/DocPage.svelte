<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import Seo from '$lib/seo/Seo.svelte';
	import { breadcrumbSchema, techArticleSchema } from '$lib/seo/schema';

	export interface TocEntry {
		id: string;
		label: string;
	}

	interface Props {
		group: string;
		name: string;
		description: string;
		toc?: TocEntry[];
		/** Top-level breadcrumb link. Defaults to the Components section. */
		crumb?: { href: string; label: string };
		/**
		 * What this page documents. Component pages get a keyword-bearing title
		 * ("Svelte Button Component") because each one competes for its own
		 * long-tail query; guides keep the plain brand title.
		 */
		kind?: 'component' | 'guide';
		/**
		 * Overrides the derived <title>. Guides use it because their page name
		 * alone ("Introduction") competes for nothing on its own.
		 */
		seoTitle?: string;
		children: Snippet;
	}

	let {
		group,
		name,
		description,
		toc = [],
		crumb = { href: '/components', label: 'Components' },
		kind = 'component',
		seoTitle,
		children
	}: Props = $props();

	let isComponent = $derived(kind === 'component');

	let title = $derived(
		seoTitle ?? (isComponent ? `Svelte ${name} Component — Sve·UI` : `${name} — Sve·UI`)
	);

	// The registry blurb is a UI lede, not a search snippet — too short to earn a
	// click on its own. Component pages extend it with the terms people actually
	// type; guides already write full sentences and are left alone.
	let seoDescription = $derived(
		isComponent
			? `${description} A styled, accessible Svelte 5 ${name} component from Sve·UI — no Tailwind, no config, themeable with CSS variables.`
			: description
	);

	let jsonLd = $derived([
		breadcrumbSchema([
			{ name: 'Home', path: '/' },
			{ name: crumb.label, path: crumb.href },
			{ name, path: page.url.pathname }
		]),
		techArticleSchema({
			name: title,
			description: seoDescription,
			path: page.url.pathname
		})
	]);
</script>

<Seo {title} description={seoDescription} type="article" {jsonLd} />

<div class="docpage">
	<article class="docpage__main">
		<nav class="docpage__crumb" aria-label="Breadcrumb">
			<a href={crumb.href}>{crumb.label}</a>
			<span class="docpage__crumb-sep">/</span>
			<span>{group}</span>
		</nav>

		<h1 class="docpage__title">{name}</h1>
		<p class="docpage__lede">{description}</p>

		<div class="docpage__body">
			{@render children()}
		</div>
	</article>

	{#if toc.length}
		<aside class="docpage__toc">
			<span class="docpage__toc-label">On this page</span>
			<nav>
				{#each toc as t (t.id)}
					<a href={`#${t.id}`} class="docpage__toc-link">{t.label}</a>
				{/each}
			</nav>
		</aside>
	{/if}
</div>

<style>
	.docpage {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 48px;
	}

	@media (min-width: 1100px) {
		.docpage {
			grid-template-columns: minmax(0, 1fr) 180px;
		}
	}

	.docpage__main {
		min-width: 0;
		padding: 40px 4px 80px;
	}

	.docpage__crumb {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 13px;
		color: var(--doc-fg-subtle);
		margin-bottom: 14px;
	}
	.docpage__crumb a {
		color: var(--doc-fg-muted);
		text-decoration: none;
	}
	.docpage__crumb a:hover {
		color: var(--doc-fg);
	}
	.docpage__crumb-sep {
		opacity: 0.6;
	}

	.docpage__title {
		font-size: 38px;
		font-weight: 800;
		letter-spacing: -0.03em;
		line-height: 1.08;
		color: var(--doc-fg);
		margin: 0;
	}

	.docpage__lede {
		margin: 12px 0 0;
		max-width: 620px;
		font-size: 17px;
		line-height: 1.55;
		color: var(--doc-fg-muted);
	}

	.docpage__body {
		margin-top: 36px;
	}

	.docpage__toc {
		display: none;
	}

	@media (min-width: 1100px) {
		.docpage__toc {
			display: block;
			align-self: start;
			position: sticky;
			top: 88px;
			padding-top: 40px;
		}
	}

	.docpage__toc-label {
		display: block;
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--doc-fg-subtle);
		margin-bottom: 12px;
	}

	.docpage__toc nav {
		display: flex;
		flex-direction: column;
		gap: 9px;
		border-left: 1px solid var(--doc-border);
	}

	.docpage__toc-link {
		padding-left: 14px;
		font-size: 13px;
		color: var(--doc-fg-muted);
		text-decoration: none;
		transition: color 120ms ease;
	}
	.docpage__toc-link:hover {
		color: var(--doc-fg);
	}
</style>
