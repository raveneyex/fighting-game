import { ControlKeys, Fighter, KeysTracker, Sprite, SpriteTypes } from "../models";
import { detectCollition } from "../utils/utils";

import { player1Assets } from "../assets/player1";
import { player2Assets } from "../assets/player2";

import * as backgroundImageSrc from "../assets/background.png";
import * as shopImageSrc from "../assets/shop.png";
import { KEYDOWN, KEYUP, PLAYER1_HEALTHBAR_SELECTOR, PLAYER2_HEALTHBAR_SELECTOR } from "../utils/constants";
import { UIControls } from "./UIControls";

export class Game {
  // Singleton instance
  private static instance: Game;

  // UI Controls for DOM Elements
  private uiControls: UIControls;

  // Timer
  private timer: number;
  private timerId: number;

  // Keys control
  private keys: KeysTracker;

  // Background elements;
  private background: Sprite;
  private shop: Sprite;

  // Players
  private player1: Fighter;
  private player2: Fighter;

  private constructor(window: Window, document: Document) {
    this.uiControls = UIControls.getInstance(document);
    this.initRenderingContext();

    window.addEventListener(KEYDOWN, this.keyDownCallback.bind(this));
    window.addEventListener(KEYUP, this.keyUpCallback.bind(this));
  }

  static getInstance(window: Window, document: Document): Game {
    if (!Game.instance) {
      Game.instance = new Game(window, document);
    }

    return Game.instance;
  }

  get canvas(): HTMLCanvasElement {
    return this.uiControls.canvas;
  }

  get renderingContext(): CanvasRenderingContext2D {
    return this.uiControls.renderingContext;
  }

  private initRenderingContext(): void {
    // Paint canvas black
    this.renderingContext.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private initBackground(): void {
    this.background = new Sprite({
      position: { x: 0, y: 0 },
      imageSrc: backgroundImageSrc,
      canvas: this.canvas,
    });

    this.shop = new Sprite({
      position: { x: 610, y: 160 },
      imageSrc: shopImageSrc,
      canvas: this.canvas,
      scale: 2.5,
      frames: 6,
      framesHold: 5,
    });
  }

  private initPlayers(): void {
    this.player1 = new Fighter({
      position: {
        x: 50,
        y: 0,
      },
      canvas: this.canvas,
      offset: {
        x: 215,
        y: 157,
      },
      sprites: player1Assets,
      attackBox: {
        offset: {
          x: 100,
          y: 50,
        },
        width: 160,
        height: 50,
      },
    });

    this.player2 = new Fighter({
      position: {
        x: 900,
        y: 100,
      },
      canvas: this.canvas,
      offset: {
        x: 215,
        y: 167,
      },
      sprites: player2Assets,
      attackBox: {
        offset: {
          x: -170,
          y: 50,
        },
        width: 170,
        height: 50,
      },
    });
  }

  private keyDownCallback(event: KeyboardEvent): void {
    const { key } = event;

    if (!this.player1.isDead) {
      switch (key) {
        case ControlKeys.d:
        case ControlKeys.a:
          this.keys[key].pressed = true;
          this.player1.lastKey = key;
          break;
        case ControlKeys.w:
          this.player1.jump();
          break;
        case ControlKeys.space:
          this.player1.attack();
          break;
      }
    }

    if (!this.player2.isDead) {
      switch (key) {
        case ControlKeys.ArrowRight:
        case ControlKeys.ArrowLeft:
          this.keys[key].pressed = true;
          this.player2.lastKey = key;
          break;
        case ControlKeys.ArrowUp:
          this.player2.jump();
          break;
        case ControlKeys.ArrowDown:
          this.player2.attack();
          break;
      }
    }
  }

  private keyUpCallback(event: KeyboardEvent): void {
    const { key } = event;
    switch (key) {
      case ControlKeys.d:
      case ControlKeys.a:
      case ControlKeys.ArrowRight:
      case ControlKeys.ArrowLeft:
        this.keys[key].pressed = false;
        break;
    }
  }

  private initKeyTracker(): void {
    this.keys = {
      a: {
        pressed: false,
      },
      d: {
        pressed: false,
      },
      w: {
        pressed: false,
      },
      ArrowRight: {
        pressed: false,
      },
      ArrowLeft: {
        pressed: false,
      },
      ArrowUp: {
        pressed: false,
      },
    };
  }

  private initTimer(): void {
    if (this.timer > 0) {
      this.timerId = window.setTimeout(this.initTimer.bind(this), 1000);
      this.timer--;
      this.uiControls.updateTimer(this.timer.toString());
    }

    if (this.timer === 0) {
      this.determineWinner();
    }
  }

  private determineWinner(): void {
    clearTimeout(this.timerId);

    if (this.player1.health === this.player2.health) {
      this.uiControls.declareTie();
    } else if (this.player1.health > this.player2.health) {
      this.uiControls.player1Wins();
    } else if (this.player1.health < this.player2.health) {
      this.uiControls.player2Wins();
    }
  }

  private paintBackground(fillStyle: string) {
    this.renderingContext.fillStyle = fillStyle;
    this.renderingContext.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private backgroundAnimationUpdates() {
    this.paintBackground("black");
    this.background.update();
    this.shop.update();
    this.paintBackground("rgba(255, 255, 255, 0.2)");
  }

  private player1AnimationUpdates() {
    this.player1.update();
    this.player1.velocity.x = 0;

    // Move
    if (this.keys.a.pressed && this.player1.lastKey === ControlKeys.a) {
      this.player1.moveLeft();
    } else if (this.keys.d.pressed && this.player1.lastKey === ControlKeys.d) {
      this.player1.moveRight();
    } else {
      this.player1.switchSprite(SpriteTypes.idle);
    }

    // Jump
    if (this.player1.velocity.y < 0) {
      this.player1.switchSprite(SpriteTypes.jump);
    } else if (this.player1.velocity.y > 0) {
      this.player1.switchSprite(SpriteTypes.fall);
    }

    // Attack
    if (detectCollition(this.player1, this.player2) && this.player1.isAttacking && this.player1.currentFrame === 4) {
      this.player1.isAttacking = false;
      this.player2.takeHit();
      this.uiControls.updatePlayer2Health(this.player2.health);
    }
    if (this.player1.isAttacking && this.player1.currentFrame === 4) {
      this.player1.isAttacking = false;
    }
  }

  private player2AnimationUpdates() {
    this.player2.update();
    this.player2.velocity.x = 0;

    // Move
    if (this.keys.ArrowLeft.pressed && this.player2.lastKey === ControlKeys.ArrowLeft) {
      this.player2.moveLeft();
    } else if (this.keys.ArrowRight.pressed && this.player2.lastKey === ControlKeys.ArrowRight) {
      this.player2.moveRight();
    } else {
      this.player2.switchSprite(SpriteTypes.idle);
    }

    // Jump
    if (this.player2.velocity.y < 0) {
      this.player2.switchSprite(SpriteTypes.jump);
    } else if (this.player2.velocity.y > 0) {
      this.player2.switchSprite(SpriteTypes.fall);
    }

    // Attack
    if (detectCollition(this.player2, this.player1) && this.player2.isAttacking && this.player2.currentFrame === 2) {
      this.player2.isAttacking = false;
      this.player1.takeHit();
      this.uiControls.updatePlayer1Health(this.player1.health);
    }
    if (this.player2.isAttacking && this.player2.currentFrame === 2) {
      this.player2.isAttacking = false;
    }
  }

  private animate(): void {
    window.requestAnimationFrame(this.animate.bind(this));

    this.backgroundAnimationUpdates();
    this.player1AnimationUpdates();
    this.player2AnimationUpdates();

    if (this.player1.health === 0 || this.player2.health === 0) {
      this.determineWinner();
    }
  }

  run(): void {
    this.timer = 60;

    this.initKeyTracker();
    this.initBackground();
    this.initPlayers();
    this.animate();
    this.initTimer();
  }
}
