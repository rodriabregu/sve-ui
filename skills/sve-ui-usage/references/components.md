# sve-ui component reference

Minimal correct usage per component. All examples assume `import 'sve-ui/theme.css';` once at the app root. Theme by overriding `--sve-*` variables.

## Import style

- **Singles (default exports):** `Button`, `Input`, `Textarea`, `Label`, `Badge`, `Spinner`, `Text`, `Heading`, `Slider`, `Skeleton`, `Separator`, `Toggle`, `Progress`, `Meter`, `AspectRatio`, `Code`.
- **Namespaces (`* as`):** `Dialog`, `Select`, `Combobox`, `Card`, `Alert`, `Tabs`, `Accordion`, `Avatar`, `DropdownMenu`, `Popover`, `Tooltip`, `Switch`, `Checkbox`, `RadioGroup`, `Collapsible`, `ToggleGroup`, `AlertDialog`, `Sheet`, `LinkPreview`, `ContextMenu`, `ScrollArea`, `Toolbar`, `Menubar`, `Pagination`, `Breadcrumb`, `NavigationMenu`, `Command`, `PinInput`, `RatingGroup`, `Stack`, `Flex`.

```svelte
import { Button, Input, Badge, Slider } from 'sve-ui';
import { Dialog, Select, Tabs } from 'sve-ui';
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
<Collapsible.Root bind:open={open}>
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
  <Pagination.Root count={100} perPage={10} bind:page={page}>
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
    <Dialog.Close>{#snippet child({ props })}<Button variant="outline" {...props}>Cancel</Button>{/snippet}</Dialog.Close>
  </Dialog.Content>
</Dialog.Root>

<!-- DropdownMenu -->
<DropdownMenu.Root>
  <DropdownMenu.Trigger>{#snippet child({ props })}<Button {...props}>Options</Button>{/snippet}</DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Item>Profile</DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item>Sign out</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>

<!-- Popover -->
<Popover.Root>
  <Popover.Trigger>{#snippet child({ props })}<Button {...props}>Details</Button>{/snippet}</Popover.Trigger>
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
<AlertDialog.Root bind:open={open}>
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
    <Tooltip.Trigger>{#snippet child({ props })}<Button {...props}>Hover</Button>{/snippet}</Tooltip.Trigger>
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
