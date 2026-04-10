import type { Theme } from '@react-navigation/native';

export const colors = {
  background: '#090A12',
  surface: '#171821',
  surfaceElevated: '#1E202B',
  border: '#2A2D3A',
  text: '#F4F5F7',
  textMuted: '#A3A8BA',
  primary: '#19C7F3',
  primaryPressed: '#11A9D0',
  secondaryAccent: '#7352F6',
  success: '#1DD8A3',
  warning: '#FFAA5C',
  error: '#FF6B6B',
  tabInactive: '#7D8191',
  black: '#000000',
} as const;

export const navigationTheme: Theme = {
  dark: true,
  colors: {
    primary: colors.primary,
    background: colors.background,
    card: colors.surface,
    text: colors.text,
    border: colors.border,
    notification: colors.secondaryAccent,
  },
  fonts: {
    regular: {
      fontFamily: 'System',
      fontWeight: '400',
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500',
    },
    bold: {
      fontFamily: 'System',
      fontWeight: '700',
    },
    heavy: {
      fontFamily: 'System',
      fontWeight: '800',
    },
  },
};
