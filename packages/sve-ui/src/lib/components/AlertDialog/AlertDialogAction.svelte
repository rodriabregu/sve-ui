<script module lang="ts">
  export type Color = 'danger' | 'primary';
</script>

<script lang="ts">
  import { AlertDialog } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsActionProps = ComponentProps<typeof AlertDialog.Action>;

  interface Props extends Omit<BitsActionProps, 'class'> {
    /**
     * Tone of the confirming button. `danger` is the default because an alert
     * dialog usually guards a destructive action.
     * @default 'danger'
     */
    color?: Color;
    /** Extra classes merged onto the button. */
    class?: string;
  }

  let { color = 'danger', class: cls, children, ...rest }: Props = $props();
</script>

<!--
  Label this with the verb, not "OK". "Delete project" tells the user what they
  are about to do; "OK" makes them re-read the description to find out.
-->
<AlertDialog.Action
  class={['sve-alert-dialog-action', `sve-c-${color}`, cls].filter(Boolean).join(' ')}
  data-slot="alert-dialog-action"
  {children}
  {...rest}
/>

<style>
  :global(.sve-alert-dialog-action) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 2.5rem;
    padding: 0 var(--sve-space-4);
    border: 1px solid transparent;
    border-radius: var(--sve-radius-md);
    font-family: var(--sve-font-family-sans);
    font-size: var(--sve-font-size-md);
    font-weight: var(--sve-font-weight-medium);
    color: currentColor;
    cursor: pointer;
    transition: filter 0.15s ease;
  }

  :global(.sve-alert-dialog-action.sve-c-danger) {
    background-color: var(--sve-color-danger);
    color: var(--sve-color-danger-foreground);
  }

  :global(.sve-alert-dialog-action.sve-c-primary) {
    background-color: var(--sve-color-primary);
    color: var(--sve-color-primary-foreground);
  }

  :global(.sve-alert-dialog-action:hover) {
    filter: brightness(0.94);
  }

  :global(.sve-alert-dialog-action:focus-visible) {
    outline: 2px solid var(--sve-color-primary);
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    :global(.sve-alert-dialog-action) {
      transition: none;
    }
  }
</style>
