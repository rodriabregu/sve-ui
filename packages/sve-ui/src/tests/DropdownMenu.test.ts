/**
 * DropdownMenu component tests — Wave 2 overlay components.
 *
 * jsdom limitations noted inline:
 * - Pointer/hover events: bits-ui uses real pointer event tracking for highlighted state.
 *   jsdom does not fully simulate pointer movement, so hover-highlight assertions are e2e.
 * - Keyboard navigation cycling: Tab/ArrowUp/ArrowDown focus cycling is Bits UI's domain.
 *   Full keyboard navigation is covered by Bits UI's own suite + e2e tests.
 * - Portal: Bits UI portals content to document.body. @testing-library/svelte
 *   queries search the full document, so portal content IS reachable.
 */

import { describe, it, expect } from 'vitest';
import { render, fireEvent, screen, waitFor } from '@testing-library/svelte';
import DropdownMenuFixture from './DropdownMenuFixture.svelte';

describe('DropdownMenu', () => {
  it('renders trigger without error', () => {
    render(DropdownMenuFixture);
    const trigger = screen.getByRole('button', { name: 'Open menu' });
    expect(trigger).toBeTruthy();
  });

  it('menu content is NOT in the DOM before trigger click', () => {
    render(DropdownMenuFixture);
    expect(screen.queryByRole('menu')).toBeNull();
  });

  it('after trigger click, menu content appears with role="menu"', async () => {
    render(DropdownMenuFixture);
    const trigger = screen.getByRole('button', { name: 'Open menu' });
    await fireEvent.click(trigger);

    await waitFor(() => {
      const menu = screen.getByRole('menu');
      expect(menu).toBeTruthy();
    });
  });

  it('after trigger click, items render', async () => {
    render(DropdownMenuFixture);
    const trigger = screen.getByRole('button', { name: 'Open menu' });
    await fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByText('Edit')).toBeTruthy();
      expect(screen.getByText('Delete')).toBeTruthy();
    });
  });

  it('Escape key closes the menu', async () => {
    render(DropdownMenuFixture);
    const trigger = screen.getByRole('button', { name: 'Open menu' });
    await fireEvent.click(trigger);

    await waitFor(() => expect(screen.getByRole('menu')).toBeTruthy());

    await fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });

    await waitFor(() => {
      expect(screen.queryByRole('menu')).toBeNull();
    });
  });

  it('separator is rendered in the menu when open', async () => {
    // bits-ui renders the Separator as role="group" (not role="separator") in jsdom.
    // We verify it exists via its data attribute which bits-ui always sets.
    render(DropdownMenuFixture);
    const trigger = screen.getByRole('button', { name: 'Open menu' });
    await fireEvent.click(trigger);

    await waitFor(() => {
      const separator = document.querySelector('[data-dropdown-menu-separator]');
      expect(separator).toBeTruthy();
    });
  });

  it.todo('pointer/hover-dependent highlighted item state (needs Playwright e2e)');
  it.todo('keyboard navigation cycling with ArrowUp/ArrowDown (needs Playwright e2e)');
});
