import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import RadioGroupFixture from './RadioGroupFixture.svelte';

describe('RadioGroup', () => {
  it('renders a radiogroup with two radio items', () => {
    const { container, getAllByRole } = render(RadioGroupFixture, { props: {} });
    expect(container.querySelector('[data-slot="radio-group"]')?.classList.contains('sve-radio-group')).toBe(true);
    expect(getAllByRole('radio')).toHaveLength(2);
  });

  it('has no selection initially (no dot indicator)', () => {
    const { container, getByTestId } = render(RadioGroupFixture, { props: {} });
    expect(container.querySelector('.sve-radio__dot')).toBeNull();
    expect(getByTestId('value').textContent).toBe('');
  });

  it('selects an item on click and reflects via bind:value', async () => {
    const { getAllByRole, getByTestId, container } = render(RadioGroupFixture, { props: {} });
    const [first, second] = getAllByRole('radio');

    await fireEvent.click(first);
    expect(first.getAttribute('data-state')).toBe('checked');
    expect(getByTestId('value').textContent).toBe('a');
    expect(container.querySelectorAll('.sve-radio__dot')).toHaveLength(1);

    await fireEvent.click(second);
    expect(second.getAttribute('data-state')).toBe('checked');
    expect(first.getAttribute('data-state')).toBe('unchecked');
    expect(getByTestId('value').textContent).toBe('b');
  });
});
