<script lang="ts">
  import { Dialog } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsTitleProps = ComponentProps<typeof Dialog.Title>;

  interface Props extends Omit<BitsTitleProps, 'class'> {
    class?: string;
  }

  let { class: cls, level, children, ...rest }: Props = $props();
</script>

<Dialog.Title
  class={['sve-dialog-title', cls].filter(Boolean).join(' ')}
  {level}
  {children}
  {...rest}
/>

<style>
  :global(.sve-dialog-title) {
    font-family: var(--sve-font-family-sans);
    font-size: var(--sve-font-size-lg);
    font-weight: var(--sve-font-weight-bold);
    line-height: var(--sve-line-height-tight);
    color: var(--sve-color-default-foreground);
    margin: 0 0 var(--sve-space-2);
  }
</style>
