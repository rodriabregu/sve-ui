import { describe, it, expect } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/svelte';
import SidebarFixture from './SidebarFixture.svelte';
import SidebarItem from '$lib/components/Sidebar/SidebarItem.svelte';

/**
 * Custom rather than a Bits wrapper, so every semantic here is ours to get right
 * — which is exactly why the tests assert semantics over classes.
 */
describe('Sidebar', () => {
	it('is a named complementary landmark', () => {
		const { getByRole } = render(SidebarFixture, { props: {} });
		// An app shell usually has more than one complementary region, so the name
		// is what tells them apart.
		expect(getByRole('complementary', { name: 'Main navigation' })).toBeTruthy();
	});

	it('renders the items as a real list', () => {
		const { getByRole, getAllByRole } = render(SidebarFixture, { props: {} });
		expect(getByRole('list')).toBeTruthy();
		expect(getAllByRole('listitem').length).toBe(3);
	});

	it('keeps items as real anchors, so middle-click still works', () => {
		const { getByRole } = render(SidebarFixture, { props: {} });
		const link = getByRole('link', { name: 'Projects' });
		expect(link.tagName).toBe('A');
		expect(link.getAttribute('href')).toBe('/projects');
	});

	it('marks the active item with aria-current="page"', () => {
		const { getByRole } = render(SidebarFixture, { props: {} });
		// Not just a highlight — styling alone tells sighted users and nobody else.
		expect(getByRole('link', { name: 'Dashboard' }).getAttribute('aria-current')).toBe('page');
		expect(getByRole('link', { name: 'Projects' }).getAttribute('aria-current')).toBeNull();
	});

	it('names the group from its GroupLabel', () => {
		const { getByRole } = render(SidebarFixture, { props: {} });
		expect(getByRole('group', { name: 'Platform' })).toBeTruthy();
	});

	it('wires the Trigger to the sidebar it controls, from outside it', () => {
		const { getByRole, container } = render(SidebarFixture, { props: {} });
		const trigger = getByRole('button', { name: 'Toggle sidebar' });
		expect(trigger.getAttribute('aria-expanded')).toBe('true');
		// It lives outside the aside, so it reads the id from context.
		expect(trigger.getAttribute('aria-controls')).toBe('test-sidebar');
		expect(container.querySelector('#test-sidebar')?.contains(trigger)).toBe(false);
	});

	// The context is passed as GETTERS so the parts stay reactive. A plain
	// snapshot would freeze at mount, and every test below would still pass on
	// first render — which is precisely why toggling is asserted.
	it('toggles the shared state, and the parts follow', async () => {
		const { getByRole, getByTestId, container } = render(SidebarFixture, { props: {} });
		const trigger = getByRole('button', { name: 'Toggle sidebar' });

		await fireEvent.click(trigger);

		await waitFor(() => {
			expect(getByTestId('collapsed').textContent).toBe('true');
			expect(trigger.getAttribute('aria-expanded')).toBe('false');
			expect(container.querySelector('.sve-sidebar--collapsed')).not.toBeNull();
		});
	});

	it('keeps the Trigger label stable across states', async () => {
		const { getByRole } = render(SidebarFixture, { props: {} });
		const trigger = getByRole('button', { name: 'Toggle sidebar' });
		await fireEvent.click(trigger);
		// aria-expanded already carries the state; a label that flips to "Close"
		// says it twice and contradicts itself mid-announcement.
		await waitFor(() => expect(trigger.getAttribute('aria-expanded')).toBe('false'));
		expect(trigger.getAttribute('aria-label')).toBe('Toggle sidebar');
	});

	it('gives collapsed icon-rail items their accessible name from `label`', () => {
		const { getByRole } = render(SidebarFixture, { props: { startCollapsed: true } });
		// The visible text is clipped on a rail, so without this the sidebar is a
		// column of unnamed links.
		const link = getByRole('link', { name: 'Settings' });
		expect(link.getAttribute('aria-label')).toBe('Settings');
		expect(link.getAttribute('title')).toBe('Settings');
	});

	it('does NOT set aria-label while expanded — the text already names it', () => {
		const { getByRole } = render(SidebarFixture, { props: {} });
		expect(getByRole('link', { name: 'Settings' }).getAttribute('aria-label')).toBeNull();
	});

	it('keeps the collapsed GroupLabel in the accessibility tree', () => {
		const { getByRole, container } = render(SidebarFixture, {
			props: { startCollapsed: true }
		});
		// Visually hidden, not removed: display:none would strip the group's name.
		expect(container.querySelector('.sve-visually-hidden')).not.toBeNull();
		expect(getByRole('group', { name: 'Platform' })).toBeTruthy();
	});

	it('applies the collapsible mode as a class, with no JS media query', () => {
		const off = render(SidebarFixture, { props: { collapsible: 'offcanvas' as const } });
		expect(off.container.querySelector('.sve-sidebar--offcanvas')).not.toBeNull();
		const none = render(SidebarFixture, { props: { collapsible: 'none' as const } });
		expect(none.container.querySelector('.sve-sidebar--none')).not.toBeNull();
	});

	it('renders an Item outside a Root without throwing', () => {
		// The context getter returns undefined rather than throwing, so a part
		// rendered in isolation still works.
		const { container } = render(SidebarItem, { props: { href: '/x' } as never });
		expect(container.querySelector('.sve-sidebar__item')).not.toBeNull();
	});
});
