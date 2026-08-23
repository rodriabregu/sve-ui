<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLOlAttributes } from 'svelte/elements';

  interface Props extends Omit<HTMLOlAttributes, 'class'> {
    /** Extra classes merged onto the list. */
    class?: string;
    /** Compose `Breadcrumb.Item` blocks inside. */
    children?: Snippet;
  }

  let { class: cls, children, ...rest }: Props = $props();
</script>

<!--
  An ORDERED list, because a breadcrumb trail is a sequence — the order carries
  meaning, and a screen reader announces the position within it.
-->
<ol class={['sve-breadcrumb__list', cls].filter(Boolean).join(' ')} data-slot="breadcrumb-list" {...rest}>
  {@render children?.()}
</ol>

<style>
  .sve-breadcrumb__list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--sve-space-2);
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>
