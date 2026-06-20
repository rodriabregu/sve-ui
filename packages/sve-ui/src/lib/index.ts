/**
 * sve-ui main entry point.
 *
 * Exports: ThemeProvider, Button, Dialog namespace, variant helper + types, theme types.
 */

// Components
export { default as ThemeProvider } from './ThemeProvider.svelte';
export { default as Button } from './components/Button/Button.svelte';

// Dialog namespace (composed over bits-ui)
export * as Dialog from './components/Dialog/index.js';

// Variant helper and types
export {
  defineVariants,
  type VariantSchema,
  type VariantConfig,
  type VariantProps,
} from './internal/variants';

// Theme context utilities
export { useTheme, type ThemeContext } from './context';

// Theme types and token maps (re-export from theme subpath for convenience)
export {
  lightTokens,
  darkTokens,
  themeToVars,
  type SveTheme,
  type PartialSveTheme,
  type SveColors,
  type SveColorRole,
  type SveSpacing,
  type SveRadius,
  type SveTypography,
} from './theme/tokens';
