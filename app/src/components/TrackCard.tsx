import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../constants/colors';
import { radii, spacing } from '../constants/spacing';
import { typeScale } from '../constants/typography';

type TrackCardProps = {
  title: string;
  styleLabel: 'Salsa' | 'Bachata';
  bpm: number;
  onPress: () => void;
};

export function TrackCard({
  title,
  styleLabel,
  bpm,
  onPress,
}: TrackCardProps) {
  const isSalsa = styleLabel === 'Salsa';

  return (
    <View style={styles.card}>
      <View style={styles.copy}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.metaRow}>
          <View
            style={[
              styles.styleChip,
              isSalsa ? styles.salsaChip : styles.bachataChip,
            ]}
          >
            <Text
              style={[
                styles.styleChipLabel,
                isSalsa ? styles.salsaLabel : styles.bachataLabel,
              ]}
            >
              {styleLabel}
            </Text>
          </View>
          <Text style={styles.bpm}>{bpm} BPM</Text>
        </View>
      </View>
      <Pressable accessibilityRole="button" onPress={onPress} style={styles.playButton}>
        <Feather color={colors.primary} name="play" size={20} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.xl,
  },
  copy: {
    flex: 1,
    gap: spacing.md,
  },
  title: {
    color: colors.text,
    fontSize: typeScale.section,
    fontWeight: '700',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
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
  bpm: {
    color: colors.textMuted,
    fontSize: typeScale.body,
    fontWeight: '600',
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primarySoft,
  },
});
