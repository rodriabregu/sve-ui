/**
 * Toast namespace — transient notifications.
 *
 * The API is an IMPERATIVE trigger with a DECLARATIVE mount point:
 *
 *   import { toast, Toast } from 'sve-ui';
 *
 *   <Toast.Viewport />          // once, high in the layout
 *   toast.success('Saved');     // anywhere, including non-component code
 *
 * Imperative because a toast reports an EVENT, not state — a fetch resolved, a
 * socket message arrived. State lives in the component tree; the event happens
 * in a `catch`. And decisively: an imperative call works from code that is not
 * a component at all (a `fetch` wrapper, an interceptor, a `load` function),
 * where a context-based API cannot reach.
 *
 * Declarative mount point because the app, not the library, decides where the
 * stack sits, how many fit and what the region is called. Without a `Viewport`
 * nothing renders — the calls queue into a list no one is displaying.
 *
 * The queue is the library's only mutable module state, which means it is
 * shared between requests on a server. Enqueuing during SSR is therefore
 * refused and reported: a toast enqueued on the server would appear in another
 * user's response.
 *
 * Not in this version, deliberately:
 *   - Swipe to dismiss. It needs a keyboard and screen-reader equivalent, which
 *     is the dismiss button — so the swipe is decoration on top of the control
 *     that does the work.
 *   - Collapsed/stacked animation. It needs FLIP measurement for motion, not
 *     behaviour.
 *
 * Accessibility notes worth reading before shipping:
 *   - Mount the `Viewport` once and early. It is a persistent live region;
 *     assistive technology announces additions to a region it was ALREADY
 *     observing, so creating the region and its first toast together is the
 *     usual reason nothing is announced.
 *   - Politeness is fixed at `polite`. `assertive` interrupts whatever is being
 *     read, and anything worth interrupting for is too important to
 *     auto-dismiss — use an inline `Alert` or an `AlertDialog`.
 *   - A toast with an `action` does not auto-dismiss unless you pass an
 *     explicit `duration`. A control the user can lose a race against is not a
 *     control.
 *   - Timers pause on hover AND on focus. Someone reading with a screen reader
 *     is not moving a pointer.
 *   - Never let a toast hold the only copy of information or an action. It
 *     disappears, it can be missed entirely, and there is no history.
 *
 * Size it with `--sve-toast-width` and `--sve-toast-z-index`.
 */

export { default as Viewport } from './ToastViewport.svelte';

export {
  toast,
  dismiss,
  clear,
  type ToastItem,
  type ToastVariant,
  type ToastAction,
  type ToastOptions
} from './store.svelte.js';
