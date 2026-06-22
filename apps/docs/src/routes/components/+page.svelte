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
		Popover,
		Switch,
		Checkbox,
		RadioGroup,
		Tabs,
		Accordion,
		Code,
		Select,
		Combobox,
		Slider
	} from 'sve-ui';

	let dialogOpen = $state(false);
	let switchOn = $state(true);
	let checkboxOn = $state(true);
	let radioValue = $state('comfortable');
	let tabValue = $state('account');
	let selectValue = $state('');
	let comboValue = $state('');
	let sliderValue = $state(40);

	const fruits = ['Apple', 'Banana', 'Cherry', 'Mango'];
	let comboQuery = $state('');
	let filteredFruits = $derived(
		fruits.filter((f) => f.toLowerCase().includes(comboQuery.toLowerCase()))
	);
</script>

<svelte:head>
	<title>Components — Sve-UI</title>
	<meta name="description" content="Every Sve-UI component with live examples." />
</svelte:head>

<div class="max-w-4xl mx-auto px-6 py-10">
	<Heading level={1} size="lg" class="mb-2">Components</Heading>
	<Text size="lg" class="mb-10" style="opacity: 0.7;">
		Every component with live examples. Use the dark mode toggle in the navbar to see theming in
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

	<!-- SECTION: Form controls -->
	<section class="mb-14">
		<Heading level={2} size="md" class="mb-6 pb-2 border-b" style="border-color: var(--sve-color-default-border);">
			Form controls
		</Heading>

		<!-- Switch -->
		<div class="mb-10">
			<Heading level={3} size="sm" class="mb-1">Switch</Heading>
			<Text size="sm" class="mb-4" style="opacity: 0.6;">size — bind:checked</Text>
			<div class="flex flex-wrap items-center gap-4">
				<Switch.Root bind:checked={switchOn} size="sm" />
				<Switch.Root bind:checked={switchOn} size="md" />
				<Switch.Root bind:checked={switchOn} size="lg" />
				<Text size="sm" style="opacity: 0.6;">checked: {switchOn}</Text>
			</div>
		</div>

		<!-- Checkbox -->
		<div class="mb-10">
			<Heading level={3} size="sm" class="mb-1">Checkbox</Heading>
			<Text size="sm" class="mb-4" style="opacity: 0.6;">size — bind:checked + indeterminate</Text>
			<div class="flex flex-wrap items-center gap-4">
				<label class="flex items-center gap-2">
					<Checkbox.Root bind:checked={checkboxOn} size="sm" />
					<Text size="sm">Small</Text>
				</label>
				<label class="flex items-center gap-2">
					<Checkbox.Root bind:checked={checkboxOn} size="md" />
					<Text size="sm">Medium</Text>
				</label>
				<Checkbox.Root indeterminate size="md" />
				<Text size="sm" style="opacity: 0.6;">checked: {checkboxOn}</Text>
			</div>
		</div>

		<!-- Radio Group -->
		<div class="mb-10">
			<Heading level={3} size="sm" class="mb-1">RadioGroup</Heading>
			<Text size="sm" class="mb-4" style="opacity: 0.6;">Root + Item — bind:value</Text>
			<RadioGroup.Root bind:value={radioValue}>
				{#each ['comfortable', 'compact', 'spacious'] as option (option)}
					<label class="flex items-center gap-2">
						<RadioGroup.Item value={option} />
						<Text size="sm" class="capitalize">{option}</Text>
					</label>
				{/each}
			</RadioGroup.Root>
			<Text size="sm" class="mt-3" style="opacity: 0.6;">value: {radioValue}</Text>
		</div>

		<!-- Slider -->
		<div class="mb-10">
			<Heading level={3} size="sm" class="mb-1">Slider</Heading>
			<Text size="sm" class="mb-4" style="opacity: 0.6;">value · min · max · step</Text>
			<div class="max-w-sm">
				<Slider type="single" value={sliderValue} onValueChange={(v) => (sliderValue = v as number)} max={100} step={1} />
				<Text size="sm" class="mt-3" style="opacity: 0.6;">value: {sliderValue}</Text>
			</div>
		</div>

		<!-- Select -->
		<div class="mb-10">
			<Heading level={3} size="sm" class="mb-1">Select</Heading>
			<Text size="sm" class="mb-4" style="opacity: 0.6;">Root + Trigger + Content + Item — bind:value</Text>
			<div class="max-w-xs">
				<Select.Root type="single" bind:value={selectValue}>
					<Select.Trigger>{selectValue || 'Pick a fruit'}</Select.Trigger>
					<Select.Content>
						{#each fruits as fruit (fruit)}
							<Select.Item value={fruit} label={fruit}>{fruit}</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
				<Text size="sm" class="mt-3" style="opacity: 0.6;">value: {selectValue}</Text>
			</div>
		</div>

		<!-- Combobox -->
		<div class="mb-10">
			<Heading level={3} size="sm" class="mb-1">Combobox</Heading>
			<Text size="sm" class="mb-4" style="opacity: 0.6;">Root + Input + Content + Item — type to filter</Text>
			<div class="max-w-xs">
				<Combobox.Root type="single" bind:value={comboValue}>
					<Combobox.Input placeholder="Search fruit…" oninput={(e) => (comboQuery = e.currentTarget.value)} />
					<Combobox.Content>
						{#each filteredFruits as fruit (fruit)}
							<Combobox.Item value={fruit} label={fruit}>{fruit}</Combobox.Item>
						{/each}
					</Combobox.Content>
				</Combobox.Root>
				<Text size="sm" class="mt-3" style="opacity: 0.6;">value: {comboValue}</Text>
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
					<Avatar.Image src="https://i.pravatar.cc/150?img=12" alt="Example user" />
					<Avatar.Fallback>RA</Avatar.Fallback>
				</Avatar.Root>
				<Avatar.Root size="md">
					<Avatar.Image src="https://i.pravatar.cc/150?img=12" alt="Example user" />
					<Avatar.Fallback>RA</Avatar.Fallback>
				</Avatar.Root>
				<Avatar.Root size="lg">
					<Avatar.Image src="https://i.pravatar.cc/150?img=12" alt="Example user" />
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

	<!-- SECTION: Navigation & content -->
	<section class="mb-14">
		<Heading level={2} size="md" class="mb-6 pb-2 border-b" style="border-color: var(--sve-color-default-border);">
			Navigation & content
		</Heading>

		<!-- Tabs -->
		<div class="mb-10">
			<Heading level={3} size="sm" class="mb-1">Tabs</Heading>
			<Text size="sm" class="mb-4" style="opacity: 0.6;">Root + List + Trigger + Content — bind:value</Text>
			<Tabs.Root bind:value={tabValue}>
				<Tabs.List>
					<Tabs.Trigger value="account">Account</Tabs.Trigger>
					<Tabs.Trigger value="password">Password</Tabs.Trigger>
					<Tabs.Trigger value="team">Team</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="account"><Text size="sm">Manage your account details.</Text></Tabs.Content>
				<Tabs.Content value="password"><Text size="sm">Change your password here.</Text></Tabs.Content>
				<Tabs.Content value="team"><Text size="sm">Invite and manage team members.</Text></Tabs.Content>
			</Tabs.Root>
		</div>

		<!-- Accordion -->
		<div class="mb-10">
			<Heading level={3} size="sm" class="mb-1">Accordion</Heading>
			<Text size="sm" class="mb-4" style="opacity: 0.6;">Root + Item + Header + Trigger + Content — single / multiple</Text>
			<Accordion.Root type="single">
				<Accordion.Item value="a">
					<Accordion.Header>
						<Accordion.Trigger>Is it accessible?</Accordion.Trigger>
					</Accordion.Header>
					<Accordion.Content>Yes — built on Bits UI with full WAI-ARIA support and keyboard navigation.</Accordion.Content>
				</Accordion.Item>
				<Accordion.Item value="b">
					<Accordion.Header>
						<Accordion.Trigger>Does it need Tailwind?</Accordion.Trigger>
					</Accordion.Header>
					<Accordion.Content>No. Styles ship with the package; theme everything via CSS variables.</Accordion.Content>
				</Accordion.Item>
			</Accordion.Root>
		</div>

		<!-- Code -->
		<div class="mb-10">
			<Heading level={3} size="sm" class="mb-1">Code</Heading>
			<Text size="sm" class="mb-4" style="opacity: 0.6;">code + label + copy-to-clipboard</Text>
			<Code
				label="App.svelte"
				code={`import { Button } from 'sve-ui';\n\n<Button color="primary">Ship it</Button>`}
			/>
		</div>
	</section>
</div>
