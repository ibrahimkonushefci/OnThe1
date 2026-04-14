import { Feather } from '@expo/vector-icons';
import { Animated, Easing, Pressable, StyleSheet, Text, View } from 'react-native';
import { useEffect, useRef } from 'react';

import { PrimaryButton } from '../../components/PrimaryButton';
import { ScreenLayout } from '../../components/ScreenLayout';
import { ToggleRow } from '../../components/ToggleRow';
import { appCopy } from '../../constants/copy';
import { colors } from '../../constants/colors';
import { radii, spacing } from '../../constants/spacing';
import { lineHeights, typeScale } from '../../constants/typography';
import { useDetectController } from './useDetectController';

export function DetectScreen() {
  const {
    beepCue,
    continuousCount,
    listenAgain,
    openSettings,
    previewState,
    result,
    setBeepCue,
    setContinuousCount,
    setVibrationCue,
    startListening,
    stopCount,
    stopListening,
    tryAgain,
    vibrationCue,
  } = useDetectController();

  return (
    <ScreenLayout showAmbientGlow={false}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>{appCopy.detect.title}</Text>
        <Pressable
          accessibilityRole="button"
          onPress={openSettings}
          style={styles.settingsButton}
        >
          <Feather color={colors.textMuted} name="settings" size={18} />
        </Pressable>
      </View>

      {previewState === 'idle' ? (
        <>
          <View style={styles.heroWrap}>
            <MicHero />
            <Text style={styles.heroTitle}>{appCopy.detect.hero}</Text>
            <Text style={styles.heroBody}>{appCopy.detect.body}</Text>
          </View>

          <View style={styles.section}>
            <ToggleRow label="Beep cue" onValueChange={setBeepCue} value={beepCue} />
            <ToggleRow
              label="Vibration cue"
              onValueChange={setVibrationCue}
              value={vibrationCue}
            />
            <ToggleRow
              label="Continuous count"
              description="Keeps counting after the start cue."
              onValueChange={setContinuousCount}
              value={continuousCount}
            />
          </View>

          <PrimaryButton label="Start Listening" onPress={startListening} />

          <Text style={styles.helperText}>{appCopy.detect.helper}</Text>
        </>
      ) : null}

      {previewState === 'listening' ? (
        <View style={styles.centeredStateWrap}>
          <ListeningHero />
          <Text style={styles.heroTitle}>Listening...</Text>
          <Text style={styles.heroBody}>
            Listening to the groove and estimating the next 1.
          </Text>
          <Pressable onPress={stopListening} style={styles.smallSecondaryButton}>
            <Text style={styles.smallSecondaryButtonLabel}>Stop</Text>
          </Pressable>
        </View>
      ) : null}

      {previewState === 'result' ? (
        <View style={styles.resultWrap}>
          <View style={styles.resultHeroWrap}>
            <MicHero compact />
            <Text style={styles.resultTitle}>Hear the 1</Text>
          </View>

          <View style={styles.resultCard}>
            <View style={styles.styleChip}>
              <Text style={styles.styleChipLabel}>{result.danceStyle}</Text>
            </View>
            <Text style={styles.resultMetaLabel}>Estimated BPM</Text>
            <Text style={styles.resultBpmValue}>{result.bpm} BPM</Text>
            <View style={styles.resultDivider} />
            <Text style={styles.resultStatusText}>{result.statusText}</Text>
            <Text style={styles.resultCueText}>{result.cueReadyText}</Text>
          </View>

          <PrimaryButton label="Listen Again" onPress={listenAgain} />
          {continuousCount ? (
            <Pressable onPress={stopCount} style={styles.resultSecondaryAction}>
              <Text style={styles.resultSecondaryActionLabel}>Stop Count</Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}

      {previewState === 'permissionDenied' ? (
        <View style={styles.feedbackWrap}>
          <Text style={styles.feedbackTitle}>Microphone access is off</Text>
          <Text style={styles.feedbackBody}>
            OnThe1 needs microphone access to listen to the music around you.
          </Text>
          <View style={styles.feedbackButtons}>
            <PrimaryButton label="Open Settings" onPress={openSettings} />
            <PrimaryButton label="Try Again" onPress={tryAgain} variant="secondary" />
          </View>
        </View>
      ) : null}

      {previewState === 'failure' ? (
        <View style={styles.feedbackWrap}>
          <Text style={styles.feedbackTitle}>Could not read the rhythm</Text>
          <Text style={styles.feedbackBody}>
            Try again when the music is louder, steadier, and less noisy.
          </Text>
          <View style={styles.feedbackButtons}>
            <PrimaryButton label="Try Again" onPress={tryAgain} />
          </View>
        </View>
      ) : null}
    </ScreenLayout>
  );
}

function MicHero({ compact = false }: { compact?: boolean }) {
  return (
    <View style={[styles.heroOrb, compact && styles.heroOrbCompact]}>
      <View style={[styles.heroInnerOrb, compact && styles.heroInnerOrbCompact]}>
        <Feather
          color={colors.primary}
          name="mic"
          size={compact ? 38 : 52}
        />
      </View>
    </View>
  );
}

function ListeningHero() {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.04,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [scale]);

  return (
    <Animated.View style={[styles.heroOrb, styles.listeningOrb, { transform: [{ scale }] }]}>
      <View style={[styles.heroInnerOrb, styles.listeningInnerOrb]}>
        <Feather color={colors.primary} name="mic" size={58} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xxl,
  },
  headerTitle: {
    color: colors.text,
    fontSize: typeScale.title,
    fontWeight: '700',
  },
  settingsButton: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroWrap: {
    alignItems: 'center',
    gap: spacing.lg,
    marginBottom: spacing.xxl,
  },
  centeredStateWrap: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 72,
    gap: spacing.lg,
  },
  resultWrap: {
    gap: spacing.xl,
    paddingTop: spacing.lg,
  },
  resultHeroWrap: {
    alignItems: 'center',
    gap: spacing.lg,
    marginBottom: spacing.md,
  },
  feedbackWrap: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing.lg,
    paddingBottom: 100,
  },
  feedbackButtons: {
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  heroOrb: {
    width: 112,
    height: 112,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A2844',
  },
  heroInnerOrb: {
    width: 80,
    height: 80,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2C355B',
  },
  heroOrbCompact: {
    width: 76,
    height: 76,
  },
  heroInnerOrbCompact: {
    width: 56,
    height: 56,
  },
  listeningOrb: {
    width: 144,
    height: 144,
  },
  listeningInnerOrb: {
    width: 104,
    height: 104,
  },
  heroTitle: {
    color: colors.text,
    fontSize: 42,
    fontWeight: '800',
    textAlign: 'center',
  },
  heroBody: {
    color: colors.textMuted,
    fontSize: 17,
    lineHeight: 30,
    textAlign: 'center',
    maxWidth: 300,
  },
  section: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  helperText: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
    marginTop: spacing.sm,
  },
  smallSecondaryButton: {
    minWidth: 90,
    minHeight: 52,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.sm,
  },
  smallSecondaryButtonLabel: {
    color: colors.text,
    fontSize: typeScale.body,
    fontWeight: '700',
  },
  resultTitle: {
    color: colors.text,
    fontSize: 42,
    fontWeight: '800',
    textAlign: 'center',
  },
  resultCard: {
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
    gap: spacing.sm,
  },
  styleChip: {
    alignSelf: 'flex-start',
    borderRadius: radii.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: colors.secondaryAccentSoft,
    marginBottom: spacing.sm,
  },
  styleChipLabel: {
    color: colors.secondaryAccent,
    fontSize: typeScale.label,
    fontWeight: '700',
  },
  resultMetaLabel: {
    color: colors.textMuted,
    fontSize: typeScale.body,
    fontWeight: '600',
  },
  resultBpmValue: {
    color: colors.primary,
    fontSize: 46,
    fontWeight: '800',
  },
  resultDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },
  resultStatusText: {
    color: colors.text,
    fontSize: typeScale.bodyLarge,
    fontWeight: '700',
    lineHeight: lineHeights.relaxed,
  },
  resultCueText: {
    color: colors.primary,
    fontSize: typeScale.body,
    fontWeight: '700',
  },
  resultSecondaryAction: {
    alignSelf: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  resultSecondaryActionLabel: {
    color: colors.textMuted,
    fontSize: typeScale.body,
    fontWeight: '700',
  },
  feedbackTitle: {
    color: colors.text,
    fontSize: 34,
    fontWeight: '800',
    textAlign: 'center',
  },
  feedbackBody: {
    color: colors.textMuted,
    fontSize: typeScale.bodyLarge,
    lineHeight: lineHeights.relaxed,
    textAlign: 'center',
  },
});
