<script lang="ts">
  import * as Dialog from '$lib/components/Dialog/index.js';
</script>

<Dialog.Root>
  <Dialog.Trigger>Open dialog</Dialog.Trigger>

  <Dialog.Content>
    <Dialog.Title>Test Dialog</Dialog.Title>
    <Dialog.Description>A dialog for testing.</Dialog.Description>
    <input type="text" placeholder="Focusable input" />
    <Dialog.Close>Close</Dialog.Close>
  </Dialog.Content>
</Dialog.Root>
