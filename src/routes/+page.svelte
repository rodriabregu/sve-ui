<script>
	import Box from '$lib/components/Box/Box.svelte';
	import Button from '$lib/components/Button/Button.svelte';
	import Grid from '$lib/components/Grid/Grid.svelte';
	import DotSpinner from '$lib/components/Loaders/DotSpinner.svelte';
	import DotPulse from '$lib/components/Loaders/DotPulse.svelte';
	import DotWave from '$lib/components/Loaders/DotWave.svelte';
	import Verified from '$lib/components/Icons/verified.svelte';
	import Home from '$lib/components/Icons/home.svelte';
	import ArrowDownCircle from '$lib/components/Icons/arrowDownCircle.svelte';
</script>

<Grid columns={2}>
	<Box
		d={'flex'}
		h={'min(35vw,400px)'}
		br="8px"
		alignItems={'center'}
		justifyContent={'center'}
		bg={'#3d405b'}
	>
		<DotWave color="white" />
	</Box>
	<Box
		d={'flex'}
		h={'min(35vw,400px)'}
		br="8px"
		alignItems={'center'}
		justifyContent={'center'}
		bg={'#e07a5f'}
	>
		<DotPulse color="white" />
	</Box>
	<Box
		d={'flex'}
		h={'min(35vw,400px)'}
		br="8px"
		alignItems={'center'}
		justifyContent={'center'}
		bg={'#e6ddcf'}
	>
		<DotSpinner color="white" />
	</Box>
	<Box
		d={'flex'}
		h={'min(35vw,400px)'}
		br="8px"
		alignItems={'center'}
		justifyContent={'center'}
		bg={'#3d405b'}
	>
		<Button size="sm">Click me</Button>
	</Box>

	<Home />
	<ArrowDownCircle />
</Grid>
