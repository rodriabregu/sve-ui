<script module lang="ts">
	export type Type = 'hover' | 'scroll' | 'auto' | 'always';
</script>

<script lang="ts">
	import { ScrollArea } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type BitsRootProps = ComponentProps<typeof ScrollArea.Root>;

	interface Props extends Omit<BitsRootProps, 'class' | 'type'> {
		/**
		 * When the scrollbars are visible. `hover` shows them on pointer hover,
		 * `always` keeps them visible, `auto` follows the platform, `scroll` shows
		 * them only while scrolling.
		 * @default 'hover'
		 */
		type?: Type;
		/** Extra classes merged onto the root. */
		class?: string;
	}

	let { type = 'hover', class: cls, children, ...rest }: Props = $props();
</script>

<!--
  A styled scrollbar is a cosmetic upgrade with a real cost: `hover` and
  `scroll` hide the scrollbar until the user interacts, which removes the visual
  cue that there IS more content. Prefer `always` when the overflow is not
  otherwise obvious.

  Native keyboard scrolling and wheel behaviour are preserved by Bits — the
  viewport is a real scroll container, so this never traps a keyboard user.
-->
<ScrollArea.Root
	{type}
	class={['sve-scroll-area', cls].filter(Boolean).join(' ')}
	data-slot="scroll-area"
	{children}
	{...rest}
/>

<style>
	:global(.sve-scroll-area) {
		position: relative;
		overflow: hidden;
		font-family: var(--sve-font-family-sans);
	}
</style>
