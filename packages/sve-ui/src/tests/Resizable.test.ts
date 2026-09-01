import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import ResizableFixture from './ResizableFixture.svelte';

const handle = (c: HTMLElement) => c.querySelector('[role="separator"]') as HTMLElement;
const panes = (c: HTMLElement) => [...c.querySelectorAll<HTMLElement>('.sve-resizable__pane')];
const basis = (el: HTMLElement) => Number(el.style.flexBasis.replace('%', ''));

describe('Resizable', () => {
	it('splits evenly with no configuration', () => {
		const { container } = render(ResizableFixture);
		expect(panes(container).map(basis)).toEqual([50, 50]);
	});

	/*
		A separator with a tabindex is a control. Without a name it announces
		"splitter, 50" — a number, and nothing about what it sizes.
	*/
	it('is a named, focusable separator wired to the pane it sizes', () => {
		const { container, getByRole } = render(ResizableFixture);
		const h = getByRole('separator', { name: 'Resize sidebar' });
		expect(h.getAttribute('tabindex')).toBe('0');
		expect(h.getAttribute('aria-valuenow')).toBe('50');
		expect(h.getAttribute('aria-valuemin')).toBe('0');
		expect(h.getAttribute('aria-valuemax')).toBe('100');
		// aria-controls must point at a real element, not a guessed id.
		expect(container.querySelector(`#${h.getAttribute('aria-controls')}`)).not.toBeNull();
	});

	/*
		`aria-orientation` describes the separator's own LINE, not the direction of
		travel — so a handle in a horizontal group is vertical. Easy to get backwards,
		and nothing visible breaks when you do.
	*/
	it('reports the separator line, not the direction of travel', () => {
		const { container: h } = render(ResizableFixture, { direction: 'horizontal' });
		expect(handle(h).getAttribute('aria-orientation')).toBe('vertical');

		const { container: v } = render(ResizableFixture, { direction: 'vertical' });
		expect(handle(v).getAttribute('aria-orientation')).toBe('horizontal');
	});

	/*
		The keyboard contract IS the component. A divider that only answers to a drag
		is unusable without a pointer, and it is the half every hand-rolled splitter
		skips.
	*/
	it('moves the boundary with the arrow keys', async () => {
		const { container } = render(ResizableFixture, { step: 5 });
		const h = handle(container);

		await fireEvent.keyDown(h, { key: 'ArrowRight' });
		expect(panes(container).map(basis)).toEqual([55, 45]);

		await fireEvent.keyDown(h, { key: 'ArrowLeft' });
		expect(panes(container).map(basis)).toEqual([50, 50]);
	});

	it('uses Up and Down in a vertical group', async () => {
		const { container } = render(ResizableFixture, { direction: 'vertical', step: 10 });
		await fireEvent.keyDown(handle(container), { key: 'ArrowDown' });
		expect(panes(container).map(basis)).toEqual([60, 40]);
	});

	it('keeps aria-valuenow in step with the size it reports', async () => {
		const { container } = render(ResizableFixture, { step: 5 });
		const h = handle(container);
		await fireEvent.keyDown(h, { key: 'ArrowRight' });
		expect(h.getAttribute('aria-valuenow')).toBe('55');
	});

	/*
		Home and End pass a delta larger than any legal move on purpose, so the
		clamp — not the caller — decides where the pane stops. That keeps the limits
		in one place.
	*/
	it('collapses and expands to the declared limits with Home and End', async () => {
		const { container } = render(ResizableFixture, { min: 20, max: 80 });
		const h = handle(container);

		await fireEvent.keyDown(h, { key: 'Home' });
		expect(panes(container).map(basis)).toEqual([20, 80]);

		await fireEvent.keyDown(h, { key: 'End' });
		expect(panes(container).map(basis)).toEqual([80, 20]);
	});

	/*
		The bug this guards: clamping only the pane being GROWN lets its neighbour
		shrink past its own minimum. Both sides have to be checked before anything is
		applied.
	*/
	it('clamps against the neighbour, not only the pane being grown', async () => {
		// Growing pane A to its max of 95 would leave B at 5, under B's min of 30.
		const { container } = render(ResizableFixture, { min: 30, max: 95 });
		await fireEvent.keyDown(handle(container), { key: 'End' });

		const [a, b] = panes(container).map(basis);
		expect(b).toBeGreaterThanOrEqual(30);
		expect(a + b).toBe(100);
		expect(a).toBe(70);
	});

	/*
		Three panes, two handles: dragging one boundary must not move the other. That
		is the familiar bug where resizing a sidebar quietly reflows the far side of
		the layout.
	*/
	it('moves one boundary without disturbing the far pane', async () => {
		const { container } = render(ResizableFixture, { panes: 3, step: 6 });
		const [first] = [...container.querySelectorAll<HTMLElement>('[role="separator"]')];

		const before = panes(container).map(basis);
		await fireEvent.keyDown(first, { key: 'ArrowRight' });
		const after = panes(container).map(basis);

		expect(after[0]).toBeCloseTo(before[0] + 6, 5);
		expect(after[1]).toBeCloseTo(before[1] - 6, 5);
		expect(after[2]).toBeCloseTo(before[2], 5);
		expect(after.reduce((n, v) => n + v, 0)).toBeCloseTo(100, 5);
	});

	it('ignores keys it does not own', async () => {
		const { container } = render(ResizableFixture);
		await fireEvent.keyDown(handle(container), { key: 'PageDown' });
		expect(panes(container).map(basis)).toEqual([50, 50]);
	});
});
