<script lang="ts">
  import { untrack } from 'svelte';
  import * as Sidebar from '$lib/components/Sidebar/index.js';

  interface Props {
    collapsible?: 'icon' | 'offcanvas' | 'none';
    startCollapsed?: boolean;
  }

  let { collapsible = 'icon', startCollapsed = false }: Props = $props();

  // Seeding state from a prop captures only its initial value, which is exactly
  // the intent here — `startCollapsed` is a starting point, not a controlled
  // value. `untrack` says so explicitly instead of leaving Svelte to warn about
  // what looks like a mistake.
  let collapsed = $state(untrack(() => startCollapsed));
</script>

<!--
  Provider wraps BOTH the Trigger and the sidebar, because context reaches
  descendants and not siblings. With offcanvas the Trigger must be outside the
  aside, or collapsing hides the only way back.
-->
<Sidebar.Provider bind:collapsed {collapsible} sidebarId="test-sidebar">
  <Sidebar.Trigger>☰</Sidebar.Trigger>

  <Sidebar.Root label="Main navigation">
  <Sidebar.Header>Acme</Sidebar.Header>
  <Sidebar.Content>
    <Sidebar.Group aria-labelledby="grp-platform">
      <Sidebar.GroupLabel id="grp-platform">Platform</Sidebar.GroupLabel>
      <Sidebar.Menu>
        <Sidebar.Item href="/dashboard" active label="Dashboard">Dashboard</Sidebar.Item>
        <Sidebar.Item href="/projects" label="Projects">Projects</Sidebar.Item>
        <Sidebar.Item href="/settings" label="Settings">Settings</Sidebar.Item>
      </Sidebar.Menu>
    </Sidebar.Group>
  </Sidebar.Content>
  <Sidebar.Footer>Account</Sidebar.Footer>
</Sidebar.Root>
</Sidebar.Provider>
<output data-testid="collapsed">{collapsed}</output>
