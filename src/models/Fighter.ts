import { GRAVITY } from "../utils/constants";
import Sprite, { SpriteConstructor } from "./sprite";
import { AttackBox, ControlKey, Coordinate2D, SpriteListing } from "./types";

export interface FighterConstructor extends SpriteConstructor {
  velocity?: Coordinate2D;
  color?: string;
  sprites?: SpriteListing;
  width: number;
  height: number;
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
  sprites: SpriteListing;

  constructor({
    position,
    velocity = { x: 0, y: 0 },
    canvas,
    color,
    offset,
    imageSrc,
    frames = 1,
    scale = 1,
    framesHold = 1,
    sprites,
    width,
    height,
  }: FighterConstructor) {
    super({
      position,
      canvas,
      scale,
      offset,
      framesHold,
      imageSrc,
      frames,
    });
    this.position = position;
    this.velocity = velocity;
    this.drawingContext = canvas.getContext("2d");
    this.height = height;
    this.width = width;
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
    this.sprites = sprites;
    this.initSpriteImages();
  }

  private initSpriteImages() {
    for (const sprite in this.sprites) {
      this.sprites[sprite].image = new Image();
      this.sprites[sprite].image.src = this.sprites[sprite].imageSrc;
    }
  }

  public update() {
    this.draw();
    this.animateFrames();

    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (
      this.position.y + this.height + this.velocity.y >=
      this.canvas.height - 96
    ) {
      this.velocity.y = 0;
      this.position.y = 258;
    } else {
      this.velocity.y += GRAVITY;
    }
    console.log(this.position.y);
  }

  public attack() {
    this.switchSprite("attack");
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }

  public switchSprite(sprite: string) {
    if (
      this.image === this.sprites.attack.image &&
      this.currentFrame < this.sprites.attack.frames - 1
    ) {
      return;
    }

    const selectedSprite = this.sprites[sprite];

    if (this.image !== selectedSprite.image) {
      this.currentFrame = 0;
      this.image = selectedSprite.image;
      this.frames = selectedSprite.frames;
    }
  }
}
