import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';

import { AppHeader } from '../../components/AppHeader';
import { PrimaryButton } from '../../components/PrimaryButton';
import { ScreenLayout } from '../../components/ScreenLayout';
import { SegmentedControl } from '../../components/SegmentedControl';
import { ToggleRow } from '../../components/ToggleRow';
import { colors } from '../../constants/colors';
import { radii, spacing } from '../../constants/spacing';
import { lineHeights, typeScale } from '../../constants/typography';
import type { PracticeStackParamList } from '../../navigation/PracticeStack';
import { useQuickCountController } from './useQuickCountController';

type Props = NativeStackScreenProps<PracticeStackParamList, 'QuickCount'>;
const danceStyles = ['Salsa', 'Bachata'] as const;

export function QuickCountScreen({ navigation }: Props) {
  const {
    activeDisplayIndex,
    beepCue,
    bpm,
    displayCounts,
    maxTempo,
    minTempo,
    previewState,
    selectedStyle,
    setBeepCue,
    setBpm,
    setSelectedStyle,
    setVibrationCue,
    startCount,
    stopCount,
    vibrationCue,
  } = useQuickCountController();

  return (
    <ScreenLayout showAmbientGlow={false}>
      {previewState === 'setup' ? (
        <>
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
              <Text style={styles.tempoValue}>{bpm} BPM</Text>
              <Slider
                maximumTrackTintColor="#232739"
                maximumValue={maxTempo}
                minimumTrackTintColor={colors.primary}
                minimumValue={minTempo}
                onValueChange={(value) => setBpm(Math.round(value))}
                step={1}
                style={styles.slider}
                thumbTintColor={colors.primary}
                value={bpm}
              />
              <View style={styles.sliderLabels}>
                <Text style={styles.sliderLabel}>{minTempo}</Text>
                <Text style={styles.sliderLabel}>{maxTempo}</Text>
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

          <PrimaryButton label="Start Count" onPress={startCount} />
        </>
      ) : null}

      {previewState === 'running' ? (
        <View style={styles.runningWrap}>
          <AppHeader
            onBackPress={stopCount}
            plainBackButton
            title="Quick Count"
          />

          <View style={styles.runningHero}>
            <View style={styles.runningStyleChip}>
              <Text style={styles.runningStyleChipLabel}>{selectedStyle}</Text>
            </View>
            <Text style={styles.runningTempoLabel}>Tempo</Text>
            <Text style={styles.runningTempoValue}>{bpm} BPM</Text>
          </View>

          <View
            style={[
              styles.countGrid,
              selectedStyle === 'Bachata' && styles.countGridBachata,
            ]}
          >
            {displayCounts.map((count, index) => {
              const isPrimaryActive = activeDisplayIndex === index;

              return (
                <View
                  key={`${count}-${index}`}
                  style={[
                    styles.countTile,
                    selectedStyle === 'Bachata' && styles.countTileBachata,
                    isPrimaryActive && styles.countTilePrimary,
                  ]}
                >
                  <Text
                    style={[
                      styles.countTileLabel,
                      count === 'Tap' && styles.countTileLabelTap,
                      isPrimaryActive && styles.countTileLabelPrimary,
                    ]}
                  >
                    {count}
                  </Text>
                </View>
              );
            })}
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={stopCount}
            style={styles.stopButton}
          >
            <Text style={styles.stopButtonLabel}>Stop</Text>
          </Pressable>
        </View>
      ) : null}
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  runningWrap: {
    flex: 1,
    gap: spacing.xxxl,
  },
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
  slider: {
    width: '100%',
    height: 32,
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
  runningHero: {
    alignItems: 'center',
    gap: spacing.md,
    paddingTop: spacing.md,
  },
  runningStyleChip: {
    borderRadius: radii.pill,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    backgroundColor: colors.secondaryAccentSoft,
  },
  runningStyleChipLabel: {
    color: colors.secondaryAccent,
    fontSize: typeScale.bodyLarge,
    fontWeight: '700',
  },
  runningTempoLabel: {
    color: colors.textMuted,
    fontSize: typeScale.body,
    fontWeight: '600',
  },
  runningTempoValue: {
    color: colors.primary,
    fontSize: 54,
    fontWeight: '800',
  },
  countGrid: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    gap: spacing.md,
    justifyContent: 'space-between',
  },
  countGridBachata: {
    flexWrap: 'wrap',
    rowGap: spacing.md,
  },
  countTile: {
    width: '14.5%',
    height: 60,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countTileBachata: {
    width: '22.5%',
    height: 90,
  },
  countTileSecondary: {
    backgroundColor: '#122533',
  },
  countTilePrimary: {
    backgroundColor: colors.primary,
  },
  countTileLabel: {
    color: colors.textMuted,
    fontSize: 34,
    fontWeight: '700',
    lineHeight: 34,
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  countTileLabelTap: {
    fontSize: 22,
    lineHeight: 22,
  },
  countTileLabelPrimary: {
    color: colors.black,
  },
  stopButton: {
    minHeight: 56,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    marginTop: spacing.sm,
  },
  stopButtonLabel: {
    color: colors.text,
    fontSize: typeScale.bodyLarge,
    fontWeight: '700',
  },
});
