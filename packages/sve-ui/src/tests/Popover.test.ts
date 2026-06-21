/**
 * Popover component tests — Wave 2 overlay components.
 *
 * jsdom limitations noted inline:
 * - Positioning: Bits UI uses floating-ui for popover positioning which requires
 *   real layout. Positioning assertions are e2e concerns.
 * - Arrow rendering: arrow positioning depends on floating-ui layout calculations.
 *   Arrow e2e assertions are a Playwright concern.
 * - Portal: Bits UI portals content to document.body. @testing-library/svelte
 *   queries search the full document, so portal content IS reachable.
 */

import { describe, it, expect } from 'vitest';
import { render, fireEvent, screen, waitFor } from '@testing-library/svelte';
import PopoverFixture from './PopoverFixture.svelte';

describe('Popover', () => {
  it('renders trigger without error', () => {
    render(PopoverFixture);
    const trigger = screen.getByRole('button', { name: 'Open popover' });
    expect(trigger).toBeTruthy();
  });

  it('popover content is NOT in the DOM before trigger click', () => {
    render(PopoverFixture);
    expect(screen.queryByText('Popover content')).toBeNull();
  });

  it('after trigger click, content appears with text "Popover content"', async () => {
    render(PopoverFixture);
    const trigger = screen.getByRole('button', { name: 'Open popover' });
    await fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByText('Popover content')).toBeTruthy();
    });
  });

  it('close button is rendered inside when open', async () => {
    render(PopoverFixture);
    const trigger = screen.getByRole('button', { name: 'Open popover' });
    await fireEvent.click(trigger);

    await waitFor(() => {
      const closeButton = screen.getByRole('button', { name: 'Close' });
      expect(closeButton).toBeTruthy();
    });
  });

  it('Escape key closes the popover', async () => {
    render(PopoverFixture);
    const trigger = screen.getByRole('button', { name: 'Open popover' });
    await fireEvent.click(trigger);

    await waitFor(() => expect(screen.getByText('Popover content')).toBeTruthy());

    await fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });

    await waitFor(() => {
      expect(screen.queryByText('Popover content')).toBeNull();
    });
  });

  it.todo('popover positioning relative to trigger (needs Playwright e2e)');
  it.todo('arrow rendering and positioning (needs Playwright e2e)');
});
