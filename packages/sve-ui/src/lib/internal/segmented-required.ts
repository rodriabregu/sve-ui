/**
 * Carries `required` from a segmented field's Root down to its Segments.
 *
 * These fields have no single element to mark. The Root is a wrapper, and the
 * things a screen reader actually lands on are the segments, each of which Bits
 * gives `role="spinbutton"` — a role that DOES support `aria-required` (checked
 * against axe, not assumed). Bits itself emits nothing for `required` here, so a
 * `<Field required>` around a date field announced nothing at all.
 *
 * A getter rather than a snapshot, so a Root whose `required` changes updates
 * the segments already rendered.
 */

import { getContext, setContext } from 'svelte';

const KEY = Symbol('sve-ui:segmented-required');

export function setSegmentedRequired(get: () => boolean): void {
	setContext(KEY, get);
}

/**
 * Returns false when there is no Root above — a Segment used standalone is
 * unusual but should not throw.
 */
export function useSegmentedRequired(): () => boolean {
	return getContext<() => boolean>(KEY) ?? (() => false);
}
