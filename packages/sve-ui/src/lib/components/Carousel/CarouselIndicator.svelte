<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { useCarousel } from './context.js';

	interface Props extends Omit<HTMLButtonAttributes, 'class' | 'aria-label'> {
		/** Zero-based index of the slide this dot scrolls to. */
		index: number;
		/** Accessible name. Defaults to "Go to slide N". */
		label?: string;
		/** Extra classes merged onto the button. */
		class?: string;
	}

	let { index, label, class: cls, ...rest }: Props = $props();

	const ctx = useCarousel();
	const current = $derived(ctx?.active === index);

	const className = $derived(
		['sve-carousel__indicator', current && 'sve-carousel__indicator--current', cls]
			.filter(Boolean)
			.join(' ')
	);
</script>

<!--
  `aria-current`, not `aria-selected`.

  `aria-selected` is only valid on a handful of roles — none of which a button in
  a group has — so it would be ignored, leaving the active dot distinguished by
  colour alone: visible to sighted users and to nobody else.
-->
<button
	type="button"
	class={className}
	aria-label={label ?? `Go to slide ${index + 1}`}
	aria-current={current ? 'true' : undefined}
	onclick={() => ctx?.goTo(index)}
	{...rest}
></button>

<style>
	.sve-carousel__indicator {
		width: 0.5rem;
		height: 0.5rem;
		padding: 0;
		border: none;
		border-radius: var(--sve-radius-full);
		background-color: var(--sve-color-default-border);
		cursor: pointer;
		transition:
			background-color 0.15s ease,
			transform 0.15s ease;
	}

	.sve-carousel__indicator:hover {
		background-color: var(--sve-color-default-foreground);
	}

	.sve-carousel__indicator:focus-visible {
		outline: 2px solid var(--sve-color-primary);
		outline-offset: 2px;
	}

	.sve-carousel__indicator--current {
		background-color: var(--sve-color-primary);
		transform: scale(1.35);
	}
</style>
