import { bpmToIntervalMs } from '../utils/timing';
import { buildTargetBeatMap } from '../features/practice/findTheOne.helpers';

export type PracticeTrack = {
  assetSource: number;
  beatIntervalMs: number;
  beatLeadInMs: number;
  bpm: number;
  durationMs: number;
  id: string;
  style: 'Salsa' | 'Bachata';
  targetBeatTimestampsMs: number[];
  title: string;
};

type PracticeTrackConfig = {
  assetSource: number;
  beatLeadInMs: number;
  bpm: number;
  id: string;
  style: 'Salsa' | 'Bachata';
  targetBeatCount: number;
  title: string;
  trailerMs?: number;
};

function createPracticeTrack(config: PracticeTrackConfig): PracticeTrack {
  const beatIntervalMs = bpmToIntervalMs(config.bpm);
  const targetBeatTimestampsMs = buildTargetBeatMap(
    config.beatLeadInMs,
    beatIntervalMs,
    config.targetBeatCount,
  );
  const trailerMs = config.trailerMs ?? 1600;

  return {
    ...config,
    beatIntervalMs,
    durationMs: Math.round(
      config.beatLeadInMs + config.targetBeatCount * 8 * beatIntervalMs + trailerMs,
    ),
    targetBeatTimestampsMs,
  };
}

export const practiceTracks: PracticeTrack[] = [
  createPracticeTrack({
    assetSource: require('../../assets/practice/salsa-basic-1.wav'),
    beatLeadInMs: 1600,
    bpm: 85,
    id: 'salsa-basic-1',
    style: 'Salsa',
    targetBeatCount: 5,
    trailerMs: 2000,
    title: 'Salsa Basic 1',
  }),
  createPracticeTrack({
    assetSource: require('../../assets/practice/salsa-basic-2.wav'),
    beatLeadInMs: 1500,
    bpm: 92,
    id: 'salsa-basic-2',
    style: 'Salsa',
    targetBeatCount: 5,
    trailerMs: 2000,
    title: 'Salsa Basic 2',
  }),
  createPracticeTrack({
    assetSource: require('../../assets/practice/salsa-midtempo.wav'),
    beatLeadInMs: 1450,
    bpm: 105,
    id: 'salsa-midtempo',
    style: 'Salsa',
    targetBeatCount: 6,
    trailerMs: 2000,
    title: 'Salsa Midtempo',
  }),
  createPracticeTrack({
    assetSource: require('../../assets/practice/bachata-basic-1.wav'),
    beatLeadInMs: 1400,
    bpm: 110,
    id: 'bachata-basic-1',
    style: 'Bachata',
    targetBeatCount: 5,
    trailerMs: 2000,
    title: 'Bachata Basic 1',
  }),
  createPracticeTrack({
    assetSource: require('../../assets/practice/bachata-basic-2.wav'),
    beatLeadInMs: 1350,
    bpm: 118,
    id: 'bachata-basic-2',
    style: 'Bachata',
    targetBeatCount: 5,
    trailerMs: 2000,
    title: 'Bachata Basic 2',
  }),
  createPracticeTrack({
    assetSource: require('../../assets/practice/bachata-midtempo.wav'),
    beatLeadInMs: 1300,
    bpm: 125,
    id: 'bachata-midtempo',
    style: 'Bachata',
    targetBeatCount: 6,
    trailerMs: 2000,
    title: 'Bachata Midtempo',
  }),
];
