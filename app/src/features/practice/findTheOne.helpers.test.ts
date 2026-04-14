import { describe, expect, it } from 'vitest';

import {
  buildTargetBeatMap,
  calculateSessionStats,
  getActiveTargetIndex,
  scoreTapAtTime,
} from './findTheOne.helpers';

describe('findTheOne helpers', () => {
  it('builds the target beat map on 8-count intervals', () => {
    expect(buildTargetBeatMap(1500, 500, 4)).toEqual([1500, 5500, 9500, 13500]);
  });

  it('scores taps against the expected timing windows', () => {
    expect(scoreTapAtTime(1000, 950)).toEqual({
      offsetMs: 50,
      result: 'perfect',
    });

    expect(scoreTapAtTime(1190, 1000)).toEqual({
      offsetMs: 190,
      result: 'good',
    });

    expect(scoreTapAtTime(740, 1000)).toEqual({
      offsetMs: -260,
      result: 'early',
    });

    expect(scoreTapAtTime(1320, 1000)).toEqual({
      offsetMs: 320,
      result: 'late',
    });
  });

  it('keeps the active target around the current beat window', () => {
    const targets = [1600, 5600, 9600];

    expect(getActiveTargetIndex(1400, targets, 600)).toBe(0);
    expect(getActiveTargetIndex(5850, targets, 600)).toBe(1);
    expect(getActiveTargetIndex(9800, targets, 600)).toBe(2);
  });

  it('aggregates session stats from tap evaluations', () => {
    const stats = calculateSessionStats([
      { offsetMs: 30, result: 'perfect' },
      { offsetMs: 150, result: 'good' },
      { offsetMs: -300, result: 'early' },
      { offsetMs: 280, result: 'late' },
    ]);

    expect(stats.totalAttempts).toBe(4);
    expect(stats.perfect).toBe(1);
    expect(stats.good).toBe(1);
    expect(stats.early).toBe(1);
    expect(stats.late).toBe(1);
    expect(stats.hitRate).toBe(50);
    expect(stats.averageOffsetMs).toBeCloseTo(40, 5);
  });
});
