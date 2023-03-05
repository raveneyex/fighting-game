import { SpriteListing } from "../../models";

import * as idle from "./Idle.png";
import * as run from "./Run.png";
import * as jump from "./Jump.png";
import * as fall from "./Fall.png";
import * as attack from "./Attack2.png";
import * as hit from "./Take hit.png";
import * as death from "./Death.png";

export const player2Assets: SpriteListing = {
  idle: {
    imageSrc: idle,
    frames: 4,
  },
  run: {
    imageSrc: run,
    frames: 8,
  },
  jump: {
    imageSrc: jump,
    frames: 2,
  },
  fall: {
    imageSrc: fall,
    frames: 2,
  },
  attack: {
    imageSrc: attack,
    frames: 4,
  },
  hit: {
    imageSrc: hit,
    frames: 3,
  },
  death: {
    imageSrc: death,
    frames: 7,
  },
};
