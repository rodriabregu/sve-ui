/**
 * Accordion namespace — sve-ui styled wrappers over bits-ui Accordion.
 *
 * Root: container; requires `type` ("single" | "multiple"); `bind:value` tracks
 * the open item(s) (Bits owns ARIA, keyboard, and open/close state).
 * Item / Header / Trigger / Content: styled parts. Trigger includes a chevron
 * that rotates on open; compose Trigger inside Header.
 */

export { default as Root } from './AccordionRoot.svelte';
export { default as Item } from './AccordionItem.svelte';
export { default as Header } from './AccordionHeader.svelte';
export { default as Trigger } from './AccordionTrigger.svelte';
export { default as Content } from './AccordionContent.svelte';
