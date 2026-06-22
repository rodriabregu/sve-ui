<script lang="ts">
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';

	export interface NavItem {
		name: string;
		href: string;
		ready?: boolean;
		status?: 'new';
	}
	export interface NavGroup {
		label: string;
		items: NavItem[];
	}

	interface Props {
		groups: NavGroup[];
		searchLabel?: string;
		toggleLabel?: string;
	}

	let { groups, searchLabel = 'Search…', toggleLabel = 'Browse' }: Props = $props();

	let query = $state('');
	/** Mobile-only: the nav panel is collapsed by default; ignored at >= 900px. */
	let menuOpen = $state(false);

	let filtered = $derived(
		groups
			.map((g) => ({
				...g,
				items: g.items.filter((it) =>
					it.name.toLowerCase().includes(query.trim().toLowerCase())
				)
			}))
			.filter((g) => g.items.length > 0)
	);

	function isActive(href: string): boolean {
		return page.url.pathname === href;
	}

	afterNavigate(() => (menuOpen = false));
</script>

<aside class="docsnav">
	<button
		class="docsnav__toggle"
		onclick={() => (menuOpen = !menuOpen)}
		aria-expanded={menuOpen}
		aria-controls="docsnav-panel"
	>
		<span>{toggleLabel}</span>
		<svg
			class="docsnav__chevron"
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

	<div id="docsnav-panel" class="docsnav__panel" class:is-open={menuOpen}>
		<div class="docsnav__search">
			<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
			<input type="search" placeholder={searchLabel} bind:value={query} aria-label={searchLabel} />
		</div>

		<nav class="docsnav__nav">
			{#each filtered as group (group.label)}
				<div class="docsnav__group">
					<span class="docsnav__group-label">{group.label}</span>
					{#each group.items as item (item.href)}
						{#if item.ready !== false}
							<a
								href={item.href}
								class="docsnav__link"
								class:is-active={isActive(item.href)}
								aria-current={isActive(item.href) ? 'page' : undefined}
							>
								{item.name}
								{#if item.status === 'new'}<span class="docsnav__tag">new</span>{/if}
							</a>
						{:else}
							<span class="docsnav__link is-soon">
								{item.name}
								<span class="docsnav__soon">soon</span>
							</span>
						{/if}
					{/each}
				</div>
			{:else}
				<p class="docsnav__empty">No matches for “{query}”.</p>
			{/each}
		</nav>
	</div>
</aside>

<style>
	.docsnav {
		padding: 16px 0;
	}

	@media (min-width: 900px) {
		.docsnav {
			position: sticky;
			top: 64px;
			align-self: start;
			height: calc(100vh - 64px);
			overflow-y: auto;
			padding: 28px 10px 40px 0;
			border-right: 1px solid var(--doc-border);
			scrollbar-width: thin;
			scrollbar-color: var(--doc-border-2) transparent;
		}
		.docsnav::-webkit-scrollbar {
			width: 7px;
		}
		.docsnav::-webkit-scrollbar-track {
			background: transparent;
		}
		.docsnav::-webkit-scrollbar-thumb {
			background: var(--doc-border);
			border-radius: 999px;
		}
		.docsnav:hover::-webkit-scrollbar-thumb {
			background: var(--doc-border-2);
		}
	}

	.docsnav__toggle {
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
	.docsnav__chevron {
		color: var(--doc-fg-subtle);
		transition: transform 160ms ease;
	}
	.docsnav__chevron.is-open {
		transform: rotate(180deg);
	}

	@media (min-width: 900px) {
		.docsnav__toggle {
			display: none;
		}
	}

	.docsnav__panel {
		display: none;
		margin-top: 12px;
		padding-bottom: 8px;
	}
	.docsnav__panel.is-open {
		display: block;
	}

	@media (min-width: 900px) {
		.docsnav__panel {
			display: block;
			margin-top: 0;
		}
	}

	.docsnav__search {
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
	.docsnav__search:focus-within {
		border-color: var(--doc-fg-subtle);
	}
	.docsnav__search input {
		flex: 1;
		min-width: 0;
		border: none;
		outline: none;
		background: none;
		font-family: var(--sve-font-family-sans);
		font-size: 13.5px;
		color: var(--doc-fg);
	}
	.docsnav__search input::placeholder {
		color: var(--doc-fg-subtle);
	}

	.docsnav__nav {
		display: flex;
		flex-direction: column;
		gap: 22px;
	}

	.docsnav__group {
		display: flex;
		flex-direction: column;
		gap: 1px;
	}

	.docsnav__group-label {
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--doc-fg-subtle);
		padding: 0 12px 8px;
	}

	.docsnav__link {
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
	.docsnav__link:hover:not(.is-soon) {
		color: var(--doc-fg);
		background: var(--doc-surface);
	}
	.docsnav__link.is-active {
		color: var(--doc-primary-text);
		background: color-mix(in srgb, var(--sve-color-primary) 12%, transparent);
		font-weight: 600;
	}
	.docsnav__link.is-soon {
		color: var(--doc-fg-subtle);
		cursor: default;
		justify-content: space-between;
	}

	.docsnav__tag,
	.docsnav__soon {
		font-size: 9.5px;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		padding: 2px 6px;
		border-radius: 999px;
	}
	.docsnav__tag {
		background: color-mix(in srgb, var(--sve-color-primary) 16%, transparent);
		color: var(--doc-primary-text);
	}
	.docsnav__soon {
		background: var(--doc-surface-2);
		color: var(--doc-fg-subtle);
	}

	.docsnav__empty {
		font-size: 13.5px;
		color: var(--doc-fg-subtle);
		padding: 0 12px;
	}
</style>
