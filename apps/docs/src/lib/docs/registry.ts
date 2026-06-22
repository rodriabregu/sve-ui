/**
 * Central component registry — single source of truth for the docs sidebar,
 * the /components index grid, and per-component page metadata.
 *
 * `ready: true` means a dedicated /components/<slug> page exists. Items that are
 * not ready yet render as dimmed "soon" entries instead of dead 404 links.
 */

export type ComponentStatus = 'stable' | 'new';

export interface ComponentMeta {
	slug: string;
	name: string;
	blurb: string;
	status?: ComponentStatus;
	ready?: boolean;
}

export interface ComponentGroup {
	label: string;
	items: ComponentMeta[];
}

export const componentGroups: ComponentGroup[] = [
	{
		label: 'Display',
		items: [
			{ slug: 'avatar', name: 'Avatar', blurb: 'Image with graceful fallback.', ready: true },
			{ slug: 'badge', name: 'Badge', blurb: 'Compact status and count labels.', ready: true },
			{ slug: 'card', name: 'Card', blurb: 'Surface container for grouped content.', ready: true },
			{ slug: 'heading', name: 'Heading', blurb: 'Semantic, sized display titles.', ready: true },
			{ slug: 'text', name: 'Text', blurb: 'Body copy with size and tone.', ready: true },
			{ slug: 'skeleton', name: 'Skeleton', blurb: 'Loading placeholder for content.' }
		]
	},
	{
		label: 'Forms',
		items: [
			{ slug: 'button', name: 'Button', blurb: 'Primary action. Variants, tones and sizes.', ready: true },
			{ slug: 'input', name: 'Input', blurb: 'Single-line text field with states.', ready: true },
			{ slug: 'checkbox', name: 'Checkbox', blurb: 'Boolean choice, accessible by default.', status: 'new', ready: true },
			{ slug: 'radio-group', name: 'Radio Group', blurb: 'Single choice from a set.', status: 'new', ready: true },
			{ slug: 'switch', name: 'Switch', blurb: 'On/off toggle control.', status: 'new', ready: true },
			{ slug: 'select', name: 'Select', blurb: 'Listbox for picking one option.', status: 'new', ready: true },
			{ slug: 'combobox', name: 'Combobox', blurb: 'Filterable autocomplete select.', status: 'new', ready: true },
			{ slug: 'slider', name: 'Slider', blurb: 'Pick a value along a range.', status: 'new', ready: true },
			{ slug: 'textarea', name: 'Textarea', blurb: 'Multi-line text field.' },
			{ slug: 'label', name: 'Label', blurb: 'Accessible form label.' },
			{ slug: 'toggle', name: 'Toggle', blurb: 'Two-state toggle button.' },
			{ slug: 'toggle-group', name: 'Toggle Group', blurb: 'Grouped toggle buttons.' },
			{ slug: 'calendar', name: 'Calendar', blurb: 'Date grid for selection.' },
			{ slug: 'date-field', name: 'Date Field', blurb: 'Segmented date input.' },
			{ slug: 'date-picker', name: 'Date Picker', blurb: 'Calendar-based date selection.' },
			{ slug: 'pin-input', name: 'PIN Input', blurb: 'One-time-code / PIN entry.' },
			{ slug: 'rating-group', name: 'Rating Group', blurb: 'Star rating input.' }
		]
	},
	{
		label: 'Feedback',
		items: [
			{ slug: 'alert', name: 'Alert', blurb: 'Inline status and messaging.', ready: true },
			{ slug: 'spinner', name: 'Spinner', blurb: 'Indeterminate loading indicator.', ready: true },
			{ slug: 'toast', name: 'Toast', blurb: 'Transient, stacked notifications.' },
			{ slug: 'progress', name: 'Progress', blurb: 'Determinate progress bar.' },
			{ slug: 'meter', name: 'Meter', blurb: 'Bounded scalar measurement.' }
		]
	},
	{
		label: 'Navigation',
		items: [
			{ slug: 'tabs', name: 'Tabs', blurb: 'Switch between related panels.', status: 'new', ready: true },
			{ slug: 'accordion', name: 'Accordion', blurb: 'Collapsible disclosure sections.', status: 'new', ready: true },
			{ slug: 'sidebar', name: 'Sidebar', blurb: 'Composable app-shell navigation.' },
			{ slug: 'breadcrumb', name: 'Breadcrumb', blurb: 'Hierarchical page trail.' },
			{ slug: 'navigation-menu', name: 'Navigation Menu', blurb: 'Top-level nav with menus.' },
			{ slug: 'menubar', name: 'Menubar', blurb: 'Desktop-style menu bar.' },
			{ slug: 'collapsible', name: 'Collapsible', blurb: 'Single expand/collapse region.' },
			{ slug: 'toolbar', name: 'Toolbar', blurb: 'Grouped controls container.' }
		]
	},
	{
		label: 'Overlays',
		items: [
			{ slug: 'dialog', name: 'Dialog', blurb: 'Modal with focus trap and overlay.', ready: true },
			{ slug: 'dropdown-menu', name: 'Dropdown Menu', blurb: 'Contextual action menu.', ready: true },
			{ slug: 'popover', name: 'Popover', blurb: 'Floating content anchored to a trigger.', ready: true },
			{ slug: 'tooltip', name: 'Tooltip', blurb: 'Hover/focus hint text.', ready: true },
			{ slug: 'alert-dialog', name: 'Alert Dialog', blurb: 'Confirmation modal.' },
			{ slug: 'command', name: 'Command', blurb: 'Command palette / fuzzy search menu.' },
			{ slug: 'sheet', name: 'Sheet', blurb: 'Side drawer panel.' },
			{ slug: 'context-menu', name: 'Context Menu', blurb: 'Right-click action menu.' },
			{ slug: 'link-preview', name: 'Link Preview', blurb: 'Hover card preview.' }
		]
	},
	{
		label: 'Data',
		items: [
			{ slug: 'table', name: 'Table', blurb: 'Sortable, styled data table.' },
			{ slug: 'pagination', name: 'Pagination', blurb: 'Page-by-page navigation.' }
		]
	},
	{
		label: 'Layout',
		items: [
			{ slug: 'stack', name: 'Stack', blurb: 'Vertical spacing primitive.' },
			{ slug: 'flex', name: 'Flex', blurb: 'Flexbox layout primitive.' },
			{ slug: 'separator', name: 'Separator', blurb: 'Visual or semantic divider.' },
			{ slug: 'scroll-area', name: 'Scroll Area', blurb: 'Styled custom scroll container.' },
			{ slug: 'aspect-ratio', name: 'Aspect Ratio', blurb: 'Constrain content ratio.' }
		]
	},
	{
		label: 'Utilities',
		items: [{ slug: 'code', name: 'Code', blurb: 'Copyable code block.', status: 'new', ready: true }]
	}
];

/** Flat lookup for page metadata and prev/next nav. */
export const componentBySlug: Record<string, ComponentMeta & { group: string }> =
	Object.fromEntries(
		componentGroups.flatMap((g) => g.items.map((it) => [it.slug, { ...it, group: g.label }]))
	);

export const totalComponents = componentGroups.reduce((n, g) => n + g.items.length, 0);

/** Components with a live page — the count shown in the index headline. */
export const readyComponents = componentGroups.reduce(
	(n, g) => n + g.items.filter((it) => it.ready).length,
	0
);
