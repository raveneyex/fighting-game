import { Fighter } from "../models";

export function detectCollition(player1: Fighter, player2: Fighter) {
  return (
    player1.attackBox.position.x + player1.attackBox.width >= player2.position.x &&
    player1.attackBox.position.x <= player2.position.x + player2.width &&
    player1.position.y + player1.attackBox.height >= player2.position.y &&
    player1.attackBox.position.y <= player2.position.y + player2.height
  );
}
