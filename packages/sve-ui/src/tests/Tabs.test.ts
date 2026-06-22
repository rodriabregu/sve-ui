import { describe, it, expect } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/svelte';
import TabsFixture from './TabsFixture.svelte';

describe('Tabs', () => {
  it('renders a tablist with two tabs (Bits UI a11y)', () => {
    const { getByRole, getAllByRole } = render(TabsFixture, { props: {} });
    expect(getByRole('tablist')).toBeTruthy();
    expect(getAllByRole('tab')).toHaveLength(2);
  });

  it('shows the default tab content and marks its trigger active', () => {
    const { getByText, getByRole } = render(TabsFixture, { props: {} });
    expect(getByText('Account panel')).toBeTruthy();
    expect(getByRole('tab', { name: 'Account' }).getAttribute('data-state')).toBe('active');
  });

  it('switches tab on click and reflects via bind:value', async () => {
    const { getByRole, getByTestId, getByText } = render(TabsFixture, { props: {} });
    await fireEvent.click(getByRole('tab', { name: 'Password' }));

    await waitFor(() => {
      expect(getByRole('tab', { name: 'Password' }).getAttribute('data-state')).toBe('active');
      expect(getByText('Password panel')).toBeTruthy();
      expect(getByTestId('value').textContent).toBe('password');
    });
  });
});
