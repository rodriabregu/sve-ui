import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, waitFor, fireEvent } from '@testing-library/svelte';
import ToastFixture from './ToastFixture.svelte';
import { toast, dismiss, clear, reset, toasts } from '$lib/components/Toast/store.svelte.js';

/**
 * The queue is the library's only mutable module state, so every test resets
 * it. That is not tidiness — a leaked toast between tests is the same class of
 * bug as a leaked toast between HTTP requests, which is the whole reason the
 * store refuses to run on the server.
 */
describe('Toast', () => {
  beforeEach(() => reset());
  afterEach(() => {
    reset();
    vi.useRealTimers();
  });

  it('renders a persistent named live region before any toast exists', () => {
    const { getByRole } = render(ToastFixture);
    // Assistive technology announces additions to a region it was ALREADY
    // observing. If the region appeared together with its first toast, nothing
    // would be announced — so it must exist while empty.
    const region = getByRole('region', { name: 'Notifications' });
    // A named <section> IS the region. The list inside carries aria-live,
    // because role="region" is not allowed on <ol> — it already has an implicit
    // list role, and overriding it is a violation, not a preference.
    expect(region.tagName).toBe('SECTION');
    expect(region.hasAttribute('role')).toBe(false);

    const list = region.querySelector('ol')!;
    expect(list.getAttribute('aria-live')).toBe('polite');
    expect(list.children.length).toBe(0);
  });

  it('is polite, never assertive', () => {
    const { getByRole } = render(ToastFixture);
    // assertive interrupts whatever is being read, and anything worth
    // interrupting for is too important to auto-dismiss. That is an Alert or an
    // AlertDialog, not a toast — so the politeness is not configurable.
    const list = getByRole('region', { name: 'Notifications' }).querySelector('ol')!;
    expect(list.getAttribute('aria-live')).not.toBe('assertive');
  });

  it('renders a toast enqueued after mount', async () => {
    const { getByRole, findByText } = render(ToastFixture);
    toast.success('Project saved');
    expect(await findByText('Project saved')).toBeTruthy();
    expect(getByRole('region', { name: 'Notifications' }).querySelectorAll('ol > li').length).toBe(
      1
    );
  });

  it('renders the description as a second line', async () => {
    const { findByText } = render(ToastFixture);
    toast.error('Upload failed', { description: 'The file is over 10 MB.' });
    expect(await findByText('Upload failed')).toBeTruthy();
    expect(await findByText('The file is over 10 MB.')).toBeTruthy();
  });

  it('names the dismiss button with the toast title, not a bare word', async () => {
    const { findByRole } = render(ToastFixture);
    toast('Copied to clipboard');
    // Three toasts on screen means three buttons; all called "Dismiss" gives no
    // way to tell which one closes what.
    expect(await findByRole('button', { name: 'Dismiss: Copied to clipboard' })).toBeTruthy();
  });

  it('dismisses on the close button', async () => {
    const { findByRole } = render(ToastFixture);
    toast('Copied');
    await fireEvent.click(await findByRole('button', { name: /^Dismiss/ }));
    await waitFor(() => expect(toasts.length).toBe(0));
  });

  it('omits the close button when dismissible is false', async () => {
    const { findByText, queryByRole } = render(ToastFixture);
    toast('Working…', { dismissible: false, duration: Infinity });
    await findByText('Working…');
    expect(queryByRole('button', { name: /^Dismiss/ })).toBeNull();
  });

  it('auto-dismisses after its duration', async () => {
    vi.useFakeTimers();
    render(ToastFixture);
    toast('Copied', { duration: 2000 });
    expect(toasts.length).toBe(1);

    vi.advanceTimersByTime(1999);
    expect(toasts.length).toBe(1);
    vi.advanceTimersByTime(1);
    expect(toasts.length).toBe(0);
  });

  it('never auto-dismisses a toast carrying an action', () => {
    vi.useFakeTimers();
    render(ToastFixture);
    // A control the user can lose a race against is not a control, so an action
    // flips the default to Infinity.
    toast('Message deleted', { action: { label: 'Undo', onclick: () => {} } });

    vi.advanceTimersByTime(60_000);
    expect(toasts.length).toBe(1);
    expect(toasts[0].duration).toBe(Infinity);
  });

  it('still honours an explicit duration on an action toast', () => {
    vi.useFakeTimers();
    render(ToastFixture);
    // The default is a safe default, not a prohibition.
    toast('Message deleted', { duration: 3000, action: { label: 'Undo', onclick: () => {} } });
    vi.advanceTimersByTime(3000);
    expect(toasts.length).toBe(0);
  });

  it('runs the action and then dismisses', async () => {
    const onclick = vi.fn();
    const { findByRole } = render(ToastFixture);
    toast('Message deleted', { action: { label: 'Undo', onclick } });

    await fireEvent.click(await findByRole('button', { name: 'Undo' }));
    expect(onclick).toHaveBeenCalledOnce();
    await waitFor(() => expect(toasts.length).toBe(0));
  });

  it('pauses the countdown on pointer enter and resumes on leave', async () => {
    vi.useFakeTimers();
    const { getByRole } = render(ToastFixture);
    toast('Copied', { duration: 2000 });
    const region = getByRole('region', { name: 'Notifications' });

    vi.advanceTimersByTime(1000);
    await fireEvent.pointerEnter(region);
    vi.advanceTimersByTime(10_000);
    // Frozen: a message pulled away while being read is unreadable.
    expect(toasts.length).toBe(1);

    await fireEvent.pointerLeave(region);
    vi.advanceTimersByTime(999);
    expect(toasts.length).toBe(1);
    vi.advanceTimersByTime(1);
    expect(toasts.length).toBe(0);
  });

  it('pauses the countdown on focus, not only on hover', async () => {
    vi.useFakeTimers();
    const { getByRole } = render(ToastFixture);
    toast('Copied', { duration: 2000 });

    // Someone reading with a screen reader, or tabbing toward the action, is
    // not moving a pointer — hover alone would leave them out.
    await fireEvent.focusIn(getByRole('region', { name: 'Notifications' }));
    vi.advanceTimersByTime(10_000);
    expect(toasts.length).toBe(1);
  });

  it('drops the oldest toast past max', () => {
    render(ToastFixture, { max: 2 });
    toast('first');
    toast('second');
    toast('third');
    // The newest message is the one the user is waiting for.
    expect(toasts.map((t) => t.title)).toEqual(['second', 'third']);
  });

  it('clears the evicted toast timer too', () => {
    vi.useFakeTimers();
    render(ToastFixture, { max: 1 });
    toast('first', { duration: 1000 });
    toast('second', { duration: 5000 });

    // A timer left running for an evicted id would later splice out whatever
    // occupies that slot — or nothing, silently.
    vi.advanceTimersByTime(1000);
    expect(toasts.map((t) => t.title)).toEqual(['second']);
  });

  it('exposes variant classes for each level', async () => {
    const { container, findByText } = render(ToastFixture);
    toast.warning('Careful');
    await findByText('Careful');
    expect(container.querySelector('.sve-toast--warning')).not.toBeNull();
  });

  it('returns an id that dismiss() accepts', async () => {
    const { findByText } = render(ToastFixture);
    const id = toast('Uploading…', { duration: Infinity });
    await findByText('Uploading…');

    expect(id).toMatch(/^sve-toast-\d+$/);
    dismiss(id);
    await waitFor(() => expect(toasts.length).toBe(0));
  });

  it('ignores dismiss() for an id that is already gone', () => {
    render(ToastFixture);
    const id = toast('Copied');
    dismiss(id);
    // Idempotent on purpose: callers hold ids across async work and cannot know
    // whether the toast timed out first.
    expect(() => dismiss(id)).not.toThrow();
    expect(toasts.length).toBe(0);
  });

  it('clear() empties the queue and cancels every timer', () => {
    vi.useFakeTimers();
    render(ToastFixture);
    toast('one', { duration: 1000 });
    toast('two', { duration: 1000 });

    clear();
    expect(toasts.length).toBe(0);
    vi.advanceTimersByTime(5000);
    expect(toasts.length).toBe(0);
  });

  it('accepts a translated dismiss label and region name', async () => {
    const { findByRole, getByRole } = render(ToastFixture, {
      label: 'Notificaciones',
      dismissLabel: 'Cerrar'
    });
    toast('Copiado');
    expect(getByRole('region', { name: 'Notificaciones' })).toBeTruthy();
    expect(await findByRole('button', { name: 'Cerrar: Copiado' })).toBeTruthy();
  });

  it('places the stack from the position prop', () => {
    const { container } = render(ToastFixture, { position: 'top-center' });
    expect(container.querySelector('.sve-toast-viewport--top-center')).not.toBeNull();
  });
});
