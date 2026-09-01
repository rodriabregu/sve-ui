import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import ButtonGroupFixture from './ButtonGroupFixture.svelte';

describe('ButtonGroup', () => {
	it('is a group with an accessible name', () => {
		const { getByRole } = render(ButtonGroupFixture, { label: 'Text alignment' });
		expect(getByRole('group', { name: 'Text alignment' })).toBeTruthy();
	});

	/*
		`labelledby` and `label` must never both land on the element: two competing
		naming attributes mean the name depends on which one the AT prefers, and the
		visible heading is the one that should win.
	*/
	it('takes its name from labelledby without also setting aria-label', () => {
		const { getByRole } = render(ButtonGroupFixture, { labelledby: 'align-label' });
		const group = getByRole('group', { name: 'Alignment' });
		expect(group.hasAttribute('aria-label')).toBe(false);
		expect(group.getAttribute('aria-labelledby')).toBe('align-label');
	});

	it('defaults to horizontal and applies the orientation modifier', () => {
		const { container: a } = render(ButtonGroupFixture);
		expect(a.querySelector('.sve-button-group--horizontal')).not.toBeNull();

		const { container: b } = render(ButtonGroupFixture, { orientation: 'vertical' });
		expect(b.querySelector('.sve-button-group--vertical')).not.toBeNull();
	});

	/*
		Every child keeps its own tab stop. That is the difference from Toolbar, and
		it is the reason to reach for one over the other — so it is worth a test
		rather than only a sentence in the docs.
	*/
	it('does not manage focus: no child is removed from the tab order', () => {
		const { container } = render(ButtonGroupFixture);
		const buttons = [...container.querySelectorAll('.sve-button-group button')];
		expect(buttons).toHaveLength(2);
		for (const b of buttons) expect(b.getAttribute('tabindex')).toBeNull();
	});
});
