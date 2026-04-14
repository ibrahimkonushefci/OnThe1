import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';

import { AppHeader } from '../../components/AppHeader';
import { IconBadge } from '../../components/IconBadge';
import { PrimaryButton } from '../../components/PrimaryButton';
import { ScreenLayout } from '../../components/ScreenLayout';
import { appCopy } from '../../constants/copy';
import { colors } from '../../constants/colors';
import { radii, spacing } from '../../constants/spacing';
import { lineHeights, typeScale } from '../../constants/typography';
import type { PracticeStackParamList } from '../../navigation/PracticeStack';

type Props = NativeStackScreenProps<PracticeStackParamList, 'PracticeHome'>;

export function PracticeHomeScreen({ navigation }: Props) {
  return (
    <ScreenLayout showAmbientGlow={false}>
      <AppHeader subtitle={appCopy.practice.subtitle} title={appCopy.practice.title} />

      <View style={styles.card}>
        <IconBadge name="clock" />
        <Text style={styles.cardTitle}>Quick Count</Text>
        <Text style={styles.cardBody}>Choose a style and tempo, then follow the count.</Text>
        <PrimaryButton
          icon="arrow-right"
          label="Open Quick Count"
          onPress={() => navigation.navigate('QuickCount')}
        />
      </View>

      <View style={styles.card}>
        <IconBadge name="target" tone="secondary" />
        <Text style={styles.cardTitle}>Find the 1</Text>
        <Text style={styles.cardBody}>
          Play a practice track and tap when you think the 1 lands.
        </Text>
        <PrimaryButton
          icon="arrow-right"
          label="Open Trainer"
          onPress={() => navigation.navigate('FindTheOne')}
        />
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.lg,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.xl,
  },
  cardTitle: {
    color: colors.text,
    fontSize: typeScale.section,
    fontWeight: '700',
  },
  cardBody: {
    color: colors.textMuted,
    fontSize: typeScale.body,
    lineHeight: lineHeights.body,
  },
});
