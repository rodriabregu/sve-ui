<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'class'> {
		/** Extra classes merged onto the group. */
		class?: string;
		children?: Snippet;
	}

	let { class: cls, children, ...rest }: Props = $props();
</script>

<!--
  A labelled section of the sidebar. Pair it with `GroupLabel` and point this
  group's `aria-labelledby` at the label's id — a visual heading that assistive
  technology cannot connect to its items is decoration, not structure.
-->
<div
	role="group"
	class={['sve-sidebar__group', cls].filter(Boolean).join(' ')}
	data-slot="sidebar-group"
	{...rest}
>
	{@render children?.()}
</div>

<style>
	.sve-sidebar__group {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
</style>
