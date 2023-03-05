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
  position: Coordinate2D;
  offset: Coordinate2D;
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

export type ControlKey =
  | ControlKeys.a
  | ControlKeys.s
  | ControlKeys.d
  | ControlKeys.w
  | ControlKeys.ArrowLeft
  | ControlKeys.ArrowRight
  | ControlKeys.ArrowUp
  | ControlKeys.ArrowDown
  | ControlKeys.space;
