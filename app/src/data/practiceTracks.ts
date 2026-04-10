export type PracticeTrack = {
  id: string;
  title: string;
  style: 'Salsa' | 'Bachata';
  bpm: number;
};

export const practiceTracks: PracticeTrack[] = [
  { id: 'salsa-basic-1', title: 'Salsa Basic 1', style: 'Salsa', bpm: 85 },
  { id: 'salsa-basic-2', title: 'Salsa Basic 2', style: 'Salsa', bpm: 92 },
  { id: 'salsa-midtempo', title: 'Salsa Midtempo', style: 'Salsa', bpm: 105 },
  { id: 'bachata-basic-1', title: 'Bachata Basic 1', style: 'Bachata', bpm: 110 },
  { id: 'bachata-basic-2', title: 'Bachata Basic 2', style: 'Bachata', bpm: 118 },
  { id: 'bachata-midtempo', title: 'Bachata Midtempo', style: 'Bachata', bpm: 125 },
];
