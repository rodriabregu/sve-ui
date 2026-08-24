<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	interface Props extends Omit<HTMLAttributes<HTMLTableRowElement>, 'class'> {
		/**
		 * Mark the row as selected. This styles the row and sets `data-selected`;
		 * it does NOT set `aria-selected`, which is only valid inside a `grid`,
		 * `listbox` or `treegrid` and is ignored — or reported as an error — on a
		 * plain `<tr>`.
		 *
		 * Selection has to be operable, so put a real `Checkbox` in the first cell
		 * and let this follow its state. Styling alone tells sighted users and
		 * nobody else.
		 * @default false
		 */
		selected?: boolean;
		/** Extra classes merged onto the `<tr>`. */
		class?: string;
		children?: Snippet;
	}

	let { selected = false, class: cls, children, ...rest }: Props = $props();
</script>

<tr
	class={['sve-table__row', selected && 'sve-table__row--selected', cls].filter(Boolean).join(' ')}
	data-selected={selected ? '' : undefined}
	{...rest}
>
	{@render children?.()}
</tr>

<style>
	:global(.sve-table__row--selected) {
		background: var(--sve-color-primary-surface);
	}
</style>
