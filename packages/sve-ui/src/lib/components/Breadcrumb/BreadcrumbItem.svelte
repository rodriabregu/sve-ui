<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLLiAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLLiAttributes, 'class'> {
		/** Extra classes merged onto the item. */
		class?: string;
		/** A `Breadcrumb.Link`, or plain text for the current page. */
		children?: Snippet;
	}

	let { class: cls, children, ...rest }: Props = $props();
</script>

<li
	class={['sve-breadcrumb__item', cls].filter(Boolean).join(' ')}
	data-slot="breadcrumb-item"
	{...rest}
>
	{@render children?.()}
</li>

<style>
	.sve-breadcrumb__item {
		display: inline-flex;
		align-items: center;
		gap: var(--sve-space-2);
	}
</style>
