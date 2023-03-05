import { SpriteListing } from "../../models";

import * as player1Idle from "./Idle.png";
import * as player1Run from "./Run.png";
import * as player1Jump from "./Jump.png";
import * as player1Fall from "./Fall.png";
import * as player1Attack3 from "./Attack3.png";

export function getPlayer1Assets(): SpriteListing {
  return {
    idle: {
      imageSrc: player1Idle as unknown as string,
      frames: 8,
    },
    run: {
      imageSrc: player1Run as unknown as string,
      frames: 8,
    },
    jump: {
      imageSrc: player1Jump as unknown as string,
      frames: 2,
    },
    fall: {
      imageSrc: player1Fall as unknown as string,
      frames: 2,
    },
    attack: {
      imageSrc: player1Attack3 as unknown as string,
      frames: 4,
    },
  };
}
