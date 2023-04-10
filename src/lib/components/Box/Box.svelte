<script lang="ts">
	//to do add 'as' for dynamic tag
	export let p = 0;
	export let padding = 0;
	export let m = 0;
	export let margin = 0;
	export let w = '';
	export let width = '';
	export let h = '';
	export let height = '';
	export let bg = 'transparent';
	export let backgroundColor = 'transparent';
	export let color = 'inherit';
	export let border = 'none';
	export let br = '';
	export let borderRadius = '';
	export let d = '';
	export let display = '';
	export let fontSize = 1;
	export let style = '';
</script>

<div
	style={`
		padding: ${p || padding}rem;
		margin: ${m || margin}rem;
		width: ${w || width || 'auto'};
		height: ${h || height || 'auto'};
		background-color: ${bg || backgroundColor};
		color: ${color};
		border: ${border};
		border-radius: ${br || borderRadius || 'none'};
		display: ${d || display};
		font-size: ${fontSize}rem;
		${style}
	`}
	{...$$restProps}
>
	<slot />
</div>
