import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppHeader } from '../../components/AppHeader';
import { PrimaryButton } from '../../components/PrimaryButton';
import { ScreenLayout } from '../../components/ScreenLayout';
import { SegmentedControl } from '../../components/SegmentedControl';
import { ToggleRow } from '../../components/ToggleRow';
import { colors } from '../../constants/colors';
import { radii, spacing } from '../../constants/spacing';
import { lineHeights, typeScale } from '../../constants/typography';
import type { PracticeStackParamList } from '../../navigation/PracticeStack';

type Props = NativeStackScreenProps<PracticeStackParamList, 'QuickCount'>;
type DanceStyle = 'Salsa' | 'Bachata';

const danceStyles: DanceStyle[] = ['Salsa', 'Bachata'];

export function QuickCountScreen({ navigation }: Props) {
  const [selectedStyle, setSelectedStyle] = useState<DanceStyle>('Salsa');
  const [beepCue, setBeepCue] = useState(true);
  const [vibrationCue, setVibrationCue] = useState(true);

  return (
    <ScreenLayout showAmbientGlow={false}>
      <AppHeader
        onBackPress={() => navigation.goBack()}
        plainBackButton
        subtitle="Pick a dance and tempo, then follow the beat."
        title="Quick Count"
      />

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Dance Style</Text>
        <SegmentedControl
          onChange={setSelectedStyle}
          options={danceStyles}
          value={selectedStyle}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Tempo</Text>
        <View style={styles.tempoCard}>
          <Text style={styles.tempoValue}>100 BPM</Text>
          <View style={styles.sliderTrack}>
            <View style={styles.sliderFill} />
            <View style={styles.sliderThumb} />
          </View>
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabel}>60</Text>
            <Text style={styles.sliderLabel}>140</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <ToggleRow label="Beep cue" onValueChange={setBeepCue} value={beepCue} />
        <ToggleRow
          label="Vibration cue"
          onValueChange={setVibrationCue}
          value={vibrationCue}
        />
      </View>

      <PrimaryButton label="Start Count" onPress={() => {}} />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: spacing.md,
  },
  sectionLabel: {
    color: colors.text,
    fontSize: typeScale.body,
    fontWeight: '700',
  },
  tempoCard: {
    gap: spacing.md,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.lg,
  },
  tempoValue: {
    color: colors.primary,
    fontSize: 46,
    fontWeight: '800',
  },
  sliderTrack: {
    height: 6,
    borderRadius: radii.pill,
    backgroundColor: '#232739',
    justifyContent: 'center',
  },
  sliderFill: {
    width: '44%',
    height: 6,
    borderRadius: radii.pill,
    backgroundColor: colors.primary,
  },
  sliderThumb: {
    position: 'absolute',
    left: '41%',
    width: 18,
    height: 18,
    borderRadius: radii.pill,
    backgroundColor: colors.primary,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderLabel: {
    color: colors.textMuted,
    fontSize: typeScale.caption,
    lineHeight: lineHeights.compact,
  },
});
