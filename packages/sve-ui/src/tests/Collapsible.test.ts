import { describe, it, expect } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/svelte';
import CollapsibleFixture from './CollapsibleFixture.svelte';

describe('Collapsible', () => {
  it('renders a trigger button', () => {
    const { getByRole } = render(CollapsibleFixture, { props: {} });
    expect(getByRole('button', { name: 'Show details' })).toBeTruthy();
  });

  it('applies the root and trigger base classes', () => {
    const { container, getByRole } = render(CollapsibleFixture, { props: {} });
    expect(container.querySelector('.sve-collapsible')).not.toBeNull();
    expect(
      getByRole('button', { name: 'Show details' }).classList.contains('sve-collapsible__trigger')
    ).toBe(true);
  });

  it('starts closed and reports it via aria-expanded (Bits UI a11y)', () => {
    const { getByRole } = render(CollapsibleFixture, { props: {} });
    expect(getByRole('button', { name: 'Show details' }).getAttribute('aria-expanded')).toBe(
      'false'
    );
  });

  it('opens on click, revealing the panel and reflecting via bind:open', async () => {
    const { getByRole, getByTestId, getByText } = render(CollapsibleFixture, { props: {} });
    await fireEvent.click(getByRole('button', { name: 'Show details' }));

    await waitFor(() => {
      expect(getByRole('button', { name: 'Show details' }).getAttribute('aria-expanded')).toBe(
        'true'
      );
      expect(getByText('Panel body content.')).toBeTruthy();
      expect(getByTestId('open').textContent).toBe('true');
    });
  });

  it('closes again on a second click', async () => {
    const { getByRole, getByTestId } = render(CollapsibleFixture, { props: {} });
    const trigger = getByRole('button', { name: 'Show details' });

    await fireEvent.click(trigger);
    await waitFor(() => expect(getByTestId('open').textContent).toBe('true'));

    await fireEvent.click(trigger);
    await waitFor(() => {
      expect(getByTestId('open').textContent).toBe('false');
      expect(trigger.getAttribute('aria-expanded')).toBe('false');
    });
  });

  it('points the trigger at the panel it controls', async () => {
    const { getByRole, container } = render(CollapsibleFixture, { props: {} });
    const trigger = getByRole('button', { name: 'Show details' });
    await fireEvent.click(trigger);

    await waitFor(() => {
      const controls = trigger.getAttribute('aria-controls');
      expect(controls).toBeTruthy();
      expect(container.querySelector(`#${controls}`)).not.toBeNull();
    });
  });
});
