export interface Captain {
  id: string;
  name: string;
  division: number;
  zanpakuto: string;
  bankai: string;
  curiosities: string[];
}

export type PageType = 'home' | 'personagens' | 'assistir';
