<script lang="ts">
  import Textarea from '$lib/components/Textarea/Textarea.svelte';

  // Drives a two-way binding so the test can assert bind:value works end-to-end.
  let value = $state('');
</script>

<Textarea bind:value />
<output data-testid="bound">{value}</output>
