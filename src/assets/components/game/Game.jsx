import Header from "./Header";
import Board from "./Board";
import Footer from "./Footer";
import { useState } from "react";

import iconO from "../../imgs/game-icons/icon-o.svg";
import iconX from "../../imgs/game-icons/icon-x.svg";

export default function Game({ game, numOfWins, handleBoardClick }) {
  const [isGameOver, setIsGameOver] = useState(true);

  const handleRestart = () => {
    console.log(game);
  };

  return (
    <div className="relative">
      {/* Main Board */}
      <div className="flex min-h-screen flex-col justify-center space-y-4 bg-neutral-900 py-4">
        {/* Header */}
        <div className="flex w-full justify-center">
          <Header game={game} handleRestart={handleRestart} />
        </div>
        <div className="mx-auto flex w-11/12 max-w-L flex-col gap-5">
          {/* Game-Board */}
          <Board
            game={game}
            handleBoardClick={(i, j) => handleBoardClick(i, j)}
          />
          {/* Footer */}
          <Footer game={game} numOfWins={numOfWins} />
        </div>
      </div>

      {/* Ending Banner */}
      {isGameOver && (
        <>
          {/* Overlay */}
          <div className="fixed top-0 left-0 h-screen w-screen bg-[#000000]/50"></div>
          {/* Banner */}
          <div className="absolute top-0 left-0 flex h-full w-full items-center">
            <div className="w-full bg-neutral-700">
              <div className="mx-auto flex flex-col items-center space-y-4 px-3 pt-10 pb-12">
                <span className="text-2XS font-bold leading-4.5 tracking-0.875 text-neutral-200 md:text-XS md:tracking-1">
                  PLAYER 1 WINS!
                </span>
                <div className="flex flex-row place-items-center items-start space-x-2.5">
                  <span className="grid place-items-center">
                    <img src={iconO} alt="" className="" />
                  </span>
                  <div className="my-auto">
                    <span className="text-M font-bold tracking-1.5 text-orange-600 md:text-L md:tracking-2.5">
                      TAKES THE ROUND
                    </span>
                  </div>
                </div>
                <div className="flex flex-row space-x-3.5">
                  <button className="rounded-sxl bg-neutral-200 px-4 py-3 shadow-neutralShadowThin active:bg-neutral-100">
                    <span className="text-XS font-bold uppercase tracking-1 text-neutral-900">
                      QUIT
                    </span>
                  </button>
                  <button className="rounded-sxl bg-orange-600 px-4 py-3 shadow-orangeShadowThin active:bg-orange-400">
                    <span className="text-XS font-bold uppercase text-neutral-900">
                      NEXT ROUND
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
