<script lang="ts">
  import { Pagination } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsNextProps = ComponentProps<typeof Pagination.NextButton>;

  interface Props extends Omit<BitsNextProps, 'class'> {
    /** Extra classes merged onto the button. */
    class?: string;
  }

  let { class: cls, children, ...rest }: Props = $props();
</script>

<!--
  Bits disables this on the last page. Shares the `sve-pagination__nav` styling
  with PrevButton so the pair always matches.
-->
<Pagination.NextButton
  class={['sve-pagination__nav', cls].filter(Boolean).join(' ')}
  data-slot="pagination-next"
  {children}
  {...rest}
/>
