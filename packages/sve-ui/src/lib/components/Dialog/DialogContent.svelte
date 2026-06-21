<script lang="ts">
  import { Dialog } from 'bits-ui';
  import type { ComponentProps } from 'svelte';
  import DialogOverlay from './DialogOverlay.svelte';

  type BitsContentProps = ComponentProps<typeof Dialog.Content>;

  interface Props extends Omit<BitsContentProps, 'class'> {
    class?: string;
  }

  let { class: cls, children, ...rest }: Props = $props();
</script>

<!--
  DialogContent renders a Portal (managed by bits-ui) that wraps:
  1. DialogOverlay — the backdrop
  2. Dialog.Content — the panel with focus trap, ARIA, ESC handling via Bits UI

  Portal defaults to document.body, keeping z-index stacking clean.
-->
<Dialog.Portal>
  {#snippet children()}
    <DialogOverlay />
    <Dialog.Content
      class={['sve-dialog-content', cls].filter(Boolean).join(' ')}
      {children}
      {...rest}
    />
  {/snippet}
</Dialog.Portal>

<style>
  :global(.sve-dialog-content) {
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 51;
    transform: translate(-50%, -50%);
    width: min(90vw, 28rem);
    max-height: 85vh;
    overflow-y: auto;
    background-color: var(--sve-color-default-surface, #fff);
    border-radius: var(--sve-radius-lg);
    box-shadow: var(--sve-shadow-md);
    padding: var(--sve-space-6);
    outline: none;
  }
</style>
