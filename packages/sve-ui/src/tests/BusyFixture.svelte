<script lang="ts">
	import Busy from '$lib/components/Busy/Busy.svelte';

	interface Props {
		busy?: boolean;
		label?: string;
		doneLabel?: string;
		/** Passing `doneLabel: undefined` would hit the default below, so this is
		    how a test exercises the omitted case. */
		noDone?: boolean;
		delay?: number;
	}

	let {
		busy = true,
		label = 'Loading projects',
		doneLabel = '3 projects',
		noDone = false,
		delay
	}: Props = $props();
</script>

<Busy {busy} {label} doneLabel={noDone ? undefined : doneLabel} {delay}>
	<p>content</p>
</Busy>
