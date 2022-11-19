import NewGameMenu from "./assets/components/newGameMenu/NewGameMenu";
import Game from "./assets/components/game/Game";
import { useState } from "react";

export default function App() {
  const [game, setGame] = useState({
    player1Mark: "O",
    isStarted: false,
    isVsCpu: false,
    isXTurn: true,
    board: [[], [], []],
    banner: {
      isShown: false,
      isOver: false,
      isWinnerX: null,
    },
  });

  const [numOfWins, setNumOfWins] = useState({
    pvc: [0, 0, 0],
    pvp: [0, 0, 0],
  });

  // Handle New Game Menu

  const changePlayer1Mark = (icon) => {
    setGame((prevState) => ({
      ...prevState,
      player1Mark: icon,
    }));
  };

  // Start new game

  const startGame = (isVsCpu, isReversePlayer1Mark) => {
    setGame((prevState) => ({
      ...prevState,
      player1Mark: isReversePlayer1Mark
        ? prevState.player1Mark === "X"
          ? "O"
          : "X"
        : prevState.player1Mark,
      isStarted: true,
      isXTurn: true,
      isVsCpu: isVsCpu,
      board: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
      banner: {
        isShown: false,
        isOver: false,
        isWinnerX: null,
      },
    }));
  };

  // Handle Game

  const handleRestart = () => {
    setGame((prevState) => ({
      ...prevState,
      banner: {
        ...prevState.banner,
        isShown: true,
      },
    }));
  };

  const handleBoardClick = (i, j) => {
    setGame((prevState) => {
      const checkIfWon = (() => {
        // Check Rows
        for (let i = 0; i < 3; i++) {
          if (
            prevState.board[i][0] === prevState.board[i][1] &&
            prevState.board[i][1] === prevState.board[i][2] &&
            prevState.board[i][0] !== null
          ) {
            return true;
          }
        }
        // Check Columns
        for (let i = 0; i < 3; i++) {
          if (
            prevState.board[0][i] === prevState.board[1][i] &&
            prevState.board[1][i] === prevState.board[2][i] &&
            prevState.board[0][i] !== null
          ) {
            return true;
          }
        }
        // Check Diagonals
        if (
          prevState.board[0][0] === prevState.board[1][1] &&
          prevState.board[1][1] === prevState.board[2][2] &&
          prevState.board[0][0] !== null
        ) {
          return true;
        }
        if (
          prevState.board[0][2] === prevState.board[1][1] &&
          prevState.board[1][1] === prevState.board[2][0] &&
          prevState.board[0][2] !== null
        ) {
          return true;
        }
        return false;
      })();
      const checkIfDraw = (() => {
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (prevState.board[i][j] === null) {
              return false;
            }
          }
        }
        return true;
      })();
      const showBanner = checkIfWon || checkIfDraw;

      return {
        ...prevState,
        isXTurn: !prevState.isXTurn,
        board: (() => {
          const newBoard = prevState.board;
          newBoard[i][j] = prevState.isXTurn ? "X" : "O";
          return newBoard;
        })(),
        banner: {
          isShown: showBanner,
          isOver: showBanner,
          isWinnerX: checkIfWon ? prevState.isXTurn : null,
        },
      };
    });
  };

  const handleEndScreenClick = (action) => {
    if (action === "quit") {
      setGame((prevState) => ({
        ...prevState,
        isStarted: false,
      }));
    } else if (action === "cancel") {
      setGame((prevState) => ({
        ...prevState,
        banner: {
          ...prevState.banner,
          isShown: false,
        },
      }));
    } else if (action === "next") {
      startGame(game.isVsCpu, true);
    } else if (action === "restart") {
      startGame(game.isVsCpu, false);
    }
  };

  return (
    <>
      {game.isStarted ? (
        <Game
          game={game}
          numOfWins={numOfWins}
          handleRestart={handleRestart}
          handleBoardClick={(i, j) => handleBoardClick(i, j)}
          handleEndScreenClick={(action) => {
            handleEndScreenClick(action);
          }}
        />
      ) : (
        <NewGameMenu
          changePlayer1Mark={(icon) => {
            changePlayer1Mark(icon);
          }}
          startGame={(isVsCpu) => startGame(isVsCpu, false)}
          player1Mark={game.player1Mark}
        />
      )}
    </>
  );
}
