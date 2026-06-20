/**
 * Color palette scales — raw values (50–900) per semantic family.
 * Seeded from the original flat colors and expanded to full 9-stop scales.
 * Components should NOT import these directly — use semantic tokens instead.
 */

export const primaryScale = {
  50:  '#fff5f5',
  100: '#fed7d7',
  200: '#feb2b2',
  300: '#fc8181',
  400: '#f87171',
  500: '#f56565', // original primary
  600: '#e53e3e',
  700: '#c53030',
  800: '#9b2c2c',
  900: '#742a2a',
} as const;

export const secondaryScale = {
  50:  '#fffaf0',
  100: '#feebc8',
  200: '#fbd38d',
  300: '#f6ad55',
  400: '#ed9e40',
  500: '#ed8936', // original secondary
  600: '#dd6b20',
  700: '#c05621',
  800: '#9c4221',
  900: '#7b341e',
} as const;

export const successScale = {
  50:  '#f0fff4',
  100: '#c6f6d5',
  200: '#9ae6b4',
  300: '#68d391',
  400: '#48bb78',
  500: '#38a169',
  600: '#2f855a',
  700: '#276749',
  800: '#22543d',
  900: '#1c4532',
} as const;

export const warningScale = {
  50:  '#fffff0',
  100: '#fefcbf',
  200: '#faf089',
  300: '#f6e05e',
  400: '#ecc94b', // original tertiary/warning
  500: '#d69e2e',
  600: '#b7791f',
  700: '#975a16',
  800: '#744210',
  900: '#5f370e',
} as const;

export const dangerScale = {
  50:  '#fff5f5',
  100: '#fed7d7',
  200: '#fc8181',
  300: '#f56565',
  400: '#e53e3e',
  500: '#c53030',
  600: '#9b2c2c',
  700: '#822727',
  800: '#63171b',
  900: '#3d0a0a',
} as const;

export const defaultScale = {
  50:  '#f7fafc',
  100: '#edf2f7', // original light
  200: '#e2e8f0',
  300: '#cbd5e0',
  400: '#a0aec0',
  500: '#718096',
  600: '#4a5568',
  700: '#2d3748', // original dark
  800: '#1a202c',
  900: '#171923',
} as const;

export type PaletteScale = typeof primaryScale;

export const palette = {
  primary:   primaryScale,
  secondary: secondaryScale,
  success:   successScale,
  warning:   warningScale,
  danger:    dangerScale,
  default:   defaultScale,
} as const;
