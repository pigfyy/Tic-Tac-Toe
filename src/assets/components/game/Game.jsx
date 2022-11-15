import Header from "./Header";
import Board from "./Board";
import Footer from "./Footer";

export default function Game({ game, numOfWins, handleBoardClick }) {
  const handleRestart = () => {
    console.log(game);
  };

  return (
    <div className="grid min-h-screen place-items-center bg-neutral-900">
      <div className="mx-auto w-11/12 max-w-L py-4">
        {/* Header */}
        <Header game={game} handleRestart={handleRestart} />
        <div className="flex flex-col gap-5">
          {/* Game-Board */}
          <Board
            game={game}
            handleBoardClick={(i, j) => handleBoardClick(i, j)}
          />
          {/* Footer */}
          <Footer game={game} numOfWins={numOfWins} />
        </div>
      </div>
    </div>
  );
}
