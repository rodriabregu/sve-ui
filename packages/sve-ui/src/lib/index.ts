/**
 * sve-ui main entry point.
 *
 * Exports: ThemeProvider, Button, Dialog namespace, Text, Heading, Badge, Avatar, Spinner,
 * Card namespace, Alert namespace, Input, Textarea, Label, Skeleton, Separator,
 * Toggle, ToggleGroup namespace, Collapsible namespace, Progress, Meter, AspectRatio,
 * Stack, Flex,
 * AlertDialog namespace, Sheet namespace, LinkPreview namespace,
 * ContextMenu namespace, ScrollArea namespace, Toolbar namespace,
 * Menubar namespace, Pagination namespace, Breadcrumb namespace,
 * NavigationMenu namespace, Command namespace, PinInput namespace,
 * Calendar namespace, RangeCalendar namespace, DateField, TimeField,
 * DateRangeField and TimeRangeField namespaces, DatePicker and
 * DateRangePicker namespaces, Sidebar namespace, Table namespace,
 * Toast namespace + the imperative `toast`,
 * RatingGroup namespace, Kbd, ButtonGroup,
 * Empty and InputGroup namespaces,
 * Carousel and Resizable namespaces,
 * variant helper + types, theme types.
 */

// Components
export { default as ThemeProvider } from './ThemeProvider.svelte';
export { default as Button } from './components/Button/Button.svelte';
// Attaches several independent buttons into one visual control.
export { default as ButtonGroup } from './components/ButtonGroup/ButtonGroup.svelte';
export { default as Text } from './components/Text/Text.svelte';
export { default as Heading } from './components/Heading/Heading.svelte';
export { default as Badge } from './components/Badge/Badge.svelte';
export { default as Spinner } from './components/Spinner/Spinner.svelte';
// Marks a region as loading and announces it; found missing by the example app.
export { default as Busy } from './components/Busy/Busy.svelte';
export { default as Input } from './components/Input/Input.svelte';
export { default as Code } from './components/Code/Code.svelte';
// A keycap. `label` gives `\u2318` a spoken alternative.
export { default as Kbd } from './components/Kbd/Kbd.svelte';
export { default as Slider } from './components/Slider/Slider.svelte';
export { default as Textarea } from './components/Textarea/Textarea.svelte';
export { default as Label } from './components/Label/Label.svelte';
// Ties a control to its label, description and error with matching ids.
export { default as Field } from './components/Field/Field.svelte';
// The other half of Field's own guidance: on a failed submit, focus the first
// invalid control.
export { focusFirstInvalidField, type FocusFirstInvalidOptions } from './components/Field/focus.js';
export { default as Skeleton } from './components/Skeleton/Skeleton.svelte';
export { default as Separator } from './components/Separator/Separator.svelte';
export { default as Toggle } from './components/Toggle/Toggle.svelte';
export { default as Progress } from './components/Progress/Progress.svelte';
export { default as Meter } from './components/Meter/Meter.svelte';
export { default as AspectRatio } from './components/AspectRatio/AspectRatio.svelte';
export { default as Stack } from './components/Stack/Stack.svelte';
export { default as Flex } from './components/Flex/Flex.svelte';

// Dialog namespace (composed over bits-ui)
export * as Dialog from './components/Dialog/index.js';

// DropdownMenu namespace (composed over bits-ui)
export * as DropdownMenu from './components/DropdownMenu/index.js';

// Tooltip namespace (composed over bits-ui)
export * as Tooltip from './components/Tooltip/index.js';

// Popover namespace (composed over bits-ui)
export * as Popover from './components/Popover/index.js';

// Avatar namespace (composed over bits-ui)
export * as Avatar from './components/Avatar/index.js';

// Card namespace
export * as Card from './components/Card/index.js';

// Alert namespace
export * as Alert from './components/Alert/index.js';

// Tabs namespace (composed over bits-ui)
export * as Tabs from './components/Tabs/index.js';

// Accordion namespace (composed over bits-ui)
export * as Accordion from './components/Accordion/index.js';

// Switch namespace (composed over bits-ui)
export * as Switch from './components/Switch/index.js';

// Checkbox namespace (composed over bits-ui)
export * as Checkbox from './components/Checkbox/index.js';

// RadioGroup namespace (composed over bits-ui)
export * as RadioGroup from './components/RadioGroup/index.js';

// Select namespace (composed over bits-ui)
export * as Select from './components/Select/index.js';

// Combobox namespace (composed over bits-ui)
export * as Combobox from './components/Combobox/index.js';

// Collapsible namespace (composed over bits-ui)
export * as Collapsible from './components/Collapsible/index.js';

// ToggleGroup namespace (composed over bits-ui)
export * as ToggleGroup from './components/ToggleGroup/index.js';

// AlertDialog namespace (composed over bits-ui)
export * as AlertDialog from './components/AlertDialog/index.js';

// Sheet namespace (a Dialog anchored to a viewport edge)
export * as Sheet from './components/Sheet/index.js';

// LinkPreview namespace (hover card, composed over bits-ui)
export * as LinkPreview from './components/LinkPreview/index.js';

// ContextMenu namespace (composed over bits-ui; shares the styled menu parts
// with DropdownMenu, since Bits re-exports identical menu internals to both)
export * as ContextMenu from './components/ContextMenu/index.js';

// ScrollArea namespace (composed over bits-ui)
export * as ScrollArea from './components/ScrollArea/index.js';

// Toolbar namespace (composed over bits-ui)
export * as Toolbar from './components/Toolbar/index.js';

// Menubar namespace (composed over bits-ui; shares the styled menu parts with
// DropdownMenu and ContextMenu)
export * as Menubar from './components/Menubar/index.js';

// Pagination namespace (composed over bits-ui)
export * as Pagination from './components/Pagination/index.js';

// Breadcrumb namespace (custom — native nav + ordered list semantics)
export * as Breadcrumb from './components/Breadcrumb/index.js';

// NavigationMenu namespace (composed over bits-ui) — site navigation
export * as NavigationMenu from './components/NavigationMenu/index.js';

// Command namespace (composed over bits-ui) — the command-palette pattern
export * as Command from './components/Command/index.js';

// PinInput namespace (composed over bits-ui) — one-time codes / PINs
export * as PinInput from './components/PinInput/index.js';

// RatingGroup namespace (composed over bits-ui)
export * as RatingGroup from './components/RatingGroup/index.js';

// Calendar namespace (composed over bits-ui). Dates are `DateValue` from
// @internationalized/date, which is a peerDependency — install it alongside
// sve-ui if you use any date component.
export * as Calendar from './components/Calendar/index.js';

// RangeCalendar namespace (shares the styled chrome with Calendar)
export * as RangeCalendar from './components/RangeCalendar/index.js';

// Segmented date and time fields (composed over bits-ui). Dates are
// `DateValue` from @internationalized/date — a peerDependency.
export * as DateField from './components/DateField/index.js';
export * as TimeField from './components/TimeField/index.js';
export * as DateRangeField from './components/DateRangeField/index.js';
export * as TimeRangeField from './components/TimeRangeField/index.js';

// Date pickers: a segmented field plus a calendar popover, sharing one value.
// Almost entirely composed of the DateField, Calendar and Popover parts above.
export * as DatePicker from './components/DatePicker/index.js';
export * as DateRangePicker from './components/DateRangePicker/index.js';

// Sidebar namespace (custom — a composable app-shell nav panel)
export * as Sidebar from './components/Sidebar/index.js';

// Table namespace (custom — a styled data table; it does not sort your data)
export * as Table from './components/Table/index.js';

// Empty namespace (custom — the state a list is in with nothing to show)
export * as Empty from './components/Empty/index.js';

// InputGroup namespace (custom — an Input with addons, drawn as one control)
export * as InputGroup from './components/InputGroup/index.js';

// Carousel namespace (custom — CSS scroll-snap; no loop, no autoplay, on purpose)
export * as Carousel from './components/Carousel/index.js';

// Resizable namespace (custom — the APG window-splitter, keyboard contract included)
export * as Resizable from './components/Resizable/index.js';

// Toast namespace (custom — imperative trigger, declarative Viewport)
export * as Toast from './components/Toast/index.js';
// The imperative entry point. Requires a mounted <Toast.Viewport />.
export { toast } from './components/Toast/store.svelte.js';

// Button variant types
export { buttonVariants } from './components/Button/Button.svelte';

// Badge variant types
export {
	badgeVariants,
	type Variant as BadgeVariant,
	type Color as BadgeColor,
	type Size as BadgeSize
} from './components/Badge/Badge.svelte';

// Card variant types
export {
	cardVariants,
	type Variant as CardVariant,
	type Padding as CardPadding
} from './components/Card/CardRoot.svelte';

// Alert variant types
export {
	alertVariants,
	type Color as AlertColor,
	type Variant as AlertVariant
} from './components/Alert/AlertRoot.svelte';

// Input variant types
export {
	inputVariants,
	type Size as InputSize,
	type Variant as InputVariant
} from './components/Input/Input.svelte';

// Textarea variant types
export {
	textareaVariants,
	type Size as TextareaSize,
	type Variant as TextareaVariant,
	type Resize as TextareaResize
} from './components/Textarea/Textarea.svelte';

// Label types
export { type Size as LabelSize } from './components/Label/Label.svelte';

// Skeleton types
export { type Variant as SkeletonVariant } from './components/Skeleton/Skeleton.svelte';

// Layout primitive types
export {
	type Gap as StackGap,
	type Align as StackAlign,
	type As as StackAs
} from './components/Stack/Stack.svelte';
export {
	type Gap as FlexGap,
	type Direction as FlexDirection,
	type Align as FlexAlign,
	type Justify as FlexJustify,
	type As as FlexAs
} from './components/Flex/Flex.svelte';

// Toggle types
export {
	type Size as ToggleSize,
	type Variant as ToggleVariant
} from './components/Toggle/Toggle.svelte';

// Progress types
export {
	type Size as ProgressSize,
	type Color as ProgressColor
} from './components/Progress/Progress.svelte';

// Meter types
export { type Size as MeterSize, type Color as MeterColor } from './components/Meter/Meter.svelte';

// Variant helper and types
export {
	defineVariants,
	type VariantSchema,
	type VariantConfig,
	type VariantProps
} from './internal/variants';

// Theme context utilities
export { useTheme, type ThemeContext } from './context';

// Theme types and token maps (re-export from theme subpath for convenience)
export {
	lightTokens,
	darkTokens,
	themeToVars,
	type SveTheme,
	type PartialSveTheme,
	type SveColors,
	type SveColorRole,
	type SveSpacing,
	type SveRadius,
	type SveTypography
} from './theme/tokens';
