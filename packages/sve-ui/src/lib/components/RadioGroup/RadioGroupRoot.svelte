<script lang="ts">
  import { RadioGroup } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsRootProps = ComponentProps<typeof RadioGroup.Root>;

  interface Props extends Omit<BitsRootProps, 'class'> {
    class?: string;
  }

  let { value = $bindable(), class: cls, ...rest }: Props = $props();

  const className = $derived(
    ['sve-radio-group', cls].filter(Boolean).join(' ')
  );
</script>

<RadioGroup.Root bind:value class={className} data-slot="radio-group" {...rest} />

<style>
  :global(.sve-radio-group) {
    display: flex;
    flex-direction: column;
    gap: var(--sve-space-2);
  }

  :global(.sve-radio-group[data-orientation='horizontal']) {
    flex-direction: row;
  }
</style>
