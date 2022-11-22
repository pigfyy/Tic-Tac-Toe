import create from "zustand";

import { devtools, persist } from "zustand/middleware";

const gameStore = (set) => ({
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
  setPlayer1Mark: (mark) => set({ player1Mark: mark }),
  setIsStarted: (isStarted) => set({ isStarted }),
  setIsVsCpu: (isVsCpu) => set({ isVsCpu }),
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
