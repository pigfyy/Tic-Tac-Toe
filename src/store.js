import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import cpuMove from "./assets/util/cpuMove";
import isCpuMove from "./assets/util/isCpuMove";

const gameOver = (board, setBoard) => {
  const checkWin = (board) => {
    let newBoard = board;
    // Check Rows
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] === board[i][1] &&
        board[i][1] === board[i][2] &&
        board[i][0] !== null
      ) {
        const cellName = `${board[i][0] === "X" ? "x" : "o"}Win`;
        newBoard[i][0] = cellName;
        newBoard[i][1] = cellName;
        newBoard[i][2] = cellName;
        setBoard(newBoard);
        return true;
      }
    }
    // Check Columns
    for (let i = 0; i < 3; i++) {
      if (
        board[0][i] === board[1][i] &&
        board[1][i] === board[2][i] &&
        board[0][i] !== null
      ) {
        const cellName = `${board[0][i] === "X" ? "x" : "o"}Win`;
        newBoard[0][i] = cellName;
        newBoard[1][i] = cellName;
        newBoard[2][i] = cellName;
        setBoard(newBoard);
        return true;
      }
    }
    // Check Diagonals
    if (
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2] &&
      board[0][0] !== null
    ) {
      const cellName = `${board[0][0] === "X" ? "x" : "o"}Win`;
      newBoard[0][0] = cellName;
      newBoard[1][1] = cellName;
      newBoard[2][2] = cellName;
      setBoard(newBoard);
      return true;
    }
    if (
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0] &&
      board[0][2] !== null
    ) {
      const cellName = `${board[0][2] === "X" ? "x" : "o"}Win`;
      newBoard[0][2] = cellName;
      newBoard[1][1] = cellName;
      newBoard[2][0] = cellName;
      setBoard(newBoard);
      return true;
    }
    return false;
  };
  const checkDraw = (board) => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === null) {
          return false;
        }
      }
    }
    return true;
  };
  const isWon = checkWin(board);
  if (isWon) {
    return "W";
  } else if (checkDraw(board)) {
    return "D";
  } else {
    return null;
  }
};

const gameStore = (set, get) => ({
  player1Mark: "O",
  isStarted: false,
  isVsCpu: false,
  isXTurn: true,
  // make isCpuTurn, derived from isVsCpu and isXTurn
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
  setPlayer1Mark: (mark) => set({ player1Mark: mark }),
  setIsStarted: (isStarted) => set({ isStarted }),
  setIsVsCpu: (isVsCpu) => set({ isVsCpu }),
  setBoard: (board) => set({ board }),
  setBannerShown: (isShown) => {
    return set({
      banner: {
        ...get().banner,
        isShown: isShown,
      },
    });
  },
  setBannerIsOver: (isOver) => {
    return set({
      banner: {
        ...get().banner,
        isOver: isOver,
      },
    });
  },
  setBannerIsWinnerX: (isWinnerX) => {
    return set({
      banner: {
        ...get().banner,
        isWinnerX: isWinnerX,
      },
    });
  },
  // reverses player1Mark, used to swap player 1 between games
  reversePlayer1Mark: () => {
    return set({
      player1Mark: get().player1Mark === "X" ? "O" : "X",
    });
  },
  // resets board, and creates new game
  startGame: () => {
    set({
      isStarted: true,
      isXTurn: true,
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
    });
    if (isCpuMove(get().player1Mark, get().isVsCpu, get().isXTurn)) {
      get().cpuMakeMove();
    }
  },
  // ends game
  endGame: (overType) => {
    // show banner, and set winner
    get().setBannerIsWinnerX(overType === "W" ? !get().isXTurn : null);
    get().setBannerShown(true);
    get().setBannerIsOver(true);

    // change win counts
    if (overType === "D") {
      useWinCountsStore.getState().addDraw();
      return;
    }
    const didXWin = !get().isXTurn;
    const didP1Win =
      (didXWin && get().player1Mark === "X") ||
      (!didXWin && get().player1Mark !== "X");
    if (didP1Win) {
      useWinCountsStore.getState().addP1Win();
    } else {
      useWinCountsStore.getState().addP2Win();
    }
  },
  // makes a move, given a row and column
  makeMove: (row, col, isPlayerMove) => {
    if (
      (isPlayerMove &&
        isCpuMove(get().player1Mark, get().isVsCpu, get().isXTurn)) ||
      get().board[row][col] !== null ||
      get().banner.isOver
    ) {
      return;
    }
    const [newBoard, isXTurn] = [get().board, get().isXTurn];
    newBoard[row][col] = isXTurn ? "X" : "O";
    set({ board: newBoard, isXTurn: !isXTurn });
    const overType = gameOver(get().board, get().setBoard);
    if (overType) {
      get().endGame(overType);
      return;
    }
    if (isCpuMove(get().player1Mark, get().isVsCpu, get().isXTurn)) {
      get().cpuMakeMove();
    }
  },
  // set game to initial values
  setDefault: () => {
    return set({
      player1Mark: "O",
      isStarted: false,
      isVsCpu: false,
      isXTurn: true,
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
    });
  },
  // if is cpu turn, make cpu move
  cpuMakeMove: () => {
    if (!isCpuMove(get().player1Mark, get().isVsCpu, get().isXTurn)) {
      return;
    }
    const cpuMoveIndex = cpuMove(get().board);
    setTimeout(() => {
      get().makeMove(cpuMoveIndex[0], cpuMoveIndex[1]);
    }, 200);
  },
});

// const useGameStore = create(devtools(persist(gameStore, { name: "game" })));
const useGameStore = create(devtools(gameStore));

const winCountsStore = (set) => ({
  pvc: [0, 0, 0],
  pvp: [0, 0, 0],
  addP1Win: () => {
    set((state) => {
      const [pvc, pvp] = [state.pvc, state.pvp];
      useGameStore.getState().isVsCpu ? pvc[0]++ : pvp[0]++;
      return { pvc, pvp };
    });
  },
  addP2Win: () => {
    set((state) => {
      const [pvc, pvp] = [state.pvc, state.pvp];
      useGameStore.getState().isVsCpu ? pvc[2]++ : pvp[2]++;
      return { pvc, pvp };
    });
  },
  addDraw: () => {
    set((state) => {
      const [pvc, pvp] = [state.pvc, state.pvp];
      useGameStore.getState().isVsCpu ? pvc[1]++ : pvp[1]++;
      return { pvc, pvp };
    });
  },
});

const useWinCountsStore = create(
  devtools(
    // persist(winCountsStore, {
    //   name: "winCounts",
    // })
    winCountsStore
  )
);

export default { useGameStore, useWinCountsStore };
