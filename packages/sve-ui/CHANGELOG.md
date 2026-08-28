# sve-ui

## 0.12.0

### Minor Changes

- 4974dc8: `Spinner` is now decoration unless you give it a `label`.

  **This changes behaviour.** `label` used to default to `'Loading'`, so every
  spinner was a live region that announced itself the moment it appeared. If you
  relied on that announcement, pass `label` explicitly.

  It changed because it had started talking over other components. Once `Busy` and
  `Button loading` existed, this:

  ```svelte
  <Busy label="Loading projects"><Spinner /></Busy>
  ```

  produced **two announcements for one event** — the spinner's immediately, and
  `Busy`'s 400ms later — and the immediate one defeated the debounce that exists to
  prevent exactly that. Counting `role="status"` elements in the subtree gave two.

  Without a `label` the spinner is now `aria-hidden`, which is what you want in
  almost every case: there is visible text beside it, or a `Button loading`, or a
  `Busy` region, and each of those already announces. `'Loading'` said nothing
  useful anyway — loading what?

### Patch Changes

- c316d4e: Docs: every prop table is now generated from the types.

  Twenty-seven pages hand-wrote their rows, which drifts the moment a prop changes.
  Closing that needed three things the generator could not do:

  - **Inherited Bits props**, resolved through the TypeScript checker rather than
    the AST. Six components had zero generated coverage because they declare almost
    nothing of their own and forward everything.
  - **The handful of HTML attributes that are a component's whole point** —
    `Input.value`, `Label.for`, `Button.disabled`, `LinkPreview.Trigger.href`. The
    declaration-file filter drops the other two hundred correctly and these
    wrongly. They are labelled `html` rather than `bits-ui`, so a reader is not sent
    to the wrong documentation.
  - **The sixty re-exported parts with no `.svelte` file.** `Dialog.Root`,
    `Tooltip.Provider`, `Select.Root` and the rest exist only as
    `export const Root = BitsDialog.Root`, because Root renders nothing visual.

  Result: 1,181 documented props, none hand-written, and `check-docs-coverage` now
  fails the build if a page starts writing its own again.

  No library code changed.

- f4cfcbb: Fix two visible bugs, both reported by using the components.

  **`PinInput` never showed what you typed.** Bits' `Cell` renders
  `<div {...props}>{@render children?.()}</div>` and nothing else — the character
  is the consumer's to draw — and our wrapper was self-closing. The value updated
  correctly and every box stayed blank, in every published version. Cells now render
  their character, plus a caret placeholder for the cell the cursor is in, since the
  real input is visually hidden and cannot show its own.

  **The date pickers opened a transparent panel.** `.sve-picker__content` had only a
  radius and a shadow and leant on the calendar inside for its background — while
  telling that calendar to drop its frame, on the stated grounds that "the panel
  already provides the border and shadow". It did not. On top of that, the picker's
  calendar referenced `.sve-calendar` without importing that class's rules, so
  route-level code splitting left the page without them. The result was dates
  floating over the page behind them.

  A floating panel now supplies its own surface: it cannot depend on its content for
  one, because the content is whatever the caller puts there.

  **Six shared stylesheets were inert.** The `.css` files extracted in `0.9.2` kept
  their `:global(…)` wrapper. That is Svelte `<style>` syntax; in a plain stylesheet
  it is an invalid selector and the browser drops the rule. So the unstyled-trigger
  fix those files were written for had not actually taken effect.

  `check-css-coverage` now catches all three shapes: it no longer counts a
  contextual override as a declaration, and it rejects `:global()` in a plain
  stylesheet.

## 0.11.1

### Patch Changes

- 1407f90: Guard against a component nobody can find.

  `check-docs-coverage` asserts that every export has a registry entry, every
  component marked ready has a docs page, and every one of them appears in the
  agent skill's catalog.

  The drift it prevents is not hypothetical: `Collapsible` was missing from the
  skill for a whole pull request, and `Busy` for a release. Both were caught by a
  person noticing, which is not a system. It found the `Busy` gap on its first run.

  No library code changed.

## 0.11.0

### Minor Changes

- b5711ef: Add `Busy` — mark a region as loading, and say so.

  Found by building a real app. Writing its loading branch, there was no way to
  express "this region is loading": `Spinner` is decorative, and `aria-busy`
  appeared in two components out of sixty. A screen reader user got a second of
  silence and then content appearing with no warning.

  ```svelte
  <Busy busy={loading} label="Loading projects" doneLabel={`${projects.length} projects loaded`}>
  	{#if loading}<Spinner />{:else}<Table.Root>…</Table.Root>{/if}
  </Busy>
  ```

  It sets `aria-busy` while loading, so a screen reader can hold off reading a
  half-built region, and pairs it with a polite live region — `aria-busy` announces
  nothing on its own.

  `doneLabel` says what **arrived**, because "done" tells the user the wait is over
  and nothing about the result. Omitting it means they are told the content is
  loading and never told it finished, which is worse than saying nothing; it is
  documented as the wrong choice but left as the caller's.

  The loading message waits `delay` (400ms) first: a response that arrives in 80ms
  does not need narrating. If the wait beats it, only the completion is announced.

## 0.10.0

### Minor Changes

- df1c20c: Add `Command.Status` — announce how many results a search produced.

  Bits filters the Command list internally and announces nothing, so a screen
  reader user typed and the list shrank in silence: they never learned whether they
  had forty matches or none. It reports the count through `onStateChange` and
  exposes it nowhere else, so `Command.Root` now intercepts that hook (the caller's
  own handler still runs, first and unchanged) and publishes the count.

  ```svelte
  <Command.Root label="Command palette">
  	<Command.Input bind:value={search} />
  	<Command.Status label={(n) => (n === 1 ? '1 resultado' : `${n} resultados`)} />
  	<Command.List aria-label="Commands">…</Command.List>
  </Command.Root>
  ```

  A visually hidden `role="status"` region — the count is already on screen, so
  duplicating it visibly would be noise.

  `delay` (500ms) is not a performance tweak: without it, typing "button" fires six
  announcements and the user hears a torrent instead of an answer. Each keystroke
  restarts the wait. It stays silent until the search is non-empty, because the
  count of an unfiltered list is not news when a palette opens.

  `Combobox` needs the same thing and deliberately gets no component: Bits does not
  filter there, the consumer does, so they already know the count. The docs show the
  pattern instead.

## 0.9.2

### Patch Changes

- 8a3e35d: Three fixes, all from the ARIA-state audit and the tree-shaking work.

  **Segmented date fields can now announce that they are required.** `DateField`,
  `TimeField` and their range variants declared `required` and did nothing with it
  — Bits emits nothing for it there, so a `<Field required>` around a date field
  announced nothing at all. It now reaches the segments through context and becomes
  `aria-required` on each editable one, whose `role="spinbutton"` supports it. The
  literal separators are left alone: they are not focusable and carry no role.

  **`DatePicker` and `DateRangePicker` now style their disabled trigger.** Bits sets
  `data-disabled` and nothing styled it, so a disabled picker looked exactly like an
  enabled one.

  **Fixed a styling regression that had been shipping since 0.6.1.** Svelte compiles
  styles per component, so a rule written in one file does not travel to another
  that reuses the class name. A consumer importing only `DateRangePicker` got a
  completely unstyled trigger, and `RangeCalendar` lost its cell and day styles.
  Five classes across three namespaces were affected.

  It was invisible until `sideEffects` was declared and tree-shaking started
  working — the fix for one problem uncovered another that had been hiding behind
  it. Shared rules now live in plain `.css` files that every component using them
  imports, which survives tree-shaking precisely because `sideEffects` is
  `["**/*.css"]`. A new `check-css-coverage` step fails the build if it happens
  again.

## 0.9.1

### Patch Changes

- 369cdba: Stop emitting a dead `required` attribute, and mark the slider properly.

  `Field` puts `required` into the props you spread. On a real input the browser
  handles it, and Bits UI translates it to `aria-required` on checkbox, switch,
  radio group and rating group. On the rest it was landing as dead markup:

  - `Select.Trigger`, `Toggle` and `DatePicker.Trigger` render a `<button>`, where a
    native `required` attribute does nothing. They now swallow it rather than emit
    it, because `aria-required` is not an option either — axe reports it as an
    `aria-allowed-attr` violation on that role.
  - `Slider` was receiving it on its container. The `role="slider"` element is the
    thumb, so it now goes there, where axe accepts it.

  `aria-invalid` is not symmetric with this: axe accepts that one on a button. Each
  was checked separately, and there is a test asserting the asymmetry so the
  decision is not left resting on a comment.

  The `Field` page now documents which controls can be announced as required and
  which cannot.

## 0.9.0

### Minor Changes

- 3bc1d6a: Add `focusFirstInvalidField` — the other half of `Field`'s own guidance.

  `Field`'s documentation says to move focus to the first invalid control when a
  submit fails, which is the correct WCAG technique and the reason the error is
  deliberately not a live region. The library shipped nothing to help do it.

  ```ts
  import { focusFirstInvalidField } from 'sve-ui';

  if (Object.keys(errors).length > 0) {
  	await focusFirstInvalidField({ root: formEl });
  	return;
  }
  ```

  It awaits Svelte's `tick()` internally, because it is called right after the
  state change that produced the errors and the DOM would otherwise not carry them
  yet. It returns `false` when nothing was focused, so a caller can fall back when
  a submit failed for a reason no single field owns, and it reports to the console
  when it finds an invalid field whose control was never wired or cannot take
  focus, rather than doing nothing quietly.

  It matches on the `Field` wrapper rather than on `aria-invalid`, so it focuses
  the labelled control — which is what makes the label, error and description
  announce together — and only ever moves focus into a field this library wired.

## 0.8.0

### Minor Changes

- ce5eac7: Every form control can now show that it is invalid, and `Button` has a loading
  state.

  `Field` sets `aria-invalid` on whatever control it is given, and until now only
  `Input` and `Textarea` could show it. Ten controls announced themselves as
  invalid while looking exactly like a correct one — a sighted user read an error
  message with no indication of which control it was about.

  `invalid` is now on `Checkbox.Root`, `Switch.Root`, `RadioGroup.Root`,
  `Combobox.Input`, `RatingGroup.Root`, `Select.Trigger`, `Toggle`, `Slider`,
  `PinInput.Root` and `DatePicker.Trigger`. It always applies the styling.
  `aria-invalid` is set only where the rendered role supports it — `Select.Trigger`
  and `Toggle` render plain `<button>`s, where ARIA does not list that state, so
  the accessible signal stays `Field`'s `aria-describedby`.

  `Button` takes `loading`: a spinner, `aria-busy`, and activation blocked. It
  stays **focusable** on purpose — `disabled` would drop a keyboard user who just
  pressed Enter back to the top of the document. `loadingLabel` is what gets
  announced, and the spinner respects `prefers-reduced-motion`.

## 0.7.2

### Patch Changes

- c31a670: Docs: the prop tables now document props inherited from Bits UI.

  Most components here are thin Bits wrappers whose `Props` reads
  `extends Omit<ComponentProps<typeof Bits.Root>, …>` and declares almost nothing
  of its own — every real prop is inherited and forwarded through the spread. The
  generator read the AST only, so six documented components had **zero** generated
  coverage and their tables had to be written by hand.

  It now resolves the heritage clause with the TypeScript checker, pulling
  descriptions from Bits' own JSDoc. `pagination` went from 2 documented props to
  18; `menubar` from 4 to 50.

  No library code changed. Published only because the docs are part of what the
  package promises.

## 0.7.1

### Patch Changes

- 5ca34fc: Ship the agent skill inside the package.

  `files` was `["dist"]`, so the tarball contained **zero** skill files — while the
  docs site described the skill as something the package ships and told people to
  copy it from a path an installed copy never had. Its whole purpose is that a
  _consumer's_ agent writes correct `sve-ui` code, so it was useless living only in
  this repo.

  ```bash
  mkdir -p .claude/skills
  cp -r node_modules/sve-ui/skills/sve-ui-usage .claude/skills/
  ```

  Guarded by `check-package-files`, which asks `npm pack --dry-run --json` for the
  real file list rather than reading the repo.

## 0.7.0

### Minor Changes

- d38d9e3: Add `Field` — a label, help text and a validation message wired to one control.

  Until now `aria-describedby` appeared in **zero** of this library's components.
  There was no accessible way to attach help text or an error to any control:
  consumers generated the ids themselves and wired them by hand, on every field.
  That is the same shape of gap as `Button` being unable to render a link.

  ```svelte
  <Field label="Email" description="We never share it." {error} required>
  	{#snippet control(props)}
  		<Input {...props} type="email" bind:value={email} />
  	{/snippet}
  </Field>
  ```

  Ids come from `$props.id()`, so they are identical on the server and the client
  and never collide between fields.

  The control arrives through a snippet, and `description`/`error` are props rather
  than sibling parts, because `aria-describedby` may only name ids that exist — and
  that has to hold in the server-rendered HTML, not be repaired later by an effect.
  A sibling `<Field.Description>` could only register itself after the control had
  rendered. There are tests that render on a real server and assert every
  referenced id resolves.

  There is no `invalid` prop: passing `error` is what marks the field invalid, so
  the styling and `aria-invalid` cannot disagree with the message the user reads.
  Pass `undefined` when valid, not an empty string.

## 0.6.1

### Patch Changes

- 4580486: Declare `sideEffects` so bundlers can drop what you do not import.

  The field was missing, so a consumer importing a single `Button` was shipping the
  whole catalog's CSS. Measured against 0.6.0, a Button-only bundle was **34 KB of
  JS and 52 KB of CSS covering 42 components** — Calendar, Sheet, Toolbar, Command
  and the rest. It is now **2.2 KB of JS and CSS for 2**.

  The value is `["**/*.css"]`, deliberately not `false`. `sve-ui/theme.css` is an
  exported subpath that consumers import for its effect alone, and a blanket
  `false` lets bundlers drop that import, taking every `--sve-*` token with it.

  A new `check-treeshake` step in the package script bundles a Button-only entry
  against the built output and fails if the rest of the library comes along, so the
  regression cannot return unnoticed.

## 0.6.0

### Minor Changes

- 5ed2cb0: `Button` can now render a link.

  Pass `href` and it renders an `<a>` instead of a `<button>`, keeping the same
  variants and sizes. `target="_blank"` gets `rel="noopener noreferrer"`
  automatically unless you pass your own `rel`.

  This closes a real gap. Without it, the only way to make a styled control
  navigate was `onclick={() => (window.location.href = '/somewhere')}` — and that
  is not a link: it cannot be middle-clicked or opened in a new tab, shows no URL
  on hover, is announced as a button rather than a link, and does nothing at all
  until JavaScript has run. Our own documentation site had six of them, which is
  how it was reported (#41).

  `href` together with `disabled` renders a `<span aria-disabled="true">`, not an
  anchor. `<a>` has no `disabled` attribute, and an `<a aria-disabled>` still takes
  a tab stop and is still announced as a link, so it invites the user to follow
  something that goes nowhere. Same call as `Sidebar.Item`.

## 0.5.0

### Minor Changes

- 24b271a: Add Calendar and RangeCalendar.

  **`@internationalized/date` is now a peerDependency.** Install it alongside `sve-ui` if you use any date component:

  ```
  pnpm add sve-ui @internationalized/date
  ```

  Dates are `DateValue` objects from that library, not JavaScript `Date`s. You construct the values, so there must be exactly one copy — two copies means objects that stop lining up. bits-ui already declared it as a hard peer and bits-ui is our dependency, so this only makes explicit what was already required.

  - **`Calendar`** namespace (14 parts) — `Root > Header > (PrevButton + Heading + NextButton)` and `Grid > GridHead/GridBody > GridRow > Cell > Day`, plus optional `MonthSelect` and `YearSelect`. Bits owns the roving grid, arrow-key navigation across weeks and months, PageUp/PageDown, Home/End, and the calendar arithmetic. `value` (the selection) and `placeholder` (the month on screen) are separate and both bindable — paging months must not change what is selected.
  - **`RangeCalendar`** namespace — same composition, `value` is `{ start, end }`. Bits handles the two-step pick and normalises a backwards selection, so clicking the end first does the sensible thing rather than producing an inverted range. `minDays`/`maxDays` bound the span and `excludeDisabled` refuses a range that would straddle an unavailable date.

    `Header`, `Heading`, the nav buttons, `Grid`, `GridHead`, `GridBody`, `GridRow`, `HeadCell`, `MonthSelect` and `YearSelect` are the **same components** `Calendar` uses — Bits re-exports the identical modules to both namespaces, so there is one styled implementation rather than two copies of the same CSS. Only `Root`, `Cell` and `Day` are range-specific.

  ### Two things the API does not make obvious

  **Pass `calendarLabel`.** Bits builds the root's accessible name as `` `${calendarLabel} ${month} ${year}` `` and defaults the first part to the literal word `"Event"` — so an unset calendar announces as "Event January 2026", which tells the user nothing about what they are picking. Pass "Departure date", "Due date", "Booking".

  **The nav buttons' `aria-label` cannot be overridden.** Bits hardcodes `"Previous"` and `"Next"` and merges its own props last, so one you pass is discarded. Both behaviours were verified against the rendered DOM and the Bits source, and are asserted in tests.

  ### Styling that carries meaning

  `isDateDisabled` (out of range) and `isDateUnavailable` (exists but taken — a fully booked day) are different answers and are styled differently: disabled fades out, unavailable stays readable and is struck through. Collapsing both into one grey blur throws away information the user needs. `data-today` gets a ring rather than a fill, so today stays legible when it is also the selected day. Range endpoints are filled with the span between them tinted and inner corners squared, so a range reads as one band with two handles.

  `locale` changes month names, **which day the week starts on**, and the numeral system — pass the user's locale rather than hardcoding Monday-first or Sunday-first.

  One gotcha worth repeating from the docs: key the weekday `each` by **index**, not by the label. Narrow weekday names are not unique — "T" is both Tuesday and Thursday — and keying by label throws.

- 69d2505: Add DatePicker and DateRangePicker. **This completes the date and time family — every Bits UI primitive is now wrapped.**

  A picker is a segmented field plus a calendar popover **sharing one value**, and that pairing is the point: someone who knows the date types it in three keystrokes, someone choosing "the second Tuesday" opens the calendar. Ship only the calendar and the fast path is slow; ship only the field and browsing is impossible. They share one value rather than two synced ones, so typing moves the calendar's selection and picking a day fills the segments with no reconciliation code on your side.

  Put the `Trigger` inside the `Input`, after the segments. It is usually icon-only, so give it an `aria-label`.

  ### Almost entirely reused

  Only `Root`, `Trigger`, `Content` and `Calendar` are picker-specific. Everything else is re-exported from namespaces that already exist, because Bits re-exports the identical modules:

  | Part                        | Comes from                                    |
  | --------------------------- | --------------------------------------------- |
  | `Input`, `Label`, `Segment` | `DateField`                                   |
  | the calendar chrome         | `Calendar`                                    |
  | `Arrow`, `Close`            | `Popover`                                     |
  | `Cell`, `Day` (range only)  | `RangeCalendar` — they carry the range states |
  | `Content` (range only)      | `DatePicker` — literally the same panel       |

  So a field inside a picker behaves and looks exactly like a standalone one, not by convention but because it _is_ the same component. This is the payoff from the earlier sharing work: two full-featured pickers cost seven new files.

  Everything documented on those pages applies here — `locale` reorders the segments and sets the calendar's first day of week, `calendarLabel` must be passed (Bits defaults it to the literal word "Event"), and the calendar's nav buttons have hardcoded aria-labels.

  ### `DateRangePicker` specifics

  Two `Input`s, one `type="start"` and one `type="end"`. Set `numberOfMonths={2}`: a range crossing a month boundary is the common case, and one month forces the user to page back and forth to see both ends of their own selection.

  **Name the Root.** Like the range _field_, the range picker's group carries no accessible name of its own — pass `aria-labelledby` pointing at your Label's id, or `aria-label`.

  `value`, `placeholder` and `open` are bindable on both.

- 6be6b43: Add DateField, TimeField, DateRangeField, and TimeRangeField — the segmented date and time inputs.

  Compose `Root > Label + Input`, rendering a `Segment` per part from the snippet `Input` gives you. Values are `DateValue`/`TimeValue` from `@internationalized/date`, which is a peerDependency.

  **These are not text inputs with a mask.** Every part is its own `role="spinbutton"` with `aria-valuenow`, `aria-valuetext` and its own `aria-label`, so arrow keys adjust it and a screen reader announces "month, 12" rather than reading a formatted string. Typed numbers fill the focused segment and advance, and the value only commits once _every_ segment is filled — so there is no half-parsed intermediate state to guard against. Separators are rendered as `data-segment="literal"` with `aria-hidden`, otherwise the field would announce "slash" between the parts.

  The `Segment` is shared: Bits re-exports the identical module to the range namespaces, so `DateRangeField` reuses `DateField`'s and `TimeRangeField` reuses `TimeField`'s. One styled implementation, no drift.

  ### `locale` reorders the field, it does not relabel it

  `en-US` renders month / day / year; `en-GB` renders day / month / year. Passing the wrong locale means a user typing their own date format silently enters the wrong date. That is a correctness bug rather than a preference, and it is asserted in the tests.

  `granularity` decides which segments exist at all. On `TimeField`, leave `hourCycle` unset so it follows the locale — a 12-hour clock adds a `dayPeriod` (AM/PM) segment and bounds the hour at 1–12, a 24-hour clock has neither.

  ### The range fields leave their group unnamed

  Verified in the rendered DOM: on a range field the **Root** carries `role="group"` with **no accessible name**. Bits points each `Input`'s `aria-labelledby` at your `Label`, but the Inputs carry no role, so nothing exposed to assistive technology ends up labelled — the field announces as an anonymous group.

  **Pass `aria-labelledby` (at your Label's id) or `aria-label` on `Root`.** Both reach the element, and both the gap and the fix are asserted so this cannot regress quietly. The single-value fields do not have this problem: there the `Input` _is_ the group and Bits labels it.

  Range fields also take **two** `Input`s, one `type="start"` and one `type="end"` — `type` is required, there is no single input that holds a range. Mark your visual separator `aria-hidden`.

  `TimeField` values are `TimeValue` (`Time | CalendarDateTime | ZonedDateTime`), which is deliberately **not** the same as `DateValue`: `@internationalized/date` keeps clock times and calendar dates as separate types.

  One authoring note: key the segment `each` by **index**. Segment parts repeat — there are multiple `literal` separators — so keying by `part` throws.

- 08f6c16: Add the `Stack` and `Flex` layout primitives.

  - **`Stack`** — vertical flow. `<Stack gap={4}>` is `display: flex; flex-direction: column; gap: 1rem`, with `align` defaulting to `stretch` so stacked form fields fill the width.
  - **`Flex`** — the general case. `direction`, `gap`, `align`, `justify`, `wrap`. `align` defaults to `center` rather than the CSS default of `stretch`, because a row of mixed-height things — a label beside a button, an icon beside text — almost always wants centring and `stretch` visibly breaks it.

  Both take `as` so the markup stays semantic (`ul`, `fieldset`, `nav`) instead of wrapping a div around the real element, and both reset list styling so `as="ul"` does not render bullets.

  **The narrow API is the feature.** `gap` is a spacing **token key** (`gap={4}`), not an arbitrary length, and there is no `margin`, `padding`, `width` or colour prop. Margin belongs to the parent — a component that sets its own outer margin cannot be reused in a layout that spaces things differently — and constraining the gap is what keeps rhythm consistent instead of letting every screen invent its own spacing.

  This library already shipped the other version of this idea: the pre-1.0 `Box` took seventeen style props with duplicate aliases (`p`/`padding`, `m`/`margin`, `w`/`width`) and concatenated inline style strings. It had reinvented CSS with a worse syntax, and it was dropped rather than ported. When you want something `Stack` or `Flex` does not express, reach for CSS — that is the boundary working, not a gap in the component.

  Also exports `StackGap`, `StackAlign`, `StackAs`, `FlexGap`, `FlexDirection`, `FlexAlign`, `FlexJustify`, `FlexAs`.

- b86ac5a: Add PinInput and RatingGroup — no new dependencies. With these, every Bits UI primitive except the date and time family is now wrapped.

  - **`PinInput`** namespace (`Root`, `Cell`) — one-time codes and PINs. `maxlength` is required and sets the number of cells; `value` is bindable and `onComplete` fires once every cell is filled.

    The cells look like separate boxes but they are not: Bits renders **one** real input behind them. That is the whole reason to use this rather than rolling your own — paste fills every cell at once, mobile SMS autofill works (`autocomplete="one-time-code"`), there is no tabbing between boxes, and a screen reader announces one field instead of six. `pasteTransformer` lets you strip hyphens and spaces before they reach the cells.

    **`<label for>` does not work here.** The `id` you pass lands on the wrapper `<div>`, and the real input gets a Bits-internal id you cannot predict, so a `for` attribute has nothing to point at and you ship an unnamed field. Name it from Root instead — `aria-label`, or `aria-labelledby` pointing at your own visible label element. Verified against the rendered DOM and pinned by a test.

  - **`RatingGroup`** namespace (`Root`, `Item`) — star ratings. `value` is bindable, `size` is sm/md/lg, and `name` includes it in a form submission.

    Bits gives Root `role="slider"` with the `aria-value*` attributes, so arrow keys adjust the rating and the whole control is one tab stop; the items are `role="presentation"`, carrying `data-state` of active, partial or inactive, so half-star readings are expressible. A hand-rolled row of clickable icons looks identical and is unusable by keyboard.

    Set **both** `aria-label` and `aria-valuetext` on Root. Pass `aria-valuetext` as a function — `(value, max) => \`${value} of ${max} stars\`` — otherwise the rating is announced as a bare number, and "3" says nothing about the scale a sighted user gets for free.

  Also exports `RatingGroupSize`.

  ### Fixed

  The docs registry was missing entries for `range-calendar`, `date-range-field`, `date-range-picker`, `time-field` and `time-range-field`, so the "coming soon" list — and the count on the components index — understated what is left to build.

- f55ce6b: Add `Sidebar` — a composable app-shell navigation panel.

  Custom rather than a Bits UI wrapper: Bits ships no sidebar, and there is no hard
  behaviour to buy here. What a sidebar needs is a landmark, a labelled list, a
  shared collapsed state and a toggle that announces itself.

  `Sidebar.Provider` owns the state and `Sidebar.Root` is the `<aside>`. They are
  separate parts because Svelte context reaches descendants, not siblings — with
  `collapsible="offcanvas"` the `Trigger` has to live outside `Root`, or collapsing
  hides the only way back. The Provider imposes no layout unless you pass `shell`.

  Parts: `Provider`, `Root`, `Trigger`, `Header`, `Content`, `Footer`, `Group`,
  `GroupLabel`, `Menu`, `Item`.

- 8b8ad5a: Add `Table` — a styled data table.

  Custom rather than a Bits UI wrapper: Bits ships no table, and there is nothing
  headless to buy. A data table is already a solved accessibility problem in HTML —
  `<table>`, `<caption>`, `scope` on the headers — so the value is getting that
  markup right by default plus the styling and the scroll container on top.

  What it deliberately does not do:

  - It does not sort your data. `Head sortable` renders the button and sets
    `aria-sort`; the application applies the order, because sorting may be
    server-side, interacts with pagination, and comparing text correctly needs an
    `Intl.Collator` for the user's locale.
  - It does not set `role="grid"`. That role promises arrow-key cell navigation;
    claiming it without implementing it leaves a screen reader user pressing keys
    that do nothing.
  - `Row selected` sets `data-selected`, never `aria-selected` — that attribute is
    not valid on a plain `<tr>`.

  Parts: `Root`, `Caption`, `Header`, `Body`, `Footer`, `Row`, `Head`, `RowHeader`,
  `Cell`.

- d5579b4: Add `Toast` — transient notifications, and the library's only imperative API.

  `import { toast } from 'sve-ui'` for the trigger, plus a `<Toast.Viewport />`
  mounted once for the placement. Without a Viewport nothing renders.

  Imperative because a toast reports an event, not state — and decisively, because
  an imperative call is reachable from code that is not a component at all (a
  `fetch` wrapper, an interceptor, a `load` function), where a context-based API
  cannot be used. The mount point stays declarative so the app decides where the
  stack sits, how many fit and what the region is called.

  The queue is the library's only mutable module state, which is shared across
  requests on a server. Enqueuing during SSR would put one user's toast in another
  user's HTML, so it is refused and reported rather than silently accepted.

  Other decisions worth knowing:

  - A toast carrying an `action` does not auto-dismiss unless you pass an explicit
    `duration`. A control the user can lose a race against is not a control.
  - Politeness is fixed at `polite`. `assertive` interrupts whatever is being read,
    and anything worth interrupting for is too important to auto-dismiss — that is
    an inline `Alert` or an `AlertDialog`.
  - Timers pause on hover and on focus, because someone reading with a screen
    reader is not moving a pointer.
  - No swipe-to-dismiss and no stacked animation in this version, and no second
    runtime dependency.

- c3b6070: Add Toggle, ToggleGroup, Collapsible, Progress, Meter, and AspectRatio (Wave 4b) — no new dependencies.

  - **`Toggle`** — a two-state button over the Bits Toggle primitive. `pressed` (bindable), `disabled`, `size` (sm/md/lg), `variant` (outline/ghost). Bits owns `aria-pressed`.
  - **`ToggleGroup`** namespace (`Root`, `Item`) — segmented control. `type` is required and decides both behaviour and the shape of `value`: `single` yields a string, `multiple` a `string[]`. The two modes carry different semantics on purpose — `single` items are `role="radio"` with `aria-checked`, `multiple` items are buttons with `aria-pressed`.
  - **`Collapsible`** namespace (`Root`, `Trigger`, `Content`) — one expand/collapse region with `open` bindable. Bits wires `aria-expanded` and `aria-controls`.
  - **`Progress`** — advancement toward completion, `role="progressbar"`. `value` (`null` for indeterminate), `min`, `max`, `size`, `color`. The indeterminate animation is disabled under `prefers-reduced-motion`.
  - **`Meter`** — a static measurement within a known range, `role="meter"`. Same value/size/color surface as Progress.
  - **`AspectRatio`** — reserves a box before media loads, which is what prevents layout shift. `ratio` as width / height.

  `Progress`, `Meter` and `ToggleGroup.Root` need an accessible name from you (`aria-label` or `aria-labelledby`); Bits supplies the role and value attributes but cannot invent the name.

  Also exports the matching types: `ToggleSize`, `ToggleVariant`, `ToggleGroupSize`, `ProgressSize`, `ProgressColor`, `MeterSize`, `MeterColor`.

- 1373b95: Add AlertDialog, Sheet, and LinkPreview — no new dependencies.

  - **`AlertDialog`** namespace (`Root`, `Trigger`, `Overlay`, `Content`, `Title`, `Description`, `Action`, `Cancel`) — destructive confirmation. The differences from `Dialog` are behavioural, not decorative: `role="alertdialog"`, the backdrop does **not** dismiss (Bits omits `onInteractOutside` on Content), and `Cancel` takes initial focus so Enter never destroys anything. `Action` defaults to the danger tone.

    **`Action` does not close the dialog — only `Cancel` does.** That is deliberate: a destructive operation is usually async and can fail, so closing is the consumer's call. Close after it succeeds, or keep the dialog open and show the error. Verified against the Bits source (`AlertDialogCancelState` has an `onclick` calling `handleClose()`; `DialogActionState` has none) and pinned down by tests.

  - **`Sheet`** namespace (`Root`, `Trigger`, `Close`, `Overlay`, `Content`, `Title`, `Description`) — a Dialog anchored to a viewport edge. It composes Bits Dialog rather than reimplementing it, so the focus trap, ESC handling, scroll lock and ARIA all come from there. `side` (left/right/top/bottom, default `right`) and `size` (sm/md/lg), where `size` applies to whichever axis the panel grows along and is always capped against the viewport.
  - **`LinkPreview`** namespace (`Root`, `Trigger`, `Arrow`, `Content`) — the hover-card pattern.

    **It opens on pointer hover only** — not on focus, and there is no hover on touch, so keyboard and mobile users never see it. Treat it as enrichment, never as the only path to an action or a fact; reach for `Popover` when the content is essential. Note also that Bits renders the trigger as an `<a href>` but overrides its role to `button` with `aria-haspopup="dialog"`, so it is announced as a button rather than a link.

  `AlertDialog` and `Sheet` both require a `Title` — Bits points the dialog's `aria-labelledby` at it, so omitting it ships a dialog with no accessible name.

  Also exports the matching types: `AlertDialogActionColor`, `SheetSide`, `SheetSize`.

- af5bda5: Add ContextMenu, ScrollArea, and Toolbar — no new dependencies.

  - **`ContextMenu`** namespace (`Root`, `Trigger`, `Content`, `Item`, `Group`, `Label`, `Separator`, `Sub`, `SubTrigger`, `SubContent`, `CheckboxItem`, `RadioItem`, `RadioGroup`, `Arrow`) — right-click menu. `Trigger` is the right-click **region**, not a button.

    Treat it as an accelerator, never as the only route to an action: right-click is undiscoverable, and touch devices have no right-click at all. Every action offered here must also be reachable from a visible control.

  - **`ScrollArea`** namespace (`Root`, `Viewport`, `Scrollbar`, `Thumb`) — styled scroll chrome over a native scroll container, so wheel, touch and keyboard scrolling all keep working and content is not virtualised. Put the size constraint on `Root`; `Viewport` fills it.

    Note that the default `type="hover"` does not merely hide the scrollbar — Bits does not mount it at all until the pointer enters, which removes the only visual cue that more content exists. Prefer `type="always"` unless the overflow is obvious from the content.

  - **`Toolbar`** namespace (`Root`, `Button`, `Link`, `Group`, `GroupItem`) — `role="toolbar"` with roving focus, so the whole bar is one tab stop and arrow keys move between controls. A twelve-button toolbar then costs a keyboard user one Tab instead of twelve. The parts are not interchangeable: `Button` performs an action, `Link` navigates and stays a real anchor (keeping middle-click and open-in-new-tab), `Group`/`GroupItem` form a toggle group whose `type` sets the shape of `value`.

    `Root` needs an `aria-label`, and icon-only controls need their own.

  Also exports the matching type: `ScrollAreaType`.

  ### Changed

  `DropdownMenu`'s `Item`, `Group`, `Label` and `Separator` now come from a single shared implementation that `ContextMenu` also uses — Bits re-exports identical menu internals under both namespaces, so two copies of the same CSS would only drift apart. Behaviour is unchanged and the parts stay context-aware (the same wrapper emits `data-context-menu-item` inside a ContextMenu and `data-dropdown-menu-item` inside a DropdownMenu).

  Their internal CSS classes were renamed accordingly: `sve-dropdown-item` → `sve-menu-item`, `sve-dropdown-group` → `sve-menu-group`, `sve-dropdown-label` → `sve-menu-label`, `sve-dropdown-separator` → `sve-menu-separator`. These class names were never documented — the supported way to theme sve-ui is by overriding `--sve-*` CSS variables — but if you were targeting them directly, update your selectors.

- 6196136: Add Menubar, Pagination, and Breadcrumb — no new dependencies.

  - **`Menubar`** namespace (`Root`, `Menu`, `Trigger`, `Content`, `Item`, `Group`, `Label`, `Separator`, `Sub`, `SubTrigger`, `SubContent`, `CheckboxItem`, `RadioItem`, `RadioGroup`, `Arrow`) — desktop-style menu bar. Compose `Root > Menu > (Trigger + Content)`.

    A menubar is not a row of dropdowns: arrow keys move between the top-level menus, and once one is open, hovering a sibling switches to it without a second click. Build it from separate `DropdownMenu`s and you lose both. It is application chrome, though — for site navigation reach for `NavigationMenu` instead. Give `Root` an `aria-label`.

    `Item`, `Group`, `Label` and `Separator` come from the shared menu implementation that `DropdownMenu` and `ContextMenu` also use, so all three menus match by construction.

  - **`Pagination`** namespace (`Root`, `Page`, `PrevButton`, `NextButton`) — `Root` takes `count` and `perPage` and hands you a `pages` array through a snippet prop, so you render the buttons while Bits owns the page range, the ellipsis logic and keyboard navigation. `page` is bindable, Prev/Next disable at the ends automatically, and the active page carries `data-selected`.

    Wrap the whole thing in `<nav aria-label="Pagination">`, and give arrow-only Prev/Next buttons an `aria-label`.

  - **`Breadcrumb`** namespace (`Root`, `List`, `Item`, `Link`, `Separator`) — custom rather than a Bits wrapper, because a `<nav>` landmark wrapping an ordered list already _is_ a breadcrumb trail: there is no keyboard behaviour to manage and no ARIA to invent. The list is `<ol>` because the order carries meaning.

    Set `current` on the last `Link`: it renders as plain text with `aria-current="page"` instead of an anchor, since a link to the page you are already on is a dead end. Separators are `aria-hidden` with `role="presentation"`, so a screen reader reads "Home, Projects, Settings" rather than "Home, slash, Projects, slash, Settings". `Root`'s `label` defaults to `"Breadcrumb"`, which is what distinguishes it from the site's main navigation.

- ec88bc8: Add NavigationMenu and Command — no new dependencies.

  - **`NavigationMenu`** namespace (`Root`, `List`, `Item`, `Trigger`, `Content`, `Link`, `Viewport`, `Sub`, `Indicator`) — the right primitive for site navigation. Its triggers open on hover after `delayDuration` **and** on click or Enter, so the menu works for pointer, keyboard and touch alike; that is where `Menubar`, a desktop pattern assuming hover, falls down on the web.

    `Root` renders a `<nav>` landmark, so give it an `aria-label`. Set `active` on the Link for the current page — Bits then reports `aria-current="page"`, which is the difference between looking highlighted and being announced. Links stay real anchors throughout. `Viewport` is optional and gives every panel one shared, resizing container.

  - **`Command`** namespace (`Root`, `Input`, `List`, `Viewport`, `Item`, `Group`, `GroupHeading`, `GroupItems`, `Empty`, `Separator`, `Loading`, `LinkItem`) — the command-palette pattern. Bits owns the filtering, the scoring and arrow-key navigation, and keeps focus in the Input while the highlight moves. Wrap it in a `Dialog` for a modal palette.

    **`Command.Viewport` is required**, not decorative. It goes inside `List` and wraps the content: Bits takes the Input's `aria-controls` from the Viewport's id and uses it as the insertion element when sorting filtered items. Omit it and the combobox is invalid ARIA — our own axe suite caught exactly that, which is why the docs lead with it.

    There are **two** names to set, and the prop names hide that: `label` on `Root` names the **search field** (it renders a visually hidden `<label>` the Input references), while `aria-label` on `List` names the **list**. Bits defaults the latter to `"Suggestions..."`; override it. We leave Bits' default in place rather than silently substituting our own, so behaviour matches their documentation.

    Add `keywords` to an `Item` for terms users would type that are not in the label — `trash` on a Delete item. Use `Loading` rather than `Empty` while a request is in flight: "no results" and "still loading" are different answers.

  This completes the Bits UI navigation and menu family. `Item`, `Group`, `Label` and `Separator` remain shared across `DropdownMenu`, `ContextMenu` and `Menubar`; `NavigationMenu` and `Command` are self-contained, with no shared internals upstream.

### Patch Changes

- c3b6070: Fix `Accordion.Root` `bind:value` being one-way.

  `value` was forwarded through the prop spread, so the opened item never reached the caller — even though the component's own JSDoc and its docs page both documented the binding as two-way. It has been broken since Accordion shipped, and no test exercised the binding, so nothing caught it.

  `value` is now destructured as `$bindable()` and passed as `bind:value`. The loose cast around the Bits root needed its third type argument to name the bindable prop, otherwise the cast erases the binding. Covered by a regression test.

- ed18af9: Fix `Label` and `Separator` shipping with no prop types.

  Both components imported a Bits UI namespace whose name matched their own (`import { Label } from 'bits-ui'` inside a component called `Label`). `svelte-package` cannot resolve that shadowing and silently emitted `declare const Label: any`, so consumers of 0.4.0 got no prop autocomplete and no type errors on invalid props. The Bits imports are now aliased (`LabelPrimitive`, `SeparatorPrimitive`) and both emit their real `Component<Props, …>` type.

  Adds `scripts/check-dts.mjs` to the `package` step, which fails the build if any generated component type collapses to `any`. `svelte-check` only validates the source and `publint`/`attw` only validate the package shape, so nothing was asserting the fidelity of the emitted types.

## 0.4.0

### Minor Changes

- a55a1d3: Add Textarea, Label, Skeleton, and Separator (Wave 4a) — no new dependencies.

  - **`Textarea`** — styled native `<textarea>`. `size` (sm/md/lg), `variant` (outline/filled), `invalid` (wires `aria-invalid`), `resize` (none/vertical/horizontal/both, default `vertical`), bindable `value`. Mirrors the `Input` API.
  - **`Label`** — wraps the Bits UI Label primitive, so click-to-focus and text-selection behaviour come from the primitive. `size` (sm/md/lg) and `required`, which renders an `aria-hidden` asterisk (the control still needs its own `required`).
  - **`Skeleton`** — loading placeholder. `variant` (text/circle/rect) plus `width`/`height` overrides. Always `aria-hidden`; announce the loading state on the owning region. Shimmer is disabled under `prefers-reduced-motion`.
  - **`Separator`** — wraps the Bits UI Separator primitive: `role="separator"` with `aria-orientation`, or `role="none"` when `decorative`. `orientation` (horizontal/vertical).

  Also exports the matching types: `TextareaSize`, `TextareaVariant`, `TextareaResize`, `textareaVariants`, `LabelSize`, `SkeletonVariant`.

## 0.3.1

### Patch Changes

- 506d758: Slider: add a `thumbLabel` prop so the thumb (`role="slider"`) has an accessible name. Without it, axe reported an `aria-input-field-name` violation. In `multiple` mode each thumb's label is suffixed with its position.

## 0.3.0

### Minor Changes

- 997bbf6: Add Wave 3 form controls (batch 1), built on Bits UI:

  - **Switch** (`Switch.Root`) — accessible toggle with `sm`/`md`/`lg` sizes and
    `bind:checked`.
  - **Checkbox** (`Checkbox.Root`) — checkbox with check / indeterminate indicators,
    `sm`/`md`/`lg` sizes, `bind:checked` and `bind:indeterminate`.
  - **RadioGroup** (`RadioGroup.Root` + `RadioGroup.Item`) — radio group with a
    selected-dot indicator and `bind:value`.

  All styled with `--sve-*` tokens, no Tailwind required.

- 0ceec98: Add Tabs, Accordion, and Code components:

  - **Tabs** (`Tabs.Root` / `List` / `Trigger` / `Content`) — accessible tabs on
    Bits UI with `bind:value` and an active-underline indicator.
  - **Accordion** (`Accordion.Root` / `Item` / `Header` / `Trigger` / `Content`) —
    single or multiple (`type`), `bind:value`, rotating chevron on the trigger.
  - **Code** — code block with an optional header label and an SSR-safe
    copy-to-clipboard button (`code`, `label`, `copyable` props).

  All styled with `--sve-*` tokens; no Tailwind required.

- f5f09a7: Add Wave 3 form controls (batch 3), built on Bits UI:

  - **Select** (`Select.Root` / `Trigger` / `Content` / `Item` / `Value` / `Group`)
    — accessible listbox select with a styled trigger, portaled menu, and a
    selected-item check.
  - **Combobox** (`Combobox.Root` / `Input` / `Content` / `Item`) — typeahead/filter
    select with a styled input and portaled list.
  - **Slider** — self-contained range slider (track + filled range + thumb-per-value),
    single or multiple, `min` / `max` / `step`.

  All styled with `--sve-*` tokens; no Tailwind required.

## 0.2.1

### Patch Changes

- 3a10045: Add a package README (shown on npm) and a sharper package description covering
  the wedge: styled + accessible Svelte 5 components on Bits UI, no Tailwind/config,
  themeable via CSS variables.

## 0.2.0

### Minor Changes

- 61dae57: Complete 2026 rewrite. Sve-UI is now a library of ready-made, fully styled and
  fully accessible Svelte 5 components (HeroUI-style), built on Bits UI — no
  Tailwind and no config required in the consumer's project.

  - **Svelte 5 + runes** throughout; ships ESM with types and provenance.
  - **13 components**: Button, Input, Card, Badge, Avatar, Spinner, Text, Heading,
    Alert, plus accessible overlays on Bits UI — Dialog, DropdownMenu, Tooltip,
    Popover.
  - **Theming via CSS custom properties** (`--sve-*`): semantic color tokens
    (primary/secondary/success/warning/danger/default), spacing, radius and
    typography, with light and dark out of the box.
  - **`ThemeProvider`** for color-scheme switching and per-subtree token overrides;
    typed `defineVariants` helper and exported variant/type maps.
  - Styles ship in the package (`import 'sve-ui/theme.css'`) — install, import, use.

  > Note: this is a ground-up redesign. The pre-1.0 API differs from `0.1.x`
  > (which exposed layout primitives); treat it as a fresh baseline.
