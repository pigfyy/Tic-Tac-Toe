import { v4 as uuid } from "uuid";

export default function ({ game, numOfWins }) {
  const footerBlocks = (() => {
    const winCounts = game.isVsCpu ? numOfWins.pvc : numOfWins.pvp;
    return winCounts.map((num, i) => {
      const values = (() => {
        switch (i) {
          case 0:
            return {
              bg: "bg-aqua-600",
              text: game.isVsCpu
                ? game.player1Mark === "X"
                  ? "X (YOU)"
                  : "X (CPU)"
                : game.player1Mark === "X"
                ? "X (P1)"
                : "X (P2)",
            };

          case 1:
            return {
              bg: "bg-neutral-200",
              text: "TIES",
            };

          case 2:
            return {
              bg: "bg-orange-600",
              text: game.isVsCpu
                ? game.player1Mark === "O"
                  ? "O (YOU)"
                  : "O (CPU)"
                : game.player1Mark === "O"
                ? "O (P1)"
                : "O (P2)",
            };

          default:
            return {
              bg: "bg-neutral-900",
              text: "ERROR",
            };
        }
      })();

      return (
        <li key={uuid()}>
          <button
            className={`flex h-full w-full flex-row justify-center space-x-2 rounded-xl px-2 ${values.bg}`}
          >
            <div className="flex min-h-4REM flex-col justify-center py-2">
              <div>
                <p className="my-auto text-XS font-medium leading-tight tracking-wide text-neutral-900">
                  {values.text}
                </p>
              </div>
              <div>
                <p className="text-S font-bold leading-tight tracking-wider text-neutral-900">
                  {num}
                </p>
              </div>
            </div>
          </button>
        </li>
      );
    });
  })();

  return <ul className="grid grid-cols-3 grid-rows-1 gap-5">{footerBlocks}</ul>;
}
