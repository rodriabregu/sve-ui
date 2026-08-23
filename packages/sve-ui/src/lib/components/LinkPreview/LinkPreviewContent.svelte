<script lang="ts">
  import { LinkPreview } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsContentProps = ComponentProps<typeof LinkPreview.Content>;

  interface Props extends Omit<BitsContentProps, 'class'> {
    /** Extra classes merged onto the floating card. */
    class?: string;
  }

  let { class: cls, children, ...rest }: Props = $props();
</script>

<!--
  Renders through a Portal (managed by Bits) so z-index stacking stays clean.

  A link preview is HOVER-ONLY enrichment: it never appears on touch devices and
  never receives focus, so anything inside it must be available elsewhere too.
  Never put the only copy of an action or a piece of information in here.
-->
<LinkPreview.Portal>
  <LinkPreview.Content
    class={['sve-link-preview-content', cls].filter(Boolean).join(' ')}
    data-slot="link-preview-content"
    {children}
    {...rest}
  />
</LinkPreview.Portal>

<style>
  :global(.sve-link-preview-content) {
    background-color: var(--sve-color-default-surface, #fff);
    border: 1px solid var(--sve-color-default-border, #e5e7eb);
    border-radius: var(--sve-radius-md);
    box-shadow: var(--sve-shadow-md);
    padding: var(--sve-space-4);
    /* z-index convention: Dialog overlay=50/content=51, Dropdown/Popover=60, Tooltip=70 */
    z-index: 60;
    width: max-content;
    max-width: 20rem;
    font-family: var(--sve-font-family-sans);
    font-size: var(--sve-font-size-sm);
    line-height: var(--sve-line-height-normal);
    color: var(--sve-color-default-foreground);
  }
</style>
