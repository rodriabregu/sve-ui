<script lang="ts">
  import * as Alert from '$lib/components/Alert/index.js';

  interface Props {
    color?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
    variant?: 'subtle' | 'solid' | 'outline';
    class?: string;
  }

  let { color, variant, class: cls }: Props = $props();
</script>

<Alert.Root {color} {variant} class={cls} data-testid="alert-root">
  <Alert.Title data-testid="alert-title">Alert title</Alert.Title>
  <Alert.Description data-testid="alert-description">Alert description</Alert.Description>
</Alert.Root>
