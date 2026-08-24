<script lang="ts">
	import { ScrollArea } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type BitsScrollbarProps = ComponentProps<typeof ScrollArea.Scrollbar>;

	interface Props extends Omit<BitsScrollbarProps, 'class'> {
		/** Extra classes merged onto the scrollbar track. */
		class?: string;
	}

	let { class: cls, orientation, children, ...rest }: Props = $props();
</script>

<!-- `orientation` is required by Bits; render one per axis you want styled. -->
<ScrollArea.Scrollbar
	{orientation}
	class={['sve-scroll-area__scrollbar', cls].filter(Boolean).join(' ')}
	data-slot="scroll-area-scrollbar"
	{children}
	{...rest}
/>

<style>
	:global(.sve-scroll-area__scrollbar) {
		display: flex;
		user-select: none;
		touch-action: none;
		background-color: transparent;
		transition: background-color 0.15s ease;
	}

	:global(.sve-scroll-area__scrollbar:hover) {
		background-color: var(--sve-color-default-surface);
	}

	:global(.sve-scroll-area__scrollbar[data-orientation='vertical']) {
		width: 0.625rem;
		padding: 2px;
	}

	:global(.sve-scroll-area__scrollbar[data-orientation='horizontal']) {
		flex-direction: column;
		height: 0.625rem;
		padding: 2px;
	}

	@media (prefers-reduced-motion: reduce) {
		:global(.sve-scroll-area__scrollbar) {
			transition: none;
		}
	}
</style>
