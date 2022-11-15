import NewGameMenu from "./assets/components/newGameMenu/NewGameMenu";
import Game from "./assets/components/game/Game";
import { useState } from "react";

export default function App() {
  const [game, setGame] = useState({
    player1Mark: "O",
    isStarted: false,
    isVsCpu: false,
    isXTurn: true,
    board: [
      [null, null, "X"],
      ["O", null, null],
      [null, "X", null],
    ],
  });

  const [numOfWins, setNumOfWins] = useState({
    pvc: [0, 0, 0],
    pvp: [0, 0, 0],
  });

  const changePlayer1Mark = (icon) => {
    setGame((prevState) => ({
      ...prevState,
      player1Mark: icon,
    }));
  };

  const startGame = (isVsCpu) => {
    setGame((prevState) => ({
      ...prevState,
      isStarted: true,
      isVsCpu: isVsCpu,
    }));
  };

  return (
    <>
      {game.isStarted ? (
        <Game
          game={game}
          numOfWins={numOfWins}
          handleBoardClick={(i, j) =>
            setGame((prevState) => ({
              ...prevState,
              isXTurn: !prevState.isXTurn,
            }))
          }
        />
      ) : (
        <NewGameMenu
          changePlayer1Mark={(icon) => {
            changePlayer1Mark(icon);
          }}
          startGame={(isVsCpu) => startGame(isVsCpu)}
          player1Mark={game.player1Mark}
        />
      )}
    </>
  );
}
