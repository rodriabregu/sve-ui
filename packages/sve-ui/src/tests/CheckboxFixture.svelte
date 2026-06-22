<script lang="ts">
  import * as Checkbox from '$lib/components/Checkbox/index.js';

  let { size }: { size?: 'sm' | 'md' | 'lg' } = $props();
  let checked = $state(false);
</script>

<Checkbox.Root bind:checked {size} />
<output data-testid="state">{checked}</output>
