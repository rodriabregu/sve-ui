<script lang="ts">
	import * as InputGroup from '$lib/components/InputGroup/index.js';
	import Input from '$lib/components/Input/Input.svelte';

	interface Props {
		invalid?: boolean;
		size?: 'sm' | 'md' | 'lg';
		decorative?: boolean;
	}

	let { invalid = false, size, decorative = true }: Props = $props();
</script>

<InputGroup.Root {invalid} {size}>
	<InputGroup.Addon {decorative}>$</InputGroup.Addon>
	<Input {invalid} aria-label="Amount in dollars" />
	<InputGroup.Addon>USD</InputGroup.Addon>
</InputGroup.Root>
