import { GRAVITY } from "../utils/constants";
import Sprite, { SpriteConstructor } from "./sprite";
import { AttackBox, ControlKey, Coordinate2D, SpriteListing } from "./types";

type FighterConstructor = Omit<SpriteConstructor, "imageSrc"> & {
  sprites: SpriteListing;
  attackBox: AttackBox;
};

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
  isDead: boolean;

  constructor({ position, canvas, offset, sprites, attackBox, scale = 2.5, framesHold = 5 }: FighterConstructor) {
    const imageSrc = sprites.idle.imageSrc;
    const frames = sprites.idle.frames;

    super({
      position,
      canvas,
      scale,
      offset,
      framesHold,
      imageSrc,
      frames,
    });
    this.drawingContext = canvas.getContext("2d");

    this.velocity = { x: 0, y: 0 };
    this.height = 150;
    this.width = 50;
    this.health = 100;

    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: attackBox.width,
      height: attackBox.height,
      offset: attackBox.offset,
    };

    this.isAttacking = false;
    this.isDead = false;

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
    if (!this.isDead) {
      this.animateFrames();
    }

    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

    // this.drawingContext.fillRect(
    //   this.attackBox.position.x,
    //   this.attackBox.position.y,
    //   this.attackBox.width,
    //   this.attackBox.height
    // );

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= this.canvas.height - 96) {
      this.velocity.y = 0;
      this.position.y = 330;
    } else {
      this.velocity.y += GRAVITY;
    }
  }

  public attack() {
    this.switchSprite("attack");
    this.isAttacking = true;
  }

  public moveLeft() {
    this.switchSprite("run");
    this.velocity.x = -5;
  }

  public moveRight() {
    this.switchSprite("run");
    this.velocity.x = 5;
  }

  public takeHit() {
    this.health -= 20;
    if (this.health <= 0) {
      this.switchSprite("death");
    } else {
      this.switchSprite("hit");
    }
  }

  public jump() {
    this.velocity.y = -20;
  }

  public switchSprite(sprite: string) {
    if (this.image === this.sprites.death.image) {
      if (this.currentFrame === this.sprites.death.frames - 1) {
        this.isDead = true;
      }
      return;
    }

    if (this.image === this.sprites.attack.image && this.currentFrame < this.sprites.attack.frames - 1) {
      return;
    }

    if (this.image === this.sprites.hit.image && this.currentFrame < this.sprites.hit.frames - 1) {
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
