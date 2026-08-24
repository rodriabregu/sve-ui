<script lang="ts">
	import { NavigationMenu } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type BitsContentProps = ComponentProps<typeof NavigationMenu.Content>;

	interface Props extends Omit<BitsContentProps, 'class'> {
		/** Extra classes merged onto the panel. */
		class?: string;
	}

	let { class: cls, children, ...rest }: Props = $props();
</script>

<!--
  Renders inside the Viewport when one is present, which is what lets several
  panels share a single animated container. Without a Viewport it renders in
  place, positioned relative to its trigger.
-->
<NavigationMenu.Content
	class={['sve-nav-menu__content', cls].filter(Boolean).join(' ')}
	data-slot="navigation-menu-content"
	{children}
	{...rest}
/>

<style>
	:global(.sve-nav-menu__content) {
		padding: var(--sve-space-4);
		font-family: var(--sve-font-family-sans);
		font-size: var(--sve-font-size-sm);
		color: var(--sve-color-default-foreground);
	}
</style>
