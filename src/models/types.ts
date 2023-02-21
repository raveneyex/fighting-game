export interface Coordinate2D {
  x: number;
  y: number;
};

export type ControlKey = 
  'a' | 's' | 'd' | 'w' | 'ArrowLeft' | 'ArrowRight' | 'ArrowUp' | 'ArrowDown';

export enum ControlKeys {
  a = 'a',
  s = 's',
  d = 'd',
  w = 'w',
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight',
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown'
};