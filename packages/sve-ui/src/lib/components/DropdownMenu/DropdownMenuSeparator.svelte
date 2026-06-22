<script lang="ts">
  import { DropdownMenu } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsSeparatorProps = ComponentProps<typeof DropdownMenu.Separator>;

  interface Props extends Omit<BitsSeparatorProps, 'class'> {
    class?: string;
  }

  let { class: cls, ...rest }: Props = $props();
</script>

<DropdownMenu.Separator
  class={['sve-dropdown-separator', cls].filter(Boolean).join(' ')}
  {...rest}
/>

<style>
  :global(.sve-dropdown-separator) {
    height: 1px;
    background-color: var(--sve-color-default-border, #e5e7eb);
    margin: var(--sve-space-1) 0;
  }
</style>
