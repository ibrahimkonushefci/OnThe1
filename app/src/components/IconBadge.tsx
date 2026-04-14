import { Feather } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { colors } from '../constants/colors';
import { radii } from '../constants/spacing';

type IconBadgeProps = {
  name: React.ComponentProps<typeof Feather>['name'];
  tone?: 'primary' | 'secondary' | 'success' | 'warning';
  size?: number;
};

const tones = {
  primary: {
    backgroundColor: colors.primarySoft,
    iconColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondaryAccentSoft,
    iconColor: colors.secondaryAccent,
  },
  success: {
    backgroundColor: colors.successSoft,
    iconColor: colors.success,
  },
  warning: {
    backgroundColor: colors.warningSoft,
    iconColor: colors.warning,
  },
} as const;

export function IconBadge({
  name,
  tone = 'primary',
  size = 52,
}: IconBadgeProps) {
  return (
    <View
      style={[
        styles.base,
        {
          width: size,
          height: size,
          backgroundColor: tones[tone].backgroundColor,
        },
      ]}
    >
      <Feather color={tones[tone].iconColor} name={name} size={Math.round(size * 0.46)} />
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
