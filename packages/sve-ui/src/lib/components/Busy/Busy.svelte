<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'class' | 'children'> {
		/** Whether the content is being loaded or replaced. */
		busy: boolean;
		/**
		 * Announced if the wait is long enough to notice. Say what is loading:
		 * "Loading projects" beats "Loading".
		 */
		label: string;
		/**
		 * Announced when the wait ends. Say what arrived — "3 projects" — because
		 * "done" tells the user the wait is over and nothing about the result.
		 *
		 * Omitting it means the user is told the content is loading and never told it
		 * finished, which is worse than saying nothing at all. Pass it.
		 */
		doneLabel?: string;
		/**
		 * Milliseconds before the loading message is announced.
		 *
		 * A response that arrives in 80ms does not need narrating; announcing it just
		 * talks over the user for no reason. If the wait beats this, only the
		 * completion is announced.
		 * @default 400
		 */
		delay?: number;
		/** Extra classes merged onto the region. */
		class?: string;
		children: Snippet;
	}

	let { busy, label, doneLabel, delay = 400, class: cls, children, ...rest }: Props = $props();

	let announced = $state('');

	$effect(() => {
		if (busy) {
			const timer = setTimeout(() => {
				announced = label;
			}, delay);
			return () => clearTimeout(timer);
		}

		// Finished. Report it whether or not the start was announced: the arrival of
		// content is the part the user cannot see coming.
		// Reported whether or not the start was announced: a wait too short to
		// narrate still ends in content the user could not see coming.
		announced = doneLabel ?? '';
	});
</script>

<!--
  Marks a region as loading, and says so.

  Written because a real consumer needed it and the library had nothing: there
  was no way to express "this region is loading". `Spinner` is decorative and
  `aria-busy` appeared in two components out of sixty, so a screen reader user
  got silence for the length of the request and then content appearing with no
  warning.

  `aria-busy` tells assistive technology the content is unstable — a screen
  reader can hold off reading a half-built region. The live region is separate,
  because `aria-busy` announces nothing on its own.
-->
<div
	class={['sve-busy', cls].filter(Boolean).join(' ')}
	data-slot="busy"
	aria-busy={busy ? true : undefined}
	{...rest}
>
	{@render children()}

	<!-- Polite: the user asked for this, so it is an answer, not an interruption. -->
	<div class="sve-busy__status" role="status" aria-live="polite" aria-atomic="true">
		{announced}
	</div>
</div>

<style>
	.sve-busy {
		position: relative;
	}

	/* Clipped, not removed: the text is the whole payload. */
	.sve-busy__status {
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
