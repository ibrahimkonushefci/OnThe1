import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { playCueBeep, stopAudioSession } from '../../services/audioService';
import { triggerCueHaptic } from '../../services/hapticsService';
import { bpmToIntervalMs } from '../../utils/timing';
import type { DanceStyle, QuickCountPreviewState } from './practice.types';

const salsaSequence = ['1', '2', '3', null, '5', '6', '7', null] as const;
const salsaDisplay = ['1', '2', '3', '5', '6', '7'] as const;
const bachataSequence = ['1', '2', '3', 'Tap', '5', '6', '7', 'Tap'] as const;

const minTempo = 70;
const maxTempo = 180;

export function useQuickCountController() {
  const [selectedStyle, setSelectedStyle] = useState<DanceStyle>('Salsa');
  const [beepCue, setBeepCue] = useState(true);
  const [vibrationCue, setVibrationCue] = useState(true);
  const [bpm, setBpm] = useState(100);
  const [previewState, setPreviewState] = useState<QuickCountPreviewState>('setup');
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const sequence = useMemo(
    () => (selectedStyle === 'Salsa' ? salsaSequence : bachataSequence),
    [selectedStyle],
  );

  const displayCounts = useMemo(
    () => (selectedStyle === 'Salsa' ? salsaDisplay : bachataSequence),
    [selectedStyle],
  );

  const activeDisplayIndex = useMemo(() => {
    if (selectedStyle === 'Salsa') {
      const mapping = [0, 1, 2, null, 3, 4, 5, null] as const;

      return mapping[activeStepIndex];
    }

    return activeStepIndex;
  }, [activeStepIndex, selectedStyle]);

  const runCueForStep = useCallback(
    async (stepIndex: number) => {
      const step = sequence[stepIndex];
      if (!step) {
        return;
      }

      const isAccentBeat = step === '1' || step === '5';

      if (beepCue) {
        await playCueBeep(isAccentBeat);
      }

      if (vibrationCue) {
        await triggerCueHaptic(isAccentBeat ? 'accent' : 'tick');
      }
    },
    [beepCue, sequence, vibrationCue],
  );

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (previewState !== 'running') {
      void stopAudioSession();
      return;
    }

    setActiveStepIndex(0);
    void runCueForStep(0);

    const intervalMs = bpmToIntervalMs(bpm);
    intervalRef.current = setInterval(() => {
      setActiveStepIndex((current) => {
        const next = (current + 1) % sequence.length;
        void runCueForStep(next);

        return next;
      });
    }, intervalMs);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [bpm, previewState, runCueForStep, sequence.length]);

  useEffect(() => {
    return () => {
      void stopAudioSession();
    };
  }, []);

  const startCount = useCallback(() => {
    setPreviewState('running');
  }, []);

  const stopCount = useCallback(() => {
    setPreviewState('setup');
    setActiveStepIndex(0);
    void stopAudioSession();
  }, []);

  return {
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
  };
}
