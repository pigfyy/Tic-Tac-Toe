import stores from "../../../store";

export default function () {
  const [startGame, setIsVsCpu] = stores.useGameStore((state) => [
    state.startGame,
    state.setIsVsCpu,
  ]);

  return (
    <section className="flex flex-col space-y-4">
      <button
        className="group w-full rounded-2xl bg-orange-600 py-4 shadow-orangeShadow active:bg-orange-400"
        onClick={() => {
          startGame();
          setIsVsCpu(true);
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
        }}
      >
        <p className="text-XS font-bold uppercase tracking-1 text-neutral-900">
          NEW GAME (VS PLAYER)
        </p>
      </button>
    </section>
  );
}
