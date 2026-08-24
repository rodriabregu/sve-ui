<script lang="ts">
  import * as Toast from '$lib/components/Toast/index.js';

  interface Props {
    label?: string;
    position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
    max?: number;
    dismissLabel?: string;
  }

  let { label, position, max, dismissLabel }: Props = $props();
</script>

<Toast.Viewport {label} {position} {max} {dismissLabel} />
