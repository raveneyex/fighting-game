import { Coordinate2D } from "./types";

export interface SpriteConstructor {
  position: Coordinate2D;
  offset?: Coordinate2D;
  canvas: HTMLCanvasElement;
  imageSrc: string;
  scale?: number;
  frames?: number;
  framesHold?: number;
}

export default class Sprite {
  scale: number;
  frames: number;
  currentFrame: number;
  framesElapsed: number;
  framesHold: number;
  position: Coordinate2D;
  offset: Coordinate2D;
  canvas: HTMLCanvasElement;
  drawingContext: CanvasRenderingContext2D;
  image: HTMLImageElement;

  constructor({
    position,
    canvas,
    imageSrc,
    offset = { x: 0, y: 0 },
    scale = 1,
    frames = 1,
    framesHold = 1,
  }: SpriteConstructor) {
    this.canvas = canvas;
    this.position = position;
    this.drawingContext = canvas.getContext("2d");
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.frames = frames;
    this.currentFrame = 0;
    this.framesElapsed = 0;
    this.framesHold = framesHold;
    this.offset = offset;
  }

  draw() {
    this.drawingContext.drawImage(
      this.image, // the loaded image file
      this.currentFrame * (this.image.width / this.frames), // X location of viewport
      0, // Y location of viewport
      this.image.width / this.frames, // Width of viewport
      this.image.height, // Height of viewport

      this.position.x - this.offset.x, // X position of image in canvas
      this.position.y - this.offset.y, // Y position of image in canvas
      (this.image.width / this.frames) * this.scale, // Width of image in canvas
      this.image.height * this.scale // Height of image in canvas
    );
  }

  animateFrames() {
    this.framesElapsed++;

    if (this.framesElapsed % this.framesHold === 0) {
      if (this.currentFrame < this.frames - 1) {
        this.currentFrame++;
      } else {
        this.currentFrame = 0;
      }
    }
  }

  public update() {
    this.draw();
    this.animateFrames();
  }
}
