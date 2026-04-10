import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { PrimaryButton } from '../../components/PrimaryButton';
import { ScreenLayout } from '../../components/ScreenLayout';
import { SurfaceCard } from '../../components/SurfaceCard';
import { ToggleRow } from '../../components/ToggleRow';
import { colors } from '../../constants/colors';
import { radii, spacing } from '../../constants/spacing';
import { typeScale } from '../../constants/typography';
import type { PracticeStackParamList } from '../../navigation/PracticeStack';

type Props = NativeStackScreenProps<PracticeStackParamList, 'QuickCount'>;
type DanceStyle = 'Salsa' | 'Bachata';

const danceStyles: DanceStyle[] = ['Salsa', 'Bachata'];

export function QuickCountScreen({ navigation }: Props) {
  const [selectedStyle, setSelectedStyle] = useState<DanceStyle>('Salsa');
  const [beepCue, setBeepCue] = useState(true);
  const [vibrationCue, setVibrationCue] = useState(true);

  return (
    <ScreenLayout>
      <View style={styles.headerRow}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather color={colors.text} name="chevron-left" size={22} />
        </Pressable>
        <Text style={styles.title}>Quick Count</Text>
        <View style={styles.backButtonPlaceholder} />
      </View>

      <Text style={styles.subtitle}>Pick a dance and tempo, then follow the beat.</Text>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Dance Style</Text>
        <View style={styles.segmentedControl}>
          {danceStyles.map((style) => {
            const isSelected = style === selectedStyle;
            return (
              <Pressable
                key={style}
                onPress={() => setSelectedStyle(style)}
                style={[styles.segment, isSelected && styles.segmentActive]}
              >
                <Text style={[styles.segmentLabel, isSelected && styles.segmentLabelActive]}>
                  {style}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Tempo</Text>
        <SurfaceCard>
          <Text style={styles.tempoValue}>100 BPM</Text>
          <View style={styles.sliderTrack}>
            <View style={styles.sliderFill} />
            <View style={styles.sliderThumb} />
          </View>
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabel}>60</Text>
            <Text style={styles.sliderLabel}>140</Text>
          </View>
        </SurfaceCard>
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

      <SurfaceCard
        body="Phase 1 placeholder only. Tempo timing, audio cues, and running count feedback are still pending."
        title="Count engine pending"
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
  section: {
    gap: spacing.md,
  },
  sectionLabel: {
    color: colors.text,
    fontSize: typeScale.body,
    fontWeight: '700',
  },
  segmentedControl: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  segment: {
    flex: 1,
    minHeight: 52,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  segmentActive: {
    backgroundColor: colors.primary,
  },
  segmentLabel: {
    color: colors.text,
    fontSize: typeScale.body,
    fontWeight: '700',
  },
  segmentLabelActive: {
    color: colors.black,
  },
  tempoValue: {
    color: colors.primary,
    fontSize: typeScale.hero,
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
  },
});
