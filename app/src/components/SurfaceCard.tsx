import type { PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../constants/colors';
import { radii, spacing } from '../constants/spacing';
import { typeScale } from '../constants/typography';

type SurfaceCardProps = PropsWithChildren<{
  title?: string;
  body?: string;
}>;

export function SurfaceCard({ children, title, body }: SurfaceCardProps) {
  return (
    <View style={styles.card}>
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
  },
  title: {
    color: colors.text,
    fontSize: typeScale.bodyLarge,
    fontWeight: '700',
  },
  body: {
    color: colors.textMuted,
    fontSize: typeScale.body,
    lineHeight: 24,
  },
});
