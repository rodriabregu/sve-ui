/**
 * Carries the filtered result count from `Command.Root` to `Command.Status`.
 *
 * Bits filters the list internally and reports the count through
 * `onStateChange`, but exposes it through no snippet prop and no context of its
 * own — so a consumer had no way to tell a screen reader user how many results
 * their typing produced. The list shrank silently.
 */

import { getContext, setContext } from 'svelte';

const KEY = Symbol('sve-ui:command-results');

export interface CommandResults {
	/** Visible items after filtering. */
	readonly count: number;
	/**
	 * Whether the user has actually searched. Announcing the count of an unfiltered
	 * list the moment a palette opens is noise, not information.
	 */
	readonly searching: boolean;
}

export function setCommandResults(get: () => CommandResults): void {
	setContext(KEY, get);
}

/** Returns a zero state when used outside a Root, rather than throwing. */
export function useCommandResults(): () => CommandResults {
	return getContext<() => CommandResults>(KEY) ?? (() => ({ count: 0, searching: false }));
}
