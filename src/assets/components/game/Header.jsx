import iconOWhite from "../../imgs/new-game-icons/icon-o-white.svg";
import iconXWhite from "../../imgs/new-game-icons/icon-x-white.svg";
import restartIcon from "../../imgs/icon-restart.svg";
import logo from "../../imgs/logo.svg";

function Header({ game, handleRestart }) {
  return (
    <div className="fixed top-4 left-0 flex w-full justify-center">
      <div className="grid w-11/12 max-w-L grid-cols-3 gap-5">
        {/* "grid w-full grid-cols-3 gap-5" */}
        <div className="my-auto">
          <img src={logo} alt="an X and an O" className="flex" />
        </div>
        <div className="flex flex-row justify-center space-x-2 rounded-md bg-neutral-700 px-2 shadow-darkBlueShadowThin">
          <div className="flex items-center">
            <img
              src={game.isXTurn ? iconXWhite : iconOWhite}
              alt={game.isXTurn ? "X" : "O"}
              className="h-4"
            />
          </div>
          <p className="my-auto text-XS font-bold tracking-wider text-neutral-200">
            TURN
          </p>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleRestart}
            className="flex h-10 w-10 justify-center rounded-md bg-neutral-200 shadow-neutralShadowThin active:bg-neutral-100"
          >
            <div className="flex w-5/12">
              <img src={restartIcon} alt="restart icon" className="m-auto" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
