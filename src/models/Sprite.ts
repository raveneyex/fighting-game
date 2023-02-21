import { GRAVITY } from "../utils/constants";
import { ControlKey, Coordinate2D } from "./types";

interface SpriteConstructor {
  position: Coordinate2D,
  velocity: Coordinate2D,
  canvas: HTMLCanvasElement,
}

export default class Sprite {
  position: Coordinate2D;
  velocity: Coordinate2D;
  height: number;
  canvas: HTMLCanvasElement;
  drawingContext: CanvasRenderingContext2D;
  lastKey: ControlKey;

  constructor({ position, velocity, canvas }: SpriteConstructor) {
    this.position = position;
    this.velocity = velocity;
    this.canvas = canvas;
    this.drawingContext = canvas.getContext("2d");
    this.height = 250;
  }

  public draw() {
    this.drawingContext.fillStyle = 'red';
    this.drawingContext.fillRect(this.position.x, this.position.y, 50, this.height);
  }

  public update() {
    this.draw();
    
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= this.canvas.height) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += GRAVITY;
    }
  }
}
