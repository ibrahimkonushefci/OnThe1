export function bpmToIntervalMs(bpm: number) {
  return Math.round(60000 / bpm);
}
