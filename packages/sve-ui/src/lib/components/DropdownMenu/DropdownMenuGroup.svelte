<script lang="ts">
  import { DropdownMenu } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsGroupProps = ComponentProps<typeof DropdownMenu.Group>;

  interface Props extends Omit<BitsGroupProps, 'class'> {
    class?: string;
  }

  let { class: cls, children, ...rest }: Props = $props();
</script>

<DropdownMenu.Group
  class={['sve-dropdown-group', cls].filter(Boolean).join(' ')}
  {children}
  {...rest}
/>
