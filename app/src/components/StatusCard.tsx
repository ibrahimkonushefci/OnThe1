import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../constants/colors';
import { radii, spacing } from '../constants/spacing';
import { lineHeights, typeScale } from '../constants/typography';

type StatusCardProps = {
  eyebrow: string;
  title: string;
  body: string;
  tone?: 'primary' | 'success' | 'warning';
};

const tones = {
  primary: {
    dot: colors.primary,
    accent: colors.primarySoft,
  },
  success: {
    dot: colors.success,
    accent: colors.successSoft,
  },
  warning: {
    dot: colors.warning,
    accent: colors.warningSoft,
  },
} as const;

export function StatusCard({
  eyebrow,
  title,
  body,
  tone = 'primary',
}: StatusCardProps) {
  return (
    <View style={[styles.card, { backgroundColor: colors.surfaceMuted }]}>
      <View style={styles.eyebrowRow}>
        <View style={[styles.dot, { backgroundColor: tones[tone].dot }]} />
        <Text style={styles.eyebrow}>{eyebrow}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
      <View style={[styles.pulseBar, { backgroundColor: tones[tone].accent }]}>
        <View style={[styles.pulseFill, { backgroundColor: tones[tone].dot }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
    gap: spacing.sm,
  },
  eyebrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: radii.pill,
  },
  eyebrow: {
    color: colors.textMuted,
    fontSize: typeScale.label,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  title: {
    color: colors.text,
    fontSize: typeScale.section,
    fontWeight: '700',
  },
  body: {
    color: colors.textMuted,
    fontSize: typeScale.body,
    lineHeight: lineHeights.body,
  },
  pulseBar: {
    marginTop: spacing.sm,
    height: 6,
    borderRadius: radii.pill,
    overflow: 'hidden',
  },
  pulseFill: {
    width: '48%',
    height: '100%',
    borderRadius: radii.pill,
  },
});
