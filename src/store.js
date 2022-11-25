import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import cpuMove from "./assets/util/cpuMove";
import isCpuMove from "./assets/util/isCpuMove";

const gameOver = (board) => {
  const isWon = (board) => {
    // Check Rows
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] === board[i][1] &&
        board[i][1] === board[i][2] &&
        board[i][0] !== null
      ) {
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
        return true;
      }
    }
    // Check Diagonals
    if (
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2] &&
      board[0][0] !== null
    ) {
      return true;
    }
    if (
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0] &&
      board[0][2] !== null
    ) {
      return true;
    }
    return false;
  };
  const isDraw = (board) => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === null) {
          return false;
        }
      }
    }
    return true;
  };
  if (isWon(board)) {
    return "W";
  } else if (isDraw(board)) {
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
    get().setBannerIsWinnerX(overType === "W" ? !get().isXTurn : null);
    get().setBannerShown(true);
    get().setBannerIsOver(true);

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
    const isOver = gameOver(get().board);
    if (isOver) {
      setTimeout(() => {
        get().endGame(isOver);
      }, 50);
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

const useGameStore = create(devtools(persist(gameStore, { name: "game" })));

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
