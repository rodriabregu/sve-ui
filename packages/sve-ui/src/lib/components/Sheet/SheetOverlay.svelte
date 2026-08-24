<script lang="ts">
	import { Dialog } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type BitsOverlayProps = ComponentProps<typeof Dialog.Overlay>;

	interface Props extends Omit<BitsOverlayProps, 'class'> {
		/** Extra classes merged onto the backdrop. */
		class?: string;
	}

	let { class: cls, ...rest }: Props = $props();
</script>

<Dialog.Overlay
	class={['sve-sheet-overlay', cls].filter(Boolean).join(' ')}
	data-slot="sheet-overlay"
	{...rest}
/>

<style>
	:global(.sve-sheet-overlay) {
		position: fixed;
		inset: 0;
		z-index: 50;
		background-color: var(--sve-color-overlay);
	}
</style>
