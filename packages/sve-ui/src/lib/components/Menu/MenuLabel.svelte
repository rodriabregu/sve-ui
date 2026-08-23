<script lang="ts">
  import { DropdownMenu } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsGroupHeadingProps = ComponentProps<typeof DropdownMenu.GroupHeading>;

  interface Props extends Omit<BitsGroupHeadingProps, 'class'> {
    /** Extra classes merged onto the heading. */
    class?: string;
  }

  let { class: cls, children, ...rest }: Props = $props();
</script>

<!--
  This is Bits' GroupHeading — the semantic label for a group of menu items,
  which is what names the group for assistive technology. It is not the generic
  `Label` form component.
-->
<DropdownMenu.GroupHeading
  class={['sve-menu-label', cls].filter(Boolean).join(' ')}
  data-slot="menu-label"
  {children}
  {...rest}
/>

<style>
  :global(.sve-menu-label) {
    padding: var(--sve-space-1) var(--sve-space-2);
    font-size: var(--sve-font-size-xs);
    font-weight: var(--sve-font-weight-bold);
    color: var(--sve-color-default-foreground, #1a202c);
    opacity: 0.6;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
</style>
