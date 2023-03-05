import { Fighter } from "../models";

export function detectCollition(player1: Fighter, player2: Fighter) {
  return (
    player1.attackBox.position.x + player1.attackBox.width >= player2.position.x &&
    player1.attackBox.position.x <= player2.position.x + player2.width &&
    player1.position.y + player1.attackBox.height >= player2.position.y &&
    player1.attackBox.position.y <= player2.position.y + player2.height
  );
}

export function determineWinner(player1: Fighter, player2: Fighter, timerId: number) {
  clearTimeout(timerId);
  const displayText: HTMLDivElement = document.querySelector("#message");

  displayText.style.display = "flex";
  if (player1.health === player2.health) {
    displayText.innerHTML = "It's a tie!";
  } else if (player1.health > player2.health) {
    displayText.innerHTML = "Player 1 Wins";
  } else if (player1.health < player2.health) {
    displayText.innerHTML = "Player 2 Wins";
  }
}
