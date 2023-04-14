<script lang="ts">
	export let colStart = 'auto';
	export let colEnd = 'auto';
	export let rowStart = 'auto';
	export let rowEnd = 'auto';
	export let area = '';
	export let justifySelf:
		| 'start'
		| 'end'
		| 'center'
		| 'stretch'
		| 'auto'
		| 'inherit'
		| 'initial'
		| 'unset'
		| 'revert'
		| 'normal'
		| 'baseline'
		| 'first baseline'
		| 'last baseline'
		| 'self-start'
		| 'self-end'
		| 'left'
		| 'right'
		| 'safe center'
		| 'unsafe center'
		| 'flex-start'
		| 'flex-end' = 'auto';
	export let alignSelf:
		| 'start'
		| 'end'
		| 'center'
		| 'stretch'
		| 'auto'
		| 'inherit'
		| 'initial'
		| 'unset'
		| 'revert'
		| 'normal'
		| 'baseline'
		| 'first baseline'
		| 'last baseline' = 'auto';
</script>

<div
	style="
    grid-column-start: {colStart};
    grid-column-end: {colEnd};
    grid-row-start: {rowStart};
    grid-row-end: {rowEnd};
    grid-area: {area};
    justify-self: {justifySelf};
    align-self: {alignSelf};
  "
>
	<slot />
</div>
