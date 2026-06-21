<script lang="ts">
  import AlertTitle from '$lib/components/Alert/AlertTitle.svelte';
  let { as }: { as?: string } = $props();
</script>

<AlertTitle {as}>My title</AlertTitle>
