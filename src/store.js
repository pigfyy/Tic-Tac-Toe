import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import cpuMove from "./assets/util/cpuMove";

const isCpuMove = (player1Mark, isVsCpu, isXTurn) => {
  if (
    !isVsCpu ||
    (player1Mark === "X" && isXTurn === true) ||
    (player1Mark === "O" && isXTurn === false)
  ) {
    return false;
  }
  return true;
};

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

const gameStore = (set, get) => ({
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
  reversePlayer1Mark: () => {
    return set({
      player1Mark: get().player1Mark === "X" ? "O" : "X",
    });
  },
  startGame: () => {
    return set({
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
  },
  makeMove: (row, col) => {
    const [newBoard, isXTurn] = [get().board, get().isXTurn];
    newBoard[row][col] = isXTurn ? "X" : "O";
    set({ board: newBoard, isXTurn: !isXTurn });
    if (isWon(get().board)) {
      get().setBannerShown(true);
      get().setBannerIsOver(true);
      get().setBannerIsWinnerX(isXTurn);
    } else if (isDraw(get().board)) {
      get().setBannerShown(true);
      get().setBannerIsOver(true);
    }
    get().cpuMakeMove();
    if (isWon(get().board)) {
      get().setBannerShown(true);
      get().setBannerIsOver(true);
      get().setBannerIsWinnerX(isXTurn);
    } else if (isDraw(get().board)) {
      get().setBannerShown(true);
      get().setBannerIsOver(true);
    }
  },
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
  cpuMakeMove: () => {
    if (!isCpuMove(get().player1Mark, get().isVsCpu, get().isXTurn)) {
      return;
    }
    const cpuMoveIndex = cpuMove(get().board);
    get().makeMove(cpuMoveIndex[0], cpuMoveIndex[1]);
  },
});

const useGameStore = create(
  devtools(
    // persist(gameStore, { name: "game" })
    gameStore
  )
);

const winCountsStore = (set) => ({
  pvc: [0, 0, 0],
  pvp: [0, 0, 0],
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
