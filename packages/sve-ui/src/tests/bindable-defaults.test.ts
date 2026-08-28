import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';

import AccordionRoot from '$lib/components/Accordion/AccordionRoot.svelte';
import CalendarRoot from '$lib/components/Calendar/CalendarRoot.svelte';
import DateFieldRoot from '$lib/components/DateField/DateFieldRoot.svelte';
import DatePickerRoot from '$lib/components/DatePicker/DatePickerRoot.svelte';
import DateRangeFieldRoot from '$lib/components/DateRangeField/DateRangeFieldRoot.svelte';
import DateRangePickerRoot from '$lib/components/DateRangePicker/DateRangePickerRoot.svelte';
import Input from '$lib/components/Input/Input.svelte';
import RadioGroupRoot from '$lib/components/RadioGroup/RadioGroupRoot.svelte';
import RangeCalendarRoot from '$lib/components/RangeCalendar/RangeCalendarRoot.svelte';
import TabsRoot from '$lib/components/Tabs/TabsRoot.svelte';
import Textarea from '$lib/components/Textarea/Textarea.svelte';
import TimeFieldRoot from '$lib/components/TimeField/TimeFieldRoot.svelte';
import TimeRangeFieldRoot from '$lib/components/TimeRangeField/TimeRangeFieldRoot.svelte';
import ToggleGroupRoot from '$lib/components/ToggleGroup/ToggleGroupRoot.svelte';

/*
	Every component that declares a bindable prop with no fallback AND forwards it
	down with `bind:`.

	That shape is a live hazard. If the child's prop HAS a fallback, a consumer who
	renders the component without the prop binds `undefined` into it and Svelte
	throws `props_invalid_value` — which kills the whole page, not just the
	control. It is invisible to every other guard here: the markup is right, so
	`check:render` passes; the types are right, so `svelte-check` passes; and the
	existing tests all pass a value.

	It shipped in `RadioGroup.Root` and `Tabs.Root`, and the RadioGroup docs page
	was broken in production until the screenshot suite's first run hit it.

	Whether it throws depends on the CHILD, which is why this is a test and not a
	lint rule: Bits gives `radio-group` and `tabs` a `''` default and gives the
	date family and `toggle-group` none, so the same shape is fatal in two places
	and harmless in twelve.

	`Toolbar.Group` has the same shape and is absent on purpose: it requires the
	`Toolbar.Root` context, so rendering it bare throws for an unrelated reason
	and would say nothing about this.
*/
const ROOTS: [string, unknown][] = [
	['Accordion.Root', AccordionRoot],
	['Calendar.Root', CalendarRoot],
	['DateField.Root', DateFieldRoot],
	['DatePicker.Root', DatePickerRoot],
	['DateRangeField.Root', DateRangeFieldRoot],
	['DateRangePicker.Root', DateRangePickerRoot],
	['Input', Input],
	['RadioGroup.Root', RadioGroupRoot],
	['RangeCalendar.Root', RangeCalendarRoot],
	['Tabs.Root', TabsRoot],
	['Textarea', Textarea],
	['TimeField.Root', TimeFieldRoot],
	['TimeRangeField.Root', TimeRangeFieldRoot],
	['ToggleGroup.Root', ToggleGroupRoot]
];

describe('a component with no props must not throw', () => {
	for (const [name, Component] of ROOTS) {
		it(name, () => {
			expect(() =>
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				render(Component as any, { props: {} as any })
			).not.toThrow();
		});
	}
});
