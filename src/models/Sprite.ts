import { Coordinate2D } from "./types";

export interface SpriteConstructor {
  position: Coordinate2D;
  offset?: Coordinate2D;
  canvas: HTMLCanvasElement;
  imageSrc: string;
  scale?: number;
  frames?: number;
  framesHold?: number;
  flipped?: boolean;
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
  flipped: boolean;

  constructor({
    position,
    canvas,
    imageSrc,
    offset = { x: 0, y: 0 },
    scale = 1,
    frames = 1,
    framesHold = 1,
    flipped = false,
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
    this.flipped = flipped;
  }

  draw() {
    const width = this.flipped
      ? (this.image.width / this.frames) * this.scale * -1
      : (this.image.width / this.frames) * this.scale;

    if (this.flipped) {
      this.drawingContext.save();
      this.drawingContext.scale(-1, 1);
    }
    this.drawingContext.drawImage(
      this.image, // the loaded image file
      this.currentFrame * (this.image.width / this.frames), // X location of viewport
      0, // Y location of viewport
      this.image.width / this.frames, // Width of viewport
      this.image.height, // Height of viewport

      this.position.x - this.offset.x, // X position of image in canvas
      this.position.y - this.offset.y, // Y position of image in canvas
      width, // Width of image in canvas
      this.image.height * this.scale // Height of image in canvas
    );
    if (this.flipped) {
      this.drawingContext.restore();
    }
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
