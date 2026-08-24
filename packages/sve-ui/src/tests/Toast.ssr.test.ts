// @vitest-environment node
import { describe, it, expect, vi, afterEach } from 'vitest';
import { toast, toasts, reset } from '$lib/components/Toast/store.svelte.js';

/**
 * This file runs in a real node environment — no jsdom, no `window` — because
 * that is the only way to exercise the guard that matters most.
 *
 * The toast queue is module state. On a server, module state is shared across
 * every request, so a toast enqueued during rendering would be delivered in a
 * DIFFERENT user's HTML. That is not a styling bug or a lost notification; it
 * is one user's message shown to another. The guard is the reason an imperative
 * API is acceptable here at all, so it gets its own environment.
 */
describe('Toast during server rendering', () => {
  afterEach(() => {
    reset();
    vi.restoreAllMocks();
  });

  it('has no window to speak of', () => {
    // Guards against this file silently regaining jsdom, which would make every
    // assertion below vacuous.
    expect(typeof window).toBe('undefined');
  });

  it('refuses to enqueue and leaves the queue empty', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    toast.success('This would leak into another request');
    expect(toasts.length).toBe(0);
  });

  it('reports the refusal instead of failing silently', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    toast.error('Nope');

    // Loud, because a silent no-op means the developer never learns why their
    // toast never appeared.
    expect(spy).toHaveBeenCalledOnce();
    expect(String(spy.mock.calls[0][0])).toContain('server rendering');
  });

  it('does not throw, so it cannot take the page down', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    // A toast is by definition not essential to the page. Throwing would trade
    // a missing notification for a blank screen.
    expect(() => toast('Anything')).not.toThrow();
  });

  it('returns an empty id rather than one that resolves to nothing', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(toast('Anything')).toBe('');
  });
});
