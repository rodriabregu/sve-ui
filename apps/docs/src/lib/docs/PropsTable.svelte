<script lang="ts">
	export interface PropRow {
		prop: string;
		type: string;
		default?: string;
		description?: string;
	}

	interface Props {
		rows: PropRow[];
	}

	let { rows }: Props = $props();
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
			{#each rows as row (row.prop)}
				<tr>
					<td>
						<code class="props__name doc-mono">{row.prop}</code>
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
