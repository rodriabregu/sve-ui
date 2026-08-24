<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';

  interface Props extends Omit<HTMLAttributes<HTMLTableSectionElement>, 'class'> {
    /** Extra classes merged onto the `<thead>`. */
    class?: string;
    children?: Snippet;
  }

  let { class: cls, children, ...rest }: Props = $props();
</script>

<thead class={['sve-table__header', cls].filter(Boolean).join(' ')} {...rest}>
  {@render children?.()}
</thead>
