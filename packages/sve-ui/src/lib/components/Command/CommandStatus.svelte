<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { useCommandResults } from './context.js';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'class' | 'children'> {
		/**
		 * Builds the announced text from the result count.
		 *
		 * Pass your own. The default is English, and a count is exactly the kind of
		 * string that needs the app's language and plural rules — `1 result` versus
		 * `1 resultado` versus languages with more than two plural forms.
		 */
		label?: (count: number) => string;
		/**
		 * Milliseconds to wait after the last keystroke before announcing.
		 *
		 * Not a performance tweak. Without it, typing "button" fires six
		 * announcements — "48 results", "12 results", "4 results" — and a screen
		 * reader user hears a torrent instead of an answer. Long enough to let typing
		 * settle, short enough to arrive while the search is still the subject.
		 * @default 500
		 */
		delay?: number;
		/** Extra classes merged onto the region. */
		class?: string;
	}

	let {
		label = (count: number) =>
			count === 0 ? 'No results' : count === 1 ? '1 result' : `${count} results`,
		delay = 500,
		class: cls,
		...rest
	}: Props = $props();

	const results = useCommandResults();

	/*
		What is currently announced, as opposed to what is currently true. They differ
		for `delay` milliseconds, which is the entire point.
	*/
	let announced = $state('');

	$effect(() => {
		const { count, searching } = results();

		// Nothing to say before the user has searched: the count of an unfiltered
		// list is not news.
		if (!searching) {
			announced = '';
			return;
		}

		const next = label(count);
		const timer = setTimeout(() => {
			announced = next;
		}, delay);

		return () => clearTimeout(timer);
	});
</script>

<!--
  A polite live region reporting how many results the current search produced.

  Bits filters the list and announces nothing, so the list shrank in silence.
  `polite` and never `assertive`: this is an answer to something the user just
  did, not an interruption worth talking over them for.

  It is visually hidden rather than absent, because the count is already visible
  — the results are right there. Duplicating it on screen would be noise for
  everyone else.
-->
<div
	class={['sve-command__status', cls].filter(Boolean).join(' ')}
	data-slot="command-status"
	role="status"
	aria-live="polite"
	aria-atomic="true"
	{...rest}
>
	{announced}
</div>

<style>
	/* Clipped, not removed: the text is the whole payload. */
	.sve-command__status {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
		border: 0;
	}
</style>
