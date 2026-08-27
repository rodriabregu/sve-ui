<script lang="ts">
	import generated from './generated/props.json';

	export interface PropRow {
		prop: string;
		type: string;
		default?: string;
		description?: string;
		/** Marks a prop the consumer must pass. Rendered as a `required` tag. */
		required?: boolean;
		/**
		 * Set by the generator on props this component INHERITS and forwards rather
		 * than declaring. Shown so a reader knows whose contract they are reading —
		 * the deep behaviour of a Bits prop is documented by Bits.
		 */
		from?: string;
	}

	interface Props {
		/**
		 * Component name as declared in the library source — e.g. `Input`,
		 * `AlertRoot`. Rows come from `generated/props.json`, produced by
		 * `pnpm gen:props` off the real `interface Props`, so they cannot drift.
		 */
		component?: string;
		/** Hand-authored rows. Required when `component` is omitted. */
		rows?: PropRow[];
		/**
		 * Rows appended after the generated ones — for props a component
		 * genuinely forwards but does not declare.
		 */
		extra?: PropRow[];
		/** Generated prop names to drop, for internals not worth documenting. */
		omit?: string[];
	}

	let { component, rows, extra = [], omit = [] }: Props = $props();

	const table = generated as Record<
		string,
		{ props: PropRow[]; spreads?: string | null } | undefined
	>;

	const resolved = $derived.by(() => {
		if (rows) return [...rows, ...extra];

		if (!component) {
			throw new Error('PropsTable needs either a `component` name or explicit `rows`.');
		}

		const entry = table[component];
		if (!entry) {
			// Loud on purpose: a renamed or deleted component must break the build
			// rather than quietly render an empty table.
			throw new Error(
				`PropsTable: no generated props for "${component}". Run \`pnpm gen:props\`, or check the component name.`
			);
		}

		return [...entry.props.filter((p) => !omit.includes(p.prop)), ...extra];
	});
</script>

<div class="props">
	<table class="props__table">
		<thead>
			<tr>
				<th>Prop</th>
				<th>Type</th>
				<th>Default</th>
			</tr>
		</thead>
		<tbody>
			{#each resolved as row (row.prop)}
				<tr>
					<td>
						<code class="props__name doc-mono">{row.prop}</code>
						{#if row.required}
							<span class="props__req">required</span>
						{/if}
						{#if row.from}
							<span
								class="props__from"
								title="Forwarded to {row.from}, which documents its behaviour">{row.from}</span
							>
						{/if}
						{#if row.description}
							<span class="props__desc">{row.description}</span>
						{/if}
					</td>
					<td><code class="props__type doc-mono">{row.type}</code></td>
					<td>
						{#if row.default}
							<code class="props__default doc-mono">{row.default}</code>
						{:else}
							<span class="props__dash">—</span>
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.props {
		border: 1px solid var(--doc-border);
		border-radius: 14px;
		overflow: hidden;
		background: var(--doc-surface);
	}

	.props__table {
		width: 100%;
		border-collapse: collapse;
		font-size: 13.5px;
	}

	.props__table thead th {
		text-align: left;
		padding: 12px 18px;
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--doc-fg-subtle);
		background: var(--doc-surface-2);
		border-bottom: 1px solid var(--doc-border);
	}

	.props__table tbody tr {
		border-bottom: 1px solid var(--doc-border);
	}
	.props__table tbody tr:last-child {
		border-bottom: none;
	}

	.props__table td {
		padding: 14px 18px;
		vertical-align: top;
		color: var(--doc-fg-muted);
	}

	.props__name {
		font-size: 13px;
		font-weight: 600;
		color: var(--doc-fg);
	}
	.props__desc {
		display: block;
		margin-top: 4px;
		font-size: 12.5px;
		color: var(--doc-fg-subtle);
	}
	.props__req {
		margin-left: 6px;
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--doc-primary-text);
		vertical-align: middle;
	}

	.props__from {
		margin-left: 6px;
		padding: 1px 6px;
		border-radius: 999px;
		border: 1px solid var(--doc-border-2);
		font-size: 10.5px;
		font-weight: 600;
		color: var(--doc-fg-subtle);
		vertical-align: middle;
	}
	.props__type {
		font-size: 12.5px;
		color: var(--doc-primary-text);
	}
	.props__default {
		font-size: 12.5px;
		color: var(--doc-fg-muted);
	}
	.props__dash {
		color: var(--doc-fg-subtle);
	}
</style>
