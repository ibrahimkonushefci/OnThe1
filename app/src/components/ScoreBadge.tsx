import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../constants/colors';
import { radii, spacing } from '../constants/spacing';
import { typeScale } from '../constants/typography';

type ScoreBadgeProps = {
  label: string;
  value: string;
  tone?: 'primary' | 'success' | 'warning';
};

const tones = {
  primary: {
    backgroundColor: colors.primarySoft,
    valueColor: colors.primary,
  },
  success: {
    backgroundColor: colors.successSoft,
    valueColor: colors.success,
  },
  warning: {
    backgroundColor: colors.warningSoft,
    valueColor: colors.warning,
  },
} as const;

export function ScoreBadge({
  label,
  value,
  tone = 'primary',
}: ScoreBadgeProps) {
  return (
    <View style={[styles.card, { backgroundColor: tones[tone].backgroundColor }]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, { color: tones[tone].valueColor }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 72,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    gap: spacing.xs,
    justifyContent: 'center',
  },
  label: {
    color: colors.textMuted,
    fontSize: typeScale.caption,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  value: {
    fontSize: typeScale.section,
    fontWeight: '800',
  },
});
