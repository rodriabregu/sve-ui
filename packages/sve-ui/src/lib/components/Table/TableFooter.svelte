<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	interface Props extends Omit<HTMLAttributes<HTMLTableSectionElement>, 'class'> {
		/** Extra classes merged onto the `<tfoot>`. */
		class?: string;
		children?: Snippet;
	}

	let { class: cls, children, ...rest }: Props = $props();
</script>

<!--
  Totals and summaries. Put it in `<tfoot>` rather than as a last body row:
  it is not data, and a screen reader user tabbing through rows should be told
  when the rows stop.
-->
<tfoot class={['sve-table__footer', cls].filter(Boolean).join(' ')} {...rest}>
	{@render children?.()}
</tfoot>

<style>
	:global(.sve-table__footer td),
	:global(.sve-table__footer th) {
		font-weight: 600;
		border-top: 2px solid var(--sve-color-default-border);
	}
</style>
