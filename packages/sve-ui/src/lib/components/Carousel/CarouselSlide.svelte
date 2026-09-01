<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { useCarousel } from './context.js';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'class' | 'aria-label'> {
		/**
		 * Overrides the generated "N of M" name.
		 *
		 * Pass something meaningful when the slide has an identity of its own — a
		 * product name beats a position. The default exists because a slide with no
		 * name at all is announced as "group", which tells the user nothing about
		 * where they are.
		 */
		label?: string;
		/** Extra classes merged onto the slide. */
		class?: string;
		children: Snippet;
	}

	let { label, class: cls, children, ...rest }: Props = $props();

	const ctx = useCarousel();
	let el = $state<HTMLDivElement | undefined>(undefined);
	let index = $state(-1);

	/*
		The index is read from the DOM, not from a registration counter.

		A counter handed out at component init drifts the moment slides come from a
		keyed `{#each}` that reorders or removes one, and the position it reports is
		exactly the thing this label promises to be true. Asking the parent where
		this element actually sits cannot drift.
	*/
	$effect(() => {
		if (!el?.parentElement) return;
		const siblings = [...el.parentElement.querySelectorAll('[data-sve-carousel-slide]')];
		index = siblings.indexOf(el);
	});

	const generated = $derived(index >= 0 && ctx?.count ? `${index + 1} of ${ctx.count}` : undefined);

	const className = $derived(
		['sve-carousel__slide', `sve-carousel__slide--${ctx?.orientation ?? 'horizontal'}`, cls]
			.filter(Boolean)
			.join(' ')
	);
</script>

<div
	bind:this={el}
	data-sve-carousel-slide
	class={className}
	role="group"
	aria-roledescription="slide"
	aria-label={label ?? generated}
	{...rest}
>
	{@render children()}
</div>

<style>
	.sve-carousel__slide {
		flex: 0 0 auto;
		scroll-snap-align: start;
		/*
			A slide that can only be partly scrolled to would leave a snap point the
			user can never rest on.
		*/
		scroll-snap-stop: normal;
		min-width: 0;
		min-height: 0;
	}

	.sve-carousel__slide--horizontal {
		width: var(--sve-carousel-slide-size, 100%);
	}

	.sve-carousel__slide--vertical {
		height: var(--sve-carousel-slide-size, 100%);
	}
</style>
