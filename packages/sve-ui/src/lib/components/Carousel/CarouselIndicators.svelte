<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'class' | 'aria-label'> {
		/** Accessible name for the set of dots. Defaults to "Choose slide". */
		label?: string;
		/** Extra classes merged onto the container. */
		class?: string;
		children: Snippet;
	}

	let { label = 'Choose slide', class: cls, children, ...rest }: Props = $props();

	const className = $derived(['sve-carousel__indicators', cls].filter(Boolean).join(' '));
</script>

<!--
  A group of buttons, not a tablist.

  `role="tablist"` would promise arrow-key movement between the dots and a
  `tabpanel` relationship to the slides, neither of which is true here — the
  slides are a scrolling track, not panels that swap. Plain buttons in a named
  group describe what this actually is.
-->
<div class={className} role="group" aria-label={label} {...rest}>
	{@render children()}
</div>

<style>
	.sve-carousel__indicators {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--sve-space-2);
	}
</style>
