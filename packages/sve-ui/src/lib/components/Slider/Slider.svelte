<script lang="ts">
  import { Slider } from 'bits-ui';
  import type { Component } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  /**
   * Self-contained slider: renders the track, filled range, and one thumb per
   * value internally, so consumers just set `value` / `min` / `max` / `step`.
   *
   * Bits' Slider.Root props are a discriminated union (single vs multiple); we
   * expose a flat surface and forward to a loosely-typed view of the root to
   * avoid TypeScript's "union too complex" overflow.
   */
  interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, 'class'> {
    type?: 'single' | 'multiple';
    value?: number | number[];
    onValueChange?: (value: number & number[]) => void;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    orientation?: 'horizontal' | 'vertical';
    class?: string;
  }

  let { type = 'single', class: cls, ...rest }: Props = $props();

  const className = $derived(['sve-slider', cls].filter(Boolean).join(' '));

  const Root = Slider.Root as unknown as Component<Record<string, unknown>>;
</script>

<Root {type} class={className} data-slot="slider" {...rest}>
  {#snippet children({ thumbItems }: { thumbItems: { index: number; value: number }[] })}
    <span class="sve-slider__track">
      <Slider.Range class="sve-slider__range" />
    </span>
    {#each thumbItems as thumb (thumb.index)}
      <Slider.Thumb index={thumb.index} class="sve-slider__thumb" />
    {/each}
  {/snippet}
</Root>

<style>
  :global(.sve-slider) {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 1.25rem;
    touch-action: none;
    user-select: none;
    cursor: pointer;
  }

  :global(.sve-slider__track) {
    position: relative;
    flex-grow: 1;
    height: 0.375rem;
    border-radius: var(--sve-radius-full);
    background-color: var(--sve-color-default);
  }

  :global(.sve-slider__range) {
    position: absolute;
    height: 100%;
    border-radius: var(--sve-radius-full);
    background-color: var(--sve-color-primary);
  }

  :global(.sve-slider__thumb) {
    display: block;
    width: 1.125rem;
    height: 1.125rem;
    border-radius: var(--sve-radius-full);
    background-color: #ffffff;
    border: 1px solid var(--sve-color-default-border);
    box-shadow: var(--sve-shadow-sm);
    cursor: grab;
  }

  :global(.sve-slider__thumb:focus-visible) {
    outline: 2px solid var(--sve-color-primary);
    outline-offset: 2px;
  }

  :global(.sve-slider[data-disabled]) {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
