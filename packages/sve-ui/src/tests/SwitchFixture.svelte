<script lang="ts">
  import * as Switch from '$lib/components/Switch/index.js';

  let { size }: { size?: 'sm' | 'md' | 'lg' } = $props();
  let checked = $state(false);
</script>

<Switch.Root bind:checked {size} />
<output data-testid="state">{checked}</output>
