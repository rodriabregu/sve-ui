<script lang="ts">
	import { Box, Grid, Text } from 'sve-ui';
</script>

<svelte:head>
	<title>Components - Sve-UI</title>
	<meta name="description" content="Section with all Sve-UI UI components." />
</svelte:head>

<Box>
	<h1>Components</h1>

	<span>Layout</span>
	<Grid m={1} columns={2}>
		<Box bg={'#fff'} br="8px">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="400"
				height="300"
				viewBox="0 0 400 300"
				fill="none"
			>
				<rect x="53" y="76" width="176" height="29" rx="14.5" fill="#CBD5E0" />
				<rect x="53" y="123" width="294" height="12" rx="6" fill="#38B2AC" />
				<rect x="53" y="153" width="294" height="12" rx="6" fill="#38B2AC" />
				<rect x="53" y="183" width="294" height="12" rx="6" fill="#38B2AC" />
				<rect x="53" y="213" width="224" height="12" rx="6" fill="#38B2AC" />
			</svg>

			<Box bg="black">
				<Text color="white">Text</Text>
			</Box>
		</Box>

		<Box bg={'#fff'} br="8px">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="400"
				height="300"
				viewBox="0 0 400 300"
				fill="none"
			>
				<rect x="53" y="76" width="176" height="29" rx="14.5" fill="#CBD5E0" />
				<rect x="53" y="123" width="294" height="12" rx="6" fill="#38B2AC" />
				<rect x="53" y="153" width="294" height="12" rx="6" fill="#38B2AC" />
				<rect x="53" y="183" width="294" height="12" rx="6" fill="#38B2AC" />
				<rect x="53" y="213" width="224" height="12" rx="6" fill="#38B2AC" />
			</svg>

			<Box bg="black">
				<Text color="white">Text</Text>
			</Box>
		</Box>
	</Grid>
</Box>
