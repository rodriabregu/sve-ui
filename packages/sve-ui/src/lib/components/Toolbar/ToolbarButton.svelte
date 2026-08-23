<script lang="ts">
  import { Toolbar } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsButtonProps = ComponentProps<typeof Toolbar.Button>;

  interface Props extends Omit<BitsButtonProps, 'class'> {
    /** Extra classes merged onto the button. */
    class?: string;
  }

  let { class: cls, children, ...rest }: Props = $props();
</script>

<!-- An icon-only button needs `aria-label`; it has no text to be named by. -->
<Toolbar.Button
  class={['sve-toolbar__button', cls].filter(Boolean).join(' ')}
  data-slot="toolbar-button"
  {children}
  {...rest}
/>

<style>
  :global(.sve-toolbar__button) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--sve-space-2);
    height: 2rem;
    padding: 0 var(--sve-space-2);
    border: none;
    border-radius: var(--sve-radius-sm);
    background-color: transparent;
    font-family: inherit;
    font-size: var(--sve-font-size-sm);
    font-weight: var(--sve-font-weight-medium);
    color: var(--sve-color-default-foreground);
    cursor: pointer;
    transition: background-color 0.15s ease;
  }

  :global(.sve-toolbar__button:hover:not(:disabled)) {
    background-color: var(--sve-color-default);
  }

  :global(.sve-toolbar__button:focus-visible) {
    outline: 2px solid var(--sve-color-primary);
    outline-offset: -2px;
  }

  :global(.sve-toolbar__button:disabled) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (prefers-reduced-motion: reduce) {
    :global(.sve-toolbar__button) {
      transition: none;
    }
  }
</style>
