import { v4 as uuid } from "uuid";
import iconO from "../../imgs/game-icons/icon-o.svg";
import iconX from "../../imgs/game-icons/icon-x.svg";
import iconOHover from "../../imgs/game-icons/icon-o-outline.svg";
import iconXHover from "../../imgs/game-icons/icon-x-outline.svg";
import empty from "../../imgs/game-icons/empty.svg";

export default function ({
  game,
  handleBoardClick,
  handleMouseOver,
  handleMouseOut,
}) {
  const gameBoard = game.board.map((row, i) => {
    return row.map((cell, j) => {
      const image = (() => {
        switch (cell) {
          case "X":
            return iconX;
          case "O":
            return iconO;
          case "HOVERING":
            return game.isXTurn ? iconXHover : iconOHover;
          default:
            return empty;
        }
      })();
      return (
        <button
          className="flex justify-center rounded-md bg-neutral-700 py-7 shadow-darkBlueShadow"
          onClick={() => handleBoardClick(i, j)}
          onMouseEnter={() => handleMouseOver(i, j)}
          onMouseLeave={() => handleMouseOut(i, j)}
          key={uuid()}
        >
          <div className="w-5/12">
            <img src={image} alt={cell === null ? "empty cell" : cell} />
          </div>
        </button>
      );
    });
  });

  return <>{gameBoard}</>;
}
