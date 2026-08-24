<script module lang="ts">
  /** Spacing token keys — gap is token-bound on purpose, see the note below. */
  export type Gap = 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
  export type Align = 'start' | 'center' | 'end' | 'stretch';
  export type As = 'div' | 'section' | 'article' | 'aside' | 'header' | 'footer' | 'ul' | 'ol' | 'li' | 'nav' | 'form' | 'fieldset';
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends Omit<HTMLAttributes<HTMLElement>, 'class'> {
    /**
     * Vertical space between children, as a spacing token key — not an
     * arbitrary length. That constraint is the point: it keeps rhythm
     * consistent and stops this becoming a place to invent one-off spacing.
     * @default 4
     */
    gap?: Gap;
    /**
     * Cross-axis alignment. `stretch` (the default) lets children fill the
     * width, which is what you want for stacked form fields.
     * @default 'stretch'
     */
    align?: Align;
    /**
     * Element to render. Use it to keep the markup semantic — `ul` for a list,
     * `fieldset` for grouped inputs — instead of wrapping a div around one.
     * @default 'div'
     */
    as?: As;
    /** Extra classes merged onto the element. */
    class?: string;
    children?: Snippet;
  }

  let { gap = 4, align = 'stretch', as = 'div', class: cls, children, ...rest }: Props = $props();

  const className = $derived(
    ['sve-stack', `sve-stack--${align}`, cls].filter(Boolean).join(' ')
  );
</script>

<!--
  Vertical flow with token-bound spacing. Deliberately NOT a general style prop
  bag: there is no margin, padding, width or colour here.

  Margin is the parent's business, not the child's — a component that sets its
  own outer margin cannot be reused in a layout that spaces things differently.
  And an `each`-generated list gets even rhythm from ONE gap rather than a margin
  on every item plus a `:last-child` exception.

  If you need something this does not express, reach for CSS. A layout primitive
  that grows props until it can express all of flexbox has just reinvented CSS
  with a worse syntax — which is exactly what the pre-1.0 `Box` did here (with
  `p`/`padding`, `m`/`margin`, `w`/`width` aliases and inline style-string
  concatenation), and why it was dropped rather than ported. This is the small,
  sharp replacement.
-->
<svelte:element
  this={as}
  class={className}
  style:gap={`var(--sve-space-${gap})`}
  data-slot="stack"
  {...rest}
>
  {@render children?.()}
</svelte:element>

<style>
  .sve-stack {
    display: flex;
    flex-direction: column;
    /* Reset the list styling so `as="ul"` stays semantic without looking like a
       bulleted list, which is almost always what you want here. */
    margin: 0;
    padding: 0;
    list-style: none;
    min-width: 0;
  }

  .sve-stack--start   { align-items: flex-start; }
  .sve-stack--center  { align-items: center; }
  .sve-stack--end     { align-items: flex-end; }
  .sve-stack--stretch { align-items: stretch; }
</style>
