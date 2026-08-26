<script lang="ts">
	/**
	 * Kitchen-sink fixture: every component rendered in its INTENDED accessible
	 * configuration (labels, names, roles present). Used by a11y.test.ts to assert
	 * the library ships components that pass axe when used correctly.
	 *
	 * Interactive overlays render their trigger only (closed state) — opened
	 * content is portaled and is an e2e concern.
	 */
	import Button from '$lib/components/Button/Button.svelte';
	import Badge from '$lib/components/Badge/Badge.svelte';
	import Input from '$lib/components/Input/Input.svelte';
	import Heading from '$lib/components/Heading/Heading.svelte';
	import Text from '$lib/components/Text/Text.svelte';
	import Spinner from '$lib/components/Spinner/Spinner.svelte';
	import Slider from '$lib/components/Slider/Slider.svelte';
	import Code from '$lib/components/Code/Code.svelte';
	import Textarea from '$lib/components/Textarea/Textarea.svelte';
	import Label from '$lib/components/Label/Label.svelte';
	import Skeleton from '$lib/components/Skeleton/Skeleton.svelte';
	import Separator from '$lib/components/Separator/Separator.svelte';
	import Toggle from '$lib/components/Toggle/Toggle.svelte';
	import Progress from '$lib/components/Progress/Progress.svelte';
	import Meter from '$lib/components/Meter/Meter.svelte';
	import AspectRatio from '$lib/components/AspectRatio/AspectRatio.svelte';
	import * as Collapsible from '$lib/components/Collapsible/index.js';
	import * as ToggleGroup from '$lib/components/ToggleGroup/index.js';
	import * as AlertDialog from '$lib/components/AlertDialog/index.js';
	import * as Sheet from '$lib/components/Sheet/index.js';
	import * as LinkPreview from '$lib/components/LinkPreview/index.js';
	import * as ContextMenu from '$lib/components/ContextMenu/index.js';
	import * as ScrollArea from '$lib/components/ScrollArea/index.js';
	import * as Toolbar from '$lib/components/Toolbar/index.js';
	import * as Menubar from '$lib/components/Menubar/index.js';
	import * as Pagination from '$lib/components/Pagination/index.js';
	import * as Breadcrumb from '$lib/components/Breadcrumb/index.js';
	import * as NavigationMenu from '$lib/components/NavigationMenu/index.js';
	import * as Command from '$lib/components/Command/index.js';
	import * as PinInput from '$lib/components/PinInput/index.js';
	import * as RatingGroup from '$lib/components/RatingGroup/index.js';
	import Stack from '$lib/components/Stack/Stack.svelte';
	import Flex from '$lib/components/Flex/Flex.svelte';
	import * as Calendar from '$lib/components/Calendar/index.js';
	import { CalendarDate } from '@internationalized/date';
	import * as DateField from '$lib/components/DateField/index.js';
	import * as DateRangeField from '$lib/components/DateRangeField/index.js';
	import * as DatePicker from '$lib/components/DatePicker/index.js';
	import * as Sidebar from '$lib/components/Sidebar/index.js';
	import * as Table from '$lib/components/Table/index.js';
	import * as Toast from '$lib/components/Toast/index.js';
	import Field from '$lib/components/Field/Field.svelte';

	let a11yFieldEmail = $state('');
	let a11yFieldAge = $state('');
	import * as Avatar from '$lib/components/Avatar/index.js';
	import * as Card from '$lib/components/Card/index.js';
	import * as Alert from '$lib/components/Alert/index.js';
	import * as Tabs from '$lib/components/Tabs/index.js';
	import * as Accordion from '$lib/components/Accordion/index.js';
	import * as Switch from '$lib/components/Switch/index.js';
	import * as Checkbox from '$lib/components/Checkbox/index.js';
	import * as RadioGroup from '$lib/components/RadioGroup/index.js';
	import * as Select from '$lib/components/Select/index.js';
	import * as Combobox from '$lib/components/Combobox/index.js';
	import * as Dialog from '$lib/components/Dialog/index.js';
	import * as DropdownMenu from '$lib/components/DropdownMenu/index.js';
	import * as Popover from '$lib/components/Popover/index.js';
	import * as Tooltip from '$lib/components/Tooltip/index.js';

	let switchOn = $state(false);
	let checkboxOn = $state(false);
	let radioValue = $state('a');
	let tabValue = $state('a');
	let selectValue = $state('');
	let comboValue = $state('');
	let togglePressed = $state(false);
	let toggleGroupValue = $state('left');
	let collapsibleOpen = $state(false);
	let toolbarMarks = $state<string[]>(['bold']);
	let paginationPage = $state(1);
	let navValue = $state('');
	let commandSearch = $state('');
	let commandValue = $state('');
	let pin = $state('');
	let rating = $state(3);
	let calValue = $state(new CalendarDate(2026, 1, 15));
	let calPlaceholder = $state(new CalendarDate(2026, 1, 1));
	let dfValue = $state<CalendarDate | undefined>(undefined);
	let drfValue = $state({
		start: undefined as CalendarDate | undefined,
		end: undefined as CalendarDate | undefined
	});
	let dpValue = $state<CalendarDate | undefined>(new CalendarDate(2026, 1, 15));
	let sidebarCollapsed = $state(false);
</script>

<!-- Display -->
<section aria-label="Avatar">
	<Avatar.Root
		><Avatar.Image src="" alt="Ada Lovelace" /><Avatar.Fallback>AL</Avatar.Fallback></Avatar.Root
	>
</section>
<section aria-label="Badge"><Badge>New</Badge></section>
<section aria-label="Card">
	<Card.Root
		><Card.Header><Heading level={3}>Card title</Heading></Card.Header><Card.Content
			><Text>Card body content.</Text></Card.Content
		></Card.Root
	>
</section>
<section aria-label="Typography">
	<Heading level={2}>Heading</Heading><Text>Body text.</Text>
</section>
<section aria-label="Skeleton">
	<div role="status" aria-busy="true" aria-label="Loading profile">
		<Skeleton variant="circle" />
		<Skeleton variant="text" width="14rem" />
	</div>
</section>

<!-- Forms -->
<section aria-label="Button"><Button>Save</Button></section>
<section aria-label="Input"><label>Email<Input type="email" /></label></section>
<section aria-label="Label and Textarea">
	<Label for="a11y-bio" required>Bio</Label>
	<Textarea id="a11y-bio" required />
</section>
<section aria-label="Switch">
	<Switch.Root aria-label="Enable notifications" bind:checked={switchOn} />
</section>
<section aria-label="Checkbox">
	<Checkbox.Root aria-label="Accept terms" bind:checked={checkboxOn} />
</section>
<section aria-label="Radio group">
	<RadioGroup.Root bind:value={radioValue} aria-label="Density">
		<RadioGroup.Item value="a" aria-label="Comfortable" />
		<RadioGroup.Item value="b" aria-label="Compact" />
	</RadioGroup.Root>
</section>
<section aria-label="Toggle">
	<Toggle bind:pressed={togglePressed} aria-label="Bold">B</Toggle>
</section>
<section aria-label="Toggle group">
	<ToggleGroup.Root type="single" bind:value={toggleGroupValue} aria-label="Text alignment">
		<ToggleGroup.Item value="left" aria-label="Align left">L</ToggleGroup.Item>
		<ToggleGroup.Item value="right" aria-label="Align right">R</ToggleGroup.Item>
	</ToggleGroup.Root>
</section>
<section aria-label="Date picker">
	<DatePicker.Root bind:value={dpValue} locale="en-US" calendarLabel="Departure date">
		<DatePicker.Label>Departure</DatePicker.Label>
		<DatePicker.Input>
			{#snippet children({ segments })}
				{#each segments as { part, value: sv }, i (i)}
					<DatePicker.Segment {part}>{sv}</DatePicker.Segment>
				{/each}
				<DatePicker.Trigger aria-label="Open calendar">C</DatePicker.Trigger>
			{/snippet}
		</DatePicker.Input>
	</DatePicker.Root>
</section>
<section aria-label="Date field">
	<DateField.Root bind:value={dfValue} locale="en-US">
		<DateField.Label>Departure date</DateField.Label>
		<DateField.Input>
			{#snippet children({ segments })}
				{#each segments as { part, value: sv }, i (i)}
					<DateField.Segment {part}>{sv}</DateField.Segment>
				{/each}
			{/snippet}
		</DateField.Input>
	</DateField.Root>
</section>
<section aria-label="Date range field">
	<DateRangeField.Root bind:value={drfValue} locale="en-US" aria-labelledby="a11y-drf-label">
		<DateRangeField.Label id="a11y-drf-label">Stay dates</DateRangeField.Label>
		<DateRangeField.Input type="start">
			{#snippet children({ segments })}
				{#each segments as { part, value: sv }, i (i)}
					<DateRangeField.Segment {part}>{sv}</DateRangeField.Segment>
				{/each}
			{/snippet}
		</DateRangeField.Input>
		<span aria-hidden="true">–</span>
		<DateRangeField.Input type="end">
			{#snippet children({ segments })}
				{#each segments as { part, value: sv }, i (i)}
					<DateRangeField.Segment {part}>{sv}</DateRangeField.Segment>
				{/each}
			{/snippet}
		</DateRangeField.Input>
	</DateRangeField.Root>
</section>
<section aria-label="Calendar">
	<Calendar.Root
		type="single"
		bind:value={calValue}
		bind:placeholder={calPlaceholder}
		calendarLabel="Departure date"
	>
		{#snippet children({ months, weekdays })}
			<Calendar.Header>
				<Calendar.PrevButton>‹</Calendar.PrevButton>
				<Calendar.Heading />
				<Calendar.NextButton>›</Calendar.NextButton>
			</Calendar.Header>
			{#each months as month (month.value)}
				<Calendar.Grid>
					<Calendar.GridHead>
						<Calendar.GridRow>
							{#each weekdays as day, i (i)}
								<Calendar.HeadCell>{day}</Calendar.HeadCell>
							{/each}
						</Calendar.GridRow>
					</Calendar.GridHead>
					<Calendar.GridBody>
						{#each month.weeks as week, i (i)}
							<Calendar.GridRow>
								{#each week as date (date)}
									<Calendar.Cell {date} month={month.value}><Calendar.Day /></Calendar.Cell>
								{/each}
							</Calendar.GridRow>
						{/each}
					</Calendar.GridBody>
				</Calendar.Grid>
			{/each}
		{/snippet}
	</Calendar.Root>
</section>
<section aria-label="PIN input">
	<span id="a11y-pin-label">Verification code</span>
	<PinInput.Root bind:value={pin} maxlength={4} aria-labelledby="a11y-pin-label">
		{#snippet children({ cells })}
			{#each cells as cell, i (i)}
				<PinInput.Cell {cell} />
			{/each}
		{/snippet}
	</PinInput.Root>
</section>
<section aria-label="Rating group">
	<RatingGroup.Root
		bind:value={rating}
		max={5}
		aria-label="Rating"
		aria-valuetext={(v, max) => `${v} of ${max} stars`}
	>
		{#snippet children({ items })}
			{#each items as item (item.index)}
				<RatingGroup.Item index={item.index}>★</RatingGroup.Item>
			{/each}
		{/snippet}
	</RatingGroup.Root>
</section>
<section aria-label="Slider"><Slider value={40} max={100} thumbLabel="Volume" /></section>
<section aria-label="Select">
	<Select.Root type="single" bind:value={selectValue}>
		<Select.Trigger aria-label="Pick a fruit">{selectValue || 'Pick a fruit'}</Select.Trigger>
		<Select.Content>
			<Select.Item value="apple" label="Apple">Apple</Select.Item>
		</Select.Content>
	</Select.Root>
</section>
<section aria-label="Combobox">
	<Combobox.Root type="single" bind:value={comboValue}>
		<Combobox.Input aria-label="Search fruit" />
		<Combobox.Content>
			<Combobox.Item value="apple" label="Apple">Apple</Combobox.Item>
		</Combobox.Content>
	</Combobox.Root>
</section>

<!-- Feedback -->
<section aria-label="Alert">
	<Alert.Root color="success"
		><Alert.Title>Saved</Alert.Title><Alert.Description>Your changes are live.</Alert.Description
		></Alert.Root
	>
</section>
<section aria-label="Spinner"><Spinner label="Loading" /></section>
<section aria-label="Progress"><Progress value={40} aria-label="Upload progress" /></section>
<section aria-label="Meter"><Meter value={70} aria-label="Disk usage" /></section>

<!-- Navigation -->
<section aria-label="Tabs">
	<Tabs.Root bind:value={tabValue}>
		<Tabs.List>
			<Tabs.Trigger value="a">Account</Tabs.Trigger>
			<Tabs.Trigger value="b">Password</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="a">Account panel</Tabs.Content>
		<Tabs.Content value="b">Password panel</Tabs.Content>
	</Tabs.Root>
</section>
<section aria-label="Accordion">
	<Accordion.Root type="single">
		<Accordion.Item value="a">
			<Accordion.Header><Accordion.Trigger>Section</Accordion.Trigger></Accordion.Header>
			<Accordion.Content>Panel content.</Accordion.Content>
		</Accordion.Item>
	</Accordion.Root>
</section>

<section aria-label="Navigation menu">
	<NavigationMenu.Root bind:value={navValue} aria-label="Site">
		<NavigationMenu.List>
			<NavigationMenu.Item value="products">
				<NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
			</NavigationMenu.Item>
			<NavigationMenu.Item value="pricing">
				<NavigationMenu.Link href="/pricing" active>Pricing</NavigationMenu.Link>
			</NavigationMenu.Item>
		</NavigationMenu.List>
	</NavigationMenu.Root>
</section>
<section aria-label="Sidebar">
	<Sidebar.Provider bind:collapsed={sidebarCollapsed} sidebarId="a11y-sidebar">
		<Sidebar.Trigger>M</Sidebar.Trigger>
		<Sidebar.Root label="Main navigation">
			<Sidebar.Header>Acme</Sidebar.Header>
			<Sidebar.Content>
				<Sidebar.Group aria-labelledby="a11y-grp">
					<Sidebar.GroupLabel id="a11y-grp">Platform</Sidebar.GroupLabel>
					<Sidebar.Menu>
						<Sidebar.Item href="/dashboard" active label="Dashboard">Dashboard</Sidebar.Item>
						<Sidebar.Item disabled label="Reports">Reports</Sidebar.Item>
					</Sidebar.Menu>
				</Sidebar.Group>
			</Sidebar.Content>
			<Sidebar.Footer>Account</Sidebar.Footer>
		</Sidebar.Root>
	</Sidebar.Provider>
</section>
<section aria-label="Menubar">
	<Menubar.Root aria-label="Main">
		<Menubar.Menu>
			<Menubar.Trigger>File</Menubar.Trigger>
		</Menubar.Menu>
	</Menubar.Root>
</section>
<section aria-label="Breadcrumb trail">
	<Breadcrumb.Root>
		<Breadcrumb.List>
			<Breadcrumb.Item><Breadcrumb.Link href="/">Home</Breadcrumb.Link></Breadcrumb.Item>
			<Breadcrumb.Separator />
			<Breadcrumb.Item><Breadcrumb.Link current>Settings</Breadcrumb.Link></Breadcrumb.Item>
		</Breadcrumb.List>
	</Breadcrumb.Root>
</section>
<section aria-label="Pagination region">
	<nav aria-label="Pagination">
		<Pagination.Root count={50} perPage={10} bind:page={paginationPage}>
			{#snippet children({ pages })}
				<Pagination.PrevButton aria-label="Previous page">Prev</Pagination.PrevButton>
				{#each pages as p (p.key)}
					{#if p.type === 'page'}
						<Pagination.Page page={p}>{p.value}</Pagination.Page>
					{/if}
				{/each}
				<Pagination.NextButton aria-label="Next page">Next</Pagination.NextButton>
			{/snippet}
		</Pagination.Root>
	</nav>
</section>
<section aria-label="Collapsible">
	<Collapsible.Root bind:open={collapsibleOpen}>
		<Collapsible.Trigger>Show details</Collapsible.Trigger>
		<Collapsible.Content>Panel content.</Collapsible.Content>
	</Collapsible.Root>
</section>

<!-- Overlays (trigger / closed state) -->
<section aria-label="Dialog">
	<Dialog.Root><Dialog.Trigger>Open dialog</Dialog.Trigger></Dialog.Root>
</section>
<section aria-label="Dropdown menu">
	<DropdownMenu.Root><DropdownMenu.Trigger>Open menu</DropdownMenu.Trigger></DropdownMenu.Root>
</section>
<section aria-label="Popover">
	<Popover.Root><Popover.Trigger>Show details</Popover.Trigger></Popover.Root>
</section>
<section aria-label="Context menu">
	<ContextMenu.Root
		><ContextMenu.Trigger>Right-click this row</ContextMenu.Trigger></ContextMenu.Root
	>
</section>
<section aria-label="Alert dialog">
	<AlertDialog.Root><AlertDialog.Trigger>Delete project</AlertDialog.Trigger></AlertDialog.Root>
</section>
<section aria-label="Sheet">
	<Sheet.Root><Sheet.Trigger>Open filters</Sheet.Trigger></Sheet.Root>
</section>
<section aria-label="Link preview">
	<LinkPreview.Root
		><LinkPreview.Trigger href="https://svelte.dev">Svelte</LinkPreview.Trigger></LinkPreview.Root
	>
</section>
<section aria-label="Tooltip">
	<Tooltip.Provider>
		<Tooltip.Root><Tooltip.Trigger>Hover me</Tooltip.Trigger></Tooltip.Root>
	</Tooltip.Provider>
</section>

<!-- Layout -->
<section aria-label="Layout primitives">
	<Stack gap={2} as="ul">
		<li>Stacked one</li>
		<li>Stacked two</li>
	</Stack>
	<Flex gap={2} justify="between">
		<span>Left</span>
		<span>Right</span>
	</Flex>
</section>
<section aria-label="Separator">
	<Separator />
	<Separator orientation="vertical" />
	<Separator decorative />
</section>
<section aria-label="Aspect ratio">
	<AspectRatio ratio={16 / 9}><img src="" alt="Sunset over the harbour" /></AspectRatio>
</section>

<section aria-label="Scroll area">
	<ScrollArea.Root type="always" style="height: 4rem; width: 8rem;">
		<ScrollArea.Viewport><p>Scrollable content.</p></ScrollArea.Viewport>
		<ScrollArea.Scrollbar orientation="vertical"><ScrollArea.Thumb /></ScrollArea.Scrollbar>
	</ScrollArea.Root>
</section>
<section aria-label="Toolbar">
	<Toolbar.Root aria-label="Formatting">
		<Toolbar.Group type="multiple" bind:value={toolbarMarks} aria-label="Text style">
			<Toolbar.GroupItem value="bold" aria-label="Bold">B</Toolbar.GroupItem>
		</Toolbar.Group>
		<Toolbar.Button>Save</Toolbar.Button>
		<Toolbar.Link href="/help">Help</Toolbar.Link>
	</Toolbar.Root>
</section>

<section aria-label="Command palette">
	<Command.Root label="Command palette" bind:value={commandValue}>
		<Command.Input bind:value={commandSearch} placeholder="Type a command" />
		<Command.List aria-label="Commands">
			<Command.Viewport>
				<Command.Empty>No results found.</Command.Empty>
				<Command.Group>
					<Command.GroupHeading>Actions</Command.GroupHeading>
					<Command.GroupItems>
						<Command.Item value="new-file">New file</Command.Item>
					</Command.GroupItems>
				</Command.Group>
			</Command.Viewport>
		</Command.List>
	</Command.Root>
</section>

<!-- Utilities -->
<section aria-label="Code"><Code code="const answer = 42;" /></section>

<section aria-label="Field">
	<!-- Both states: a valid field with help text, and an invalid one, so axe sees
	     an aria-describedby naming two ids at once. -->
	<Field label="Email" description="We never share it." required>
		{#snippet control(props)}
			<Input {...props} type="email" bind:value={a11yFieldEmail} />
		{/snippet}
	</Field>
	<Field label="Age" description="Used for age-restricted content." error="Enter a whole number.">
		{#snippet control(props)}
			<Input {...props} bind:value={a11yFieldAge} />
		{/snippet}
	</Field>
</section>

<section aria-label="Table">
	<Table.Root scrollLabel="Quarterly revenue, scrollable" zebra stickyHeader>
		<Table.Caption>Quarterly revenue by region</Table.Caption>
		<Table.Header>
			<Table.Row>
				<Table.Head>Region</Table.Head>
				<Table.Head sortable sort="asc" numeric>Revenue</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			<Table.Row selected>
				<Table.RowHeader>Argentina</Table.RowHeader>
				<Table.Cell numeric>1200</Table.Cell>
			</Table.Row>
			<Table.Row>
				<Table.RowHeader>Uruguay</Table.RowHeader>
				<Table.Cell numeric>340</Table.Cell>
			</Table.Row>
		</Table.Body>
		<Table.Footer>
			<Table.Row>
				<Table.RowHeader>Total</Table.RowHeader>
				<Table.Cell numeric>1540</Table.Cell>
			</Table.Row>
		</Table.Footer>
	</Table.Root>
</section>

<!--
  The Viewport is a persistent live region that renders even when empty, so axe
  sees it in exactly the state it spends most of its life in.
-->
<Toast.Viewport label="Notifications" />
