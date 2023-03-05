import { SpriteListing } from "../../models";
import * as player1Idle from "./Idle.png";
import * as player1Run from "./Run.png";
import * as player1Jump from "./Jump.png";

const getImage = (imageSource: string) => {
  const img = new Image();
  img.src = imageSource;
  return img;
};

export function getPlayer1Assets(): SpriteListing {
  return {
    idle: {
      imageSrc: player1Idle as unknown as string,
      frames: 8,
      image: getImage(player1Idle as unknown as string),
    },
    run: {
      imageSrc: player1Run as unknown as string,
      frames: 8,
      image: getImage(player1Run as unknown as string),
    },
    jump: {
      imageSrc: player1Jump as unknown as string,
      frames: 2,
      image: getImage(player1Jump as unknown as string),
    },
  };
}
