<script lang="ts">
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';
	import type { Snippet } from 'svelte';
	import { componentGroups } from '$lib/docs/registry';

	let { children }: { children: Snippet } = $props();

	let query = $state('');
	/** Mobile-only: the nav panel is collapsed by default; ignored at >= 900px. */
	let menuOpen = $state(false);

	let filtered = $derived(
		componentGroups
			.map((g) => ({
				...g,
				items: g.items.filter((it) =>
					it.name.toLowerCase().includes(query.trim().toLowerCase())
				)
			}))
			.filter((g) => g.items.length > 0)
	);

	function isActive(slug: string): boolean {
		return page.url.pathname === `/components/${slug}`;
	}

	/** Mobile: collapse the panel once navigation to a component page completes. */
	afterNavigate(() => (menuOpen = false));
</script>

<div class="shell">
	<aside class="shell__sidebar">
		<button
			class="shell__toggle"
			onclick={() => (menuOpen = !menuOpen)}
			aria-expanded={menuOpen}
			aria-controls="components-nav"
		>
			<span>Browse components</span>
			<svg
				class="shell__toggle-chevron"
				class:is-open={menuOpen}
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2.2"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg
			>
		</button>

		<div id="components-nav" class="shell__panel" class:is-open={menuOpen}>
			<div class="shell__search">
				<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
				<input
					type="search"
					placeholder="Search components…"
					bind:value={query}
					aria-label="Search components"
				/>
			</div>

			<nav class="shell__nav">
				{#each filtered as group (group.label)}
					<div class="shell__group">
						<span class="shell__group-label">{group.label}</span>
						{#each group.items as item (item.slug)}
							{#if item.ready}
								<a
									href={`/components/${item.slug}`}
									class="shell__link"
									class:is-active={isActive(item.slug)}
									aria-current={isActive(item.slug) ? 'page' : undefined}
								>
									{item.name}
									{#if item.status === 'new'}<span class="shell__tag">new</span>{/if}
								</a>
							{:else}
								<span class="shell__link is-soon">
									{item.name}
									<span class="shell__soon">soon</span>
								</span>
							{/if}
						{/each}
					</div>
				{:else}
					<p class="shell__empty">No components match “{query}”.</p>
				{/each}
			</nav>
		</div>
	</aside>

	<div class="shell__content">
		{@render children()}
	</div>
</div>

<style>
	.shell {
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 24px;
	}

	@media (min-width: 900px) {
		.shell {
			display: grid;
			grid-template-columns: 248px minmax(0, 1fr);
			gap: 40px;
			padding: 0 28px;
		}
	}

	.shell__sidebar {
		padding: 16px 0;
	}

	@media (min-width: 900px) {
		.shell__sidebar {
			position: sticky;
			top: 64px;
			align-self: start;
			height: calc(100vh - 64px);
			overflow-y: auto;
			padding: 28px 10px 40px 0;
			border-right: 1px solid var(--doc-border);
			/* Thin, themed scrollbar instead of the chunky OS default. */
			scrollbar-width: thin;
			scrollbar-color: var(--doc-border-2) transparent;
		}
		.shell__sidebar::-webkit-scrollbar {
			width: 7px;
		}
		.shell__sidebar::-webkit-scrollbar-track {
			background: transparent;
		}
		.shell__sidebar::-webkit-scrollbar-thumb {
			background: var(--doc-border);
			border-radius: 999px;
		}
		.shell__sidebar:hover::-webkit-scrollbar-thumb {
			background: var(--doc-border-2);
		}
	}

	/* --- Mobile disclosure toggle (hidden on desktop) --- */
	.shell__toggle {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 12px 16px;
		border: 1px solid var(--doc-border-2);
		border-radius: 11px;
		background: var(--doc-surface);
		color: var(--doc-fg);
		font-family: var(--sve-font-family-sans);
		font-size: 14.5px;
		font-weight: 600;
		cursor: pointer;
	}
	.shell__toggle-chevron {
		color: var(--doc-fg-subtle);
		transition: transform 160ms ease;
	}
	.shell__toggle-chevron.is-open {
		transform: rotate(180deg);
	}

	@media (min-width: 900px) {
		.shell__toggle {
			display: none;
		}
	}

	/* --- Nav panel: collapsed on mobile, always shown on desktop --- */
	.shell__panel {
		display: none;
		margin-top: 12px;
		padding-bottom: 8px;
	}
	.shell__panel.is-open {
		display: block;
	}

	@media (min-width: 900px) {
		.shell__panel {
			display: block;
			margin-top: 0;
		}
	}

	.shell__search {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 9px 12px;
		border: 1px solid var(--doc-border-2);
		border-radius: 10px;
		background: var(--doc-surface);
		color: var(--doc-fg-subtle);
		margin-bottom: 22px;
	}
	.shell__search:focus-within {
		border-color: var(--doc-fg-subtle);
	}
	.shell__search input {
		flex: 1;
		min-width: 0;
		border: none;
		outline: none;
		background: none;
		font-family: var(--sve-font-family-sans);
		font-size: 13.5px;
		color: var(--doc-fg);
	}
	.shell__search input::placeholder {
		color: var(--doc-fg-subtle);
	}

	.shell__nav {
		display: flex;
		flex-direction: column;
		gap: 22px;
	}

	.shell__group {
		display: flex;
		flex-direction: column;
		gap: 1px;
	}

	.shell__group-label {
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--doc-fg-subtle);
		padding: 0 12px 8px;
	}

	.shell__link {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 7px 12px;
		border-radius: 8px;
		font-size: 14px;
		font-weight: 500;
		color: var(--doc-fg-muted);
		text-decoration: none;
		transition: background-color 120ms ease, color 120ms ease;
	}
	.shell__link:hover:not(.is-soon) {
		color: var(--doc-fg);
		background: var(--doc-surface);
	}
	.shell__link.is-active {
		color: var(--doc-primary-text);
		background: color-mix(in srgb, var(--sve-color-primary) 12%, transparent);
		font-weight: 600;
	}

	.shell__link.is-soon {
		color: var(--doc-fg-subtle);
		cursor: default;
		justify-content: space-between;
	}

	.shell__tag,
	.shell__soon {
		font-size: 9.5px;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		padding: 2px 6px;
		border-radius: 999px;
	}
	.shell__tag {
		background: color-mix(in srgb, var(--sve-color-primary) 16%, transparent);
		color: var(--doc-primary-text);
	}
	.shell__soon {
		background: var(--doc-surface-2);
		color: var(--doc-fg-subtle);
	}

	.shell__empty {
		font-size: 13.5px;
		color: var(--doc-fg-subtle);
		padding: 0 12px;
	}
</style>
