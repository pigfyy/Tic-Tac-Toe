import { v4 as uuid } from "uuid";
import iconO from "../../imgs/game-icons/icon-o.svg";
import iconX from "../../imgs/game-icons/icon-x.svg";
import iconOHover from "../../imgs/game-icons/icon-o-outline.svg";
import iconXHover from "../../imgs/game-icons/icon-x-outline.svg";
import empty from "../../imgs/game-icons/empty.svg";

export default function ({ game, handleBoardClick }) {
  // Creates a 3x3 grid of game squares
  const gameBoard = game.board.map((row, i) => {
    return row.map((cell, j) => {
      // finds the correct icon for the cell
      const image = (() => {
        switch (cell) {
          case "X":
            return iconX;
          case "O":
            return iconO;
          default:
            return empty;
        }
      })();

      return (
        <button
          className="group flex justify-center rounded-md bg-neutral-700 py-7 shadow-darkBlueShadow"
          onClick={() => handleBoardClick(i, j)}
          key={uuid()}
        >
          <div className="grid w-5/12 place-items-center">
            <img
              src={image}
              alt={cell === null ? "empty cell" : cell}
              className={`block ${cell === null ? "group-hover:hidden" : ""}`}
            />
            <img
              src={game.isXTurn ? iconXHover : iconOHover}
              alt={cell === null ? "empty cell" : cell}
              className={`hidden ${cell === null ? "group-hover:block" : ""}`}
            />
          </div>
        </button>
      );
    });
  });

  return <ul className="grid grid-cols-3 gap-5">{gameBoard}</ul>;
}
