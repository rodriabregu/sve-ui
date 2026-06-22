<script lang="ts">
  import * as Select from '$lib/components/Select/index.js';

  let value = $state('');
</script>

<Select.Root type="single" bind:value>
  <Select.Trigger>{value || 'Pick a fruit'}</Select.Trigger>
  <Select.Content>
    <Select.Item value="apple" label="Apple">Apple</Select.Item>
    <Select.Item value="banana" label="Banana">Banana</Select.Item>
  </Select.Content>
</Select.Root>
<output data-testid="value">{value}</output>
