<script lang="ts">
	import { ContextMenu } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type BitsContentProps = ComponentProps<typeof ContextMenu.Content>;

	interface Props extends Omit<BitsContentProps, 'class'> {
		/** Extra classes merged onto the menu panel. */
		class?: string;
	}

	let { class: cls, children, ...rest }: Props = $props();
</script>

<!--
  Renders through a Portal (managed by Bits) so z-index stacking stays clean.
  Bits positions the panel at the pointer and owns role="menu", roving focus and
  keyboard navigation.
-->
<ContextMenu.Portal>
	<ContextMenu.Content
		class={['sve-context-menu-content', cls].filter(Boolean).join(' ')}
		data-slot="context-menu-content"
		{children}
		{...rest}
	/>
</ContextMenu.Portal>

<style>
	:global(.sve-context-menu-content) {
		background-color: var(--sve-color-default-surface, #fff);
		border: 1px solid var(--sve-color-default-border, #e5e7eb);
		border-radius: var(--sve-radius-md);
		box-shadow: var(--sve-shadow-md);
		padding: var(--sve-space-1);
		/* z-index convention: Dialog overlay=50/content=51, Dropdown/Popover=60, Tooltip=70 */
		z-index: 60;
		min-width: 10rem;
		font-family: var(--sve-font-family-sans);
	}
</style>
