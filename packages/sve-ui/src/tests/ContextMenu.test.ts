import { describe, it, expect } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/svelte';
import ContextMenuFixture from './ContextMenuFixture.svelte';

/**
 * The interesting property here is that Item, Group, Label and Separator are
 * the SAME styled components DropdownMenu uses — Bits re-exports identical
 * `menu/components/*` modules to both namespaces. Bits derives its data
 * attributes from the surrounding Root, so the shared wrapper must emit
 * `data-context-menu-*` here. That is asserted below: if the sharing ever broke
 * the context wiring, these fail.
 */
describe('ContextMenu', () => {
	it('renders the trigger region', () => {
		const { container } = render(ContextMenuFixture, { props: {} });
		const trigger = container.querySelector('[data-slot="context-menu-trigger"]');
		expect(trigger).not.toBeNull();
		expect(trigger?.textContent?.trim()).toBe('Right-click this row');
	});

	it('keeps the menu out of the DOM until right-click', () => {
		const { baseElement } = render(ContextMenuFixture, { props: {} });
		expect(baseElement.querySelector('.sve-context-menu-content')).toBeNull();
	});

	it('opens with role="menu" on right-click', async () => {
		const { container, getByRole } = render(ContextMenuFixture, { props: {} });
		const trigger = container.querySelector('[data-slot="context-menu-trigger"]') as HTMLElement;
		await fireEvent.contextMenu(trigger);
		await waitFor(() => expect(getByRole('menu')).toBeTruthy());
	});

	it('renders the styled panel', async () => {
		const { container, baseElement } = render(ContextMenuFixture, { props: {} });
		const trigger = container.querySelector('[data-slot="context-menu-trigger"]') as HTMLElement;
		await fireEvent.contextMenu(trigger);
		await waitFor(() =>
			expect(baseElement.querySelector('.sve-context-menu-content')).not.toBeNull()
		);
	});

	it('renders the items with the shared menu styling', async () => {
		const { container, baseElement } = render(ContextMenuFixture, { props: {} });
		const trigger = container.querySelector('[data-slot="context-menu-trigger"]') as HTMLElement;
		await fireEvent.contextMenu(trigger);

		await waitFor(() => {
			const items = baseElement.querySelectorAll('.sve-menu-item');
			expect(items.length).toBe(3);
		});
	});

	it('wires the shared parts to the CONTEXT menu root, not the dropdown root', async () => {
		const { container, baseElement } = render(ContextMenuFixture, { props: {} });
		const trigger = container.querySelector('[data-slot="context-menu-trigger"]') as HTMLElement;
		await fireEvent.contextMenu(trigger);

		await waitFor(() => {
			// Bits derives this attribute from the surrounding Root, so the shared
			// wrapper proves it picked up the ContextMenu context.
			expect(baseElement.querySelector('[data-context-menu-item]')).not.toBeNull();
			expect(baseElement.querySelector('[data-context-menu-separator]')).not.toBeNull();
			expect(baseElement.querySelector('[data-dropdown-menu-item]')).toBeNull();
		});
	});

	it('renders the group heading that names the group', async () => {
		const { container, baseElement } = render(ContextMenuFixture, { props: {} });
		const trigger = container.querySelector('[data-slot="context-menu-trigger"]') as HTMLElement;
		await fireEvent.contextMenu(trigger);

		await waitFor(() => {
			const label = baseElement.querySelector('.sve-menu-label');
			expect(label?.textContent?.trim()).toBe('Actions');
		});
	});

	it('closes on Escape', async () => {
		const { container, baseElement } = render(ContextMenuFixture, { props: {} });
		const trigger = container.querySelector('[data-slot="context-menu-trigger"]') as HTMLElement;
		await fireEvent.contextMenu(trigger);
		await waitFor(() => expect(baseElement.querySelector('[role="menu"]')).not.toBeNull());

		await fireEvent.keyDown(document.activeElement ?? document.body, { key: 'Escape' });
		await waitFor(() => expect(baseElement.querySelector('[role="menu"]')).toBeNull());
	});
});
