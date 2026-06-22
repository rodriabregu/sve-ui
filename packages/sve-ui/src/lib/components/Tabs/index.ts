/**
 * Tabs namespace — sve-ui styled wrappers over bits-ui Tabs.
 *
 * Root: container; `bind:value` selects the active tab (Bits owns ARIA,
 * roving focus, and keyboard navigation).
 * List / Trigger / Content: styled parts. Trigger and Content pair by `value`.
 */

export { default as Root } from './TabsRoot.svelte';
export { default as List } from './TabsList.svelte';
export { default as Trigger } from './TabsTrigger.svelte';
export { default as Content } from './TabsContent.svelte';
