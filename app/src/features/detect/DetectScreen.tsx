import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { PrimaryButton } from '../../components/PrimaryButton';
import { ScreenLayout } from '../../components/ScreenLayout';
import { ToggleRow } from '../../components/ToggleRow';
import { appCopy } from '../../constants/copy';
import { colors } from '../../constants/colors';
import { radii, spacing } from '../../constants/spacing';
import { lineHeights, typeScale } from '../../constants/typography';

export function DetectScreen() {
  const [beepCue, setBeepCue] = useState(true);
  const [vibrationCue, setVibrationCue] = useState(true);
  const [continuousCount, setContinuousCount] = useState(true);

  return (
    <ScreenLayout showAmbientGlow={false}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>{appCopy.detect.title}</Text>
        <Pressable accessibilityRole="button" onPress={() => {}} style={styles.settingsButton}>
          <Feather color={colors.textMuted} name="settings" size={18} />
        </Pressable>
      </View>

      <View style={styles.heroWrap}>
        <View style={styles.heroOrb}>
          <View style={styles.heroInnerOrb}>
            <Feather color={colors.primary} name="mic" size={52} />
          </View>
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
    </ScreenLayout>
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
});
