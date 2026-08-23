<script lang="ts">
  import * as ScrollArea from '$lib/components/ScrollArea/index.js';

  interface Props {
    type?: 'hover' | 'scroll' | 'auto' | 'always';
  }

  let { type }: Props = $props();
</script>

<ScrollArea.Root {type} style="height: 8rem; width: 12rem;">
  <ScrollArea.Viewport>
    {#each Array.from({ length: 20 }, (_, i) => i) as i (i)}
      <p>Row {i}</p>
    {/each}
  </ScrollArea.Viewport>
  <ScrollArea.Scrollbar orientation="vertical">
    <ScrollArea.Thumb />
  </ScrollArea.Scrollbar>
</ScrollArea.Root>
