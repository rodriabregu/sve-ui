<script lang="ts">
	export let width = '100%';
	export let height = '100%';
</script>

<div
	style="display: flex; justify-content: center; align-items: center; width: {width}; height: {height}"
	{...$$restProps}
>
	<slot />
</div>
