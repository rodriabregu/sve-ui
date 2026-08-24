<script lang="ts">
	import { Command } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type BitsItemProps = ComponentProps<typeof Command.Item>;

	interface Props extends Omit<BitsItemProps, 'class'> {
		/** Extra classes merged onto the item. */
		class?: string;
	}

	let { class: cls, children, ...rest }: Props = $props();
</script>

<!--
  `value` is what gets matched against the query. Add `keywords` for synonyms a
  user might type but that are not in the label — "trash" for a Delete item.
-->
<Command.Item
	class={['sve-command__item', cls].filter(Boolean).join(' ')}
	data-slot="command-item"
	{children}
	{...rest}
/>

<style>
	:global(.sve-command__item) {
		display: flex;
		align-items: center;
		gap: var(--sve-space-2);
		padding: var(--sve-space-2);
		border-radius: var(--sve-radius-sm);
		font-size: var(--sve-font-size-sm);
		cursor: default;
		outline: none;
	}

	/* Bits sets data-selected for both hover and keyboard highlight, so pointer
     and keyboard users get the same affordance from one rule. */
	:global(.sve-command__item[data-selected]) {
		background-color: var(--sve-color-primary-surface);
		color: var(--sve-color-primary);
	}

	:global(.sve-command__item[data-disabled]) {
		opacity: 0.5;
		pointer-events: none;
	}
</style>
