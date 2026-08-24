import { setContext, getContext } from 'svelte';

const SIDEBAR_CONTEXT_KEY = Symbol('sve-ui:sidebar');

export type Collapsible = 'icon' | 'offcanvas' | 'none';
export type Side = 'left' | 'right';

export interface SidebarContext {
  /** Whether the sidebar is currently collapsed. */
  readonly collapsed: boolean;
  /** How collapsing presents itself. */
  readonly collapsible: Collapsible;
  /** Which edge the sidebar is anchored to. */
  readonly side: Side;
  /** The id of the sidebar element, so a Trigger can point `aria-controls` at it. */
  readonly id: string;
  /** Flip the collapsed state. */
  toggle(): void;
}

/**
 * Shares the sidebar's state with its parts.
 *
 * Pass an object of GETTERS, not a snapshot — `Item` and `GroupLabel` read
 * `collapsed` during render, so a plain value would freeze at whatever it was
 * when the provider mounted.
 */
export function setSidebarContext(ctx: SidebarContext): void {
  setContext(SIDEBAR_CONTEXT_KEY, ctx);
}

/**
 * Reads the sidebar context.
 *
 * Returns undefined outside a `Sidebar.Root`, which lets the parts degrade to
 * their expanded appearance rather than throwing — a part rendered in isolation
 * (a test, a Storybook-style page) should still render.
 */
export function useSidebar(): SidebarContext | undefined {
  return getContext<SidebarContext>(SIDEBAR_CONTEXT_KEY);
}
