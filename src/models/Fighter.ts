import { GRAVITY } from "../utils/constants";
import Sprite, { SpriteConstructor } from "./sprite";
import { AttackBox, ControlKey, Coordinate2D, SpriteListing } from "./types";

export interface FighterConstructor extends SpriteConstructor {
  velocity?: Coordinate2D;
  color?: string;
  sprites?: SpriteListing;
  width: number;
  height: number;
  attackBox: AttackBox;
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
  isDead: boolean;
  isJumping: boolean;

  constructor({
    position,
    canvas,
    color,
    offset,
    imageSrc,
    sprites,
    width,
    height,
    attackBox,
    frames = 1,
    scale = 1,
    framesHold = 1,
    velocity = { x: 0, y: 0 },
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
    this.isDead = false;
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
      width: attackBox.width,
      height: attackBox.height,
      offset: attackBox.offset,
    };
    this.color = color ?? "red";
    this.isAttacking = false;
    this.health = 100;
    this.sprites = sprites;
    this.isDead = false;
    this.isJumping = false;
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
    this.switchSprite("jump");
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
