import { Coordinate2D, SpriteConstructor } from "./types";

export default class Sprite {
  private scale: number;
  private framesElapsed: number;
  private framesHold: number;
  private offset: Coordinate2D;
  private _currentFrame: number;
  private _frames: number;

  protected canvas: HTMLCanvasElement;
  protected drawingContext: CanvasRenderingContext2D;
  protected image: HTMLImageElement;

  position: Coordinate2D;

  constructor({ position, canvas, imageSrc, scale, frames, framesHold, offset }: SpriteConstructor) {
    this.canvas = canvas;
    this.position = position;
    this.drawingContext = canvas.getContext("2d");
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale || 1;
    this._frames = frames || 1;
    this.framesHold = framesHold || 1;
    this.offset = offset || { x: 0, y: 0 };
    this._currentFrame = 0;
    this.framesElapsed = 0;
  }

  get currentFrame(): number {
    return this._currentFrame;
  }

  set currentFrame(value: number) {
    this._currentFrame = value;
  }

  get frames(): number {
    return this._frames;
  }

  set frames(value: number) {
    this._frames = value;
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
        this._currentFrame++;
      } else {
        this._currentFrame = 0;
      }
    }
  }

  update() {
    this.draw();
    this.animateFrames();
  }
}
