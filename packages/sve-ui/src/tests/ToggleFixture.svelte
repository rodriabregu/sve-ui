<script lang="ts">
  import Toggle from '$lib/components/Toggle/Toggle.svelte';

  interface Props {
    size?: 'sm' | 'md' | 'lg';
    variant?: 'outline' | 'ghost';
    disabled?: boolean;
  }

  let { size, variant, disabled }: Props = $props();

  // Drives bind:pressed so the test can assert the binding end to end.
  let pressed = $state(false);
</script>

<Toggle bind:pressed {size} {variant} {disabled} aria-label="Bold">B</Toggle>
<output data-testid="pressed">{pressed}</output>
