<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'class'> {
		/** Extra classes merged onto the element. */
		class?: string;
		children: Snippet;
	}

	let { class: cls, children, ...rest }: Props = $props();

	const className = $derived(['sve-empty__media', cls].filter(Boolean).join(' '));
</script>

<!--
  `aria-hidden` is not optional here, it is the point.

  Whatever goes in — an icon, an illustration, a big glyph — is a restatement of
  the title underneath it. Left in the accessibility tree it either announces
  nothing (an inline SVG with no title) or says the same thing twice.
-->
<div class={className} aria-hidden="true" {...rest}>
	{@render children()}
</div>

<style>
	.sve-empty__media {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 3rem;
		height: 3rem;
		border-radius: var(--sve-radius-full);
		background-color: var(--sve-color-default-surface);
		color: var(--sve-color-default-foreground);
		opacity: 0.75;
	}

	.sve-empty__media :global(svg) {
		width: 1.5rem;
		height: 1.5rem;
	}
</style>
