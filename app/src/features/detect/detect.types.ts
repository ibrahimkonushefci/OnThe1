export type DetectPreviewState =
  | 'idle'
  | 'listening'
  | 'result'
  | 'permissionDenied'
  | 'failure';

export type DetectResult = {
  danceStyle: 'Salsa' | 'Bachata';
  bpm: number;
  firstBeatOffsetMs: number;
  cueReadyText: string;
  statusText: string;
  confidence?: number;
};
