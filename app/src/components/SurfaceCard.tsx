import type { PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../constants/colors';
import { radii, shadows, spacing } from '../constants/spacing';
import { lineHeights, typeScale } from '../constants/typography';

type SurfaceCardProps = PropsWithChildren<{
  title?: string;
  body?: string;
  accentColor?: string;
}>;

export function SurfaceCard({
  children,
  title,
  body,
  accentColor,
}: SurfaceCardProps) {
  return (
    <View style={[styles.card, accentColor ? { borderColor: accentColor } : null]}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      {body ? <Text style={styles.body}>{body}</Text> : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.md,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.xl,
    ...shadows.card,
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
});
