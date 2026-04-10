import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { ScreenLayout } from '../../components/ScreenLayout';
import { SurfaceCard } from '../../components/SurfaceCard';
import { appCopy } from '../../constants/copy';
import { colors } from '../../constants/colors';
import { learnContent } from '../../data/learnContent';
import { radii, spacing } from '../../constants/spacing';
import { typeScale } from '../../constants/typography';

export function LearnScreen() {
  return (
    <ScreenLayout>
      <View style={styles.header}>
        <Text style={styles.title}>{appCopy.learn.title}</Text>
        <Text style={styles.subtitle}>{appCopy.learn.subtitle}</Text>
      </View>

      <View style={styles.cards}>
        {learnContent.map((item) => (
          <SurfaceCard body={item.body} key={item.title} title={item.title}>
            <View style={styles.iconBubble}>
              <Feather color={colors.primary} name="book-open" size={18} />
            </View>
          </SurfaceCard>
        ))}
      </View>

      <SurfaceCard
        body="Phase 1 uses static placeholder tips only. Final Learn content layout can be refined in a later UI phase."
        title="Static content foundation"
      />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: spacing.sm,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: typeScale.bodyLarge,
    lineHeight: 28,
  },
  cards: {
    gap: spacing.md,
  },
  iconBubble: {
    width: 40,
    height: 40,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(25, 199, 243, 0.14)',
  },
});
