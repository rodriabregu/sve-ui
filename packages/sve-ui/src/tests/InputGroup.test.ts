import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import InputGroupFixture from './InputGroupFixture.svelte';

describe('InputGroup', () => {
	it('wraps the input and its addons', () => {
		const { container } = render(InputGroupFixture);
		const root = container.querySelector('.sve-input-group')!;
		expect(root.querySelectorAll('.sve-input-group__addon')).toHaveLength(2);
		expect(root.querySelector('input.sve-input')).not.toBeNull();
	});

	/*
		The group is presentation. Giving it a role would put a second node in the
		accessibility tree competing with the input that is the actual control.
	*/
	it('adds no role of its own', () => {
		const { container } = render(InputGroupFixture);
		expect(container.querySelector('.sve-input-group')!.hasAttribute('role')).toBe(false);
	});

	/*
		A `$` or a magnifier is a hint for the eye; the meaning has to live in the
		input's accessible name. Defaulting an addon into the tree would announce
		"dollar" as a sibling of the field and name nothing.
	*/
	it('hides addons from the accessibility tree by default', () => {
		const { container } = render(InputGroupFixture);
		const addons = [...container.querySelectorAll('.sve-input-group__addon')];
		expect(addons.every((a) => a.getAttribute('aria-hidden') === 'true')).toBe(true);
	});

	it('exposes an addon when decorative is false', () => {
		const { container } = render(InputGroupFixture, { decorative: false });
		const first = container.querySelector('.sve-input-group__addon')!;
		expect(first.hasAttribute('aria-hidden')).toBe(false);
	});

	/*
		Both halves are needed and neither substitutes for the other: the group turns
		the border, the input sets aria-invalid. Styling alone tells sighted users
		and nobody else.
	*/
	it('marks the group invalid and leaves aria-invalid to the input', () => {
		const { container } = render(InputGroupFixture, { invalid: true });
		expect(container.querySelector('.sve-input-group--invalid')).not.toBeNull();
		expect(container.querySelector('input.sve-input')!.getAttribute('aria-invalid')).toBe('true');
	});

	it('applies the size modifier', () => {
		const { container } = render(InputGroupFixture, { size: 'lg' });
		expect(container.querySelector('.sve-input-group--lg')).not.toBeNull();
	});
});
