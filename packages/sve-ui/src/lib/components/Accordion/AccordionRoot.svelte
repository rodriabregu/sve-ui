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

  // `value` must be destructured and passed as `bind:value`. Forwarding it in
  // the spread makes it one-way, which silently broke the two-way binding this
  // component documents.
  let { type = 'single', value = $bindable(), class: cls, ...rest }: Props = $props();

  const className = $derived(['sve-accordion', cls].filter(Boolean).join(' '));

  // The third type argument names the bindable props. Without it the cast erases
  // the bindings and `bind:value` below would not type-check.
  const Root = Accordion.Root as unknown as Component<Record<string, unknown>, object, 'value'>;
</script>

<Root {type} bind:value class={className} data-slot="accordion" {...rest} />

<style>
  :global(.sve-accordion) {
    display: block;
    font-family: var(--sve-font-family-sans);
    border-top: 1px solid var(--sve-color-default-border);
  }
</style>
