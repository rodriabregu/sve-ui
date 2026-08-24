<script lang="ts">
	import * as Pagination from '$lib/components/Pagination/index.js';

	interface Props {
		count?: number;
		perPage?: number;
	}

	let { count = 100, perPage = 10 }: Props = $props();

	let page = $state(1);
</script>

<nav aria-label="Pagination">
	<Pagination.Root {count} {perPage} bind:page>
		{#snippet children({ pages })}
			<Pagination.PrevButton aria-label="Previous page">Prev</Pagination.PrevButton>
			{#each pages as p (p.key)}
				{#if p.type === 'page'}
					<Pagination.Page page={p}>{p.value}</Pagination.Page>
				{:else}
					<span data-testid="ellipsis">…</span>
				{/if}
			{/each}
			<Pagination.NextButton aria-label="Next page">Next</Pagination.NextButton>
		{/snippet}
	</Pagination.Root>
</nav>
<output data-testid="page">{page}</output>
