import { sizes } from './sizes';
import { radius } from './radius';
import { spacing } from './spacing';
import { typography } from './typography';
import { breakpoints } from './breakpoints';

export const theme = {
  colors: {
    primary: '#F56565',
    secondary: '#ED8936',
    tertiary: '#ECC94B',
    dark: '#2D3748',
    light: '#EDF2F7',
  },
  sizes,
  spacing,
  radius,
  breakpoints,
  ...typography
};
