<script lang="ts">
	import * as Table from '$lib/components/Table/index.js';

	interface Props {
		scrollLabel?: string;
		sort?: 'none' | 'asc' | 'desc';
		onSortChange?: (d: 'none' | 'asc' | 'desc') => void;
		selected?: boolean;
		stickyHeader?: boolean;
		hiddenCaption?: boolean;
	}

	let {
		scrollLabel,
		sort = 'none',
		onSortChange,
		selected = false,
		stickyHeader = false,
		hiddenCaption = false
	}: Props = $props();
</script>

<Table.Root {scrollLabel} {stickyHeader} zebra density="compact">
	<Table.Caption visuallyHidden={hiddenCaption}>Quarterly revenue</Table.Caption>
	<Table.Header>
		<Table.Row>
			<Table.Head>Region</Table.Head>
			<Table.Head sortable {sort} {onSortChange} numeric>Revenue</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		<Table.Row {selected}>
			<Table.RowHeader>Argentina</Table.RowHeader>
			<Table.Cell numeric>1200</Table.Cell>
		</Table.Row>
	</Table.Body>
	<Table.Footer>
		<Table.Row>
			<Table.Cell>Total</Table.Cell>
			<Table.Cell numeric>1200</Table.Cell>
		</Table.Row>
	</Table.Footer>
</Table.Root>
