import { GRAVITY } from "../utils/constants";
import { AttackBox, ControlKey, Coordinate2D } from "./types";

interface SpriteConstructor {
  position: Coordinate2D;
  canvas: HTMLCanvasElement;
  imageSrc: string;
}

export default class Sprite {
  position: Coordinate2D;
  height: number;
  width: number;
  canvas: HTMLCanvasElement;
  drawingContext: CanvasRenderingContext2D;
  image: HTMLImageElement;

  constructor({ position, canvas, imageSrc }: SpriteConstructor) {
    this.position = position;
    this.canvas = canvas;
    this.drawingContext = canvas.getContext("2d");
    this.height = 250;
    this.width = 50;
    this.image = new Image();
    this.image.src = imageSrc;
  }

  public draw() {
    this.drawingContext.drawImage(this.image, this.position.x, this.position.y);
  }

  public update() {
    this.draw();
  }
}
