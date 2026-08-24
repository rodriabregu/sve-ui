<script lang="ts">
	import type { HTMLThAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	interface Props extends Omit<HTMLThAttributes, 'class' | 'scope'> {
		/** Extra classes merged onto the `<th>`. */
		class?: string;
		children?: Snippet;
	}

	let { class: cls, children, ...rest }: Props = $props();
</script>

<!--
  `<th scope="row">` for the cell that identifies the row — a name, an order
  number, an SKU.

  This is what makes a wide table navigable: a screen reader reading cell 7 of
  row 12 announces the row header with it, so "4.2%" becomes "Bounce rate,
  Argentina, 4.2%". Without it the value has a column but no subject.
-->
<th scope="row" class={['sve-table__rowheader', cls].filter(Boolean).join(' ')} {...rest}>
	{@render children?.()}
</th>

<style>
	:global(.sve-table__rowheader) {
		padding: var(--sve-table-cell-py, var(--sve-space-2)) var(--sve-space-3);
		font-weight: 500;
		text-align: inherit;
		border-bottom: 1px solid var(--sve-color-default-border);
	}
</style>
