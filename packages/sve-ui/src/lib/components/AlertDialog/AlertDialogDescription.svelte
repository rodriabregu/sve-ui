<script lang="ts">
  import { AlertDialog } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsDescriptionProps = ComponentProps<typeof AlertDialog.Description>;

  interface Props extends Omit<BitsDescriptionProps, 'class'> {
    /** Extra classes merged onto the description. */
    class?: string;
  }

  let { class: cls, children, ...rest }: Props = $props();
</script>

<!--
  Spell out the consequence here. "Are you sure?" is not a description — say
  what will actually happen and whether it can be undone.
-->
<AlertDialog.Description
  class={['sve-alert-dialog-description', cls].filter(Boolean).join(' ')}
  {children}
  {...rest}
/>

<style>
  :global(.sve-alert-dialog-description) {
    font-family: var(--sve-font-family-sans);
    font-size: var(--sve-font-size-sm);
    line-height: var(--sve-line-height-relaxed);
    color: var(--sve-color-default-foreground);
    margin: 0 0 var(--sve-space-4);
    opacity: 0.75;
  }
</style>
