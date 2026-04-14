export type TapResultType = 'perfect' | 'good' | 'early' | 'late';

export type TapEvaluation = {
  offsetMs: number;
  result: TapResultType;
};

export type SessionStats = {
  totalAttempts: number;
  perfect: number;
  good: number;
  early: number;
  late: number;
  hitRate: number;
  averageOffsetMs: number;
};

export const perfectWindowMs = 100;
export const goodWindowMs = 220;

export const emptySessionStats: SessionStats = {
  totalAttempts: 0,
  perfect: 0,
  good: 0,
  early: 0,
  late: 0,
  hitRate: 0,
  averageOffsetMs: 0,
};

export function buildTargetBeatMap(
  beatLeadInMs: number,
  beatIntervalMs: number,
  targetBeatCount: number,
) {
  return Array.from({ length: targetBeatCount }, (_, index) => {
    return Math.round(beatLeadInMs + index * beatIntervalMs * 8);
  });
}

export function getActiveTargetIndex(
  playbackPositionMs: number,
  targetBeatTimestampsMs: number[],
  beatIntervalMs: number,
) {
  if (targetBeatTimestampsMs.length === 0) {
    return 0;
  }

  const lookBehindWindowMs = beatIntervalMs * 0.45;

  const index = targetBeatTimestampsMs.findIndex((timestamp) => {
    return playbackPositionMs < timestamp + lookBehindWindowMs;
  });

  return index === -1 ? targetBeatTimestampsMs.length - 1 : index;
}

export function scoreTapAtTime(tapTimestampMs: number, targetTimestampMs: number): TapEvaluation {
  const offsetMs = tapTimestampMs - targetTimestampMs;
  const absoluteOffsetMs = Math.abs(offsetMs);

  if (absoluteOffsetMs <= perfectWindowMs) {
    return {
      offsetMs,
      result: 'perfect',
    };
  }

  if (absoluteOffsetMs <= goodWindowMs) {
    return {
      offsetMs,
      result: 'good',
    };
  }

  return {
    offsetMs,
    result: offsetMs < 0 ? 'early' : 'late',
  };
}

export function calculateSessionStats(evaluations: TapEvaluation[]): SessionStats {
  if (evaluations.length === 0) {
    return emptySessionStats;
  }

  const totals = evaluations.reduce(
    (current, evaluation) => {
      return {
        ...current,
        totalAttempts: current.totalAttempts + 1,
        perfect: current.perfect + (evaluation.result === 'perfect' ? 1 : 0),
        good: current.good + (evaluation.result === 'good' ? 1 : 0),
        early: current.early + (evaluation.result === 'early' ? 1 : 0),
        late: current.late + (evaluation.result === 'late' ? 1 : 0),
        offsetSum: current.offsetSum + evaluation.offsetMs,
      };
    },
    {
      totalAttempts: 0,
      perfect: 0,
      good: 0,
      early: 0,
      late: 0,
      offsetSum: 0,
    },
  );

  const successfulAttempts = totals.perfect + totals.good;

  return {
    totalAttempts: totals.totalAttempts,
    perfect: totals.perfect,
    good: totals.good,
    early: totals.early,
    late: totals.late,
    hitRate: (successfulAttempts / totals.totalAttempts) * 100,
    averageOffsetMs: totals.offsetSum / totals.totalAttempts,
  };
}
