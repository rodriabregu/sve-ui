<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';

  interface Props extends Omit<HTMLAttributes<HTMLElement>, 'class'> {
    /**
     * Keep the caption available to assistive technology but hide it visually.
     * Use it when the heading above the table already says the same thing —
     * removing the caption entirely would leave the table unnamed.
     * @default false
     */
    visuallyHidden?: boolean;
    /** Extra classes merged onto the caption. */
    class?: string;
    children?: Snippet;
  }

  let { visuallyHidden = false, class: cls, children, ...rest }: Props = $props();
</script>

<!--
  The table's accessible name, and the reason to prefer it over `aria-label`:
  a caption is visible, so sighted users get the same description everyone else
  does. It must be the FIRST child of the table.

  A table with no name is announced as just "table" in a list of tables, which
  is useless on a page that has more than one.
-->
<caption
  class={['sve-table__caption', visuallyHidden && 'sve-table__caption--hidden', cls]
    .filter(Boolean)
    .join(' ')}
  {...rest}
>
  {@render children?.()}
</caption>

<style>
  :global(.sve-table__caption) {
    padding: var(--sve-space-2) var(--sve-space-3);
    text-align: left;
    font-size: var(--sve-font-size-sm);
    color: var(--sve-color-default-foreground);
    caption-side: top;
  }

  /*
    Clipped rather than `display: none` or `visibility: hidden`, both of which
    remove it from the accessibility tree along with the picture.
  */
  :global(.sve-table__caption--hidden) {
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
