<script lang="ts">
	import {
		Button,
		Badge,
		Text,
		Heading,
		Avatar,
		Spinner,
		Card,
		Alert,
		Input,
		Dialog,
		DropdownMenu,
		Tooltip,
		Popover
	} from 'sve-ui';

	let dialogOpen = $state(false);
</script>

<svelte:head>
	<title>Components — Sve-UI</title>
	<meta name="description" content="All 13 Sve-UI components with live examples." />
</svelte:head>

<div class="max-w-4xl mx-auto px-6 py-10">
	<Heading level={1} size="lg" class="mb-2">Components</Heading>
	<Text size="lg" class="mb-10" style="opacity: 0.7;">
		All 13 components with live examples. Use the dark mode toggle in the navbar to see theming in
		action.
	</Text>

	<!-- SECTION: Forms -->
	<section class="mb-14">
		<Heading level={2} size="md" class="mb-6 pb-2 border-b" style="border-color: var(--sve-color-default-border);">
			Forms
		</Heading>

		<!-- Button -->
		<div class="mb-10">
			<Heading level={3} size="sm" class="mb-1">Button</Heading>
			<Text size="sm" class="mb-4" style="opacity: 0.6;">variant × color × size</Text>

			<div class="space-y-4">
				<div class="flex flex-wrap gap-3">
					<Button variant="solid" color="primary">Primary</Button>
					<Button variant="solid" color="secondary">Secondary</Button>
					<Button variant="solid" color="success">Success</Button>
					<Button variant="solid" color="warning">Warning</Button>
					<Button variant="solid" color="danger">Danger</Button>
					<Button variant="solid" color="default">Default</Button>
				</div>
				<div class="flex flex-wrap gap-3">
					<Button variant="outline" color="primary">Outline</Button>
					<Button variant="ghost" color="primary">Ghost</Button>
					<Button variant="flat" color="primary">Flat</Button>
				</div>
				<div class="flex flex-wrap items-center gap-3">
					<Button variant="solid" color="primary" size="sm">Small</Button>
					<Button variant="solid" color="primary" size="md">Medium</Button>
					<Button variant="solid" color="primary" size="lg">Large</Button>
				</div>
				<div class="flex flex-wrap gap-3">
					<Button variant="solid" color="primary" disabled>Disabled</Button>
				</div>
			</div>
		</div>

		<!-- Input -->
		<div class="mb-10">
			<Heading level={3} size="sm" class="mb-1">Input</Heading>
			<Text size="sm" class="mb-4" style="opacity: 0.6;">variant × size × invalid state</Text>

			<div class="flex flex-col gap-3 max-w-sm">
				<Input variant="outline" size="md" placeholder="Outline input" />
				<Input variant="filled" size="md" placeholder="Filled input" />
				<Input variant="outline" size="sm" placeholder="Small input" />
				<Input variant="outline" size="lg" placeholder="Large input" />
				<Input variant="outline" size="md" placeholder="Invalid input" invalid />
			</div>
		</div>
	</section>

	<!-- SECTION: Display -->
	<section class="mb-14">
		<Heading level={2} size="md" class="mb-6 pb-2 border-b" style="border-color: var(--sve-color-default-border);">
			Display
		</Heading>

		<!-- Text -->
		<div class="mb-10">
			<Heading level={3} size="sm" class="mb-1">Text</Heading>
			<Text size="sm" class="mb-4" style="opacity: 0.6;">as × size × weight × color × align</Text>

			<div class="flex flex-col gap-2">
				<Text size="lg">Large text — size lg</Text>
				<Text size="md">Medium text — size md (default)</Text>
				<Text size="sm" style="opacity: 0.6;">Small text — size sm</Text>
				<Text weight="bold" color="primary">Bold primary text</Text>
				<Text weight="medium" color="success">Medium success text</Text>
				<Text as="code" size="sm" color="default">Inline code element</Text>
			</div>
		</div>

		<!-- Heading -->
		<div class="mb-10">
			<Heading level={3} size="sm" class="mb-1">Heading</Heading>
			<Text size="sm" class="mb-4" style="opacity: 0.6;">level × size × weight × color</Text>

			<div class="flex flex-col gap-2">
				<Heading level={1} size="lg">Heading level 1 — lg</Heading>
				<Heading level={2} size="md">Heading level 2 — md</Heading>
				<Heading level={3} size="sm">Heading level 3 — sm</Heading>
				<Heading level={4} color="primary">Heading level 4 — primary</Heading>
				<Heading level={5} color="secondary" weight="medium">Heading 5 — secondary medium</Heading>
			</div>
		</div>

		<!-- Badge -->
		<div class="mb-10">
			<Heading level={3} size="sm" class="mb-1">Badge</Heading>
			<Text size="sm" class="mb-4" style="opacity: 0.6;">variant × color × size</Text>

			<div class="space-y-3">
				<div class="flex flex-wrap gap-2">
					<Badge color="primary">Primary</Badge>
					<Badge color="secondary">Secondary</Badge>
					<Badge color="success">Success</Badge>
					<Badge color="warning">Warning</Badge>
					<Badge color="danger">Danger</Badge>
					<Badge color="default">Default</Badge>
				</div>
				<div class="flex flex-wrap gap-2">
					<Badge color="primary" variant="subtle">Subtle</Badge>
					<Badge color="success" variant="outline">Outline</Badge>
					<Badge color="danger" variant="solid">Solid</Badge>
				</div>
				<div class="flex flex-wrap items-center gap-2">
					<Badge color="primary" size="sm">Small</Badge>
					<Badge color="primary" size="md">Medium</Badge>
					<Badge color="primary" size="lg">Large</Badge>
				</div>
			</div>
		</div>

		<!-- Avatar -->
		<div class="mb-10">
			<Heading level={3} size="sm" class="mb-1">Avatar</Heading>
			<Text size="sm" class="mb-4" style="opacity: 0.6;">size × shape — Image + Fallback</Text>

			<div class="flex flex-wrap items-center gap-4">
				<Avatar.Root size="sm">
					<Avatar.Image src="https://github.com/rodriabregu.png" alt="Rodrigo" />
					<Avatar.Fallback>RA</Avatar.Fallback>
				</Avatar.Root>
				<Avatar.Root size="md">
					<Avatar.Image src="https://github.com/rodriabregu.png" alt="Rodrigo" />
					<Avatar.Fallback>RA</Avatar.Fallback>
				</Avatar.Root>
				<Avatar.Root size="lg">
					<Avatar.Image src="https://github.com/rodriabregu.png" alt="Rodrigo" />
					<Avatar.Fallback>RA</Avatar.Fallback>
				</Avatar.Root>
				<!-- Fallback only (no image) -->
				<Avatar.Root size="md" shape="square">
					<Avatar.Fallback>SQ</Avatar.Fallback>
				</Avatar.Root>
				<Avatar.Root size="md">
					<Avatar.Fallback>PF</Avatar.Fallback>
				</Avatar.Root>
			</div>
		</div>

		<!-- Spinner -->
		<div class="mb-10">
			<Heading level={3} size="sm" class="mb-1">Spinner</Heading>
			<Text size="sm" class="mb-4" style="opacity: 0.6;">size × color</Text>

			<div class="flex flex-wrap items-center gap-6">
				<Spinner size="sm" color="primary" />
				<Spinner size="md" color="success" />
				<Spinner size="lg" color="warning" />
				<Spinner size="md" color="danger" />
				<Spinner size="md" color="default" />
			</div>
		</div>

		<!-- Card -->
		<div class="mb-10">
			<Heading level={3} size="sm" class="mb-1">Card</Heading>
			<Text size="sm" class="mb-4" style="opacity: 0.6;">variant × padding — Header + Content + Footer</Text>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<Card.Root variant="elevated">
					<Card.Header>
						<Heading level={4} size="sm">Elevated card</Heading>
					</Card.Header>
					<Card.Content>
						<Text size="sm">Card content goes here. Supports Header, Content, and Footer sections.</Text>
					</Card.Content>
					<Card.Footer>
						<Button variant="solid" color="primary" size="sm">Action</Button>
					</Card.Footer>
				</Card.Root>

				<Card.Root variant="outlined">
					<Card.Header>
						<Heading level={4} size="sm">Outline card</Heading>
					</Card.Header>
					<Card.Content>
						<Text size="sm">Outline variant with a visible border. No drop shadow.</Text>
					</Card.Content>
					<Card.Footer>
						<Button variant="outline" color="default" size="sm">Cancel</Button>
					</Card.Footer>
				</Card.Root>
			</div>
		</div>
	</section>

	<!-- SECTION: Feedback -->
	<section class="mb-14">
		<Heading level={2} size="md" class="mb-6 pb-2 border-b" style="border-color: var(--sve-color-default-border);">
			Feedback
		</Heading>

		<!-- Alert -->
		<div class="mb-10">
			<Heading level={3} size="sm" class="mb-1">Alert</Heading>
			<Text size="sm" class="mb-4" style="opacity: 0.6;">color × variant — subtle / solid / outline</Text>

			<div class="flex flex-col gap-3">
				<Alert.Root color="success" variant="subtle">
					<Alert.Title>Success</Alert.Title>
					<Alert.Description>Your data has been saved successfully.</Alert.Description>
				</Alert.Root>
				<Alert.Root color="warning" variant="subtle">
					<Alert.Title>Warning</Alert.Title>
					<Alert.Description>Please review before submitting.</Alert.Description>
				</Alert.Root>
				<Alert.Root color="danger" variant="solid">
					<Alert.Title>Error</Alert.Title>
					<Alert.Description>Something went wrong. Please try again.</Alert.Description>
				</Alert.Root>
				<Alert.Root color="primary" variant="outline">
					<Alert.Title>Info</Alert.Title>
					<Alert.Description>New components are available in this release.</Alert.Description>
				</Alert.Root>
			</div>
		</div>
	</section>

	<!-- SECTION: Overlays -->
	<section class="mb-14">
		<Heading level={2} size="md" class="mb-6 pb-2 border-b" style="border-color: var(--sve-color-default-border);">
			Overlays
		</Heading>

		<!-- Dialog -->
		<div class="mb-10">
			<Heading level={3} size="sm" class="mb-1">Dialog</Heading>
			<Text size="sm" class="mb-4" style="opacity: 0.6;">Modal dialog — focus-trapped, WAI-ARIA compliant</Text>

			<Dialog.Root bind:open={dialogOpen}>
				<Dialog.Trigger>
					{#snippet child({ props })}
						<Button variant="solid" color="primary" {...props}>Open Dialog</Button>
					{/snippet}
				</Dialog.Trigger>
				<Dialog.Overlay />
				<Dialog.Content>
					<Dialog.Title>Example Dialog</Dialog.Title>
					<Dialog.Description>
						This dialog is built on bits-ui for full WAI-ARIA compliance with focus trapping and
						keyboard navigation.
					</Dialog.Description>
					<div class="mt-4 flex gap-2 justify-end">
						<Dialog.Close>
							{#snippet child({ props })}
								<Button variant="outline" color="default" size="sm" {...props}>Cancel</Button>
							{/snippet}
						</Dialog.Close>
						<Button variant="solid" color="primary" size="sm" onclick={() => (dialogOpen = false)}>
							Confirm
						</Button>
					</div>
				</Dialog.Content>
			</Dialog.Root>
		</div>

		<!-- Tooltip -->
		<div class="mb-10">
			<Heading level={3} size="sm" class="mb-1">Tooltip</Heading>
			<Text size="sm" class="mb-4" style="opacity: 0.6;">Hover to reveal</Text>

			<Tooltip.Provider>
				<div class="flex flex-wrap gap-4">
					<Tooltip.Root>
						<Tooltip.Trigger>
							{#snippet child({ props })}
								<Button variant="outline" color="default" size="sm" {...props}>Hover me</Button>
							{/snippet}
						</Tooltip.Trigger>
						<Tooltip.Content>
							<Text size="sm">Tooltip content here</Text>
						</Tooltip.Content>
					</Tooltip.Root>

					<Tooltip.Root>
						<Tooltip.Trigger>
							{#snippet child({ props })}
								<Badge color="primary" {...props}>Badge with tooltip</Badge>
							{/snippet}
						</Tooltip.Trigger>
						<Tooltip.Content>
							<Text size="sm">Tooltips work on any element</Text>
						</Tooltip.Content>
					</Tooltip.Root>
				</div>
			</Tooltip.Provider>
		</div>

		<!-- Popover -->
		<div class="mb-10">
			<Heading level={3} size="sm" class="mb-1">Popover</Heading>
			<Text size="sm" class="mb-4" style="opacity: 0.6;">Click to toggle rich content panel</Text>

			<Popover.Root>
				<Popover.Trigger>
					{#snippet child({ props })}
						<Button variant="outline" color="primary" {...props}>Open Popover</Button>
					{/snippet}
				</Popover.Trigger>
				<Popover.Content>
					<Heading level={4} size="sm" class="mb-2">Popover content</Heading>
					<Text size="sm">
						Popovers are great for secondary actions, filters, or contextual info panels. They are
						fully accessible and keyboard-navigable.
					</Text>
					<div class="mt-3">
						<Popover.Close>
							{#snippet child({ props })}
								<Button variant="ghost" color="default" size="sm" {...props}>Close</Button>
							{/snippet}
						</Popover.Close>
					</div>
				</Popover.Content>
			</Popover.Root>
		</div>

		<!-- DropdownMenu -->
		<div class="mb-10">
			<Heading level={3} size="sm" class="mb-1">DropdownMenu</Heading>
			<Text size="sm" class="mb-4" style="opacity: 0.6;">Keyboard-navigable menu</Text>

			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					{#snippet child({ props })}
						<Button variant="solid" color="default" {...props}>
							Options ▾
						</Button>
					{/snippet}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Item>
						Profile
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						Settings
					</DropdownMenu.Item>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>
						Sign out
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</section>
</div>
