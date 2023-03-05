import { GRAVITY } from "../utils/constants";
import Sprite, { SpriteConstructor } from "./sprite";
import { AttackBox, ControlKey, Coordinate2D } from "./types";

export interface FighterConstructor extends SpriteConstructor {
  velocity: Coordinate2D;
  color?: string;
  offset: Coordinate2D;
}

export default class Fighter extends Sprite {
  velocity: Coordinate2D;
  height: number;
  width: number;
  lastKey: ControlKey;
  attackBox: AttackBox;
  color: string;
  isAttacking: boolean;
  health: number;

  constructor({
    position,
    velocity,
    canvas,
    color,
    offset,
    imageSrc,
    scale = 1,
    frames = 1,
    framesHold = 1,
  }: FighterConstructor) {
    super({ position, canvas, imageSrc, scale, frames, framesHold });
    this.position = position;
    this.velocity = velocity;
    this.drawingContext = canvas.getContext("2d");
    this.height = 250;
    this.width = 50;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 100,
      height: 50,
      offset,
    };
    this.color = color ?? "red";
    this.isAttacking = false;
    this.health = 100;
  }

  public draw() {
    super.draw();
    // this.drawingContext.fillStyle = this.color;
    // this.drawingContext.fillRect(
    //   this.position.x,
    //   this.position.y,
    //   this.width,
    //   this.height
    // );
    if (this.isAttacking) {
      this.drawingContext.fillStyle = "gray";
      this.drawingContext.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height
      );
    }
  }

  public update() {
    this.draw();
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (
      this.position.y + this.height + this.velocity.y >=
      this.canvas.height - 97
    ) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += GRAVITY;
    }
  }

  public attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}
