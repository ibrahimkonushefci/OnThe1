import { useCallback, useEffect, useRef, useState } from 'react';

import { detectFromLiveAudio } from '../../api/detection';
import { playCueBeep, stopAudioSession } from '../../services/audioService';
import { triggerCueHaptic } from '../../services/hapticsService';
import {
  openAppSettings,
  requestMicrophonePermission,
} from '../../services/permissionsService';
import type { DetectPreviewState, DetectResult } from './detect.types';

function formatCueLeadText(firstBeatOffsetMs: number) {
  if (firstBeatOffsetMs < 1000) {
    return 'Cue on the next 1';
  }

  return `Cue in ${(firstBeatOffsetMs / 1000).toFixed(1)}s`;
}

export function useDetectController() {
  const [beepCue, setBeepCue] = useState(true);
  const [vibrationCue, setVibrationCue] = useState(true);
  const [continuousCount, setContinuousCount] = useState(true);
  const [previewState, setPreviewState] = useState<DetectPreviewState>('idle');
  const [result, setResult] = useState<DetectResult>({
    danceStyle: 'Bachata',
    bpm: 114,
    cueReadyText: 'Cue on the next 1',
    firstBeatOffsetMs: 900,
    statusText: 'Listening found a likely start point.',
    confidence: 0.76,
  });

  const cueTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cueIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cueBeatIndexRef = useRef(0);
  const requestIdRef = useRef(0);

  const clearCueTimers = useCallback(() => {
    if (cueTimeoutRef.current) {
      clearTimeout(cueTimeoutRef.current);
      cueTimeoutRef.current = null;
    }

    if (cueIntervalRef.current) {
      clearInterval(cueIntervalRef.current);
      cueIntervalRef.current = null;
    }
  }, []);

  const triggerCue = useCallback(
    async (isAccentBeat: boolean) => {
      if (beepCue) {
        await playCueBeep(isAccentBeat);
      }

      if (vibrationCue) {
        await triggerCueHaptic(isAccentBeat ? 'accent' : 'tick');
      }
    },
    [beepCue, vibrationCue],
  );

  useEffect(() => {
    clearCueTimers();

    if (previewState !== 'result') {
      return;
    }

    cueBeatIndexRef.current = 0;
    cueTimeoutRef.current = setTimeout(() => {
      void triggerCue(true);
      cueBeatIndexRef.current = 1;

      if (!continuousCount) {
        return;
      }

      const beatIntervalMs = Math.round(60000 / result.bpm);
      cueIntervalRef.current = setInterval(() => {
        const isAccentBeat = cueBeatIndexRef.current % 8 === 0;
        void triggerCue(isAccentBeat);
        cueBeatIndexRef.current += 1;
      }, beatIntervalMs);
    }, result.firstBeatOffsetMs);

    return () => {
      clearCueTimers();
    };
  }, [
    clearCueTimers,
    continuousCount,
    previewState,
    result.bpm,
    result.firstBeatOffsetMs,
    triggerCue,
  ]);

  useEffect(() => {
    return () => {
      clearCueTimers();
      void stopAudioSession();
    };
  }, [clearCueTimers]);

  const runDetection = useCallback(async () => {
    const requestId = ++requestIdRef.current;
    clearCueTimers();
    setPreviewState('listening');

    try {
      const permission = await requestMicrophonePermission();
      if (!permission.granted) {
        if (requestIdRef.current === requestId) {
          setPreviewState('permissionDenied');
        }
        return;
      }

      const detection = await detectFromLiveAudio();
      if (requestIdRef.current !== requestId) {
        return;
      }

      await stopAudioSession();
      setResult({
        danceStyle: detection.danceStyle === 'salsa' ? 'Salsa' : 'Bachata',
        bpm: detection.bpm,
        confidence: detection.confidence,
        cueReadyText: formatCueLeadText(detection.firstBeatOffsetMs),
        firstBeatOffsetMs: detection.firstBeatOffsetMs,
        statusText: 'Listening found a likely start point.',
      });
      setPreviewState('result');
    } catch {
      await stopAudioSession();
      if (requestIdRef.current === requestId) {
        setPreviewState('failure');
      }
    }
  }, [clearCueTimers]);

  const resetToIdle = useCallback(() => {
    requestIdRef.current += 1;
    clearCueTimers();
    setPreviewState('idle');
    void stopAudioSession();
  }, [clearCueTimers]);

  return {
    beepCue,
    continuousCount,
    listenAgain: () => {
      void runDetection();
    },
    openSettings: () => {
      void openAppSettings();
    },
    previewState,
    result,
    setBeepCue,
    setContinuousCount,
    setVibrationCue,
    startListening: () => {
      void runDetection();
    },
    stopCount: resetToIdle,
    stopListening: resetToIdle,
    tryAgain: () => {
      void runDetection();
    },
    vibrationCue,
  };
}
