<script lang="ts">
  import * as Accordion from '$lib/components/Accordion/index.js';

  let value = $state('');
</script>

<Accordion.Root type="single" bind:value>
  <Accordion.Item value="one">
    <Accordion.Header><Accordion.Trigger>First</Accordion.Trigger></Accordion.Header>
    <Accordion.Content>First content</Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
<output data-testid="value">{value}</output>
