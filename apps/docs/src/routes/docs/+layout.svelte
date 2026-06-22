<script lang="ts">
	import type { Snippet } from 'svelte';
	import DocsNav from '$lib/docs/DocsNav.svelte';
	import { guideGroups } from '$lib/docs/guides';

	let { children }: { children: Snippet } = $props();
</script>

<div class="shell">
	<DocsNav groups={guideGroups} searchLabel="Search docs…" toggleLabel="Browse docs" />
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

	.shell__content {
		min-width: 0;
	}
</style>
