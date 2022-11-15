import NewGameMenu from "./assets/components/newGameMenu/NewGameMenu";
import Game from "./assets/components/game/Game";
import { useState } from "react";

export default function App() {
  const [game, setGame] = useState({
    isStarted: false,
    isVsCpu: false,
    isXTurn: true,
    board: [
      [null, null, null],
      [null, null, null],
      [null, "X", null],
    ],
  });

  const [player1Mark, setPlayer1Mark] = useState("O");

  const changePlayer1Mark = (icon) => {
    setPlayer1Mark(icon);
  };

  const startGame = (isVsCpu) => {
    setGame((prevState) => ({
      ...prevState,
      isStarted: true,
      isVsCpu: isVsCpu,
    }));
  };

  const toggleHover = (isToggleOn, i, j) => {
    if (game.board[i][j] === null) {
      setGame((prevState) => {
        const newBoard = prevState.board;
        newBoard[i][j] = isToggleOn ? "HOVERING" : null;
        return {
          ...prevState,
          board: newBoard,
        };
      });
    } else if (isToggleOn === false && game.board[i][j] === "HOVERING") {
      setGame((prevState) => {
        const newBoard = prevState.board;
        newBoard[i][j] = isToggleOn ? "HOVERING" : null;
        return {
          ...prevState,
          board: newBoard,
        };
      });
    }
  };

  return (
    <>
      {game.isStarted ? (
        <Game
          game={game}
          handleBoardClick={(i, j) => console.log(i, j)}
          handleMouseOver={(i, j) => toggleHover(true, i, j)}
          handleMouseOut={(i, j) => toggleHover(false, i, j)}
        />
      ) : (
        <NewGameMenu
          changePlayer1Mark={(icon) => {
            changePlayer1Mark(icon);
          }}
          startGame={(isVsCpu) => startGame(isVsCpu)}
          player1Mark={player1Mark}
        />
      )}
    </>
  );
}
