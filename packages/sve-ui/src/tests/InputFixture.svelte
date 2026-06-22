<script lang="ts">
  import Input from '$lib/components/Input/Input.svelte';

  // Drives a two-way binding so the test can assert bind:value works end-to-end.
  let value = $state('');
</script>

<Input bind:value />
<output data-testid="bound">{value}</output>
