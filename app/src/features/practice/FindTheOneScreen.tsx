import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';

import { AppHeader } from '../../components/AppHeader';
import { ScreenLayout } from '../../components/ScreenLayout';
import { TrackCard } from '../../components/TrackCard';
import { practiceTracks } from '../../data/practiceTracks';
import { spacing } from '../../constants/spacing';
import type { PracticeStackParamList } from '../../navigation/PracticeStack';

type Props = NativeStackScreenProps<PracticeStackParamList, 'FindTheOne'>;

export function FindTheOneScreen({ navigation }: Props) {
  return (
    <ScreenLayout showAmbientGlow={false}>
      <AppHeader
        onBackPress={() => navigation.goBack()}
        plainBackButton
        subtitle="Listen to the track and tap when you think the 1 lands."
        title="Find the 1"
      />

      <View style={styles.list}>
        {practiceTracks.map((track) => (
          <TrackCard
            bpm={track.bpm}
            key={track.id}
            onPress={() => {}}
            styleLabel={track.style}
            title={track.title}
          />
        ))}
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: spacing.md,
  },
});
