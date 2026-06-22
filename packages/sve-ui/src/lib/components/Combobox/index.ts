/**
 * Combobox namespace — sve-ui styled wrappers over bits-ui Combobox.
 *
 * Root, Trigger, Group, GroupHeading: re-exported as-is (behavior; Bits owns
 * ARIA, open state, and typeahead). Root narrows on the consumer's literal `type`.
 * Input, Content, Item: styled wrappers. Content portals to <body>; Item shows
 * a selected check via CSS. Filtering is consumer-driven from the input value.
 */

import { Combobox } from 'bits-ui';

export const Root = Combobox.Root;
export const Trigger = Combobox.Trigger;
export const Group = Combobox.Group;
export const GroupHeading = Combobox.GroupHeading;

export { default as Input } from './ComboboxInput.svelte';
export { default as Content } from './ComboboxContent.svelte';
export { default as Item } from './ComboboxItem.svelte';
