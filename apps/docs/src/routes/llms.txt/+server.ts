import { componentGroups } from '$lib/docs/registry';
import { guideGroups } from '$lib/docs/guides';

/**
 * /llms.txt — an llmstxt.org index for AI agents, generated from the component
 * registry and guide nav so it never drifts from the real catalog.
 */
export const prerender = true;

const SITE = 'https://sveui.org';

export function GET() {
	const docs = guideGroups
		.flatMap((g) => g.items.map((it) => `- [${it.name}](${SITE}${it.href})`))
		.join('\n');

	const components = componentGroups
		.map((g) => {
			const items = g.items
				.filter((it) => it.ready)
				.map((it) => `- [${it.name}](${SITE}/components/${it.slug}): ${it.blurb}`)
				.join('\n');
			return items ? `### ${g.label}\n${items}` : '';
		})
		.filter(Boolean)
		.join('\n\n');

	const soon = componentGroups
		.flatMap((g) => g.items.filter((it) => !it.ready).map((it) => it.name))
		.join(', ');

	const body = `# sve-ui

> Styled, accessible Svelte 5 components built on Bits UI. No Tailwind and no config in the consumer project: install, import the stylesheet once, and theme with CSS variables. Light and dark out of the box.

## Usage rules

- Install with \`pnpm add sve-ui\`. Import \`sve-ui/theme.css\` ONCE at the app root; without it components render unstyled. The consumer project needs no Tailwind and no config.
- Single components are default imports: \`Button, Input, Badge, Spinner, Text, Heading, Slider, Code\`.
- Composite components are namespaces composed with dots: \`Dialog.*, Select.*, Combobox.*, Card.*, Alert.*, Tabs.*, Accordion.*, Avatar.*, DropdownMenu.*, Popover.*, Tooltip.*, Switch.*, Checkbox.*, RadioGroup.*\`.
- Overlays (Dialog/DropdownMenu/Popover/Tooltip/Select/Combobox) portal to <body>. Mirror the theme class (\`dark\`/\`light\`) onto <body> so portaled content gets the right --sve-* tokens.
- Use a custom element as an overlay trigger via the Bits \`child\` snippet: \`<Dialog.Trigger>{#snippet child({ props })}<Button {...props}>Open</Button>{/snippet}</Dialog.Trigger>\`.
- Theme by overriding \`--sve-*\` CSS variables. Do not put Tailwind layout/margin utilities on sve-ui components; scoped styles win, so wrap them in a <div> instead.
- \`Slider\` uses \`value\` + \`onValueChange\` (not bind:value) and \`thumbLabel\` for an accessible name. \`Switch\`/\`Checkbox\` need \`aria-label\` when unlabelled. \`Tooltip\` requires a \`Tooltip.Provider\` ancestor.

## Docs

${docs}

## Components

${components}

## Optional

- [GitHub repository](https://github.com/rodriabregu/sve-ui): source, issues, and the sve-ui-usage agent skill at \`skills/sve-ui-usage/\`.
- [npm package](https://www.npmjs.com/package/sve-ui)
- Coming soon: ${soon}.
`;

	return new Response(body, {
		headers: { 'content-type': 'text/plain; charset=utf-8' }
	});
}
