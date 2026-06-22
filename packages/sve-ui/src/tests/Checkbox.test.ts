import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import CheckboxFixture from './CheckboxFixture.svelte';

describe('Checkbox', () => {
  it('renders a checkbox with the base class', () => {
    const { container } = render(CheckboxFixture, { props: {} });
    const el = container.querySelector('[data-slot="checkbox"]');
    expect(el).not.toBeNull();
    expect(el?.classList.contains('sve-checkbox')).toBe(true);
  });

  it('applies md size by default and sm when requested', () => {
    const { container: a } = render(CheckboxFixture, { props: {} });
    expect(a.querySelector('[data-slot="checkbox"]')?.classList.contains('sve-checkbox--md')).toBe(true);
    const { container: b } = render(CheckboxFixture, { props: { size: 'sm' as const } });
    expect(b.querySelector('[data-slot="checkbox"]')?.classList.contains('sve-checkbox--sm')).toBe(true);
  });

  it('exposes role="checkbox" (Bits UI a11y)', () => {
    const { getByRole } = render(CheckboxFixture, { props: {} });
    expect(getByRole('checkbox')).toBeTruthy();
  });

  it('is unchecked with no indicator initially', () => {
    const { container, getByTestId } = render(CheckboxFixture, { props: {} });
    const el = container.querySelector('[data-slot="checkbox"]');
    expect(el?.getAttribute('data-state')).toBe('unchecked');
    expect(container.querySelector('.sve-checkbox__icon')).toBeNull();
    expect(getByTestId('state').textContent).toBe('false');
  });

  it('checks on click, shows the indicator, and reflects via bind:checked', async () => {
    const { getByRole, getByTestId, container } = render(CheckboxFixture, { props: {} });
    const el = getByRole('checkbox');
    await fireEvent.click(el);
    expect(el.getAttribute('data-state')).toBe('checked');
    expect(container.querySelector('.sve-checkbox__icon')).not.toBeNull();
    expect(getByTestId('state').textContent).toBe('true');
  });
});
