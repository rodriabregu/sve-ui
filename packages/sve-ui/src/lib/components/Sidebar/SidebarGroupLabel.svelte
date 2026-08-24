<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { useSidebar } from './context.js';

  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'class'> {
    /** Extra classes merged onto the label. */
    class?: string;
    children?: Snippet;
  }

  let { class: cls, children, ...rest }: Props = $props();

  const ctx = useSidebar();
  const hidden = $derived(ctx?.collapsed === true && ctx?.collapsible === 'icon');
</script>

<!--
  The group's heading. On an icon rail there is no room for it, so it is hidden
  VISUALLY but left in the accessibility tree — removing it would strip the
  group of its name for a screen reader user, who has plenty of room.
-->
<div
  class={['sve-sidebar__group-label', hidden ? 'sve-visually-hidden' : '', cls]
    .filter(Boolean)
    .join(' ')}
  data-slot="sidebar-group-label"
  {...rest}
>
  {@render children?.()}
</div>

<style>
  .sve-sidebar__group-label {
    padding: var(--sve-space-2) var(--sve-space-2) var(--sve-space-1);
    font-size: var(--sve-font-size-xs);
    font-weight: var(--sve-font-weight-bold);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--sve-color-default-foreground);
    opacity: 0.6;
    white-space: nowrap;
  }

  /* Not `display: none` — that would take the group's accessible name with it. */
  .sve-visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
    border: 0;
  }
</style>
