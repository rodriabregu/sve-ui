<script lang="ts">
	import * as PinInput from '$lib/components/PinInput/index.js';

	interface Props {
		maxlength?: number;
	}

	// Separate from PinInputFixture, which the older suite uses and which I
	// overwrote once by not checking whether the name was taken.
	let { maxlength = 6 }: Props = $props();

	let value = $state('');
</script>

<PinInput.Root bind:value {maxlength} aria-label="Verification code">
	{#snippet children({ cells })}
		{#each cells as cell, i (i)}
			<PinInput.Cell {cell} />
		{/each}
	{/snippet}
</PinInput.Root>
