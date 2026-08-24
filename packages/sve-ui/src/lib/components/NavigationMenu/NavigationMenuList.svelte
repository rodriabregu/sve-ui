<script lang="ts">
	import { NavigationMenu } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type BitsListProps = ComponentProps<typeof NavigationMenu.List>;

	interface Props extends Omit<BitsListProps, 'class'> {
		/** Extra classes merged onto the list. */
		class?: string;
	}

	let { class: cls, children, ...rest }: Props = $props();
</script>

<!-- Bits renders a real <ul>, so the nav is a list of items to a screen reader. -->
<NavigationMenu.List
	class={['sve-nav-menu__list', cls].filter(Boolean).join(' ')}
	data-slot="navigation-menu-list"
	{children}
	{...rest}
/>

<style>
	:global(.sve-nav-menu__list) {
		display: flex;
		align-items: center;
		gap: var(--sve-space-1);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	:global(.sve-nav-menu[data-orientation='vertical'] .sve-nav-menu__list) {
		flex-direction: column;
		align-items: stretch;
	}
</style>
