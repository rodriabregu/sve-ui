<script lang="ts">
	import { AlertDialog } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type BitsOverlayProps = ComponentProps<typeof AlertDialog.Overlay>;

	interface Props extends Omit<BitsOverlayProps, 'class'> {
		/** Extra classes merged onto the backdrop. */
		class?: string;
	}

	let { class: cls, ...rest }: Props = $props();
</script>

<!-- Purely visual backdrop; no children forwarded. -->
<AlertDialog.Overlay
	class={['sve-alert-dialog-overlay', cls].filter(Boolean).join(' ')}
	data-slot="alert-dialog-overlay"
	{...rest}
/>

<style>
	:global(.sve-alert-dialog-overlay) {
		position: fixed;
		inset: 0;
		z-index: 50;
		background-color: var(--sve-color-overlay);
	}
</style>
