import type { MeteringSample } from '../../services/audioService';
import type { DetectionResult } from '../../api/detection';

const minimumSampleCount = 32;
const minimumOnsetSpacingMs = 180;
const minimumDynamicRangeDb = 6;

type EnvelopeSample = {
  amplitude: number;
  onset: number;
  timeMs: number;
};

type Peak = {
  amplitude: number;
  beatIndex: number;
  score: number;
  timeMs: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function average(values: number[]) {
  if (values.length === 0) {
    return 0;
  }

  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function median(values: number[]) {
  if (values.length === 0) {
    return 0;
  }

  const sorted = [...values].sort((left, right) => left - right);
  const midpoint = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[midpoint - 1] + sorted[midpoint]) / 2;
  }

  return sorted[midpoint];
}

function percentile(values: number[], ratio: number) {
  if (values.length === 0) {
    return 0;
  }

  const sorted = [...values].sort((left, right) => left - right);
  const index = clamp(Math.round((sorted.length - 1) * ratio), 0, sorted.length - 1);

  return sorted[index];
}

function buildAdaptiveEnvelope(samples: MeteringSample[]) {
  const meteringValues = samples.map((sample) => sample.metering);
  const lowDb = percentile(meteringValues, 0.12);
  const highDb = percentile(meteringValues, 0.95);
  const dynamicRangeDb = highDb - lowDb;

  if (dynamicRangeDb < minimumDynamicRangeDb) {
    return null;
  }

  const normalized = samples.map((sample) => {
    return clamp((sample.metering - lowDb) / Math.max(dynamicRangeDb, 1), 0, 1);
  });

  const smoothed = normalized.map((_, index) => {
    const window = normalized.slice(Math.max(0, index - 2), Math.min(normalized.length, index + 3));
    return average(window);
  });

  return smoothed.map((amplitude, index) => {
    const previousAmplitude = smoothed[index - 1] ?? amplitude;
    const onset = Math.max(0, amplitude - previousAmplitude);

    return {
      amplitude,
      onset,
      timeMs: samples[index].timeMs,
    };
  });
}

function getSampleSpacingMs(samples: MeteringSample[]) {
  const spacings = samples.slice(1).map((sample, index) => {
    return sample.timeMs - samples[index].timeMs;
  });

  return Math.max(1, Math.round(median(spacings)));
}

function estimateBeatIntervalMs(envelope: EnvelopeSample[], sampleSpacingMs: number) {
  const minLag = Math.max(8, Math.round(420 / sampleSpacingMs));
  const maxLag = Math.max(minLag + 1, Math.round(820 / sampleSpacingMs));
  const onsetValues = envelope.map((sample) => sample.onset + sample.amplitude * 0.18);
  const meanValue = average(onsetValues);
  const centered = onsetValues.map((value) => value - meanValue);
  const variance = average(centered.map((value) => value * value));

  if (variance < 0.0005) {
    return null;
  }

  let bestLag = 0;
  let bestScore = Number.NEGATIVE_INFINITY;

  for (let lag = minLag; lag <= maxLag; lag += 1) {
    let score = 0;

    for (let index = lag; index < centered.length; index += 1) {
      score += centered[index] * centered[index - lag];
    }

    const normalizedScore = score / ((centered.length - lag) * variance);
    const harmonicLag = lag * 2;
    const harmonicScore =
      harmonicLag < centered.length
        ? centered
            .slice(harmonicLag)
            .reduce((sum, value, index) => sum + value * centered[index], 0) /
          ((centered.length - harmonicLag) * variance)
        : 0;

    const combinedScore = normalizedScore + harmonicScore * 0.35;

    if (combinedScore > bestScore) {
      bestScore = combinedScore;
      bestLag = lag;
    }
  }

  if (bestLag === 0) {
    return null;
  }

  return {
    beatIntervalMs: bestLag * sampleSpacingMs,
    periodicityScore: bestScore,
  };
}

function collectPeaks(envelope: EnvelopeSample[]) {
  const scores = envelope.map((sample) => sample.onset * 1.9 + sample.amplitude * 0.45);
  const threshold = percentile(scores, 0.74);
  const peaks: Peak[] = [];

  for (let index = 1; index < envelope.length - 1; index += 1) {
    const current = envelope[index];
    const previous = envelope[index - 1];
    const next = envelope[index + 1];
    const score = scores[index];

    if (
      score < threshold ||
      current.onset < previous.onset ||
      current.onset < next.onset
    ) {
      continue;
    }

    const previousPeak = peaks[peaks.length - 1];
    if (previousPeak && current.timeMs - previousPeak.timeMs < minimumOnsetSpacingMs) {
      if (score > previousPeak.score) {
        peaks[peaks.length - 1] = {
          amplitude: current.amplitude,
          beatIndex: 0,
          score,
          timeMs: current.timeMs,
        };
      }
      continue;
    }

    peaks.push({
      amplitude: current.amplitude,
      beatIndex: 0,
      score,
      timeMs: current.timeMs,
    });
  }

  return peaks;
}

function assignBeatIndexes(peaks: Peak[], beatIntervalMs: number) {
  if (peaks.length === 0) {
    return peaks;
  }

  let runningBeatIndex = 0;
  const indexedPeaks: Peak[] = [{ ...peaks[0], beatIndex: 0 }];

  for (let index = 1; index < peaks.length; index += 1) {
    const deltaMs = peaks[index].timeMs - peaks[index - 1].timeMs;
    const beatJump = Math.max(1, Math.round(deltaMs / beatIntervalMs));
    runningBeatIndex += beatJump;

    indexedPeaks.push({
      ...peaks[index],
      beatIndex: runningBeatIndex,
    });
  }

  return indexedPeaks;
}

function estimateFirstBeatOffsetMs(
  peaks: Peak[],
  beatIntervalMs: number,
  captureEndTimeMs: number,
) {
  const phaseScores = new Array<number>(8).fill(0);

  for (const peak of peaks) {
    phaseScores[peak.beatIndex % 8] += peak.score * (0.65 + peak.amplitude);
  }

  const strongestPhaseScore = Math.max(...phaseScores);
  const targetPhase = phaseScores.findIndex((score) => score === strongestPhaseScore);
  const lastPeak = peaks[peaks.length - 1];
  const beatsSinceLastPeak = Math.max(
    0,
    Math.ceil((captureEndTimeMs - lastPeak.timeMs) / beatIntervalMs),
  );

  let nextBeatIndex = lastPeak.beatIndex + beatsSinceLastPeak;
  while (nextBeatIndex % 8 !== targetPhase) {
    nextBeatIndex += 1;
  }

  const nextBeatTimeMs =
    lastPeak.timeMs + (nextBeatIndex - lastPeak.beatIndex) * beatIntervalMs;

  return {
    offsetMs: clamp(Math.round(nextBeatTimeMs - captureEndTimeMs), 180, Math.round(beatIntervalMs * 8)),
    phaseScores,
  };
}

function calculateConfidence(
  peaks: Peak[],
  beatIntervalMs: number,
  periodicityScore: number,
  phaseScores: number[],
) {
  const foldedIntervals = peaks.slice(1).map((peak, index) => {
    const interval = peaks[index + 1].timeMs - peaks[index].timeMs;
    const normalizedInterval = interval / beatIntervalMs;
    return Math.abs(normalizedInterval - Math.round(normalizedInterval));
  });
  const intervalError = foldedIntervals.length === 0 ? 1 : average(foldedIntervals);
  const sortedPhaseScores = [...phaseScores].sort((left, right) => right - left);
  const phaseSeparation =
    sortedPhaseScores[0] === 0
      ? 0
      : (sortedPhaseScores[0] - (sortedPhaseScores[1] ?? 0)) / sortedPhaseScores[0];

  const periodicityConfidence = clamp(periodicityScore / 0.7, 0, 1);
  const regularityConfidence = clamp(1 - intervalError * 2.2, 0, 1);
  const coverageConfidence = clamp(peaks.length / 10, 0, 1);

  return Number(
    (
      periodicityConfidence * 0.45 +
      regularityConfidence * 0.3 +
      coverageConfidence * 0.15 +
      phaseSeparation * 0.1
    ).toFixed(2),
  );
}

export function analyzeMeteringWindow(samples: MeteringSample[]): DetectionResult | null {
  if (samples.length < minimumSampleCount) {
    return null;
  }

  const envelope = buildAdaptiveEnvelope(samples);
  if (!envelope) {
    return null;
  }

  const sampleSpacingMs = getSampleSpacingMs(samples);
  const beatEstimate = estimateBeatIntervalMs(envelope, sampleSpacingMs);
  if (!beatEstimate) {
    return null;
  }

  const peaks = collectPeaks(envelope);
  if (peaks.length < 4) {
    return null;
  }

  const indexedPeaks = assignBeatIndexes(peaks, beatEstimate.beatIntervalMs);
  const captureEndTimeMs = samples[samples.length - 1].timeMs;
  const firstBeatEstimate = estimateFirstBeatOffsetMs(
    indexedPeaks,
    beatEstimate.beatIntervalMs,
    captureEndTimeMs,
  );
  const confidence = calculateConfidence(
    indexedPeaks,
    beatEstimate.beatIntervalMs,
    beatEstimate.periodicityScore,
    firstBeatEstimate.phaseScores,
  );

  if (confidence < 0.24) {
    return null;
  }

  const bpm = Math.round(60000 / beatEstimate.beatIntervalMs);

  return {
    bpm,
    confidence,
    danceStyle: bpm >= 107 ? 'bachata' : 'salsa',
    firstBeatOffsetMs: firstBeatEstimate.offsetMs,
  };
}
