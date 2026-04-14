import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { AppHeader } from '../../components/AppHeader';
import { PrimaryButton } from '../../components/PrimaryButton';
import { ScreenLayout } from '../../components/ScreenLayout';
import { TrackCard } from '../../components/TrackCard';
import { practiceTracks } from '../../data/practiceTracks';
import { colors } from '../../constants/colors';
import { radii, spacing } from '../../constants/spacing';
import { typeScale } from '../../constants/typography';
import type { PracticeStackParamList } from '../../navigation/PracticeStack';
import type { PracticeTrack } from '../../data/practiceTracks';
import type { FindTheOnePreviewState } from './practice.types';
import { useState } from 'react';

type Props = NativeStackScreenProps<PracticeStackParamList, 'FindTheOne'>;

export function FindTheOneScreen({ navigation }: Props) {
  const [previewState, setPreviewState] = useState<FindTheOnePreviewState>('list');
  const [selectedTrack, setSelectedTrack] = useState<PracticeTrack | null>(null);

  const startTrack = (track: PracticeTrack) => {
    setSelectedTrack(track);
    setPreviewState('active');
  };

  return (
    <ScreenLayout showAmbientGlow={false}>
      {previewState === 'list' ? (
        <>
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
                onPress={() => startTrack(track)}
                styleLabel={track.style}
                title={track.title}
              />
            ))}
          </View>
        </>
      ) : null}

      {previewState === 'active' && selectedTrack ? (
        <View style={styles.activeWrap}>
          <AppHeader
            onBackPress={() => setPreviewState('list')}
            plainBackButton
            title={selectedTrack.title}
          />

          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>

          <View style={styles.metricsCard}>
            <View style={styles.metricBlock}>
              <Text style={styles.metricLabel}>Taps</Text>
              <Text style={styles.metricValue}>1</Text>
            </View>
            <View style={styles.metricBlock}>
              <Text style={styles.metricLabel}>Hit Rate</Text>
              <Text style={[styles.metricValue, styles.metricValueSuccess]}>100%</Text>
            </View>
            <View style={styles.metricBlock}>
              <Text style={styles.metricLabel}>Perfect</Text>
              <Text style={[styles.metricValue, styles.metricValuePrimary]}>1</Text>
            </View>
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={() => setPreviewState('complete')}
            style={styles.tapTargetOuter}
          >
            <View style={styles.tapTargetInner}>
              <Text style={styles.tapTargetLabel}>TAP ON THE 1</Text>
            </View>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={() => setPreviewState('complete')}
            style={styles.pauseButton}
          >
            <Feather color={colors.textMuted} name="pause" size={18} />
          </Pressable>
        </View>
      ) : null}

      {previewState === 'complete' && selectedTrack ? (
        <View style={styles.completeWrap}>
          <View style={styles.completeHero}>
            <View style={styles.completeHeroOuter}>
              <View style={styles.completeHeroInner} />
            </View>
            <Text style={styles.completeTitle}>Session Complete</Text>
          </View>

          <View style={styles.summaryCard}>
            <View style={styles.summaryGrid}>
              <View style={[styles.summaryTile, styles.summaryTileBlue]}>
                <Text style={styles.summaryTileLabel}>Perfect Taps</Text>
                <Text style={[styles.summaryTileValue, styles.summaryTileValueBlue]}>1</Text>
              </View>
              <View style={[styles.summaryTile, styles.summaryTileGreen]}>
                <Text style={styles.summaryTileLabel}>Good Taps</Text>
                <Text style={[styles.summaryTileValue, styles.summaryTileValueGreen]}>0</Text>
              </View>
              <View style={styles.summaryTile}>
                <Text style={styles.summaryTileLabel}>Early Taps</Text>
                <Text style={styles.summaryTileValue}>0</Text>
              </View>
              <View style={styles.summaryTile}>
                <Text style={styles.summaryTileLabel}>Late Taps</Text>
                <Text style={styles.summaryTileValue}>0</Text>
              </View>
            </View>

            <View style={styles.summaryDivider} />

            <View style={styles.summaryRow}>
              <Text style={styles.summaryRowLabel}>Hit Rate</Text>
              <Text style={styles.summaryRowValue}>100.0%</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryRowLabel}>Average Offset</Text>
              <Text style={styles.summaryRowValue}>13ms</Text>
            </View>
          </View>

          <PrimaryButton
            icon="rotate-ccw"
            label="Try Again"
            onPress={() => setPreviewState('active')}
          />
          <PrimaryButton
            icon="home"
            label="Back to Practice"
            onPress={() => {
              setPreviewState('list');
              setSelectedTrack(null);
            }}
            variant="secondary"
          />
        </View>
      ) : null}
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  activeWrap: {
    flex: 1,
    gap: spacing.xl,
  },
  completeWrap: {
    gap: spacing.md,
    paddingTop: spacing.md,
  },
  list: {
    gap: spacing.md,
  },
  progressTrack: {
    height: 6,
    borderRadius: radii.pill,
    backgroundColor: '#212534',
    overflow: 'hidden',
  },
  progressFill: {
    width: '68%',
    height: '100%',
    backgroundColor: colors.primary,
  },
  metricsCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  metricBlock: {
    gap: spacing.xs,
  },
  metricLabel: {
    color: colors.textMuted,
    fontSize: typeScale.label,
    fontWeight: '600',
  },
  metricValue: {
    color: colors.text,
    fontSize: 34,
    fontWeight: '700',
  },
  metricValueSuccess: {
    color: colors.success,
  },
  metricValuePrimary: {
    color: colors.primary,
  },
  tapTargetOuter: {
    alignSelf: 'center',
    width: 220,
    height: 220,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#38486C',
    borderWidth: 3,
    borderColor: colors.primary,
    marginTop: spacing.xl,
  },
  tapTargetInner: {
    width: 74,
    height: 74,
    borderRadius: radii.pill,
    borderWidth: 8,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tapTargetLabel: {
    position: 'absolute',
    bottom: -60,
    width: 150,
    textAlign: 'center',
    color: colors.textMuted,
    fontSize: typeScale.label,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  pauseButton: {
    alignSelf: 'center',
    width: 48,
    height: 48,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    marginTop: spacing.xxxl,
  },
  completeHero: {
    alignItems: 'center',
    gap: spacing.lg,
  },
  completeHeroOuter: {
    width: 64,
    height: 64,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A2844',
  },
  completeHeroInner: {
    width: 24,
    height: 24,
    borderRadius: radii.pill,
    borderWidth: 4,
    borderColor: colors.primary,
  },
  completeTitle: {
    color: colors.text,
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
  },
  summaryCard: {
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.lg,
    gap: spacing.md,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  summaryTile: {
    width: '47%',
    borderRadius: radii.md,
    backgroundColor: '#252636',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    gap: spacing.xs,
  },
  summaryTileBlue: {
    backgroundColor: '#123647',
  },
  summaryTileGreen: {
    backgroundColor: '#183932',
  },
  summaryTileLabel: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  summaryTileValue: {
    color: colors.text,
    fontSize: 34,
    fontWeight: '700',
  },
  summaryTileValueBlue: {
    color: colors.primary,
  },
  summaryTileValueGreen: {
    color: colors.success,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: colors.border,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryRowLabel: {
    color: colors.textMuted,
    fontSize: typeScale.body,
    fontWeight: '600',
  },
  summaryRowValue: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '700',
  },
});
