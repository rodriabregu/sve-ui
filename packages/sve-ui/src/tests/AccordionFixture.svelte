<script lang="ts">
  import * as Accordion from '$lib/components/Accordion/index.js';
</script>

<Accordion.Root type="single">
  <Accordion.Item value="one">
    <Accordion.Header>
      <Accordion.Trigger>First</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Content>First content</Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="two">
    <Accordion.Header>
      <Accordion.Trigger>Second</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Content>Second content</Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
