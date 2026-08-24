<script lang="ts">
	import { ScrollArea } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type BitsThumbProps = ComponentProps<typeof ScrollArea.Thumb>;

	interface Props extends Omit<BitsThumbProps, 'class'> {
		/** Extra classes merged onto the thumb. */
		class?: string;
	}

	let { class: cls, ...rest }: Props = $props();
</script>

<ScrollArea.Thumb
	class={['sve-scroll-area__thumb', cls].filter(Boolean).join(' ')}
	data-slot="scroll-area-thumb"
	{...rest}
/>

<style>
	:global(.sve-scroll-area__thumb) {
		position: relative;
		flex: 1;
		border-radius: var(--sve-radius-full);
		background-color: var(--sve-color-default);
	}

	/* Widen the hit target beyond the visual thumb — a 10px drag handle is hard
     to grab, especially with a trackpad. */
	:global(.sve-scroll-area__thumb::before) {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		height: 100%;
		min-width: 2.75rem;
		min-height: 2.75rem;
	}
</style>
