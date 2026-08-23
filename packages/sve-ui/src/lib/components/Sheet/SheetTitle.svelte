<script lang="ts">
  import { Dialog } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsTitleProps = ComponentProps<typeof Dialog.Title>;

  interface Props extends Omit<BitsTitleProps, 'class'> {
    /** Extra classes merged onto the title. */
    class?: string;
  }

  let { class: cls, level, children, ...rest }: Props = $props();
</script>

<!-- Bits points the sheet's `aria-labelledby` here, so it is not optional. -->
<Dialog.Title
  class={['sve-sheet-title', cls].filter(Boolean).join(' ')}
  {level}
  {children}
  {...rest}
/>

<style>
  :global(.sve-sheet-title) {
    font-family: var(--sve-font-family-sans);
    font-size: var(--sve-font-size-lg);
    font-weight: var(--sve-font-weight-bold);
    line-height: var(--sve-line-height-tight);
    color: var(--sve-color-default-foreground);
    margin: 0;
  }
</style>
