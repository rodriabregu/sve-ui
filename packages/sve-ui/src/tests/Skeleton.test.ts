import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Skeleton from '$lib/components/Skeleton/Skeleton.svelte';

describe('Skeleton', () => {
  it('renders a <div> element', () => {
    const { container } = render(Skeleton, { props: {} });
    expect(container.querySelector('div')).not.toBeNull();
  });

  it('has base class sve-skeleton', () => {
    const { container } = render(Skeleton, { props: {} });
    const el = container.querySelector('div');
    expect(el?.classList.contains('sve-skeleton')).toBe(true);
  });

  it('applies the text variant by default', () => {
    const { container } = render(Skeleton, { props: {} });
    const el = container.querySelector('div');
    expect(el?.classList.contains('sve-skeleton--text')).toBe(true);
  });

  it('applies the rect variant', () => {
    const { container } = render(Skeleton, { props: { variant: 'rect' as const } });
    const el = container.querySelector('div');
    expect(el?.classList.contains('sve-skeleton--rect')).toBe(true);
  });

  it('applies the circle variant', () => {
    const { container } = render(Skeleton, { props: { variant: 'circle' as const } });
    const el = container.querySelector('div');
    expect(el?.classList.contains('sve-skeleton--circle')).toBe(true);
  });

  it('is hidden from assistive technology', () => {
    const { container } = render(Skeleton, { props: {} });
    const el = container.querySelector('div');
    expect(el?.getAttribute('aria-hidden')).toBe('true');
  });

  it('applies the width prop as an inline style', () => {
    const { container } = render(Skeleton, { props: { width: '12rem' } });
    const el = container.querySelector('div') as HTMLDivElement;
    expect(el.style.width).toBe('12rem');
  });

  it('applies the height prop as an inline style', () => {
    const { container } = render(Skeleton, { props: { height: '4rem' } });
    const el = container.querySelector('div') as HTMLDivElement;
    expect(el.style.height).toBe('4rem');
  });

  it('sets no inline width or height when the props are omitted', () => {
    const { container } = render(Skeleton, { props: {} });
    const el = container.querySelector('div') as HTMLDivElement;
    expect(el.style.width).toBe('');
    expect(el.style.height).toBe('');
  });

  it('accepts an extra class via the class prop', () => {
    const { container } = render(Skeleton, { props: { class: 'extra-skeleton-class' } });
    const el = container.querySelector('div');
    expect(el?.classList.contains('extra-skeleton-class')).toBe(true);
  });

  it('forwards arbitrary attributes', () => {
    const { container } = render(Skeleton, { props: { 'data-testid': 'sk' } });
    expect(container.querySelector('[data-testid="sk"]')).not.toBeNull();
  });

  it('contains no Tailwind utility classes', () => {
    const { container } = render(Skeleton, { props: { variant: 'rect' as const } });
    const classList = Array.from(container.querySelector('div')?.classList ?? []);
    const hasTailwind = classList.some((cls) =>
      /^(bg-|text-|p-|px-|py-|m-|mx-|my-|flex|grid|block|inline|rounded|border-|shadow|hover:|focus:)/.test(cls)
    );
    expect(hasTailwind).toBe(false);
  });
});
