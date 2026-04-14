import { StyleSheet, Text, View } from 'react-native';

import { ScreenLayout } from '../../components/ScreenLayout';
import { TipCard } from '../../components/TipCard';
import { appCopy } from '../../constants/copy';
import { colors } from '../../constants/colors';
import { learnContent } from '../../data/learnContent';
import { spacing } from '../../constants/spacing';
import { lineHeights, typeScale } from '../../constants/typography';

export function LearnScreen() {
  return (
    <ScreenLayout showAmbientGlow={false}>
      <View style={styles.header}>
        <Text style={styles.title}>{appCopy.learn.title}</Text>
        <Text style={styles.subtitle}>{appCopy.learn.subtitle}</Text>
      </View>

      <View style={styles.cards}>
        {learnContent.map((item, index) => (
          <TipCard
            body={item.body}
            iconName={item.iconName}
            key={item.title}
            title={item.title}
            tone={index === 3 ? 'secondary' : 'primary'}
          />
        ))}
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: spacing.sm,
  },
  title: {
    color: colors.text,
    fontSize: typeScale.title,
    fontWeight: '700',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: typeScale.bodyLarge,
    lineHeight: lineHeights.relaxed,
  },
  cards: {
    gap: spacing.md,
  },
});
