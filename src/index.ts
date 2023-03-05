import { Fighter, Sprite } from "./models/";
import { ControlKeys } from "./models/types";
import { detectCollition, determineWinner } from "./utils/utils";

import "./style.css";
import * as backgroundImageSrc from "./assets/background.png";
import * as shopImageSrc from "./assets/shop.png";
import { player1Assets } from "./assets/player1/";
import { player2Assets } from "./assets/player2";

const canvas = <HTMLCanvasElement>document.querySelector("#canvas");
const c: CanvasRenderingContext2D = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const background = new Sprite({
  position: { x: 0, y: 0 },
  imageSrc: backgroundImageSrc as unknown as string,
  canvas,
});

const shop = new Sprite({
  position: { x: 610, y: 160 },
  imageSrc: shopImageSrc as unknown as string,
  canvas,
  scale: 2.5,
  frames: 6,
  framesHold: 5,
});

const player1 = new Fighter({
  width: 50,
  height: 150,
  imageSrc: player1Assets.idle.imageSrc,
  frames: player1Assets.idle.frames,
  position: {
    x: 50,
    y: 0,
  },
  canvas,
  offset: {
    x: 215,
    y: 157,
  },
  framesHold: 5,
  scale: 2.5,
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

const player2 = new Fighter({
  width: 50,
  height: 150,
  imageSrc: player2Assets.idle.imageSrc,
  frames: player2Assets.idle.frames,
  position: {
    x: 900,
    y: 100,
  },
  canvas,
  framesHold: 5,
  scale: 2.5,
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

const keys = {
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

let timer = 10;
let timerId: number;

function decreaseTimer() {
  if (timer > 0) {
    timerId = window.setTimeout(decreaseTimer, 1000);
    timer--;
    document.querySelector("#timer").innerHTML = timer.toString();
  }

  if (timer === 0) {
    determineWinner(player1, player2, timerId);
  }
}

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  shop.update();

  player1.update();
  player2.update();

  player1.velocity.x = 0;
  player2.velocity.x = 0;

  if (keys.a.pressed && player1.lastKey === ControlKeys.a) {
    player1.velocity.x = -5;
    player1.switchSprite("run");
  } else if (keys.d.pressed && player1.lastKey === ControlKeys.d) {
    player1.velocity.x = 5;
    player1.switchSprite("run");
  } else {
    player1.switchSprite("idle");
  }
  if (player1.velocity.y < 0) {
    player1.switchSprite("jump");
  } else if (player1.velocity.y > 0) {
    player1.switchSprite("fall");
  }

  if (keys.ArrowLeft.pressed && player2.lastKey === ControlKeys.ArrowLeft) {
    player2.velocity.x = -5;
    player2.switchSprite("run");
  } else if (keys.ArrowRight.pressed && player2.lastKey === ControlKeys.ArrowRight) {
    player2.velocity.x = 5;
    player2.switchSprite("run");
  } else {
    player2.switchSprite("idle");
  }
  if (player2.velocity.y < 0) {
    player2.switchSprite("jump");
  } else if (player2.velocity.y > 0) {
    player2.switchSprite("fall");
  }

  if (detectCollition(player1, player2) && player1.isAttacking && player1.currentFrame === 4) {
    player1.isAttacking = false;
    player2.takeHit();
    const player2HealthHTMLElement: HTMLDivElement = document.querySelector("#player2HealthBar");
    player2HealthHTMLElement.style.width = `${player2.health}%`;
  }

  if (player1.isAttacking && player1.currentFrame === 4) {
    player1.isAttacking = false;
  }

  if (detectCollition(player2, player1) && player2.isAttacking && player2.currentFrame === 2) {
    player2.isAttacking = false;
    player1.takeHit();
    const player1HealthHTMLElement: HTMLDivElement = document.querySelector("#player1HealthBar");
    player1HealthHTMLElement.style.width = `${player1.health}%`;
  }

  if (player2.isAttacking && player2.currentFrame === 2) {
    player2.isAttacking = false;
  }
}
decreaseTimer();
animate();

window.addEventListener("keydown", (event: KeyboardEvent) => {
  const { key } = event;

  if (!player1.isDead) {
    switch (key) {
      case ControlKeys.d:
      case ControlKeys.a:
        keys[key].pressed = true;
        player1.lastKey = key;
        break;
      case ControlKeys.w:
        player1.velocity.y = -20;
        break;
      case ControlKeys.space:
        player1.attack();
        break;
    }
  }

  if (!player2.isDead) {
    switch (key) {
      case ControlKeys.ArrowRight:
      case ControlKeys.ArrowLeft:
        keys[key].pressed = true;
        player2.lastKey = key;
        break;
      case ControlKeys.ArrowUp:
        player2.velocity.y = -20;
        break;
      case ControlKeys.ArrowDown:
        player2.attack();
        break;
    }
  }
});

window.addEventListener("keyup", (event: KeyboardEvent) => {
  const { key } = event;
  switch (key) {
    case ControlKeys.d:
    case ControlKeys.a:
    case ControlKeys.ArrowRight:
    case ControlKeys.ArrowLeft:
      keys[key].pressed = false;
      break;
  }
});
