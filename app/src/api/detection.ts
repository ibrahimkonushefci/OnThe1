import { analyzeMeteringWindow } from '../features/detect/detect.helpers';
import { captureMeteringWindow } from '../services/audioService';

export type DetectionResult = {
  bpm: number;
  confidence: number;
  danceStyle: 'salsa' | 'bachata';
  firstBeatOffsetMs: number;
};

const captureDurationMs = 7200;

export async function detectFromLiveAudio(): Promise<DetectionResult> {
  const samples = await captureMeteringWindow(captureDurationMs);
  const detection = analyzeMeteringWindow(samples);

  if (!detection) {
    throw new Error('Could not confidently detect the rhythm.');
  }

  return detection;
}
