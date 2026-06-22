import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import ComboboxFixture from './ComboboxFixture.svelte';

describe('Combobox', () => {
  it('renders a styled input', () => {
    const { container } = render(ComboboxFixture, { props: {} });
    const input = container.querySelector('[data-slot="combobox-input"]');
    expect(input).not.toBeNull();
    expect(input?.classList.contains('sve-combobox__input')).toBe(true);
  });

  it('forwards input attributes (placeholder)', () => {
    const { container } = render(ComboboxFixture, { props: {} });
    const input = container.querySelector('[data-slot="combobox-input"]') as HTMLInputElement;
    expect(input.placeholder).toBe('Search fruit…');
  });

  it('is closed initially (no options rendered)', () => {
    const { queryByText } = render(ComboboxFixture, { props: {} });
    expect(queryByText('Apple')).toBeNull();
  });
});
