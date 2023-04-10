<script lang="ts">
	import Box from '../Box/Box.svelte';

	export let dir = 'row';
	export let direction = 'row';
	export let justify = 'flex-start';
	export let align = 'stretch';
	export let wrap = 'nowrap';
	export let gap = 0;
	export let d = '';
	export let display = '';
	export let style = '';
</script>

<Box
	style={`
    display: ${d || display || 'flex'};
    flex-direction: ${dir || direction};
    justify-content: ${justify};
    align-items: ${align};
    flex-wrap: ${wrap};
    gap: ${gap}rem;
    ${style}
  `}
	{...$$restProps}
>
	<slot />
</Box>
