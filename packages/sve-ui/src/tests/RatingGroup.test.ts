import { describe, it, expect } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/svelte';
import RatingGroupFixture from './RatingGroupFixture.svelte';

/**
 * This is a real input, not a row of clickable icons: Bits gives Root a slider
 * role with the aria-value* attributes, so arrow keys adjust it. The items are
 * decorative — the value lives on the Root. Asserting that is the point, since
 * a "row of buttons" rebuild would look identical and be unusable by keyboard.
 */
describe('RatingGroup', () => {
  it('exposes a named slider, not a group of buttons', () => {
    const { getByRole } = render(RatingGroupFixture, { props: {} });
    expect(getByRole('slider', { name: 'Rating' })).toBeTruthy();
  });

  it('reports the value range', () => {
    const { getByRole } = render(RatingGroupFixture, { props: {} });
    const root = getByRole('slider');
    expect(root.getAttribute('aria-valuenow')).toBe('3');
    expect(root.getAttribute('aria-valuemin')).toBe('0');
    expect(root.getAttribute('aria-valuemax')).toBe('5');
  });

  it('builds aria-valuetext from the function, so the scale is announced', () => {
    const { getByRole } = render(RatingGroupFixture, { props: {} });
    // Without this the rating is announced as a bare "3", which says nothing.
    expect(getByRole('slider').getAttribute('aria-valuetext')).toBe('3 of 5 stars');
  });

  it('is a single tab stop', () => {
    const { getByRole } = render(RatingGroupFixture, { props: {} });
    expect(getByRole('slider').getAttribute('tabindex')).toBe('0');
  });

  it('renders one item per max, all presentational', () => {
    const { container } = render(RatingGroupFixture, { props: {} });
    const items = container.querySelectorAll('.sve-rating-group__item');
    expect(items.length).toBe(5);
    // Decorative: the accessible value comes from Root's slider role.
    expect(Array.from(items).every((i) => i.getAttribute('role') === 'presentation')).toBe(true);
  });

  it('marks items up to the value active and the rest inactive', () => {
    const { container } = render(RatingGroupFixture, { props: {} });
    const states = Array.from(container.querySelectorAll('.sve-rating-group__item')).map((i) =>
      i.getAttribute('data-state')
    );
    expect(states).toEqual(['active', 'active', 'active', 'inactive', 'inactive']);
  });

  it('raises the rating with ArrowRight and reflects it via bind:value', async () => {
    const { getByRole, getByTestId } = render(RatingGroupFixture, { props: {} });
    const root = getByRole('slider');
    await fireEvent.keyDown(root, { key: 'ArrowRight' });

    await waitFor(() => {
      expect(getByTestId('value').textContent).toBe('4');
      expect(root.getAttribute('aria-valuetext')).toBe('4 of 5 stars');
    });
  });

  it('lowers the rating with ArrowLeft', async () => {
    const { getByRole, getByTestId } = render(RatingGroupFixture, { props: {} });
    await fireEvent.keyDown(getByRole('slider'), { key: 'ArrowLeft' });
    await waitFor(() => expect(getByTestId('value').textContent).toBe('2'));
  });

  it('sets the rating on click', async () => {
    const { container, getByTestId } = render(RatingGroupFixture, { props: {} });
    const fifth = container.querySelectorAll('.sve-rating-group__item')[4] as HTMLElement;
    await fireEvent.click(fifth);
    await waitFor(() => expect(getByTestId('value').textContent).toBe('5'));
  });

  it('applies the size classes', () => {
    const { container } = render(RatingGroupFixture, { props: { size: 'lg' as const } });
    expect(container.querySelector('.sve-rating-group--lg')).not.toBeNull();
  });
});
