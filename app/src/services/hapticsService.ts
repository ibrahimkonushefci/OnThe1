import * as Haptics from 'expo-haptics';

type CueHapticType = 'accent' | 'tick';

export async function triggerCueHaptic(type: CueHapticType = 'tick') {
  try {
    if (type === 'accent') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    } else {
      await Haptics.selectionAsync();
    }
  } catch {
    return null;
  }

  return null;
}
