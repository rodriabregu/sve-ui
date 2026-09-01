<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { useResizable } from './context.js';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'class'> {
		/** Smallest share of the group this pane accepts, in percent. */
		min?: number;
		/** Largest share, in percent. */
		max?: number;
		/** Extra classes merged onto the pane. */
		class?: string;
		children: Snippet;
	}

	let { min = 10, max = 90, class: cls, children, ...rest }: Props = $props();

	const ctx = useResizable();
	// Registered during init, not in an effect: the Handle beside it needs the
	// index and the id on first render, and an effect would run too late.
	// The limits go in as getters so registering once does not freeze them.
	const index = ctx
		? ctx.register({
				get min() {
					return min;
				},
				get max() {
					return max;
				}
			})
		: -1;

	const size = $derived(ctx && index >= 0 ? ctx.sizeOf(index) : 100);
	const className = $derived(['sve-resizable__pane', cls].filter(Boolean).join(' '));
</script>

<!--
  `overflow: hidden` on the pane, not on its content.

  A pane dragged narrower than its content must clip rather than push the
  neighbour, otherwise the sizes the group is tracking stop matching what is on
  screen and every subsequent drag is computed from a stale layout.
-->
<div
	id={ctx && index >= 0 ? ctx.idOf(index) : undefined}
	class={className}
	style="flex-basis: {size}%;"
	{...rest}
>
	{@render children()}
</div>

<style>
	.sve-resizable__pane {
		flex-grow: 0;
		flex-shrink: 0;
		overflow: hidden;
		min-width: 0;
		min-height: 0;
	}
</style>
