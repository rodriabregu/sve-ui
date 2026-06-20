<script lang="ts">
  import * as Dialog from '$lib/components/Dialog/index.js';
</script>

<Dialog.Root>
  {#snippet children()}
    <Dialog.Trigger>
      {#snippet children()}
        Open dialog
      {/snippet}
    </Dialog.Trigger>

    <Dialog.Content>
      {#snippet children()}
        <Dialog.Title>
          {#snippet children()}
            Test Dialog
          {/snippet}
        </Dialog.Title>
        <Dialog.Description>
          {#snippet children()}
            A dialog for testing.
          {/snippet}
        </Dialog.Description>
        <input type="text" placeholder="Focusable input" />
        <Dialog.Close>
          {#snippet children()}
            Close
          {/snippet}
        </Dialog.Close>
      {/snippet}
    </Dialog.Content>
  {/snippet}
</Dialog.Root>
