import iconXWhite from "../../imgs/new-game-icons/icon-x-white.svg";
import iconXDark from "../../imgs/new-game-icons/icon-x-dark.svg";
import iconOWhite from "../../imgs/new-game-icons/icon-o-white.svg";
import iconODark from "../../imgs/new-game-icons/icon-o-dark.svg";

export default function (props) {
  return (
    <div className="space-y-5 rounded-2xl bg-neutral-700 p-5 shadow-darkBlueShadow">
      <h1 className="text-shadow-3xl text-center text-XS tracking-1 text-neutral-200">
        PICK PLAYER 1'S MARK
      </h1>
      <div className="rounded-2xl bg-neutral-900 p-2">
        <button
          className={`w-6/12 rounded-xl py-4 transition-colors duration-200 ${
            props.player1Mark === "X"
              ? "bg-neutral-200"
              : "bg-neutral-900 active:bg-neutral-active"
          }`}
          onClick={() => {
            props.changePlayer1Mark("X");
          }}
        >
          <img
            src={props.player1Mark === "X" ? iconXDark : iconXWhite}
            alt="X Icon"
            className="mx-auto"
          />
        </button>
        <button
          className={`w-6/12 rounded-xl py-4 transition-colors duration-200 ${
            props.player1Mark === "O"
              ? "bg-neutral-200"
              : "bg-neutral-900 active:bg-neutral-active"
          }`}
          onClick={() => {
            props.changePlayer1Mark("O");
          }}
        >
          <img
            src={props.player1Mark === "O" ? iconODark : iconOWhite}
            alt="O Icon"
            className="mx-auto"
          />
        </button>
      </div>
      <p className="text-center text-2XS tracking-0.875 text-neutral-200 opacity-50">
        REMEMBER : X GOES FIRST
      </p>
    </div>
  );
}
