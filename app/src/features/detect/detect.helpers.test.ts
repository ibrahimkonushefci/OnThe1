import { describe, expect, it } from 'vitest';

import type { MeteringSample } from '../../services/audioService';
import { analyzeMeteringWindow } from './detect.helpers';

function buildMeteringWindow(
  bpm: number,
  accentPhase: number,
  totalMs: number = 5600,
  sampleIntervalMs: number = 40,
  options?: {
    backgroundDb?: number;
    jitter?: number;
    quiet?: boolean;
  },
): MeteringSample[] {
  const beatIntervalMs = 60000 / bpm;
  const samples: MeteringSample[] = [];
  const backgroundDb = options?.backgroundDb ?? -58;
  const jitter = options?.jitter ?? 1.4;
  const quiet = options?.quiet ?? false;

  for (let timeMs = 0; timeMs <= totalMs; timeMs += sampleIntervalMs) {
    let metering = backgroundDb + Math.sin(timeMs / 240) * jitter;

    for (let beatIndex = 0; beatIndex < 32; beatIndex += 1) {
      const beatTimeMs = 420 + beatIndex * beatIntervalMs;
      const distance = Math.abs(timeMs - beatTimeMs);
      if (distance > 75) {
        continue;
      }

      const phase = beatIndex % 8;
      const accentBoost = phase === accentPhase ? 10 : phase === 4 ? 7 : 4;
      const quietPenalty = quiet ? 7.5 : 0;
      metering = Math.max(metering, -42 + accentBoost - quietPenalty - distance * 0.12);
    }

    samples.push({
      metering,
      timeMs,
    });
  }

  return samples;
}

describe('detect helpers', () => {
  it('detects a salsa-like metering window', () => {
    const result = analyzeMeteringWindow(buildMeteringWindow(96, 0));

    expect(result).not.toBeNull();
    expect(result?.danceStyle).toBe('salsa');
    expect(result?.bpm).toBeGreaterThanOrEqual(92);
    expect(result?.bpm).toBeLessThanOrEqual(100);
    expect(result?.firstBeatOffsetMs).toBeGreaterThan(0);
    expect(result?.confidence).toBeGreaterThan(0.4);
  });

  it('detects a bachata-like metering window', () => {
    const result = analyzeMeteringWindow(buildMeteringWindow(122, 0));

    expect(result).not.toBeNull();
    expect(result?.danceStyle).toBe('bachata');
    expect(result?.bpm).toBeGreaterThanOrEqual(118);
    expect(result?.bpm).toBeLessThanOrEqual(126);
    expect(result?.confidence).toBeGreaterThan(0.4);
  });

  it('still detects a quieter, noisier rhythm bed', () => {
    const result = analyzeMeteringWindow(
      buildMeteringWindow(118, 0, 7200, 40, {
        backgroundDb: -56,
        jitter: 2.6,
        quiet: true,
      }),
    );

    expect(result).not.toBeNull();
    expect(result?.bpm).toBeGreaterThanOrEqual(112);
    expect(result?.bpm).toBeLessThanOrEqual(124);
    expect(result?.confidence).toBeGreaterThan(0.24);
  });

  it('fails cleanly on near-flat microphone input', () => {
    const silentSamples = Array.from({ length: 160 }, (_, index) => ({
      metering: -60,
      timeMs: index * 40,
    }));

    expect(analyzeMeteringWindow(silentSamples)).toBeNull();
  });
});
