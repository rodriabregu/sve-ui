<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Size = 'sm' | 'md';

	interface Props extends Omit<HTMLAttributes<HTMLElement>, 'class'> {
		size?: Size;
		/**
		 * A spoken alternative for the glyph, e.g. `label="Command"` for `⌘`.
		 *
		 * This exists because `⌘`, `⇧` and `⌥` are punctuation to a screen reader:
		 * some voices skip them entirely, others read a name nobody recognises. When
		 * a label is given the glyph is hidden from the accessibility tree and this
		 * text is announced instead, so the shortcut is legible both ways.
		 *
		 * Plain letters and words need no label — `K` and `Esc` already read
		 * correctly.
		 */
		label?: string;
		/** Extra classes merged onto the root element. */
		class?: string;
		children: Snippet;
	}

	let { size = 'md', label, class: cls, children, ...rest }: Props = $props();

	const className = $derived(['sve-kbd', `sve-kbd--${size}`, cls].filter(Boolean).join(' '));
</script>

<!--
  One `<kbd>` per key.

  The HTML spec allows nesting `<kbd>` to group a chord, but every renderer draws
  a box per element, so a nested chord shows a box around boxes. Render one per
  key and let the layout separate them:

    <Kbd label="Command">⌘</Kbd><Kbd>K</Kbd>

  The shortcut still has to be announced on the CONTROL it triggers — that is
  what `aria-keyshortcuts` is for. This component draws the key; it does not tell
  assistive technology that pressing it does anything.
-->
<kbd class={className} {...rest}>
	{#if label}
		<span aria-hidden="true">{@render children()}</span>
		<span class="sve-kbd__label">{label}</span>
	{:else}
		{@render children()}
	{/if}
</kbd>

<style>
	.sve-kbd {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border: 1px solid var(--sve-color-default-border);
		/* A keycap reads as a key because of the bottom edge, not the border. */
		border-bottom-width: 2px;
		border-radius: var(--sve-radius-sm);
		background-color: var(--sve-color-default-surface);
		color: var(--sve-color-default-foreground);
		font-family: var(
			--sve-font-family-mono,
			ui-monospace,
			SFMono-Regular,
			Menlo,
			Monaco,
			Consolas,
			monospace
		);
		font-weight: var(--sve-font-weight-medium);
		line-height: 1;
		white-space: nowrap;
		vertical-align: middle;
	}

	.sve-kbd--sm {
		min-width: 1.25rem;
		height: 1.25rem;
		padding: 0 var(--sve-space-1);
		font-size: var(--sve-font-size-xs);
	}

	.sve-kbd--md {
		min-width: 1.5rem;
		height: 1.5rem;
		padding: 0 var(--sve-space-2);
		font-size: var(--sve-font-size-xs);
	}

	/* Announced, never drawn — the glyph beside it is the visible half. */
	.sve-kbd__label {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
		border-width: 0;
	}
</style>
