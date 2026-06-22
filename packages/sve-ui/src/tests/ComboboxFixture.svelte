<script lang="ts">
  import * as Combobox from '$lib/components/Combobox/index.js';

  let value = $state('');
</script>

<Combobox.Root type="single" bind:value>
  <Combobox.Input placeholder="Search fruit…" />
  <Combobox.Content>
    <Combobox.Item value="apple" label="Apple">Apple</Combobox.Item>
    <Combobox.Item value="banana" label="Banana">Banana</Combobox.Item>
  </Combobox.Content>
</Combobox.Root>
<output data-testid="value">{value}</output>
