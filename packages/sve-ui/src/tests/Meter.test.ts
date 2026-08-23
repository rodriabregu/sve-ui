import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Meter from '$lib/components/Meter/Meter.svelte';

const NAME = { 'aria-label': 'Disk usage' };

describe('Meter', () => {
  it('exposes role="meter" with an accessible name (Bits UI a11y)', () => {
    const { getByRole } = render(Meter, { props: { ...NAME } });
    expect(getByRole('meter', { name: 'Disk usage' })).toBeTruthy();
  });

  it('has base and default variant classes', () => {
    const { getByRole } = render(Meter, { props: { ...NAME } });
    const el = getByRole('meter');
    expect(el.classList.contains('sve-meter')).toBe(true);
    expect(el.classList.contains('sve-meter--md')).toBe(true);
    expect(el.classList.contains('sve-c-primary')).toBe(true);
  });

  it('applies size and color props', () => {
    const { getByRole } = render(Meter, {
      props: { ...NAME, size: 'sm' as const, color: 'danger' as const }
    });
    const el = getByRole('meter');
    expect(el.classList.contains('sve-meter--sm')).toBe(true);
    expect(el.classList.contains('sve-c-danger')).toBe(true);
  });

  it('reports the value range to assistive technology', () => {
    const { getByRole } = render(Meter, { props: { ...NAME, value: 70, max: 100 } });
    const el = getByRole('meter');
    expect(el.getAttribute('aria-valuenow')).toBe('70');
    expect(el.getAttribute('aria-valuemax')).toBe('100');
  });

  it('fills proportionally to value', () => {
    const { container } = render(Meter, { props: { ...NAME, value: 70, max: 100 } });
    const fill = container.querySelector('.sve-meter__fill') as HTMLElement;
    expect(fill.style.width).toBe('70%');
  });

  it('accounts for a non-zero min when computing the fill', () => {
    const { container } = render(Meter, { props: { ...NAME, value: 5, min: 0, max: 20 } });
    const fill = container.querySelector('.sve-meter__fill') as HTMLElement;
    expect(fill.style.width).toBe('25%');
  });

  it('clamps out-of-range values', () => {
    const over = render(Meter, { props: { ...NAME, value: 300, max: 100 } });
    expect((over.container.querySelector('.sve-meter__fill') as HTMLElement).style.width).toBe(
      '100%'
    );
    const under = render(Meter, { props: { ...NAME, value: -5, max: 100 } });
    expect((under.container.querySelector('.sve-meter__fill') as HTMLElement).style.width).toBe(
      '0%'
    );
  });

  it('accepts an extra class via the class prop', () => {
    const { getByRole } = render(Meter, { props: { ...NAME, class: 'extra-meter-class' } });
    expect(getByRole('meter').classList.contains('extra-meter-class')).toBe(true);
  });
});
