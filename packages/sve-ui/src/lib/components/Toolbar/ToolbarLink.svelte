<script lang="ts">
  import { Toolbar } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsLinkProps = ComponentProps<typeof Toolbar.Link>;

  interface Props extends Omit<BitsLinkProps, 'class'> {
    /** Extra classes merged onto the link. */
    class?: string;
  }

  let { class: cls, children, ...rest }: Props = $props();
</script>

<!--
  Use this for anything that NAVIGATES, so it stays a real anchor and keeps
  middle-click, open-in-new-tab and the link role. A button that navigates takes
  all of that away.
-->
<Toolbar.Link
  class={['sve-toolbar__link', cls].filter(Boolean).join(' ')}
  data-slot="toolbar-link"
  {children}
  {...rest}
/>

<style>
  :global(.sve-toolbar__link) {
    display: inline-flex;
    align-items: center;
    height: 2rem;
    padding: 0 var(--sve-space-2);
    border-radius: var(--sve-radius-sm);
    font-size: var(--sve-font-size-sm);
    color: var(--sve-color-primary);
    text-decoration: none;
    transition: background-color 0.15s ease;
  }

  :global(.sve-toolbar__link:hover) {
    background-color: var(--sve-color-default);
    text-decoration: underline;
  }

  :global(.sve-toolbar__link:focus-visible) {
    outline: 2px solid var(--sve-color-primary);
    outline-offset: -2px;
  }

  @media (prefers-reduced-motion: reduce) {
    :global(.sve-toolbar__link) {
      transition: none;
    }
  }
</style>
