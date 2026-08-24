import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import TimeFieldFixture from './TimeFieldFixture.svelte';
import DateRangeFieldFixture from './DateRangeFieldFixture.svelte';
import DateRangeFieldRoot from '$lib/components/DateRangeField/DateRangeFieldRoot.svelte';

describe('TimeField', () => {
	it('exposes hour and minute as spinbuttons', () => {
		const { container } = render(TimeFieldFixture, { props: {} });
		expect(container.querySelector('[data-segment="hour"]')).not.toBeNull();
		expect(container.querySelector('[data-segment="minute"]')).not.toBeNull();
	});

	it('names the group from the Label', () => {
		const { getByRole } = render(TimeFieldFixture, { props: {} });
		expect(getByRole('group', { name: /Pickup time/ })).toBeTruthy();
	});

	it('adds a dayPeriod segment on a 12-hour clock', () => {
		const { container } = render(TimeFieldFixture, { props: { hourCycle: 12 as const } });
		// AM/PM only exists on a 12-hour clock, which is why hourCycle should follow
		// the locale rather than being hardcoded.
		expect(container.querySelector('[data-segment="dayPeriod"]')).not.toBeNull();
	});

	it('drops the dayPeriod segment on a 24-hour clock', () => {
		const { container } = render(TimeFieldFixture, { props: { hourCycle: 24 as const } });
		expect(container.querySelector('[data-segment="dayPeriod"]')).toBeNull();
	});

	it('bounds the hour segment to the clock', () => {
		const { container } = render(TimeFieldFixture, { props: { hourCycle: 24 as const } });
		const hour = container.querySelector('[data-segment="hour"]') as HTMLElement;
		expect(hour.getAttribute('aria-valuemin')).toBe('0');
		expect(hour.getAttribute('aria-valuemax')).toBe('23');
	});
});

describe('DateRangeField', () => {
	it('wraps both halves in ONE labelled group', () => {
		const { container, getAllByRole } = render(DateRangeFieldFixture, { props: {} });
		// Verified in the DOM: the ROOT carries role="group"; the two Inputs inside
		// it carry none. So the pair reads as a single control, with the segments in
		// document order from one half into the next.
		expect(container.querySelectorAll('[role="group"]').length).toBe(1);
		expect(getAllByRole('spinbutton').length).toBe(6);
	});

	// Verified in the DOM: Bits gives the range Root a role="group" with NO name.
	// It points each Input's aria-labelledby at the Label, but the Inputs carry no
	// role, so nothing exposed is labelled. The consumer must name the Root.
	it('is unnamed unless the consumer names the Root', () => {
		const { container } = render(DateRangeFieldRoot, {
			props: { locale: 'en-US' } as never
		});
		const group = container.querySelector('[role="group"]') as HTMLElement;
		expect(group.getAttribute('aria-label')).toBeNull();
		expect(group.getAttribute('aria-labelledby')).toBeNull();
	});

	it('takes a name from aria-labelledby on the Root', () => {
		const { getByRole } = render(DateRangeFieldFixture, { props: {} });
		// The fixture wires it the way the docs tell you to.
		expect(getByRole('group', { name: /Stay dates/ })).toBeTruthy();
	});

	it('requires two Inputs, one per half', () => {
		const { container } = render(DateRangeFieldFixture, { props: {} });
		// `type` is required on Input — a range field is a start field and an end
		// field sharing one Root, not a single input holding both.
		expect(container.querySelectorAll('[data-slot="date-range-field-input"]').length).toBe(2);
	});

	it('reuses the shared segment styling', () => {
		const { container } = render(DateRangeFieldFixture, { props: {} });
		// Bits re-exports DateField's Segment module here, so one styled
		// implementation serves both and they cannot drift apart.
		expect(container.querySelectorAll('.sve-segment').length).toBeGreaterThan(6);
	});
});
