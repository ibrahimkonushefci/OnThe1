export type DetectionResult = {
  danceStyle: 'salsa' | 'bachata';
  bpm: number;
  firstBeatOffsetMs: number;
  confidence?: number;
};

export async function detectFromLiveAudio(): Promise<DetectionResult> {
  return {
    danceStyle: 'salsa',
    bpm: 96,
    firstBeatOffsetMs: 1200,
    confidence: 0.72,
  };
}
