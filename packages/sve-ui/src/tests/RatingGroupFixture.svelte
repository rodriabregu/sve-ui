<script lang="ts">
	import * as RatingGroup from '$lib/components/RatingGroup/index.js';

	interface Props {
		size?: 'sm' | 'md' | 'lg';
	}

	let { size }: Props = $props();

	let value = $state(3);
</script>

<RatingGroup.Root
	bind:value
	max={5}
	{size}
	aria-label="Rating"
	aria-valuetext={(v: number, max: number) => `${v} of ${max} stars`}
>
	{#snippet children({ items })}
		{#each items as item (item.index)}
			<RatingGroup.Item index={item.index}>★</RatingGroup.Item>
		{/each}
	{/snippet}
</RatingGroup.Root>
<output data-testid="value">{value}</output>
