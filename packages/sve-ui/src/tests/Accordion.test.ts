import { describe, it, expect } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/svelte';
import AccordionFixture from './AccordionFixture.svelte';
import AccordionBindFixture from './AccordionBindFixture.svelte';

const contents = (root: HTMLElement) =>
	Array.from(root.querySelectorAll('[data-slot="accordion-content"]'));

describe('Accordion', () => {
	it('renders triggers for each item', () => {
		const { getByText } = render(AccordionFixture, { props: {} });
		expect(getByText('First')).toBeTruthy();
		expect(getByText('Second')).toBeTruthy();
	});

	it('is collapsed initially (all panels closed)', () => {
		// Bits keeps content mounted but marks it data-state="closed" + hidden.
		const { container } = render(AccordionFixture, { props: {} });
		for (const c of contents(container)) {
			expect(c.getAttribute('data-state')).toBe('closed');
		}
	});

	it('opens a panel on trigger click', async () => {
		const { getByText, container } = render(AccordionFixture, { props: {} });
		await fireEvent.click(getByText('First'));
		await waitFor(() => expect(contents(container)[0].getAttribute('data-state')).toBe('open'));
	});

	it('single mode: opening one closes the other', async () => {
		const { getByText, container } = render(AccordionFixture, { props: {} });
		await fireEvent.click(getByText('First'));
		await waitFor(() => expect(contents(container)[0].getAttribute('data-state')).toBe('open'));

		await fireEvent.click(getByText('Second'));
		await waitFor(() => {
			const [first, second] = contents(container);
			expect(second.getAttribute('data-state')).toBe('open');
			expect(first.getAttribute('data-state')).toBe('closed');
		});
	});

	// Regression: `value` used to be forwarded through the spread, which made
	// `bind:value` one-way. The component documented it as two-way, and no test
	// exercised the binding, so it shipped broken.
	it('reflects the opened item back through bind:value', async () => {
		const { getByRole, getByTestId } = render(AccordionBindFixture, { props: {} });
		await fireEvent.click(getByRole('button', { name: 'First' }));
		await waitFor(() => expect(getByTestId('value').textContent).toBe('one'));
	});
});
