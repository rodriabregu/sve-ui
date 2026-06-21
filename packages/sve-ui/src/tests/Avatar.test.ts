import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import AvatarFixture from './AvatarFixture.svelte';

describe('Avatar', () => {
  it('renders root element with base class', () => {
    const { container } = render(AvatarFixture, { props: {} });
    const root = container.querySelector('[data-slot="avatar-root"]');
    expect(root).not.toBeNull();
  });

  it('applies size class for sm', () => {
    const { container } = render(AvatarFixture, { props: { size: 'sm' as const } });
    const root = container.querySelector('[data-slot="avatar-root"]');
    expect(root?.classList.contains('sve-avatar--sm')).toBe(true);
  });

  it('applies size class for lg', () => {
    const { container } = render(AvatarFixture, { props: { size: 'lg' as const } });
    const root = container.querySelector('[data-slot="avatar-root"]');
    expect(root?.classList.contains('sve-avatar--lg')).toBe(true);
  });

  it('applies default md size class when no size specified', () => {
    const { container } = render(AvatarFixture, { props: {} });
    const root = container.querySelector('[data-slot="avatar-root"]');
    expect(root?.classList.contains('sve-avatar--md')).toBe(true);
  });

  it('applies circle shape class by default', () => {
    const { container } = render(AvatarFixture, { props: {} });
    const root = container.querySelector('[data-slot="avatar-root"]');
    expect(root?.classList.contains('sve-avatar--circle')).toBe(true);
  });

  it('applies square shape class when shape=square', () => {
    const { container } = render(AvatarFixture, { props: { shape: 'square' as const } });
    const root = container.querySelector('[data-slot="avatar-root"]');
    expect(root?.classList.contains('sve-avatar--square')).toBe(true);
  });

  it('renders <img> element with the provided alt attribute', () => {
    const { container } = render(AvatarFixture, {
      props: { src: 'https://example.com/avatar.png', alt: 'User profile picture' },
    });
    const img = container.querySelector('img');
    expect(img).not.toBeNull();
    expect(img?.getAttribute('alt')).toBe('User profile picture');
  });

  it('renders fallback content when image is not loaded', () => {
    const { container } = render(AvatarFixture, { props: { src: '', alt: 'AB' } });
    // bits-ui renders Fallback with class sve-avatar__fallback when image is not loaded
    const fallback = container.querySelector('.sve-avatar__fallback');
    expect(fallback).not.toBeNull();
    expect(fallback?.textContent?.trim()).toBe('AB');
  });
});
