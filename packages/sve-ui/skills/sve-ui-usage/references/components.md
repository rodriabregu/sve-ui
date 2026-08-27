# sve-ui component reference

Minimal correct usage per component. All examples assume `import 'sve-ui/theme.css';` once at the app root. Theme by overriding `--sve-*` variables.

## Import style

- **Singles (default exports):** `Button`, `Input`, `Textarea`, `Label`, `Badge`, `Spinner`, `Text`, `Heading`, `Slider`, `Skeleton`, `Separator`, `Toggle`, `Progress`, `Meter`, `AspectRatio`, `Code`.
- **Namespaces (`* as`):** `Dialog`, `Select`, `Combobox`, `Card`, `Alert`, `Tabs`, `Accordion`, `Avatar`, `DropdownMenu`, `Popover`, `Tooltip`, `Switch`, `Checkbox`, `RadioGroup`, `Collapsible`, `ToggleGroup`, `AlertDialog`, `Sheet`, `LinkPreview`, `ContextMenu`, `ScrollArea`, `Toolbar`, `Menubar`, `Pagination`, `Breadcrumb`, `NavigationMenu`, `Command`, `PinInput`, `RatingGroup`, `Stack`, `Flex`, `Calendar`, `RangeCalendar`, `DateField`, `TimeField`, `DateRangeField`, `TimeRangeField`, `DatePicker`, `DateRangePicker`.

> **Date components need a peer install:** `pnpm add @internationalized/date`.
> Dates are `DateValue`, NOT JavaScript `Date`. One copy only — two copies means
> objects that stop lining up.

```svelte
import {(Button, Input, Badge, Slider)} from 'sve-ui'; import {(Dialog, Select, Tabs)} from 'sve-ui';
```

## Display

```svelte
<!-- Avatar -->
<Avatar.Root size="md">
	<Avatar.Image src={url} alt="Ada Lovelace" />
	<Avatar.Fallback>AL</Avatar.Fallback>
</Avatar.Root>

<!-- Badge -->
<Badge color="success" variant="subtle">Active</Badge>

<!-- Card -->
<Card.Root>
	<Card.Header><Heading level={3}>Title</Heading></Card.Header>
	<Card.Content><Text>Body.</Text></Card.Content>
	<Card.Footer>…</Card.Footer>
</Card.Root>

<!-- Heading / Text -->
<Heading level={2} size="lg" weight="bold">Section</Heading>
<Text size="sm">Body copy.</Text>

<!-- Skeleton: variant text|circle|rect. Always aria-hidden — announce on the region. -->
<div role="status" aria-busy="true" aria-label="Loading profile">
	<Skeleton variant="circle" width="3rem" height="3rem" />
	<Skeleton variant="text" width="12rem" />
	<Skeleton variant="rect" height="6rem" />
</div>
```

### Table

```svelte
<script>
	import { Table } from 'sve-ui';
	let sort = $state('none'); // 'none' | 'asc' | 'desc'

	// THE COMPONENT DOES NOT SORT. You apply the order, because only you know
	// whether the rows are local, how this interacts with pagination, and which
	// locale the text compares in ('a' < 'b' is not universal).
	const collator = new Intl.Collator(locale, { numeric: true, sensitivity: 'base' });
	const sorted = $derived(
		sort === 'none'
			? rows
			: [...rows].sort((a, b) => (sort === 'asc' ? 1 : -1) * collator.compare(a.region, b.region))
	);
</script>

<!-- Root is a plain <table>: NO role="grid", which would promise arrow-key cell
     navigation this does not implement. Root also owns the horizontal scroll
     container; scrollLabel makes it focusable so the columns past the right
     edge are reachable by keyboard. scrollLabel is NOT the table's name.
     stickyHeader needs --sve-table-max-height (24rem default). -->
<Table.Root scrollLabel="Revenue by region, scrollable" zebra density="compact">
	<!-- The table's accessible name. MUST be the first child. Use
       visuallyHidden when a heading above already says it. -->
	<Table.Caption>Revenue by region</Table.Caption>

	<Table.Header>
		<Table.Row>
			<Table.Head>Region</Table.Head>
			<!-- Renders a real <button> in the cell (a clickable <th> is not
           focusable) and sets aria-sort. Cycles none -> asc -> desc -> none.
           Keep aria-sort on ONE column, and only when you applied it. -->
			<Table.Head sortable {sort} onSortChange={(d) => (sort = d)} numeric>Revenue</Table.Head>
		</Table.Row>
	</Table.Header>

	<Table.Body>
		{#each sorted as row (row.region)}
			<!-- selected sets data-selected, NOT aria-selected (invalid on a plain
           <tr>). Pair it with a real Checkbox — styling alone tells sighted
           users and nobody else. -->
			<Table.Row selected={row.id === selectedId}>
				<!-- <th scope="row">: turns "1200" into "Revenue, Argentina, 1200". -->
				<Table.RowHeader>{row.region}</Table.RowHeader>
				<!-- numeric on BOTH Head and Cell: right-align + tabular-nums so the
             digits line up. Format with Intl.NumberFormat yourself. -->
				<Table.Cell numeric>{fmt.format(row.revenue)}</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>

	<!-- Totals go in tfoot, not as a last body row — it is not data. -->
	<Table.Footer>
		<Table.Row>
			<Table.RowHeader>Total</Table.RowHeader>
			<Table.Cell numeric>{fmt.format(total)}</Table.Cell>
		</Table.Row>
	</Table.Footer>
</Table.Root>
```

## Forms

```svelte
<!-- Button: variant solid|outline|ghost|flat; color primary|secondary|success|warning|danger|default; size sm|md|lg -->
<Button variant="solid" color="primary" size="md">Save</Button>

<!-- Input -->
<label>Email <Input type="email" placeholder="you@example.com" /></label>
<Input invalid bind:value={pw} />

<!-- Label: pair `for` with the control's `id`. `required` renders a decorative asterisk only. -->
<Label for="bio" required>Bio</Label>
<Textarea id="bio" required />

<!-- Textarea: resize none|vertical|horizontal|both (default vertical) -->
<Textarea rows={5} resize="vertical" bind:value={bio} />
<Textarea invalid aria-describedby="bio-error" />

<!-- PinInput (OTP / PIN). ONE real input behind the cells — that is what makes
     paste + mobile SMS autofill work. maxlength = number of cells (required).
     GOTCHA: <label for> does NOT work. The id lands on the wrapper div and the
     real input gets an unpredictable Bits-internal id. Name it from Root with
     aria-label, or aria-labelledby pointing at your own visible label. -->
<span id="otp-label">Verification code</span>
<PinInput.Root bind:value={code} maxlength={6} aria-labelledby="otp-label" onComplete={submit}>
  {#snippet children({ cells })}
    {#each cells as cell, i (i)}<PinInput.Cell {cell} />{/each}
  {/snippet}
</PinInput.Root>

<!-- RatingGroup: Root is role="slider" (arrow keys adjust it), items are
     role="presentation". Needs aria-label AND aria-valuetext — pass the function
     form so the SCALE is announced, not a bare number. Items carry
     data-state active|partial|inactive, so half-stars are expressible. -->
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

<!-- Calendar. Dates are DateValue from @internationalized/date (a PEER dep).
     `value` = selection, `placeholder` = month on screen. Both bindable and
     SEPARATE: paging months must not change the selection.
     PASS calendarLabel — Bits builds the name as `${calendarLabel} ${month} ${year}`
     and defaults it to the literal word "Event", so unset it announces
     "Event January 2026". The nav buttons' aria-labels are HARDCODED by Bits
     ("Previous"/"Next") and cannot be overridden.
     isDateDisabled = out of range; isDateUnavailable = exists but taken. Different.
     `locale` changes month names AND which day the week starts on — not cosmetic.
     Key weekdays by INDEX: narrow names are not unique ("T" twice). -->
<Calendar.Root type="single" bind:value bind:placeholder calendarLabel="Departure date" locale={userLocale}>
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
            {#each weekdays as day, i (i)}<Calendar.HeadCell>{day}</Calendar.HeadCell>{/each}
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

<!-- DateField / TimeField: SEGMENTED fields, not text inputs. Every part is its
     own role="spinbutton" with aria-valuenow/valuetext/label, so arrow keys
     adjust it and the value only commits once ALL segments are filled.
     `locale` decides SEGMENT ORDER (en-US month-first, en-GB day-first) — wrong
     locale = wrong date silently entered, not just wrong labels.
     `granularity` decides which segments exist. TimeField: leave `hourCycle`
     unset to follow the locale (12 adds a dayPeriod segment, 24 does not).
     Key the each by INDEX — segment parts repeat (multiple "literal"). -->
<DateField.Root bind:value locale={userLocale}>
  <DateField.Label>Departure date</DateField.Label>
  <DateField.Input>
    {#snippet children({ segments })}
      {#each segments as { part, value }, i (i)}
        <DateField.Segment {part}>{value}</DateField.Segment>
      {/each}
    {/snippet}
  </DateField.Input>
</DateField.Root>

<!-- DateRangeField / TimeRangeField: TWO Inputs, `type` is REQUIRED.
     GOTCHA: Bits leaves the range Root's role="group" UNNAMED — it labels the
     Inputs, which have no role, so nothing exposed gets a name. YOU must pass
     aria-labelledby (or aria-label) on Root. The single-value field does not
     have this problem. Mark your separator aria-hidden. -->
<DateRangeField.Root bind:value locale={userLocale} aria-labelledby="range-label">
  <DateRangeField.Label id="range-label">Stay dates</DateRangeField.Label>
  <DateRangeField.Input type="start">...</DateRangeField.Input>
  <span aria-hidden="true">–</span>
  <DateRangeField.Input type="end">...</DateRangeField.Input>
</DateRangeField.Root>

<!-- DatePicker / DateRangePicker: a segmented FIELD + a calendar POPOVER sharing
     ONE value. Trigger goes INSIDE the Input, after the segments (icon-only, so
     needs aria-label). Almost every part is re-exported from what you already
     have: Input/Label/Segment from DateField, calendar chrome from Calendar,
     Arrow/Close from Popover, and DateRangePicker's Content IS DatePicker's.
     Range picker: TWO Inputs (type required), Cell/Day come from RangeCalendar,
     set numberOfMonths={2}, and NAME THE ROOT (aria-labelledby) — same unnamed
     group gap as the range field. Pass calendarLabel and locale. -->
<DatePicker.Root bind:value locale={userLocale} calendarLabel="Departure date">
  <DatePicker.Label>Departure</DatePicker.Label>
  <DatePicker.Input>
    {#snippet children({ segments })}
      {#each segments as { part, value }, i (i)}
        <DatePicker.Segment {part}>{value}</DatePicker.Segment>
      {/each}
      <DatePicker.Trigger aria-label="Open calendar">📅</DatePicker.Trigger>
    {/snippet}
  </DatePicker.Input>
  <DatePicker.Content>
    <DatePicker.Calendar>
      <!-- compose exactly as a standalone Calendar -->
    </DatePicker.Calendar>
  </DatePicker.Content>
</DatePicker.Root>

<!-- RangeCalendar: same composition; value is { start, end }. Bits handles the
     two-step pick and normalises a backwards selection. minDays/maxDays bound
     the span; excludeDisabled refuses a range straddling an unavailable date.
     Header/Grid/HeadCell/nav are the SAME components Calendar uses. -->
<RangeCalendar.Root bind:value calendarLabel="Stay dates" minDays={2} maxDays={14}>
  ...
</RangeCalendar.Root>

<!-- Toggle: a pressed BUTTON (toolbar), not a setting. Switch is the setting. -->
<Toggle bind:pressed={bold} aria-label="Bold">B</Toggle>

<!-- ToggleGroup: `type` is REQUIRED and sets the shape of value.
     single -> string, items are role="radio" + aria-checked
     multiple -> string[], items are buttons + aria-pressed -->
<ToggleGroup.Root type="single" bind:value={align} aria-label="Text alignment">
  <ToggleGroup.Item value="left" aria-label="Align left">L</ToggleGroup.Item>
  <ToggleGroup.Item value="right" aria-label="Align right">R</ToggleGroup.Item>
</ToggleGroup.Root>

<!-- Switch / Checkbox: need aria-label if no visible label -->
<Switch.Root bind:checked={on} aria-label="Notifications" />
<Checkbox.Root bind:checked={agree} aria-label="Accept terms" />

<!-- RadioGroup -->
<RadioGroup.Root bind:value={density} aria-label="Density">
  <RadioGroup.Item value="comfortable" aria-label="Comfortable" />
  <RadioGroup.Item value="compact" aria-label="Compact" />
</RadioGroup.Root>

<!-- Slider: value + onValueChange (NOT bind:value); thumbLabel for a11y -->
<Slider type="single" value={vol} onValueChange={(v) => (vol = v as number)} max={100} step={1} thumbLabel="Volume" />

<!-- Select -->
<Select.Root type="single" bind:value={fruit}>
  <Select.Trigger>{fruit || 'Pick a fruit'}</Select.Trigger>
  <Select.Content>
    <Select.Item value="apple" label="Apple">Apple</Select.Item>
  </Select.Content>
</Select.Root>

<!-- Combobox: filtering is consumer-driven via oninput -->
<Combobox.Root type="single" bind:value={picked}>
  <Combobox.Input aria-label="Search" oninput={(e) => (query = e.currentTarget.value)} />
  <Combobox.Content>
    {#each filtered as item (item)}
      <Combobox.Item value={item} label={item}>{item}</Combobox.Item>
    {/each}
  </Combobox.Content>
</Combobox.Root>
```

## Feedback

```svelte
<Alert.Root color="warning" variant="subtle">
	<Alert.Title>Heads up</Alert.Title>
	<Alert.Description>Check your settings.</Alert.Description>
</Alert.Root>

<Spinner size="sm" color="primary" label="Loading" />

<!-- Progress: advancement toward completion. role="progressbar".
     value={null} = indeterminate. NEEDS an accessible name. -->
<Progress value={40} aria-label="Upload progress" />
<Progress value={null} aria-label="Syncing" />

<!-- Meter: a static measurement in a known range. role="meter". NEEDS a name. -->
<Meter value={70} max={100} aria-label="Disk usage" />
```

### Field

The only accessible way to attach help text or a validation message to a control.

```svelte
<script>
	import { Field, Input } from 'sve-ui';
	let email = $state('');
	// undefined when valid — NOT '' , which is still a message.
	let error = $derived(email && !email.includes('@') ? 'Enter a valid email address.' : undefined);
</script>

<!-- No `invalid` prop: passing `error` is what marks the field invalid, so the
     styling and aria-invalid cannot disagree with what the user reads.
     aria-describedby names the error FIRST, then the description, and only ids
     that actually exist. -->
<Field label="Email" description="We never share it." {error} required>
	<!-- The props MUST be spread or the label, description and error are attached
       to nothing. Field logs an error to the console if you forget. -->
	{#snippet control(props)}
		<Input {...props} type="email" bind:value={email} />
	{/snippet}
</Field>
```

On a failed submit, move focus to the first invalid control — that is the WCAG
technique, and it is why the error is not a live region:

```ts
import { focusFirstInvalidField } from 'sve-ui';

async function submit() {
	errors = await validate(values);
	if (Object.keys(errors).length > 0) {
		// Awaits tick() internally, so the errors are in the DOM before it looks.
		// Returns false when nothing was focused. Pass `root` to scope it to a form.
		await focusFirstInvalidField({ root: formEl });
		return;
	}
	await save(values);
}
```

Works with any control, including a plain `<input>` — the snippet just hands you
`id`, `aria-describedby`, `aria-invalid` and `required`.

`label`, `description` and `error` each accept a string or a snippet (for markup
like a link). Keep `description` short: it is announced every time the control
takes focus.

The error is NOT a live region, deliberately — an error that is both live and
referenced by `aria-describedby` is announced twice. When a submit fails, move
focus to the first invalid control instead; focusing it reads the label, the
error and the description together.

### Button as a link

```svelte
<!-- href renders an <a> with the same variants and sizes. Use it whenever
     activating the control takes the user somewhere. -->
<Button color="primary" href="/components">Browse components</Button>

<!-- rel="noopener noreferrer" is added automatically for _blank: without it the
     opened page can reach window.opener and navigate the tab behind it. An
     explicit rel always wins. -->
<Button variant="outline" href="https://svelte.dev" target="_blank">Svelte docs</Button>

<!-- href + disabled renders <span aria-disabled="true">, NOT an anchor: <a> has
     no disabled attribute, and <a aria-disabled> still takes a tab stop and is
     still announced as a link that goes nowhere. -->
<Button href="/components" disabled>Not available yet</Button>
```

NEVER navigate from a Button's `onclick`. `onclick={() => (window.location.href =
'/x')}` is not a link: no middle-click, no open-in-new-tab, no URL on hover,
announced as a button rather than a link, and completely dead until JavaScript
has run.

### Toast

The only imperative API in the library. A toast reports an EVENT, not state, and
an imperative call is reachable from code that is not a component at all (a
`fetch` wrapper, an interceptor) where context cannot reach.

```svelte
<script>
	import { Toast, toast } from 'sve-ui';
</script>

<!-- REQUIRED, once, high in the layout. Without it the calls queue into a list
     nothing renders. It is a persistent live region that renders even when
     empty: assistive technology only announces additions to a region it was
     ALREADY observing. Politeness is fixed at polite and is not configurable. -->
<Toast.Viewport position="bottom-right" max={5} label="Notifications" />
```

```ts
toast('Copied'); // info
toast.success('Project saved');
toast.warning('Your trial ends in 3 days');
toast.error('Upload failed', { description: 'The file is over 10 MB.' });

toast('Copied', { duration: 2000 }); // Infinity keeps it
toast('Working...', { dismissible: false });

// An action flips duration to Infinity by default: a control the user can lose
// a race against is not a control. Pass duration explicitly to override.
toast('Message deleted', { action: { label: 'Undo', onclick: restore } });

const id = toast('Uploading...', { duration: Infinity });
await upload();
toast.dismiss(id);
toast.success('Uploaded');
toast.clear();
```

NEVER call `toast()` during server rendering — not from the top level of a
`load`, not from a component body. The queue is module state, shared across
requests, so the toast would appear in a DIFFERENT user's HTML. The call is
refused and reported to the console rather than thrown (a toast is not essential
to the page). Call it from an event handler, `onMount`, or a client-only module.

Timers pause on hover AND on focus. Past `max` the OLDEST is dropped. Never let a
toast hold the only copy of information or an action — it disappears and there is
no history.

## Navigation

```svelte
<Tabs.Root bind:value={tab}>
	<Tabs.List>
		<Tabs.Trigger value="a">Account</Tabs.Trigger>
		<Tabs.Trigger value="b">Password</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="a">…</Tabs.Content>
	<Tabs.Content value="b">…</Tabs.Content>
</Tabs.Root>

<Accordion.Root type="single">
	<Accordion.Item value="a">
		<Accordion.Header><Accordion.Trigger>Section</Accordion.Trigger></Accordion.Header>
		<Accordion.Content>…</Accordion.Content>
	</Accordion.Item>
</Accordion.Root>

<!-- Collapsible: ONE independent region. Accordion is a SET that knows about
     itself (one-open-at-a-time + arrow keys between triggers). -->
<Collapsible.Root bind:open>
	<Collapsible.Trigger>Shipping details</Collapsible.Trigger>
	<Collapsible.Content>Ships in 2-3 days.</Collapsible.Content>
</Collapsible.Root>

<!-- NavigationMenu: THE choice for SITE navigation. Triggers open on hover AND
     on click/Enter, so it works for pointer, keyboard and touch.
     Root is a <nav> — needs aria-label. `active` on a Link gives aria-current="page".
     Viewport is optional: it gives all panels one shared, resizing container. -->
<NavigationMenu.Root bind:value={navValue} aria-label="Site">
	<NavigationMenu.List>
		<NavigationMenu.Item value="products">
			<NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
			<NavigationMenu.Content>
				<NavigationMenu.Link href="/analytics">Analytics</NavigationMenu.Link>
			</NavigationMenu.Content>
		</NavigationMenu.Item>
		<NavigationMenu.Item value="pricing">
			<NavigationMenu.Link href="/pricing" active>Pricing</NavigationMenu.Link>
		</NavigationMenu.Item>
	</NavigationMenu.List>
	<NavigationMenu.Viewport />
</NavigationMenu.Root>

<!-- Menubar: desktop-app chrome, NOT site nav and NOT a row of dropdowns.
     Arrow keys move between menus; hovering a sibling while open switches to it.
     Root needs aria-label. Item/Group/Label/Separator are the SHARED menu parts. -->
<Menubar.Root aria-label="Main">
	<Menubar.Menu>
		<Menubar.Trigger>File</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Item>New</Menubar.Item>
			<Menubar.Separator />
			<Menubar.Item>Quit</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>
</Menubar.Root>

<!-- Breadcrumb: custom (native nav + <ol>). LAST crumb takes `current` — renders
     as text with aria-current="page", not a dead-end link. Separators aria-hidden. -->
<Breadcrumb.Root>
	<Breadcrumb.List>
		<Breadcrumb.Item><Breadcrumb.Link href="/">Home</Breadcrumb.Link></Breadcrumb.Item>
		<Breadcrumb.Separator />
		<Breadcrumb.Item><Breadcrumb.Link current>Settings</Breadcrumb.Link></Breadcrumb.Item>
	</Breadcrumb.List>
</Breadcrumb.Root>

<!-- Pagination: Root takes count + perPage and hands you a `pages` snippet prop;
     YOU render the buttons. `page` is bindable. Wrap in <nav aria-label="Pagination">.
     Arrow-only Prev/Next need aria-label. -->
<nav aria-label="Pagination">
	<Pagination.Root count={100} perPage={10} bind:page>
		{#snippet children({ pages })}
			<Pagination.PrevButton aria-label="Previous page">Prev</Pagination.PrevButton>
			{#each pages as p (p.key)}
				{#if p.type === 'page'}
					<Pagination.Page page={p}>{p.value}</Pagination.Page>
				{:else}<span>…</span>{/if}
			{/each}
			<Pagination.NextButton aria-label="Next page">Next</Pagination.NextButton>
		{/snippet}
	</Pagination.Root>
</nav>
```

### Sidebar

```svelte
<script>
	import { Sidebar } from 'sve-ui';
	let collapsed = $state(false);
</script>

<!-- Provider owns the state, Root is the <aside>. They are separate because
     Svelte context reaches DESCENDANTS, not siblings: a Trigger in a top bar
     next to the sidebar must still sit inside the Provider. With
     collapsible="offcanvas" the Trigger HAS to be outside Root, or collapsing
     hides the only way back.
     Provider imposes no layout unless you pass `shell` (default is
     display: contents). Size with --sve-sidebar-width / --sve-sidebar-width-icon.
     No JS media query inside: use collapsible="offcanvas" plus YOUR breakpoint.
     Persist `collapsed` — one that resets on navigation is worse than none. -->
<Sidebar.Provider bind:collapsed collapsible="icon" shell>
	<Sidebar.Root label="Main navigation">
		<Sidebar.Header>
			<!-- Label stays the SAME in both states; aria-expanded carries the state. -->
			<Sidebar.Trigger aria-label="Toggle sidebar">&#9776;</Sidebar.Trigger>
		</Sidebar.Header>
		<Sidebar.Content>
			<Sidebar.Group aria-labelledby="grp-platform">
				<!-- Visually hidden on the icon rail, NOT removed. -->
				<Sidebar.GroupLabel id="grp-platform">Platform</Sidebar.GroupLabel>
				<Sidebar.Menu>
					<!-- `label` becomes the accessible name on a collapsed icon rail.
               `active` gives aria-current="page".
               `disabled` renders a <span>, not a link. -->
					<Sidebar.Item href="/dashboard" active label="Dashboard">Dashboard</Sidebar.Item>
					<Sidebar.Item disabled label="Reports">Reports</Sidebar.Item>
				</Sidebar.Menu>
			</Sidebar.Group>
		</Sidebar.Content>
		<Sidebar.Footer>Account</Sidebar.Footer>
	</Sidebar.Root>

	<main>Page content</main>
</Sidebar.Provider>
```

This is an APP-SHELL panel, not a documentation table of contents. If you find
yourself overriding `display`, `width`, `border` and the collapse mechanism, you
want a plain sticky `<nav>` instead.

## Overlays

All overlays portal to `<body>`; mirror the theme class onto `<body>`. Wrap custom triggers with the Bits `child` snippet.

```svelte
<!-- Dialog -->
<Dialog.Root bind:open>
	<Dialog.Trigger>
		{#snippet child({ props })}<Button {...props}>Delete</Button>{/snippet}
	</Dialog.Trigger>
	<Dialog.Overlay />
	<Dialog.Content>
		<Dialog.Title>Delete?</Dialog.Title>
		<Dialog.Description>This can't be undone.</Dialog.Description>
		<Dialog.Close
			>{#snippet child({ props })}<Button variant="outline" {...props}>Cancel</Button
				>{/snippet}</Dialog.Close
		>
	</Dialog.Content>
</Dialog.Root>

<!-- DropdownMenu -->
<DropdownMenu.Root>
	<DropdownMenu.Trigger
		>{#snippet child({ props })}<Button {...props}>Options</Button>{/snippet}</DropdownMenu.Trigger
	>
	<DropdownMenu.Content>
		<DropdownMenu.Item>Profile</DropdownMenu.Item>
		<DropdownMenu.Separator />
		<DropdownMenu.Item>Sign out</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>

<!-- Popover -->
<Popover.Root>
	<Popover.Trigger
		>{#snippet child({ props })}<Button {...props}>Details</Button>{/snippet}</Popover.Trigger
	>
	<Popover.Content>…</Popover.Content>
</Popover.Root>

<!-- ContextMenu: Trigger is the right-click REGION, not a button.
     Right-click is undiscoverable and touch has no right-click, so EVERY action
     here must also be reachable from a visible control.
     Item/Group/Label/Separator are the SAME components DropdownMenu uses. -->
<ContextMenu.Root>
	<ContextMenu.Trigger>Right-click this row</ContextMenu.Trigger>
	<ContextMenu.Content>
		<ContextMenu.Item>Rename</ContextMenu.Item>
		<ContextMenu.Separator />
		<ContextMenu.Item>Delete</ContextMenu.Item>
	</ContextMenu.Content>
</ContextMenu.Root>

<!-- AlertDialog: destructive confirmation. Title is REQUIRED (aria-labelledby).
     Backdrop click does NOT dismiss. Cancel gets initial focus.
     GOTCHA: Cancel closes the dialog, Action does NOT — close it yourself so a
     failed async operation can keep the dialog open and show the error. -->
<AlertDialog.Root bind:open>
	<AlertDialog.Trigger>Delete project</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Title>Delete this project?</AlertDialog.Title>
		<AlertDialog.Description>Removes every deployment. Cannot be undone.</AlertDialog.Description>
		<AlertDialog.Cancel>Keep project</AlertDialog.Cancel>
		<AlertDialog.Action onclick={destroy}>Delete project</AlertDialog.Action>
	</AlertDialog.Content>
</AlertDialog.Root>

<!-- Sheet: a Dialog anchored to an edge. side=left|right|top|bottom (default right),
     size=sm|md|lg applies to the axis it grows on. Title REQUIRED. -->
<Sheet.Root>
	<Sheet.Trigger>Open filters</Sheet.Trigger>
	<Sheet.Content side="right" size="md">
		<Sheet.Title>Filters</Sheet.Title>
		<Sheet.Close>Done</Sheet.Close>
	</Sheet.Content>
</Sheet.Root>

<!-- LinkPreview (hover card): HOVER-ONLY. No focus, no touch — keyboard and
     mobile users NEVER see it. Enrichment only; never the sole path to an
     action or a fact. Trigger is an <a href> but Bits reports role="button",
     so it is not announced as a link. Need it clickable? Use Popover. -->
<LinkPreview.Root>
	<LinkPreview.Trigger href="https://svelte.dev">Svelte</LinkPreview.Trigger>
	<LinkPreview.Content>A web framework.</LinkPreview.Content>
</LinkPreview.Root>

<!-- Tooltip: requires Tooltip.Provider ancestor -->
<Tooltip.Provider>
	<Tooltip.Root>
		<Tooltip.Trigger
			>{#snippet child({ props })}<Button {...props}>Hover</Button>{/snippet}</Tooltip.Trigger
		>
		<Tooltip.Content><Text size="sm">Hint</Text></Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
```

## Layout

```svelte
<!-- ScrollArea: size constraint goes on Root; Viewport fills it and scrolls.
     type=hover (default) does NOT mount the scrollbar until pointer enter, which
     removes the only cue that more content exists — use type="always" unless the
     overflow is obvious. Scrolling stays native; content is NOT virtualised. -->
<ScrollArea.Root type="always" style="height: 12rem;">
	<ScrollArea.Viewport>{content}</ScrollArea.Viewport>
	<ScrollArea.Scrollbar orientation="vertical"><ScrollArea.Thumb /></ScrollArea.Scrollbar>
</ScrollArea.Root>

<!-- Stack / Flex: layout primitives with a DELIBERATELY narrow API.
     `gap` is a spacing TOKEN KEY (gap={4}), not a length. There is NO margin,
     padding, width or colour prop — margin belongs to the parent, the rest is
     what class/CSS are for. Want something they don't express? Use CSS.
     Stack = vertical (align defaults to stretch, right for form fields).
     Flex  = general (align defaults to CENTER, since a row of mixed-height
             things wants centring and the CSS `stretch` default breaks it).
     Use `as` to keep the markup semantic (ul, fieldset, nav). -->
<Stack gap={4}>...</Stack>
<Stack gap={2} as="ul">...</Stack>
<Flex gap={3} justify="between">...</Flex>
<Flex gap={2} wrap>...</Flex>

<!-- AspectRatio: ratio is width/height. Reserves the box BEFORE media loads,
     which is what prevents layout shift. Presentational: img still needs alt. -->
<AspectRatio ratio={16 / 9}><img src={url} alt="Harbour at sunset" /></AspectRatio>

<!-- Separator: role="separator" + aria-orientation. Use `decorative` for purely visual rules. -->
<Separator />
<Separator orientation="vertical" />
<Separator decorative />
```

A vertical separator is 1px wide and stretches to its parent, so the parent needs a resolved height
(a flex row with `align-items: stretch`).

## Utilities

```svelte
<Code code={`const answer = 42;`} label="App.svelte" copyable />

<!-- Command (command palette). Command.Viewport is REQUIRED and goes inside List:
     Bits takes the Input's aria-controls from it, so omitting it is invalid ARIA.
     TWO names to set: `label` on Root names the INPUT; aria-label on List names the
     LIST (Bits defaults it to "Suggestions..." — override it).
     Add `keywords` for words users type that are not in the label.
     Use Loading (not Empty) while fetching. Wrap in a Dialog for a modal palette. -->
<Command.Root label="Command palette">
	<Command.Input bind:value={search} placeholder="Type a command" />
	<Command.List aria-label="Commands">
		<Command.Viewport>
			<Command.Empty>No results found.</Command.Empty>
			<Command.Group>
				<Command.GroupHeading>Actions</Command.GroupHeading>
				<Command.GroupItems>
					<Command.Item value="delete" keywords={['trash']}>Delete</Command.Item>
				</Command.GroupItems>
			</Command.Group>
		</Command.Viewport>
	</Command.List>
</Command.Root>

<!-- Toolbar: role="toolbar" + roving focus = ONE tab stop for the whole bar.
     Root needs aria-label. Parts are NOT interchangeable:
     Button acts, Link NAVIGATES (stays a real anchor), Group is a toggle group
     (type required, value bindable), GroupItem is one toggle inside it. -->
<Toolbar.Root aria-label="Formatting">
	<Toolbar.Group type="multiple" bind:value={marks} aria-label="Text style">
		<Toolbar.GroupItem value="bold" aria-label="Bold">B</Toolbar.GroupItem>
	</Toolbar.Group>
	<Toolbar.Button>Save</Toolbar.Button>
	<Toolbar.Link href="/help">Help</Toolbar.Link>
</Toolbar.Root>
```

## Theming

```svelte
<script>
	import { ThemeProvider } from 'sve-ui';
</script>

<ThemeProvider colorScheme="dark">
	<!-- override tokens on any wrapper -->
	<div style="--sve-color-primary: #8b5cf6;">
		<Button color="primary">Themed</Button>
	</div>
</ThemeProvider>
```

Do not apply Tailwind layout/margin utilities directly on sve-ui components — scoped styles win. Wrap them in a `<div>` and style the wrapper instead.
