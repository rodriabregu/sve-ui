import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import SelectFixture from './SelectFixture.svelte';

// jsdom limitation: Bits UI Select opens via pointer events + floating-ui
// positioning that jsdom does not simulate, so opening the listbox and picking
// an option is an e2e concern (Playwright). Here we assert the structural and
// a11y invariants that DO hold in jsdom.
// TODO(phase-e2e): open + select-option coverage in Playwright.

describe('Select', () => {
  it('renders a styled trigger', () => {
    const { container } = render(SelectFixture, { props: {} });
    const trigger = container.querySelector('[data-slot="select-trigger"]');
    expect(trigger).not.toBeNull();
    expect(trigger?.classList.contains('sve-select__trigger')).toBe(true);
  });

  it('trigger exposes listbox popup semantics, collapsed by default', () => {
    const { getByRole } = render(SelectFixture, { props: {} });
    const trigger = getByRole('button', { name: 'Pick a fruit' });
    expect(trigger.getAttribute('aria-haspopup')).toBe('listbox');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });

  it('is closed initially (no options rendered)', () => {
    const { queryByText } = render(SelectFixture, { props: {} });
    expect(queryByText('Apple')).toBeNull();
    expect(queryByText('Banana')).toBeNull();
  });
});
