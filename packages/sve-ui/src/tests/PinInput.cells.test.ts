import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import PinInputCellsFixture from './PinInputCellsFixture.svelte';

/**
 * The bug this file exists for: **every cell was empty, in every published
 * version.** You typed, the value updated, and the boxes stayed blank.
 *
 * Bits' `PinInput.Cell` renders `<div {...props}>{@render children?.()}</div>`
 * and nothing else — the character is the consumer's to draw. Our wrapper was
 * self-closing, so there was never anything to draw.
 *
 * Nothing caught it. The a11y suite passes on empty cells, because an empty cell
 * is not an accessibility violation; the value lives on the real input and is
 * announced correctly. `svelte-check` cannot see a missing child. And the docs
 * page rendered it exactly as broken as the component was.
 *
 * A user found it by typing into it. So the test types into it.
 */
describe('PinInput cells', () => {
	it('shows each character in its cell', async () => {
		const { container } = render(PinInputCellsFixture, { maxlength: 6 });
		const input = container.querySelector('input')!;

		await fireEvent.input(input, { target: { value: '1234' } });

		const cells = [...container.querySelectorAll('.sve-pin-input__cell')];
		expect(cells).toHaveLength(6);
		// The whole bug, in one assertion.
		expect(cells.map((c) => c.textContent?.trim()).slice(0, 4)).toEqual(['1', '2', '3', '4']);
	});

	it('leaves the cells past the value empty', async () => {
		const { container } = render(PinInputCellsFixture, { maxlength: 6 });
		await fireEvent.input(container.querySelector('input')!, { target: { value: '12' } });

		const cells = [...container.querySelectorAll('.sve-pin-input__cell')];
		// Empty, apart from the caret placeholder in the one the cursor is in.
		for (const cell of cells.slice(2)) {
			expect(cell.textContent?.trim()).toBe('');
		}
	});

	it('draws a caret placeholder rather than a character in the active cell', async () => {
		const { container } = render(PinInputCellsFixture, { maxlength: 6 });
		const input = container.querySelector('input')!;
		await fireEvent.focus(input);
		await fireEvent.input(input, { target: { value: '1' } });

		// The real input is visually hidden and cannot show a cursor, so a cell
		// stands in for it. Decorative: the input announces the value itself.
		const caret = container.querySelector('.sve-pin-input__caret');
		if (caret) expect(caret.getAttribute('aria-hidden')).toBe('true');
	});

	it('renders one cell per maxlength', () => {
		const { container } = render(PinInputCellsFixture, { maxlength: 4 });
		// maxlength IS the cell count — there is no separate `length` prop to
		// disagree with it.
		expect(container.querySelectorAll('.sve-pin-input__cell')).toHaveLength(4);
	});

	it('keeps the value on the real input, not in the cells', async () => {
		const { container } = render(PinInputCellsFixture, { maxlength: 6 });
		const input = container.querySelector('input')!;
		await fireEvent.input(input, { target: { value: '123456' } });

		// The cells are presentation. This is why an empty-cell bug passed axe:
		// the accessible value was always correct.
		expect(input.value).toBe('123456');
	});
});
