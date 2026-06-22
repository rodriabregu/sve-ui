/**
 * sve-ui main entry point.
 *
 * Exports: ThemeProvider, Button, Dialog namespace, Text, Heading, Badge, Avatar, Spinner,
 * Card namespace, Alert namespace, Input,
 * variant helper + types, theme types.
 */

// Components
export { default as ThemeProvider } from './ThemeProvider.svelte';
export { default as Button } from './components/Button/Button.svelte';
export { default as Text } from './components/Text/Text.svelte';
export { default as Heading } from './components/Heading/Heading.svelte';
export { default as Badge } from './components/Badge/Badge.svelte';
export { default as Spinner } from './components/Spinner/Spinner.svelte';
export { default as Input } from './components/Input/Input.svelte';

// Dialog namespace (composed over bits-ui)
export * as Dialog from './components/Dialog/index.js';

// DropdownMenu namespace (composed over bits-ui)
export * as DropdownMenu from './components/DropdownMenu/index.js';

// Tooltip namespace (composed over bits-ui)
export * as Tooltip from './components/Tooltip/index.js';

// Popover namespace (composed over bits-ui)
export * as Popover from './components/Popover/index.js';

// Avatar namespace (composed over bits-ui)
export * as Avatar from './components/Avatar/index.js';

// Card namespace
export * as Card from './components/Card/index.js';

// Alert namespace
export * as Alert from './components/Alert/index.js';

// Button variant types
export { buttonVariants } from './components/Button/Button.svelte';

// Badge variant types
export { badgeVariants, type Variant as BadgeVariant, type Color as BadgeColor, type Size as BadgeSize } from './components/Badge/Badge.svelte';

// Card variant types
export { cardVariants, type Variant as CardVariant, type Padding as CardPadding } from './components/Card/CardRoot.svelte';

// Alert variant types
export { alertVariants, type Color as AlertColor, type Variant as AlertVariant } from './components/Alert/AlertRoot.svelte';

// Input variant types
export { inputVariants, type Size as InputSize, type Variant as InputVariant } from './components/Input/Input.svelte';

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
