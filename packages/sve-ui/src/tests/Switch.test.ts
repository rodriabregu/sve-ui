import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import SwitchFixture from './SwitchFixture.svelte';

describe('Switch', () => {
  it('renders a switch with the base class', () => {
    const { container } = render(SwitchFixture, { props: {} });
    const el = container.querySelector('[data-slot="switch"]');
    expect(el).not.toBeNull();
    expect(el?.classList.contains('sve-switch')).toBe(true);
  });

  it('applies md size by default', () => {
    const { container } = render(SwitchFixture, { props: {} });
    const el = container.querySelector('[data-slot="switch"]');
    expect(el?.classList.contains('sve-switch--md')).toBe(true);
  });

  it('applies the sm size', () => {
    const { container } = render(SwitchFixture, { props: { size: 'sm' as const } });
    const el = container.querySelector('[data-slot="switch"]');
    expect(el?.classList.contains('sve-switch--sm')).toBe(true);
  });

  it('exposes role="switch" (Bits UI a11y)', () => {
    const { getByRole } = render(SwitchFixture, { props: {} });
    expect(getByRole('switch')).toBeTruthy();
  });

  it('is unchecked initially', () => {
    const { container, getByTestId } = render(SwitchFixture, { props: {} });
    const el = container.querySelector('[data-slot="switch"]');
    expect(el?.getAttribute('data-state')).toBe('unchecked');
    expect(getByTestId('state').textContent).toBe('false');
  });

  it('toggles checked on click and reflects via bind:checked', async () => {
    const { getByRole, getByTestId } = render(SwitchFixture, { props: {} });
    const el = getByRole('switch');
    await fireEvent.click(el);
    expect(el.getAttribute('data-state')).toBe('checked');
    expect(getByTestId('state').textContent).toBe('true');
  });
});
