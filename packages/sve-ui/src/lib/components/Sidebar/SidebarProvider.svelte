<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { setSidebarContext, type Collapsible, type Side } from './context.js';

  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'class'> {
    /**
     * Whether the sidebar is collapsed. Bindable, so the app can persist it — a
     * sidebar that forgets its state on every navigation is worse than one that
     * never collapsed.
     * @default false
     */
    collapsed?: boolean;
    /**
     * How collapsing presents itself.
     *   `icon`      — narrows to a rail; labels hide, items stay reachable.
     *   `offcanvas` — slides out of view entirely.
     *   `none`      — not collapsible; the Trigger becomes pointless.
     * @default 'icon'
     */
    collapsible?: Collapsible;
    /** Which edge the sidebar is anchored to. @default 'left' */
    side?: Side;
    /**
     * Lay the children out as an app shell — a flex row with the sidebar beside
     * the main content (reversed when `side="right"`).
     *
     * OFF by default, and deliberately so: this component's job is state, and a
     * provider that silently imposes a layout fights whatever the app already
     * has. Without it the wrapper is `display: contents`, so it does not
     * participate in layout at all and the children behave as if it were not
     * there — which is what you want when the sidebar sits inside a grid the app
     * already defined.
     *
     * Found by trying to rebuild this library's own docs navigation on top of
     * this component: the forced flex row put the mobile toggle beside the panel
     * instead of above it.
     * @default false
     */
    shell?: boolean;
    /**
     * Id given to the sidebar element, so a Trigger anywhere inside this
     * provider can point `aria-controls` at it.
     * @default 'sve-sidebar'
     */
    sidebarId?: string;
    /** Extra classes merged onto the shell. */
    class?: string;
    children?: Snippet;
  }

  let {
    collapsed = $bindable(false),
    collapsible = 'icon',
    side = 'left',
    shell = false,
    sidebarId = 'sve-sidebar',
    class: cls,
    children,
    ...rest
  }: Props = $props();

  // Getters, not values: the parts read `collapsed` during render, so a snapshot
  // would freeze at whatever it was when this mounted.
  setSidebarContext({
    get collapsed() {
      return collapsed;
    },
    get collapsible() {
      return collapsible;
    },
    get side() {
      return side;
    },
    get id() {
      return sidebarId;
    },
    toggle() {
      collapsed = !collapsed;
    }
  });
</script>

<!--
  Owns the state and provides the context.

  It is a separate part from `Root` for one concrete reason: Svelte context flows
  to DESCENDANTS, not to siblings. If `Root` held the state, a `Trigger` sitting
  in a top bar next to the sidebar would never see it — and with
  `collapsible="offcanvas"` the Trigger HAS to be outside the sidebar, or
  collapsing hides the only way back.

  A test caught exactly that: the Trigger got a null `aria-controls` and clicking
  it did nothing, because it was a sibling of the provider rather than a child.

  So wrap both: Provider > (Root + Trigger + your main content).

  It imposes NO layout unless you ask for it. By default the wrapper is
  `display: contents`, so it is invisible to layout and the children sit exactly
  where they would without it — which matters when the sidebar is a child of a
  grid the app already defined.

  Pass `shell` for the app-shell case: a flex row with the sidebar beside the
  main content. `side="right"` reverses the visual order only, so tab order still
  follows the markup.
-->
<div
  class={[
    'sve-sidebar-provider',
    shell ? 'sve-sidebar-shell' : '',
    shell ? `sve-sidebar-shell--${side}` : '',
    cls
  ]
    .filter(Boolean)
    .join(' ')}
  data-slot="sidebar-provider"
  {...rest}
>
  {@render children?.()}
</div>

<style>
  /* Invisible to layout by default: the children behave as if this wrapper were
     not in the tree. */
  .sve-sidebar-provider {
    display: contents;
  }

  /* Opt-in app-shell layout. The more specific selector wins over the rule
     above. */
  .sve-sidebar-provider.sve-sidebar-shell {
    display: flex;
    min-height: 0;
    width: 100%;
    font-family: var(--sve-font-family-sans);
  }

  .sve-sidebar-provider.sve-sidebar-shell--right {
    flex-direction: row-reverse;
  }
</style>
