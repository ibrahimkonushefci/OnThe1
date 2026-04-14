import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { PracticeTrack } from '../../data/practiceTracks';
import { playCueBeep, stopAudioSession } from '../../services/audioService';
import { triggerCueHaptic } from '../../services/hapticsService';
import { bpmToIntervalMs } from '../../utils/timing';
import type { FindTheOnePreviewState } from './practice.types';

type TapResultType = 'perfect' | 'good' | 'early' | 'late';

type SessionStats = {
  totalAttempts: number;
  perfect: number;
  good: number;
  early: number;
  late: number;
  hitRate: number;
  averageOffsetMs: number;
};

const perfectWindowMs = 100;
const goodWindowMs = 220;

const emptyStats: SessionStats = {
  totalAttempts: 0,
  perfect: 0,
  good: 0,
  early: 0,
  late: 0,
  hitRate: 0,
  averageOffsetMs: 0,
};

export function useFindTheOneController() {
  const [previewState, setPreviewState] = useState<FindTheOnePreviewState>('list');
  const [selectedTrack, setSelectedTrack] = useState<PracticeTrack | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentTargetIndex, setCurrentTargetIndex] = useState(0);
  const [latestResult, setLatestResult] = useState<TapResultType | null>(null);
  const [stats, setStats] = useState<SessionStats>(emptyStats);

  const startTimestampRef = useRef<number | null>(null);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const completionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const targetTimesRef = useRef<number[]>([]);

  const activeTargetTime = targetTimesRef.current[currentTargetIndex] ?? null;

  const metrics = useMemo(
    () => ({
      taps: stats.totalAttempts,
      hitRateLabel: stats.totalAttempts === 0 ? '--' : `${Math.round(stats.hitRate)}%`,
      perfect: stats.perfect,
      averageOffsetLabel:
        stats.totalAttempts === 0 ? '--' : `${Math.round(Math.abs(stats.averageOffsetMs))}ms`,
    }),
    [stats],
  );

  const resetTimers = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }

    if (completionTimeoutRef.current) {
      clearTimeout(completionTimeoutRef.current);
      completionTimeoutRef.current = null;
    }
  }, []);

  const resetSessionState = useCallback(() => {
    setProgress(0);
    setCurrentTargetIndex(0);
    setLatestResult(null);
    setStats(emptyStats);
    startTimestampRef.current = null;
    targetTimesRef.current = [];
  }, []);

  useEffect(() => {
    return () => {
      resetTimers();
      void stopAudioSession();
    };
  }, [resetTimers]);

  const startTrack = useCallback(
    async (track: PracticeTrack) => {
      resetTimers();
      resetSessionState();
      setSelectedTrack(track);
      setPreviewState('active');

      const beatIntervalMs = bpmToIntervalMs(track.bpm);
      const targetTimes = Array.from({ length: track.targetBeats }, (_, index) => {
        return track.beatLeadInMs + index * beatIntervalMs;
      });

      targetTimesRef.current = targetTimes;
      startTimestampRef.current = Date.now();

      try {
        await playCueBeep(true);
      } catch {
        // Ignore audio issues and keep the trainer running.
      }

      const sessionDurationMs = targetTimes[targetTimes.length - 1] + beatIntervalMs;

      progressIntervalRef.current = setInterval(() => {
        if (!startTimestampRef.current) {
          return;
        }

        const elapsed = Date.now() - startTimestampRef.current;
        const nextTargetIndex = targetTimes.findIndex((time) => elapsed < time);
        setCurrentTargetIndex(nextTargetIndex === -1 ? track.targetBeats - 1 : nextTargetIndex);
        setProgress(Math.min(1, elapsed / sessionDurationMs));
      }, 50);

      completionTimeoutRef.current = setTimeout(() => {
        resetTimers();
        setProgress(1);
        setPreviewState('complete');
      }, sessionDurationMs);
    },
    [resetSessionState, resetTimers],
  );

  const finishSession = useCallback(() => {
    resetTimers();
    setProgress(1);
    setPreviewState('complete');
  }, [resetTimers]);

  const backToList = useCallback(() => {
    resetTimers();
    resetSessionState();
    void stopAudioSession();
    setPreviewState('list');
    setSelectedTrack(null);
  }, [resetSessionState, resetTimers]);

  const tryAgain = useCallback(() => {
    if (!selectedTrack) {
      return;
    }

    void startTrack(selectedTrack);
  }, [selectedTrack, startTrack]);

  const handleTap = useCallback(async () => {
    if (previewState !== 'active' || !startTimestampRef.current || activeTargetTime == null) {
      return;
    }

    const elapsed = Date.now() - startTimestampRef.current;
    const offset = elapsed - activeTargetTime;
    const absoluteOffset = Math.abs(offset);

    let result: TapResultType;
    if (absoluteOffset <= perfectWindowMs) {
      result = 'perfect';
    } else if (absoluteOffset <= goodWindowMs) {
      result = 'good';
    } else {
      result = offset < 0 ? 'early' : 'late';
    }

    setLatestResult(result);

    setStats((current) => {
      const next = {
        ...current,
        totalAttempts: current.totalAttempts + 1,
        perfect: current.perfect + (result === 'perfect' ? 1 : 0),
        good: current.good + (result === 'good' ? 1 : 0),
        early: current.early + (result === 'early' ? 1 : 0),
        late: current.late + (result === 'late' ? 1 : 0),
      };

      const hitCount = next.perfect + next.good;
      const totalOffset = current.averageOffsetMs * current.totalAttempts + offset;

      return {
        ...next,
        hitRate: next.totalAttempts === 0 ? 0 : (hitCount / next.totalAttempts) * 100,
        averageOffsetMs: totalOffset / next.totalAttempts,
      };
    });

    try {
      await triggerCueHaptic(result === 'perfect' ? 'accent' : 'tick');
    } catch {
      return;
    }
  }, [activeTargetTime, previewState]);

  return {
    backToList,
    finishSession,
    handleTap,
    latestResult,
    metrics,
    previewState,
    progress,
    selectedTrack,
    startTrack,
    stats,
    tryAgain,
  };
}
