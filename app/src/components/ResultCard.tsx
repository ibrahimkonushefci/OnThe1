import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../constants/colors';
import { radii, spacing } from '../constants/spacing';
import { lineHeights, typeScale } from '../constants/typography';

type ResultCardProps = {
  styleLabel: 'Salsa' | 'Bachata';
  bpmLabel?: string;
  bpmValue: string;
  statusText: string;
};

export function ResultCard({
  styleLabel,
  bpmLabel = 'Estimated BPM',
  bpmValue,
  statusText,
}: ResultCardProps) {
  const isSalsa = styleLabel === 'Salsa';

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={[styles.styleChip, isSalsa ? styles.salsaChip : styles.bachataChip]}>
          <Text style={[styles.styleChipLabel, isSalsa ? styles.salsaLabel : styles.bachataLabel]}>
            {styleLabel}
          </Text>
        </View>
        <Text style={styles.metaLabel}>{bpmLabel}</Text>
      </View>
      <Text style={styles.bpmValue}>{bpmValue}</Text>
      <Text style={styles.statusText}>{statusText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.xl,
    gap: spacing.sm,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  styleChip: {
    borderRadius: radii.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  salsaChip: {
    backgroundColor: colors.primarySoft,
  },
  bachataChip: {
    backgroundColor: colors.secondaryAccentSoft,
  },
  styleChipLabel: {
    fontSize: typeScale.label,
    fontWeight: '700',
  },
  salsaLabel: {
    color: colors.primary,
  },
  bachataLabel: {
    color: colors.secondaryAccent,
  },
  metaLabel: {
    color: colors.textMuted,
    fontSize: typeScale.label,
    fontWeight: '600',
  },
  bpmValue: {
    color: colors.text,
    fontSize: typeScale.hero,
    fontWeight: '800',
  },
  statusText: {
    color: colors.textSoft,
    fontSize: typeScale.body,
    lineHeight: lineHeights.body,
  },
});
