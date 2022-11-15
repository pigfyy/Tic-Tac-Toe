import Header from "./Header";
import Board from "./Board";

export default function Game({
  game,
  handleBoardClick,
  handleMouseOver,
  handleMouseOut,
}) {
  const handleRestart = () => {
    console.log("HI");
  };

  return (
    <div className="min-h-screen bg-neutral-900">
      <div className="mx-auto grid grid-cols-3 gap-5 p-4">
        {/* Header */}
        <Header game={game} handleRestart={handleRestart} />
        {/* Game-Board */}
        <Board
          game={game}
          handleBoardClick={(i, j) => handleBoardClick(i, j)}
          handleMouseOver={(i, j) => handleMouseOver(i, j)}
          handleMouseOut={(i, j) => handleMouseOut(i, j)}
        />
        {/* Footer */}
      </div>
    </div>
  );
}
