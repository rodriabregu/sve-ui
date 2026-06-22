<script lang="ts">
	import { componentGroups, readyComponents, totalComponents } from '$lib/docs/registry';

	const comingSoon = totalComponents - readyComponents;
</script>

<svelte:head>
	<title>Components — Sve·UI</title>
	<meta
		name="description"
		content="Every Sve·UI component — display, forms, feedback, navigation and overlays. Styled, accessible, zero config."
	/>
</svelte:head>

<div class="index">
	<header class="index__head">
		<span class="doc-eyebrow">{readyComponents} components · {comingSoon} on the way</span>
		<h1 class="index__title">Components</h1>
		<p class="index__lede">
			Every component is fully styled and accessible out of the box — built on Bits UI, themed with
			CSS variables, and ready to drop in. Pick one to see live previews, code and props. Items
			marked <span class="index__soon-inline">soon</span> are on the roadmap.
		</p>
	</header>

	{#each componentGroups as group (group.label)}
		<section class="index__group">
			<h2 class="index__group-title">{group.label}</h2>
			<div class="index__grid">
				{#each group.items as item (item.slug)}
					{#if item.ready}
						<a href={`/components/${item.slug}`} class="card">
							<div class="card__top">
								<span class="card__name">{item.name}</span>
								{#if item.status === 'new'}<span class="card__tag">new</span>{/if}
							</div>
							<p class="card__blurb">{item.blurb}</p>
							<span class="card__cta">
								View
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
							</span>
						</a>
					{:else}
						<div class="card is-soon">
							<div class="card__top">
								<span class="card__name">{item.name}</span>
								<span class="card__soon">soon</span>
							</div>
							<p class="card__blurb">{item.blurb}</p>
						</div>
					{/if}
				{/each}
			</div>
		</section>
	{/each}
</div>

<style>
	.index {
		padding: 40px 4px 90px;
	}

	.index__head {
		max-width: 640px;
		margin-bottom: 44px;
	}
	.index__title {
		font-size: 40px;
		font-weight: 800;
		letter-spacing: -0.03em;
		line-height: 1.06;
		color: var(--doc-fg);
		margin: 10px 0 0;
	}
	.index__lede {
		margin: 14px 0 0;
		font-size: 17px;
		line-height: 1.55;
		color: var(--doc-fg-muted);
	}
	.index__soon-inline {
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		padding: 2px 6px;
		border-radius: 999px;
		background: var(--doc-surface-2);
		color: var(--doc-fg-subtle);
		vertical-align: middle;
	}

	.index__group {
		margin-bottom: 40px;
	}
	.index__group-title {
		font-size: 13px;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--doc-fg-subtle);
		margin: 0 0 16px;
	}

	.index__grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
		gap: 14px;
	}

	.card {
		display: flex;
		flex-direction: column;
		padding: 18px 18px 16px;
		border: 1px solid var(--doc-border);
		border-radius: 14px;
		background: var(--doc-surface);
		text-decoration: none;
		transition: border-color 140ms ease, transform 140ms ease, box-shadow 140ms ease;
	}
	.card:not(.is-soon):hover {
		border-color: color-mix(in srgb, var(--sve-color-primary) 45%, var(--doc-border));
		transform: translateY(-2px);
		box-shadow: var(--doc-shadow);
	}
	.card.is-soon {
		opacity: 0.55;
	}

	.card__top {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 6px;
	}
	.card__name {
		font-size: 15px;
		font-weight: 700;
		letter-spacing: -0.01em;
		color: var(--doc-fg);
	}
	.card__blurb {
		flex: 1;
		margin: 0;
		font-size: 13px;
		line-height: 1.5;
		color: var(--doc-fg-muted);
	}
	.card__cta {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		margin-top: 14px;
		font-size: 13px;
		font-weight: 600;
		color: var(--doc-primary-text);
	}

	.card__tag,
	.card__soon {
		font-size: 9.5px;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		padding: 2px 6px;
		border-radius: 999px;
	}
	.card__tag {
		background: color-mix(in srgb, var(--sve-color-primary) 16%, transparent);
		color: var(--doc-primary-text);
	}
	.card__soon {
		background: var(--doc-surface-2);
		color: var(--doc-fg-subtle);
	}
</style>
