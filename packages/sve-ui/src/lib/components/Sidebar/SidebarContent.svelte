<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'class'> {
    /** Extra classes merged onto the region. */
    class?: string;
    children?: Snippet;
  }

  let { class: cls, children, ...rest }: Props = $props();
</script>

<!--
  The scrolling middle. Header and Footer stay put; only this moves, so a long
  nav list never pushes the account switcher off the bottom of the screen.
-->
<div class={['sve-sidebar__content', cls].filter(Boolean).join(' ')} data-slot="sidebar-content" {...rest}>
  {@render children?.()}
</div>

<style>
  .sve-sidebar__content {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    overflow-x: hidden;
    padding: var(--sve-space-2);
    display: flex;
    flex-direction: column;
    gap: var(--sve-space-4);
  }
</style>
