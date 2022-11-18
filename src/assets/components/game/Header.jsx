import iconOWhite from "../../imgs/new-game-icons/icon-o-white.svg";
import iconXWhite from "../../imgs/new-game-icons/icon-x-white.svg";
import restartIcon from "../../imgs/icon-restart.svg";
import logo from "../../imgs/logo.svg";
import { useState } from "react";

function Header({ game, handleRestart }) {
  return (
    <div className="grid w-11/12 max-w-L grid-cols-3 gap-5">
      <div className="my-auto">
        <img src={logo} alt="an X and an O" className="flex" />
      </div>
      <div className="flex flex-row justify-center space-x-2 rounded-md bg-neutral-700 px-2 shadow-darkBlueShadowThin md:rounded-sxl">
        <div className="flex items-center">
          <img
            src={game.isXTurn ? iconXWhite : iconOWhite}
            alt={game.isXTurn ? "X" : "O"}
            className="h-4"
          />
        </div>
        <span className="my-auto text-XS font-bold tracking-0.875 text-neutral-200">
          TURN
        </span>
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleRestart}
          className="flex aspect-square w-[39%] max-w-3XS justify-center rounded-md bg-neutral-200 shadow-neutralShadowThin active:bg-neutral-100 md:rounded-sxl"
        >
          <div className="h-5/12 m-auto flex w-5/12">
            <img src={restartIcon} alt="restart icon" />
          </div>
        </button>
      </div>
    </div>
  );
}

export default Header;
