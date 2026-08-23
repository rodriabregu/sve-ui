<script module lang="ts">
  export type Size = 'sm' | 'md' | 'lg';
</script>

<script lang="ts">
  import { ToggleGroup } from 'bits-ui';
  import type { Component, Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  /**
   * Bits' ToggleGroup.Root props are a discriminated union (single vs multiple)
   * over 400+ HTML attributes, which overflows TypeScript's union representation
   * when spread — the same limit AccordionRoot hits. We expose a flat, non-union
   * surface here and forward it to a loosely-typed view of the Bits root;
   * behaviour is unchanged.
   */
  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'class'> {
    /**
     * `single` allows one active item; `multiple` allows many. Required, because
     * it also decides the shape of `value`.
     */
    type: 'single' | 'multiple';
    /**
     * Active item(s). Bindable. `single` gives a string, `multiple` gives a
     * string[] — the shape follows `type`.
     */
    value?: string | string[];
    /** Called when the active item(s) change. */
    onValueChange?: (value: string & string[]) => void;
    /** Disables every item in the group. */
    disabled?: boolean;
    /** Keyboard focus loops from the last item back to the first. */
    loop?: boolean;
    /** Arrow-key navigation axis. */
    orientation?: 'horizontal' | 'vertical';
    /** @default 'md' */
    size?: Size;
    /** Extra classes merged onto the root. */
    class?: string;
    /** Compose `ToggleGroup.Item` blocks inside. */
    children?: Snippet;
  }

  // `value` must be destructured and passed as `bind:value`. Forwarding it
  // through the spread makes it one-way, so clicks would not update the caller.
  let { size = 'md', value = $bindable(), class: cls, ...rest }: Props = $props();

  const className = $derived(
    ['sve-toggle-group', `sve-toggle-group--${size}`, cls].filter(Boolean).join(' ')
  );

  // The third type argument names the bindable props; without it the cast erases
  // the bindings and `bind:value` below would not type-check.
  const Root = ToggleGroup.Root as unknown as Component<
    Record<string, unknown>,
    object,
    'value'
  >;
</script>

<!--
  Accessibility: Bits owns the group role, roving focus and arrow-key
  navigation. `type` is required — "single" for one active item, "multiple" for
  many — and it changes the shape of `value`, so it is not defaulted here.
  The group needs a name: pass `aria-label` or `aria-labelledby`.
-->
<Root bind:value class={className} data-slot="toggle-group" {...rest} />

<style>
  :global(.sve-toggle-group) {
    display: inline-flex;
    align-items: stretch;
    border: 1px solid var(--sve-color-default-border);
    border-radius: var(--sve-radius-md);
    overflow: hidden;
    font-family: var(--sve-font-family-sans);
  }

  :global(.sve-toggle-group[data-orientation='vertical']) {
    flex-direction: column;
  }

  /* Internal dividers only — the outer border belongs to the group. */
  :global(.sve-toggle-group > * + *) {
    border-left: 1px solid var(--sve-color-default-border);
  }

  :global(.sve-toggle-group[data-orientation='vertical'] > * + *) {
    border-left: none;
    border-top: 1px solid var(--sve-color-default-border);
  }
</style>
