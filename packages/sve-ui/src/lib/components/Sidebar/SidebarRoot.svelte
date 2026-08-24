<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { useSidebar } from './context.js';

  interface Props extends Omit<HTMLAttributes<HTMLElement>, 'class' | 'aria-label'> {
    /**
     * Accessible name for the landmark. An app shell usually has more than one
     * complementary region, so this is how a screen reader user tells them
     * apart.
     * @default 'Sidebar'
     */
    label?: string;
    /** Extra classes merged onto the root. */
    class?: string;
    children?: Snippet;
  }

  let { label = 'Sidebar', class: cls, children, ...rest }: Props = $props();

  // State lives on the Provider, because context reaches descendants and not
  // siblings — see SidebarProvider for why that matters.
  const ctx = useSidebar();

  const collapsed = $derived(ctx?.collapsed === true);

  const className = $derived(
    [
      'sve-sidebar',
      `sve-sidebar--${ctx?.side ?? 'left'}`,
      `sve-sidebar--${ctx?.collapsible ?? 'icon'}`,
      collapsed ? 'sve-sidebar--collapsed' : '',
      cls
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<!--
  An `<aside>` — a complementary landmark, which is what an app-shell sidebar
  is. It carries a name because a shell often has several.

  The collapsed presentation is CSS, driven by one class. That is deliberate:
  the alternative is a JS media query that swaps the markup for a drawer on
  small screens, which means the breakpoint is hardcoded inside the library, the
  server cannot know it, and hydration flashes the wrong layout. One markup tree
  plus `collapsible="offcanvas"` gets the same result without any of that, and
  the app keeps control of when it happens.

  `width` is exposed as `--sve-sidebar-width` / `--sve-sidebar-width-icon` so an
  app can size it without overriding rules.
-->
<aside
  class={className}
  aria-label={label}
  id={ctx?.id}
  data-slot="sidebar"
  data-collapsed={collapsed ? '' : undefined}
  {...rest}
>
  {@render children?.()}
</aside>

<style>
  .sve-sidebar {
    --sve-sidebar-width: 16rem;
    --sve-sidebar-width-icon: 3.5rem;

    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    width: var(--sve-sidebar-width);
    height: 100%;
    overflow: hidden;
    background-color: var(--sve-color-default-surface);
    font-family: var(--sve-font-family-sans);
    color: var(--sve-color-default-foreground);
    transition: width 0.2s ease, transform 0.2s ease;
  }

  .sve-sidebar--left  { border-right: 1px solid var(--sve-color-default-border); }
  .sve-sidebar--right { border-left: 1px solid var(--sve-color-default-border); }

  /* --- icon: narrows to a rail. Items stay reachable, labels hide. --- */
  .sve-sidebar--icon.sve-sidebar--collapsed {
    width: var(--sve-sidebar-width-icon);
  }

  /* --- offcanvas: slides out. `width: 0` rather than display:none, so the
         transition has something to animate and focus cannot land inside. --- */
  .sve-sidebar--offcanvas.sve-sidebar--collapsed {
    width: 0;
    border-width: 0;
  }

  /* Nothing inside an off-canvas sidebar should be tabbable — a hidden panel
     that still takes focus is the classic "where did my cursor go" bug. */
  .sve-sidebar--offcanvas.sve-sidebar--collapsed :global(*) {
    visibility: hidden;
  }

  @media (prefers-reduced-motion: reduce) {
    .sve-sidebar {
      transition: none;
    }
  }
</style>
