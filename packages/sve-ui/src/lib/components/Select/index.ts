/**
 * Select namespace — sve-ui styled wrappers over bits-ui Select.
 *
 * Root, Value, Group, GroupHeading: re-exported as-is (behavior + non-visual;
 * Bits owns ARIA, keyboard, and typeahead). Root's value/type props narrow on
 * the consumer's literal `type`.
 * Trigger, Content, Item: styled wrappers. Content portals to <body>; Item
 * shows a selected check via CSS.
 */

import { Select } from 'bits-ui';

export const Root = Select.Root;
export const Value = Select.Value;
export const Group = Select.Group;
export const GroupHeading = Select.GroupHeading;

export { default as Trigger } from './SelectTrigger.svelte';
export { default as Content } from './SelectContent.svelte';
export { default as Item } from './SelectItem.svelte';
