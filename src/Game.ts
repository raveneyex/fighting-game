import { Fighter, Sprite } from "./models";
import { player1Assets } from "./assets/player1/";
import { player2Assets } from "./assets/player2";
import * as backgroundImageSrc from "./assets/background.png";
import * as shopImageSrc from "./assets/shop.png";

export class Game {
  // Singleton instance
  private static instance: Game;

  // DOM Elements
  private canvas: HTMLCanvasElement;
  private timerDisplay: HTMLDivElement;
  private messageDisplay: HTMLDivElement;
  private renderingContext: CanvasRenderingContext2D;

  // Timer
  private timer: number;
  private timerId: number;

  // Background elements;
  private background: Sprite;
  private shop: Sprite;
  // Players
  private player1: Fighter;
  private player2: Fighter;

  private constructor() {
    this.getRenderingContext();
    this.getHTMLElements();
    this.initBackground();
    this.initPlayers();
  }

  static getInstance(): Game {
    if (!Game.instance) {
      Game.instance = new Game();
    }

    return Game.instance;
  }

  private getRenderingContext(): void {
    const canvas = <HTMLCanvasElement>document.querySelector("#canvas");
    canvas.width = 1024;
    canvas.height = 576;

    this.canvas = canvas;
    this.renderingContext = canvas.getContext("2d");

    // Paint canvas black
    this.renderingContext.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private getHTMLElements(): void {
    this.timerDisplay = <HTMLDivElement>document.querySelector("#timer");
    this.messageDisplay = <HTMLDivElement>document.querySelector("#message");
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
      imageSrc: player1Assets.idle.imageSrc,
      frames: player1Assets.idle.frames,
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
      imageSrc: player2Assets.idle.imageSrc,
      frames: player2Assets.idle.frames,
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

  private updateTimer(value: string): void {
    this.timerDisplay.innerHTML = value;
  }

  private updateMessage(value: string): void {
    this.messageDisplay.innerHTML = value;
    this.messageDisplay.style.display = "flex";
  }

  private decreaseTimer(): void {
    if (this.timer > 0) {
      this.timerId = window.setTimeout(this.decreaseTimer, 1000);
      this.timer--;
      this.updateTimer(this.timer.toString());
    }

    if (this.timer === 0) {
      this.determineWinner();
    }
  }

  private determineWinner(): void {
    clearTimeout(this.timerId);

    if (this.player1.health === this.player2.health) {
      this.updateMessage("It's a tie");
    } else if (this.player1.health > this.player2.health) {
      this.updateMessage("Player 1 Wins");
    } else if (this.player1.health < this.player2.health) {
      this.updateMessage("Player 2 Wins");
    }
  }

  private animate(): void {
    window.requestAnimationFrame(this.animate);
    this.renderingContext.fillStyle = "black";
    this.renderingContext.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  public run(): void {
    this.decreaseTimer();
    this.animate();
  }
}
