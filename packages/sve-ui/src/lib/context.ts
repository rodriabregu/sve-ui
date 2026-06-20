import { setContext, getContext } from 'svelte';

const THEME_CONTEXT_KEY = Symbol('sve-ui:theme');

export interface ThemeContext {
  readonly colorScheme: 'light' | 'dark' | 'system';
}

/**
 * Sets the theme context for the current component tree.
 * Call this in the ThemeProvider component's script section.
 */
export function setThemeContext(ctx: ThemeContext): void {
  setContext(THEME_CONTEXT_KEY, ctx);
}

/**
 * Retrieves the theme context set by a parent ThemeProvider.
 * Returns undefined if no ThemeProvider is in the tree.
 */
export function useTheme(): ThemeContext | undefined {
  return getContext<ThemeContext>(THEME_CONTEXT_KEY);
}
