/**
 * Collapsible namespace — sve-ui styled wrappers over bits-ui Collapsible.
 *
 * Root: container; `bind:open` drives the panel.
 * Trigger: a <button> Bits wires with `aria-expanded` + `aria-controls`.
 * Content: the panel it controls.
 *
 * Reach for Accordion instead when several panels belong to one set and only
 * one should be open at a time.
 */

export { default as Root } from './CollapsibleRoot.svelte';
export { default as Trigger } from './CollapsibleTrigger.svelte';
export { default as Content } from './CollapsibleContent.svelte';
