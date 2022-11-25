export default function (player1Mark, isVsCpu, isXTurn) {
  if (
    !isVsCpu ||
    (player1Mark === "X" && isXTurn === true) ||
    (player1Mark === "O" && isXTurn === false)
  ) {
    return false;
  }
  return true;
}
