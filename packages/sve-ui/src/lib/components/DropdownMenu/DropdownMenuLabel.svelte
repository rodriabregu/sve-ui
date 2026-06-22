<script lang="ts">
  import { DropdownMenu } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsGroupHeadingProps = ComponentProps<typeof DropdownMenu.GroupHeading>;

  interface Props extends Omit<BitsGroupHeadingProps, 'class'> {
    class?: string;
  }

  let { class: cls, children, ...rest }: Props = $props();
</script>

<!--
  DropdownMenuLabel uses GroupHeading from bits-ui — this is the semantic
  label element for a group of menu items, not the generic Label component.
-->
<DropdownMenu.GroupHeading
  class={['sve-dropdown-label', cls].filter(Boolean).join(' ')}
  {children}
  {...rest}
/>

<style>
  :global(.sve-dropdown-label) {
    padding: var(--sve-space-1) var(--sve-space-2);
    font-size: var(--sve-font-size-xs);
    font-weight: var(--sve-font-weight-bold);
    color: var(--sve-color-default-foreground, #1a202c);
    opacity: 0.6;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
</style>
