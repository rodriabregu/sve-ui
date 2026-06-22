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
</script>

<!-- Display -->
<section aria-label="Avatar"><Avatar.Root><Avatar.Image src="" alt="Ada Lovelace" /><Avatar.Fallback>AL</Avatar.Fallback></Avatar.Root></section>
<section aria-label="Badge"><Badge>New</Badge></section>
<section aria-label="Card"><Card.Root><Card.Header><Heading level={3}>Card title</Heading></Card.Header><Card.Content><Text>Card body content.</Text></Card.Content></Card.Root></section>
<section aria-label="Typography"><Heading level={2}>Heading</Heading><Text>Body text.</Text></section>

<!-- Forms -->
<section aria-label="Button"><Button>Save</Button></section>
<section aria-label="Input"><label>Email<Input type="email" /></label></section>
<section aria-label="Switch"><Switch.Root aria-label="Enable notifications" bind:checked={switchOn} /></section>
<section aria-label="Checkbox"><Checkbox.Root aria-label="Accept terms" bind:checked={checkboxOn} /></section>
<section aria-label="Radio group">
	<RadioGroup.Root bind:value={radioValue} aria-label="Density">
		<RadioGroup.Item value="a" aria-label="Comfortable" />
		<RadioGroup.Item value="b" aria-label="Compact" />
	</RadioGroup.Root>
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
<section aria-label="Alert"><Alert.Root color="success"><Alert.Title>Saved</Alert.Title><Alert.Description>Your changes are live.</Alert.Description></Alert.Root></section>
<section aria-label="Spinner"><Spinner label="Loading" /></section>

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

<!-- Overlays (trigger / closed state) -->
<section aria-label="Dialog"><Dialog.Root><Dialog.Trigger>Open dialog</Dialog.Trigger></Dialog.Root></section>
<section aria-label="Dropdown menu"><DropdownMenu.Root><DropdownMenu.Trigger>Open menu</DropdownMenu.Trigger></DropdownMenu.Root></section>
<section aria-label="Popover"><Popover.Root><Popover.Trigger>Show details</Popover.Trigger></Popover.Root></section>
<section aria-label="Tooltip">
	<Tooltip.Provider>
		<Tooltip.Root><Tooltip.Trigger>Hover me</Tooltip.Trigger></Tooltip.Root>
	</Tooltip.Provider>
</section>

<!-- Utilities -->
<section aria-label="Code"><Code code="const answer = 42;" /></section>
