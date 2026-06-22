<script lang="ts">
  import * as Tabs from '$lib/components/Tabs/index.js';

  let value = $state('account');
</script>

<Tabs.Root bind:value>
  <Tabs.List>
    <Tabs.Trigger value="account">Account</Tabs.Trigger>
    <Tabs.Trigger value="password">Password</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="account">Account panel</Tabs.Content>
  <Tabs.Content value="password">Password panel</Tabs.Content>
</Tabs.Root>
<output data-testid="value">{value}</output>
