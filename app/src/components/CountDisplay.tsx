import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../constants/colors';
import { radii, spacing } from '../constants/spacing';
import { typeScale } from '../constants/typography';

type CountDisplayProps = {
  pattern: 'salsa' | 'bachata';
  activeStep?: number;
};

const patterns = {
  salsa: ['1', '2', '3', '5', '6', '7'],
  bachata: ['1', '2', '3', 'Tap'],
} as const;

export function CountDisplay({
  pattern,
  activeStep = 0,
}: CountDisplayProps) {
  const items = patterns[pattern];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Count Preview</Text>
      <View style={styles.row}>
        {items.map((item, index) => {
          const isActive = index === activeStep;
          const isAccent =
            item === '1' || (pattern === 'salsa' && item === '5');

          return (
            <View
              key={`${pattern}-${item}-${index}`}
              style={[
                styles.step,
                isAccent && styles.stepAccent,
                isActive && styles.stepActive,
              ]}
            >
              <Text
                style={[
                  styles.stepLabel,
                  isAccent && styles.stepLabelAccent,
                  isActive && styles.stepLabelActive,
                ]}
              >
                {item}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  label: {
    color: colors.textMuted,
    fontSize: typeScale.label,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  step: {
    minWidth: 52,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceMuted,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    alignItems: 'center',
  },
  stepAccent: {
    backgroundColor: colors.secondaryAccentSoft,
  },
  stepActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  stepLabel: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '700',
  },
  stepLabelAccent: {
    color: colors.white,
  },
  stepLabelActive: {
    color: colors.black,
  },
});
