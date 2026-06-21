/**
 * Semantic token definitions and typed SveTheme interface.
 * CSS custom properties use the naming convention: --sve-<category>-<name>[-<state>]
 */

import { primaryScale, secondaryScale, successScale, warningScale, dangerScale, defaultScale } from './palette';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SveColorRole {
  /** Primary fill color */
  DEFAULT: string;
  /** Text/icon color on that fill */
  foreground: string;
  /** Light tinted background */
  surface: string;
  /** Border or outline color */
  border: string;
  /** Hover state fill */
  hover: string;
  /** Active/pressed state fill */
  active: string;
}

export interface SveColors {
  primary:   SveColorRole;
  secondary: SveColorRole;
  success:   SveColorRole;
  warning:   SveColorRole;
  danger:    SveColorRole;
  default:   SveColorRole;
  /** Semi-transparent overlay used by Dialog backdrop */
  overlay:   string;
}

export interface SveSpacing {
  1:  string;
  2:  string;
  3:  string;
  4:  string;
  5:  string;
  6:  string;
  8:  string;
  10: string;
  12: string;
  16: string;
}

export interface SveRadius {
  none: string;
  sm:   string;
  md:   string;
  lg:   string;
  full: string;
}

export interface SveShadow {
  sm: string;
  md: string;
}

export interface SveTypography {
  family: {
    sans: string;
  };
  size: {
    sm: string;
    md: string;
    lg: string;
  };
  weight: {
    normal: string;
    medium: string;
    bold:   string;
  };
  lineHeight: {
    tight:   string;
    normal:  string;
    relaxed: string;
  };
}

export interface SveTheme {
  colors:     SveColors;
  spacing:    SveSpacing;
  radius:     SveRadius;
  shadow:     SveShadow;
  typography: SveTypography;
}

/**
 * Deeply partial version of SveTheme — used for override props.
 * Allows consumers to override any individual token without providing the full set.
 */
export type PartialSveTheme = {
  colors?: {
    [K in keyof SveColors]?: Partial<SveColorRole>;
  };
  spacing?:    Partial<SveSpacing>;
  radius?:     Partial<SveRadius>;
  shadow?:     Partial<SveShadow>;
  typography?: {
    family?:     Partial<SveTypography['family']>;
    size?:       Partial<SveTypography['size']>;
    weight?:     Partial<SveTypography['weight']>;
    lineHeight?: Partial<SveTypography['lineHeight']>;
  };
};

// ---------------------------------------------------------------------------
// Light tokens
// ---------------------------------------------------------------------------

export const lightTokens: SveTheme = {
  colors: {
    primary: {
      DEFAULT:    primaryScale[500],
      foreground: '#ffffff',
      surface:    primaryScale[50],
      border:     primaryScale[300],
      hover:      primaryScale[600],
      active:     primaryScale[700],
    },
    secondary: {
      DEFAULT:    secondaryScale[500],
      foreground: '#ffffff',
      surface:    secondaryScale[50],
      border:     secondaryScale[300],
      hover:      secondaryScale[600],
      active:     secondaryScale[700],
    },
    success: {
      DEFAULT:    successScale[500],
      foreground: '#ffffff',
      surface:    successScale[50],
      border:     successScale[300],
      hover:      successScale[600],
      active:     successScale[700],
    },
    warning: {
      DEFAULT:    warningScale[400],
      foreground: '#1a202c',
      surface:    warningScale[50],
      border:     warningScale[300],
      hover:      warningScale[500],
      active:     warningScale[600],
    },
    danger: {
      DEFAULT:    dangerScale[500],
      foreground: '#ffffff',
      surface:    dangerScale[50],
      border:     dangerScale[300],
      hover:      dangerScale[600],
      active:     dangerScale[700],
    },
    default: {
      DEFAULT:    defaultScale[200],
      foreground: defaultScale[800],
      surface:    defaultScale[50],
      border:     defaultScale[300],
      hover:      defaultScale[300],
      active:     defaultScale[400],
    },
    overlay: 'rgb(0 0 0 / 0.5)',
  },
  spacing: {
    1:  '0.25rem',
    2:  '0.5rem',
    3:  '0.75rem',
    4:  '1rem',
    5:  '1.25rem',
    6:  '1.5rem',
    8:  '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
  },
  radius: {
    none: '0',
    sm:   '0.125rem',
    md:   '0.375rem',
    lg:   '0.5rem',
    full: '9999px',
  },
  shadow: {
    sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  },
  typography: {
    family: {
      sans: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    },
    size: {
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
    },
    weight: {
      normal: '400',
      medium: '500',
      bold:   '700',
    },
    lineHeight: {
      tight:   '1.25',
      normal:  '1.5',
      relaxed: '1.75',
    },
  },
};

// ---------------------------------------------------------------------------
// Dark tokens
// ---------------------------------------------------------------------------

export const darkTokens: SveTheme = {
  colors: {
    primary: {
      DEFAULT:    primaryScale[400],
      foreground: '#ffffff',
      surface:    primaryScale[900],
      border:     primaryScale[700],
      hover:      primaryScale[300],
      active:     primaryScale[200],
    },
    secondary: {
      DEFAULT:    secondaryScale[400],
      foreground: '#ffffff',
      surface:    secondaryScale[900],
      border:     secondaryScale[700],
      hover:      secondaryScale[300],
      active:     secondaryScale[200],
    },
    success: {
      DEFAULT:    successScale[400],
      foreground: '#ffffff',
      surface:    successScale[900],
      border:     successScale[700],
      hover:      successScale[300],
      active:     successScale[200],
    },
    warning: {
      DEFAULT:    warningScale[300],
      foreground: '#1a202c',
      surface:    warningScale[900],
      border:     warningScale[700],
      hover:      warningScale[200],
      active:     warningScale[100],
    },
    danger: {
      DEFAULT:    dangerScale[400],
      foreground: '#ffffff',
      surface:    dangerScale[900],
      border:     dangerScale[700],
      hover:      dangerScale[300],
      active:     dangerScale[200],
    },
    default: {
      DEFAULT:    defaultScale[600],
      foreground: defaultScale[100],
      surface:    defaultScale[800],
      border:     defaultScale[600],
      hover:      defaultScale[500],
      active:     defaultScale[400],
    },
    overlay: 'rgb(0 0 0 / 0.7)',
  },
  spacing: lightTokens.spacing,
  radius: lightTokens.radius,
  shadow: {
    sm: '0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px -1px rgb(0 0 0 / 0.4)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.5), 0 2px 4px -2px rgb(0 0 0 / 0.5)',
  },
  typography: lightTokens.typography,
};

// Freeze shared sub-objects so mutating darkTokens.spacing cannot silently
// corrupt lightTokens.spacing (they share the same reference).
Object.freeze(lightTokens.spacing);
Object.freeze(lightTokens.radius);
Object.freeze(lightTokens.shadow);
Object.freeze(lightTokens.typography.family);
Object.freeze(lightTokens.typography.size);
Object.freeze(lightTokens.typography.weight);
Object.freeze(lightTokens.typography.lineHeight);
Object.freeze(lightTokens.typography);
Object.freeze(lightTokens);
Object.freeze(darkTokens);

// ---------------------------------------------------------------------------
// themeToVars helper
// ---------------------------------------------------------------------------

type NestedRecord = Record<string, string | Record<string, string | Record<string, string>>>;

function flattenToVars(obj: NestedRecord, prefix: string): string {
  let result = '';
  for (const [key, value] of Object.entries(obj)) {
    const cssKey = key === 'DEFAULT' ? prefix : `${prefix}-${camelToKebab(key)}`;
    if (typeof value === 'string') {
      result += `${cssKey}:${value};`;
    } else {
      result += flattenToVars(value as NestedRecord, cssKey);
    }
  }
  return result;
}

function camelToKebab(str: string): string {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}

/**
 * Serializes a partial SveTheme override into an inline CSS variable string
 * suitable for setting as the `style` attribute on the ThemeProvider wrapper.
 *
 * Example: `themeToVars({ colors: { primary: { DEFAULT: '#ff0000' } } })`
 * → `"--sve-color-primary:#ff0000;"`
 */
export function themeToVars(theme: PartialSveTheme): string {
  let vars = '';

  if (theme.colors) {
    vars += flattenToVars(theme.colors as unknown as NestedRecord, '--sve-color');
  }
  if (theme.spacing) {
    vars += flattenToVars(theme.spacing as unknown as NestedRecord, '--sve-space');
  }
  if (theme.radius) {
    vars += flattenToVars(theme.radius as unknown as NestedRecord, '--sve-radius');
  }
  if (theme.shadow) {
    vars += flattenToVars(theme.shadow as unknown as NestedRecord, '--sve-shadow');
  }
  if (theme.typography) {
    // Each typography sub-group maps to a distinct CSS variable namespace.
    // Handled individually so generated var names match theme.css exactly:
    //   family   → --sve-font-family-*
    //   size     → --sve-font-size-*
    //   weight   → --sve-font-weight-*
    //   lineHeight → --sve-line-height-* (note: no "font" in this prefix)
    const typo = theme.typography;
    if (typo.family)     vars += flattenToVars(typo.family     as unknown as NestedRecord, '--sve-font-family');
    if (typo.size)       vars += flattenToVars(typo.size       as unknown as NestedRecord, '--sve-font-size');
    if (typo.weight)     vars += flattenToVars(typo.weight     as unknown as NestedRecord, '--sve-font-weight');
    if (typo.lineHeight) vars += flattenToVars(typo.lineHeight as unknown as NestedRecord, '--sve-line-height');
  }

  return vars;
}
