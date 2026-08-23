<script lang="ts">
  import * as Toolbar from '$lib/components/Toolbar/index.js';

  let marks = $state<string[]>(['bold']);
</script>

<Toolbar.Root aria-label="Formatting">
  <Toolbar.Group type="multiple" bind:value={marks} aria-label="Text style">
    <Toolbar.GroupItem value="bold" aria-label="Bold">B</Toolbar.GroupItem>
    <Toolbar.GroupItem value="italic" aria-label="Italic">I</Toolbar.GroupItem>
  </Toolbar.Group>
  <Toolbar.Button>Save</Toolbar.Button>
  <Toolbar.Link href="/help">Help</Toolbar.Link>
</Toolbar.Root>
<output data-testid="marks">{marks.join(',')}</output>
