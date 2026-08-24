<script lang="ts">
	import type { HTMLTdAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	interface Props extends Omit<HTMLTdAttributes, 'class'> {
		/**
		 * Right-align and use tabular figures.
		 *
		 * Numbers are compared by reading down the column, which only works when
		 * the digits line up: right alignment aligns the units place, and
		 * `tabular-nums` stops a proportional font from giving `1` less width than
		 * `8`. Apply it to the matching `Table.Head` too.
		 * @default false
		 */
		numeric?: boolean;
		/** Extra classes merged onto the `<td>`. */
		class?: string;
		children?: Snippet;
	}

	let { numeric = false, class: cls, children, ...rest }: Props = $props();
</script>

<td
	class={['sve-table__cell', numeric && 'sve-table__cell--numeric', cls].filter(Boolean).join(' ')}
	{...rest}
>
	{@render children?.()}
</td>

<style>
	:global(.sve-table__cell) {
		padding: var(--sve-table-cell-py, var(--sve-space-2)) var(--sve-space-3);
		border-bottom: 1px solid var(--sve-color-default-border);
		vertical-align: middle;
	}

	:global(.sve-table__cell--numeric) {
		text-align: right;
		font-variant-numeric: tabular-nums;
	}
</style>
