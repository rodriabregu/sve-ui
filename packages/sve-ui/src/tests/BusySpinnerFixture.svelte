<script lang="ts">
	import Busy from '$lib/components/Busy/Busy.svelte';
	import Spinner from '$lib/components/Spinner/Spinner.svelte';
</script>

<Busy busy={true} label="Loading projects" doneLabel="3 projects loaded">
	<Spinner />
</Busy>
