import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { DetectPreviewState, MockDetectionResult } from './detect.types';

const previewStates: DetectPreviewState[] = [
  'idle',
  'listening',
  'result',
  'permissionDenied',
  'failure',
];

const listeningDelayMs = 1800;

export function useDetectController() {
  const [beepCue, setBeepCue] = useState(true);
  const [vibrationCue, setVibrationCue] = useState(true);
  const [continuousCount, setContinuousCount] = useState(true);
  const [previewState, setPreviewState] = useState<DetectPreviewState>('idle');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const result = useMemo<MockDetectionResult>(
    () => ({
      danceStyle: 'Bachata',
      bpm: 114,
      cueReadyText: 'Start cue ready',
      statusText: 'Get ready to start on the next 1',
    }),
    [],
  );

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (previewState === 'listening') {
      timerRef.current = setTimeout(() => {
        setPreviewState('result');
      }, listeningDelayMs);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [previewState]);

  const startListening = useCallback(() => {
    setPreviewState('listening');
  }, []);

  const stopListening = useCallback(() => {
    setPreviewState('idle');
  }, []);

  const listenAgain = useCallback(() => {
    setPreviewState('listening');
  }, []);

  const stopCount = useCallback(() => {
    setPreviewState('idle');
  }, []);

  const openSettings = useCallback(() => {}, []);

  const tryAgain = useCallback(() => {
    setPreviewState('listening');
  }, []);

  const cyclePreviewState = useCallback(() => {
    setPreviewState((current) => {
      const currentIndex = previewStates.indexOf(current);
      const nextIndex = (currentIndex + 1) % previewStates.length;

      return previewStates[nextIndex];
    });
  }, []);

  return {
    beepCue,
    continuousCount,
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
    cyclePreviewState,
    listenAgain,
  };
}
