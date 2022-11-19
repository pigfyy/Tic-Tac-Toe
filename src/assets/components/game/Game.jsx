import Header from "./Header";
import Board from "./Board";
import Footer from "./Footer";
import EndingBanner from "./EndingBanner";

export default function Game({
  game,
  numOfWins,
  handleRestart,
  handleBoardClick,
  handleEndScreenClick,
}) {
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
      {game.banner.isShown && (
        <EndingBanner
          game={game}
          handleEndScreenClick={(action) => handleEndScreenClick(action)}
        />
      )}
    </div>
  );
}
