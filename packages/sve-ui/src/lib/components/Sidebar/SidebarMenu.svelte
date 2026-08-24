<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLAttributes<HTMLUListElement>, 'class'> {
		/** Extra classes merged onto the list. */
		class?: string;
		children?: Snippet;
	}

	let { class: cls, children, ...rest }: Props = $props();
</script>

<!--
  A real `<ul>`, so a screen reader announces "list, 7 items" and the user knows
  how much nav there is before stepping into it. `Item` renders the `<li>`.
-->
<ul class={['sve-sidebar__menu', cls].filter(Boolean).join(' ')} data-slot="sidebar-menu" {...rest}>
	{@render children?.()}
</ul>

<style>
	.sve-sidebar__menu {
		display: flex;
		flex-direction: column;
		gap: 2px;
		margin: 0;
		padding: 0;
		list-style: none;
	}
</style>
