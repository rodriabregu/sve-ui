/**
 * Tooltip component tests — Wave 2 overlay components.
 *
 * jsdom limitations noted inline:
 * - Hover to open: bits-ui uses pointer events and timers to show/hide tooltips.
 *   jsdom does not fully simulate pointer movement, so hover-open assertions are e2e.
 * - Keyboard focus-to-open: focus + delay timing is managed by Bits UI internals.
 *   Full focus-triggered tooltip behavior is a Playwright e2e concern.
 * - Portal: Bits UI portals content to document.body. @testing-library/svelte
 *   queries search the full document, so portal content IS reachable when open.
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import TooltipFixture from './TooltipFixture.svelte';

describe('Tooltip', () => {
  it('renders trigger without error', () => {
    render(TooltipFixture);
    expect(screen.getByText('Hover me')).toBeTruthy();
  });

  it('tooltip content is NOT visible before hover', () => {
    render(TooltipFixture);
    // Tooltip is hidden until pointer hover/focus — content not in DOM
    expect(screen.queryByRole('tooltip')).toBeNull();
    expect(screen.queryByText('Tooltip text')).toBeNull();
  });

  it('provider + root + trigger render without throwing', () => {
    // Structural smoke test: the full component tree initializes without errors
    expect(() => render(TooltipFixture)).not.toThrow();
  });

  it.todo('hover trigger to open tooltip (pointer events — needs Playwright e2e)');
  it.todo('focus trigger with keyboard to open tooltip (needs Playwright e2e)');
  it.todo('tooltip has role="tooltip" when open (needs Playwright e2e for hover trigger)');
});
