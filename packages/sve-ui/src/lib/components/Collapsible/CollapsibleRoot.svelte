<script lang="ts">
  import { Collapsible } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsRootProps = ComponentProps<typeof Collapsible.Root>;

  interface Props extends Omit<BitsRootProps, 'class' | 'open' | 'disabled'> {
    /**
     * Whether the panel is open. Bindable.
     * @default false
     */
    open?: boolean;
    /** @default false */
    disabled?: boolean;
    /** Extra classes merged onto the root. */
    class?: string;
  }

  let { open = $bindable(false), disabled = false, class: cls, ...rest }: Props = $props();

  const className = $derived(['sve-collapsible', cls].filter(Boolean).join(' '));
</script>

<Collapsible.Root bind:open {disabled} class={className} data-slot="collapsible" {...rest} />

<style>
  :global(.sve-collapsible) {
    display: flex;
    flex-direction: column;
    gap: var(--sve-space-2);
    font-family: var(--sve-font-family-sans);
  }
</style>
