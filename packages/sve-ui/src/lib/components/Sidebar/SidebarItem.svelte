<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAnchorAttributes } from 'svelte/elements';
  import { useSidebar } from './context.js';

  interface Props extends Omit<HTMLAnchorAttributes, 'class'> {
    /**
     * Marks the current page. It sets `aria-current="page"`, not just a
     * highlight — styling it without that tells sighted users and nobody else.
     * @default false
     */
    active?: boolean;
    /**
     * Accessible name used when the label is hidden on an icon rail. Required in
     * practice for icon-only items: without it a collapsed sidebar becomes a
     * column of unnamed links.
     */
    label?: string;
    /**
     * A visible entry that cannot be navigated to — a feature not shipped yet,
     * a section the user lacks access to. It renders a `<span>` rather than an
     * `<a>`, because a link that goes nowhere is worse than not being a link:
     * it takes a tab stop and lies about what will happen.
     *
     * Found by rebuilding this library's own docs sidebar on top of this
     * component, which needed exactly that for its "soon" entries.
     * @default false
     */
    disabled?: boolean;
    /** Extra classes merged onto the item. */
    class?: string;
    children?: Snippet;
  }

  let { active = false, label, disabled = false, class: cls, children, ...rest }: Props = $props();

  const ctx = useSidebar();
  const iconRail = $derived(ctx?.collapsed === true && ctx?.collapsible === 'icon');
</script>

<!--
  One nav entry: an `<li>` wrapping a real `<a>`, so middle-click and
  open-in-new-tab keep working and the item counts toward the list total.

  On an icon rail the text is hidden with `overflow`, and `label` becomes the
  accessible name — an icon with no name is a link to nowhere as far as a screen
  reader is concerned. `title` is set too, so a sighted user gets a tooltip
  rather than having to guess the glyph.
-->
<li class="sve-sidebar__item-wrap">
  {#if disabled}
    <span
      class={['sve-sidebar__item', 'sve-sidebar__item--disabled', cls].filter(Boolean).join(' ')}
      aria-disabled="true"
      aria-label={iconRail ? label : undefined}
      title={iconRail ? label : undefined}
      data-slot="sidebar-item"
      data-disabled=""
    >
      {@render children?.()}
    </span>
  {:else}
    <a
      class={['sve-sidebar__item', cls].filter(Boolean).join(' ')}
      aria-current={active ? 'page' : undefined}
      aria-label={iconRail ? label : undefined}
      title={iconRail ? label : undefined}
      data-slot="sidebar-item"
      data-active={active ? '' : undefined}
      {...rest}
    >
      {@render children?.()}
    </a>
  {/if}
</li>

<style>
  .sve-sidebar__item-wrap {
    display: block;
  }

  .sve-sidebar__item {
    display: flex;
    align-items: center;
    gap: var(--sve-space-2);
    height: 2.25rem;
    padding: 0 var(--sve-space-2);
    border-radius: var(--sve-radius-md);
    color: var(--sve-color-default-foreground);
    font-size: var(--sve-font-size-sm);
    text-decoration: none;
    /* Keeps the label from wrapping or spilling as the rail narrows. */
    white-space: nowrap;
    overflow: hidden;
    transition: background-color 0.15s ease, color 0.15s ease;
  }

  .sve-sidebar__item:hover {
    background-color: var(--sve-color-default);
  }

  .sve-sidebar__item[data-active] {
    background-color: var(--sve-color-primary-surface);
    color: var(--sve-color-primary);
    font-weight: var(--sve-font-weight-medium);
  }

  /* Not a link, so it must not look like one — and no cursor affordance. */
  .sve-sidebar__item--disabled {
    opacity: 0.45;
    cursor: default;
  }

  .sve-sidebar__item--disabled:hover {
    background-color: transparent;
  }

  .sve-sidebar__item:focus-visible {
    outline: 2px solid var(--sve-color-primary);
    outline-offset: -2px;
  }

  @media (prefers-reduced-motion: reduce) {
    .sve-sidebar__item {
      transition: none;
    }
  }
</style>
