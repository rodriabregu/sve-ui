<script lang="ts">
	import * as Empty from '$lib/components/Empty/index.js';

	interface Props {
		/**
		 * Passing `announce: undefined` would still be passing the prop, and
		 * `announce={undefined}` hits the component's fallback — so a test written
		 * that way measures this fixture's default instead of the component's. This
		 * flag renders Root with the attribute genuinely absent.
		 *
		 * Found by mutation: flipping the component default to `true` left every
		 * test green.
		 */
		omitAnnounce?: boolean;
		announce?: boolean;
		level?: 2 | 3 | 4 | 5 | 6;
	}

	let { omitAnnounce = false, announce = false, level }: Props = $props();
</script>

{#snippet body()}
	<Empty.Media><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /></svg></Empty.Media>
	<Empty.Title {level}>No projects yet</Empty.Title>
	<Empty.Description>Projects you create will show up here.</Empty.Description>
	<Empty.Actions><button type="button">New project</button></Empty.Actions>
{/snippet}

{#if omitAnnounce}
	<Empty.Root>{@render body()}</Empty.Root>
{:else}
	<Empty.Root {announce}>{@render body()}</Empty.Root>
{/if}
