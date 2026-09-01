<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLAttributes<HTMLElement>, 'class'> {
		/**
		 * Heading level, when this empty state sits under a heading that gives it
		 * context. Omit it and the title renders as a `<p>`.
		 *
		 * A heading is not the safe default: an empty state inside a card or a
		 * table cell would inject an `<h3>` into the document outline where no
		 * section exists, and a screen reader user navigating by heading would land
		 * on "No results" as if it were a part of the page.
		 */
		level?: 2 | 3 | 4 | 5 | 6;
		/** Extra classes merged onto the element. */
		class?: string;
		children: Snippet;
	}

	let { level, class: cls, children, ...rest }: Props = $props();

	const className = $derived(['sve-empty__title', cls].filter(Boolean).join(' '));
	const element = $derived(level ? `h${level}` : 'p');
</script>

<svelte:element this={element} class={className} {...rest}>
	{@render children()}
</svelte:element>

<style>
	.sve-empty__title {
		margin: 0;
		font-size: var(--sve-font-size-md);
		font-weight: var(--sve-font-weight-medium);
		line-height: var(--sve-line-height-tight);
		color: var(--sve-color-default-foreground);
	}
</style>
