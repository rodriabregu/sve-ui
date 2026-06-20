<script>
	import { Box, DotPulse, DotSpinner, DotWave, Grid } from 'sve-ui';
</script>

<Grid columns={2}>
	<Box
		d={'flex'}
		h={'min(25vw,400px)'}
		br="8px"
		alignItems={'center'}
		justifyContent={'center'}
		bg={'#3d405b'}
	>
		<DotWave />
	</Box>
	<Box
		d={'flex'}
		h={'min(25vw,400px)'}
		br="8px"
		alignItems={'center'}
		justifyContent={'center'}
		bg={'#e07a5f'}
	>
		<DotPulse />
	</Box>
</Grid>
<Box
	d={'flex'}
	h={'min(25vw,400px)'}
	br="8px"
	alignItems={'center'}
	justifyContent={'center'}
	bg={'#e6ddcf'}
	m={2}
>
	<DotSpinner />
</Box>
