<script lang="ts">
  import Stack from '$lib/components/Stack/Stack.svelte';
  import Flex from '$lib/components/Flex/Flex.svelte';
</script>

<Stack gap={6} align="center" as="ul" data-testid="stack">
  <li>one</li>
  <li>two</li>
</Stack>

<Flex direction="column" gap={2} align="baseline" justify="between" wrap as="nav" data-testid="flex">
  <span>a</span>
  <span>b</span>
</Flex>
