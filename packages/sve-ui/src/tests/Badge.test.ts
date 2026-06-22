import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Badge from '$lib/components/Badge/Badge.svelte';
import BadgeFixture from './BadgeFixture.svelte';

describe('Badge', () => {
  it('renders a <span> element', () => {
    const { container } = render(Badge, { props: {} });
    const el = container.querySelector('span');
    expect(el).not.toBeNull();
  });

  it('has default variant classes (subtle + default + md)', () => {
    const { container } = render(Badge, { props: {} });
    const el = container.querySelector('span');
    expect(el?.classList.contains('sve-badge')).toBe(true);
    expect(el?.classList.contains('sve-badge--subtle')).toBe(true);
    expect(el?.classList.contains('sve-c-default')).toBe(true);
    expect(el?.classList.contains('sve-badge--md')).toBe(true);
  });

  it('applies solid variant', () => {
    const { container } = render(Badge, { props: { variant: 'solid' as const } });
    const el = container.querySelector('span');
    expect(el?.classList.contains('sve-badge--solid')).toBe(true);
  });

  it('applies outline variant', () => {
    const { container } = render(Badge, { props: { variant: 'outline' as const } });
    const el = container.querySelector('span');
    expect(el?.classList.contains('sve-badge--outline')).toBe(true);
  });

  it('applies primary color', () => {
    const { container } = render(Badge, { props: { color: 'primary' as const } });
    const el = container.querySelector('span');
    expect(el?.classList.contains('sve-c-primary')).toBe(true);
  });

  it('applies danger color', () => {
    const { container } = render(Badge, { props: { color: 'danger' as const } });
    const el = container.querySelector('span');
    expect(el?.classList.contains('sve-c-danger')).toBe(true);
  });

  it('applies sm size', () => {
    const { container } = render(Badge, { props: { size: 'sm' as const } });
    const el = container.querySelector('span');
    expect(el?.classList.contains('sve-badge--sm')).toBe(true);
  });

  it('applies lg size', () => {
    const { container } = render(Badge, { props: { size: 'lg' as const } });
    const el = container.querySelector('span');
    expect(el?.classList.contains('sve-badge--lg')).toBe(true);
  });

  it('contains no Tailwind utility classes', () => {
    const { container } = render(Badge, {
      props: { variant: 'solid' as const, color: 'success' as const, size: 'md' as const },
    });
    const el = container.querySelector('span');
    const classList = Array.from(el?.classList ?? []);
    const hasTailwind = classList.some((cls) =>
      /^(bg-|text-|p-|px-|py-|m-|mx-|my-|flex|grid|block|inline|rounded|border-|shadow|hover:|focus:)/.test(cls)
    );
    expect(hasTailwind).toBe(false);
  });

  it('accepts an extra class via the class prop', () => {
    const { container } = render(Badge, { props: { class: 'extra-class' } });
    const el = container.querySelector('span');
    expect(el?.classList.contains('extra-class')).toBe(true);
  });

  it('renders children text content', () => {
    const { container } = render(BadgeFixture, { props: { content: 'New' } });
    const el = container.querySelector('[data-testid="badge-el"]');
    expect(el?.textContent?.trim()).toBe('New');
  });
});
