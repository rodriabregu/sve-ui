<script lang="ts">
  import { ContextMenu } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsTriggerProps = ComponentProps<typeof ContextMenu.Trigger>;

  interface Props extends Omit<BitsTriggerProps, 'class'> {
    /** Extra classes merged onto the trigger region. */
    class?: string;
  }

  let { class: cls, children, ...rest }: Props = $props();
</script>

<!--
  This is the right-click REGION, not a button — it wraps the content the menu
  applies to.

  A context menu is a shortcut, never the only route: right-click is not
  discoverable, and on touch there is no right-click at all. Every action in
  here must also be reachable from a visible control.
-->
<ContextMenu.Trigger
  class={['sve-context-menu-trigger', cls].filter(Boolean).join(' ')}
  data-slot="context-menu-trigger"
  {children}
  {...rest}
/>

<style>
  :global(.sve-context-menu-trigger) {
    display: block;
  }
</style>
