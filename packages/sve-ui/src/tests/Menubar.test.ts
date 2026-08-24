import { describe, it, expect } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/svelte';
import MenubarFixture from './MenubarFixture.svelte';

/**
 * Bits' menubar trigger opens on the KEYBOARD path in jsdom; its pointer path
 * relies on real PointerEvent details that jsdom's synthetic events do not
 * satisfy. Asserting the keyboard path is no loss here — keyboard support is
 * the entire reason to use a menubar over a row of dropdowns. Pointer
 * interaction is left as an e2e todo, matching the DropdownMenu convention.
 */
describe('Menubar', () => {
	it('exposes role="menubar" with an accessible name', () => {
		const { getByRole } = render(MenubarFixture, { props: {} });
		expect(getByRole('menubar', { name: 'Main' })).toBeTruthy();
	});

	it('renders one trigger per menu', () => {
		const { getByRole } = render(MenubarFixture, { props: {} });
		expect(getByRole('menuitem', { name: 'File' })).toBeTruthy();
		expect(getByRole('menuitem', { name: 'Edit' })).toBeTruthy();
	});

	it('keeps the panels out of the DOM until a trigger is used', () => {
		const { baseElement } = render(MenubarFixture, { props: {} });
		expect(baseElement.querySelector('.sve-menubar__content')).toBeNull();
	});

	it('opens a menu from the keyboard and marks its trigger open', async () => {
		const { getByRole, baseElement } = render(MenubarFixture, { props: {} });
		await fireEvent.keyDown(getByRole('menuitem', { name: 'File' }), { key: 'Enter' });

		await waitFor(() => {
			expect(baseElement.querySelector('.sve-menubar__content')).not.toBeNull();
			expect(getByRole('menuitem', { name: 'File' }).getAttribute('data-state')).toBe('open');
		});
	});

	it('reuses the SHARED menu parts, wired to the menubar context', async () => {
		const { getByRole, baseElement } = render(MenubarFixture, { props: {} });
		await fireEvent.keyDown(getByRole('menuitem', { name: 'File' }), { key: 'Enter' });

		await waitFor(() => {
			// Same styled components DropdownMenu and ContextMenu use.
			expect(baseElement.querySelectorAll('.sve-menu-item').length).toBe(3);
			expect(baseElement.querySelector('.sve-menu-label')?.textContent?.trim()).toBe('Document');
			// Bits derives the attribute from the surrounding Root, so this proves the
			// shared wrapper picked up the MENUBAR context, not another menu's.
			expect(baseElement.querySelector('[data-menubar-item]')).not.toBeNull();
			expect(baseElement.querySelector('[data-dropdown-menu-item]')).toBeNull();
			expect(baseElement.querySelector('[data-context-menu-item]')).toBeNull();
		});
	});

	it('closes on Escape', async () => {
		const { getByRole, baseElement } = render(MenubarFixture, { props: {} });
		await fireEvent.keyDown(getByRole('menuitem', { name: 'File' }), { key: 'Enter' });
		await waitFor(() => expect(baseElement.querySelector('.sve-menubar__content')).not.toBeNull());

		await fireEvent.keyDown(document.activeElement ?? document.body, { key: 'Escape' });
		await waitFor(() => expect(baseElement.querySelector('.sve-menubar__content')).toBeNull());
	});

	it('wires aria-haspopup and aria-expanded on each trigger', () => {
		const { getByRole } = render(MenubarFixture, { props: {} });
		const file = getByRole('menuitem', { name: 'File' });
		expect(file.getAttribute('aria-haspopup')).toBe('menu');
		expect(file.getAttribute('aria-expanded')).toBe('false');
	});

	it.todo('opening by pointer, and hovering a sibling to switch menus (needs Playwright e2e)');
});
