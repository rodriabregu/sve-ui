import { describe, it, expect } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/svelte';
import SheetFixture from './SheetFixture.svelte';

describe('Sheet', () => {
  it('renders only the trigger while closed', () => {
    const { getByRole, queryByRole } = render(SheetFixture, { props: {} });
    expect(getByRole('button', { name: 'Open filters' })).toBeTruthy();
    expect(queryByRole('dialog')).toBeNull();
  });

  it('opens as a dialog — it composes Dialog rather than reimplementing it', async () => {
    const { getByRole } = render(SheetFixture, { props: {} });
    await fireEvent.click(getByRole('button', { name: 'Open filters' }));
    await waitFor(() => expect(getByRole('dialog', { name: 'Filters' })).toBeTruthy());
  });

  it('defaults to the right side at md size', async () => {
    const { getByRole, baseElement } = render(SheetFixture, { props: {} });
    await fireEvent.click(getByRole('button', { name: 'Open filters' }));

    await waitFor(() => {
      const panel = baseElement.querySelector('.sve-sheet') as HTMLElement;
      expect(panel.classList.contains('sve-sheet--right')).toBe(true);
      expect(panel.classList.contains('sve-sheet--md')).toBe(true);
      expect(panel.dataset.side).toBe('right');
    });
  });

  it('applies the left side', async () => {
    const { getByRole, baseElement } = render(SheetFixture, { props: { side: 'left' as const } });
    await fireEvent.click(getByRole('button', { name: 'Open filters' }));
    await waitFor(() =>
      expect(baseElement.querySelector('.sve-sheet--left')).not.toBeNull()
    );
  });

  it('applies the bottom side', async () => {
    const { getByRole, baseElement } = render(SheetFixture, { props: { side: 'bottom' as const } });
    await fireEvent.click(getByRole('button', { name: 'Open filters' }));
    await waitFor(() =>
      expect(baseElement.querySelector('.sve-sheet--bottom')).not.toBeNull()
    );
  });

  it('applies the lg size', async () => {
    const { getByRole, baseElement } = render(SheetFixture, { props: { size: 'lg' as const } });
    await fireEvent.click(getByRole('button', { name: 'Open filters' }));
    await waitFor(() => expect(baseElement.querySelector('.sve-sheet--lg')).not.toBeNull());
  });

  it('renders the backdrop', async () => {
    const { getByRole, baseElement } = render(SheetFixture, { props: {} });
    await fireEvent.click(getByRole('button', { name: 'Open filters' }));
    await waitFor(() =>
      expect(baseElement.querySelector('.sve-sheet-overlay')).not.toBeNull()
    );
  });

  it('closes via the Close part', async () => {
    const { getByRole, getByTestId } = render(SheetFixture, { props: {} });
    await fireEvent.click(getByRole('button', { name: 'Open filters' }));
    await waitFor(() => expect(getByTestId('open').textContent).toBe('true'));

    await fireEvent.click(getByRole('button', { name: 'Done' }));
    await waitFor(() => expect(getByTestId('open').textContent).toBe('false'));
  });
});
