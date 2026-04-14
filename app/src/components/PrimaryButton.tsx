import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { colors } from '../constants/colors';
import { radii, spacing } from '../constants/spacing';
import { typeScale } from '../constants/typography';

type PrimaryButtonProps = {
  label: string;
  variant?: 'primary' | 'secondary';
  icon?: ComponentProps<typeof Feather>['name'];
} & Omit<ComponentProps<typeof Pressable>, 'style'>;

export function PrimaryButton({
  label,
  variant = 'primary',
  disabled,
  icon,
  ...pressableProps
}: PrimaryButtonProps) {
  const isPrimary = variant === 'primary';

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        isPrimary ? styles.primary : styles.secondary,
        disabled && styles.disabled,
        pressed && !disabled && (isPrimary ? styles.primaryPressed : styles.secondaryPressed),
      ]}
      {...pressableProps}
    >
      <View style={styles.content}>
        <Text style={[styles.label, !isPrimary && styles.secondaryLabel]}>{label}</Text>
        {icon ? (
          <Feather
            color={isPrimary ? colors.black : colors.text}
            name={icon}
            size={18}
          />
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.md,
    paddingHorizontal: spacing.lg,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  primaryPressed: {
    backgroundColor: colors.primaryPressed,
  },
  secondary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryPressed: {
    backgroundColor: colors.surfaceElevated,
  },
  disabled: {
    opacity: 0.6,
  },
  label: {
    color: colors.black,
    fontSize: typeScale.body,
    fontWeight: '700',
  },
  secondaryLabel: {
    color: colors.text,
  },
});
