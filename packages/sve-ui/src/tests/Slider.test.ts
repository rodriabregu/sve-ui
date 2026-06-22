import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Slider from '$lib/components/Slider/Slider.svelte';

describe('Slider', () => {
  it('renders track, range, and a thumb', () => {
    const { container } = render(Slider, { props: { value: 50, max: 100 } });
    expect(container.querySelector('.sve-slider')).not.toBeNull();
    expect(container.querySelector('.sve-slider__track')).not.toBeNull();
    expect(container.querySelector('.sve-slider__range')).not.toBeNull();
    expect(container.querySelector('.sve-slider__thumb')).not.toBeNull();
  });

  it('exposes role="slider" with the current value (Bits UI a11y)', () => {
    const { getByRole } = render(Slider, { props: { value: 40, max: 100 } });
    const thumb = getByRole('slider');
    expect(thumb.getAttribute('aria-valuenow')).toBe('40');
    expect(thumb.getAttribute('aria-valuemax')).toBe('100');
  });

  it('renders one thumb per value in multiple mode', () => {
    const { container } = render(Slider, {
      props: { type: 'multiple' as const, value: [20, 80], max: 100 }
    });
    expect(container.querySelectorAll('.sve-slider__thumb')).toHaveLength(2);
  });
});
