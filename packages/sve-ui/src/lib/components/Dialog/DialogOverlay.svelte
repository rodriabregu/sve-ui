<script lang="ts">
  import { Dialog } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsOverlayProps = ComponentProps<typeof Dialog.Overlay>;

  interface Props extends Omit<BitsOverlayProps, 'class'> {
    class?: string;
  }

  let { class: cls, ...rest }: Props = $props();
</script>

<!--
  Styled wrapper over bits-ui Dialog.Overlay.
  data-slot="dialog-overlay" is used by tests and consumers for targeting.
  No children forwarded — the overlay is a purely visual backdrop element.
-->
<Dialog.Overlay
  class={['sve-dialog-overlay', cls].filter(Boolean).join(' ')}
  data-slot="dialog-overlay"
  {...rest}
/>

<style>
  :global(.sve-dialog-overlay) {
    position: fixed;
    inset: 0;
    z-index: 50;
    background-color: var(--sve-color-overlay);
  }
</style>
