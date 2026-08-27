/**
 * Moves focus to the first invalid field, which is what a failed submit should
 * do and what `Field`'s own documentation tells you to do.
 *
 * That guidance shipped with nothing behind it: the library said "move focus to
 * the first invalid control" and left the work to the caller. This is the
 * missing half.
 *
 * Focusing the control is the point rather than a nicety. It reads the label,
 * the error and the description in one announcement, through the
 * `aria-describedby` Field already wired, and it puts the user where the work
 * is. It is also why the error is deliberately not a live region — one that is
 * both live and referenced gets announced twice.
 */

import { tick } from 'svelte';

/**
 * Deliberately NOT a search for `[aria-invalid="true"]`, though that WOULD find
 * most of these — I checked, rather than assuming. `Field` puts `aria-invalid`
 * into the props you spread, so even a `Select.Trigger`, whose own `invalid`
 * prop omits the attribute, ends up carrying it.
 *
 * Two reasons the marker wins anyway:
 *
 *   - It focuses the LABELLED control. An `aria-invalid` hit can land on an
 *     inner element, and focusing that skips the label/error announcement this
 *     whole mechanism exists for.
 *   - It only matches fields this library wired. A form also using another
 *     validation library, or a hand-rolled `<input aria-invalid>`, would
 *     otherwise get focus moved into something `Field` knows nothing about.
 *
 * Worth knowing about that first point: `Field` passing `aria-invalid` to a
 * control whose role does not support it is harmless but inert. The attribute is
 * correct on a checkbox, switch, radiogroup, combobox or slider and ignored on a
 * button. Field cannot know which element its props land on, which is inherent
 * to the snippet API; the signal that always works is the error text wired
 * through `aria-describedby`.
 */
const FIELD = '[data-sve-field-invalid]';

export interface FocusFirstInvalidOptions {
	/** Where to look. Pass the form to scope it. @default document */
	root?: ParentNode;
	/**
	 * Scroll the field into view. Leave it on unless you are managing scroll
	 * yourself — a focused control below the fold is no better than an unfocused
	 * one.
	 * @default true
	 */
	scroll?: boolean;
}

/**
 * Focuses the control of the first `Field` currently showing an error, in
 * document order. Returns whether it focused anything, so a caller can fall
 * back when a submit failed for a reason no field owns.
 *
 * Awaits `tick()` first, because it is called right after the state change that
 * produced the errors and the DOM would otherwise not have them yet. That
 * ordering is the single easiest thing to get wrong here, so it is handled
 * rather than documented.
 *
 *   async function submit() {
 *     errors = await validate(values);
 *     if (Object.keys(errors).length > 0) {
 *       await focusFirstInvalidField({ root: formEl });
 *       return;
 *     }
 *     ...
 *   }
 */
export async function focusFirstInvalidField(
	options: FocusFirstInvalidOptions = {}
): Promise<boolean> {
	if (typeof document === 'undefined') return false;

	const { root = document, scroll = true } = options;

	await tick();

	const field = root.querySelector(FIELD);
	if (!field) return false;

	const controlId = field.getAttribute('data-sve-field-control');
	const control = controlId ? document.getElementById(controlId) : null;

	if (!control) {
		// Field already reports a missing control id on mount; say it again here
		// because this is the moment the consequence is visible.
		console.error(
			`[sve-ui] focusFirstInvalidField found an invalid <Field> whose control ` +
				`("${controlId}") is not in the document. Spread the props the \`control\` ` +
				'snippet gives you onto your control.'
		);
		return false;
	}

	control.focus({ preventScroll: !scroll });

	// Focus can silently fail — a hidden, detached or non-focusable element takes
	// nothing. Left unreported, the form just sits there doing nothing.
	if (document.activeElement !== control) {
		console.error(
			`[sve-ui] focusFirstInvalidField could not focus "${controlId}". The element ` +
				'exists but did not take focus: it may be hidden, inside a closed ' +
				'disclosure, or not focusable.'
		);
		return false;
	}

	return true;
}
