<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLLiAttributes } from 'svelte/elements';

  interface Props extends Omit<HTMLLiAttributes, 'class'> {
    /** Extra classes merged onto the separator. */
    class?: string;
    /** Custom glyph. Defaults to a chevron. */
    children?: Snippet;
  }

  let { class: cls, children, ...rest }: Props = $props();
</script>

<!--
  Decorative: `aria-hidden` plus `role="presentation"`, so a screen reader reads
  "Home, Projects, Settings" rather than "Home, slash, Projects, slash".
  It stays an <li> because it lives inside the ordered list.
-->
<li
  class={['sve-breadcrumb__separator', cls].filter(Boolean).join(' ')}
  role="presentation"
  aria-hidden="true"
  data-slot="breadcrumb-separator"
  {...rest}
>
  {#if children}
    {@render children()}
  {:else}
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <path d="m9 18 6-6-6-6" />
    </svg>
  {/if}
</li>

<style>
  .sve-breadcrumb__separator {
    display: inline-flex;
    align-items: center;
    color: var(--sve-color-default-foreground);
    opacity: 0.45;
  }

  .sve-breadcrumb__separator svg {
    width: 0.875rem;
    height: 0.875rem;
  }
</style>
