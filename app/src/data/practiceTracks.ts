export type PracticeTrack = {
  id: string;
  title: string;
  style: 'Salsa' | 'Bachata';
  bpm: number;
  beatLeadInMs: number;
  targetBeats: number;
};

export const practiceTracks: PracticeTrack[] = [
  {
    id: 'salsa-basic-1',
    title: 'Salsa Basic 1',
    style: 'Salsa',
    bpm: 85,
    beatLeadInMs: 1200,
    targetBeats: 8,
  },
  {
    id: 'salsa-basic-2',
    title: 'Salsa Basic 2',
    style: 'Salsa',
    bpm: 92,
    beatLeadInMs: 1200,
    targetBeats: 8,
  },
  {
    id: 'salsa-midtempo',
    title: 'Salsa Midtempo',
    style: 'Salsa',
    bpm: 105,
    beatLeadInMs: 1200,
    targetBeats: 10,
  },
  {
    id: 'bachata-basic-1',
    title: 'Bachata Basic 1',
    style: 'Bachata',
    bpm: 110,
    beatLeadInMs: 1000,
    targetBeats: 8,
  },
  {
    id: 'bachata-basic-2',
    title: 'Bachata Basic 2',
    style: 'Bachata',
    bpm: 118,
    beatLeadInMs: 1000,
    targetBeats: 8,
  },
  {
    id: 'bachata-midtempo',
    title: 'Bachata Midtempo',
    style: 'Bachata',
    bpm: 125,
    beatLeadInMs: 1000,
    targetBeats: 10,
  },
];
