<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends Omit<HTMLAttributes<HTMLElement>, 'class' | 'aria-label'> {
    /**
     * Accessible name for the navigation landmark.
     * @default 'Breadcrumb'
     */
    label?: string;
    /** Extra classes merged onto the nav. */
    class?: string;
    /** Compose `Breadcrumb.List` inside. */
    children?: Snippet;
  }

  let { label = 'Breadcrumb', class: cls, children, ...rest }: Props = $props();
</script>

<!--
  Custom, not a Bits primitive — the platform already has the right semantics:
  a <nav> landmark wrapping an ordered list. The `aria-label` is what lets a
  screen reader user distinguish this nav from the site's main navigation, so it
  always has one.
-->
<nav
  class={['sve-breadcrumb', cls].filter(Boolean).join(' ')}
  aria-label={label}
  data-slot="breadcrumb"
  {...rest}
>
  {@render children?.()}
</nav>

<style>
  .sve-breadcrumb {
    font-family: var(--sve-font-family-sans);
    font-size: var(--sve-font-size-sm);
    color: var(--sve-color-default-foreground);
  }
</style>
