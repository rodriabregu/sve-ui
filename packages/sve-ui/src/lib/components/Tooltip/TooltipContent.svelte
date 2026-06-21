<script lang="ts">
  import { Tooltip } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsContentProps = ComponentProps<typeof Tooltip.Content>;

  interface Props extends Omit<BitsContentProps, 'class'> {
    class?: string;
  }

  let { class: cls, children, ...rest }: Props = $props();
</script>

<!--
  TooltipContent renders via a Portal (managed by bits-ui) that wraps:
  Tooltip.Content — the floating content element with ARIA and positioning via Bits UI.

  Portal defaults to document.body, keeping z-index stacking clean.
-->
<Tooltip.Portal>
  {#snippet children()}
    <Tooltip.Content
      class={['sve-tooltip-content', cls].filter(Boolean).join(' ')}
      {children}
      {...rest}
    />
  {/snippet}
</Tooltip.Portal>

<style>
  :global(.sve-tooltip-content) {
    background-color: var(--sve-color-default-foreground, #1a202c);
    color: var(--sve-color-default-surface, #f7fafc);
    border-radius: var(--sve-radius-sm);
    padding: var(--sve-space-1) var(--sve-space-2);
    font-size: var(--sve-font-size-xs);
    box-shadow: var(--sve-shadow-md);
    /* z-index convention: Dialog overlay=50/content=51, Dropdown/Popover=60, Tooltip=70 */
    z-index: 70;
    max-width: 20rem;
    word-break: break-word;
  }
</style>
