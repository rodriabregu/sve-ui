<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'class'> {
		/**
		 * Announce this empty state when it appears.
		 *
		 * Default `false`, and that default is the interesting part. An empty state
		 * present on first paint is just the page — announcing it interrupts a
		 * screen reader reading the heading above it. An empty state that REPLACES
		 * results after a search or a filter is a change the user caused and cannot
		 * see, and silence there reads as "nothing happened".
		 *
		 * So: `announce` on anything that swaps in after an interaction, off for a
		 * first-render placeholder.
		 */
		announce?: boolean;
		/** Extra classes merged onto the root element. */
		class?: string;
		children: Snippet;
	}

	let { announce = false, class: cls, children, ...rest }: Props = $props();

	const className = $derived(['sve-empty', cls].filter(Boolean).join(' '));
</script>

<div
	class={className}
	role={announce ? 'status' : undefined}
	aria-live={announce ? 'polite' : undefined}
	{...rest}
>
	{@render children()}
</div>

<style>
	.sve-empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--sve-space-3);
		padding: var(--sve-space-10) var(--sve-space-6);
		text-align: center;
	}
</style>
