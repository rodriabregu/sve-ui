<script lang="ts">
	import * as Collapsible from '$lib/components/Collapsible/index.js';

	let open = $state(false);
</script>

<Collapsible.Root bind:open>
	<Collapsible.Trigger>Show details</Collapsible.Trigger>
	<Collapsible.Content>Panel body content.</Collapsible.Content>
</Collapsible.Root>
<output data-testid="open">{open}</output>
