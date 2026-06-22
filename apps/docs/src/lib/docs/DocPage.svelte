<script lang="ts">
	import type { Snippet } from 'svelte';

	export interface TocEntry {
		id: string;
		label: string;
	}

	interface Props {
		group: string;
		name: string;
		description: string;
		toc?: TocEntry[];
		children: Snippet;
	}

	let { group, name, description, toc = [], children }: Props = $props();
</script>

<svelte:head>
	<title>{name} — Sve·UI</title>
	<meta name="description" content={description} />
</svelte:head>

<div class="docpage">
	<article class="docpage__main">
		<nav class="docpage__crumb" aria-label="Breadcrumb">
			<a href="/components">Components</a>
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
