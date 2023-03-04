import { Fighter, Sprite } from "./models/";
import { ControlKeys } from "./models/types";
import { detectCollition } from "./utils/utils";

import "./style.css";
import * as backgroundImageSrc from "./assets/background.png";

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

const player = new Fighter({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  canvas,
  color: "blue",
  offset: {
    x: 0,
    y: 0,
  },
});

const enemy = new Fighter({
  position: {
    x: 800,
    y: 50,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  canvas,
  color: "purple",
  offset: {
    x: -50,
    y: 0,
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

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  player.update();
  enemy.update();

  player.velocity.x = 0;
  if (keys.a.pressed && player.lastKey === ControlKeys.a) {
    player.velocity.x = -5;
  } else if (keys.d.pressed && player.lastKey === ControlKeys.d) {
    player.velocity.x = 5;
  }

  enemy.velocity.x = 0;
  if (keys.ArrowLeft.pressed && enemy.lastKey === ControlKeys.ArrowLeft) {
    enemy.velocity.x = -5;
  } else if (
    keys.ArrowRight.pressed &&
    enemy.lastKey === ControlKeys.ArrowRight
  ) {
    enemy.velocity.x = 5;
  }

  if (detectCollition(player, enemy) && player.isAttacking) {
    player.isAttacking = false;
    enemy.health -= 20;
    const player2HealthHTMLElement: HTMLDivElement =
      document.querySelector("#player2HealthBar");
    player2HealthHTMLElement.style.width = `${enemy.health}%`;
  }

  if (detectCollition(enemy, player) && enemy.isAttacking) {
    enemy.isAttacking = false;
    player.health -= 20;
    const player1HealthHTMLElement: HTMLDivElement =
      document.querySelector("#player1HealthBar");
    player1HealthHTMLElement.style.width = `${player.health}%`;
  }
}
animate();

window.addEventListener("keydown", (event: KeyboardEvent) => {
  const { key } = event;

  switch (key) {
    case ControlKeys.d:
    case ControlKeys.a:
      keys[key].pressed = true;
      player.lastKey = key;
      break;
    case ControlKeys.w:
      player.velocity.y = -20;
      break;
    case ControlKeys.space:
      player.attack();
      break;

    case ControlKeys.ArrowRight:
    case ControlKeys.ArrowLeft:
      keys[key].pressed = true;
      enemy.lastKey = key;
      break;
    case ControlKeys.ArrowUp:
      enemy.velocity.y = -20;
      break;
    case ControlKeys.ArrowDown:
      enemy.attack();
      break;
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
