<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { useCarousel } from './context.js';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'class'> {
		/** Extra classes merged onto the scroll container. */
		class?: string;
		children: Snippet;
	}

	let { class: cls, children, ...rest }: Props = $props();

	const ctx = useCarousel();
	let el = $state<HTMLDivElement | undefined>(undefined);

	$effect(() => {
		ctx?.setViewport(el);
		return () => ctx?.setViewport(undefined);
	});

	const className = $derived(
		['sve-carousel__viewport', `sve-carousel__viewport--${ctx?.orientation ?? 'horizontal'}`, cls]
			.filter(Boolean)
			.join(' ')
	);
</script>

<!--
  A scroll container, and deliberately a plain one.

  `tabindex="0"` is NOT set here. A scrollable box is already reachable and
  arrow-scrollable in every browser that supports scroll-snap, and adding a tab
  stop would put an unnamed one in front of the slides' own focusable content.
  The controls are the named, operable affordance.
-->
<div bind:this={el} class={className} {...rest}>
	{@render children()}
</div>

<style>
	.sve-carousel__viewport {
		display: flex;
		overflow: auto;
		scroll-snap-type: both mandatory;
		/*
			Momentum scrolling on iOS, and the reason touch needs no code here: the
			platform already does swipe, fling and rubber-banding better than a
			pointer-event reimplementation would.
		*/
		-webkit-overflow-scrolling: touch;
		scrollbar-width: none;
		gap: var(--sve-space-3);
	}

	.sve-carousel__viewport::-webkit-scrollbar {
		display: none;
	}

	.sve-carousel__viewport--horizontal {
		flex-direction: row;
		scroll-snap-type: x mandatory;
	}

	.sve-carousel__viewport--vertical {
		flex-direction: column;
		scroll-snap-type: y mandatory;
		max-height: 20rem;
	}
</style>
