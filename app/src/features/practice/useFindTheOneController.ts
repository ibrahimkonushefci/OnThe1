import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { PracticeTrack } from '../../data/practiceTracks';
import {
  getPracticePlaybackPositionMs,
  isPracticeTrackPlaying,
  playPracticeTrack,
  stopAudioSession,
} from '../../services/audioService';
import {
  calculateSessionStats,
  emptySessionStats,
  getActiveTargetIndex,
  scoreTapAtTime,
  type SessionStats,
  type TapEvaluation,
  type TapResultType,
} from './findTheOne.helpers';
import type { FindTheOnePreviewState } from './practice.types';

const progressIntervalMs = 40;

export function useFindTheOneController() {
  const [previewState, setPreviewState] = useState<FindTheOnePreviewState>('list');
  const [selectedTrack, setSelectedTrack] = useState<PracticeTrack | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentTargetIndex, setCurrentTargetIndex] = useState(0);
  const [latestResult, setLatestResult] = useState<TapResultType | null>(null);
  const [stats, setStats] = useState<SessionStats>(emptySessionStats);

  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const completionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const evaluationsRef = useRef<TapEvaluation[]>([]);

  const activeTargetTime =
    selectedTrack?.targetBeatTimestampsMs[currentTargetIndex] ?? null;

  const metrics = useMemo(
    () => ({
      averageOffsetLabel:
        stats.totalAttempts === 0 ? '--' : `${Math.round(Math.abs(stats.averageOffsetMs))}ms`,
      hitRateLabel: stats.totalAttempts === 0 ? '--' : `${Math.round(stats.hitRate)}%`,
      perfect: stats.perfect,
      taps: stats.totalAttempts,
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
    setStats(emptySessionStats);
    evaluationsRef.current = [];
  }, []);

  const completeSession = useCallback(() => {
    resetTimers();
    void stopAudioSession();
    setProgress(1);
    setPreviewState('complete');
  }, [resetTimers]);

  useEffect(() => {
    return () => {
      resetTimers();
      void stopAudioSession();
    };
  }, [resetTimers]);

  const syncSessionState = useCallback(
    (track: PracticeTrack) => {
      const playbackPositionMs = getPracticePlaybackPositionMs();
      setProgress(Math.min(1, playbackPositionMs / track.durationMs));
      setCurrentTargetIndex(
        getActiveTargetIndex(
          playbackPositionMs,
          track.targetBeatTimestampsMs,
          track.beatIntervalMs,
        ),
      );

      if (!isPracticeTrackPlaying() && playbackPositionMs > 0.92 * track.durationMs) {
        completeSession();
      }
    },
    [completeSession],
  );

  const startTrack = useCallback(
    async (track: PracticeTrack) => {
      resetTimers();
      resetSessionState();
      setSelectedTrack(track);
      setPreviewState('active');

      await playPracticeTrack(track.assetSource);
      syncSessionState(track);

      progressIntervalRef.current = setInterval(() => {
        syncSessionState(track);
      }, progressIntervalMs);

      completionTimeoutRef.current = setTimeout(() => {
        completeSession();
      }, track.durationMs + 120);
    },
    [completeSession, resetSessionState, resetTimers, syncSessionState],
  );

  const finishSession = useCallback(() => {
    completeSession();
  }, [completeSession]);

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

  const handleTap = useCallback(() => {
    if (previewState !== 'active' || !selectedTrack || activeTargetTime == null) {
      return;
    }

    const tapTimestampMs = getPracticePlaybackPositionMs();
    const evaluation = scoreTapAtTime(tapTimestampMs, activeTargetTime);
    evaluationsRef.current = [...evaluationsRef.current, evaluation];

    setLatestResult(evaluation.result);

    const nextStats = calculateSessionStats(evaluationsRef.current);
    setStats(nextStats);
  }, [activeTargetTime, previewState, selectedTrack]);

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
