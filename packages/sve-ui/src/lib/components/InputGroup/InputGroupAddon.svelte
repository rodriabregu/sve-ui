<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, 'class'> {
		/**
		 * Whether this addon is decoration. Default `true`, which hides it from the
		 * accessibility tree.
		 *
		 * That default is right far more often than it looks. A magnifier icon, a
		 * `$`, a `https://` — these are hints for the eye, and the input's own label
		 * is what has to carry the meaning ("Amount in dollars", not "Amount" beside
		 * a `$` nobody hears).
		 *
		 * Set `decorative={false}` only when the text is the ONLY place the
		 * information exists, and then make sure the input's accessible name still
		 * makes sense on its own — an addon is not a label and cannot become one.
		 */
		decorative?: boolean;
		/** Extra classes merged onto the element. */
		class?: string;
		children: Snippet;
	}

	let { decorative = true, class: cls, children, ...rest }: Props = $props();

	const className = $derived(['sve-input-group__addon', cls].filter(Boolean).join(' '));
</script>

<span class={className} aria-hidden={decorative ? 'true' : undefined} {...rest}>
	{@render children()}
</span>

<style>
	.sve-input-group__addon {
		display: inline-flex;
		flex: 0 0 auto;
		align-items: center;
		gap: var(--sve-space-1);
		padding: 0 var(--sve-space-3);
		background-color: var(--sve-color-default);
		color: var(--sve-color-default-foreground);
		font-size: inherit;
		line-height: 1;
		white-space: nowrap;
		/* Fills the group's height without needing to know the input's size. */
		align-self: stretch;
	}

	.sve-input-group__addon:first-child {
		border-right: 1px solid var(--sve-color-default-border);
	}

	.sve-input-group__addon:last-child {
		border-left: 1px solid var(--sve-color-default-border);
	}

	.sve-input-group__addon :global(svg) {
		width: 1rem;
		height: 1rem;
		opacity: 0.7;
	}
</style>
