import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import CarouselFixture from './CarouselFixture.svelte';

describe('Carousel', () => {
	/*
		The root is a labelled region so the whole carousel is one thing a screen
		reader user can find and skip. `aria-roledescription` is what makes it
		announce as "carousel" rather than "region".
	*/
	it('is a labelled region described as a carousel', () => {
		const { getByRole } = render(CarouselFixture, { label: 'Mountains' });
		const region = getByRole('region', { name: 'Mountains' });
		expect(region.getAttribute('aria-roledescription')).toBe('carousel');
	});

	it('takes its name from labelledby without also setting aria-label', () => {
		const { getByRole } = render(CarouselFixture, { labelledby: 'peaks-heading' });
		const region = getByRole('region', { name: 'Peaks' });
		expect(region.hasAttribute('aria-label')).toBe(false);
	});

	/*
		A slide with no name is announced as "group", which says nothing about where
		the user is. The generated position label is the fallback that stops that.
	*/
	it('names each slide with its position', async () => {
		const { container } = render(CarouselFixture, { count: 3 });
		const slides = [...container.querySelectorAll('[data-sve-carousel-slide]')];
		expect(slides).toHaveLength(3);
		expect(slides.map((s) => s.getAttribute('aria-label'))).toEqual(['1 of 3', '2 of 3', '3 of 3']);
		expect(slides.every((s) => s.getAttribute('aria-roledescription') === 'slide')).toBe(true);
	});

	it('lets a slide override the generated position name', () => {
		const { container } = render(CarouselFixture, { count: 3, firstLabel: 'Kilimanjaro' });
		const first = container.querySelector('[data-sve-carousel-slide]')!;
		expect(first.getAttribute('aria-label')).toBe('Kilimanjaro');
	});

	/*
		At rest the track is at its start, so Previous has nothing to go back to.
		Disabled rather than hidden: a control that vanishes changes the tab order
		and moves its neighbour under the user.
	*/
	it('disables Previous at the start and keeps it in the DOM', () => {
		const { getByRole } = render(CarouselFixture);
		const prev = getByRole('button', { name: 'Previous slide' }) as HTMLButtonElement;
		expect(prev.disabled).toBe(true);
	});

	/*
		The indicators are buttons in a named group, NOT a tablist: the slides are a
		scrolling track, not panels that swap. `aria-current` rather than
		`aria-selected`, which is invalid on a button and would be ignored — leaving
		the active dot distinguished by colour alone.
	*/
	it('marks the active indicator with aria-current, not aria-selected', () => {
		const { getByRole, container } = render(CarouselFixture, { count: 3 });
		getByRole('group', { name: 'Choose slide' });

		const dots = [...container.querySelectorAll('.sve-carousel__indicator')];
		expect(dots).toHaveLength(3);
		expect(dots[0].getAttribute('aria-current')).toBe('true');
		expect(dots.some((d) => d.hasAttribute('aria-selected'))).toBe(false);
		expect(dots[1].getAttribute('aria-label')).toBe('Go to slide 2');
	});

	/*
		The viewport must NOT be a tab stop. A scrollable box is already
		arrow-scrollable, and an unnamed stop in front of the slides' own focusable
		content is pure friction.
	*/
	it('does not put a tab stop on the viewport', () => {
		const { container } = render(CarouselFixture);
		const viewport = container.querySelector('.sve-carousel__viewport')!;
		expect(viewport.hasAttribute('tabindex')).toBe(false);
	});

	it('applies the orientation to viewport and slides', () => {
		const { container } = render(CarouselFixture, { orientation: 'vertical' });
		expect(container.querySelector('.sve-carousel__viewport--vertical')).not.toBeNull();
		expect(container.querySelector('.sve-carousel__slide--vertical')).not.toBeNull();
	});
});
