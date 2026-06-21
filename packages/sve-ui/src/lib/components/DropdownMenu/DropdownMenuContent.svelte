<script lang="ts">
  import { DropdownMenu } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsContentProps = ComponentProps<typeof DropdownMenu.Content>;

  interface Props extends Omit<BitsContentProps, 'class'> {
    class?: string;
  }

  let { class: cls, children, ...rest }: Props = $props();
</script>

<!--
  DropdownMenuContent renders via a Portal (managed by bits-ui) that wraps:
  DropdownMenu.Content — the panel with ARIA and keyboard handling via Bits UI.

  Portal defaults to document.body, keeping z-index stacking clean.
-->
<DropdownMenu.Portal>
  {#snippet children()}
    <DropdownMenu.Content
      class={['sve-dropdown-content', cls].filter(Boolean).join(' ')}
      {children}
      {...rest}
    />
  {/snippet}
</DropdownMenu.Portal>

<style>
  :global(.sve-dropdown-content) {
    box-shadow: var(--sve-shadow-md);
    background-color: var(--sve-color-default-surface, #fff);
    border: 1px solid var(--sve-color-default-border, #e5e7eb);
    border-radius: var(--sve-radius-md);
    padding: var(--sve-space-1);
    /* z-index convention: Dialog overlay=50/content=51, Dropdown/Popover=60, Tooltip=70 */
    z-index: 60;
    min-width: 8rem;
    overflow: hidden;
  }
</style>
