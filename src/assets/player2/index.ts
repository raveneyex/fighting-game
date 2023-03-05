import { SpriteListing } from "../../models";

import * as idle from "./Idle.png";
import * as run from "./Run.png";
import * as jump from "./Jump.png";
import * as fall from "./Fall.png";
import * as attack from "./Attack2.png";
import * as hit from "./Take hit.png";

export const player2Assets: SpriteListing = {
  idle: {
    imageSrc: idle as unknown as string,
    frames: 4,
  },
  run: {
    imageSrc: run as unknown as string,
    frames: 8,
  },
  jump: {
    imageSrc: jump as unknown as string,
    frames: 2,
  },
  fall: {
    imageSrc: fall as unknown as string,
    frames: 2,
  },
  attack: {
    imageSrc: attack as unknown as string,
    frames: 4,
  },
  hit: {
    imageSrc: hit as unknown as string,
    frames: 3,
  },
};
