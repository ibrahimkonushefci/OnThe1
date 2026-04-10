import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { PrimaryButton } from '../../components/PrimaryButton';
import { ScreenLayout } from '../../components/ScreenLayout';
import { SurfaceCard } from '../../components/SurfaceCard';
import { ToggleRow } from '../../components/ToggleRow';
import { appCopy } from '../../constants/copy';
import { colors } from '../../constants/colors';
import { radii, spacing } from '../../constants/spacing';
import { typeScale } from '../../constants/typography';

export function DetectScreen() {
  const [beepCue, setBeepCue] = useState(true);
  const [vibrationCue, setVibrationCue] = useState(true);
  const [continuousCount, setContinuousCount] = useState(true);

  return (
    <ScreenLayout>
      <View style={styles.headerRow}>
        <Text style={styles.screenTitle}>{appCopy.detect.title}</Text>
        <View style={styles.iconButton}>
          <Feather color={colors.textMuted} name="settings" size={18} />
        </View>
      </View>

      <View style={styles.heroWrap}>
        <View style={styles.heroOrb}>
          <Feather color={colors.primary} name="mic" size={46} />
        </View>
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

      <PrimaryButton label="Start Listening" onPress={() => {}} />

      <Text style={styles.helperText}>{appCopy.detect.helper}</Text>

      <SurfaceCard
        body="Phase 1 placeholder only. Live listening, permissions, and cue timing will be added in later phases."
        title="Detection flow pending"
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
  screenTitle: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '700',
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  heroWrap: {
    alignItems: 'center',
    gap: spacing.lg,
    paddingTop: spacing.sm,
  },
  heroOrb: {
    width: 136,
    height: 136,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#284465',
    backgroundColor: '#1A2844',
  },
  heroTitle: {
    color: colors.text,
    fontSize: typeScale.hero,
    fontWeight: '800',
    textAlign: 'center',
  },
  heroBody: {
    color: colors.textMuted,
    fontSize: typeScale.bodyLarge,
    lineHeight: 28,
    textAlign: 'center',
    maxWidth: 280,
  },
  section: {
    gap: spacing.md,
  },
  helperText: {
    color: colors.textMuted,
    fontSize: typeScale.body,
    lineHeight: 24,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
  },
});
