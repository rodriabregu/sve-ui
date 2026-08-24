<script lang="ts">
	import { NavigationMenu } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type BitsViewportProps = ComponentProps<typeof NavigationMenu.Viewport>;

	interface Props extends Omit<BitsViewportProps, 'class'> {
		/** Extra classes merged onto the viewport. */
		class?: string;
	}

	let { class: cls, ...rest }: Props = $props();
</script>

<!--
  Optional. It gives every Content panel one shared container, so switching
  between menus resizes a single surface instead of swapping two boxes. Bits
  publishes the measured size as --bits-navigation-menu-viewport-width/height.
-->
<NavigationMenu.Viewport
	class={['sve-nav-menu__viewport', cls].filter(Boolean).join(' ')}
	data-slot="navigation-menu-viewport"
	{...rest}
/>

<style>
	:global(.sve-nav-menu__viewport) {
		position: relative;
		overflow: hidden;
		width: var(--bits-navigation-menu-viewport-width);
		height: var(--bits-navigation-menu-viewport-height);
		margin-top: var(--sve-space-2);
		border: 1px solid var(--sve-color-default-border);
		border-radius: var(--sve-radius-md);
		background-color: var(--sve-color-default-surface);
		box-shadow: var(--sve-shadow-md);
		transition:
			width 0.2s ease,
			height 0.2s ease;
	}

	@media (prefers-reduced-motion: reduce) {
		:global(.sve-nav-menu__viewport) {
			transition: none;
		}
	}
</style>
