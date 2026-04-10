import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { PrimaryButton } from '../../components/PrimaryButton';
import { ScreenLayout } from '../../components/ScreenLayout';
import { SurfaceCard } from '../../components/SurfaceCard';
import { appCopy } from '../../constants/copy';
import { colors } from '../../constants/colors';
import { radii, spacing } from '../../constants/spacing';
import { typeScale } from '../../constants/typography';
import type { PracticeStackParamList } from '../../navigation/PracticeStack';

type Props = NativeStackScreenProps<PracticeStackParamList, 'PracticeHome'>;

export function PracticeHomeScreen({ navigation }: Props) {
  return (
    <ScreenLayout>
      <View style={styles.header}>
        <Text style={styles.title}>{appCopy.practice.title}</Text>
        <Text style={styles.subtitle}>{appCopy.practice.subtitle}</Text>
      </View>

      <SurfaceCard
        body="Choose a style and tempo, then follow the count."
        title="Quick Count"
      >
        <View style={[styles.iconBubble, styles.cyanBubble]}>
          <Feather color={colors.primary} name="clock" size={24} />
        </View>
        <PrimaryButton
          label="Open Quick Count"
          onPress={() => navigation.navigate('QuickCount')}
        />
      </SurfaceCard>

      <SurfaceCard
        body="Play a practice track and tap when you think the 1 lands."
        title="Find the 1"
      >
        <View style={[styles.iconBubble, styles.purpleBubble]}>
          <Feather color={colors.secondaryAccent} name="target" size={24} />
        </View>
        <PrimaryButton
          label="Open Trainer"
          onPress={() => navigation.navigate('FindTheOne')}
        />
      </SurfaceCard>
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
  iconBubble: {
    width: 52,
    height: 52,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cyanBubble: {
    backgroundColor: 'rgba(25, 199, 243, 0.16)',
  },
  purpleBubble: {
    backgroundColor: 'rgba(115, 82, 246, 0.16)',
  },
});
