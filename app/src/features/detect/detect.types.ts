export type DetectPreviewState =
  | 'idle'
  | 'listening'
  | 'result'
  | 'permissionDenied'
  | 'failure';

export type MockDetectionResult = {
  danceStyle: 'Salsa' | 'Bachata';
  bpm: number;
  cueReadyText: string;
  statusText: string;
};
