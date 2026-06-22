/**
 * Guide navigation for the /docs section. Mirrors the registry pattern used for
 * components, but guides are hand-authored pages (no slug → component mapping).
 */

export interface GuideNavItem {
	name: string;
	href: string;
}

export interface GuideNavGroup {
	label: string;
	items: GuideNavItem[];
}

export const guideGroups: GuideNavGroup[] = [
	{
		label: 'Getting started',
		items: [
			{ name: 'Introduction', href: '/docs' },
			{ name: 'Installation', href: '/docs/installation' }
		]
	},
	{
		label: 'Guides',
		items: [
			{ name: 'Theming', href: '/docs/theming' },
			{ name: 'AI & Agents', href: '/docs/ai-agents' }
		]
	}
];
