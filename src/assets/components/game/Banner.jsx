import iconO from "../../imgs/game-icons/icon-o.svg";
import iconX from "../../imgs/game-icons/icon-x.svg";

import store from "../../../store";

export default function () {
  const [
    isVsCpu,
    player1Mark,
    isWinnerX,
    isOver,
    setBannerShown,
    reversePlayer1Mark,
    startGame,
    setDefault,
    cpuMakeMove,
  ] = store.useGameStore((state) => [
    state.isVsCpu,
    state.player1Mark,
    state.banner.isWinnerX,
    state.banner.isOver,
    state.setBannerShown,
    state.reversePlayer1Mark,
    state.startGame,
    state.setDefault,
    state.cpuMakeMove,
  ]);

  return (
    <>
      {/* Overlay */}
      <div className="fixed top-0 left-0 h-screen w-screen bg-[#000000]/50"></div>
      {/* Banner */}
      <div className="absolute top-0 left-0 flex h-full w-full items-center">
        <div className="w-full bg-neutral-700">
          {/* Banner Content */}
          {isWinnerX !== null ? (
            // End Banner
            <div className="mx-auto flex flex-col items-center space-y-4 px-3 pt-10 pb-12">
              {/* Top text */}
              <span className="text-2XS font-bold leading-4.5 tracking-0.875 text-neutral-200 md:text-XS md:tracking-1">
                {(() => {
                  if (isVsCpu) {
                    if (isWinnerX && player1Mark === "X") {
                      return "YOU WON!";
                    }
                    return "OH NO, YOU LOST…";
                  }
                  if (isWinnerX && player1Mark === "X") {
                    return "PLAYER 1 WINS!";
                  }
                  return "PLAYER 2 WINS!";
                })()}
              </span>
              {/* {ICON} Takes the round */}
              <div className="flex w-full flex-row justify-center space-x-2.5">
                <span className="grid aspect-square max-w-[80px] basis-test place-items-center md:w-auto">
                  <img
                    src={isWinnerX ? iconX : iconO}
                    alt={isWinnerX ? "X" : "O"}
                  />
                </span>
                <div className="my-auto">
                  <span
                    className={`flex text-M font-bold tracking-1.5 md:text-L md:tracking-2.5 ${
                      isWinnerX ? "text-aqua-600" : "text-orange-600"
                    }`}
                  >
                    TAKES THE ROUND
                  </span>
                </div>
              </div>
              {/* Buttons */}
              <div className="flex flex-row space-x-3.5">
                <button
                  className="rounded-sxl bg-neutral-200 px-4 py-3 shadow-neutralShadowThin active:bg-neutral-100"
                  onClick={() => {
                    setDefault();
                  }}
                >
                  <span className="text-XS font-bold uppercase tracking-1 text-neutral-900">
                    QUIT
                  </span>
                </button>
                <button
                  className="rounded-sxl bg-orange-600 px-4 py-3 shadow-orangeShadowThin active:bg-orange-400"
                  onClick={() => {
                    reversePlayer1Mark();
                    startGame();
                  }}
                >
                  <span className="text-XS font-bold uppercase text-neutral-900">
                    NEXT ROUND
                  </span>
                </button>
              </div>
            </div>
          ) : (
            // Restart/Tie Banner
            <div className="mx-auto flex flex-col items-center space-y-4 px-3 pt-14 pb-16">
              <span className="flex text-M font-bold tracking-1.5 text-neutral-200 md:text-L md:tracking-2.5">
                {isOver ? "ROUND TIED" : "RESTART GAME?"}
              </span>
              <div className="flex flex-row space-x-3.5">
                <button
                  className="rounded-sxl bg-neutral-200 px-4 py-3 shadow-neutralShadowThin active:bg-neutral-100"
                  onClick={() => {
                    isOver ? setDefault() : setBannerShown(false);
                  }}
                >
                  <span className="text-XS font-bold uppercase tracking-1 text-neutral-900">
                    {isOver ? "QUIT" : "NO, CANCEL"}
                  </span>
                </button>
                <button
                  className="rounded-sxl bg-orange-600 px-4 py-3 shadow-orangeShadowThin active:bg-orange-400"
                  onClick={() => {
                    isOver && reversePlayer1Mark();
                    startGame();
                  }}
                >
                  <span className="text-XS font-bold uppercase text-neutral-900">
                    {isOver ? "NEXT ROUND" : "YES, RESTART"}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
