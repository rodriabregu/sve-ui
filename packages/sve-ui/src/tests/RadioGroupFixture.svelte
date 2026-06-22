<script lang="ts">
  import * as RadioGroup from '$lib/components/RadioGroup/index.js';

  let value = $state('');
</script>

<RadioGroup.Root bind:value>
  <RadioGroup.Item value="a" />
  <RadioGroup.Item value="b" />
</RadioGroup.Root>
<output data-testid="value">{value}</output>
