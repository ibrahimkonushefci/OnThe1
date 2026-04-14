import { StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { colors } from '../constants/colors';
import { radii, spacing } from '../constants/spacing';
import { lineHeights, typeScale } from '../constants/typography';
import { IconBadge } from './IconBadge';

type TipCardProps = {
  title: string;
  body: string;
  iconName?: React.ComponentProps<typeof Feather>['name'];
  tone?: 'primary' | 'secondary';
};

export function TipCard({
  title,
  body,
  iconName = 'book-open',
  tone = 'primary',
}: TipCardProps) {
  return (
    <View style={styles.card}>
      <IconBadge name={iconName} tone={tone} size={44} />
      <View style={styles.copy}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>{body}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: spacing.md,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.xl,
  },
  copy: {
    flex: 1,
    gap: spacing.sm,
  },
  title: {
    color: colors.text,
    fontSize: typeScale.section,
    fontWeight: '700',
  },
  body: {
    color: colors.textSoft,
    fontSize: typeScale.body,
    lineHeight: lineHeights.body,
  },
});
