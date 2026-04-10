import { StyleSheet, Switch, Text, View } from 'react-native';

import { colors } from '../constants/colors';
import { radii, spacing } from '../constants/spacing';
import { typeScale } from '../constants/typography';

type ToggleRowProps = {
  label: string;
  description?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

export function ToggleRow({
  label,
  description,
  value,
  onValueChange,
}: ToggleRowProps) {
  return (
    <View style={styles.container}>
      <View style={styles.copyWrap}>
        <Text style={styles.label}>{label}</Text>
        {description ? <Text style={styles.description}>{description}</Text> : null}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        thumbColor={value ? '#F9FCFF' : '#FFFFFF'}
        trackColor={{ false: '#2E3241', true: colors.primary }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  copyWrap: {
    flex: 1,
    gap: spacing.xs,
  },
  label: {
    color: colors.text,
    fontSize: typeScale.body,
    fontWeight: '600',
  },
  description: {
    color: colors.textMuted,
    fontSize: typeScale.caption,
    lineHeight: 18,
  },
});
