<script lang="ts">
	import { AlertDialog } from 'bits-ui';
	import type { ComponentProps } from 'svelte';
	import AlertDialogOverlay from './AlertDialogOverlay.svelte';

	type BitsContentProps = ComponentProps<typeof AlertDialog.Content>;

	interface Props extends Omit<BitsContentProps, 'class'> {
		/** Extra classes merged onto the panel. */
		class?: string;
	}

	let { class: cls, children, ...rest }: Props = $props();
</script>

<!--
  Portals to <body> and renders the backdrop plus the panel, so consumers never
  manage portaling. Bits owns the focus trap, ARIA and `role="alertdialog"`.

  The behavioural difference from Dialog is deliberate: Bits omits
  `onInteractOutside` here, so clicking the backdrop does NOT dismiss. A
  destructive confirmation should not be dismissible by a stray click — the user
  has to choose Action or Cancel.
-->
<AlertDialog.Portal>
	<AlertDialogOverlay />
	<AlertDialog.Content
		class={['sve-alert-dialog-content', cls].filter(Boolean).join(' ')}
		data-slot="alert-dialog-content"
		{children}
		{...rest}
	/>
</AlertDialog.Portal>

<style>
	:global(.sve-alert-dialog-content) {
		position: fixed;
		left: 50%;
		top: 50%;
		z-index: 51;
		transform: translate(-50%, -50%);
		width: min(90vw, 26rem);
		max-height: 85vh;
		overflow-y: auto;
		background-color: var(--sve-color-default-surface, #fff);
		border-radius: var(--sve-radius-lg);
		box-shadow: var(--sve-shadow-md);
		padding: var(--sve-space-6);
		outline: none;
	}
</style>
