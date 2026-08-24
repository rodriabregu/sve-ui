<script module lang="ts">
	export type Variant = 'text' | 'circle' | 'rect';
</script>

<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'class'> {
		variant?: Variant;
		/** Any CSS length. Defaults to `100%`. */
		width?: string;
		/** Any CSS length. Defaults to the variant's intrinsic height. */
		height?: string;
		class?: string;
	}

	let { variant = 'text', width, height, class: cls, ...rest }: Props = $props();

	const className = $derived(
		['sve-skeleton', `sve-skeleton--${variant}`, cls].filter(Boolean).join(' ')
	);
</script>

<!--
  Accessibility: a skeleton is a decorative placeholder, so it is hidden from
  assistive technology. Announce the loading state on the region that owns it:
  <div role="status" aria-busy="true" aria-label="Loading profile">…</div>
-->
<div class={className} style:width style:height aria-hidden="true" {...rest}></div>

<style>
	.sve-skeleton {
		display: block;
		width: 100%;
		flex-shrink: 0;
		background-color: var(--sve-color-default-surface);
		background-image: linear-gradient(
			90deg,
			transparent 0%,
			var(--sve-color-default) 50%,
			transparent 100%
		);
		background-size: 200% 100%;
		background-repeat: no-repeat;
		animation: sve-skeleton-shimmer 1.4s ease-in-out infinite;
	}

	/* --- Variants --- */
	.sve-skeleton--text {
		height: 1em;
		border-radius: var(--sve-radius-sm);
	}

	.sve-skeleton--rect {
		height: 6rem;
		border-radius: var(--sve-radius-md);
	}

	.sve-skeleton--circle {
		width: 2.5rem;
		height: 2.5rem;
		border-radius: var(--sve-radius-full);
	}

	/* Respect the user's motion preference — the placeholder stays, the shimmer goes */
	@media (prefers-reduced-motion: reduce) {
		.sve-skeleton {
			animation: none;
			background-image: none;
		}
	}

	@keyframes sve-skeleton-shimmer {
		from {
			background-position: 200% 0;
		}
		to {
			background-position: -200% 0;
		}
	}
</style>
