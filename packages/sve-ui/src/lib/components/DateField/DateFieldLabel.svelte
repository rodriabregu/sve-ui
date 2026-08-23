<script lang="ts">
  import { DateField } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsProps = ComponentProps<typeof DateField.Label>;

  interface Props extends Omit<BitsProps, 'class'> {
    /** Extra classes merged onto the element. */
    class?: string;
  }

  let { class: cls, children, ...rest }: Props = $props();
</script>

<!--
  Bits renders this as a plain <div>, not a <label>, and associates it by pointing the
  Input's `aria-labelledby` at it — so the field is named without needing a
  `for` attribute. Verified in the rendered DOM.
-->
<DateField.Label
  class={['sve-field-label', cls].filter(Boolean).join(' ')}
  data-slot="date-field-label"
  {children}
  {...rest}
/>

<style>
  :global(.sve-field-label) {
    display: block;
    margin-bottom: var(--sve-space-1);
    font-family: var(--sve-font-family-sans);
    font-size: var(--sve-font-size-sm);
    font-weight: var(--sve-font-weight-medium);
    color: var(--sve-color-default-foreground);
  }
</style>
