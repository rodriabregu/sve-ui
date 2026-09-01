<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLAttributes<HTMLParagraphElement>, 'class'> {
		/** Extra classes merged onto the element. */
		class?: string;
		children: Snippet;
	}

	let { class: cls, children, ...rest }: Props = $props();

	const className = $derived(['sve-empty__description', cls].filter(Boolean).join(' '));
</script>

<p class={className} {...rest}>
	{@render children()}
</p>

<style>
	.sve-empty__description {
		max-width: 42ch;
		margin: 0;
		font-size: var(--sve-font-size-sm);
		line-height: var(--sve-line-height-relaxed);
		color: var(--sve-color-default-foreground);
		opacity: 0.7;
	}
</style>
