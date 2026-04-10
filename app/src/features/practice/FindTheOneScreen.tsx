import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { PrimaryButton } from '../../components/PrimaryButton';
import { ScreenLayout } from '../../components/ScreenLayout';
import { SurfaceCard } from '../../components/SurfaceCard';
import { colors } from '../../constants/colors';
import { practiceTracks } from '../../data/practiceTracks';
import { radii, spacing } from '../../constants/spacing';
import { typeScale } from '../../constants/typography';
import type { PracticeStackParamList } from '../../navigation/PracticeStack';

type Props = NativeStackScreenProps<PracticeStackParamList, 'FindTheOne'>;

export function FindTheOneScreen({ navigation }: Props) {
  return (
    <ScreenLayout>
      <View style={styles.headerRow}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather color={colors.text} name="chevron-left" size={22} />
        </Pressable>
        <Text style={styles.title}>Find the 1</Text>
        <View style={styles.backButtonPlaceholder} />
      </View>

      <Text style={styles.subtitle}>
        Listen to the track and tap when you think the 1 lands.
      </Text>

      <View style={styles.list}>
        {practiceTracks.map((track) => (
          <SurfaceCard body={`${track.style}   ${track.bpm} BPM`} key={track.id} title={track.title}>
            <PrimaryButton label="Start" onPress={() => {}} />
          </SurfaceCard>
        ))}
      </View>

      <SurfaceCard
        body="Phase 1 placeholder only. Playback, tapping, scoring, and session states will be built later."
        title="Trainer flow pending"
      />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonPlaceholder: {
    width: 36,
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
  list: {
    gap: spacing.md,
  },
});
