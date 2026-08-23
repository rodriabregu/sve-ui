<script lang="ts">
  import { Accordion } from 'bits-ui';
  import type { Component, Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  /**
   * Bits' Accordion.Root props are a discriminated union (single vs multiple)
   * over 400+ HTML attributes, which overflows TypeScript's union representation
   * when spread. We expose a flat, non-union surface here and forward it to a
   * loosely-typed view of the Bits root — behavior is unchanged.
   */
  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'class'> {
    /**
     * `single` allows one open item at a time; `multiple` allows many.
     * @default 'single'
     */
    type?: 'single' | 'multiple';
    /** Controlled open item(s). Use `bind:value` for two-way binding. */
    value?: string | string[];
    /** Called when the open item(s) change. */
    onValueChange?: (value: string & string[]) => void;
    /** Disables every trigger in the accordion. */
    disabled?: boolean;
    /** Keyboard focus loops from the last trigger back to the first. */
    loop?: boolean;
    /** Extra classes merged onto the root. */
    class?: string;
    /** Compose `Accordion.Item` blocks inside. */
    children?: Snippet;
  }

  let { type = 'single', class: cls, ...rest }: Props = $props();

  const className = $derived(['sve-accordion', cls].filter(Boolean).join(' '));

  const Root = Accordion.Root as unknown as Component<Record<string, unknown>>;
</script>

<Root {type} class={className} data-slot="accordion" {...rest} />

<style>
  :global(.sve-accordion) {
    display: block;
    font-family: var(--sve-font-family-sans);
    border-top: 1px solid var(--sve-color-default-border);
  }
</style>
