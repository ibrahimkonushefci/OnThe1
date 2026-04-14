import type { Theme } from '@react-navigation/native';

export const colors = {
  background: '#090A12',
  backgroundAlt: '#0D1020',
  surface: '#171821',
  surfaceElevated: '#1E202B',
  surfaceMuted: '#131520',
  border: '#2A2D3A',
  divider: '#222533',
  text: '#F4F5F7',
  textMuted: '#A3A8BA',
  textSoft: '#C8CDDB',
  primary: '#19C7F3',
  primaryPressed: '#11A9D0',
  primarySoft: 'rgba(25, 199, 243, 0.16)',
  secondaryAccent: '#7352F6',
  secondaryAccentSoft: 'rgba(115, 82, 246, 0.16)',
  success: '#1DD8A3',
  successSoft: 'rgba(29, 216, 163, 0.16)',
  warning: '#FFAA5C',
  warningSoft: 'rgba(255, 170, 92, 0.16)',
  error: '#FF6B6B',
  errorSoft: 'rgba(255, 107, 107, 0.16)',
  tabInactive: '#7D8191',
  black: '#000000',
  white: '#FFFFFF',
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
