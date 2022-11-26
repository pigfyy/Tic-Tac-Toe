import { v4 as uuid } from "uuid";
import iconO from "../../imgs/game-icons/icon-o.svg";
import iconX from "../../imgs/game-icons/icon-x.svg";
import iconOHover from "../../imgs/game-icons/icon-o-outline.svg";
import iconXHover from "../../imgs/game-icons/icon-x-outline.svg";
import iconODark from "../../imgs/game-icons/icon-o-dark.svg";
import iconXDark from "../../imgs/game-icons/icon-x-dark.svg";
import empty from "../../imgs/game-icons/empty.svg";
import store from "../../../store";

export default function () {
  const [
    player1Mark,
    isVsCpu,
    isXTurn,
    board,
    makeMove,
    setBannerShown,
    setBannerIsOver,
    setBannerIsWinnerX,
  ] = store.useGameStore((state) => [
    state.player1Mark,
    state.isVsCpu,
    state.isXTurn,
    state.board,
    state.makeMove,
    state.setBannerShown,
    state.setBannerIsOver,
    state.setBannerIsWinnerX,
  ]);

  const isCpuMove = () => {
    if (
      !isVsCpu ||
      (player1Mark === "X" && isXTurn === true) ||
      (player1Mark === "O" && isXTurn === false)
    ) {
      return false;
    }
    return true;
  };

  // Creates a 3x3 grid of game squares
  const gameBoard = board.map((row, i) => {
    return row.map((cell, j) => {
      // finds the correct icon for the cell
      const image = (() => {
        switch (cell) {
          case "X":
            return iconX;
          case "O":
            return iconO;
          case "oWin":
            return iconODark;
          case "xWin":
            return iconXDark;
          default:
            return empty;
        }
      })();

      const bgColor = (() => {
        switch (cell) {
          case "X":
            return "bg-neutral-700";
          case "O":
            return "bg-neutral-700";
          case "oWin":
            return "bg-orange-600";
          case "xWin":
            return "bg-aqua-600";
          default:
            return "bg-neutral-700";
        }
      })();

      return (
        <button
          className={`group flex aspect-square justify-center rounded-sxl shadow-darkBlueShadow md:rounded-2xl ${bgColor}`}
          onClick={() => {
            makeMove(i, j, true);
          }}
          key={uuid()}
        >
          <div className="my-auto w-5/12">
            <img
              src={image}
              alt={cell === null ? "empty cell" : cell}
              className={`block ${cell === null ? "group-hover:hidden" : ""}`}
            />
            <img
              src={isXTurn ? iconXHover : iconOHover}
              alt={cell === null ? "empty cell" : cell}
              className={`hidden ${
                cell === null && !isCpuMove(player1Mark, isVsCpu, isXTurn)
                  ? "group-hover:block"
                  : ""
              }`}
            />
          </div>
        </button>
      );
    });
  });

  return <ul className="grid grid-cols-3 gap-5">{gameBoard}</ul>;
}
