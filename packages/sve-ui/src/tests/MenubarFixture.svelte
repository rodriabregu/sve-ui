<script lang="ts">
  import * as Menubar from '$lib/components/Menubar/index.js';
</script>

<Menubar.Root aria-label="Main">
  <Menubar.Menu>
    <Menubar.Trigger>File</Menubar.Trigger>
    <Menubar.Content>
      <Menubar.Group>
        <Menubar.Label>Document</Menubar.Label>
        <Menubar.Item>New</Menubar.Item>
        <Menubar.Item>Open</Menubar.Item>
      </Menubar.Group>
      <Menubar.Separator />
      <Menubar.Item>Quit</Menubar.Item>
    </Menubar.Content>
  </Menubar.Menu>
  <Menubar.Menu>
    <Menubar.Trigger>Edit</Menubar.Trigger>
    <Menubar.Content>
      <Menubar.Item>Undo</Menubar.Item>
    </Menubar.Content>
  </Menubar.Menu>
</Menubar.Root>
