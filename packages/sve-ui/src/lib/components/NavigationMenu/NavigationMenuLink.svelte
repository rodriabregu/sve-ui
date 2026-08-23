<script lang="ts">
  import { NavigationMenu } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsLinkProps = ComponentProps<typeof NavigationMenu.Link>;

  interface Props extends Omit<BitsLinkProps, 'class'> {
    /** Extra classes merged onto the link. */
    class?: string;
  }

  let { class: cls, children, ...rest }: Props = $props();
</script>

<!--
  A real anchor, so middle-click and open-in-new-tab keep working. Set `active`
  to mark the current page — Bits then reports `aria-current="page"`, which is
  the difference between "this looks highlighted" and "this is announced as
  where you are".
-->
<NavigationMenu.Link
  class={['sve-nav-menu__link', cls].filter(Boolean).join(' ')}
  data-slot="navigation-menu-link"
  {children}
  {...rest}
/>

<style>
  :global(.sve-nav-menu__link) {
    display: block;
    padding: var(--sve-space-2);
    border-radius: var(--sve-radius-sm);
    color: var(--sve-color-default-foreground);
    text-decoration: none;
    transition: background-color 0.15s ease;
  }

  :global(.sve-nav-menu__link:hover) {
    background-color: var(--sve-color-default-surface);
  }

  :global(.sve-nav-menu__link[data-active]) {
    color: var(--sve-color-primary);
    font-weight: var(--sve-font-weight-medium);
  }

  :global(.sve-nav-menu__link:focus-visible) {
    outline: 2px solid var(--sve-color-primary);
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    :global(.sve-nav-menu__link) {
      transition: none;
    }
  }
</style>
