import { GRAVITY } from "../utils/constants";
import Sprite from "./Sprite";
import { AttackBox, ControlKeys, Coordinate2D, FighterConstructor, SpriteListing, SpriteTypes } from "./types";

export default class Fighter extends Sprite {
  private _height: number;
  private _width: number;
  private _health: number;
  private _lastKey: ControlKeys;
  private _isAttacking: boolean;
  private _isDead: boolean;
  private sprites: SpriteListing;

  readonly attackBox: AttackBox;

  velocity: Coordinate2D;

  constructor({ position, canvas, offset, sprites, attackBox, scale = 2.5, framesHold = 5 }: FighterConstructor) {
    const { imageSrc, frames } = sprites.idle;

    super({
      position,
      canvas,
      scale,
      offset,
      framesHold,
      imageSrc,
      frames,
    });

    this.velocity = { x: 0, y: 0 };
    this._height = 150;
    this._width = 50;
    this._health = 100;

    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: attackBox.width,
      height: attackBox.height,
      offset: attackBox.offset,
    };

    this._isAttacking = false;
    this._isDead = false;

    this.sprites = sprites;
    this.initSpriteImages();
  }

  private initSpriteImages() {
    for (const sprite in this.sprites) {
      this.sprites[sprite].image = new Image();
      this.sprites[sprite].image.src = this.sprites[sprite].imageSrc;
    }
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  get lastKey(): ControlKeys {
    return this._lastKey;
  }

  set lastKey(value: ControlKeys) {
    this._lastKey = value;
  }

  get health(): number {
    return this._health;
  }

  set health(value: number) {
    this._health = value;
  }

  get isDead(): boolean {
    return this._isDead;
  }

  set isDead(value: boolean) {
    this._isDead = value;
  }

  get isAttacking(): boolean {
    return this._isAttacking;
  }

  set isAttacking(value: boolean) {
    this._isAttacking = value;
  }

  update() {
    this.draw();
    if (!this.isDead) {
      this.animateFrames();
    }

    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= this.canvas.height - 96) {
      this.velocity.y = 0;
      this.position.y = 330;
    } else {
      this.velocity.y += GRAVITY;
    }
  }

  attack() {
    this.switchSprite(SpriteTypes.attack);
    this.isAttacking = true;
  }

  moveLeft() {
    this.switchSprite(SpriteTypes.run);
    this.velocity.x = -5;
  }

  moveRight() {
    this.switchSprite(SpriteTypes.run);
    this.velocity.x = 5;
  }

  takeHit() {
    this.health -= 20;
    if (this.health <= 0) {
      this.switchSprite(SpriteTypes.death);
    } else {
      this.switchSprite(SpriteTypes.hit);
    }
  }

  jump() {
    this.velocity.y = -20;
  }

  switchSprite(sprite: SpriteTypes) {
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
