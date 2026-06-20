/**
 * sve-ui/theme subpath export
 *
 * Re-exports all token types, scales, and token maps.
 * The old flat `theme` export has been removed (WU-2 restructure).
 */

// Palette scales (raw color values — use semantic tokens in components)
export {
  palette,
  primaryScale,
  secondaryScale,
  successScale,
  warningScale,
  dangerScale,
  defaultScale,
  type PaletteScale,
} from './palette';

// Semantic token maps and types
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
} from './tokens';

// Convenience grouped export: import { tokens } from 'sve-ui/theme'
import { lightTokens, darkTokens } from './tokens';
export const tokens = { light: lightTokens, dark: darkTokens };
