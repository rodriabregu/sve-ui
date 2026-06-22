import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import AlertFixture from './AlertFixture.svelte';

describe('Alert.Root', () => {
  it('renders a <div> element with base class', () => {
    const { container } = render(AlertFixture, { props: {} });
    const el = container.querySelector('[data-testid="alert-root"]');
    expect(el?.tagName.toLowerCase()).toBe('div');
    expect(el?.classList.contains('sve-alert')).toBe(true);
  });

  it('applies subtle variant by default', () => {
    const { container } = render(AlertFixture, { props: {} });
    const el = container.querySelector('[data-testid="alert-root"]');
    expect(el?.classList.contains('sve-alert--subtle')).toBe(true);
  });

  it('applies solid variant', () => {
    const { container } = render(AlertFixture, { props: { variant: 'solid' as const } });
    const el = container.querySelector('[data-testid="alert-root"]');
    expect(el?.classList.contains('sve-alert--solid')).toBe(true);
  });

  it('applies outline variant', () => {
    const { container } = render(AlertFixture, { props: { variant: 'outline' as const } });
    const el = container.querySelector('[data-testid="alert-root"]');
    expect(el?.classList.contains('sve-alert--outline')).toBe(true);
  });

  it('applies default color by default', () => {
    const { container } = render(AlertFixture, { props: {} });
    const el = container.querySelector('[data-testid="alert-root"]');
    expect(el?.classList.contains('sve-c-default')).toBe(true);
  });

  it('applies primary color', () => {
    const { container } = render(AlertFixture, { props: { color: 'primary' as const } });
    const el = container.querySelector('[data-testid="alert-root"]');
    expect(el?.classList.contains('sve-c-primary')).toBe(true);
  });

  it('applies success color', () => {
    const { container } = render(AlertFixture, { props: { color: 'success' as const } });
    const el = container.querySelector('[data-testid="alert-root"]');
    expect(el?.classList.contains('sve-c-success')).toBe(true);
  });

  it('applies warning color', () => {
    const { container } = render(AlertFixture, { props: { color: 'warning' as const } });
    const el = container.querySelector('[data-testid="alert-root"]');
    expect(el?.classList.contains('sve-c-warning')).toBe(true);
  });

  it('applies danger color', () => {
    const { container } = render(AlertFixture, { props: { color: 'danger' as const } });
    const el = container.querySelector('[data-testid="alert-root"]');
    expect(el?.classList.contains('sve-c-danger')).toBe(true);
  });

  it('has role="alert" for danger color', () => {
    const { container } = render(AlertFixture, { props: { color: 'danger' as const } });
    const el = container.querySelector('[data-testid="alert-root"]');
    expect(el?.getAttribute('role')).toBe('alert');
  });

  it('has role="alert" for warning color', () => {
    const { container } = render(AlertFixture, { props: { color: 'warning' as const } });
    const el = container.querySelector('[data-testid="alert-root"]');
    expect(el?.getAttribute('role')).toBe('alert');
  });

  it('has role="status" for non-danger/warning colors', () => {
    const { container } = render(AlertFixture, { props: { color: 'success' as const } });
    const el = container.querySelector('[data-testid="alert-root"]');
    expect(el?.getAttribute('role')).toBe('status');
  });

  it('has role="status" for default color', () => {
    const { container } = render(AlertFixture, { props: {} });
    const el = container.querySelector('[data-testid="alert-root"]');
    expect(el?.getAttribute('role')).toBe('status');
  });

  it('accepts an extra class via the class prop', () => {
    const { container } = render(AlertFixture, { props: { class: 'extra-alert-class' } });
    const el = container.querySelector('[data-testid="alert-root"]');
    expect(el?.classList.contains('extra-alert-class')).toBe(true);
  });

  it('contains no Tailwind utility classes', () => {
    const { container } = render(AlertFixture, { props: { color: 'primary' as const, variant: 'solid' as const } });
    const el = container.querySelector('[data-testid="alert-root"]');
    const classList = Array.from(el?.classList ?? []);
    const hasTailwind = classList.some((cls) =>
      /^(bg-|text-|p-|px-|py-|m-|mx-|my-|flex|grid|block|inline|rounded|border-|shadow|hover:|focus:)/.test(cls)
    );
    expect(hasTailwind).toBe(false);
  });
});

describe('Alert.Title', () => {
  it('renders title with base class', () => {
    const { container } = render(AlertFixture, { props: {} });
    const el = container.querySelector('[data-testid="alert-title"]');
    expect(el).not.toBeNull();
    expect(el?.classList.contains('sve-alert__title')).toBe(true);
  });

  it('renders title text content', () => {
    const { container } = render(AlertFixture, { props: {} });
    const el = container.querySelector('[data-testid="alert-title"]');
    expect(el?.textContent?.trim()).toBe('Alert title');
  });
});

describe('Alert.Description', () => {
  it('renders description with base class', () => {
    const { container } = render(AlertFixture, { props: {} });
    const el = container.querySelector('[data-testid="alert-description"]');
    expect(el).not.toBeNull();
    expect(el?.classList.contains('sve-alert__description')).toBe(true);
  });

  it('renders description text content', () => {
    const { container } = render(AlertFixture, { props: {} });
    const el = container.querySelector('[data-testid="alert-description"]');
    expect(el?.textContent?.trim()).toBe('Alert description');
  });
});
