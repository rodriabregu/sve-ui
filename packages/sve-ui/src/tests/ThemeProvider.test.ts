import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import ThemeProvider from '$lib/ThemeProvider.svelte';

describe('ThemeProvider', () => {
  it('scenario A: renders a div.sve-theme wrapper around children', () => {
    const { container } = render(ThemeProvider, {
      props: { colorScheme: 'light' as const },
    });
    const wrapper = container.querySelector('.sve-theme');
    expect(wrapper).not.toBeNull();
    expect(wrapper?.tagName).toBe('DIV');
  });

  it('scenario B: colorScheme="dark" adds class "dark" on the wrapper', () => {
    const { container } = render(ThemeProvider, {
      props: { colorScheme: 'dark' as const },
    });
    const wrapper = container.querySelector('.sve-theme');
    expect(wrapper?.classList.contains('dark')).toBe(true);
    expect(wrapper?.classList.contains('light')).toBe(false);
  });

  it('scenario B: colorScheme="light" adds class "light" on the wrapper', () => {
    const { container } = render(ThemeProvider, {
      props: { colorScheme: 'light' as const },
    });
    const wrapper = container.querySelector('.sve-theme');
    expect(wrapper?.classList.contains('light')).toBe(true);
    expect(wrapper?.classList.contains('dark')).toBe(false);
  });

  it('scenario C: theme override prop sets inline --sve-* CSS var on the wrapper element', () => {
    const { container } = render(ThemeProvider, {
      props: {
        colorScheme: 'light' as const,
        // PartialSveTheme allows overriding specific color roles and sub-tokens
        theme: {
          colors: {
            primary: { DEFAULT: '#ff0000' },
          },
        },
      },
    });
    const wrapper = container.querySelector('.sve-theme') as HTMLElement | null;
    expect(wrapper).not.toBeNull();
    const style = wrapper?.getAttribute('style') ?? '';
    expect(style).toContain('--sve-color-primary');
    expect(style).toContain('#ff0000');
  });
});
