export enum Chapter {
  ORIGIN = 'ORIGIN',
  MEMORY = 'MEMORY',
  NIGHT = 'NIGHT',
  JOURNEY = 'JOURNEY',
  QUESTION = 'QUESTION',
  ASK = 'ASK',
  GALLERY = 'GALLERY',
}

export interface AudioState {
  isPlaying: boolean;
  hasStarted: boolean;
  volume: number; // 0 to 1
}

export interface ThemeState {
  isDark: boolean;
  accentColor: string;
}
