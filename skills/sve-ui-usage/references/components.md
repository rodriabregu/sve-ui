# sve-ui component reference

Minimal correct usage per component. All examples assume `import 'sve-ui/theme.css';` once at the app root. Theme by overriding `--sve-*` variables.

## Import style

- **Singles (default exports):** `Button`, `Input`, `Badge`, `Spinner`, `Text`, `Heading`, `Slider`, `Code`.
- **Namespaces (`* as`):** `Dialog`, `Select`, `Combobox`, `Card`, `Alert`, `Tabs`, `Accordion`, `Avatar`, `DropdownMenu`, `Popover`, `Tooltip`, `Switch`, `Checkbox`, `RadioGroup`.

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
```

## Forms

```svelte
<!-- Button: variant solid|outline|ghost|flat; color primary|secondary|success|warning|danger|default; size sm|md|lg -->
<Button variant="solid" color="primary" size="md">Save</Button>

<!-- Input -->
<label>Email <Input type="email" placeholder="you@example.com" /></label>
<Input invalid bind:value={pw} />

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

<!-- Tooltip: requires Tooltip.Provider ancestor -->
<Tooltip.Provider>
  <Tooltip.Root>
    <Tooltip.Trigger>{#snippet child({ props })}<Button {...props}>Hover</Button>{/snippet}</Tooltip.Trigger>
    <Tooltip.Content><Text size="sm">Hint</Text></Tooltip.Content>
  </Tooltip.Root>
</Tooltip.Provider>
```

## Utilities

```svelte
<Code code={`const answer = 42;`} label="App.svelte" copyable />
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
