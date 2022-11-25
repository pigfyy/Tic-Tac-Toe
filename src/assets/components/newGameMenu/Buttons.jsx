import stores from "../../../store";
import cpuMove from "../../util/cpuMove";

export default function () {
  const [player1Mark, board, startGame, setIsVsCpu, makeMove, cpuMakeMove] =
    stores.useGameStore((state) => [
      state.player1Mark,
      state.board,
      state.startGame,
      state.setIsVsCpu,
      state.makeMove,
      state.cpuMakeMove,
    ]);

  return (
    <section className="flex flex-col space-y-4">
      <button
        className="group w-full rounded-2xl bg-orange-600 py-4 shadow-orangeShadow active:bg-orange-400"
        onClick={() => {
          setIsVsCpu(true);
          startGame();
        }}
      >
        <p className="text-XS font-bold uppercase tracking-1 text-neutral-900">
          NEW GAME (VS CPU)
        </p>
      </button>
      <button
        className="group w-full rounded-2xl bg-aqua-600 py-4 shadow-aquaShadow active:bg-aqua-400"
        onClick={() => {
          setIsVsCpu(false);
          startGame();
        }}
      >
        <p className="text-XS font-bold uppercase tracking-1 text-neutral-900">
          NEW GAME (VS PLAYER)
        </p>
      </button>
    </section>
  );
}
