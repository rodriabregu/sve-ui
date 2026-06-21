<script lang="ts">
  import { Popover } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsContentProps = ComponentProps<typeof Popover.Content>;

  interface Props extends Omit<BitsContentProps, 'class'> {
    class?: string;
  }

  let { class: cls, children, ...rest }: Props = $props();
</script>

<!--
  PopoverContent renders via a Portal (managed by bits-ui) that wraps:
  Popover.Content — the floating panel with ARIA and positioning via Bits UI.

  Portal defaults to document.body, keeping z-index stacking clean.
-->
<Popover.Portal>
  {#snippet children()}
    <Popover.Content
      class={['sve-popover-content', cls].filter(Boolean).join(' ')}
      {children}
      {...rest}
    />
  {/snippet}
</Popover.Portal>

<style>
  :global(.sve-popover-content) {
    background-color: var(--sve-color-default-surface, #fff);
    border: 1px solid var(--sve-color-default-border, #e5e7eb);
    border-radius: var(--sve-radius-md);
    box-shadow: var(--sve-shadow-md);
    padding: var(--sve-space-4);
    /* z-index convention: Dialog overlay=50/content=51, Dropdown/Popover=60, Tooltip=70 */
    z-index: 60;
    min-width: 10rem;
    max-width: 20rem;
  }
</style>
