<script lang="ts">
	import type { HTMLThAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	type SortDirection = 'none' | 'asc' | 'desc';

	interface Props extends Omit<HTMLThAttributes, 'class' | 'scope' | 'onclick'> {
		/**
		 * Render the label as a button and expose `aria-sort`.
		 *
		 * A clickable `<th>` is not focusable and not operable by keyboard, so the
		 * control has to be a real `<button>` inside the cell.
		 * @default false
		 */
		sortable?: boolean;
		/**
		 * Current sort of this column. Only ONE column should be anything other
		 * than `'none'` unless you genuinely sort by several at once — `aria-sort`
		 * on two columns claims a sort order the data does not have.
		 * @default 'none'
		 */
		sort?: SortDirection;
		/**
		 * Called with the next direction when the header is activated, cycling
		 * none → asc → desc → none.
		 *
		 * This component does NOT sort your data. Sorting is application logic: it
		 * may be server-side, it interacts with pagination, and comparing text
		 * correctly needs an `Intl.Collator` for the user's locale. Announcing a
		 * sort you did not apply is a lie to assistive technology.
		 */
		onSortChange?: (direction: SortDirection) => void;
		/**
		 * Right-align and use tabular figures, for a column of numbers.
		 * @default false
		 */
		numeric?: boolean;
		/** Extra classes merged onto the `<th>`. */
		class?: string;
		children?: Snippet;
	}

	let {
		sortable = false,
		sort = 'none',
		onSortChange,
		numeric = false,
		class: cls,
		children,
		...rest
	}: Props = $props();

	const ariaSort = $derived(sort === 'asc' ? 'ascending' : sort === 'desc' ? 'descending' : 'none');

	const next = $derived<SortDirection>(sort === 'none' ? 'asc' : sort === 'asc' ? 'desc' : 'none');

	// The third state matters: without it there is no way back to the order the
	// rows arrived in, which is often meaningful on its own.
	const indicator = $derived(sort === 'asc' ? '↑' : sort === 'desc' ? '↓' : '↕');
</script>

<th
	scope="col"
	class={['sve-table__head', numeric && 'sve-table__cell--numeric', cls].filter(Boolean).join(' ')}
	aria-sort={sortable ? ariaSort : undefined}
	{...rest}
>
	{#if sortable}
		<button type="button" class="sve-table__sort" onclick={() => onSortChange?.(next)}>
			{@render children?.()}
			<!-- Decorative: `aria-sort` on the cell already carries the state, and
           announcing an arrow glyph on top of it says it twice. -->
			<span class="sve-table__sort-icon" aria-hidden="true">{indicator}</span>
		</button>
	{:else}
		{@render children?.()}
	{/if}
</th>

<style>
	:global(.sve-table__head) {
		padding: var(--sve-table-cell-py, var(--sve-space-2)) var(--sve-space-3);
		font-weight: 600;
		text-align: inherit;
		white-space: nowrap;
		border-bottom: 1px solid var(--sve-color-default-border);
		color: var(--sve-color-default-foreground);
	}

	.sve-table__sort {
		display: inline-flex;
		align-items: center;
		gap: var(--sve-space-1);
		/* A header button should look like a header, not a button. */
		padding: 0;
		border: 0;
		background: none;
		font: inherit;
		color: inherit;
		cursor: pointer;
		border-radius: var(--sve-radius-sm);
	}

	.sve-table__sort:focus-visible {
		outline: 2px solid var(--sve-color-primary);
		outline-offset: 2px;
	}

	.sve-table__sort-icon {
		font-size: 0.85em;
		opacity: 0.7;
	}
</style>
