import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../constants/colors';
import { radii, spacing } from '../constants/spacing';
import { lineHeights, typeScale } from '../constants/typography';

type AppHeaderProps = {
  title: string;
  subtitle?: string;
  onBackPress?: () => void;
  plainBackButton?: boolean;
  rightAccessory?: React.ReactNode;
};

export function AppHeader({
  title,
  subtitle,
  onBackPress,
  plainBackButton = false,
  rightAccessory,
}: AppHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        {onBackPress ? (
          <Pressable
            onPress={onBackPress}
            style={[styles.iconButton, plainBackButton && styles.iconButtonPlain]}
          >
            <Feather color={colors.text} name="chevron-left" size={20} />
          </Pressable>
        ) : (
          <View style={styles.sidePlaceholder} />
        )}

        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>

        {rightAccessory ? rightAccessory : <View style={styles.sidePlaceholder} />}
      </View>

      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: colors.text,
    fontSize: typeScale.screenTitle,
    fontWeight: '700',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: typeScale.bodyLarge,
    lineHeight: lineHeights.relaxed,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconButtonPlain: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  sidePlaceholder: {
    width: 36,
    height: 36,
  },
});
