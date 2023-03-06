import gsap from "gsap";

import {
  CANVAS_SELECTOR,
  GAME_BUTTON_CONTAINER_SELECTOR,
  GAME_BUTTON_SELECTOR,
  MESSAGE_SELECTOR,
  PLAYER1WINS,
  PLAYER1_HEALTHBAR_SELECTOR,
  PLAYER2WINS,
  PLAYER2_HEALTHBAR_SELECTOR,
  TIE_MESSAGE,
  TIMER_SELECTOR,
} from "../utils/constants";

export class UIControls {
  // Singleton instance
  private static instance: UIControls;

  private _canvas: HTMLCanvasElement;
  private _renderingContext: CanvasRenderingContext2D;
  private timerDisplay: HTMLDivElement;
  private messageDisplay: HTMLDivElement;
  private startButtonContainer: HTMLDivElement;
  private startButton: HTMLButtonElement;

  private constructor(document: Document) {
    this.startButton = <HTMLButtonElement>document.querySelector(GAME_BUTTON_SELECTOR);
    this.startButtonContainer = <HTMLDivElement>document.querySelector(GAME_BUTTON_CONTAINER_SELECTOR);
    this.timerDisplay = <HTMLDivElement>document.querySelector(TIMER_SELECTOR);
    this.messageDisplay = <HTMLDivElement>document.querySelector(MESSAGE_SELECTOR);
    this.messageDisplay.style.display = "none";

    const canvas = <HTMLCanvasElement>document.querySelector(CANVAS_SELECTOR);
    canvas.width = 1024;
    canvas.height = 576;

    this._canvas = canvas;
    this._renderingContext = canvas.getContext("2d");
  }

  static getInstance(document: Document): UIControls {
    if (!UIControls.instance) {
      UIControls.instance = new UIControls(document);
    }
    return UIControls.instance;
  }

  get canvas(): HTMLCanvasElement {
    return this._canvas;
  }

  get renderingContext(): CanvasRenderingContext2D {
    return this._renderingContext;
  }

  private updateMessage(value: string): void {
    this.messageDisplay.innerHTML = value;
    this.messageDisplay.style.display = "flex";

    setTimeout(() => {
      this.messageDisplay.style.display = "none";
      this.startButtonContainer.style.display = "flex";
    }, 2000);
  }

  bindStart(callback: () => {}) {
    this.startButton.addEventListener("click", () => {
      this.startButtonContainer.style.display = "none";
      callback();
    });
  }

  updateTimer(value: string): void {
    this.timerDisplay.innerHTML = value;
  }

  declareTie(): void {
    this.updateMessage(TIE_MESSAGE);
  }

  updatePlayer1Health(value: number): void {
    gsap.to(PLAYER1_HEALTHBAR_SELECTOR, {
      width: `${value}%`,
    });
  }

  updatePlayer2Health(value: number): void {
    gsap.to(PLAYER2_HEALTHBAR_SELECTOR, {
      width: `${value}%`,
    });
  }

  player1Wins(): void {
    this.updateMessage(PLAYER1WINS);
  }

  player2Wins(): void {
    this.updateMessage(PLAYER2WINS);
  }
}
