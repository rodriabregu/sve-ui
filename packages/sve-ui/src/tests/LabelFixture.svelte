<script lang="ts">
	import Label from '$lib/components/Label/Label.svelte';
	import Input from '$lib/components/Input/Input.svelte';

	type Size = 'sm' | 'md' | 'lg';

	interface Props {
		size?: Size;
		required?: boolean;
		class?: string;
		content?: string;
	}

	let { size, required, class: cls, content = 'Email address' }: Props = $props();
</script>

<Label {size} {required} class={cls} for="fixture-input">{content}</Label>
<Input id="fixture-input" type="email" />
