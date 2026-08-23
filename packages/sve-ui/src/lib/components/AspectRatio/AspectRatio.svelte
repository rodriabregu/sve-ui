<script lang="ts">
  // Aliased: see scripts/check-dts.mjs.
  import { AspectRatio as AspectRatioPrimitive } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsRootProps = ComponentProps<typeof AspectRatioPrimitive.Root>;

  interface Props extends Omit<BitsRootProps, 'class' | 'ratio'> {
    /**
     * Width divided by height — `16 / 9`, `1`, `4 / 3`. Reserving the box up
     * front is what stops the layout shifting when the media loads.
     * @default 1
     */
    ratio?: number;
    /** Extra classes merged onto the root. */
    class?: string;
  }

  let { ratio = 1, class: cls, ...rest }: Props = $props();

  const className = $derived(['sve-aspect-ratio', cls].filter(Boolean).join(' '));
</script>

<!--
  Purely presentational: it constrains a box, so it adds no ARIA of its own.
  The content inside carries its own semantics (an <img> still needs `alt`).
-->
<AspectRatioPrimitive.Root {ratio} class={className} data-slot="aspect-ratio" {...rest} />

<style>
  :global(.sve-aspect-ratio) {
    overflow: hidden;
    border-radius: var(--sve-radius-md);
  }

  /* Media fills the reserved box instead of overflowing or letterboxing it. */
  :global(.sve-aspect-ratio > img),
  :global(.sve-aspect-ratio > video) {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
