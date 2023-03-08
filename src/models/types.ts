export interface Coordinate2D {
  x: number;
  y: number;
}

export interface SpriteData {
  imageSrc: string;
  frames: number;
  image?: HTMLImageElement;
}

export interface SpriteListing {
  [name: string]: SpriteData;
}

export interface AttackBox {
  width: number;
  height: number;
  position?: Coordinate2D;
  offset: Coordinate2D;
}

export enum SpriteTypes {
  idle = "idle",
  jump = "jump",
  fall = "fall",
  attack = "attack",
  run = "run",
  death = "death",
  hit = "hit",
}

export enum ControlKeys {
  a = "a",
  s = "s",
  d = "d",
  w = "w",
  ArrowLeft = "ArrowLeft",
  ArrowRight = "ArrowRight",
  ArrowUp = "ArrowUp",
  ArrowDown = "ArrowDown",
  space = " ",
}

interface KeyTracker {
  pressed: boolean;
}

export interface KeysTracker {
  [name: string]: KeyTracker;
}

export type SpriteConstructor = {
  canvas: HTMLCanvasElement;
  imageSrc: string;
  position: Coordinate2D;
  offset?: Coordinate2D;
  scale?: number;
  frames?: number;
  framesHold?: number;
};

export type FighterConstructor = Omit<SpriteConstructor, "imageSrc"> & {
  sprites: SpriteListing;
  attackBox: AttackBox;
  hitPower?: number;
};
