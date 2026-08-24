<script lang="ts">
	import { AlertDialog } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type BitsCancelProps = ComponentProps<typeof AlertDialog.Cancel>;

	interface Props extends Omit<BitsCancelProps, 'class'> {
		/** Extra classes merged onto the button. */
		class?: string;
	}

	let { class: cls, children, ...rest }: Props = $props();
</script>

<!--
  Bits gives Cancel initial focus, which is the point: the safe choice is the
  one selected by default, so Enter never destroys anything.
-->
<AlertDialog.Cancel
	class={['sve-alert-dialog-cancel', cls].filter(Boolean).join(' ')}
	data-slot="alert-dialog-cancel"
	{children}
	{...rest}
/>

<style>
	:global(.sve-alert-dialog-cancel) {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: 2.5rem;
		padding: 0 var(--sve-space-4);
		border: 1px solid var(--sve-color-default-border);
		border-radius: var(--sve-radius-md);
		background-color: transparent;
		font-family: var(--sve-font-family-sans);
		font-size: var(--sve-font-size-md);
		font-weight: var(--sve-font-weight-medium);
		color: var(--sve-color-default-foreground);
		cursor: pointer;
		transition: background-color 0.15s ease;
	}

	:global(.sve-alert-dialog-cancel:hover) {
		background-color: var(--sve-color-default-surface);
	}

	:global(.sve-alert-dialog-cancel:focus-visible) {
		outline: 2px solid var(--sve-color-primary);
		outline-offset: 2px;
	}

	@media (prefers-reduced-motion: reduce) {
		:global(.sve-alert-dialog-cancel) {
			transition: none;
		}
	}
</style>
