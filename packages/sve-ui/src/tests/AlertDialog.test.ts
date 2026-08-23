import { describe, it, expect } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/svelte';
import AlertDialogFixture from './AlertDialogFixture.svelte';

/**
 * The point of AlertDialog over Dialog is behavioural, so that is what these
 * assert: the alertdialog role, a name wired from Title, and the fact that a
 * destructive choice cannot be resolved by a stray backdrop click.
 */
describe('AlertDialog', () => {
  it('renders only the trigger while closed', () => {
    const { getByRole, queryByRole } = render(AlertDialogFixture, { props: {} });
    expect(getByRole('button', { name: 'Delete project' })).toBeTruthy();
    expect(queryByRole('alertdialog')).toBeNull();
  });

  it('opens with role="alertdialog", not dialog', async () => {
    const { getByRole } = render(AlertDialogFixture, { props: {} });
    await fireEvent.click(getByRole('button', { name: 'Delete project' }));
    await waitFor(() => expect(getByRole('alertdialog')).toBeTruthy());
  });

  it('takes its accessible name from Title', async () => {
    const { getByRole } = render(AlertDialogFixture, { props: {} });
    await fireEvent.click(getByRole('button', { name: 'Delete project' }));
    await waitFor(() =>
      expect(getByRole('alertdialog', { name: /Delete this project/ })).toBeTruthy()
    );
  });

  it('renders the styled panel and backdrop', async () => {
    const { getByRole, baseElement } = render(AlertDialogFixture, { props: {} });
    await fireEvent.click(getByRole('button', { name: 'Delete project' }));

    await waitFor(() => {
      expect(baseElement.querySelector('.sve-alert-dialog-content')).not.toBeNull();
      expect(baseElement.querySelector('.sve-alert-dialog-overlay')).not.toBeNull();
    });
  });

  it('offers both a cancel and an action button', async () => {
    const { getByRole, baseElement } = render(AlertDialogFixture, { props: {} });
    await fireEvent.click(getByRole('button', { name: 'Delete project' }));

    await waitFor(() => {
      expect(getByRole('button', { name: 'Keep project' })).toBeTruthy();
      // Queried by slot, not by name: the trigger and the action deliberately
      // share the label "Delete project", which is realistic.
      const action = baseElement.querySelector('[data-slot="alert-dialog-action"]');
      expect(action?.textContent?.trim()).toBe('Delete project');
    });
  });

  // Verified against the Bits source: AlertDialogCancelState has an onclick that
  // calls handleClose(), DialogActionState has no onclick at all. So Cancel
  // closes and Action does NOT — deliberately, because the destructive operation
  // may be async and may fail, and closing is the consumer's call. These two
  // tests pin that contract down so a wrapper change cannot silently break it.
  it('runs the action handler but does NOT close on its own', async () => {
    const { getByRole, getByTestId, baseElement } = render(AlertDialogFixture, { props: {} });
    await fireEvent.click(getByRole('button', { name: 'Delete project' }));
    await waitFor(() => expect(baseElement.querySelector('[data-slot="alert-dialog-action"]')).not.toBeNull());

    const action = baseElement.querySelector('[data-slot="alert-dialog-action"]') as HTMLElement;
    await fireEvent.click(action);

    await waitFor(() => expect(getByTestId('confirmed').textContent).toBe('true'));
    // Still open: the consumer decides when to close, e.g. after the request
    // succeeds — or keeps it open to show a failure.
    expect(getByTestId('open').textContent).toBe('true');
  });

  it('closes without confirming when cancel is pressed', async () => {
    const { getByRole, getByTestId } = render(AlertDialogFixture, { props: {} });
    await fireEvent.click(getByRole('button', { name: 'Delete project' }));
    await waitFor(() => expect(getByTestId('open').textContent).toBe('true'));

    await fireEvent.click(getByRole('button', { name: 'Keep project' }));

    await waitFor(() => {
      expect(getByTestId('open').textContent).toBe('false');
      expect(getByTestId('confirmed').textContent).toBe('false');
    });
  });

  it('does NOT dismiss on a backdrop click — a destructive choice needs an answer', async () => {
    const { getByRole, getByTestId, baseElement } = render(AlertDialogFixture, { props: {} });
    await fireEvent.click(getByRole('button', { name: 'Delete project' }));
    await waitFor(() => expect(getByTestId('open').textContent).toBe('true'));

    const overlay = baseElement.querySelector('.sve-alert-dialog-overlay') as HTMLElement;
    await fireEvent.pointerDown(overlay);
    await fireEvent.click(overlay);

    expect(getByTestId('open').textContent).toBe('true');
    expect(getByTestId('confirmed').textContent).toBe('false');
  });

  it('gives the action the danger tone by default', async () => {
    const { getByRole, baseElement } = render(AlertDialogFixture, { props: {} });
    await fireEvent.click(getByRole('button', { name: 'Delete project' }));

    await waitFor(() => {
      const action = baseElement.querySelector('[data-slot="alert-dialog-action"]') as HTMLElement;
      expect(action.classList.contains('sve-c-danger')).toBe(true);
    });
  });
});
