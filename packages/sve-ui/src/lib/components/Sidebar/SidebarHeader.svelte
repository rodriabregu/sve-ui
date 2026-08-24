<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLAttributes<HTMLElement>, 'class'> {
		/** Extra classes merged onto the header. */
		class?: string;
		children?: Snippet;
	}

	let { class: cls, children, ...rest }: Props = $props();
</script>

<!-- Fixed region; it does not scroll with the Content between them. -->
<header
	class={['sve-sidebar__header', cls].filter(Boolean).join(' ')}
	data-slot="sidebar-header"
	{...rest}
>
	{@render children?.()}
</header>

<style>
	.sve-sidebar__header {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		gap: var(--sve-space-2);
		padding: var(--sve-space-3);
		min-height: 3.5rem;
		border-bottom: 1px solid var(--sve-color-default-border);
	}
</style>
