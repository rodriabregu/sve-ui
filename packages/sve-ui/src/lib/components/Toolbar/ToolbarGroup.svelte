<script lang="ts">
  import { Toolbar } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsGroupProps = ComponentProps<typeof Toolbar.Group>;

  interface Props extends Omit<BitsGroupProps, 'class' | 'value'> {
    /**
     * Active item(s). Bindable. `type="single"` gives a string,
     * `type="multiple"` gives a string[] — the shape follows `type`.
     */
    value?: string | string[];
    /** Extra classes merged onto the group. */
    class?: string;
  }

  // `value` must be destructured and passed as `bind:value`. Forwarding it in
  // the spread makes it one-way, so clicks would never reach the caller — the
  // same defect that shipped in Accordion.Root.
  let { value = $bindable(), class: cls, children, ...rest }: Props = $props();
</script>

<!--
  A toggle group inside the toolbar. `type` is required and decides the shape of
  `value`, exactly as on ToggleGroup: "single" gives a string, "multiple" gives
  a string[].
-->
<Toolbar.Group
  bind:value
  class={['sve-toolbar__group', cls].filter(Boolean).join(' ')}
  data-slot="toolbar-group"
  {children}
  {...rest}
/>

<style>
  :global(.sve-toolbar__group) {
    display: flex;
    align-items: center;
    gap: 2px;
  }
</style>
